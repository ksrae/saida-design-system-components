import { Component, Prop, State, Element, Event, EventEmitter, h, Host, Watch, Method } from '@stencil/core';

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
  @Element() host: HTMLSyCollapsePanelElement;

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
    return panels.indexOf(this.host);
  }

  @Watch('disabled')
  watchDisabled(newValue: boolean) {
    if (newValue) {
      this.active = false;
    }
  }

  @Watch('active')
  watchActive(newValue: boolean, _oldValue: boolean) {
    // const index = this.currentIndex;

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

  componentDidLoad() {
    this.applyHostStyle();
  }

  componentDidRender() {
    this.applyHostStyle();
  }

  private applyHostStyle() {
    const fullheightActive = this.fullheight && this.active;
    const s = this.host.style;
    if (fullheightActive) {
      s.display = 'flex';
      s.flexDirection = 'column';
      s.flex = '1';
      s.minHeight = '0';
    } else {
      s.display = '';
      s.flexDirection = '';
      s.flex = '';
      s.minHeight = '';
    }
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

    const fullheightActive = this.fullheight && this.active;

    const itemStyle: { [k: string]: string } = fullheightActive
      ? { display: 'flex', flexDirection: 'column', flex: '1', minHeight: '0' }
      : {};

    // Inline styles guarantee the animation runs regardless of Stencil
    // scoped-CSS selector transforms. In fullheight+active mode we bypass
    // the grid animation and let flexbox stretch the content instead.
    const contentStyle: { [k: string]: string } = fullheightActive
      ? {
          display: 'block',
          flex: '1',
          minHeight: '0',
          padding: 'var(--spacing-xsmall)',
          overflow: 'hidden',
          backgroundColor: 'var(--collapse-default-body-background-enabled)',
          boxSizing: 'border-box',
        }
      : {
          display: 'grid',
          gridTemplateRows: this.active ? '1fr' : '0fr',
          paddingLeft: 'var(--spacing-xsmall)',
          paddingRight: 'var(--spacing-xsmall)',
          paddingTop: this.active ? 'var(--spacing-xsmall)' : '0',
          paddingBottom: this.active ? 'var(--spacing-xsmall)' : '0',
          transition:
            'grid-template-rows var(--collapse-transition-duration, 0.3s) var(--collapse-transition-timing, ease-in-out),' +
            ' padding var(--collapse-transition-duration, 0.3s) var(--collapse-transition-timing, ease-in-out)',
          overflow: 'hidden',
          backgroundColor: 'var(--collapse-default-body-background-enabled)',
          boxSizing: 'border-box',
        };

    const slotWrapperStyle: { [k: string]: string } = fullheightActive
      ? { display: 'block', overflow: 'auto', height: '100%', minHeight: '0', boxSizing: 'border-box' }
      : { display: 'block', overflow: 'hidden', minHeight: '0', boxSizing: 'border-box' };

    return (
      <Host>
        <div
          class={Object.keys(itemClasses).filter(key => itemClasses[key]).join(' ')}
          style={itemStyle}
        >
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

          <div class="collapse--content" style={contentStyle} aria-hidden={this.active ? 'false' : 'true'}>
            <div class="collapse--slot-wrapper" style={slotWrapperStyle}>
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
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
