import { Component, Prop, h, Element, Watch, State } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-flex',
  styleUrl: 'sy-flex.scss',
  shadow: false,
})
export class SyFlex {
  @Element() host!: HTMLSyFlexElement;

  @Prop({ reflect: true }) align: 'start' | 'end' | 'center' | 'stretch' | 'baseline' = 'start';
  @Prop({ reflect: true, attribute: 'rowGap', mutable: true }) rowGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @Prop({ reflect: true, attribute: 'columnGap', mutable: true }) columnGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  // Spec adds `space-around` and `space-evenly` on top of the legacy values.
  @Prop({ reflect: true }) justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' = 'start';
  @Prop({ reflect: true }) direction: "horizontal" | "vertical" | "horizontal-reverse" | "vertical-reverse" = "horizontal";
  @Prop({ reflect: true }) wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'nowrap';
  @Prop({ reflect: true }) padding: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @Prop({ reflect: true }) width: string = '';
  @Prop({ reflect: true }) height: string = '';

  @State() private containerWidth: string = '';
  @State() private containerHeight: string = '';

  componentWillLoad() {
    // Support attribute aliases (kebab-case)
    this.rowGap = fnAssignPropFromAlias(this.host, 'row-gap') ?? this.rowGap;
    this.columnGap = fnAssignPropFromAlias(this.host, 'column-gap') ?? this.columnGap;

    // Set initial width/height on host and internal container
    this.updateHostDimensions();
  }

  @Watch('width')
  @Watch('height')
  updateHostDimensions() {
    // compute container size values (use px for numeric values, otherwise pass through)
    if (this.width) {
      const w = this.getSizeValue(this.width);
      this.containerWidth = w;
    } else {
      // default inner container has no explicit width
      this.containerWidth = '';
    }

    if (this.height) {
      const h = this.getSizeValue(this.height);
      this.containerHeight = h;
    } else {
      this.containerHeight = '';
    }
  }

  private getSizeValue(value: string): string {
    if (!value) return '';
    if (/^\d+$/.test(value)) return `${value}px`;
    return value;
  }

  render() {
    // apply direction classes and inline styles to the inner container
    const cls = `flex-container ${this.direction === 'vertical' || this.direction === 'vertical-reverse' ? 'vertical' : 'horizontal'}`;
    const containerStyle: any = {};
    
    if (this.containerWidth) {
      containerStyle.width = this.containerWidth;
    }
    if (this.containerHeight) {
      containerStyle.height = this.containerHeight;
    }
    
    return (
      <div class={cls} style={containerStyle}>
        <slot></slot>
      </div>
    );
  }
}
