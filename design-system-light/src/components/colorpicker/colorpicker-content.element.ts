import { LitElement, html, css, PropertyValues, CSSResultGroup, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import globalCSS from './styles/colorpicker-content.scss?inline';
import '../input/input.element';
import '../input-number/input-number.element';
import '../select/select.element';
import '../select/select-option.element';
import { hexToRgb, rgbToHex, rgbToHsb, hsbToRgb, isValidFormat } from './color-utils';
import { SelectElement } from '../select/select.element';

@customElement('sy-colorpicker-content')
export class ColorPickerContentElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};
  `

  @property({ type: String }) value: string = '#ff0000';
  @property({ type: Number }) opacity: number = 1;
  @property({ type: Boolean }) hideOpacity: boolean = false;
  @property({ type: String }) format: 'hex' | 'rgb' | 'hsb' = 'hex';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;

  @state() private hue: number = 0;
  @state() private indicatorX: number = 0;
  @state() private indicatorY: number = 0;
  @state() private rgb: [number, number, number] = [255, 0, 0];
  @state() private hsb: [number, number, number] = [0, 100, 100];
  @state() private opacityGradient = '';

  private isUpdatingInternally = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
    if (this._boundSyncCanvasSize) {
      window.removeEventListener('resize', this._boundSyncCanvasSize);
    }
  }

  // render 직전에 호출되어, 프로퍼티 변경에 따른 상태 업데이트를 수행
  willUpdate(changedProperties: PropertyValues) {
    if (this.isUpdatingInternally) {
      this.isUpdatingInternally = false;
      return;
    }

    // value 또는 format이 외부에서 변경되었을 때만 내부 상태를 동기화
    if (changedProperties.has('value') || changedProperties.has('format')) {
      this.syncStateFromValue();
    }
  }

  // 컴포넌트가 처음 생성될 때 호출
  constructor() {
    super();
    // 초기값 설정
    this.syncStateFromValue();
  }

  // 최초 렌더링 후에만 실행
  async firstUpdated() {
    await this.updateComplete;
    this._boundSyncCanvasSize = this.syncCanvasSize.bind(this);
    this.syncCanvasSize();
    window.addEventListener('resize', this._boundSyncCanvasSize);
    // 기존 indicator 위치 업데이트 로직 유지
    const updatePosition = () => {
      const canvas = this.shadowRoot?.querySelector('#colorCanvas') as HTMLCanvasElement;
      if (canvas && canvas.clientWidth > 0 && canvas.clientHeight > 0) {
        this.updateIndicatorPosition();
      } else {
        requestAnimationFrame(updatePosition);
      }
    };
    requestAnimationFrame(updatePosition);
  }

  // DOM 렌더링이 완료된 후, UI 관련 작업을 수행
  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    this.renderCanvas(this.hue);
    this.updateOpacityGradient();

    // 다음 프레임에서 indicator 위치 업데이트 (DOM 크기 확정 후)
    requestAnimationFrame(() => {
      this.updateIndicatorPosition();
    });
  }

  // render() 함수 (변경 없음)
  render() {
    const displayHex = rgbToHex(this.rgb[0], this.rgb[1], this.rgb[2]);
    const displayRgb = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
    const displayHsb = `hsb(${Math.round(this.hsb[0])}, ${Math.round(this.hsb[1])}%, ${Math.round(this.hsb[2])}%)`;

    return html`
      <div class="picker-content">
        <div class="canvas-container">
          <div class="vertical-slider-container">
            <input type="range" min="0" max="359" value="${String(this.hue)}" ?disabled=${this.disabled || this.readonly}
                   style="opacity:${this.disabled || this.readonly ? 0.5 : 1};" @input="${this.handleHueSlider}" class="vertical-slider" />
          </div>
          <div class="canvas-wrapper ${this.disabled || this.readonly ? 'disabled' : ''}">
            <canvas id="colorCanvas" width="300" height="152"></canvas>
            <div
              class="indicator"
              style="top: ${this.indicatorY}px; left: ${this.indicatorX}px; 
                     background-color: ${displayHex};"
            ></div>
          </div>
        </div>
        <div class="color-picker-group">
          <div class="color-range-area">
            <input type="range" min="0" max="359" value="${String(this.hue)}" ?disabled=${this.disabled || this.readonly}
                  style="opacity:${this.disabled || this.readonly ? 0.5 : 1};" @input="${this.handleHueSlider}" class="slider color-slider" />
            
            ${!this.hideOpacity ? html`
              <input type="range" min="0" max="1" step="0.01" value="${String(this.opacity)}" ?disabled=${this.disabled || this.readonly}
                    @input="${this.handleOpacitySlider}" class="slider opacity-slider" 
                    style="opacity:${this.disabled || this.readonly ? 0.5 : 1}; background: ${this.opacityGradient}" /> 
            ` : ''}
                      
          </div>
          <div class="color-display-area">
              <div class="color-display-outline">
                <div class="color-display" style="background-color: ${displayHex}; opacity: ${this.disabled || this.readonly ? 0.5 : this.opacity};"></div>
              </div>
          </div>
          </div>
        <div class="color-form">  
          <sy-select 
            ?disabled=${this.disabled} 
            ?readonly=${this.readonly}
            size="small" 
            class="color-type"
            defaultValue="${this.format}"
            @selected="${this.handleFormatChange}">
            <sy-option value="hex" label="HEX"></sy-option>
            <sy-option value="rgb" label="RGB"></sy-option>
            <sy-option value="hsb" label="HSB"></sy-option>
          </sy-select>
        
          <div class="color-values">
            ${this.format === 'hex' ? html`
              <div class="color-section color-hex">
                <div class="color-inputs">
                  <sy-input size="small" max="7" value="${displayHex}" @changed="${this.handleHexInput}" ?disabled=${this.disabled} ?readonly=${this.readonly}></sy-input>
                </div>
              </div>
            ` : ''}
            
            ${this.format === 'rgb' ? html`
              <div class="color-section color-rgb">
                <div class="color-inputs">
                  <sy-input-number size="small" min="0" max="255" value="${this.rgb[0]}" @changed="${(e: CustomEvent) => this.handleRgbInput(e, 'r')}" ?disabled=${this.disabled} ?readonly=${this.readonly}></sy-input-number>
                  <sy-input-number size="small" min="0" max="255" value="${this.rgb[1]}" @changed="${(e: CustomEvent) => this.handleRgbInput(e, 'g')}" ?disabled=${this.disabled} ?readonly=${this.readonly}></sy-input-number>
                  <sy-input-number size="small" min="0" max="255" value="${this.rgb[2]}" @changed="${(e: CustomEvent) => this.handleRgbInput(e, 'b')}" ?disabled=${this.disabled} ?readonly=${this.readonly}></sy-input-number>
                </div>
              </div>
            ` : ''}
            
            ${this.format === 'hsb' ? html`
              <div class="color-section color-hsb">
                <div class="color-inputs">
                  <sy-input-number size="small" min="0" max="360" value="${Math.round(this.hsb[0])}" @changed="${(e: CustomEvent) => this.handleHsbInput(e, 'h')}" ?disabled=${this.disabled} ?readonly=${this.readonly}></sy-input-number>
                  <sy-input-number size="small" min="0" max="100" value="${Math.round(this.hsb[1])}" @changed="${(e: CustomEvent) => this.handleHsbInput(e, 's')}" ?disabled=${this.disabled} ?readonly=${this.readonly}></sy-input-number>
                  <sy-input-number size="small" min="0" max="100" value="${Math.round(this.hsb[2])}" @changed="${(e: CustomEvent) => this.handleHsbInput(e, 'b')}" ?disabled=${this.disabled} ?readonly=${this.readonly}></sy-input-number>
                </div>
              </div>
            ` : ''}
            
            ${!this.hideOpacity ? html`
              <div class="color-section color-opacity">
                <sy-input-number size="small" min="0" max="1" step="0.01" ?disabled=${this.disabled} ?readonly=${this.readonly}
                                value="${this.opacity}" @changed="${this.handleOpacityInput}"></sy-input-number>
              </div>
            ` : ''}
            </div>
          </div>
            <div class="rgb-footer">
              ${this.format === 'hex' ? `HEX: ${displayHex}` :
          this.format === 'rgb' ? `RGB: ${displayRgb}` :
            `HSB: ${displayHsb}`}
              ${!this.hideOpacity ? ` / Opacity: ${this.opacity}` : ''}
            </div>          
        </div>
      </div>
    `;
  }

  private syncStateFromValue() {
    if (isValidFormat(this.value, this.format)) {
      if (this.format === 'hex') {
        this.rgb = hexToRgb(this.value);
        this.hsb = rgbToHsb(...this.rgb);
      } else if (this.format === 'rgb') {
        const match = this.value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (match) {
          this.rgb = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
          this.hsb = rgbToHsb(...this.rgb);
        }
      } else if (this.format === 'hsb') {
        const match = this.value.match(/hsb\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
        if (match) {
          this.hsb = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
          this.rgb = hsbToRgb(...this.hsb);
        }
      }
    } else {
      // 유효하지 않으면 기본값으로 설정
      this.rgb = [255, 0, 0];
      this.hsb = [0, 100, 100];
    }
    this.hue = this.hsb[0];
  }

  private updateSelectValue() {
    const selectElement = this.shadowRoot?.querySelector('sy-select') as SelectElement;
    if (selectElement) {
      // select 컴포넌트의 value 속성을 직접 설정
      selectElement.defaultValue = this.format;

      // 만약 위 방법이 동작하지 않는다면, 다음과 같이 시도
      try {
        selectElement.setAttribute('value', this.format);
      } catch (error) {
        console.warn('Failed to set select value:', error);
      }
    }
  }

  // Event Listeners (변경 없음)
  private canvasMouseDownHandler = (event: MouseEvent) => this.handleCanvasMouseDown(event);
  private canvasMouseMoveHandler = (event: MouseEvent) => this.updateColorFromCanvasPosition(event);
  private canvasMouseUpHandler = () => {
    document.removeEventListener('mousemove', this.canvasMouseMoveHandler);
    document.removeEventListener('mouseup', this.canvasMouseUpHandler);
  };

  private addEventListeners() {
    // shadowRoot가 생성된 후에 이벤트 리스너를 추가하기 위해 약간의 지연을 줌
    this.updateComplete.then(() => {
      const canvas = this.shadowRoot?.querySelector('#colorCanvas') as HTMLCanvasElement;
      canvas?.addEventListener('mousedown', this.canvasMouseDownHandler);
    });
  }

  private removeEventListeners() {
    const canvas = this.shadowRoot?.querySelector('#colorCanvas') as HTMLCanvasElement;
    canvas?.removeEventListener('mousedown', this.canvasMouseDownHandler);
    document.removeEventListener('mouseup', this.canvasMouseUpHandler);
    document.removeEventListener('mousemove', this.canvasMouseMoveHandler);
  }

  // Canvas를 컬러피커용으로 렌더링하고, 크기를 동기화
  private _boundSyncCanvasSize: (() => void) | undefined;
  private syncCanvasSize() {
    const canvas = this.shadowRoot?.querySelector('#colorCanvas') as HTMLCanvasElement;
    if (canvas) {
      const wrapper = this.shadowRoot?.querySelector('.canvas-wrapper') as HTMLElement;
      if (wrapper) {
        const width = wrapper.clientWidth || 244;
        const height = wrapper.clientHeight || 152;
        if (canvas.width !== width) canvas.width = width;
        if (canvas.height !== height) canvas.height = height;
        this.renderCanvas(this.hue);
        this.updateIndicatorPosition();
      }
    }
  }

  // Canvas 렌더링 (컬러피커용)
  private renderCanvas(hue: number) {
    const canvas = this.shadowRoot?.querySelector('#colorCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    // 1. 베이스: 흰색 -> 선택된 색상(hue)
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, width, height);
    // 2. 왼쪽->오른쪽: 흰색 -> 투명
    const gradientH = ctx.createLinearGradient(0, 0, width, 0);
    gradientH.addColorStop(0, '#fff');
    gradientH.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradientH;
    ctx.fillRect(0, 0, width, height);
    // 3. 위->아래: 투명 -> 검정
    const gradientV = ctx.createLinearGradient(0, 0, 0, height);
    gradientV.addColorStop(0, 'rgba(0,0,0,0)');
    gradientV.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gradientV;
    ctx.fillRect(0, 0, width, height);
  }

  // Event Handlers (변경 없음)
  private handleCanvasMouseDown(event: MouseEvent) {
    if (this.disabled || this.readonly) return;
    this.updateColorFromCanvasPosition(event);
    document.addEventListener('mousemove', this.canvasMouseMoveHandler);
    document.addEventListener('mouseup', this.canvasMouseUpHandler);
  }

  private handleHueSlider(event: Event) {
    if (this.disabled || this.readonly) return;
    const newHue = parseInt((event.target as HTMLInputElement).value, 10);
    const [, s, b] = this.hsb;
    this.updateHsbState(newHue, s, b);
  }

  private handleOpacitySlider(event: Event) {
    if (this.disabled || this.readonly) return;
    this.opacity = parseFloat((event.target as HTMLInputElement).value);
    this.updateOpacityGradient();
    this.emitColorChange();
  }

  private handleOpacityInput(e: CustomEvent) {
    if (this.disabled || this.readonly) return;
    const value = e.detail.value !== undefined ? Number(e.detail.value) : 1;
    this.opacity = Math.max(0, Math.min(1, value));
    this.updateOpacityGradient();
    this.emitColorChange();
  }

  private handleFormatChange(e: CustomEvent) {
    if (this.disabled || this.readonly) return;
    if (e.detail.selectedOptions && e.detail.selectedOptions.length > 0) {
      this.format = e.detail.selectedOptions[0].value;
      this.emitColorChange();
    }
  }

  private handleHexInput(e: CustomEvent) {
    if (this.disabled || this.readonly) return;
    const hex = e.detail.value;
    if (isValidFormat(hex, 'hex')) {
      this.updateRgbState(...hexToRgb(hex));
    }
  }

  private handleRgbInput(e: CustomEvent, component: 'r' | 'g' | 'b') {
    if (this.disabled || this.readonly) return;
    const value = e.detail.value !== undefined ? Number(e.detail.value) : 0;
    let [r, g, b] = this.rgb;
    if (component === 'r') r = value;
    if (component === 'g') g = value;
    if (component === 'b') b = value;
    this.updateRgbState(r, g, b);
  }

  private handleHsbInput(e: CustomEvent, component: 'h' | 's' | 'b') {
    if (this.disabled || this.readonly) return;
    const value = e.detail.value !== undefined ? Number(e.detail.value) : 0;
    let [h, s, b] = this.hsb;
    if (component === 'h') h = value;
    if (component === 's') s = value;
    if (component === 'b') b = value;
    this.updateHsbState(h, s, b);
  }

// State and UI Update Logic
private updateColorFromCanvasPosition(event: MouseEvent) {
  if (this.disabled || this.readonly) return;
  const canvas = this.shadowRoot!.querySelector('#colorCanvas') as HTMLCanvasElement;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  // 캔버스의 실제 표시 크기를 기준으로 좌표를 제한합니다.
  x = Math.max(0, Math.min(x, canvas.clientWidth));
  y = Math.max(0, Math.min(y, canvas.clientHeight));

  // 마우스 좌표를 인디케이터 위치에 직접 할당하여 즉각적인 반응성을 보장합니다.
  this.indicatorX = x;
  this.indicatorY = y;

  // HSB 값을 계산할 때도 캔버스의 실제 표시 크기(clientWidth, clientHeight)를 사용합니다.
  const s = (x / canvas.clientWidth) * 100;
  const b = 100 - (y / canvas.clientHeight) * 100;
  
  this.updateHsbState(this.hue, s, b);
}


  private updateRgbState(r: number, g: number, b: number) {
    this.rgb = [
      Math.max(0, Math.min(255, r)),
      Math.max(0, Math.min(255, g)),
      Math.max(0, Math.min(255, b)),
    ];
    this.hsb = rgbToHsb(...this.rgb);
    this.hue = this.hsb[0];
    this.emitColorChange();
  }

  private updateHsbState(h: number, s: number, b: number) {
    this.hsb = [
      Math.max(0, Math.min(360, h)),
      Math.max(0, Math.min(100, s)),
      Math.max(0, Math.min(100, b)),
    ];
    this.hue = this.hsb[0];
    this.rgb = hsbToRgb(...this.hsb);
    this.emitColorChange();
  }

  private updateIndicatorPosition() {
    const canvas = this.shadowRoot?.querySelector('#colorCanvas') as HTMLCanvasElement;
    if (canvas && canvas.clientWidth > 0 && canvas.clientHeight > 0) {
      // HSB 값을 기반으로 캔버스 내에서의 위치 계산
      // S(saturation): 0-100 -> 0-canvas.width (왼쪽에서 오른쪽)
      // B(brightness): 0-100 -> canvas.height-0 (아래에서 위로, 반전)
      this.indicatorX = (this.hsb[1] / 100) * canvas.clientWidth;
      this.indicatorY = (1 - this.hsb[2] / 100) * canvas.clientHeight;
    }
  }

  private updateOpacityGradient() {
    this.opacityGradient = `linear-gradient(to right, rgba(${this.rgb.join(', ')}, 0), rgb(${this.rgb.join(', ')}))`;
  }

  private emitColorChange() {
    this.isUpdatingInternally = true;
    let formattedValue: string;

    if (this.format === 'hex') {
      formattedValue = rgbToHex(this.rgb[0], this.rgb[1], this.rgb[2]);
    } else if (this.format === 'rgb') {
      formattedValue = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
    } else { // hsb
      const [h, s, b] = this.hsb;
      formattedValue = `hsb(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(b)}%)`;
    }

    this.dispatchEvent(new CustomEvent('color-change', {
      detail: {
        value: formattedValue,
        opacity: this.opacity,
        format: this.format
      },
      bubbles: true,
      composed: true
    }));
  }
}