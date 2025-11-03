import { Component, Prop, State, Element, h, Watch, Event, EventEmitter } from '@stencil/core';
import { hexToRgb, rgbToHsb, hsbToRgb, isValidFormat } from './color-utils';

@Component({
  tag: 'sy-colorpicker',
  styleUrl: 'sy-colorpicker.scss',
  scoped: true,
  shadow: false,
})
export class SyColorpicker {
  @Element() host: HTMLSyColorpickerElement;

  @Prop({ mutable: true }) value: string = '#ff0000';
  @Prop({ mutable: true }) opacity: number = 1;
  @Prop({ attribute: 'showText' }) showText: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop() inline: boolean = false;
  @Prop({ attribute: 'hideOpacity' }) hideOpacity: boolean = false;
  @Prop({ mutable: true }) format: 'hex' | 'hsb' | 'rgb' = 'hex';

  @State() private defaultColor: string = '#ff0000';
  @State() private displayColor: string = '';
  @State() private formattedValue: string = '';
  @State() private hasFocus: boolean = false;

  @Event() changed: EventEmitter<{ value: string; format: string; opacity: number }>;

  connectedCallback() {
    this.validateAndFormatValue();
  }

  componentWillLoad() {
    this.validateAndFormatValue();
  }

  componentDidLoad() {
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
  watchInlineOrHideOpacity() {
    // Force re-render when inline or hideOpacity changes
  }

  @Watch('value')
  @Watch('format')
  watchValueOrFormat() {
    this.validateAndFormatValue();
  }

  private handleColorChange = (e: CustomEvent) => {
    e.stopPropagation();

    const { value, opacity, format } = e.detail;
    
    if (format && format !== this.format) {
      this.format = format;
    }
    
    this.value = value;
    this.opacity = opacity;
    
    this.validateAndFormatValue();
    
    this.changed.emit({ 
      value: this.value, 
      format: this.format, 
      opacity: this.opacity 
    });
  };

  private handleClick = (e: Event) => {
    e.stopPropagation();
  };

  private handleFocus = () => {
    this.hasFocus = true;
  };

  private handleBlur = () => {
    this.hasFocus = false;
  };
  
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
    if (format === 'hex') {
      return value;
    } else if (format === 'rgb') {
      return value;
    } else if (format === 'hsb') {
      const match = value.match(/hsb\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
      if (match) {
        const [_, h, s, b] = match;
        const rgb = hsbToRgb(
          parseInt(h), 
          parseInt(s), 
          parseInt(b)
        );
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
    }
    return this.defaultColor;
  }

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
    
    return (
      <div 
        {...(this.disabled && { disabled: true })}
        {...(this.readonly && { readonly: true })}
        onClick={this.handleClick}
        tabindex={this.disabled || this.readonly ? '-1' : '0'}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        class={{
          'color-picker-button': true
        }}
      >
        <div 
          class={{
            'color-preview': true,
            'focused': this.hasFocus,
            'disabled': this.disabled,
            'readonly': !this.disabled && this.readonly
          }}
          style={{
            backgroundColor: this.displayColor,
            opacity: String(this.opacity)
          }}
        ></div>
        {this.showText && (
          <span class="color-text">{this.formattedValue}</span>
        )}
        
        <sy-popover
          trigger="click" 
          position="top"
          arrow
        >
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
