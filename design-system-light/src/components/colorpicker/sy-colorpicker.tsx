import { Component, Prop, State, Element, h, Watch, Event, EventEmitter } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';
import { hexToRgb, rgbToHsb, hsbToRgb, isValidFormat } from './color-utils';

/**
 * sy-colorpicker — select a color via HEX / RGB / HSB with optional alpha.
 *
 * Spec: design-system-specs/components/color-picker.yaml
 * Anatomy:
 *   .color-picker-button    (hidden in inline mode)
 *     ├─ .color-preview      (swatch of current value)
 *     └─ .color-text          (optional textual representation)
 *     └─ sy-popover → sy-colorpicker-content  (the interactive panel)
 *
 * Spec vs code naming reconciliation (rule: document-first, extend with legacy aliases):
 *   - spec `hideAlpha` ↔ code `hideOpacity` (accept both attributes)
 *   - spec format enum `HEX|RGB|HSB` (uppercase) ↔ code `hex|rgb|hsb` (lowercase).
 *     The value is normalised to lowercase internally so consumers can use either.
 *
 * Not a form-associated element (spec has no `formCallbacks`).
 */
@Component({
  tag: 'sy-colorpicker',
  styleUrl: 'sy-colorpicker.scss',
  scoped: true,
  shadow: false,
})
export class SyColorpicker {
  @Element() host!: HTMLSyColorpickerElement;

  // --- Public Properties (spec: color_picker_apis) ---
  @Prop({ mutable: true }) value: string = '#ff0000';
  @Prop({ mutable: true }) opacity: number = 1;
  @Prop({ attribute: 'showText' }) showText: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop() inline: boolean = false;

  /** Hide the alpha/opacity slider. Alias of the spec name `hideAlpha`. */
  @Prop({ attribute: 'hideOpacity', mutable: true }) hideOpacity: boolean = false;

  /** Current color format. Accepts uppercase (spec) or lowercase (legacy code) — normalised internally. */
  @Prop({ mutable: true }) format: 'hex' | 'hsb' | 'rgb' = 'hex';

  // --- Private State ---
  @State() private defaultColor: string = '#ff0000';
  @State() private displayColor: string = '';
  @State() private formattedValue: string = '';
  @State() private hasFocus: boolean = false;
  @State() private isPanelOpen: boolean = false;

  @Event() changed!: EventEmitter<{ value: string; format: string; opacity: number }>;

  // --- Lifecycle ---
  componentWillLoad() {
    // Legacy/spec attribute aliases resolved manually since they're kebab-case mirrors
    // whose casing differs between spec and code.
    const hideAlphaAttr = fnAssignPropFromAlias<boolean>(this.host, 'hide-alpha', 'hideAlpha');
    if (hideAlphaAttr !== null && hideAlphaAttr !== undefined) this.hideOpacity = hideAlphaAttr;

    this.format = this.normaliseFormat(this.format as string);
    this.validateAndFormatValue();
  }

  disconnectedCallback() {
    const popover = this.host.querySelector('sy-popover');
    if (popover) {
      popover.setAttribute('open', 'false');
      (popover as any).open = false;
    }
  }

  @Watch('inline')
  @Watch('hideOpacity')
  watchInlineOrHideOpacity() { /* Triggers re-render via Stencil */ }

  @Watch('value')
  watchValue() {
    this.validateAndFormatValue();
  }

  @Watch('format')
  watchFormat(newVal: string) {
    const normalised = this.normaliseFormat(newVal);
    if (normalised !== newVal) {
      this.format = normalised;
      return;
    }
    this.validateAndFormatValue();
  }

  // --- Helpers ---
  private normaliseFormat(v: string): 'hex' | 'hsb' | 'rgb' {
    const lower = (v || '').toLowerCase();
    if (lower === 'hex' || lower === 'rgb' || lower === 'hsb') return lower;
    return 'hex';
  }

  private validateAndFormatValue() {
    const isValid = isValidFormat(this.value, this.format);
    if (!isValid) {
      if (this.format === 'hex') {
        this.value = this.defaultColor;
      } else if (this.format === 'rgb') {
        const rgb = hexToRgb(this.defaultColor);
        this.value = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      } else if (this.format === 'hsb') {
        const rgb = hexToRgb(this.defaultColor);
        const hsb = rgbToHsb(rgb[0], rgb[1], rgb[2]);
        this.value = `hsb(${Math.round(hsb[0])}, ${Math.round(hsb[1])}%, ${Math.round(hsb[2])}%)`;
      }
    }
    this.formattedValue = this.value;
    this.displayColor = this.getDisplayColor(this.value, this.format);
  }

  private getDisplayColor(value: string, format: string): string {
    if (format === 'hex') return value;
    if (format === 'rgb') return value;
    if (format === 'hsb') {
      const match = value.match(/hsb\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
      if (match) {
        const [_, h, s, b] = match;
        const rgb = hsbToRgb(parseInt(h), parseInt(s), parseInt(b));
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
    }
    return this.defaultColor;
  }

  // --- Event handlers ---
  private handleColorChange = (e: CustomEvent) => {
    e.stopPropagation();
    const { value, opacity, format } = e.detail;
    if (format && format !== this.format) this.format = this.normaliseFormat(format);
    this.value = value;
    this.opacity = opacity;
    this.validateAndFormatValue();
    this.changed.emit({ value: this.value, format: this.format, opacity: this.opacity });
  };

  private handleClick = (e: Event) => { e.stopPropagation(); };
  private handleFocus = () => { this.hasFocus = true; };
  private handleBlur  = () => { this.hasFocus = false; };

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const popover = this.host.querySelector('sy-popover') as any;
      if (popover) popover.open = !popover.open;
    }
  };

  // --- Render ---
  render() {
    if (this.inline) {
      return (
        <div class="content">
          <sy-colorpicker-content
            disabled={this.disabled}
            readonly={this.readonly}
            value={this.formattedValue}
            opacity={this.opacity}
            hideOpacity={this.hideOpacity}
            format={this.format}
            onColorChange={this.handleColorChange}
          ></sy-colorpicker-content>
        </div>
      );
    }

    const interactive = !this.disabled && !this.readonly;

    return (
      <div
        {...(this.disabled && { disabled: true })}
        {...(this.readonly && { readonly: true })}
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
        tabindex={interactive ? 0 : -1}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={this.isPanelOpen ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-label={`Color picker, current value ${this.formattedValue}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        class={{ 'color-picker-button': true }}
      >
        <div
          class={{
            'color-preview': true,
            'focused': this.hasFocus,
            'disabled': this.disabled,
            'readonly': !this.disabled && this.readonly,
          }}
          style={{
            backgroundColor: this.displayColor,
            opacity: String(this.opacity),
          }}
        ></div>
        {this.showText && <span class="color-text">{this.formattedValue}</span>}

        <sy-popover trigger="click" position="top" arrow>
          <div class="color-picker-container">
            <sy-colorpicker-content
              disabled={this.disabled}
              readonly={this.readonly}
              value={this.formattedValue}
              opacity={this.opacity}
              hideOpacity={this.hideOpacity}
              format={this.format}
              onColorChange={this.handleColorChange}
            ></sy-colorpicker-content>
          </div>
        </sy-popover>
      </div>
    );
  }
}
