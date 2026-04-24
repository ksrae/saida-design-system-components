import { Component, h, Prop, Element } from '@stencil/core';

/**
 * sy-divider — a thin horizontal or vertical separator line.
 *
 * Spec: design-system-specs/components/divider.yaml
 * Anatomy:
 *   .horizontal | .vertical (inner line element)
 *
 * Accessibility:
 *   - Host gets `role="separator"` and `aria-orientation` reflecting the type.
 *
 * Not a form-associated element.
 */
@Component({
  tag: 'sy-divider',
  styleUrl: 'sy-divider.scss',
  shadow: false,
  scoped: true,
})
export class SyDivider {
  @Element() host!: HTMLSyDividerElement;

  // --- Public Properties (spec: attributes) ---
  @Prop({ reflect: true }) type: 'horizontal' | 'vertical' = 'horizontal';
  @Prop({ reflect: true }) inset: boolean = false;
  @Prop() thickness: number = 1;
  @Prop() color: string = '';

  connectedCallback() {
    this.host.setAttribute('role', 'separator');
    this.host.setAttribute('aria-orientation', this.type);
  }

  render() {
    const classes: Record<string, boolean> = {
      horizontal: this.type === 'horizontal',
      vertical: this.type === 'vertical',
      'divider--inset': this.inset,
      'divider--small': true,
    };

    // Inline style overrides token defaults when custom thickness/color are given.
    const inlineStyle: { [key: string]: string } = {};
    if (this.thickness && this.thickness !== 1) {
      if (this.type === 'horizontal') inlineStyle.borderTopWidth = `${this.thickness}px`;
      else inlineStyle.borderLeftWidth = `${this.thickness}px`;
    }
    if (this.color) {
      if (this.type === 'horizontal') inlineStyle.borderTopColor = this.color;
      else inlineStyle.borderLeftColor = this.color;
    }

    return (
      <div
        class={Object.keys(classes).filter((key) => classes[key]).join(' ')}
        style={inlineStyle}
      ></div>
    );
  }
}
