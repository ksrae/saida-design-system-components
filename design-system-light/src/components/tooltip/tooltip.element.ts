import { LitElement, CSSResultGroup, css, unsafeCSS, html, PropertyValues, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import globalCSS from './styles/tooltip.scss?inline';
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement("sy-tooltip")
export class TooltipElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `; 

  @property({ type: Boolean, reflect: true }) hideArrow: boolean = false;
  @property({ type: String }) content: string = '';
  @property({ type: Number, reflect: true }) closedelay: number = 0;
  @property({ type: Number }) maxWidth: number | null = null;
  @property({ type: Number, reflect: true }) opendelay: number = 0;
  @property({ type: Boolean }) open: boolean = false;
  @property() position: 'top' | 'topLeft' | 'topRight' | 'right' | 'rightTop' | 'rightBottom' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' = 'top';
  @property({ type: String }) trigger: 'hover' | 'click' | 'focus' | 'none' = 'hover';
  @property({ type: String }) id = `tooltip-${Date.now()}`;

  @state() private arrowElement: any;
  @state() replaceContent = '';
  @state() private parentObserver: MutationObserver | null = null;

  private addedToBody = false;
  private ARROW_HEIGHT = 6;
  private closeTimer: any;
  private openTimer: any;
  private parentDom: any;
  private DefaultOpendelay = 150;
  private DefaultClosedelay = 100;

  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.updateTooltipPosition = this.updateTooltipPosition.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick, true);
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.updateTooltipPosition, true);

    if (!this.hideArrow) {
      this.setAttribute('arrow', 'true');
    } else {
      this.removeAttribute('arrow');
    }
    
    this.observeParentRemoval();
  }

  async firstUpdated() {
    await this.updateComplete;
    this.parentDom = this.parentElement;
  
    this.addEvent();
    this.setOpened();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('trigger')) {
      if(!this.open) {
        this.addEvent();
      }
    } 
    if (changedProperties.has('opendelay')) {
      this.setOpendelay();
    } 
    if (changedProperties.has('closedelay')) {
      this.setClosedelay();
    } 
    if (changedProperties.has('open')) {
      this.setOpened();
    }
    if(changedProperties.has('content')) {
      const sanitized = this.sanitizeHtml(this.content);
      this.replaceContent = this.replaceSpecialChars(sanitized);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick, true);
  
    if (this.addedToBody) {
      window.removeEventListener("scroll", this.onScroll);
      window.removeEventListener("resize", this.updateTooltipPosition, true);
    }
    
    this.disconnectParentObserver();
    
    if (this.openTimer) {
      clearTimeout(this.openTimer);
    }
    
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }

  public remove() {
    this.open = false;
  }

  private appendToRoot = () => {
    if (this.parentDom !== document.body) {    
      document.body.appendChild(this);
      this.addedToBody = true;
      this.updateTooltipPosition();  
    }
  }

  private addEvent() {
    const parent = this.parentDom;
    
    if(!this.open && parent) {
      if (this.trigger === 'hover') {
        parent.removeEventListener('focus', this.setFocus);
        parent.removeEventListener('blur', this.setBlur);
        parent.addEventListener('click', this.parentClick);
        parent.addEventListener('mouseenter', this.parentMouseEnter);
        parent.addEventListener('mouseleave', this.parentMouseLeave);
      }
      else if (this.trigger === 'focus') {
        parent.removeEventListener('mouseenter', this.parentMouseEnter);
        parent.removeEventListener('mouseleave', this.parentMouseLeave);
        parent.removeEventListener('click', this.parentClick);
        parent.addEventListener('focus', this.setFocus);
        parent.addEventListener('blur', this.setBlur);
      } else if (this.trigger === 'click') {
        parent.removeEventListener('focus', this.setFocus);
        parent.removeEventListener('blur', this.setBlur);
        parent.removeEventListener('mouseenter', this.parentMouseEnter);
        parent.removeEventListener('mouseleave', this.parentMouseLeave);
        parent.addEventListener('click', this.parentClick);
      } else {
        parent.removeEventListener('focus', this.setFocus);
        parent.removeEventListener('blur', this.setBlur);
        parent.removeEventListener('mouseenter', this.parentMouseEnter);
        parent.removeEventListener('mouseleave', this.parentMouseLeave);
        parent.removeEventListener('click', this.parentClick);
      }
    }
  }

  private observeParentRemoval() {
    if (this.parentDom) {
      // to watch for parent removal
      this.parentObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const removedNodes = Array.from(mutation.removedNodes);
            // Check if parent is removed
            if (removedNodes.some(node => node === this.parentDom || node.contains(this.parentDom))) {
              this.disconnectParentObserver();
              this.open = false;
              this.removeTooltip();
              return;
            }
          }
        });
      });
      
      this.observeGrandParent();
    }
  }

  private observeGrandParent() {
    const grandparent = this.parentDom.parentNode;
    if (grandparent && this.parentObserver) {
      this.parentObserver.observe(grandparent, { childList: true, subtree: true });
    }
  }
  
  private disconnectParentObserver() {
    if (this.parentObserver) {
      this.parentObserver.disconnect();
      this.parentObserver = null;
    }
  }

  private setOpened() {
    if(!this.open) {
      this.delayedTooltipClose();
    } else {
      this.appendToRoot();
    }
  }

  private updateTooltipPosition() {
    if (!this.addedToBody || !this.parentDom || this.parentDom === document.body) {
      return;
    }

    const parentRect = this.parentDom.getBoundingClientRect();
    
    if (!parentRect || (parentRect.width === 0 && parentRect.height === 0)) {
      console.warn('Tooltip parent not found or has zero size');
      this.open = false;
      this.removeTooltip();
      return;
    }

    this.style.display = 'block';
    this.style.visibility = 'hidden';
    this.style.position = 'absolute';
    this.style.left = '0';
    this.style.top = '0';

    requestAnimationFrame(() => {
      const tooltipRect = this.getBoundingClientRect();
      const positions = this.calculateAllPositions(parentRect, tooltipRect);
      
      // 디버깅 - 현재 스크롤 위치 출력
      // console.debug(`현재 스크롤 위치: X=${window.scrollX || window.pageXOffset}, Y=${window.scrollY || window.pageYOffset}`);
      
      const { position: bestPosition, coords } = this.findBestPosition(
        positions, 
        this.position,
        parentRect,
        tooltipRect
      );
            
      this.style.top = `${coords.top}px`;
      this.style.left = `${coords.left}px`;
      
      const adjusted = this.adjustForScreenBounds(tooltipRect);
      
      if (this.shadowRoot) {
        if (this.shadowRoot.contains(this.arrowElement)) {
          this.shadowRoot.removeChild(this.arrowElement);
        }
        
        if (!this.hideArrow) {
          this.arrowElement = this.createArrow(
            bestPosition, 
            parentRect,
            adjusted ? { top: parseFloat(this.style.top), left: parseFloat(this.style.left) } : coords,
            tooltipRect,
            adjusted
          );
          this.shadowRoot.appendChild(this.arrowElement);
        }
      }
      
      this.openTimer = setTimeout(() => {
        this.style.visibility = 'visible';
      }, this.opendelay);
    });
  }

  private calculateAllPositions(parentRect: DOMRect, tooltipRect: DOMRect) {
    const arrowOffset = !this.hideArrow ? this.ARROW_HEIGHT : 0;
    
    return {
      'top': {
        top: window.scrollY + parentRect.top - tooltipRect.height - arrowOffset,
        left: window.scrollX + parentRect.left + (parentRect.width - tooltipRect.width) / 2
      },
      'bottom': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + parentRect.left + (parentRect.width - tooltipRect.width) / 2
      },
      'left': {
        top: window.scrollY + parentRect.top + (parentRect.height - tooltipRect.height) / 2,
        left: window.scrollX + parentRect.left - tooltipRect.width - arrowOffset
      },
      'right': {
        top: window.scrollY + parentRect.top + (parentRect.height - tooltipRect.height) / 2,
        left: window.scrollX + parentRect.right + arrowOffset
      },
      'topLeft': {
        top: window.scrollY + parentRect.top - tooltipRect.height - arrowOffset,
        left: window.scrollX + parentRect.left
      },
      'topRight': {
        top: window.scrollY + parentRect.top - tooltipRect.height - arrowOffset,
        left: window.scrollX + parentRect.right - tooltipRect.width
      },
      'bottomLeft': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + parentRect.left
      },
      'bottomRight': {
        top: window.scrollY + parentRect.bottom + arrowOffset,
        left: window.scrollX + parentRect.right - tooltipRect.width
      },
      'leftTop': {
        top: window.scrollY + parentRect.top,
        left: window.scrollX + parentRect.left - tooltipRect.width - arrowOffset
      },
      'leftBottom': {
        top: window.scrollY + parentRect.bottom - tooltipRect.height,
        left: window.scrollX + parentRect.left - tooltipRect.width - arrowOffset
      },
      'rightTop': {
        top: window.scrollY + parentRect.top,
        left: window.scrollX + parentRect.right + arrowOffset
      },
      'rightBottom': {
        top: window.scrollY + parentRect.bottom - tooltipRect.height,
        left: window.scrollX + parentRect.right + arrowOffset
      }
    };
  }

  private findBestPosition(
    positions: Record<string, {top: number, left: number}>,
    preferredPosition: string,
    parentRect: DOMRect,
    tooltipRect: DOMRect
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
        return coords.top + tooltipRect.height > scrollY + viewportHeight;
      }
      else if (pos.startsWith('left')) {
        // left 계열 위치는 왼쪽 공간만 확인
        return coords.left < scrollX;
      }
      else if (pos.startsWith('right')) {
        // right 계열 위치는 오른쪽 공간만 확인
        return coords.left + tooltipRect.width > scrollX + viewportWidth;
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

  private adjustForScreenBounds(tooltipRect: DOMRect): boolean {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjusted = false;
    
    const currentLeft = parseFloat(this.style.left);
    const currentTop = parseFloat(this.style.top);
    
    if (currentLeft < window.scrollX) {
      this.style.left = `${window.scrollX}px`;
      adjusted = true;
    }
    else if (currentLeft + tooltipRect.width > window.scrollX + viewportWidth) {
      this.style.left = `${window.scrollX + viewportWidth - tooltipRect.width}px`;
      adjusted = true;
    }
    
    if (currentTop < window.scrollY) {
      this.style.top = `${window.scrollY}px`;
      adjusted = true;
    }
    else if (currentTop + tooltipRect.height > window.scrollY + viewportHeight) {
      this.style.top = `${window.scrollY + viewportHeight - tooltipRect.height}px`;
      adjusted = true;
    }
    
    return adjusted;
  }

  private createArrow(
    position: string,
    parentRect: DOMRect,
    tooltipPos: {top: number, left: number},
    tooltipRect: DOMRect,
    positionAdjusted: boolean
  ) {
    const arrowElement = document.createElement('div');
    arrowElement.classList.add('arrow');
    arrowElement.style.position = 'absolute';
    arrowElement.style.width = '8px';
    arrowElement.style.height = '8px';
    arrowElement.style.background = 'black';
  

    if (positionAdjusted) {
      this.positionArrowRelativeToParent(arrowElement, position, parentRect, tooltipPos, tooltipRect);
    } else {
      this.positionArrowStandard(arrowElement, position);
    }

    return arrowElement;
  }

  private positionArrowRelativeToParent(
    arrowElement: HTMLDivElement,
    position: string,
    parentRect: DOMRect,
    tooltipPos: {top: number, left: number},
    tooltipRect: DOMRect
  ) {
    let targetX, targetY;
    
    switch(position) {
      case 'top':
        targetX = parentRect.left + parentRect.width / 2;
        targetY = parentRect.top;
        break;
      case 'topLeft':
        targetX = parentRect.left + 4;
        targetY = parentRect.top;
        break;
      case 'topRight':
        targetX = parentRect.right - 4;
        targetY = parentRect.top;
        break;
      case 'bottom':
        targetX = parentRect.left + parentRect.width / 2;
        targetY = parentRect.bottom;
        break;
      case 'bottomLeft':
        targetX = parentRect.left + 4;
        targetY = parentRect.bottom;
        break;
      case 'bottomRight':
        targetX = parentRect.right - 4;
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
      
      const arrowX = Math.max(8, Math.min(tooltipRect.width - 8, targetX - tooltipPos.left));
      arrowElement.style.left = `${arrowX - 4}px`;
    }
    else if (position.startsWith('bottom')) {
      arrowElement.style.top = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
      arrowElement.style.transform = 'rotate(45deg)';
      
      const arrowX = Math.max(8, Math.min(tooltipRect.width - 8, targetX - tooltipPos.left));
      arrowElement.style.left = `${arrowX - 4}px`;
    }
    else if (position.startsWith('left')) {
      arrowElement.style.right = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
      arrowElement.style.transform = 'rotate(45deg)';
      
      const arrowY = Math.max(8, Math.min(tooltipRect.height - 8, targetY - tooltipPos.top));
      arrowElement.style.top = `${arrowY - 4}px`;
    }
    else if (position.startsWith('right')) {
      arrowElement.style.left = '-4px';
      arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
      arrowElement.style.transform = 'rotate(-135deg)';
      
      const arrowY = Math.max(8, Math.min(tooltipRect.height - 8, targetY - tooltipPos.top));
      arrowElement.style.top = `${arrowY - 4}px`;
    }
  }

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
        arrowElement.style.background = 'black';
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

  private onScroll = () => {
    if (!this.open || !this.addedToBody) return;
    
    this.style.visibility = 'hidden';
    
    if (this.openTimer) {
      clearTimeout(this.openTimer);
    }
    
    this.openTimer = setTimeout(() => {
      this.updateTooltipPosition();
    }, 100);
  }

  // private replacePositionToLeft(position: string): 'left' | 'leftTop' | 'leftBottom' {
  //   if (position === 'right') return 'left';
  //   if (position === 'rightTop') return 'leftTop';
  //   if (position === 'rightBottom') return 'leftBottom';
  //   return position as 'left' | 'leftTop' | 'leftBottom';
  // }

  // private replacePositionToRight(position: string): 'right' | 'rightTop' | 'rightBottom' {
  //   if (position === 'left') return 'right';
  //   if (position === 'leftTop') return 'rightTop';
  //   if (position === 'leftBottom') return 'rightBottom';
  //   return position as 'right' | 'rightTop' | 'rightBottom';
  // }

  // private replacePositionToTop(position: string): 'top' | 'topLeft' | 'topRight' {
  //   if (position === 'bottom') return 'top';
  //   if (position === 'bottomLeft') return 'topLeft';
  //   if (position === 'bottomRight') return 'topRight';
  //   return position as 'top' | 'topLeft' | 'topRight';
  // }

  // private replacePositionToBottom(position: string): 'bottom' | 'bottomLeft' | 'bottomRight' {
  //   if (position === 'top') return 'bottom';
  //   if (position === 'topLeft') return 'bottomLeft';
  //   if (position === 'topRight') return 'bottomRight';
  //   return position as 'bottom' | 'bottomLeft' | 'bottomRight';
  // }

  private parentMouseEnter = () => {
    if(this.openTimer) clearTimeout(this.openTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);
    if(!this.open) {
      this.open = true;
    }
  }

  private parentMouseLeave = () => {
    if(this.open) {
      this.open = false;
    }
  }

  private setFocus = (event: any) => {
    if(!this.open) {
      this.open = true;
    }
  }

  private setBlur = (event: any) => {
    if(this.open) {
      this.open = false;
    }
  }

  private delayedTooltipClose = () => {
    if (this.closeTimer) clearTimeout(this.closeTimer);

    this.closeTimer = setTimeout(() => {
      this.removeTooltip();
    }, this.closedelay);
  }

  private removeTooltip() {
    try {
      document.body.removeChild(this);
      this.addedToBody = false;
    } catch (err: any) {
      // 에러 처리
    } 
  }

  private parentClick = (event: any) => {
    event.preventDefault();
    this.open = !this.open;
  }

  private handleOutsideClick = (event: any) => {
    const isInTooltip = this.contains(event.target as Node);
    const isParent = this.parentDom?.contains(event.target as Node);    

    if (this.trigger === 'click' && !isInTooltip && !isParent) {
      this.open = false;
    }
  };
    
  private setOpendelay() {
    this.opendelay = this.opendelay < this.DefaultOpendelay ? this.DefaultOpendelay : this.opendelay;
  }
  
  private setClosedelay() {
    this.closedelay = this.closedelay < this.DefaultClosedelay ? this.DefaultClosedelay : this.closedelay;
  }

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }


  render() {
    return html`
      <div 
        class="${classMap({
          'tooltip-content': true
        })}" 
        style="--tooltip-maxWidth: ${this.maxWidth && this.maxWidth > 0 ? this.maxWidth + 'px' : null}">
        ${unsafeHTML(this.replaceContent)}
      </div>
    `;
  }

  // replaceAll 폴리필 함수
  private replaceAll(str: string, search: string | RegExp, replacement: string): string {
    if (typeof search === 'string') {
      return str.split(search).join(replacement);
    } else {
      return str.replace(search, replacement);
    }
  }

  private replaceEscapeChars(content: string) {
    if (!content?.length) return content;
    let result = content;
    result = this.replaceAll(result, '<', '&lt;');
    result = this.replaceAll(result, '>', '&gt;');
    result = this.replaceAll(result, '"', '&quot;');
    result = this.replaceAll(result, "'", '&apos;');
    // result = this.replaceAll(result, '/', '&frasl;');
    result = this.replaceAll(result, '-', '&ndash;');
    result = result.replace(/\\n/g, '<br>'); // 문자열로서 \n
    result = result.replace(/\n/g, '<br>');   // 실제 줄바꿈
    result = result.replace(/\r/g, '');
    return result;
  }

  private replaceSpecialChars(content: string) {
    content = this.replaceEscapeChars(content);
    if (!content?.length) return content;
    let result = content;
    result = this.replaceAll(result, '\t', '    ');
    result = this.replaceAll(result, ' ', ' ');
    result = result.replace(/\\n/g, '<br>'); // 문자열로서 \n
    result = result.replace(/\n/g, '<br>');   // 실제 줄바꿈
    result = result.replace(/\r/g, '');
    return result;
  }
}



