import { LitElement, CSSResultGroup, css, unsafeCSS, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../button/button.element";
import "../icon/icon.element";
import globalCSS from "./styles/popconfirm.scss?inline";

@customElement("sy-popconfirm")
export class PopConfirmElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;

  private parentDom: any;
  private addedToBody = false;
  private ARROW_HEIGHT = 6;
  private DefaultOpendelay = 0;
  private DefaultClosedelay = 0;
  private arrowElement: any;
  private closeTimer: any;
  private openTimer: any;

  @property({ type: Boolean, reflect: true }) arrow: boolean = false;
  @property({ type: Boolean }) closable: boolean = false;
  // @property({ type: String }) focuson: 'ok' | 'cancel' | 'none' = 'ok';
  @property({ type: String, reflect: true }) position:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom" = "top";
  @property({ type: String, reflect: true }) trigger: "click" | "none" = "click";
  @property({ type: Number, reflect: true }) opendelay: number = this.DefaultOpendelay;
  @property({ type: Number, reflect: true }) closedelay: number = this.DefaultClosedelay;

  @state() private visibility = false;

  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.setPopconfirmPosition = this.setPopconfirmPosition.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick, true);
    window.addEventListener("scroll", this.setPopconfirmPosition, true);
    window.addEventListener("resize", this.setPopconfirmPosition, true);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.parentDom = this.parentElement;

    document.body.appendChild(this);
    this.setOpendelay();
    this.setClosedelay();
    this.addEvent();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("visibility")) {
      this.dispatchEvent(
        new CustomEvent("visibleChanged", {
          detail: this.visibility,
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    } else if (changedProperties.has("arrow")) {
      // 화살표 속성 변경 시 위치 업데이트
      if (this.addedToBody) {
        this.updatePopconfirmPosition();
      }
    } else if (changedProperties.has("position")) {
      // 위치 속성 변경 시 위치 업데이트
      if (this.addedToBody) {
        this.updatePopconfirmPosition();
      }
    } else if (changedProperties.has("opendelay")) {
      this.setOpendelay();
    } else if (changedProperties.has("closedelay")) {
      this.setClosedelay();
    }
    
    // 다른 속성들이 변경되었는지 확인하고 필요한 경우 처리
    if (changedProperties.size > 0 && this.addedToBody) {
      // 주요 속성이 이미 처리되었는지 확인
      const handledProps = ["visibility", "arrow", "position", "opendelay", "closedelay"];
      const hasOtherChanges = Array.from(changedProperties.keys()).some(
        prop => !handledProps.includes(String(prop))
      );
      
      if (hasOtherChanges) {
        // 요청 애니메이션 프레임을 사용하여 DOM 렌더링 이후에 위치 업데이트
        requestAnimationFrame(() => {
          this.updatePopconfirmPosition();
        });
      }
    }
  }

  /**
   * 부모 요소가 disabled이거나 readonly 상태인지 확인합니다.
   */
  private isParentDisabledOrReadonly(): boolean {
    if (!this.parentDom) return false;
    
    // disabled 속성 확인
    if (this.parentDom.hasAttribute('disabled') || 
        this.parentDom.getAttribute('aria-disabled') === 'true') {
      return true;
    }
    
    // readonly 속성 확인
    if (this.parentDom.hasAttribute('readonly') || 
        this.parentDom.getAttribute('aria-readonly') === 'true') {
      return true;
    }
    
    return false;
  }

  public setOpen() {
    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly()) {
      return;
    }
    
    this.appendToRoot(true);
  }
  public setClose() {
    this.delayedPopconfirmClose();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick, true);

    if (this.addedToBody) {
      window.removeEventListener("scroll", this.setPopconfirmPosition, true);
      window.removeEventListener("resize", this.setPopconfirmPosition, true);
      window.removeEventListener("keydown", this.handleKeydown.bind(this));
      this.removePopconfirm();
    }
  }

  render() {
    return html`
      <div class="popconfirm-wrapper">
        <div class="popconfirm-content">
          <slot></slot>
        </div>
        <div class="popconfirm-footer">
          <sy-button
            size="small"
            class="popconfirm-cancel"
            @click=${this.cancelClick}
            >Cancel</sy-button
          >
          <sy-button
            size="small"
            class="popconfirm-ok"
            variant="primary"
            @click=${this.okClick}
            >OK</sy-button
          >
        </div>
      </div>
    `;
  }

  private addEvent() {
    if (this.trigger === "click") {
      this.parentDom.addEventListener("click", this.parentClick);
    }

    window.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  private setOpendelay() {
    this.opendelay =
      this.opendelay < this.DefaultOpendelay
        ? this.DefaultOpendelay
        : this.opendelay;
  }

  private setClosedelay() {
    this.closedelay =
      this.closedelay < this.DefaultClosedelay
        ? this.DefaultClosedelay
        : this.closedelay;
  }

  private handleKeydown(e: KeyboardEvent) {
    e.stopPropagation();

    // if(this.focuson !== 'none') {
    if (e.code === "Escape") {
      this.eventEmit("cancel");
    }
    // else if((e.code === 'Enter' || e.code === 'Space')) {
    //   this.#eventEmit(this.focuson);
    // }
    // }
  }

  private parentClick = (event: any) => {
    event.preventDefault();

    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly()) {
      return;
    }
    
    if (this.closeTimer) clearTimeout(this.closeTimer);
    if (this.openTimer) clearTimeout(this.openTimer);
    //event.stopPropagation(); // 이벤트 버블링 중단
    if (!this.addedToBody) {
      this.appendToRoot();
    }
  };

  private appendToRoot = (force: boolean = false) => {
    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly()) {
      return;
    }

    if(this.trigger === 'click' || force) {
      document.body.appendChild(this);
      this.addedToBody = true;
      this.updatePopconfirmPosition();
    }
  };

  private handleOutsideClick = (event: any) => {
    if (this.closable) {
      const isInPopConfirm = this.contains(event.target as Node);
      const isParent = this.parentDom?.contains(event.target as Node);

      if (!isInPopConfirm && !isParent) {
        this.eventEmit("cancel");
      }
    }
  };

  // #setFocus() {
  //   setTimeout(() => {
  //     if (this.focuson === 'ok') {
  //       const btnOK: any = this.shadowRoot!.querySelector('.popconfirm-ok');
  //       btnOK?.setFocus();
  //     } else if (this.focuson === 'cancel') {
  //       const btnCancel: any = this.shadowRoot!.querySelector('.popconfirm-cancel');
  //       btnCancel.setFocus();
  //     }
  //   }, 0);
  // }

  private delayedPopconfirmClose = () => {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      this.removePopconfirm();
    }, this.closedelay);
  };

  private removePopconfirm = () => {
    if (this.isConnected) {
      try {
        document.body.removeChild(this);
        this.addedToBody = false;
        this.visibility = false;
        window.removeEventListener("keydown", this.handleKeydown.bind(this));
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  private updatePopconfirmPosition() {
    if (this.parentDom) {
      // 팝업 컨테이너를 임시로 보이게 하고 화면 밖으로 이동
      this.style.display = "block";
      this.style.visibility = "hidden"; // 사용자에게 보이지 않도록 설정
      this.visibility = false;
      this.style.position = "absolute";
      this.style.left = "0";
      this.style.top = "0";

      // 기존 타이머가 있으면 제거
      if (this.openTimer) {
        clearTimeout(this.openTimer);
      }

      requestAnimationFrame(() => {
        const popconfirmRect = this.getBoundingClientRect();
        this.setPopconfirmPosition();

        this.openTimer = setTimeout(() => {
          this.style.visibility = "visible"; // 이제 사용자에게 보여집니다.
          this.visibility = true;
        }, this.opendelay);
      });
    }
  }
  
  private setPopconfirmPosition() {
    if (this.addedToBody && this.parentDom !== document.body && this.parentDom) {
      const parentRect = this.parentDom.getBoundingClientRect();
      const popconfirmRect = this.getBoundingClientRect();
      
      const positions = this.calculateAllPositions(parentRect, popconfirmRect);
      const { position: bestPosition, coords } = this.findBestPosition(
        positions,
        this.position,
        parentRect,
        popconfirmRect
      );
      
      this.style.top = `${coords.top}px`;
      this.style.left = `${coords.left}px`;
      
      const adjusted = this.adjustForScreenBounds(popconfirmRect);
      
      // 기존 화살표 요소가 있으면 제거
      if (this.arrowElement && this.contains(this.arrowElement)) {
        this.removeChild(this.arrowElement);
        this.arrowElement = null;
      }

      if (this.arrow) {
        this.arrowElement = this.createArrow(
          bestPosition, 
          parentRect, 
          adjusted ? { top: parseFloat(this.style.top), left: parseFloat(this.style.left) } : coords,
          popconfirmRect,
          adjusted
        );
        this.appendChild(this.arrowElement);
      }
    }
  }

  private findBestPosition(
    positions: Record<string, {top: number, left: number}>,
    preferredPosition: string,
    parentRect: DOMRect,
    popconfirmRect: DOMRect
  ) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    
    // 직접적인 반대 위치 맵
    const oppositePositions: Record<string, string> = {
      'top': 'bottom',
      'bottom': 'top',
      'left': 'right',
      'right': 'left',
      'topLeft': 'bottomLeft',
      'topRight': 'bottomRight',
      'bottomLeft': 'topLeft',
      'bottomRight': 'topRight',
      'leftTop': 'rightTop',
      'leftBottom': 'rightBottom',
      'rightTop': 'leftTop',
      'rightBottom': 'leftBottom'
    };
    
    // 선호 위치 및 좌표 초기화
    let position = preferredPosition;
    let coords = positions[preferredPosition];
    
    // 위치별로 관련된 방향만 확인
    const checkDirection = (pos: string, coords: {top: number, left: number}) => {
      if (pos.startsWith('top')) {
        // top 계열 위치는 위쪽 공간만 확인
        return coords.top < scrollY;
      } 
      else if (pos.startsWith('bottom')) {
        // bottom 계열 위치는 아래쪽 공간만 확인
        return coords.top + popconfirmRect.height > scrollY + viewportHeight;
      }
      else if (pos.startsWith('left')) {
        // left 계열 위치는 왼쪽 공간만 확인
        return coords.left < scrollX;
      }
      else if (pos.startsWith('right')) {
        // right 계열 위치는 오른쪽 공간만 확인
        return coords.left + popconfirmRect.width > scrollX + viewportWidth;
      }
      return false;
    };
    
    // 선호 위치가 해당 방향에서 벗어났는지 확인
    if (checkDirection(preferredPosition, coords)) {      
      // 반대 위치 시도
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
    
    const currentLeft = parseFloat(this.style.left);
    const currentTop = parseFloat(this.style.top);
    
    if (currentLeft < window.scrollX) {
      this.style.left = `${window.scrollX}px`;
      adjusted = true;
    }
    else if (currentLeft + popconfirmRect.width > window.scrollX + viewportWidth) {
      this.style.left = `${window.scrollX + viewportWidth - popconfirmRect.width}px`;
      adjusted = true;
    }
    
    if (currentTop < window.scrollY) {
      this.style.top = `${window.scrollY}px`;
      adjusted = true;
    }
    else if (currentTop + popconfirmRect.height > window.scrollY + viewportHeight) {
      this.style.top = `${window.scrollY + viewportHeight - popconfirmRect.height}px`;
      adjusted = true;
    }
    
    return adjusted;
  }

  private createArrow(
    position: string,
    parentRect: DOMRect,
    popconfirmPos: {top: number, left: number},
    popconfirmRect: DOMRect,
    positionAdjusted: boolean
  ) {
    const arrowElement = document.createElement("div");
    arrowElement.classList.add("arrow");
    arrowElement.style.position = "absolute";
    arrowElement.style.width = "8px";
    arrowElement.style.height = "8px";
    arrowElement.style.boxShadow = "rgba(0 0 0 / 0.24) 0px 5px 1px";
    arrowElement.style.background = "white";
  
    if (positionAdjusted) {
      this.positionArrowRelativeToParent(arrowElement, position, parentRect, popconfirmPos, popconfirmRect);
    } else {
      this.positionArrowStandard(arrowElement, position);
    }
  
    return arrowElement;
  }

  private positionArrowRelativeToParent(
    arrowElement: HTMLDivElement,
    position: string,
    parentRect: DOMRect,
    popconfirmPos: {top: number, left: number},
    popconfirmRect: DOMRect
  ) {
    let targetX, targetY;
    
    switch(position) {
      case 'top':
        targetX = parentRect.left + parentRect.width / 2;
        targetY = parentRect.top;
        break;
      case 'topLeft':
        targetX = parentRect.left + 8;
        targetY = parentRect.top;
        break;
      case 'topRight':
        targetX = parentRect.right - 8;
        targetY = parentRect.top;
        break;
      case 'bottom':
        targetX = parentRect.left + parentRect.width / 2;
        targetY = parentRect.bottom;
        break;
      case 'bottomLeft':
        targetX = parentRect.left  + 8;
        targetY = parentRect.bottom;
        break;
      case 'bottomRight':
        targetX = parentRect.right - 8;
        targetY = parentRect.bottom;
        break;
      case 'left':
        targetX = parentRect.left;
        targetY = parentRect.top + parentRect.height / 2;
        break;
      case 'leftTop':
        targetX = parentRect.left;
        targetY = parentRect.top;
        break;
      case 'leftBottom':
        targetX = parentRect.left;
        targetY = parentRect.bottom;
        break;
      case 'right':
        targetX = parentRect.right;
        targetY = parentRect.top + parentRect.height / 2;
        break;
      case 'rightTop':
        targetX = parentRect.right;
        targetY = parentRect.top;
        break;
      case 'rightBottom':
        targetX = parentRect.right;
        targetY = parentRect.bottom;
        break;
      default:
        targetX = parentRect.left + parentRect.width / 2;
        targetY = parentRect.top + parentRect.height / 2;
    }
    
    targetX += window.scrollX;
    targetY += window.scrollY;
    
    if (position.startsWith('top')) {
      arrowElement.style.bottom = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
      arrowElement.style.transform = 'rotate(-45deg)';
      
      const arrowX = Math.max(8, Math.min(popconfirmRect.width - 8, targetX - popconfirmPos.left));
      arrowElement.style.left = `${arrowX - 4}px`;
    }
    else if (position.startsWith('bottom')) {
      arrowElement.style.top = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
      arrowElement.style.transform = 'rotate(45deg)';
      
      const arrowX = Math.max(8, Math.min(popconfirmRect.width - 8, targetX - popconfirmPos.left));
      arrowElement.style.left = `${arrowX - 4}px`;
    }
    else if (position.startsWith('left')) {
      arrowElement.style.right = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
      arrowElement.style.transform = 'rotate(45deg)';
      
      const arrowY = Math.max(8, Math.min(popconfirmRect.height - 8, targetY - popconfirmPos.top));
      arrowElement.style.top = `${arrowY - 4}px`;
    }
    else if (position.startsWith('right')) {
      arrowElement.style.left = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
      arrowElement.style.transform = 'rotate(-135deg)';
      
      const arrowY = Math.max(8, Math.min(popconfirmRect.height - 8, targetY - popconfirmPos.top));
      arrowElement.style.top = `${arrowY - 4}px`;
    }
  }

  private positionArrowStandard(arrowElement: HTMLDivElement, position: string) {
    switch(position) {
      case "top":
        arrowElement.style.bottom = "-4px";
        arrowElement.style.left = "calc(50% - 4px)";
        arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)";
        arrowElement.style.transform = "rotate(-45deg)";
        break;
      case "left":
        arrowElement.style.left = "calc(100% - 4px)";
        arrowElement.style.top = "calc(50% - 4px)";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
        arrowElement.style.transform = "rotate(45deg)";
        break;
      case "right":
        arrowElement.style.right = "calc(100% - 4px)";
        arrowElement.style.top = "calc(50% - 4px)";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
        arrowElement.style.transform = "rotate(-135deg)";
        break;
      case "bottom":
        arrowElement.style.bottom = "100%";
        arrowElement.style.top = "-4px";
        arrowElement.style.left = "calc(50% - 4px)";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)";
        arrowElement.style.transform = "rotate(45deg)";
        break;
      case "topLeft":
        arrowElement.style.bottom = "-4px";
        arrowElement.style.left = "12px";
        arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)";
        arrowElement.style.transform = "rotate(-45deg)";
        break;
      case "topRight":
        arrowElement.style.bottom = "-4px";
        arrowElement.style.right = "12px";
        arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)";
        arrowElement.style.transform = "rotate(-45deg)";
        break;
      case "bottomLeft":
        arrowElement.style.bottom = "100%";
        arrowElement.style.top = "-4px";
        arrowElement.style.left = "12px";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)";
        arrowElement.style.transform = "rotate(45deg)";
        break;
      case "bottomRight":
        arrowElement.style.bottom = "100%";
        arrowElement.style.top = "-px";
        arrowElement.style.right = "12px";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)";
        arrowElement.style.transform = "rotate(45deg)";
        break;
      case "leftTop":
        arrowElement.style.left = "calc(100% - 4px)";
        arrowElement.style.top = "12px";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
        arrowElement.style.transform = "rotate(45deg)";
        break;
      case "leftBottom":
        arrowElement.style.left = "calc(100% - 4px)";
        arrowElement.style.bottom = "12px";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
        arrowElement.style.transform = "rotate(45deg)";
        break;
      case "rightTop":
        arrowElement.style.right = "calc(100% - 4px)";
        arrowElement.style.top = "12px";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
        arrowElement.style.transform = "rotate(-135deg)";
        break;
      case "rightBottom":
        arrowElement.style.right = "calc(100% - 4px)";
        arrowElement.style.bottom = "12px";
        arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
        arrowElement.style.transform = "rotate(-135deg)";
        break;
    }
  }

  private calculateAllPositions(parentRect: DOMRect, popconfirmRect: DOMRect) {
    const arrowOffset = this.arrow ? this.ARROW_HEIGHT : 0;
    
    return {
      'top': {
        top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset,
        left: window.scrollX + parentRect.left + (parentRect.width - popconfirmRect.width) / 2,
      }, 
      'bottom': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + parentRect.left + (parentRect.width - popconfirmRect.width) / 2,
      },
      'left': {
        top: window.scrollY + parentRect.top + (parentRect.height - popconfirmRect.height) / 2,
        left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset,
      },
      'right': {
        top: window.scrollY + parentRect.top + (parentRect.height - popconfirmRect.height) / 2,
        left: window.scrollX + parentRect.right + arrowOffset,
      },            
      'topLeft': {
        top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset,
        left: window.scrollX + parentRect.left,
      },
      'topRight': {
        top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset,
        left: window.scrollX + (parentRect.right - popconfirmRect.width),
      },
      'bottomLeft': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + parentRect.left,
      },
      'bottomRight': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + (parentRect.right - popconfirmRect.width),
      },
      'leftTop': {
        top: window.scrollY + parentRect.top,
        left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset,
      },
      'leftBottom': {
        top: window.scrollY + parentRect.top + parentRect.height - popconfirmRect.height,
        left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset,
      },
      'rightTop': {
        top: window.scrollY + parentRect.top,
        left: window.scrollX + parentRect.right + arrowOffset,
      },
      'rightBottom': {
        top: window.scrollY + parentRect.top + parentRect.height - popconfirmRect.height,
        left: window.scrollX + parentRect.right + arrowOffset,
      }
    };
  }

  // private replacePositionToLeft(position: string): "left" | "leftTop" | "leftBottom" {
  //   if (position.indexOf("left") < 0) {
  //     position = ("left" + position.slice("right".length)) as
  //       | "left"
  //       | "leftTop"
  //       | "leftBottom";
  //   }

  //   return position as "left" | "leftTop" | "leftBottom";
  // }

  // private replacePositionToRight(
  //   position: string
  // ): "right" | "rightTop" | "rightBottom" {
  //   if (position.indexOf("right") < 0) {
  //     position = ("right" + position.slice("left".length)) as
  //       | "right"
  //       | "rightTop"
  //       | "rightBottom";
  //   }

  //   return position as "right" | "rightTop" | "rightBottom";
  // }

  // private replacePositionToTop(position: string): "top" | "topLeft" | "topRight" {
  //   if (position.indexOf("top") < 0) {
  //     position = ("top" + position.slice("bottom".length)) as
  //       | "top"
  //       | "topLeft"
  //       | "topRight";
  //   }

  //   return position as "top" | "topLeft" | "topRight";
  // }

  // private replacePositionToBottom(
  //   position: string
  // ): "bottom" | "bottomLeft" | "bottomRight" {
  //   if (position.indexOf("bottom") < 0) {
  //     position = ("bottom" + position.slice("top".length)) as
  //       | "bottom"
  //       | "bottomLeft"
  //       | "bottomRight";
  //   }

  //   return position as "bottom" | "bottomLeft" | "bottomRight";
  // }

  private cancelClick(e: MouseEvent) {
    e.preventDefault();
    this.eventEmit("cancel");
  }

  private okClick(e: MouseEvent) {
    e.preventDefault();
    this.eventEmit("ok");
  }

  private eventEmit(type: "ok" | "cancel") {
    this.dispatchEvent(
      new CustomEvent("selected", {
        detail: type,
        bubbles: true,
        composed: true,
      })
    );
    this.delayedPopconfirmClose();
  }
}
