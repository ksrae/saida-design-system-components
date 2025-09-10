import { Component, h, Prop, State, Element, Event, EventEmitter, Watch } from '@stencil/core';

export interface HTMLSyIconElement extends HTMLElement {
  size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
  path?: string;
  selectable: boolean;
  selected: EventEmitter<{ value: string }>;
}

@Component({
  tag: 'sy-icon',
  styleUrl: 'sy-icon.scss',
  shadow: false,
  scoped: true,
})
export class SyIcon {
  @Element() host: HTMLElement;

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
    if (this.selectable) {
      const slotContent = Array.from(this.containerEl.childNodes).map(node => node.textContent).join('');
      const value = this.path || slotContent;
      if (value) {
        this.selected.emit({ value });
      }
    }
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
