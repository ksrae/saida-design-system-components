// src/components/sy-spinner/sy-spinner.tsx

import { Component, h, Prop, State, Watch, Element, Host } from '@stencil/core';

@Component({
  tag: 'sy-spinner',
  styleUrl: 'sy-spinner.scss',
  shadow: false,
  scoped: true,
})
export class SySpinner {
  @Element() host: HTMLElement;

  @Prop() delay = 0;
  @Prop() description: string = '';
  @Prop({ reflect: true }) hidden: boolean = false;
  @Prop({ reflect: true }) inline: boolean = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

  @State() private isVisible = false;
  // [핵심] 슬롯 컨텐츠 유무를 추적하기 위한 State를 다시 추가합니다.
  @State() private hasContent = false;

  private delayTimer: any;
  private parentEl: HTMLElement | null = null;
  private originalParentPosition: string | null = null;

  connectedCallback() {
    this.setupParentPositioning();
    this.setupSpinnerDelay();
  }

  disconnectedCallback() {
    this.revertParentPositioning();
    clearTimeout(this.delayTimer);
  }

  // [핵심] 렌더링 직전에 슬롯에 컨텐츠가 있는지 확인합니다.
  componentWillRender() {
    this.hasContent = Array.from(this.host.childNodes).some(
      node => (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') || node.nodeType === Node.ELEMENT_NODE
    );
  }

  private setupParentPositioning() {
    this.parentEl = this.host.parentElement;
    if (this.parentEl) {
      this.originalParentPosition = this.parentEl.style.position;
      this.parentEl.style.position = 'relative';
    }
  }

  private revertParentPositioning() {
    if (this.parentEl) {
      this.parentEl.style.position = this.originalParentPosition;
      this.parentEl = null;
      this.originalParentPosition = null;
    }
  }

  @Watch('delay')
  handleDelayChange() { this.setupSpinnerDelay(); }

  private setupSpinnerDelay() {
    this.isVisible = false;
    clearTimeout(this.delayTimer);
    if (this.delay > 0) {
      this.delayTimer = setTimeout(() => { this.isVisible = true; }, this.delay);
    } else {
      this.isVisible = true;
    }
  }

  render() {
    const containerClasses = {
      'spinner-container': true,
      'has-mask': this.inline,
    };

    const spinnerCoreClasses = {
      'spinner-core': true,
      [`size--${this.size}`]: true,
    };

    const spinnerCore = (
      <div class={Object.keys(spinnerCoreClasses).filter(key => spinnerCoreClasses[key]).join(' ')}>
        <div class="spinner">
          <svg viewBox="0 0 66 66"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>
        </div>
        {this.description && <span class="spinner--text">{this.description}</span>}
      </div>
    );

    return (
      <Host style={{ display: this.isVisible && !this.hidden ? 'contents' : 'none' }}>
        <div class={Object.keys(containerClasses).filter(key => containerClasses[key]).join(' ')}>
          {spinnerCore}

          {/* [핵심] 슬롯 컨텐츠가 있을 때만 렌더링하도록 수정합니다. */}
          {this.hasContent && (
            <div class="spinner-slot-content">
              <slot />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
