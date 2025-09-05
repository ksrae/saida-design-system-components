import { Component, h, Prop, State, Element, Event, EventEmitter, Watch } from '@stencil/core';
import { getAssignedNodesContent } from '../../utils/utils';

@Component({
  tag: 'sy-icon',
  styleUrl: 'sy-icon.scss',
  shadow: false,
  scoped: true,
})
export class SyIcon {
  @Element() host: HTMLElement;

  @Prop({ reflect: true }) size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' = 'medium';
  @Prop({ reflect: true }) path?: string;
  @Prop({ reflect: true }) selectable: boolean = false;

  @State() svgContent: string = '';
  @State() hasSlotContent: boolean = false;

  @Event() selected: EventEmitter<{ value: string }>;

  async componentWillRender() {
    // slotchange 이벤트 및 slot 관련 코드 제거
    this.hasSlotContent = !!getAssignedNodesContent(this.host).trim();
    if (!this.hasSlotContent && this.path) {
      await this.loadExternalSvg(this.path);
    }
  }

  @Watch('path')
  async watchPath(newValue: string, oldValue: string) {
    if (newValue && newValue !== oldValue) {
      await this.loadExternalSvg(newValue);
    }
  }

  @Watch('hasSlotContent')
  watchHasSlotContent(newValue: boolean) {
    // slot이 실제로 있을 때만 svgContent를 비움
    if (newValue && this.svgContent && getAssignedNodesContent(this.host)) {
      this.svgContent = '';
    }
  }

  private async loadExternalSvg(path: string) {
    if (this.hasSlotContent) return;
    try {
      const res = await fetch(path);
      if (res.ok) {
        this.svgContent = await res.text();
      } else {
        this.svgContent = '';
      }
    } catch (e) {
      this.svgContent = '';
    }
  }

  private handleClick = () => {
    if (this.selectable) {
      const slotContent = getAssignedNodesContent(this.host);
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
        <slot></slot>
        {!this.hasSlotContent && this.svgContent && (
          <span class="svg-container" innerHTML={this.svgContent}></span>
        )}
      </span>
    );
  }
}
