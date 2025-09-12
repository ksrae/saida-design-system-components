import { Component, Prop, State, Element, Watch, h } from '@stencil/core';

export interface HTMLSyTooltipElement extends HTMLElement {
  hideArrow: boolean;
  open: boolean;
  closedelay: number;
  maxWidth: number;
  opendelay: number;
  content: string;
  position: 'top' | 'topLeft' | 'topRight' | 'right' | 'rightTop' | 'rightBottom' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom';
  trigger: 'hover' | 'click' | 'focus' | 'none';
}

@Component({
  tag: 'sy-tooltip',
  styleUrl: 'sy-tooltip.scss',
  shadow: false,
  scoped: true,
})
export class SyTooltip {
  @Element() el: HTMLElement;

  @Prop({ reflect: true, attribute: 'hideArrow' }) hideArrow: boolean = false;
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  @Prop({ reflect: true }) closedelay: number = 0;
  @Prop({ reflect: true, attribute: 'maxWidth' }) maxWidth: number | null = null;
  @Prop({ reflect: true }) opendelay: number = 0;

  @Prop() content: string = '';
  @Prop() position: 'top' | 'topLeft' | 'topRight' | 'right' | 'rightTop' | 'rightBottom' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' = 'top';
  @Prop() trigger: 'hover' | 'click' | 'focus' | 'none' = 'hover';

  @State() private arrowElement: any;
  @State() replaceContent: string = '';

  private parentObserver: MutationObserver | null = null;
  private addedToBody = false;
  private ARROW_HEIGHT = 6;
  private closeTimer: any;
  private openTimer: any;
  private parentDom: any;
  private DefaultOpendelay = 150;
  private DefaultClosedelay = 100;

  @Watch('trigger')
  watchTrigger() {
    if (!this.open) {
      this.addEvent();
    }
  }

  @Watch('opendelay')
  watchOpendelay() {
    this.setOpendelay();
  }

  @Watch('closedelay')
  watchClosedelay() {
    this.setClosedelay();
  }

  @Watch('open')
  watchOpen() {
    this.setOpened();
  }

  @Watch('content')
  watchContent() {
    const sanitized = this.sanitizeHtml(this.content);
    this.replaceContent = this.replaceSpecialChars(sanitized);
  }

  componentWillLoad() {
    if (!this.el.id) {
      this.el.id = `tooltip-${Date.now()}`;
    }

    const sanitized = this.sanitizeHtml(this.content);
    this.replaceContent = this.replaceSpecialChars(sanitized);

    this.parentDom = this.el.parentElement;
    this.observeParentRemoval();
  }

  componentDidLoad() {
    this.setupGlobalClickListener();

    if (!this.hideArrow) {
      this.el.setAttribute('arrow', 'true');
    } else {
      this.el.removeAttribute('arrow');
    }

    this.addEvent();
    this.setOpened();
  }

  private setupGlobalClickListener() {
    document.removeEventListener('click', this.handleOutsideClick, true);
    document.addEventListener('click', this.handleOutsideClick, true);

    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.updateTooltipPosition, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick, true);

    if (this.addedToBody) {
      window.removeEventListener("scroll", this.onScroll);
      window.removeEventListener("resize", this.updateTooltipPosition, true);
    }

    this.disconnectParentObserver();

    if (this.openTimer) clearTimeout(this.openTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);
  }

  public remove() {
    this.open = false;
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

  private updateTooltipPosition() {
    if (!this.open || !this.addedToBody || !this.parentDom) {
      return;
    }

    if (!this.isParentInView()) {
      this.el.style.visibility = 'hidden';
      return;
    }

    const parentRect = this.parentDom.getBoundingClientRect();

    if (!parentRect || (parentRect.width === 0 && parentRect.height === 0)) {
      console.warn('Tooltip parent not found or has zero size');
      this.open = false;
      return;
    }

    this.el.style.display = 'block';
    this.el.style.visibility = 'hidden';
    this.el.style.position = 'absolute';
    this.el.style.left = '0';
    this.el.style.top = '0';

    requestAnimationFrame(() => {
      if (!this.open) return;

      const tooltipRect = this.el.getBoundingClientRect();
      const positions = this.calculateAllPositions(parentRect, tooltipRect);

      const { position: bestPosition, coords } = this.findBestPosition(
        positions,
        this.position,
        parentRect,
        tooltipRect
      );

      this.el.style.top = `${coords.top}px`;
      this.el.style.left = `${coords.left}px`;

      const adjusted = this.adjustForScreenBounds(tooltipRect);

      if (this.el.contains(this.arrowElement)) {
        this.el.removeChild(this.arrowElement);
      }

      if (!this.hideArrow) {
        this.arrowElement = this.createArrow(
          bestPosition,
          parentRect,
          adjusted ? { top: parseFloat(this.el.style.top), left: parseFloat(this.el.style.left) } : coords,
          tooltipRect,
          adjusted
        );
        this.el.appendChild(this.arrowElement);
      }

      this.openTimer = setTimeout(() => {
        if (this.open) {
          this.el.style.visibility = 'visible';
        }
      }, this.opendelay);
    });
  }

  private onScroll = () => {
    if (!this.open || !this.addedToBody) return;

    this.el.style.visibility = 'hidden';

    if (this.openTimer) {
      clearTimeout(this.openTimer);
    }

    this.openTimer = setTimeout(() => {
      this.updateTooltipPosition();
    }, 100);
  }

  private appendToRoot = () => {
    if (this.parentDom !== document.body) {
      document.body.appendChild(this.el);
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
    if (this.parentObserver || !this.parentDom) {
      return;
    }

    this.parentObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const removedNodes = Array.from(mutation.removedNodes);
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
    _parentRect: DOMRect,
    tooltipRect: DOMRect
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
      if (pos.startsWith('bottom')) return crds.top + tooltipRect.height > scrollY + viewportHeight;
      if (pos.startsWith('left')) return crds.left < scrollX;
      if (pos.startsWith('right')) return crds.left + tooltipRect.width > scrollX + viewportWidth;
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

  private adjustForScreenBounds(tooltipRect: DOMRect): boolean {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjusted = false;

    const currentLeft = parseFloat(this.el.style.left);
    const currentTop = parseFloat(this.el.style.top);

    if (currentLeft < window.scrollX) {
      this.el.style.left = `${window.scrollX}px`;
      adjusted = true;
    }
    else if (currentLeft + tooltipRect.width > window.scrollX + viewportWidth) {
      this.el.style.left = `${window.scrollX + viewportWidth - tooltipRect.width}px`;
      adjusted = true;
    }

    if (currentTop < window.scrollY) {
      this.el.style.top = `${window.scrollY}px`;
      adjusted = true;
    }
    else if (currentTop + tooltipRect.height > window.scrollY + viewportHeight) {
      this.el.style.top = `${window.scrollY + viewportHeight - tooltipRect.height}px`;
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
      case 'top': targetX = parentRect.left + parentRect.width / 2; targetY = parentRect.top; break;
      case 'topLeft': targetX = parentRect.left + 4; targetY = parentRect.top; break;
      case 'topRight': targetX = parentRect.right - 4; targetY = parentRect.top; break;
      case 'bottom': targetX = parentRect.left + parentRect.width / 2; targetY = parentRect.bottom; break;
      case 'bottomLeft': targetX = parentRect.left + 4; targetY = parentRect.bottom; break;
      case 'bottomRight': targetX = parentRect.right - 4; targetY = parentRect.bottom; break;
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

  private setFocus = () => {
    if(!this.open) {
      this.open = true;
    }
  }

  private setBlur = () => {
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
      if (this.el.parentNode === document.body) {
        document.body.removeChild(this.el);
      }
      this.addedToBody = false;
    } catch (err: any) {
      // 에러 무시
    }
  }

  private parentClick = (event: MouseEvent) => {
    event.preventDefault();
    this.open = !this.open;
  }

  private handleOutsideClick = (event: MouseEvent) => {
    if (this.trigger !== 'click' || !this.open || !this.addedToBody) {
      return;
    }

    const target = event.target as HTMLElement;
    const isInTooltip = this.el?.contains(target);
    const isParent = this.parentDom?.contains(target);

    if (!isInTooltip && !isParent) {
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
    const maxWidthStyle = this.maxWidth && this.maxWidth > 0 ? `${this.maxWidth}px` : null;

    return (
      <div class="tooltip-content" style={{ '--tooltip-maxWidth': maxWidthStyle }}>
        <span innerHTML={this.replaceContent}></span>
      </div>
    );
  }

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
    result = this.replaceAll(result, '-', '&ndash;');
    result = result.replace(/\\n/g, '<br>');
    result = result.replace(/\n/g, '<br>');
    result = result.replace(/\r/g, '');
    return result;
  }

  private replaceSpecialChars(content: string) {
    content = this.replaceEscapeChars(content);
    if (!content?.length) return content;
    let result = content;
    result = this.replaceAll(result, '\t', '    ');
    result = this.replaceAll(result, ' ', ' ');
    result = result.replace(/\\n/g, '<br>');
    result = result.replace(/\n/g, '<br>');
    result = result.replace(/\r/g, '');
    return result;
  }
}
