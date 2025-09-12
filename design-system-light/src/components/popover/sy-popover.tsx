import { Component, Prop, State, Element, Method, Watch, h } from '@stencil/core';

export interface HTMLSyPopoverElement extends HTMLElement {
  arrow: boolean;
  open: boolean;
  position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  trigger: 'hover' | 'click' | 'focus' | 'null';
  opendelay: number;
  closedelay: number;
  // sticky 프로퍼티 추가
  sticky: boolean;
}
/**
 * 팝오버 컴포넌트 - 다른 요소에 부가 정보를 표시하는 오버레이 요소
 * 마우스 호버, 클릭, 포커스 등의 트리거로 활성화됩니다.
 */
@Component({
  tag: 'sy-popover',
  styleUrl: 'sy-popover.scss',
  shadow: false,
  scoped: true,
})
export class SyPopover {
  @Element() el: HTMLElement;
  // 상태 관련 필드
  private addedToBody = false;         // body에 추가되었는지 여부
  private isMouseOverParent = false;   // 부모 요소 위에 마우스가 있는지
  private isMouseOverPopover = false;  // 팝오버 위에 마우스가 있는지
  private ARROW_HEIGHT = 6;            // 화살표 높이 (px)
  private closeTimer: any;             // 닫기 타이머 참조
  private openTimer: any;              // 열기 타이머 참조
  private parentDom: any;              // 부모 요소 참조
  private DefaultOpendelay = 0;        // 기본 열기 딜레이(ms)
  private DefaultClosedelay = 100;     // 기본 닫기 딜레이(ms)
  private optionClickTimer: any = null; // 옵션 클릭 타이머 참조
  private lastOptionClickTime = 0;     // 마지막 옵션 클릭 시간
  private lastParentClickTime = 0;     // 마지막 부모 클릭 시간
  private optionInteractionActive = false; // 옵션 상호작용 활성화 여부
  private preventPositionUpdate = false; // 위치 업데이트 방지 플래그

  // 디바운스 및 쓰로틀링 시간 상수
  private CLICK_DEBOUNCE_TIME = 300;   // 옵션 클릭 후 상태 유지 시간(ms)
  private OBSERVER_CLEANUP_TIME = 3000; // 옵저버 정리 시간(ms)
  private MOUSELEAVE_DELAY = 200;      // 마우스 이탈 후 상태 체크 지연 시간(ms)

  // 속성
  @Prop({ reflect: true }) arrow: boolean = false;     // 화살표 표시 여부
  @Prop({ reflect: true }) open: boolean = false;    // 열림 상태 여부
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' = 'bottom'; // 위치
  @Prop() trigger: 'hover' | 'click' | 'focus' | 'null' = 'hover'; // 트리거 방식
  @Prop({ reflect: true }) opendelay: number = 0; // 열기 지연 시간
  @Prop({ reflect: true }) closedelay: number = 100; // 닫기 지연 시간

  // =================================================================
  // 1. sticky 프로퍼티 추가 (기본값 false)
  // =================================================================
  @Prop() sticky: boolean = false;

  @State() private arrowElement: any; // 화살표 요소 참조

  /**
   * 생성자: 이벤트 핸들러 바인딩
   */
  componentWillLoad() {
    // 메서드 바인딩
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.updatePopoverPosition = this.updatePopoverPosition.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.setBlur = this.setBlur.bind(this);
    this.popoverMouseEnter = this.popoverMouseEnter.bind(this);
    this.popoverMouseLeave = this.popoverMouseLeave.bind(this);
    this.closeTreeSelectOptions = this.closeTreeSelectOptions.bind(this);
  }

  /**
   * DOM에 연결될 때 이벤트 리스너를 설정합니다.
   */
  componentDidLoad() {
    // 전역 이벤트 리스너를 한 번만 등록
    this.setupGlobalClickListener();

    if (this.arrow) {
      this.el.setAttribute('arrow', 'true');
    } else {
      this.el.removeAttribute('arrow');
    }
  }

  /**
   * 전역 클릭 리스너를 설정합니다.
   */
  private setupGlobalClickListener() {
    // 기존 리스너 제거 (중복 방지)
    document.removeEventListener('click', this.handleOutsideClick, true);

    // 새로운 리스너 등록
    document.addEventListener('click', this.handleOutsideClick, true);

    // 스크롤/리사이즈 이벤트도 등록
    window.addEventListener("scroll", this.updatePopoverPosition, true);
    window.addEventListener("resize", this.updatePopoverPosition, true);
  }

  /**
   * 첫 렌더링 후 초기화 작업을 수행합니다.
   */
  componentDidRender() {
    // parentDom이 이미 설정되어 있고 addedToBody가 true면 재설정하지 않음
    if (!this.parentDom || (this.addedToBody && this.el.parentElement === document.body)) {
      // addedToBody가 true인 경우 원래 부모를 유지해야 함
      if (!this.addedToBody) {
        this.parentDom = this.el.parentElement;
      } else {
        return; // addEvent 호출하지 않음
      }
    }

    this.addEvent();
  }

  /**
   * 속성 변경 시 적절한 업데이트를 수행합니다.
   */
  @Watch('trigger')
  @Watch('open')
  @Watch('opendelay')
  @Watch('closedelay')
  watchProps(_newValue: any, _oldValue: any, propName: string) {
    if (propName === 'trigger') {
      if(!this.open) {
        this.addEvent();
      }
    } else if (propName === 'open') {
      this.addEvent();
    } else if (propName === 'opendelay') {
      this.setOpendelay();
    } else if (propName === 'closedelay') {
      this.setClosedelay();
    }
  }

  /**
   * DOM에서 분리될 때 정리 작업을 수행합니다.
   */
  disconnectedCallback() {
    // 모든 이벤트 리스너 제거
    document.removeEventListener('click', this.handleOutsideClick, true);
    document.removeEventListener('click', this.handleOptionClick, true);

    if (this.optionClickTimer) {
      clearTimeout(this.optionClickTimer);
    }

    if (this.addedToBody) {
      window.removeEventListener("scroll", this.updatePopoverPosition, true);
      window.removeEventListener("resize", this.updatePopoverPosition, true);
      this.removePopover();
    }
  }

  /**
   * 슬롯을 렌더링합니다.
   */
  render() {
    return <slot></slot>;
  }

  /**
   * 팝업을 열기 위한 공개 메서드
   */
  @Method()
  public async setOpen() {
    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly() || this.trigger !== 'null') {
      return;
    }

    this.appendToRoot();
  }

  /**
   * 팝업을 닫기 위한 공개 메서드
   */
  @Method()
  public async setClose() {
    this.delayedPopoverClose();
  }

  // ... (setOpendelay, setClosedelay, isParentDisabledOrReadonly 등은 변경 없음) ...
  private setOpendelay() {
    this.opendelay = this.opendelay < this.DefaultOpendelay ? this.DefaultOpendelay : this.opendelay;
  }

  private setClosedelay() {
    this.closedelay = this.closedelay < this.DefaultClosedelay ? this.DefaultClosedelay : this.closedelay;
  }

  private isParentDisabledOrReadonly(): boolean {
    if (!this.parentDom) return false;

    if (this.parentDom.hasAttribute('disabled') || this.parentDom.getAttribute('aria-disabled') === 'true') {
      return true;
    }

    if (this.parentDom.hasAttribute('readonly') || this.parentDom.getAttribute('aria-readonly') === 'true') {
      return true;
    }

    return false;
  }

  private addEvent() {
    const parent = this.parentDom;
    if (!this.open) {
      if(parent) {
        parent.removeEventListener('click', this.parentClick);
        parent.removeEventListener('mouseenter', this.parentMouseEnter, true);
        parent.removeEventListener('mouseleave', this.parentMouseLeave, true);
        parent.removeEventListener('focus', this.setFocus);
        parent.removeEventListener('blur', this.setBlur);

        if (this.trigger === 'hover') {
          parent.addEventListener('mouseenter', this.parentMouseEnter, true);
          parent.addEventListener('mouseleave', this.parentMouseLeave, true);
        } else if (this.trigger === 'click') {
          parent.addEventListener('click', this.parentClick);
        } else if (this.trigger === 'focus') {
          parent.addEventListener('focus', this.setFocus);
          parent.addEventListener('blur', this.setBlur);
        }
      } else {
        console.log('[POPOVER] No parent element found');
      }
    } else if (this.open) {
      this.appendToRoot();
    }
  }

  private appendToRoot = () => {
    // ... (appendToRoot 로직은 변경 없음) ...
    if (this.isParentDisabledOrReadonly()) {
      return;
    }

    if (this.parentDom !== document.body) {
      if (this.addedToBody && this.el.isConnected && this.el.parentElement === document.body) {
        if (this.preventPositionUpdate ||
            this.optionInteractionActive ||
            (performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME) ||
            this.isSyInteractionActive()) {
          return;
        }

        this.updatePopoverPositionWithDelay();
        return;
      }

      try {
        document.body.appendChild(this.el);
        this.addedToBody = true;
        this.setupGlobalClickListener();
        this.updatePopoverPositionWithDelay();
      } catch (err) {
        console.error('[POPOVER] appendToRoot error:', err);
      }

      if (this.trigger === 'hover') {
        this.el.addEventListener('mouseenter', this.popoverMouseEnter);
        this.el.addEventListener('mouseleave', this.popoverMouseLeave);
        this.setupOptionDetection();
      }
    } else {
      console.log('[POPOVER] parentDom is document.body, skipping');
    }
  }

  private removePopover = () => {
    // ... (removePopover 로직은 변경 없음) ...
    if (this.optionInteractionActive || (performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME)) {
      return;
    }

    try {
      if (!this.el.isConnected || this.el.parentElement !== document.body) {
        this.addedToBody = false;
        return;
      }

      this.closeTreeSelectOptions();

      if (this.trigger === 'hover') {
        this.el.removeEventListener('mouseenter', this.popoverMouseEnter);
        this.el.removeEventListener('mouseleave', this.popoverMouseLeave);
      }

      document.body.removeChild(this.el);
      this.addedToBody = false;

      this.isMouseOverParent = false;
      this.isMouseOverPopover = false;
      this.optionInteractionActive = false;

      if (this.openTimer) {
        clearTimeout(this.openTimer);
        this.openTimer = null;
      }
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }

    } catch (err) {
      console.error('[POPOVER] popover 제거 중 오류:', err);
    }
  }

  // ... (나머지 메서드들도 대부분 변경 없음) ...

  // =================================================================
  // 2. 부모 요소가 뷰포트 안에 있는지 확인하는 헬퍼 함수 추가
  // =================================================================
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

  /**
   * 팝업의 위치를 업데이트합니다.
   */
  private updatePopoverPosition() {
    if (this.addedToBody && this.parentDom !== document.body && this.parentDom) {
      // =================================================================
      // 3. sticky 옵션과 부모 요소의 가시성 체크 로직 추가
      // =================================================================
      if (!this.sticky && !this.isParentInView()) {
        this.el.style.visibility = 'hidden';
        return;
      }

      const parentRect = this.parentDom.getBoundingClientRect();
      this.el.style.display = 'block';
      this.el.style.visibility = 'hidden';
      this.el.style.position = 'absolute';
      this.el.style.left = '0';
      this.el.style.top = '0';

      requestAnimationFrame(() => {
        const popoverRect = this.el.getBoundingClientRect();
        const positions = this.calculateAllPositions(parentRect, popoverRect);

        const { position: bestPosition, coords } = this.findBestPosition(
          positions,
          this.position,
          parentRect,
          popoverRect
        );

        this.el.style.top = `${coords.top}px`;
        this.el.style.left = `${coords.left}px`;

        const adjusted = this.adjustForScreenBounds(popoverRect);

        if(this.el.contains(this.arrowElement)) {
          this.el.removeChild(this.arrowElement);
        }

        if(this.arrow) {
          this.arrowElement = this.createArrow(
            bestPosition,
            parentRect,
            adjusted ? { top: parseFloat(this.el.style.top), left: parseFloat(this.el.style.left) } : coords,
            popoverRect,
            adjusted
          );
          this.el.appendChild(this.arrowElement);
        }

        this.openTimer = setTimeout(() => {
          this.el.style.visibility = 'visible';
        }, this.opendelay);
      });
    }
  }

  // ... (findBestPosition, adjustForScreenBounds, createArrow 등 나머지 메서드는 변경 없음) ...
  private closeTreeSelectOptions() {
    try {
      const treeSelectContainers = document.querySelectorAll('.sy-tree-select-option-container');
      treeSelectContainers.forEach(container => {
        if (container.parentElement === document.body) {
          container.remove();
        }
      });
    } catch (error) {
      console.error('tree-select 옵션 컨테이너 제거 중 오류:', error);
    }
  }

  private setFocus(_event: any) {
    if (this.isParentDisabledOrReadonly()) {
      return;
    }

    this.appendToRoot();
  }

  private setBlur(_event: any) {
    if (this.trigger === 'focus') {
      this.removePopover();
    } else {
      this.delayedPopoverClose();
    }
  }

  private delayedPopoverClose = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }

    this.closeTimer = setTimeout(() => {
      const shouldClose = !this.isMouseOverParent && !this.isMouseOverPopover && !this.optionInteractionActive;
      const noRecentOptionClick = performance.now() - this.lastOptionClickTime > this.CLICK_DEBOUNCE_TIME;

      if (shouldClose && noRecentOptionClick) {
        this.removePopover();
      }
    }, this.closedelay);
  }

  private parentMouseEnter = (_event: MouseEvent) => {
    if (this.isParentDisabledOrReadonly()) {
      return;
    }

    this.isMouseOverParent = true;

    if (this.openTimer) clearTimeout(this.openTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);

    this.appendToRoot();
  }

  private parentMouseLeave = (_event: MouseEvent) => {
    this.isMouseOverParent = false;

    if (this.closeTimer) clearTimeout(this.closeTimer);

    this.closeTimer = setTimeout(() => {
      this.optionInteractionActive = false;
      this.closeTreeSelectOptions();
      this.removePopover();
    }, this.closedelay);
  }

  private parentClick = () => {
    if (this.isParentDisabledOrReadonly()) {
      return;
    }

    this.lastParentClickTime = performance.now();

    if (this.addedToBody) {
      this.removePopover();
    } else {
      this.appendToRoot();
    }
  }

  private findBestPosition(
    positions: Record<string, {top: number, left: number}>,
    preferredPosition: string,
    _parentRect: DOMRect,
    popoverRect: DOMRect
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
      if (pos.startsWith('bottom')) return crds.top + popoverRect.height > scrollY + viewportHeight;
      if (pos.startsWith('left')) return crds.left < scrollX;
      if (pos.startsWith('right')) return crds.left + popoverRect.width > scrollX + viewportWidth;
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

  private adjustForScreenBounds(popoverRect: DOMRect): boolean {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjusted = false;

    const currentLeft = parseFloat(this.el.style.left);
    const currentTop = parseFloat(this.el.style.top);

    if (currentLeft < window.scrollX) {
      this.el.style.left = `${window.scrollX}px`;
      adjusted = true;
    }
    else if (currentLeft + popoverRect.width > window.scrollX + viewportWidth) {
      this.el.style.left = `${window.scrollX + viewportWidth - popoverRect.width}px`;
      adjusted = true;
    }

    if (currentTop < window.scrollY) {
      this.el.style.top = `${window.scrollY}px`;
      adjusted = true;
    }
    else if (currentTop + popoverRect.height > window.scrollY + viewportHeight) {
      this.el.style.top = `${window.scrollY + viewportHeight - popoverRect.height}px`;
      adjusted = true;
    }

    return adjusted;
  }

  private createArrow(
    position: string,
    parentRect: DOMRect,
    popoverPos: {top: number, left: number},
    popoverRect: DOMRect,
    positionAdjusted: boolean
  ) {
    const arrowElement = document.createElement('div');
    arrowElement.classList.add('arrow');
    arrowElement.style.position = 'absolute';
    arrowElement.style.width = '8px';
    arrowElement.style.height = '8px';
    arrowElement.style.boxShadow = 'rgba(0 0 0 / 0.24) 0px 5px 1px';
    arrowElement.style.background = 'white';

    if (positionAdjusted) {
      this.positionArrowRelativeToParent(arrowElement, position, parentRect, popoverPos, popoverRect);
    } else {
      this.positionArrowStandard(arrowElement, position);
    }

    return arrowElement;
  }

  private positionArrowRelativeToParent(
    arrowElement: HTMLDivElement,
    position: string,
    parentRect: DOMRect,
    popoverPos: {top: number, left: number},
    popoverRect: DOMRect
  ) {
    let targetX, targetY;

    switch(position) {
      case 'top': targetX = parentRect.left + parentRect.width / 2; targetY = parentRect.top; break;
      case 'topLeft': targetX = parentRect.left + 8; targetY = parentRect.top; break;
      case 'topRight': targetX = parentRect.right - 8; targetY = parentRect.top; break;
      case 'bottom': targetX = parentRect.left + parentRect.width / 2; targetY = parentRect.bottom; break;
      case 'bottomLeft': targetX = parentRect.left + 8; targetY = parentRect.bottom; break;
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
      const arrowX = Math.max(8, Math.min(popoverRect.width - 8, targetX - popoverPos.left));
      arrowElement.style.left = `${arrowX - 4}px`;
    }
    else if (position.startsWith('bottom')) {
      arrowElement.style.top = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
      arrowElement.style.transform = 'rotate(45deg)';
      const arrowX = Math.max(8, Math.min(popoverRect.width - 8, targetX - popoverPos.left));
      arrowElement.style.left = `${arrowX - 4}px`;
    }
    else if (position.startsWith('left')) {
      arrowElement.style.right = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
      arrowElement.style.transform = 'rotate(45deg)';
      const arrowY = Math.max(8, Math.min(popoverRect.height - 8, targetY - popoverPos.top));
      arrowElement.style.top = `${arrowY - 4}px`;
    }
    else if (position.startsWith('right')) {
      arrowElement.style.left = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
      arrowElement.style.transform = 'rotate(-135deg)';
      const arrowY = Math.max(8, Math.min(popoverRect.height - 8, targetY - popoverPos.top));
      arrowElement.style.top = `${arrowY - 4}px`;
    }
  }

  private positionArrowStandard(arrowElement: HTMLDivElement, position: string) {
    switch(position) {
      case 'top':
        arrowElement.style.bottom = '-4px'; arrowElement.style.left = 'calc(50% - 4px)';
        arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)'; arrowElement.style.transform = 'rotate(-45deg)';
        break;
      case 'left':
        arrowElement.style.left = 'calc(100% - 4px)'; arrowElement.style.top = 'calc(50% - 4px)';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)'; arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'right':
        arrowElement.style.right = 'calc(100% - 4px)'; arrowElement.style.top = 'calc(50% - 4px)';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)'; arrowElement.style.transform = 'rotate(-135deg)';
        break;
      case 'bottom':
        arrowElement.style.top = '-4px'; arrowElement.style.left = 'calc(50% - 4px)';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)'; arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'topLeft':
        arrowElement.style.bottom = '-4px'; arrowElement.style.left = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)'; arrowElement.style.transform = 'rotate(-45deg)';
        break;
      case 'topRight':
        arrowElement.style.bottom = '-4px'; arrowElement.style.right = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)'; arrowElement.style.transform = 'rotate(-45deg)';
        break;
      case 'bottomLeft':
        arrowElement.style.top = '-4px'; arrowElement.style.left = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)'; arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'bottomRight':
        arrowElement.style.top = '-4px'; arrowElement.style.right = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)'; arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'leftTop':
        arrowElement.style.left = 'calc(100% - 4px)'; arrowElement.style.top = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)'; arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'leftBottom':
        arrowElement.style.left = 'calc(100% - 4px)'; arrowElement.style.bottom = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)'; arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'rightTop':
        arrowElement.style.right = 'calc(100% - 4px)'; arrowElement.style.top = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)'; arrowElement.style.transform = 'rotate(-135deg)';
        break;
      case 'rightBottom':
        arrowElement.style.right = 'calc(100% - 4px)'; arrowElement.style.bottom = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)'; arrowElement.style.transform = 'rotate(-135deg)';
        break;
    }
  }

  private handleOutsideClick = (event: any) => {
    if (this.trigger === 'hover' || !this.addedToBody) {
      return;
    }

    const timeSinceParentClick = performance.now() - this.lastParentClickTime;
    if (this.trigger === 'click' && timeSinceParentClick < 100) {
      return;
    }

    const target = event.target as HTMLElement;

    const isInPopover = this.el?.contains(target);
    const isParent = this.parentDom?.contains(target);

    if (!isInPopover && !isParent) {
      this.removePopover();
    } else {
      console.log('[POPOVER] Click inside popover or parent, not closing');
    }
  };

  private calculateAllPositions(parentRect: DOMRect, popoverRect: DOMRect) {
    const arrowOffset = this.arrow ? this.ARROW_HEIGHT : 0;

    return {
      'top': { top: window.scrollY + parentRect.top - popoverRect.height - arrowOffset, left: window.scrollX + parentRect.left + (parentRect.width - popoverRect.width) / 2 },
      'bottom': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + parentRect.left + (parentRect.width - popoverRect.width) / 2 },
      'left': { top: window.scrollY + parentRect.top + (parentRect.height - popoverRect.height) / 2, left: window.scrollX + parentRect.left - popoverRect.width - arrowOffset },
      'right': { top: window.scrollY + parentRect.top + (parentRect.height - popoverRect.height) / 2, left: window.scrollX + parentRect.right + arrowOffset },
      'topLeft': { top: window.scrollY + parentRect.top - popoverRect.height - arrowOffset, left: window.scrollX + parentRect.left },
      'topRight': { top: window.scrollY + parentRect.top - popoverRect.height - arrowOffset, left: window.scrollX + (parentRect.right - popoverRect.width) },
      'bottomLeft': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + parentRect.left },
      'bottomRight': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + (parentRect.right - popoverRect.width) },
      'leftTop': { top: window.scrollY + parentRect.top, left: window.scrollX + parentRect.left - popoverRect.width - arrowOffset },
      'leftBottom': { top: window.scrollY + parentRect.top + parentRect.height - popoverRect.height, left: window.scrollX + parentRect.left - popoverRect.width - arrowOffset },
      'rightTop': { top: window.scrollY + parentRect.top, left: window.scrollX + parentRect.right + arrowOffset },
      'rightBottom': { top: window.scrollY + parentRect.top + parentRect.height - popoverRect.height, left: window.scrollX + parentRect.right + arrowOffset }
    };
  }

  private popoverMouseEnter(_e: MouseEvent) {
    this.isMouseOverPopover = true;
    if (this.closeTimer) clearTimeout(this.closeTimer);
  }

  private popoverMouseLeave(e: MouseEvent) {
    const target = e.relatedTarget as HTMLElement;

    if (this.optionInteractionActive || performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME) return;

    if (this.isOptionRelated(target) ||
        target?.tagName?.toLowerCase().startsWith('sy-menu') ||
        target?.closest('sy-menu, sy-menu-item, sy-menu-sub, sy-menu-group')) {
      return;
    }

    if (this.parentDom?.contains(target)) {
      this.isMouseOverPopover = false;
      this.isMouseOverParent = true;
      return;
    }

    this.isMouseOverPopover = false;

    if (this.trigger === 'hover') this.delayedPopoverClose();
  }

  private setupOptionDetection() {
    const setupContainerListeners = (container: Element) => {
      if ((container as any).__popoverListenersAdded) return;
      (container as any).__popoverListenersAdded = true;

      container.addEventListener('mouseenter', () => {
        this.optionInteractionActive = true;
        this.isMouseOverPopover = true;
        if (this.closeTimer) clearTimeout(this.closeTimer);
      });

      container.addEventListener('mouseleave', (e: any) => {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (relatedTarget === this.el || this.el.contains(relatedTarget) || this.isOptionRelated(relatedTarget) || this.parentDom?.contains(relatedTarget)) return;

        if (this.trigger === 'hover') {
          this.optionInteractionActive = false;
          this.isMouseOverPopover = false;
          this.delayedPopoverClose();
        } else {
          setTimeout(() => {
            if (!this.isMouseOver()) {
              this.optionInteractionActive = false;
              if (this.trigger === 'hover') this.delayedPopoverClose();
            }
          }, this.MOUSELEAVE_DELAY);
        }
      });

      container.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        if (target.tagName?.toLowerCase() === 'sy-option' || target.closest('sy-option') ||
            target.tagName?.toLowerCase().startsWith('sy-menu') || target.closest('[class*="sy-menu"], sy-menu, sy-menu-item')) {
          this.isMouseOverPopover = true;
          this.optionInteractionActive = true;
          this.lastOptionClickTime = performance.now();
          if (this.optionClickTimer) clearTimeout(this.optionClickTimer);
          this.optionClickTimer = setTimeout(() => { this.optionInteractionActive = false; }, this.CLICK_DEBOUNCE_TIME);
        }
      }, true);
    };

    document.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('sy-option') ||
          target.closest('[class*="sy-menu"], sy-menu, sy-menu-item, sy-menu-sub, sy-menu-group') ||
          (target.tagName?.toLowerCase().startsWith('sy-') || target.closest('[tagname^="sy-"]')) ||
          target.closest('sy-autocomplete')) {
        this.isMouseOverPopover = true;
        this.optionInteractionActive = true;
        this.lastOptionClickTime = performance.now();
        this.preventPositionUpdate = true;
        setTimeout(() => { this.preventPositionUpdate = false; }, this.CLICK_DEBOUNCE_TIME);
        if (this.closeTimer) clearTimeout(this.closeTimer);
      }
    }, true);

    document.querySelectorAll('.sy-select-options-container, .sy-dropdown-menu-container, .sy-menu-container, sy-menu').forEach(container => {
      if (container.parentElement === document.body) setupContainerListeners(container);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const isContainer = element.classList && (
                element.classList.contains('sy-select-options-container') ||
                element.classList.contains('sy-dropdown-menu-container') ||
                element.classList.contains('sy-menu-container') ||
                element.tagName.toLowerCase() === 'sy-menu'
            );

            if (isContainer && element.parentElement === document.body) setupContainerListeners(element);

            element.querySelectorAll('.sy-select-options-container, .sy-dropdown-menu-container, .sy-menu-container, sy-menu').forEach(container => {
              if (container.parentElement === document.body) setupContainerListeners(container);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => { observer.disconnect(); }, this.OBSERVER_CLEANUP_TIME);
  }

  private isMouseOver(): boolean {
    if (this.trigger === 'hover') {
      if (!this.isMouseOverParent) return this.isMouseOverPopover;
      return true;
    }

    const isInteracting = this.isMouseOverParent || this.isMouseOverPopover || this.optionInteractionActive;
    const isRecentClick = performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME;
    return isInteracting || isRecentClick;
  }

  private isOptionRelated(element: HTMLElement | null): boolean {
    if (!element) return false;

    try {
      const containerSelector = '.sy-select-options-container, .sy-dropdown-menu-container, .sy-menu-container';
      if (element.matches(containerSelector) || element.closest(containerSelector)) return true;
      if (element.parentElement === document.body && element.tagName.toLowerCase().startsWith('sy-')) return true;
    } catch (err) {
      console.error('isOptionRelated 오류:', err);
    }

    return false;
  }

  private handleOptionClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isSyOption = target.tagName?.toLowerCase() === 'sy-option' || !!target.closest('sy-option');

    if (isSyOption) {
      this.isMouseOverPopover = true;
      this.optionInteractionActive = true;
      this.lastOptionClickTime = performance.now();

      this.preventPositionUpdate = true;
      setTimeout(() => { this.preventPositionUpdate = false; }, this.CLICK_DEBOUNCE_TIME);

      if (this.closeTimer) clearTimeout(this.closeTimer);
      if (this.optionClickTimer) clearTimeout(this.optionClickTimer);
      this.optionClickTimer = setTimeout(() => { this.optionInteractionActive = false; }, this.CLICK_DEBOUNCE_TIME);
    }
  }

  private isSyInteractionActive(): boolean {
    const activeElement = document.activeElement;
    return !!(activeElement &&
             ((activeElement.tagName && activeElement.tagName.toLowerCase().startsWith('sy-')) ||
              activeElement.closest('[class*="sy-"], [tagname*="sy-"]')));
  }

  private updatePopoverPositionWithDelay() {
    requestAnimationFrame(() => {
      this.updatePopoverPosition();
    });
  }
}
