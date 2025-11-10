import { Component, h, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'sy-card',
  styleUrl: 'sy-card.scss',
  shadow: false,
})
export class SyCard {
  @Element() el: HTMLSyCardElement;

  @Prop({ reflect: true }) collapsible: boolean = false;
  @Prop({ reflect: true }) backdrop: boolean = false;

  @State() isCollapsed: boolean = false;
  @State() private hasHeaderSlot: boolean = false;

  componentWillLoad() {
    this.checkHeaderSlot();
  }

  componentDidLoad() {
    // DOM이 완전히 로드된 후에 체크
    this.checkHeaderSlot();

    // MutationObserver 설정
    const observer = new MutationObserver(() => {
      this.checkHeaderSlot();
    });
    observer.observe(this.el, { childList: true, subtree: true });
  }

  private checkHeaderSlot = () => {
    const hasHeader = !!this.el.querySelector('[slot="header"]');
    this.hasHeaderSlot = hasHeader;
  }

  private toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  }

  render() {
    return (
      <div
        class={{
          'card': true,
          'card-backdrop': this.backdrop,
        }}
      >
        <slot name="cover"></slot>
        <div class="card-header-wrapper">
          {this.collapsible && this.hasHeaderSlot && (
            <sy-icon selectable onSelected={this.toggle}>
              {this.isCollapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M303.5 473C312.9 482.4 328.1 482.4 337.4 473L537.4 273C546.8 263.6 546.8 248.4 537.4 239.1C528 229.8 512.8 229.7 503.5 239.1L320.5 422.1L137.5 239.1C128.1 229.7 112.9 229.7 103.6 239.1C94.3 248.5 94.2 263.7 103.6 273L303.6 473z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M303.5 167C312.9 157.6 328.1 157.6 337.4 167L537.4 367C546.8 376.4 546.8 391.6 537.4 400.9C528 410.2 512.8 410.3 503.5 400.9L320.5 217.9L137.5 400.9C128.1 410.3 112.9 410.3 103.6 400.9C94.3 391.5 94.2 376.3 103.6 367L303.6 167z"></path>
                </svg>
              )}
            </sy-icon>
          )}
          <slot name="header"></slot>
        </div>
        <div class={{ 'card-content': true, 'collapsed': this.collapsible && this.isCollapsed }}>
          <slot></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    );
  }
}
