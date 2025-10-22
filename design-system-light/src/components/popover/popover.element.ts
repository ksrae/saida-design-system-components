import { LitElement, html, css, CSSResultGroup, unsafeCSS} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import globalCSS from './styles/popover.scss?inline';

/**
 * 팝오버 컴포넌트 - 다른 요소에 부가 정보를 표시하는 오버레이 요소
 * 마우스 호버, 클릭, 포커스 등의 트리거로 활성화됩니다.
 */
@customElement('sy-popover')
export class PopoverElement extends LitElement {
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
  private optionInteractionActive = false; // 옵션 상호작용 활성화 여부
  private preventPositionUpdate = false; // 위치 업데이트 방지 플래그

  // 디바운스 및 쓰로틀링 시간 상수
  private CLICK_DEBOUNCE_TIME = 300;   // 옵션 클릭 후 상태 유지 시간(ms)
  private OBSERVER_CLEANUP_TIME = 3000; // 옵저버 정리 시간(ms)
  private MOUSELEAVE_DELAY = 200;      // 마우스 이탈 후 상태 체크 지연 시간(ms)

  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  // 속성
  @property({ type: Boolean, reflect: true }) arrow: boolean = false;     // 화살표 표시 여부
  @property({ type: Boolean, reflect: true }) open: boolean = false;    // 열림 상태 여부
  @property({ type: String }) position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' = 'bottom'; // 위치
  @property({ type: String }) trigger: 'hover' | 'click' | 'focus' | 'null' = 'hover'; // 트리거 방식
  @property({ type: Number, reflect: true }) opendelay: number = this.DefaultOpendelay; // 열기 지연 시간
  @property({ type: Number, reflect: true }) closedelay: number = this.DefaultClosedelay; // 닫기 지연 시간

  @state() private arrowElement: any; // 화살표 요소 참조

  /**
   * 생성자: 이벤트 핸들러 바인딩 
   */
  constructor() {
    super();
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
  connectedCallback() {
    super.connectedCallback();
    // 이벤트 리스너 등록
    document.addEventListener("click", this.handleOutsideClick, true);
    window.addEventListener("scroll", this.updatePopoverPosition, true);
    window.addEventListener("resize", this.updatePopoverPosition, true);

    if (this.arrow) {
      this.setAttribute('arrow', 'true');
    } else {
      this.removeAttribute('arrow');
    }
  }

  /**
   * 첫 렌더링 후 초기화 작업을 수행합니다.
   */
  async firstUpdated() {
    await this.updateComplete;
    this.parentDom = this.parentElement;
    this.addEvent();
  }
  
  /**
   * 속성 변경 시 적절한 업데이트를 수행합니다.
   */
  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('trigger')) {
      if(!this.open) {
        this.addEvent();
      }
    } else if (changedProperties.has('open')) {
      this.addEvent();
    } else if (changedProperties.has('opendelay')) {
      this.setOpendelay();
    } else if (changedProperties.has('closedelay')) {
      this.setClosedelay();
    }
  }

  /**
   * DOM에서 분리될 때 정리 작업을 수행합니다.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
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
    return html`<slot></slot>`;
  }

  /**
   * 팝업을 열기 위한 공개 메서드
   */
  public setOpen() {
    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly() || this.trigger !== 'null') {
      return;
    }
    
    this.appendToRoot();
  }
  
  /**
   * 팝업을 닫기 위한 공개 메서드
   */
  public setClose() {
    // if(this.trigger === 'null') {
      
    // }
    this.delayedPopoverClose();
  }
  
  /**
   * 열기 지연 시간을 설정하는 메서드
   * 기본값보다 작은 값이 지정되면 기본값으로 설정
   */
  private setOpendelay() {
    this.opendelay = this.opendelay < this.DefaultOpendelay ? this.DefaultOpendelay : this.opendelay;
  }
  
  /**
   * 닫기 지연 시간을 설정하는 메서드
   * 기본값보다 작은 값이 지정되면 기본값으로 설정
   */
  private setClosedelay() {
    this.closedelay = this.closedelay < this.DefaultClosedelay ? this.DefaultClosedelay : this.closedelay;
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

  /**
   * 트리거 유형에 따라 적절한 이벤트 핸들러를 설정합니다.
   */
  private addEvent() {
    const parent = this.parentDom;
    if (!this.open) {
      if(parent) {
        // 기존 이벤트 리스너 모두 제거
        parent.removeEventListener('click', this.parentClick);
        parent.removeEventListener('mouseenter', this.parentMouseEnter, true);
        parent.removeEventListener('mouseleave', this.parentMouseLeave, true);
        parent.removeEventListener('focus', this.setFocus);
        parent.removeEventListener('blur', this.setBlur);
        
        // 트리거 타입에 따라 적절한 이벤트 리스너 추가
        if (this.trigger === 'hover') {
          parent.addEventListener('mouseenter', this.parentMouseEnter, true);
          parent.addEventListener('mouseleave', this.parentMouseLeave, true);
        } else if (this.trigger === 'click') {
          parent.addEventListener('click', this.parentClick);
        } else if (this.trigger === 'focus') {
          parent.addEventListener('focus', this.setFocus);
          parent.addEventListener('blur', this.setBlur);
        }
      }
    } else if (this.open) {
      this.appendToRoot();
    }
  }

  /**
   * 팝업을 body에 추가하고 위치를 설정합니다.
   */
  private appendToRoot = () => {
    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly()) {
      return;
    }

    if (this.parentDom !== document.body) {
      // 이미 body에 추가되어 있으면 위치만 업데이트
      if (this.addedToBody && this.isConnected && this.parentElement === document.body) {
        // 옵션 클릭 상태일 경우 위치 업데이트 건너뜀
        if (this.preventPositionUpdate || 
            this.optionInteractionActive || 
            (performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME) || 
            this.isSyInteractionActive()) { 
          return;
        }
        this.updatePopoverPosition();
        return;
      }

      try {
        // 팝업 위치 설정을 위한 초기화 로직      
        document.body.appendChild(this);
        this.addedToBody = true;
        
        // trigger가 hover일 때만 popover에 마우스 이벤트 리스너 추가
        if (this.trigger === 'hover') {
          this.addEventListener('mouseenter', this.popoverMouseEnter);
          this.addEventListener('mouseleave', this.popoverMouseLeave);
          this.setupOptionDetection();
        }
        
        this.updatePopoverPosition();
      } catch (err) {
        console.error('appendToRoot 오류:', err);
      }
    }
  }

  /**
   * 팝업을 DOM에서 제거합니다.
   */
  private removePopover = () => {
    // 옵션 인터랙션 중이거나 최근에 옵션 클릭이 있었다면 닫기 방지
    if (this.optionInteractionActive || (performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME)) {
      return;
    }
    
    try {
      // 유효성 검사: 실제로 DOM에 연결되어 있고 document.body의 자식인지 확인
      if (!this.isConnected || this.parentElement !== document.body) {
        this.addedToBody = false;
        return;
      }
      
      // tree-select 옵션 컨테이너 함께 닫기
      this.closeTreeSelectOptions();
      
      // 이벤트 리스너 제거
      if (this.trigger === 'hover') {
        this.removeEventListener('mouseenter', this.popoverMouseEnter);
        this.removeEventListener('mouseleave', this.popoverMouseLeave);
      }
      
      // DOM에서 제거
      document.body.removeChild(this);
      this.addedToBody = false;
    } catch (err) {
      console.error('popover 제거 중 오류:', err);
    }
  }

  /**
   * tree-select 관련 옵션 컨테이너를 정리합니다.
   */
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

  /**
   * 포커스 이벤트 핸들러: 팝오버를 표시합니다.
   */
  private setFocus(event: any) {
    event.stopPropagation();
    
    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly()) {
      return;
    }
    
    this.appendToRoot();
  }

  /**
   * 블러 이벤트 핸들러: 팝오버를 숨깁니다.
   */
  private setBlur(event: any) {
    this.delayedPopoverClose();
  }

  /**
   * 지연된 팝오버 닫기를 처리합니다.
   * 지정된 딜레이 후 조건을 확인하고 팝오버를 닫습니다.
   */
  private delayedPopoverClose = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
    
    this.closeTimer = setTimeout(() => {
      // 닫기 조건 확인
      const shouldClose = !this.isMouseOverParent && !this.isMouseOverPopover && !this.optionInteractionActive;
      const noRecentOptionClick = performance.now() - this.lastOptionClickTime > this.CLICK_DEBOUNCE_TIME;
      
      if (shouldClose && noRecentOptionClick) {
        this.removePopover();
      }
    }, this.closedelay);
  }

  /**
   * 부모 요소에 마우스가 들어왔을 때의 핸들러
   */
  private parentMouseEnter = (event: MouseEvent) => {
    event.stopPropagation();
    
    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly()) {
      return;
    }
    
    this.isMouseOverParent = true;
    
    // 모든 타이머 클리어
    if (this.openTimer) clearTimeout(this.openTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);
    
    this.appendToRoot();
  }
  
  /**
   * 부모 요소에서 마우스가 떠났을 때의 핸들러
   */
  private parentMouseLeave = (event: MouseEvent) => {
    event.stopPropagation();
    
    this.isMouseOverParent = false;
    
    if (this.closeTimer) clearTimeout(this.closeTimer);
    
    this.closeTimer = setTimeout(() => {
      // tree-select 옵션도 함께 닫기
      this.optionInteractionActive = false;
      this.closeTreeSelectOptions();
      this.removePopover();
    }, this.closedelay);
  }

  /**
   * 부모 요소 클릭 핸들러
   */
  private parentClick = (event: any) => {
    // 부모가 disabled이거나 readonly이면 팝업을 열지 않음
    if (this.isParentDisabledOrReadonly()) {
      return;
    }
    
    this.appendToRoot();
  }

  /**
   * 팝업의 위치를 업데이트합니다.
   */
  private updatePopoverPosition() {
    if (this.addedToBody && this.parentDom !== document.body && this.parentDom) {
      const parentRect = this.parentDom.getBoundingClientRect();
      this.style.display = 'block';
      this.style.visibility = 'hidden';
      this.style.position = 'absolute';
      this.style.left = '0';
      this.style.top = '0';
   
      requestAnimationFrame(() => {
        const popoverRect = this.getBoundingClientRect();
        const positions = this.calculateAllPositions(parentRect, popoverRect);
        
        const { position: bestPosition, coords } = this.findBestPosition(
          positions, 
          this.position,
          parentRect,
          popoverRect
        );
        
        this.style.top = `${coords.top}px`;
        this.style.left = `${coords.left}px`;
        
        const adjusted = this.adjustForScreenBounds(popoverRect);
        
        // 화살표 업데이트
        if(this.contains(this.arrowElement)) {
          this.removeChild(this.arrowElement);
        }

        if(this.arrow) {
          this.arrowElement = this.createArrow(
            bestPosition, 
            parentRect,
            adjusted ? { top: parseFloat(this.style.top), left: parseFloat(this.style.left) } : coords,
            popoverRect,
            adjusted
          );
          this.appendChild(this.arrowElement);
        }

        this.openTimer = setTimeout(() => {
          this.style.visibility = 'visible';
        }, this.opendelay);
      });
    }
  }

  /**
   * 화면 내에서 최적의 팝업 위치를 찾습니다.
   */
  private findBestPosition(
    positions: Record<string, {top: number, left: number}>,
    preferredPosition: string,
    parentRect: DOMRect,
    popoverRect: DOMRect
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
    
    // 선호 위치 및 좌표
    let position = preferredPosition;
    let coords = positions[preferredPosition];
    
    // 위치별로 적합성 확인
    const checkDirection = (pos: string, coords: {top: number, left: number}) => {
      if (pos.startsWith('top')) {
        return coords.top < scrollY;
      } 
      else if (pos.startsWith('bottom')) {
        return coords.top + popoverRect.height > scrollY + viewportHeight;
      }
      else if (pos.startsWith('left')) {
        return coords.left < scrollX;
      }
      else if (pos.startsWith('right')) {
        return coords.left + popoverRect.width > scrollX + viewportWidth;
      }
      return false;
    };
    
    // 선호 위치가 화면을 벗어나면 반대 위치 사용
    if (checkDirection(preferredPosition, coords)) {      
      const oppositePosition = oppositePositions[preferredPosition];
      if (oppositePosition) {
        position = oppositePosition;
        coords = positions[oppositePosition];
      }
    }
    
    return { position, coords };
  }

  /**
   * 화면 경계를 벗어나지 않도록 팝업 위치를 조정합니다.
   */
  private adjustForScreenBounds(popoverRect: DOMRect): boolean {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjusted = false;
    
    const currentLeft = parseFloat(this.style.left);
    const currentTop = parseFloat(this.style.top);
    
    if (currentLeft < window.scrollX) {
      this.style.left = `${window.scrollX}px`;
      adjusted = true;
    }
    else if (currentLeft + popoverRect.width > window.scrollX + viewportWidth) {
      this.style.left = `${window.scrollX + viewportWidth - popoverRect.width}px`;
      adjusted = true;
    }
    
    if (currentTop < window.scrollY) {
      this.style.top = `${window.scrollY}px`;
      adjusted = true;
    }
    else if (currentTop + popoverRect.height > window.scrollY + viewportHeight) {
      this.style.top = `${window.scrollY + viewportHeight - popoverRect.height}px`;
      adjusted = true;
    }
    
    return adjusted;
  }

  /**
   * 화살표 요소를 생성합니다.
   */
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

  /**
   * 부모 요소에 상대적인 화살표 위치를 설정합니다.
   */
  private positionArrowRelativeToParent(
    arrowElement: HTMLDivElement,
    position: string,
    parentRect: DOMRect,
    popoverPos: {top: number, left: number},
    popoverRect: DOMRect
  ) {
    let targetX, targetY;
    
    // 각 위치별 좌표 계산
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
        targetX = parentRect.left + 8;
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
    
    // 화살표 스타일 설정
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

  /**
   * 표준 방식으로 화살표 위치를 설정합니다.
   */
  private positionArrowStandard(arrowElement: HTMLDivElement, position: string) {
    switch(position) {
      case 'top':
        arrowElement.style.bottom = '-4px';
        arrowElement.style.left = 'calc(50% - 4px)';
        arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
        arrowElement.style.transform = 'rotate(-45deg)';
        break;
      case 'left':
        arrowElement.style.left = 'calc(100% - 4px)';
        arrowElement.style.top = 'calc(50% - 4px)';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
        arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'right':
        arrowElement.style.right = 'calc(100% - 4px)';
        arrowElement.style.top = 'calc(50% - 4px)';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
        arrowElement.style.transform = 'rotate(-135deg)';
        break;
      case 'bottom':
        arrowElement.style.bottom = '100%';
        arrowElement.style.top = '-4px';
        arrowElement.style.left = 'calc(50% - 4px)';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
        arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'topLeft':
        arrowElement.style.bottom = '-4px';
        arrowElement.style.left = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
        arrowElement.style.transform = 'rotate(-45deg)';
        break;
      case 'topRight':
        arrowElement.style.bottom = '-4px';
        arrowElement.style.right = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
        arrowElement.style.transform = 'rotate(-45deg)';
        break;
      case 'bottomLeft':
        arrowElement.style.bottom = '100%';
        arrowElement.style.top = '-4px';
        arrowElement.style.left = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
        arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'bottomRight':
        arrowElement.style.bottom = '100%';
        arrowElement.style.top = '-4px';
        arrowElement.style.right = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
        arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'leftTop':
        arrowElement.style.left = 'calc(100% - 4px)';
        arrowElement.style.top = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
        arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'leftBottom':
        arrowElement.style.left = 'calc(100% - 4px)';
        arrowElement.style.bottom = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
        arrowElement.style.transform = 'rotate(45deg)';
        break;
      case 'rightTop':
        arrowElement.style.right = 'calc(100% - 4px)';
        arrowElement.style.top = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
        arrowElement.style.transform = 'rotate(-135deg)';
        break;
      case 'rightBottom':
        arrowElement.style.right = 'calc(100% - 4px)';
        arrowElement.style.bottom = '8px';
        arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
        arrowElement.style.transform = 'rotate(-135deg)';
        break;
    }
  }

  /**
   * 외부 클릭 이벤트를 처리합니다.
   */
  private handleOutsideClick = (event: any) => {
    const target = event.target as HTMLElement;
    
    // 1. 옵션 인터랙션 중이거나 최근 클릭이 있으면 무시
    if (this.optionInteractionActive || (performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME)) {
      return;
    }
    
    // 2. 옵션 관련 요소 클릭 확인
    if (this.isOptionRelated(target)) {
      this.isMouseOverPopover = true;
      return;
    }
    
    // 3. 팝오버 또는 부모 요소인지 확인
    const isInPopover = this.contains(target);
    const isParent = this.parentDom?.contains(target);
    
    // 4. sy- 요소 확인 (추가 보호)
    const isSyElement = this.isSyElement(target);
    
    // 외부 영역 클릭인 경우에만 닫기
    if (!isInPopover && !isParent && !isSyElement && !this.isOptionRelated(target)) {
      // tree-select 옵션도 함께 닫기
      this.closeTreeSelectOptions();
      this.removePopover();
    }
  };

  /**
   * 모든 가능한 위치에 대한 좌표를 계산합니다.
   */
  private calculateAllPositions(parentRect: DOMRect, popoverRect: DOMRect) {
    const arrowOffset = this.arrow ? this.ARROW_HEIGHT : 0;
    
    return {
      'top': {
        top: window.scrollY + parentRect.top - popoverRect.height - arrowOffset,
        left: window.scrollX + parentRect.left + (parentRect.width - popoverRect.width) / 2,
      }, 
      'bottom': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + parentRect.left + (parentRect.width - popoverRect.width) / 2,
      },
      'left': {
        top: window.scrollY + parentRect.top + (parentRect.height - popoverRect.height) / 2,
        left: window.scrollX + parentRect.left - popoverRect.width - arrowOffset,
      },
      'right': {
        top: window.scrollY + parentRect.top + (parentRect.height - popoverRect.height) / 2,
        left: window.scrollX + parentRect.right + arrowOffset,
      },            
      'topLeft': {
        top: window.scrollY + parentRect.top - popoverRect.height - arrowOffset,
        left: window.scrollX + parentRect.left,
      },
      'topRight': {
        top: window.scrollY + parentRect.top - popoverRect.height - arrowOffset,
        left: window.scrollX + (parentRect.right - popoverRect.width),
      },
      'bottomLeft': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + parentRect.left,
      },
      'bottomRight': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + (parentRect.right - popoverRect.width),
      },
      'leftTop': {
        top: window.scrollY + parentRect.top,
        left: window.scrollX + parentRect.left - popoverRect.width - arrowOffset,
      },
      'leftBottom': {
        top: window.scrollY + parentRect.top + parentRect.height - popoverRect.height,
        left: window.scrollX + parentRect.left - popoverRect.width - arrowOffset,
      },
      'rightTop': {
        top: window.scrollY + parentRect.top,
        left: window.scrollX + parentRect.right + arrowOffset,
      },
      'rightBottom': {
        top: window.scrollY + parentRect.top + parentRect.height - popoverRect.height,
        left: window.scrollX + parentRect.right + arrowOffset,
      }
    };
  }
  
  /**
   * 팝오버에 마우스가 들어왔을 때의 핸들러
   */
  private popoverMouseEnter(e: MouseEvent) {
    this.isMouseOverPopover = true;
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }

  /**
   * 팝오버에서 마우스가 떠났을 때의 핸들러
   */
  private popoverMouseLeave(e: MouseEvent) {
    const target = e.relatedTarget as HTMLElement;
    
    // 1. 옵션 상호작용 중이면 무시
    if (this.optionInteractionActive || performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME) {
      return;
    }
    
    // 2. 특별한 요소로 이동하는 경우 무시 (메뉴, 옵션 등)
    if (this.isOptionRelated(target) || 
        target?.tagName?.toLowerCase().startsWith('sy-menu') || 
        target?.closest('sy-menu, sy-menu-item, sy-menu-sub, sy-menu-group')) {
      return;
    }
    
    // 3. 부모 요소로 이동하는 경우 상태 업데이트
    if (this.parentDom?.contains(target)) {
      this.isMouseOverPopover = false;
      this.isMouseOverParent = true;
      return;
    }
    
    // 4. 다른 영역으로 이동 시 닫기 처리
    this.isMouseOverPopover = false;
    
    // hover 모드일 때만 지연 닫기 적용
    if (this.trigger === 'hover') {
      this.delayedPopoverClose();
    }
  }

  /**
   * 옵션과 관련된 이벤트 감지 및 관리 시스템을 설정합니다.
   */
  private setupOptionDetection() {    
    // 옵션 컨테이너 리스너 설정 함수
    const setupContainerListeners = (container: Element) => {
      if ((container as any).__popoverListenersAdded) return;
      (container as any).__popoverListenersAdded = true;
      
      // mouseenter
      container.addEventListener('mouseenter', () => {
        this.optionInteractionActive = true;
        this.isMouseOverPopover = true;
        
        if (this.closeTimer) {
          clearTimeout(this.closeTimer);
          this.closeTimer = null;
        }
      });
      
      // mouseleave
      container.addEventListener('mouseleave', (e: any) => {
        const relatedTarget = e.relatedTarget as HTMLElement;
        
        if (relatedTarget === this || this.contains(relatedTarget) || 
            this.isOptionRelated(relatedTarget) || this.parentDom?.contains(relatedTarget)) {
          return;
        }
        
        // hover 트리거라면 더 적극적으로 닫기
        if (this.trigger === 'hover') {
          this.optionInteractionActive = false;
          this.isMouseOverPopover = false;
          this.delayedPopoverClose();
        } else {
          setTimeout(() => {
            if (!this.isMouseOver()) {
              this.optionInteractionActive = false;
              if (this.trigger === 'hover') {
                this.delayedPopoverClose();
              }
            }
          }, this.MOUSELEAVE_DELAY); // 마우스 이탈 후 상태 체크 지연
        }
      });
      
      // 클릭 이벤트
      container.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        
        if (target.tagName?.toLowerCase() === 'sy-option' || target.closest('sy-option') ||
            target.tagName?.toLowerCase().startsWith('sy-menu') || target.closest('[class*="sy-menu"], sy-menu, sy-menu-item')) {
          
          this.isMouseOverPopover = true;
          this.optionInteractionActive = true;
          this.lastOptionClickTime = performance.now();
          
          if (this.optionClickTimer) clearTimeout(this.optionClickTimer);
          
          this.optionClickTimer = setTimeout(() => {
            this.optionInteractionActive = false;
          }, this.CLICK_DEBOUNCE_TIME); // 옵션 클릭 후 상태 유지 시간
        }
      }, true);
    };

    // 문서 레벨에서 옵션 클릭 캡처
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
        setTimeout(() => {
          this.preventPositionUpdate = false;
        }, this.CLICK_DEBOUNCE_TIME); // 옵션 클릭 후 위치 업데이트 방지 시간
        
        if (this.closeTimer) {
          clearTimeout(this.closeTimer);
          this.closeTimer = null;
        }
      }
    }, true);
    
    // 기존 컨테이너에 리스너 설정
    document.querySelectorAll('.sy-select-options-container, .sy-dropdown-menu-container, .sy-menu-container, sy-menu').forEach(container => {
      if (container.parentElement === document.body) {
        setupContainerListeners(container);
      }
    });
    
    // 새로운 컨테이너 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // 컨테이너 요소인 경우 리스너 설정
            const isContainer = element.classList && (
                element.classList.contains('sy-select-options-container') ||
                element.classList.contains('sy-dropdown-menu-container') ||
                element.classList.contains('sy-menu-container') ||
                element.tagName.toLowerCase() === 'sy-menu'
            );
            
            if (isContainer && element.parentElement === document.body) {
              setupContainerListeners(element);
            }
            
            // 자식 요소에 컨테이너가 있는지 확인
            element.querySelectorAll('.sy-select-options-container, .sy-dropdown-menu-container, .sy-menu-container, sy-menu').forEach(container => {
              if (container.parentElement === document.body) {
                setupContainerListeners(container);
              }
            });
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // 정리 타이머 - 리소스 최적화를 위해 일정 시간 후 옵저버 정리
    setTimeout(() => {
      observer.disconnect();
    }, this.OBSERVER_CLEANUP_TIME); 
  }

  /**
   * 마우스가 관련 요소 위에 있는지 확인합니다.
   */
  private isMouseOver(): boolean {
    if (this.trigger === 'hover') {
      if (!this.isMouseOverParent) {
        return this.isMouseOverPopover;
      }
      return true;
    }
    
    const isInteracting = this.isMouseOverParent || this.isMouseOverPopover || this.optionInteractionActive;
    const isRecentClick = performance.now() - this.lastOptionClickTime < this.CLICK_DEBOUNCE_TIME;
    return isInteracting || isRecentClick;
  }

  /**
   * 요소가 옵션 관련 요소인지 확인합니다.
   */
  private isOptionRelated(element: HTMLElement | null): boolean {
    if (!element) return false;
    
    try {
      // 컨테이너 요소 확인
      const containerSelector = '.sy-select-options-container, .sy-dropdown-menu-container, .sy-menu-container';
      if (element.matches(containerSelector) || element.closest(containerSelector)) {
        return true;
      }
      
      // body 직계 자식 sy- 요소 확인
      if (element.parentElement === document.body && element.tagName.toLowerCase().startsWith('sy-')) {
        return true;
      }
    } catch (err) {
      console.error('isOptionRelated 오류:', err);
    }
    
    return false;
  }

  /**
   * 옵션 클릭 이벤트를 처리합니다.
   */
  private handleOptionClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isSyOption = target.tagName?.toLowerCase() === 'sy-option' || 
                      !!target.closest('sy-option');
    
    if (isSyOption) {
      this.isMouseOverPopover = true;
      this.optionInteractionActive = true;
      this.lastOptionClickTime = performance.now();
      
      // 위치 업데이트 방지 - 옵션 클릭 시 팝업 위치 변경 방지를 위한 일시적 플래그
      this.preventPositionUpdate = true;
      setTimeout(() => {
        this.preventPositionUpdate = false;
      }, this.CLICK_DEBOUNCE_TIME);
      
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
      
      // 지연된 상태 초기화 설정
      if (this.optionClickTimer) clearTimeout(this.optionClickTimer);
      this.optionClickTimer = setTimeout(() => {
        this.optionInteractionActive = false;
      }, this.CLICK_DEBOUNCE_TIME);
    }
  }

  /**
   * 요소가 sy- 접두사 요소인지 확인합니다.
   */
  private isSyElement(el: HTMLElement | null): boolean {
    return el?.tagName?.toLowerCase().startsWith('sy-') || false;
  }

  /**
   * 현재 sy- 요소가 상호작용 중인지 확인합니다.
   */
  private isSyInteractionActive(): boolean {
    const activeElement = document.activeElement;
    return !!(activeElement && 
             ((activeElement.tagName && activeElement.tagName.toLowerCase().startsWith('sy-')) || 
              activeElement.closest('[class*="sy-"], [tagname*="sy-"]')));
  }
}
