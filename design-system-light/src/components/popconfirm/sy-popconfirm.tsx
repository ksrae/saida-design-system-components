import { Component, Prop, Element, Method, h, Event, EventEmitter, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-popconfirm',
  styleUrl: 'sy-popconfirm.scss',
  shadow: false,
  scoped: true,
})
export class SyPopconfirm {
  @Element() host: HTMLSyPopconfirmElement;

  private parentDom: HTMLElement;
  private addedToBody = false;
  private ARROW_HEIGHT = 6;
  private DefaultOpendelay = 0;
  private DefaultClosedelay = 0;
  private arrowElement: HTMLDivElement;
  private closeTimer: any;
  private openTimer: any;
  private visibility = false;

  @Prop({ reflect: true }) arrow: boolean = false;
  @Prop() closable: boolean = false;
  @Prop({ reflect: true }) position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' = 'top';
  @Prop({ reflect: true }) trigger: 'click' | 'none' = 'click';
  @Prop({ reflect: true, mutable: true }) opendelay: number = 0;
  @Prop({ reflect: true, mutable: true }) closedelay: number = 0;
  @Prop({ attribute: 'confirmText', mutable: true }) confirmText: string = 'OK';
  @Prop({ attribute: 'cancelText', mutable: true }) cancelText: string = 'Cancel';
  @Prop() sticky: boolean = false;

  @Event() visibleChanged: EventEmitter<boolean>;
  @Event() selected: EventEmitter<'ok' | 'cancel'>;

  // Prop 변경 감지
  @Watch('position')
  @Watch('arrow')
  handlePropChanges() {
    if (this.addedToBody) {
      this.updatePopconfirmPosition();
    }
  }

  // 라이프사이클 메서드
  componentWillLoad() {
    this.parentDom = this.host.parentElement as HTMLElement;
    document.addEventListener("click", this.handleOutsideClick, true);
    // Use utility to read legacy alias attributes and only assign when present.
    // 두개의 alias를 모두 여기서 지원할 수도 있고, 둘 중 하나는 Prop({ attribute: ... })로 지정하고 여기에서는 다른 하나만 지원하는 방식을 취해도 됩니다.
    // 명시적으로는 Prop에서 attribute를 camelCase를 사용하고, alias로 snake-case를 지원하는 방식을 권장합니다.
    this.confirmText = fnAssignPropFromAlias(this.host, 'confirm-text') ?? this.confirmText;
    this.cancelText = fnAssignPropFromAlias(this.host, 'cancel-text') ?? this.cancelText;
  }

  componentDidLoad() {
    this.setOpendelay();
    this.setClosedelay();
    this.addEvent();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick, true);
    if (this.addedToBody) {
      this.removePopconfirm(); // 컴포넌트 강제 제거 시 정리
    }
    if (this.parentDom) {
      this.parentDom.removeEventListener("click", this.parentClick);
    }
  }

  // 공개 메서드
  @Method()
  async setOpen() {
    if (this.isParentDisabledOrReadonly()) return;
    this.appendToRoot(true);
  }

  @Method()
  async setClose() {
    this.delayedPopconfirmClose();
  }

  private isParentInView(): boolean {
    if (!this.parentDom) {
      return false;
    }
    const rect = this.parentDom.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }

  // 핵심 로직: 열기 / 닫기
  private appendToRoot = (force: boolean = false) => {
    if (this.isParentDisabledOrReadonly()) return;

    if (this.trigger === 'click' || force) {
      if (this.addedToBody) return;

      document.body.appendChild(this.host);
      this.addedToBody = true;

      window.addEventListener("scroll", this.updatePopconfirmPosition, true);
      window.addEventListener("resize", this.updatePopconfirmPosition, true);
      window.addEventListener("keydown", this.handleKeydown, true);

      this.updatePopconfirmPosition();
    }
  };

  private removePopconfirm = () => {
    if (!this.addedToBody) return;

    // 1. DOM에서 제거하기 전에 먼저 상태를 변경하고 이벤트를 보냅니다.
    this.setVisibility(false);

    // 2. 그 다음 모든 정리 작업을 수행합니다.
    window.removeEventListener("scroll", this.updatePopconfirmPosition, true);
    window.removeEventListener("resize", this.updatePopconfirmPosition, true);
    window.removeEventListener("keydown", this.handleKeydown, true);

    if (this.openTimer) clearTimeout(this.openTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);

    // 3. 마지막으로 DOM에서 컴포넌트를 제거합니다.
    if (this.host.parentElement === document.body) {
      document.body.removeChild(this.host);
    }

    this.addedToBody = false;
    // setVisibility는 이미 위에서 호출했으므로 여기서는 addedToBody만 설정합니다.
  };

  // 이벤트 핸들러
  private addEvent() {
    if (this.trigger === "click" && this.parentDom) {
      this.parentDom.addEventListener("click", this.parentClick);
    }
  }

  private parentClick = (event: Event) => {
    event.preventDefault();
    if (this.isParentDisabledOrReadonly()) return;

    if (this.addedToBody) {
      this.removePopconfirm();
    } else {
      this.appendToRoot();
    }
  };

  private delayedPopconfirmClose = () => {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      this.removePopconfirm();
    }, this.closedelay);
  };

  private handleOutsideClick = (event: MouseEvent) => {
    if (!this.addedToBody || !this.closable) return;
    const target = event.target as Node;
    const isInPopConfirm = this.host.contains(target);
    const isParent = this.parentDom?.contains(target);
    if (!isInPopConfirm && !isParent) {
      this.eventEmit("cancel");
    }
  };

  private handleKeydown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.code === "Escape") {
      this.eventEmit("cancel");
    }
  }

  // 위치 및 화살표 스타일 업데이트
  private updatePopconfirmPosition = () => {
    if (!this.parentDom || !this.addedToBody) return;

    // ===== 여기부터 추가 =====
    // sticky가 false이고(기본값) 부모가 화면 밖에 있으면, Popconfirm을 숨기고 함수를 종료합니다.
    if (!this.sticky && !this.isParentInView()) {
      this.host.style.visibility = 'hidden';
      this.setVisibility(false); // visibility 상태와 이벤트도 동기화
      return;
    }
    // ===== 여기까지 추가 =====

    this.host.style.display = "block";
    this.host.style.visibility = "hidden";
    this.setVisibility(false);

    requestAnimationFrame(() => {
      this.setPopconfirmPosition();
      if (this.openTimer) clearTimeout(this.openTimer);
      this.openTimer = setTimeout(() => {
        this.host.style.visibility = "visible";
        this.setVisibility(true);
      }, this.opendelay);
    });
  }

  private setPopconfirmPosition = () => {
    if (this.addedToBody && this.parentDom) {
      const parentRect = this.parentDom.getBoundingClientRect();
      const popconfirmRect = this.host.getBoundingClientRect();

      const positions = this.calculateAllPositions(parentRect, popconfirmRect);
      const { position: bestPosition, coords } = this.findBestPosition(
        positions, this.position, parentRect, popconfirmRect
      );

      this.host.style.position = "absolute";
      this.host.style.top = `${coords.top}px`;
      this.host.style.left = `${coords.left}px`;

      const adjusted = this.adjustForScreenBounds(popconfirmRect);

      if (this.arrow && this.arrowElement) {
        const popconfirmPos = { top: parseFloat(this.host.style.top), left: parseFloat(this.host.style.left) };

        this.arrowElement.style.position = 'absolute';
        this.arrowElement.style.width = '8px';
        this.arrowElement.style.height = '8px';
        this.arrowElement.style.boxShadow = 'rgba(0 0 0 / 0.24) 0px 5px 1px';
        this.arrowElement.style.background = 'white';

        if (adjusted) {
          this.positionArrowRelativeToParent(this.arrowElement, bestPosition, parentRect, popconfirmPos, popconfirmRect);
        } else {
          this.positionArrowStandard(this.arrowElement, bestPosition);
        }
      }
    }
  }

  // 헬퍼 함수
  private setVisibility(visible: boolean) {
    if (this.visibility !== visible) {
      this.visibility = visible;
      this.visibleChanged.emit(this.visibility);
    }
  }

  private isParentDisabledOrReadonly(): boolean {
    if (!this.parentDom) return false;
    return this.parentDom.hasAttribute('disabled') || this.parentDom.getAttribute('aria-disabled') === 'true' ||
           this.parentDom.hasAttribute('readonly') || this.parentDom.getAttribute('aria-readonly') === 'true';
  }

  private setOpendelay() { this.opendelay = Math.max(this.opendelay, this.DefaultOpendelay); }
  private setClosedelay() { this.closedelay = Math.max(this.closedelay, this.DefaultClosedelay); }

  private cancelClick = (e: MouseEvent) => { e.preventDefault(); this.eventEmit("cancel"); }
  private okClick = (e: MouseEvent) => { e.preventDefault(); this.eventEmit("ok"); }

  private eventEmit(type: "ok" | "cancel") {
    this.selected.emit(type);
    this.delayedPopconfirmClose();
  }

  private findBestPosition(
    positions: Record<string, {top: number, left: number}>,
    preferredPosition: string,
    _parentRect: DOMRect,
    popconfirmRect: DOMRect
  ) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    const oppositePositions: Record<string, string> = {
      'top': 'bottom', 'bottom': 'top', 'left': 'right', 'right': 'left',
      'topLeft': 'bottomLeft', 'topRight': 'bottomRight', 'bottomLeft': 'topLeft', 'bottomRight': 'topRight',
      'leftTop': 'rightTop', 'leftBottom': 'rightBottom', 'rightTop': 'leftTop', 'rightBottom': 'leftBottom'
    };

    let position = preferredPosition;
    let coords = positions[preferredPosition];

    const checkDirection = (pos: string, crds: {top: number, left: number}) => {
      if (pos.startsWith('top')) return crds.top < scrollY;
      if (pos.startsWith('bottom')) return crds.top + popconfirmRect.height > scrollY + viewportHeight;
      if (pos.startsWith('left')) return crds.left < scrollX;
      if (pos.startsWith('right')) return crds.left + popconfirmRect.width > scrollX + viewportWidth;
      return false;
    };

    if (checkDirection(preferredPosition, coords)) {
      const oppositePosition = oppositePositions[preferredPosition];
      if (oppositePosition) {
        position = oppositePosition;
        coords = positions[oppositePosition];
      }
    }

    return { position, coords };
  }

  private adjustForScreenBounds(popconfirmRect: DOMRect): boolean {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjusted = false;

    const currentLeft = parseFloat(this.host.style.left);
    const currentTop = parseFloat(this.host.style.top);

    if (currentLeft < window.scrollX) {
      this.host.style.left = `${window.scrollX}px`;
      adjusted = true;
    } else if (currentLeft + popconfirmRect.width > window.scrollX + viewportWidth) {
      this.host.style.left = `${window.scrollX + viewportWidth - popconfirmRect.width}px`;
      adjusted = true;
    }

    if (currentTop < window.scrollY) {
      this.host.style.top = `${window.scrollY}px`;
      adjusted = true;
    } else if (currentTop + popconfirmRect.height > window.scrollY + viewportHeight) {
      this.host.style.top = `${window.scrollY + viewportHeight - popconfirmRect.height}px`;
      adjusted = true;
    }

    return adjusted;
  }

  private positionArrowRelativeToParent(
    arrowElement: HTMLDivElement,
    position: string,
    parentRect: DOMRect,
    popconfirmPos: {top: number, left: number},
    popconfirmRect: DOMRect
  ) {
    let targetX = 0, targetY = 0;

    switch(position) {
      case 'top': targetX = parentRect.left + parentRect.width / 2; targetY = parentRect.top; break;
      case 'topLeft': targetX = parentRect.left + 8; targetY = parentRect.top; break;
      case 'topRight': targetX = parentRect.right - 8; targetY = parentRect.top; break;
      case 'bottom': targetX = parentRect.left + parentRect.width / 2; targetY = parentRect.bottom; break;
      case 'bottomLeft': targetX = parentRect.left  + 8; targetY = parentRect.bottom; break;
      case 'bottomRight': targetX = parentRect.right - 8; targetY = parentRect.bottom; break;
      case 'left': targetX = parentRect.left; targetY = parentRect.top + parentRect.height / 2; break;
      case 'leftTop': targetX = parentRect.left; targetY = parentRect.top; break;
      case 'leftBottom': targetX = parentRect.left; targetY = parentRect.bottom; break;
      case 'right': targetX = parentRect.right; targetY = parentRect.top + parentRect.height / 2; break;
      case 'rightTop': targetX = parentRect.right; targetY = parentRect.top; break;
      case 'rightBottom': targetX = parentRect.right; targetY = parentRect.bottom; break;
      default: targetX = parentRect.left + parentRect.width / 2; targetY = parentRect.top + parentRect.height / 2;
    }

    targetX += window.scrollX;
    targetY += window.scrollY;

    if (position.startsWith('top')) {
      arrowElement.style.bottom = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
      arrowElement.style.transform = 'rotate(-45deg)';
      const arrowX = Math.max(8, Math.min(popconfirmRect.width - 8, targetX - popconfirmPos.left));
      arrowElement.style.left = `${arrowX - 4}px`;
    } else if (position.startsWith('bottom')) {
      arrowElement.style.top = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
      arrowElement.style.transform = 'rotate(45deg)';
      const arrowX = Math.max(8, Math.min(popconfirmRect.width - 8, targetX - popconfirmPos.left));
      arrowElement.style.left = `${arrowX - 4}px`;
    } else if (position.startsWith('left')) {
      arrowElement.style.right = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
      arrowElement.style.transform = 'rotate(45deg)';
      const arrowY = Math.max(8, Math.min(popconfirmRect.height - 8, targetY - popconfirmPos.top));
      arrowElement.style.top = `${arrowY - 4}px`;
    } else if (position.startsWith('right')) {
      arrowElement.style.left = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
      arrowElement.style.transform = 'rotate(-135deg)';
      const arrowY = Math.max(8, Math.min(popconfirmRect.height - 8, targetY - popconfirmPos.top));
      arrowElement.style.top = `${arrowY - 4}px`;
    }
  }

  private positionArrowStandard(arrowElement: HTMLDivElement, position: string) {
    switch(position) {
      case "top": arrowElement.style.bottom = "-4px"; arrowElement.style.left = "calc(50% - 4px)"; arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)"; arrowElement.style.transform = "rotate(-45deg)"; break;
      case "left": arrowElement.style.left = "calc(100% - 4px)"; arrowElement.style.top = "calc(50% - 4px)"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)"; arrowElement.style.transform = "rotate(45deg)"; break;
      case "right": arrowElement.style.right = "calc(100% - 4px)"; arrowElement.style.top = "calc(50% - 4px)"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)"; arrowElement.style.transform = "rotate(-135deg)"; break;
      case "bottom": arrowElement.style.top = "-4px"; arrowElement.style.left = "calc(50% - 4px)"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)"; arrowElement.style.transform = "rotate(45deg)"; break;
      case "topLeft": arrowElement.style.bottom = "-4px"; arrowElement.style.left = "8px"; arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)"; arrowElement.style.transform = "rotate(-45deg)"; break;
      case "topRight": arrowElement.style.bottom = "-4px"; arrowElement.style.right = "8px"; arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)"; arrowElement.style.transform = "rotate(-45deg)"; break;
      case "bottomLeft": arrowElement.style.top = "-4px"; arrowElement.style.left = "8px"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)"; arrowElement.style.transform = "rotate(45deg)"; break;
      case "bottomRight": arrowElement.style.top = "-4px"; arrowElement.style.right = "8px"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)"; arrowElement.style.transform = "rotate(45deg)"; break;
      case "leftTop": arrowElement.style.left = "calc(100% - 4px)"; arrowElement.style.top = "8px"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)"; arrowElement.style.transform = "rotate(45deg)"; break;
      case "leftBottom": arrowElement.style.left = "calc(100% - 4px)"; arrowElement.style.bottom = "8px"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)"; arrowElement.style.transform = "rotate(45deg)"; break;
      case "rightTop": arrowElement.style.right = "calc(100% - 4px)"; arrowElement.style.top = "8px"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)"; arrowElement.style.transform = "rotate(-135deg)"; break;
      case "rightBottom": arrowElement.style.right = "calc(100% - 4px)"; arrowElement.style.bottom = "8px"; arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)"; arrowElement.style.transform = "rotate(-135deg)"; break;
    }
  }

  private calculateAllPositions(parentRect: DOMRect, popconfirmRect: DOMRect) {
    const arrowOffset = this.arrow ? this.ARROW_HEIGHT : 0;
    return {
      'top': { top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset, left: window.scrollX + parentRect.left + (parentRect.width - popconfirmRect.width) / 2 },
      'bottom': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + parentRect.left + (parentRect.width - popconfirmRect.width) / 2 },
      'left': { top: window.scrollY + parentRect.top + (parentRect.height - popconfirmRect.height) / 2, left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset },
      'right': { top: window.scrollY + parentRect.top + (parentRect.height - popconfirmRect.height) / 2, left: window.scrollX + parentRect.right + arrowOffset },
      'topLeft': { top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset, left: window.scrollX + parentRect.left },
      'topRight': { top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset, left: window.scrollX + (parentRect.right - popconfirmRect.width) },
      'bottomLeft': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + parentRect.left },
      'bottomRight': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + (parentRect.right - popconfirmRect.width) },
      'leftTop': { top: window.scrollY + parentRect.top, left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset },
      'leftBottom': { top: window.scrollY + parentRect.top + parentRect.height - popconfirmRect.height, left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset },
      'rightTop': { top: window.scrollY + parentRect.top, left: window.scrollX + parentRect.right + arrowOffset },
      'rightBottom': { top: window.scrollY + parentRect.top + parentRect.height - popconfirmRect.height, left: window.scrollX + parentRect.right + arrowOffset }
    };
  }

  // Render 함수
render() {
  return (
    <div class="popconfirm-wrapper">
      {/*
        조건부 렌더링: this.arrow가 true일 때만 div.arrow를 렌더링합니다.
        ref 속성: 렌더링된 실제 DOM 요소를 this.arrowElement에 할당하여,
        다른 함수(setPopconfirmPosition)에서 이 요소의 스타일을 조작할 수 있도록 합니다.
      */}
      {this.arrow && <div class="arrow" ref={(el) => (this.arrowElement = el as HTMLDivElement)}></div>}

      <div class="popconfirm-content">
        <slot></slot>
      </div>

      <div class="popconfirm-footer">
        <sy-button
          size="small"
          class="popconfirm-cancel"
          onClick={this.cancelClick}
        >
          {this.cancelText}
        </sy-button>
        <sy-button
          size="small"
          class="popconfirm-ok"
          variant="primary"
          onClick={this.okClick}
        >
          {this.confirmText}
        </sy-button>
      </div>
    </div>
  );
}
}
