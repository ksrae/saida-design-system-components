import { Component, h, Prop, State, Element, Method } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-toast-item',
  styleUrl: 'sy-toast-item.scss',
  scoped: true,
  shadow: false,
})
export class SyToastItem {
  @Element() host: HTMLSyToastItemElement;

  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop({ reflect: true }) position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomRight';
  @Prop({ reflect: true }) variant: 'neutral' | 'success' | 'error' | 'info' | 'warning' = 'neutral';
  @Prop() closable = false;
  @Prop() duration: number;
  @Prop({ attribute: 'latestTop', mutable: true }) latestTop = false;

  @State() private iconName = '';
  @State() private hasIconSlotContent: boolean = false;

  private closeTimer: number;
  private readonly ANIMATION_DURATION = 300;
  private readonly MOUSE_LEAVE_DURATION = 1500;

  componentWillLoad() {
    this.latestTop = fnAssignPropFromAlias(this.host, 'latest-top') ?? this.latestTop;
    this.updateIconName(this.variant);
  }

  connectedCallback() {
    this.host.addEventListener('mouseenter', this.handleMouseEnter);
    this.host.addEventListener('mouseleave', this.handleMouseLeave);
  }

  disconnectedCallback() {
    clearTimeout(this.closeTimer);
    this.host.removeEventListener('mouseenter', this.handleMouseEnter);
    this.host.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  @Method()
  async show() {
    this.open = true;
    this.startCloseTimer(this.duration);
    // [핵심 수정] 클래스 이름 대신 this.constructor를 사용하여 static 메소드를 안전하게 호출합니다.
    requestAnimationFrame(() => this.updateToastPositions(this.position, this.latestTop));
  }

  @Method()
  async close() {
    if (!this.open) return;
    clearTimeout(this.closeTimer);
    this.open = false;
    this.host.classList.add('exit-active');

    setTimeout(() => {
      this.host.remove();
      // [핵심 수정] 여기에서도 동일하게 this.constructor를 사용합니다.
      requestAnimationFrame(() => this.updateToastPositions(this.position, this.latestTop));
    }, this.ANIMATION_DURATION);
  }

  private updateToastPositions(position: string, latestTop: boolean) {
    const toasts = Array.from(document.querySelectorAll(`sy-toast-item[open][position="${position}"]:not(.exit-active)`));
    let offset = 0;
    const sortedToasts = latestTop ? [...toasts].reverse() : toasts;
    sortedToasts.forEach(toast => {
        const toastEl = toast as HTMLElement;
        const toastHeight = toastEl.offsetHeight + 16;
        toastEl.style.transform = position.includes('top') ? `translateY(${offset}px)` : `translateY(${-offset}px)`;
        offset += toastHeight;
    });
  }

  private startCloseTimer(duration: number) {
    clearTimeout(this.closeTimer);
    if (duration > 0) {
      this.closeTimer = window.setTimeout(() => {
        this.close();
      }, duration);
    }
  }

  private handleMouseEnter = () => {
    clearTimeout(this.closeTimer);
  }

  private handleMouseLeave = () => {
    this.startCloseTimer(this.MOUSE_LEAVE_DURATION);
  }

  // --- 이하 UI 관련 코드는 변경 없음 ---
  private handleSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasIconSlotContent = slot.assignedNodes({ flatten: true }).length > 0;
  }

  updateIconName(newVariant: string) {
    switch (newVariant) {
        case 'success': this.iconName = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7L324.4 404.7C320.2 411.4 313 415.6 305.1 416C297.2 416.4 289.6 412.8 284.9 406.4L236.9 342.4C228.9 331.8 231.1 316.8 241.7 308.8C252.3 300.8 267.3 303 275.3 313.6L302.3 349.6L363.7 251.3C370.7 240.1 385.5 236.6 396.8 243.7C408.1 250.8 411.5 265.5 404.4 276.8z"/></svg>'; break;
        case 'warning': this.iconName = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z"/></svg>'; break;
        case 'error': this.iconName = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>'; break;
        case 'info': this.iconName = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>'; break;
        default: this.iconName = ''; break;
    }
  }

  render() {
    return [
      <div class={{ 'toast-icon': true, 'has-content': this.variant === 'neutral' && this.hasIconSlotContent }}>{this.variant === 'neutral' ? <slot name="icon" onSlotchange={this.handleSlotChange}></slot> : <sy-icon size="xxlarge" innerHTML={this.iconName}></sy-icon>}</div>,
      <div class="toast-messsage"><header><slot name="header"></slot></header><div><slot name="body"></slot></div><footer><slot name="footer"></slot></footer></div>,
      <div class="toast-close">{this.closable && <sy-icon size="large" onClick={() => this.close()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg></sy-icon>}</div>
    ];
  }
}
