import { Component, Prop, State, Element, h, Watch, Event, EventEmitter } from '@stencil/core';
import { hexToRgb, rgbToHex, rgbToHsb, hsbToRgb, isValidFormat } from './color-utils';

@Component({
  tag: 'sy-colorpicker-content',
  styleUrl: 'sy-colorpicker-content.scss',
  scoped: true,
  shadow: false,
})
export class SyColorpickerContent {
  @Element() host!: HTMLSyColorpickerContentElement;

  @Prop() value: string = '#ff0000';
  @Prop({ mutable: true }) opacity: number = 1;
  // Fix typo: attribute spec was `hodeOpacity` — corrected to `hideOpacity`.
  @Prop({ attribute: 'hideOpacity' }) hideOpacity: boolean = false;
  @Prop({ mutable: true }) format: 'hex' | 'rgb' | 'hsb' = 'hex';
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;

  @State() private hue: number = 0;
  @State() private indicatorX: number = 0;
  @State() private indicatorY: number = 0;
  @State() private rgb: [number, number, number] = [255, 0, 0];
  @State() private hsb: [number, number, number] = [0, 100, 100];

  @Event() colorChange!: EventEmitter<{ value: string; opacity: number; format: string }>;

  private isUpdatingInternally = false;
  private boundSyncCanvasSize?: () => void;
  private canvasListenerAdded: boolean = false;
  private canvasMouseDownHandler = (event: MouseEvent) => this.handleCanvasMouseDown(event);
  private canvasMouseMoveHandler = (event: MouseEvent) => this.updateColorFromCanvasPosition(event);
  private canvasMouseUpHandler = () => {
    document.removeEventListener('mousemove', this.canvasMouseMoveHandler);
    document.removeEventListener('mouseup', this.canvasMouseUpHandler);
  };

  private setupCanvasListener() {
    const canvas = this.host.querySelector('#colorCanvas') as HTMLCanvasElement;

    if (canvas && !this.canvasListenerAdded) {
      canvas.addEventListener('mousedown', this.canvasMouseDownHandler);
      this.canvasListenerAdded = true;
    } else if (!canvas) {
      this.canvasListenerAdded = false;
    }
  }

  connectedCallback() {
    // format 기본값 보장
    if (!this.format) {
      this.format = 'hex';
    }

    this.syncStateFromValue();
  }

  componentDidLoad() {
    this.boundSyncCanvasSize = this.syncCanvasSize.bind(this);
    this.syncCanvasSize();
    window.addEventListener('resize', this.boundSyncCanvasSize);

    this.setupCanvasListener();

    // Select 컴포넌트의 defaultValue가 제대로 적용되도록 강제 업데이트
    requestAnimationFrame(() => {
      const selectEl = this.host.querySelector('sy-select') as any;
      if (selectEl && this.format) {
        selectEl.defaultValue = this.format;
      } else {
        console.log('❌ Select element not found or format is empty');
      }
    });

    // requestAnimationFrame으로 감싸서 렌더링 후 실행
    requestAnimationFrame(() => {
      const updatePosition = () => {
        const canvas = this.host.querySelector('#colorCanvas') as HTMLCanvasElement;
        if (canvas && canvas.clientWidth > 0 && canvas.clientHeight > 0) {
          this.updateIndicatorPosition();
        } else {
          requestAnimationFrame(updatePosition);
        }
      };
      updatePosition();
    });
  }

  componentDidUpdate() {
    // requestAnimationFrame으로 렌더링 사이클 완전히 벗어나기
    requestAnimationFrame(() => {
      this.renderCanvas(this.hue);
      this.updateIndicatorPosition();
    });

    // Popover로 인해 DOM이 이동될 수 있으므로 매번 체크
    this.setupCanvasListener();
  }

  disconnectedCallback() {
    if (this.boundSyncCanvasSize) {
      window.removeEventListener('resize', this.boundSyncCanvasSize);
    }
    const canvas = this.host.querySelector('#colorCanvas') as HTMLCanvasElement;
    if (canvas) {
      canvas.removeEventListener('mousedown', this.canvasMouseDownHandler);
    }
    document.removeEventListener('mouseup', this.canvasMouseUpHandler);
    document.removeEventListener('mousemove', this.canvasMouseMoveHandler);
    this.canvasListenerAdded = false;
  }

  @Watch('value')
  watchValue(newValue: string, oldValue: string) {
    if (!this.isUpdatingInternally && newValue !== oldValue) {
      requestAnimationFrame(() => {
        this.syncStateFromValue();
      });
    }
    this.isUpdatingInternally = false;
  }

  @Watch('format')
  watchFormat(newValue: string, oldValue: string) {
    if (!this.isUpdatingInternally && newValue !== oldValue) {
      requestAnimationFrame(() => {
        this.syncStateFromValue();
        // Select 컴포넌트도 업데이트
        const selectEl = this.host.querySelector('sy-select') as any;

        if (selectEl) {
          selectEl.defaultValue = newValue;
        }
      });
    }
    this.isUpdatingInternally = false;
  }

  private syncStateFromValue() {
    let newRgb: [number, number, number] = [255, 0, 0];
    let newHsb: [number, number, number] = [0, 100, 100];

    if (isValidFormat(this.value, this.format)) {
      if (this.format === 'hex') {
        newRgb = hexToRgb(this.value);
        newHsb = rgbToHsb(...newRgb);
      } else if (this.format === 'rgb') {
        const match = this.value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (match) {
          newRgb = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
          newHsb = rgbToHsb(...newRgb);
        }
      } else if (this.format === 'hsb') {
        const match = this.value.match(/hsb\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
        if (match) {
          newHsb = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
          newRgb = hsbToRgb(...newHsb);
        }
      }
    }

    // 값이 실제로 변경되었을 때만 업데이트
    if (this.rgb[0] !== newRgb[0] || this.rgb[1] !== newRgb[1] || this.rgb[2] !== newRgb[2]) {
      this.rgb = newRgb;
    }
    if (this.hsb[0] !== newHsb[0] || this.hsb[1] !== newHsb[1] || this.hsb[2] !== newHsb[2]) {
      this.hsb = newHsb;
    }
    this.hue = this.hsb[0];
  }

  private syncCanvasSize() {
    const canvas = this.host.querySelector('#colorCanvas') as HTMLCanvasElement;
    if (canvas) {
      const wrapper = this.host.querySelector('.canvas-wrapper') as HTMLElement;
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

  private renderCanvas(hue: number) {
    const canvas = this.host.querySelector('#colorCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, width, height);

    const gradientH = ctx.createLinearGradient(0, 0, width, 0);
    gradientH.addColorStop(0, '#fff');
    gradientH.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradientH;
    ctx.fillRect(0, 0, width, height);

    const gradientV = ctx.createLinearGradient(0, 0, 0, height);
    gradientV.addColorStop(0, 'rgba(0,0,0,0)');
    gradientV.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gradientV;
    ctx.fillRect(0, 0, width, height);
  }

  private handleCanvasMouseDown(event: MouseEvent) {
    if (this.disabled || this.readonly) return;
    this.updateColorFromCanvasPosition(event);
    document.addEventListener('mousemove', this.canvasMouseMoveHandler);
    document.addEventListener('mouseup', this.canvasMouseUpHandler);
  }

  private updateColorFromCanvasPosition(event: MouseEvent) {
    if (this.disabled || this.readonly) return;

    const canvas = this.host.querySelector('#colorCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    x = Math.max(0, Math.min(x, canvas.clientWidth));
    y = Math.max(0, Math.min(y, canvas.clientHeight));

    const s = (x / canvas.clientWidth) * 100;
    const b = 100 - (y / canvas.clientHeight) * 100;

    // 먼저 indicator 위치 업데이트 (렌더링 트리거)
    this.indicatorX = x;
    this.indicatorY = y;

    // 그 다음 색상 상태 업데이트
    this.updateHsbState(this.hue, s, b);
  }

  private handleHueSlider = (event: Event) => {
    if (this.disabled || this.readonly) return;
    const newHue = parseInt((event.target as HTMLInputElement).value, 10);
    const [, s, b] = this.hsb;
    this.updateHsbState(newHue, s, b);
  };

  private handleOpacitySlider = (event: Event) => {
    if (this.disabled || this.readonly) return;
    this.opacity = parseFloat((event.target as HTMLInputElement).value);
    this.emitColorChange();
  };

  private handleOpacityInput = (e: CustomEvent) => {
    if (this.disabled || this.readonly) return;
    const value = e.detail.value !== undefined ? Number(e.detail.value) : 1;
    this.opacity = Math.max(0, Math.min(1, value));
    this.emitColorChange();
  };

  private handleFormatChange = (e: CustomEvent) => {
    if (this.disabled || this.readonly) return;
    if (e.detail.selectedOptions && e.detail.selectedOptions.length > 0) {
      this.format = e.detail.selectedOptions[0].value;
      this.emitColorChange();
    }
  };

  private handleHexInput = (e: CustomEvent) => {
    if (this.disabled || this.readonly) return;
    const hex = e.detail.value;
    if (isValidFormat(hex, 'hex')) {
      this.updateRgbState(...hexToRgb(hex));
    }
  };

  private handleRgbInput = (e: CustomEvent, component: 'r' | 'g' | 'b') => {
    if (this.disabled || this.readonly) return;
    const value = e.detail.value !== undefined ? Number(e.detail.value) : 0;
    let [r, g, b] = this.rgb;
    if (component === 'r') r = value;
    if (component === 'g') g = value;
    if (component === 'b') b = value;
    this.updateRgbState(r, g, b);
  };

  private handleHsbInput = (e: CustomEvent, component: 'h' | 's' | 'b') => {
    if (this.disabled || this.readonly) return;
    const value = e.detail.value !== undefined ? Number(e.detail.value) : 0;
    let [h, s, b] = this.hsb;
    if (component === 'h') h = value;
    if (component === 's') s = value;
    if (component === 'b') b = value;
    this.updateHsbState(h, s, b);
  };

  private updateRgbState(r: number, g: number, b: number) {
    const newR = Math.max(0, Math.min(255, Math.round(r)));
    const newG = Math.max(0, Math.min(255, Math.round(g)));
    const newB = Math.max(0, Math.min(255, Math.round(b)));

    // 값이 실제로 변경되었을 때만 업데이트
    if (this.rgb[0] !== newR || this.rgb[1] !== newG || this.rgb[2] !== newB) {
      this.rgb = [newR, newG, newB];
      this.hsb = rgbToHsb(...this.rgb);
      this.hue = this.hsb[0];
      this.emitColorChange();
    }
  }

  private updateHsbState(h: number, s: number, b: number) {
    const newH = Math.max(0, Math.min(360, Math.round(h)));
    const newS = Math.max(0, Math.min(100, Math.round(s * 100) / 100)); // 소수점 2자리
    const newB = Math.max(0, Math.min(100, Math.round(b * 100) / 100)); // 소수점 2자리

    // 값이 실제로 변경되었을 때만 업데이트 (작은 차이 무시)
    const threshold = 0.01;
    if (Math.abs(this.hsb[0] - newH) > threshold ||
        Math.abs(this.hsb[1] - newS) > threshold ||
        Math.abs(this.hsb[2] - newB) > threshold) {
      this.hsb = [newH, newS, newB];
      this.hue = this.hsb[0];
      this.rgb = hsbToRgb(...this.hsb);
      this.emitColorChange();
    }
  }

  private updateIndicatorPosition() {
    const canvas = this.host.querySelector('#colorCanvas') as HTMLCanvasElement;
    if (canvas && canvas.clientWidth > 0 && canvas.clientHeight > 0) {
      const newX = Math.round((this.hsb[1] / 100) * canvas.clientWidth * 100) / 100;
      const newY = Math.round((1 - this.hsb[2] / 100) * canvas.clientHeight * 100) / 100;

      // 값이 실제로 변경되었을 때만 업데이트 (0.1px 이하 차이 무시)
      if (Math.abs(this.indicatorX - newX) > 0.1) {
        this.indicatorX = newX;
      }
      if (Math.abs(this.indicatorY - newY) > 0.1) {
        this.indicatorY = newY;
      }
    }
  }

  private getOpacityGradient(): string {
    return `linear-gradient(to right, rgba(${this.rgb.join(', ')}, 0), rgb(${this.rgb.join(', ')}))`;
  }

  private emitColorChange() {
    this.isUpdatingInternally = true;
    let formattedValue: string;

    if (this.format === 'hex') {
      formattedValue = rgbToHex(this.rgb[0], this.rgb[1], this.rgb[2]);
    } else if (this.format === 'rgb') {
      formattedValue = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
    } else {
      const [h, s, b] = this.hsb;
      formattedValue = `hsb(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(b)}%)`;
    }

    this.colorChange.emit({
      value: formattedValue,
      opacity: this.opacity,
      format: this.format
    });
  }

  render() {
    const displayHex = rgbToHex(this.rgb[0], this.rgb[1], this.rgb[2]);
    const displayRgb = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
    const displayHsb = `hsb(${Math.round(this.hsb[0])}, ${Math.round(this.hsb[1])}%, ${Math.round(this.hsb[2])}%)`;

    return (
      <div class="picker-content">
        <div class="canvas-container">
          <div class="vertical-slider-container">
            <input
              type="range"
              min="0"
              max="359"
              value={String(this.hue)}
              disabled={this.disabled || this.readonly}
              style={{ opacity: this.disabled || this.readonly ? '0.5' : '1' }}
              onInput={this.handleHueSlider}
              class="vertical-slider"
            />
          </div>
          <div class={`canvas-wrapper ${this.disabled || this.readonly ? 'disabled' : ''}`}>
            <canvas id="colorCanvas" width="300" height="152"></canvas>
            <div
              class="indicator"
              style={{
                top: `${this.indicatorY}px`,
                left: `${this.indicatorX}px`,
                backgroundColor: displayHex
              }}
            ></div>
          </div>
        </div>
        <div class="color-picker-group">
          <div class="color-range-area">
            <input
              type="range"
              min="0"
              max="359"
              value={String(this.hue)}
              disabled={this.disabled || this.readonly}
              style={{ opacity: this.disabled || this.readonly ? '0.5' : '1' }}
              onInput={this.handleHueSlider}
              class="slider color-slider"
            />

            {!this.hideOpacity && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={String(this.opacity)}
                disabled={this.disabled || this.readonly}
                onInput={this.handleOpacitySlider}
                class="slider opacity-slider"
                style={{
                  opacity: this.disabled || this.readonly ? '0.5' : '1',
                  background: this.getOpacityGradient()
                }}
              />
            )}
          </div>
          <div class="color-display-area">
            <div class="color-display-outline">
              <div
                class="color-display"
                style={{
                  backgroundColor: displayHex,
                  opacity: this.disabled || this.readonly ? '0.5' : String(this.opacity)
                }}
              ></div>
            </div>
          </div>
        </div>
        <div class="color-form">
          <sy-select
            disabled={this.disabled}
            readonly={this.readonly}
            size="small"
            class="color-type"
            default-value={this.format || 'hex'}
            onSelected={this.handleFormatChange}
          >
            <sy-option value="hex" label="HEX"></sy-option>
            <sy-option value="rgb" label="RGB"></sy-option>
            <sy-option value="hsb" label="HSB"></sy-option>
          </sy-select>

          <div class="color-values">
            {this.format === 'hex' && (
              <div class="color-section color-hex">
                <div class="color-inputs">
                  <sy-input
                    size="small"
                    max={7}
                    value={displayHex}
                    onChanged={this.handleHexInput}
                    disabled={this.disabled}
                    readonly={this.readonly}
                  ></sy-input>
                </div>
              </div>
            )}

            {this.format === 'rgb' && (
              <div class="color-section color-rgb">
                <div class="color-inputs">
                  <sy-input-number
                    size="small"
                    min={0}
                    max={255}
                    value={this.rgb[0]}
                    onChanged={(e: CustomEvent) => this.handleRgbInput(e, 'r')}
                    disabled={this.disabled}
                    readonly={this.readonly}
                  ></sy-input-number>
                  <sy-input-number
                    size="small"
                    min={0}
                    max={255}
                    value={this.rgb[1]}
                    onChanged={(e: CustomEvent) => this.handleRgbInput(e, 'g')}
                    disabled={this.disabled}
                    readonly={this.readonly}
                  ></sy-input-number>
                  <sy-input-number
                    size="small"
                    min={0}
                    max={255}
                    value={this.rgb[2]}
                    onChanged={(e: CustomEvent) => this.handleRgbInput(e, 'b')}
                    disabled={this.disabled}
                    readonly={this.readonly}
                  ></sy-input-number>
                </div>
              </div>
            )}

            {this.format === 'hsb' && (
              <div class="color-section color-hsb">
                <div class="color-inputs">
                  <sy-input-number
                    size="small"
                    min={0}
                    max={360}
                    value={Math.round(this.hsb[0])}
                    onChanged={(e: CustomEvent) => this.handleHsbInput(e, 'h')}
                    disabled={this.disabled}
                    readonly={this.readonly}
                  ></sy-input-number>
                  <sy-input-number
                    size="small"
                    min={0}
                    max={100}
                    value={Math.round(this.hsb[1])}
                    onChanged={(e: CustomEvent) => this.handleHsbInput(e, 's')}
                    disabled={this.disabled}
                    readonly={this.readonly}
                  ></sy-input-number>
                  <sy-input-number
                    size="small"
                    min={0}
                    max={100}
                    value={Math.round(this.hsb[2])}
                    onChanged={(e: CustomEvent) => this.handleHsbInput(e, 'b')}
                    disabled={this.disabled}
                    readonly={this.readonly}
                  ></sy-input-number>
                </div>
              </div>
            )}

            {!this.hideOpacity && (
              <div class="color-section color-opacity">
                <sy-input-number
                  size="small"
                  min={0}
                  max={1}
                  step={0.01}
                  disabled={this.disabled}
                  readonly={this.readonly}
                  value={this.opacity}
                  onChanged={this.handleOpacityInput}
                ></sy-input-number>
              </div>
            )}
          </div>
        </div>
        <div class="rgb-footer">
          {this.format === 'hex' ? `HEX: ${displayHex}` :
            this.format === 'rgb' ? `RGB: ${displayRgb}` :
              `HSB: ${displayHsb}`}
          {!this.hideOpacity && ` / Opacity: ${this.opacity}`}
        </div>
      </div>
    );
  }
}
