import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import './colorpicker-content.element';
import '../button/button.element';
import '../popover/popover.element';
import globalCSS from './styles/colorpicker.scss?inline';
import { hexToRgb, rgbToHex, rgbToHsb, hsbToRgb, isValidFormat } from './color-utils';

@customElement('sy-colorpicker')
export class ColorPickerElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: String }) value: string = '#ff0000';
  @property({ type: Number }) opacity: number = 1;
  @property({ type: Boolean }) showText: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) inline: boolean = false;
  @property({ type: Boolean }) hideOpacity: boolean = false;
  @property({ type: String }) format: 'hex' | 'hsb' | 'rgb' = 'hex';

  // 기본 색상 상태
  @state() private defaultColor: string = '#ff0000';
  @state() private displayColor: string = '';
  @state() private formattedValue: string = '';
  @state() private hasFocus: boolean = false;

  constructor() {
    super();
    this.validateAndFormatValue();
  }

  async firstUpdated() {
    await this.updateComplete;
    this.validateAndFormatValue();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if(changedProperties.has('inline') || changedProperties.has('hideOpacity')) {
      // inline 또는 hideOpacity 속성이 변경되면 강제로 다시 렌더링
      this.requestUpdate();
    }
    
    if(changedProperties.has('value') || changedProperties.has('format')) {
      // value나 format이 변경되면 값 검증 및 포맷 진행
      this.validateAndFormatValue();
    }
  }

  disconnectedCallback(): void {
    // 내부 popover 요소 찾기
    const popover = this.querySelector('sy-popover');
    
    // popover가 존재하면 open 속성을 false로 설정하여 닫기
    if (popover) {
      popover.setAttribute('open', 'false');
      // LitElement의 속성도 함께 설정
      (popover as any).open = false;
    }
    
    // 부모 클래스의 disconnectedCallback 호출
    super.disconnectedCallback();
  }

  render() {
    // inline이 true인 경우 컨텐츠만 바로 표시
    if (this.inline) {
      return html`
        <div class="content">
          <sy-colorpicker-content
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            .value="${this.formattedValue}" 
            .opacity="${this.opacity}"
            .hideOpacity="${this.hideOpacity}"
            .format="${this.format}"
            @color-change="${this.handleColorChange}"
          ></sy-colorpicker-content>
        </div>
      `;
    }
    
    // 기존 버튼+팝오버 방식
    return html`
      <div ?disabled=${this.disabled} ?readonly=${this.readonly} @click=${this.handleClick} 
      tabindex="0"
      @focus=${() => this.hasFocus = true} 
      @blur=${() => this.hasFocus = false}
       class="color-picker-button">
        <div 
          class="${classMap({
            'color-preview': true,
            'focused': this.hasFocus,
            disabled: this.disabled,
            readonly: !this.disabled && this.readonly
          })}" 
          style="background-color: ${this.displayColor}; opacity: ${this.opacity};">
        </div>
        ${this.showText ? html`<span class="color-text">${this.formattedValue}</span>` : ''}

        <sy-popover
          trigger="click" 
          position="top"
          arrow>
            <div class="color-picker-container">
              <sy-colorpicker-content
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                .value="${this.formattedValue}" 
                .opacity="${this.opacity}"
                .hideOpacity="${this.hideOpacity}"
                .format="${this.format}"
                @color-change="${this.handleColorChange}"
              ></sy-colorpicker-content>
            </div>
          </sy-popover>
      </div>
    `;
  }

  private handleColorChange(e: CustomEvent) {
    e.stopPropagation();

    // 단순화된 이벤트 데이터 추출
    const { value, opacity, format } = e.detail;
    
    // format이 이벤트에서 전달되면 업데이트
    if (format && format !== this.format) {
      this.format = format;
    }
    
    // 값과 투명도 설정
    this.value = value;
    this.opacity = opacity;
    
    // 값 검증 및 포맷팅
    this.validateAndFormatValue();
    
    // 이벤트를 외부로 전달 - 단순화된 형태로
    this.dispatchEvent(new CustomEvent('changed', {
      detail: { 
        value: this.value, 
        format: this.format, 
        opacity: this.opacity 
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleClick(e: any) {
    e.stopPropagation();    
  }
  
  private validateAndFormatValue() {
    // 현재 format에 맞는 값인지 검증
    const isValid = isValidFormat(this.value, this.format);
    
    if (!isValid) {
      // 유효하지 않은 경우 기본 색상 사용하고 현재 포맷에 맞게 변환
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
    
    // 화면 표시용 값 설정
    this.formattedValue = this.value;
    this.displayColor = this.getDisplayColor(this.value, this.format);
  }

  private getDisplayColor(value: string, format: string): string {
    // 표시용 색상은 항상 CSS에서 유효한 hex 또는 rgb 형식으로 변환
    if (format === 'hex') {
      return value;
    } else if (format === 'rgb') {
      return value;
    } else if (format === 'hsb') {
      // HSB에서 RGB로 변환하여 표시
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
}
