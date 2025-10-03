import { Component, Prop, State, Element, Event, EventEmitter, h, Watch, Method } from '@stencil/core';

export interface HTMLSyCollapsePanelElement extends HTMLElement {
  active: boolean;
  arrow: boolean;
  disabled: boolean;
  ghost: boolean;
  fullheight: boolean;
  index: number;
  borderless: boolean;
  changed: EventEmitter<CollapsePanelChangeDetail>;
  toggle: () => Promise<void>;
  open: () => Promise<void>;
  close: () => Promise<void>;
}

export interface CollapsePanelChangeDetail {
  active: boolean;
  arrow: boolean;
  disabled: boolean;
  ghost: boolean;
  fullheight: boolean;
  index: number;
  borderless: boolean;
}

@Component({
  tag: 'sy-collapse-panel',
  styleUrl: 'sy-collapse.scss',
  shadow: false,
  scoped: true
})
export class SyCollapsePanel {
  @Element() host: HTMLElement;

  @Prop({ reflect: true, mutable: true }) active: boolean = false;
  @Prop() arrow: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() ghost: boolean = false;
  @Prop() fullheight: boolean = false;

  // 내부 상태로만 관리
  borderless: boolean = false;

  @State() contentHeight: number = 0;

  @Event() changed: EventEmitter<CollapsePanelChangeDetail>;

  // 현재 인덱스를 동적으로 계산
  private get currentIndex(): number {
    const parent = this.host.closest('sy-collapse');
    if (!parent) return -1;

    const panels = Array.from(parent.querySelectorAll<HTMLSyCollapsePanelElement>('sy-collapse-panel'));
    return panels.indexOf(this.host as HTMLSyCollapsePanelElement);
  }

  @Watch('disabled')
  watchDisabled(newValue: boolean) {
    if (newValue) {
      this.active = false;
    }
  }

  @Watch('active')
  watchActive(newValue: boolean, oldValue: boolean) {
    const index = this.currentIndex;

    if (newValue) {
      this.contentHeight = this.calculateContentHeight();
    }
  }

  @Method()
  async toggle() {
    if (!this.disabled) {
      this.active = !this.active;
      this.emitChange();
    }
  }

  @Method()
  async open() {
    if (!this.disabled) {
      this.active = true;
      this.emitChange();
    }
  }

  @Method()
  async close() {
    this.active = false;
    this.emitChange();
  }

  render() {
    const itemClasses = {
      'collapse--item': true,
      'ghost': this.ghost,
      'active': this.active,
      'borderless': this.borderless,
      'disabled': this.disabled,
      'full-height-collapse': this.fullheight
    };

    const headerClasses = {
      'collapse--header': true,
      'collapse--arrow': this.arrow
    };

    const contentStyle = {
      display: this.active ? 'block' : 'none'
    };

    const slotWrapperStyle = {
      display: 'block',
      overflow: 'auto',
      boxSizing: 'border-box'
    };

    return (
      <div class={Object.keys(itemClasses).filter(key => itemClasses[key]).join(' ')}>
        <div
          tabindex={0}
          class={Object.keys(headerClasses).filter(key => headerClasses[key]).join(' ')}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onClick={() => this.handleClick()}
        >
          <div class="collapse--title">
            <slot name="header"></slot>
          </div>
        </div>

        <div
          class="collapse--content"
          style={contentStyle}
        >
          <div class="collapse--slot-wrapper" style={slotWrapperStyle}>
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }

  private calculateContentHeight() {
    const content = this.host.querySelector('.collapse--content') as HTMLElement;
    if (content) {
      const contentHeight = content.scrollHeight;
      return contentHeight;
    } else {
      return 0;
    }
  }

  private handleClick() {
    const index = this.currentIndex;

    if (!this.disabled && index !== -1) {
      this.active = !this.active;
      this.emitChange();
    }
  }

  private emitChange() {
    const index = this.currentIndex;
    const detail: CollapsePanelChangeDetail = {
      active: this.active,
      arrow: this.arrow,
      disabled: this.disabled,
      ghost: this.ghost,
      fullheight: this.fullheight,
      index: index,
      borderless: this.borderless
    };

    this.changed.emit(detail);
  }
}
