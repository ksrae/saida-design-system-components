import { Component, h, Prop, State, Element, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'sy-icon',
  styleUrl: 'sy-icon.scss',
  shadow: false,
  scoped: true,
})
export class SyIcon {
  @Element() host: HTMLSyIconElement;

  @Prop({ reflect: true }) size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' = 'medium';
  @Prop({ reflect: true }) path?: string; // slot보다 path가 우선함.
  @Prop({ reflect: true }) selectable: boolean = false;

  @State() private svgContent: string = '';

  @Event() selected: EventEmitter<{ value: string }>;

  private containerEl: HTMLSpanElement;


  componentWillLoad() {
    // Load external SVG if path is provided
    if (this.path) {
      this.loadExternalSvg(this.path);
    }
  }

  componentDidLoad() {

  }

  disconnectedCallback() {

  }

  @Watch('path')
  async watchPath(newValue: string, oldValue: string) {
    if (newValue && newValue !== oldValue) {
      await this.loadExternalSvg(newValue);
    }
  }

  private async loadExternalSvg(path: string) {
    try {
      const res = await fetch(path);
      if (res.ok) {
        this.svgContent = await res.text();
      } else {
        console.error(`Failed to load SVG from path: ${path}, status: ${res.status}`);
      }
    } catch (e) {
      console.error(`Error loading SVG: ${e.message}`);
    }
  }

private handleClick = () => {
    // selectable이 false이면 아무 작업도 하지 않음
    if (!this.selectable) {
      return;
    }

    // 1. path prop이 있으면 최우선으로 path 값을 사용
    if (this.path) {
      this.selected.emit({ value: this.path });
      return;
    }

    // 2. path가 없을 경우, slot에 있는 첫 번째 자식 요소를 찾음
    // containerEl은 slot을 감싸는 span이며, firstElementChild는 slot에 실제로 들어온 첫 번째 HTML 요소를 가리킴
    const slottedElement = this.containerEl.firstElementChild;

    if (slottedElement) {
      // 텍스트가 아닌 요소의 전체 HTML(예: <svg>...</svg>)을 값으로 사용
      const value = slottedElement.outerHTML;
      this.selected.emit({ value });
    }
    // path도 없고 slot에 요소도 없으면 아무것도 emit하지 않음
  };

  render() {
    const classNames = {
      icon: true,
      xxsmall: this.size === 'xxsmall',
      xsmall: this.size === 'xsmall',
      small: this.size === 'small',
      medium: this.size === 'medium',
      large: this.size === 'large',
      xlarge: this.size === 'xlarge',
      xxlarge: this.size === 'xxlarge',
      xxxlarge: this.size === 'xxxlarge',
      selectable: this.selectable,
    };

    return (
      <span
        class={Object.keys(classNames).filter(key => classNames[key]).join(' ')}
        onClick={this.handleClick}
      >
        {/* Always render slot container */}
        <span ref={(el) => this.containerEl = el as HTMLSpanElement} class="svg-container">
          <slot />
        </span>

        {/* Render path SVG if svgContent is available */}
        {this.svgContent && (
          <span class="svg-container" innerHTML={this.svgContent}></span>
        )}
      </span>
    );
  }
}
