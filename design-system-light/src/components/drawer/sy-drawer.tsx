// src/components/drawer/drawer.tsx

import { Component, h, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sy-drawer',
  shadow: false,
  scoped: true,
  styleUrl: 'sy-drawer.scss'
})
export class Drawer {
  @Element() hostElement: HTMLElement;

  @Prop() maskless: boolean = false;
  @Prop() preventClose: boolean = false;
  @Prop() position: 'top' | 'left' | 'right' | 'bottom' = 'right';
  @Prop() size: 'small' | 'medium' | 'large' | 'custom' = 'medium';
  @Prop() closable: boolean = false;
  @Prop({ mutable: true, reflect: true }) open: boolean = false;
  @Prop() customSize: number = 100;

  @Event() opened: EventEmitter<void>;
  @Event() closed: EventEmitter<void>;

  private hasBeenAppendedToBody = false;

  constructor() {
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    document.addEventListener('click', this.handleOutsideClick, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick, true);
    if (this.hasBeenAppendedToBody && document.body.contains(this.hostElement)) {
        document.body.removeChild(this.hostElement);
    }
  }

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      this.appendToBody();
      this.opened.emit();
    } else {
      this.hostElement.removeAttribute('open');
      this.closed.emit();
    }
  }

  private appendToBody() {
    if (!this.hasBeenAppendedToBody) {
      document.body.appendChild(this.hostElement);
      this.hasBeenAppendedToBody = true;
    }
  }

  private handleOutsideClick(event: MouseEvent) {
    if (!this.open || this.preventClose) {
      return;
    }
    const container = this.hostElement.querySelector('.drawer-container');
    const path = event.composedPath();
    if (container && !path.includes(container)) {
      this.open = false;
    }
  }

  private handleMaskClick() {
    if (!this.preventClose) {
      this.open = false;
    }
  }

  private handleCloseButtonClick() {
    this.open = false;
  }

  private hasSlotContent(slotName: string): boolean {
    // 컴포넌트가 DOM에 완전히 연결된 후에만 쿼리하도록
    if (!this.hostElement.isConnected) return false;
    return !!this.hostElement.querySelector(`[slot="${slotName}"]`);
  }

  private getCustomSizeStyles() {
    if (this.size !== 'custom') {
      return {};
    }
    switch (this.position) {
      case 'left':
      case 'right':
        return { width: `${this.customSize}px` };
      case 'top':
      case 'bottom':
        return { height: `${this.customSize}px` };
      default:
        return {};
    }
  }

  render() {
    // !!!! 제가 임의로 추가했던 if(!this.open) return null; 구문을 완전히 제거했습니다. !!!!
    // 이제 원본처럼 항상 렌더링합니다.

    const hasHeader = this.hasSlotContent('header');
    const hasFooter = this.hasSlotContent('footer');

    const containerClasses = {
      'drawer-container': true,
      [this.position]: true,
      [this.size]: this.size !== 'custom',
    };

    return (
      <div class="drawer-wrapper">
        {!this.maskless && (
          <div class="drawer-mask" onClick={() => this.handleMaskClick()}></div>
        )}
        <div class={containerClasses} style={this.getCustomSizeStyles()}>
          {(this.closable || hasHeader) && (
            <div class="drawer-header">
              <div class="drawer-header-content">
                <slot name="header" />
              </div>
              {this.closable && (
                <div class="drawer-header-button-container">
                  <sy-icon selectable size="large" onClick={() => this.handleCloseButtonClick()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg>
                  </sy-icon>
                </div>
              )}
            </div>
          )}
          <div class="drawer-body">
            <slot name="body" />
          </div>
          {hasFooter && (
            <div class="drawer-footer">
              <slot name="footer" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
