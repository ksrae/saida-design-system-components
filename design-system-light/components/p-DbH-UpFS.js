import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$9 } from './p-Dzzv4fG9.js';
import { d as defineCustomElement$8 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$7 } from './p-BYla455P.js';
import { d as defineCustomElement$6 } from './p-CDQjLY4A.js';
import { d as defineCustomElement$5 } from './p-Dt2pN6ep.js';
import { d as defineCustomElement$4 } from './p-D9IyzZp_.js';
import { d as defineCustomElement$3 } from './p-Dx2eAEw1.js';
import { d as defineCustomElement$2 } from './p-Bd6oegtc.js';
import { d as defineCustomElement$1 } from './p-C0DM0GPD.js';

// Color utility functions for colorpicker component
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [0, 0, 0];
}
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}
function rgbToHsb(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
        if (max === r) {
            h = ((g - b) / delta) % 6;
        }
        else if (max === g) {
            h = (b - r) / delta + 2;
        }
        else {
            h = (r - g) / delta + 4;
        }
        h = Math.round(h * 60);
        if (h < 0)
            h += 360;
    }
    const s = max === 0 ? 0 : (delta / max) * 100;
    const v = max * 100;
    return [h, s, v];
}
function hsbToRgb(h, s, b) {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)];
}
function isValidFormat(value, format) {
    if (format === 'hex') {
        return /^#[0-9A-Fa-f]{6}$/.test(value);
    }
    else if (format === 'rgb') {
        return /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(value);
    }
    else if (format === 'hsb') {
        return /^hsb\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(value);
    }
    return false;
}

const syColorpickerContentCss = ".sc-sy-colorpicker-content-h{display:block}.sc-sy-colorpicker-content-h .picker-content.sc-sy-colorpicker-content{display:flex;color:var(--color-picker-trigger-container-text-enabled);background-color:var(--color-picker-panel-container-background-enabled);border-radius:var(--border-radius-small);gap:var(--spacing-xsmall, 8px);flex-direction:column;align-items:center;user-select:none}.sc-sy-colorpicker-content-h .canvas-wrapper.sc-sy-colorpicker-content{position:relative;cursor:crosshair;width:314px;height:152px;box-sizing:border-box}.sc-sy-colorpicker-content-h .canvas-wrapper.sc-sy-colorpicker-content canvas.sc-sy-colorpicker-content{border:1px solid var(--color-picker-panel-color-area-border-enabled);border-radius:var(--border-radius-small);width:100%;height:100%;box-sizing:border-box}.sc-sy-colorpicker-content-h .canvas-wrapper.disabled.sc-sy-colorpicker-content{cursor:not-allowed;opacity:0.6;pointer-events:none}.sc-sy-colorpicker-content-h .canvas-wrapper.disabled.sc-sy-colorpicker-content canvas.sc-sy-colorpicker-content{border-color:var(--color-picker-panel-color-area-border-disabled, #ddd)}.sc-sy-colorpicker-content-h .color-picker-group.sc-sy-colorpicker-content{display:flex;flex-direction:row;gap:var(--spacing-xsmall);width:314px}.sc-sy-colorpicker-content-h .color-picker-group.sc-sy-colorpicker-content .color-range-area.sc-sy-colorpicker-content{display:flex;align-items:center;flex-direction:column;justify-content:center;gap:var(--spacing-xsmall);flex:1}.sc-sy-colorpicker-content-h .color-picker-group.sc-sy-colorpicker-content .color-disaplay-area.sc-sy-colorpicker-content{display:flex;align-items:center}.sc-sy-colorpicker-content-h .color-picker-group.sc-sy-colorpicker-content .color-display-area.sc-sy-colorpicker-content{display:flex;align-items:center;position:relative}.sc-sy-colorpicker-content-h canvas.sc-sy-colorpicker-content{border:none;display:block}.sc-sy-colorpicker-content-h .indicator.sc-sy-colorpicker-content{position:absolute;width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:var(--box-shadow);pointer-events:none;transform:translate(-50%, -50%)}.sc-sy-colorpicker-content-h .slider.sc-sy-colorpicker-content{width:100%;-webkit-appearance:none;appearance:none;height:10px;margin:0px;width:100%}.sc-sy-colorpicker-content-h .color-slider.sc-sy-colorpicker-content{border-radius:var(--border-radius-large);background:linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);box-shadow:0 0 0 1px var(--color-picker-panel-sliders-slider-border-enabled) inset}.sc-sy-colorpicker-content-h .opacity-slider.sc-sy-colorpicker-content{border-radius:var(--border-radius-large);box-shadow:0 0 0 1px var(--color-picker-panel-sliders-slider-border-enabled) inset;background-size:100% 100%}.sc-sy-colorpicker-content-h .slider.sc-sy-colorpicker-content::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;position:relative;width:14px;height:14px;box-sizing:border-box;border:1px solid var(--color-picker-trigger-container-border-enabled);box-shadow:0 0 0 2px white inset;background-color:transparent;border-radius:50%;cursor:pointer}.sc-sy-colorpicker-content-h .slider.sc-sy-colorpicker-content::-moz-range-thumb{appearance:none;position:relative;width:14px;height:14px;box-sizing:border-box;border:1px solid var(--color-picker-trigger-container-border-enabled);box-shadow:0 0 0 2px white inset;background-color:transparent;border-radius:50%;cursor:pointer}.sc-sy-colorpicker-content-h .color-form.sc-sy-colorpicker-content{display:flex;width:314px;gap:4px;position:relative}.sc-sy-colorpicker-content-h .color-display.sc-sy-colorpicker-content{width:28px;height:28px;border-radius:var(--border-radius-small)}.sc-sy-colorpicker-content-h .color-display-outline.sc-sy-colorpicker-content{border-radius:var(--border-radius-small);border:1px var(--color-picker-panel-sliders-preview-border-enabled) inset}.sc-sy-colorpicker-content-h .color-values.sc-sy-colorpicker-content{display:flex;flex-direction:row;align-items:center;flex:1;gap:4px}.sc-sy-colorpicker-content-h .color-type.sc-sy-colorpicker-content{width:62px}.sc-sy-colorpicker-content-h .color-section.sc-sy-colorpicker-content{display:flex;flex-direction:column}.sc-sy-colorpicker-content-h .color-section.color-hex.sc-sy-colorpicker-content{flex:1}.sc-sy-colorpicker-content-h .color-section.color-hex.sc-sy-colorpicker-content .color-inputs.sc-sy-colorpicker-content sy-input.sc-sy-colorpicker-content{width:100%}.sc-sy-colorpicker-content-h .color-section.color-rgb.sc-sy-colorpicker-content{flex:1}.sc-sy-colorpicker-content-h .color-section.color-rgb.sc-sy-colorpicker-content .color-inputs.sc-sy-colorpicker-content sy-input-number.sc-sy-colorpicker-content{width:59px}.sc-sy-colorpicker-content-h .color-section.color-hsb.sc-sy-colorpicker-content{flex:1}.sc-sy-colorpicker-content-h .color-section.color-hsb.sc-sy-colorpicker-content .color-inputs.sc-sy-colorpicker-content sy-input-number.sc-sy-colorpicker-content{width:59px}.sc-sy-colorpicker-content-h .color-section.color-opacity.sc-sy-colorpicker-content sy-input-number.sc-sy-colorpicker-content{width:63px}.sc-sy-colorpicker-content-h .color-inputs.sc-sy-colorpicker-content{display:flex;gap:2px;flex:1;align-items:center}.sc-sy-colorpicker-content-h .canvas-container.sc-sy-colorpicker-content{display:flex;flex-direction:row;align-items:center;align-items:start}.sc-sy-colorpicker-content-h .vertical-slider-container.sc-sy-colorpicker-content{display:none;position:relative;height:150px;width:15px;margin-right:8px;box-sizing:border-box}.sc-sy-colorpicker-content-h .rgb-footer.sc-sy-colorpicker-content{display:none}sy-colorpicker-content[disabled].sc-sy-colorpicker-content-h .slider.sc-sy-colorpicker-content::-webkit-slider-thumb,sy-colorpicker-content[disabled].sc-sy-colorpicker-content-h .slider.sc-sy-colorpicker-content::-moz-range-thumb{cursor:auto}";

const SyColorpickerContent = /*@__PURE__*/ proxyCustomElement(class SyColorpickerContent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.colorChange = createEvent(this, "colorChange");
    }
    get host() { return this; }
    value = '#ff0000';
    opacity = 1;
    // Fix typo: attribute spec was `hodeOpacity` — corrected to `hideOpacity`.
    hideOpacity = false;
    format = 'hex';
    disabled = false;
    readonly = false;
    hue = 0;
    indicatorX = 0;
    indicatorY = 0;
    rgb = [255, 0, 0];
    hsb = [0, 100, 100];
    colorChange;
    isUpdatingInternally = false;
    boundSyncCanvasSize;
    canvasListenerAdded = false;
    canvasMouseDownHandler = (event) => this.handleCanvasMouseDown(event);
    canvasMouseMoveHandler = (event) => this.updateColorFromCanvasPosition(event);
    canvasMouseUpHandler = () => {
        document.removeEventListener('mousemove', this.canvasMouseMoveHandler);
        document.removeEventListener('mouseup', this.canvasMouseUpHandler);
    };
    setupCanvasListener() {
        const canvas = this.host.querySelector('#colorCanvas');
        if (canvas && !this.canvasListenerAdded) {
            canvas.addEventListener('mousedown', this.canvasMouseDownHandler);
            this.canvasListenerAdded = true;
        }
        else if (!canvas) {
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
            const selectEl = this.host.querySelector('sy-select');
            if (selectEl && this.format) {
                selectEl.defaultValue = this.format;
            }
            else {
                console.log('❌ Select element not found or format is empty');
            }
        });
        // requestAnimationFrame으로 감싸서 렌더링 후 실행
        requestAnimationFrame(() => {
            const updatePosition = () => {
                const canvas = this.host.querySelector('#colorCanvas');
                if (canvas && canvas.clientWidth > 0 && canvas.clientHeight > 0) {
                    this.updateIndicatorPosition();
                }
                else {
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
        const canvas = this.host.querySelector('#colorCanvas');
        if (canvas) {
            canvas.removeEventListener('mousedown', this.canvasMouseDownHandler);
        }
        document.removeEventListener('mouseup', this.canvasMouseUpHandler);
        document.removeEventListener('mousemove', this.canvasMouseMoveHandler);
        this.canvasListenerAdded = false;
    }
    watchValue(newValue, oldValue) {
        if (!this.isUpdatingInternally && newValue !== oldValue) {
            requestAnimationFrame(() => {
                this.syncStateFromValue();
            });
        }
        this.isUpdatingInternally = false;
    }
    watchFormat(newValue, oldValue) {
        if (!this.isUpdatingInternally && newValue !== oldValue) {
            requestAnimationFrame(() => {
                this.syncStateFromValue();
                // Select 컴포넌트도 업데이트
                const selectEl = this.host.querySelector('sy-select');
                if (selectEl) {
                    selectEl.defaultValue = newValue;
                }
            });
        }
        this.isUpdatingInternally = false;
    }
    syncStateFromValue() {
        let newRgb = [255, 0, 0];
        let newHsb = [0, 100, 100];
        if (isValidFormat(this.value, this.format)) {
            if (this.format === 'hex') {
                newRgb = hexToRgb(this.value);
                newHsb = rgbToHsb(...newRgb);
            }
            else if (this.format === 'rgb') {
                const match = this.value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
                if (match) {
                    newRgb = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
                    newHsb = rgbToHsb(...newRgb);
                }
            }
            else if (this.format === 'hsb') {
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
    syncCanvasSize() {
        const canvas = this.host.querySelector('#colorCanvas');
        if (canvas) {
            const wrapper = this.host.querySelector('.canvas-wrapper');
            if (wrapper) {
                const width = wrapper.clientWidth || 244;
                const height = wrapper.clientHeight || 152;
                if (canvas.width !== width)
                    canvas.width = width;
                if (canvas.height !== height)
                    canvas.height = height;
                this.renderCanvas(this.hue);
                this.updateIndicatorPosition();
            }
        }
    }
    renderCanvas(hue) {
        const canvas = this.host.querySelector('#colorCanvas');
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
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
    handleCanvasMouseDown(event) {
        if (this.disabled || this.readonly)
            return;
        this.updateColorFromCanvasPosition(event);
        document.addEventListener('mousemove', this.canvasMouseMoveHandler);
        document.addEventListener('mouseup', this.canvasMouseUpHandler);
    }
    updateColorFromCanvasPosition(event) {
        if (this.disabled || this.readonly)
            return;
        const canvas = this.host.querySelector('#colorCanvas');
        if (!canvas)
            return;
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
    handleHueSlider = (event) => {
        if (this.disabled || this.readonly)
            return;
        const newHue = parseInt(event.target.value, 10);
        const [, s, b] = this.hsb;
        this.updateHsbState(newHue, s, b);
    };
    handleOpacitySlider = (event) => {
        if (this.disabled || this.readonly)
            return;
        this.opacity = parseFloat(event.target.value);
        this.emitColorChange();
    };
    handleOpacityInput = (e) => {
        if (this.disabled || this.readonly)
            return;
        const value = e.detail.value !== undefined ? Number(e.detail.value) : 1;
        this.opacity = Math.max(0, Math.min(1, value));
        this.emitColorChange();
    };
    handleFormatChange = (e) => {
        if (this.disabled || this.readonly)
            return;
        if (e.detail.selectedOptions && e.detail.selectedOptions.length > 0) {
            this.format = e.detail.selectedOptions[0].value;
            this.emitColorChange();
        }
    };
    handleHexInput = (e) => {
        if (this.disabled || this.readonly)
            return;
        const hex = e.detail.value;
        if (isValidFormat(hex, 'hex')) {
            this.updateRgbState(...hexToRgb(hex));
        }
    };
    handleRgbInput = (e, component) => {
        if (this.disabled || this.readonly)
            return;
        const value = e.detail.value !== undefined ? Number(e.detail.value) : 0;
        let [r, g, b] = this.rgb;
        if (component === 'r')
            r = value;
        if (component === 'g')
            g = value;
        if (component === 'b')
            b = value;
        this.updateRgbState(r, g, b);
    };
    handleHsbInput = (e, component) => {
        if (this.disabled || this.readonly)
            return;
        const value = e.detail.value !== undefined ? Number(e.detail.value) : 0;
        let [h, s, b] = this.hsb;
        if (component === 'h')
            h = value;
        if (component === 's')
            s = value;
        if (component === 'b')
            b = value;
        this.updateHsbState(h, s, b);
    };
    updateRgbState(r, g, b) {
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
    updateHsbState(h, s, b) {
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
    updateIndicatorPosition() {
        const canvas = this.host.querySelector('#colorCanvas');
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
    getOpacityGradient() {
        return `linear-gradient(to right, rgba(${this.rgb.join(', ')}, 0), rgb(${this.rgb.join(', ')}))`;
    }
    emitColorChange() {
        this.isUpdatingInternally = true;
        let formattedValue;
        if (this.format === 'hex') {
            formattedValue = rgbToHex(this.rgb[0], this.rgb[1], this.rgb[2]);
        }
        else if (this.format === 'rgb') {
            formattedValue = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
        }
        else {
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
        return (h("div", { key: '1ec8aaa78070a1e69912d7c44c2b7716264755e0', class: "picker-content" }, h("div", { key: 'f5fbccb585e16f5382034e4a6712424fccabb82c', class: "canvas-container" }, h("div", { key: '626b768d798412d7d177ae8a44088bf651d90f47', class: "vertical-slider-container" }, h("input", { key: 'f6a3202081a02bd43b95803f8b9b674b573e81e5', type: "range", min: "0", max: "359", value: String(this.hue), disabled: this.disabled || this.readonly, style: { opacity: this.disabled || this.readonly ? '0.5' : '1' }, onInput: this.handleHueSlider, class: "vertical-slider" })), h("div", { key: '46c13a24f4c0c4c47d11666d0027d4935a09f6ac', class: `canvas-wrapper ${this.disabled || this.readonly ? 'disabled' : ''}` }, h("canvas", { key: '44cc3eeab77e5854abd5ade276f7ec086a8333d7', id: "colorCanvas", width: "300", height: "152" }), h("div", { key: '02edc5562dee6db09ff1c1007b0b389c388b8578', class: "indicator", style: {
                top: `${this.indicatorY}px`,
                left: `${this.indicatorX}px`,
                backgroundColor: displayHex
            } }))), h("div", { key: '7b991093710281df024231c34efe8bfe394b8344', class: "color-picker-group" }, h("div", { key: 'e03881062a0c02157f5c004d4b4cf6f90c1f0788', class: "color-range-area" }, h("input", { key: 'cae992d56398c3af99b155af7c379b90964b8275', type: "range", min: "0", max: "359", value: String(this.hue), disabled: this.disabled || this.readonly, style: { opacity: this.disabled || this.readonly ? '0.5' : '1' }, onInput: this.handleHueSlider, class: "slider color-slider" }), !this.hideOpacity && (h("input", { key: '311c1da085e31d98f2e63528e1c0fba51cf553de', type: "range", min: "0", max: "1", step: "0.01", value: String(this.opacity), disabled: this.disabled || this.readonly, onInput: this.handleOpacitySlider, class: "slider opacity-slider", style: {
                opacity: this.disabled || this.readonly ? '0.5' : '1',
                background: this.getOpacityGradient()
            } }))), h("div", { key: '30eb6576cd49f2be594ec420d6ce1dd47ebdbb2e', class: "color-display-area" }, h("div", { key: '8569522ea2929539d96c4c0dbb925ba8c0830450', class: "color-display-outline" }, h("div", { key: '7c0dc05a4d5a992a8fb8742a05e442658ac618c6', class: "color-display", style: {
                backgroundColor: displayHex,
                opacity: this.disabled || this.readonly ? '0.5' : String(this.opacity)
            } })))), h("div", { key: 'd056c356c470640ef49a3d237d8d360fe2f76540', class: "color-form" }, h("sy-select", { key: 'dea2b1e5e7617daae6f6931f8d5d1e7c5d99e8a4', disabled: this.disabled, readonly: this.readonly, size: "small", class: "color-type", "default-value": this.format || 'hex', onSelected: this.handleFormatChange }, h("sy-option", { key: 'd0a8048a836d0cb34c30af5e6bb445a569aeda7e', value: "hex", label: "HEX" }), h("sy-option", { key: '2209a734b7dc3f7fcdb4c997921c6c26a210f7ab', value: "rgb", label: "RGB" }), h("sy-option", { key: 'aed37a6ebf2907126bda4cbd8d3fc54a189ee914', value: "hsb", label: "HSB" })), h("div", { key: '8ecc15dea5ea7472c013d924344b296e265c7da7', class: "color-values" }, this.format === 'hex' && (h("div", { key: '72bfa07ece3a2bc99e57d503adcf7eb76a092d6f', class: "color-section color-hex" }, h("div", { key: '784eab611a1f9c3e22c93ec4e5055f166d4a9b55', class: "color-inputs" }, h("sy-input", { key: '1c6498562d36f03152232ed12c9f624b4a4d262a', size: "small", max: 7, value: displayHex, onChanged: this.handleHexInput, disabled: this.disabled, readonly: this.readonly })))), this.format === 'rgb' && (h("div", { key: 'd031c01651bef58cfe9ad1192473b0dcad39a396', class: "color-section color-rgb" }, h("div", { key: '638519d6c7392e4cc900337e3807fb0fd38c5d9c', class: "color-inputs" }, h("sy-input-number", { key: '74c813b40c0e062de9337ab79a685c8df6978161', size: "small", min: 0, max: 255, value: this.rgb[0], onChanged: (e) => this.handleRgbInput(e, 'r'), disabled: this.disabled, readonly: this.readonly }), h("sy-input-number", { key: 'e425d1fa9c6574ba403391a24937917a8d389542', size: "small", min: 0, max: 255, value: this.rgb[1], onChanged: (e) => this.handleRgbInput(e, 'g'), disabled: this.disabled, readonly: this.readonly }), h("sy-input-number", { key: '6fff7cec642002053df25719233c22c97fd377e5', size: "small", min: 0, max: 255, value: this.rgb[2], onChanged: (e) => this.handleRgbInput(e, 'b'), disabled: this.disabled, readonly: this.readonly })))), this.format === 'hsb' && (h("div", { key: '5f076481b7ddff41865de6f6fff4ab3a21c1123a', class: "color-section color-hsb" }, h("div", { key: 'b50145ffbed2abfceb5db032f6993bb35a35860b', class: "color-inputs" }, h("sy-input-number", { key: '56ecee1c62a768ab7377d740cc2c273e02041b1b', size: "small", min: 0, max: 360, value: Math.round(this.hsb[0]), onChanged: (e) => this.handleHsbInput(e, 'h'), disabled: this.disabled, readonly: this.readonly }), h("sy-input-number", { key: '417609f07528d63816d9c8594fd5f7912d6ea754', size: "small", min: 0, max: 100, value: Math.round(this.hsb[1]), onChanged: (e) => this.handleHsbInput(e, 's'), disabled: this.disabled, readonly: this.readonly }), h("sy-input-number", { key: '09541b4b2187a173a8d440ffbf8ed3c8cbb87156', size: "small", min: 0, max: 100, value: Math.round(this.hsb[2]), onChanged: (e) => this.handleHsbInput(e, 'b'), disabled: this.disabled, readonly: this.readonly })))), !this.hideOpacity && (h("div", { key: '485c4af468c2c1651654dcfc9cc6212817f096f0', class: "color-section color-opacity" }, h("sy-input-number", { key: 'c02ee280b1b2136b6d5e4d4e8cb0fe7cf3cb6c4f', size: "small", min: 0, max: 1, step: 0.01, disabled: this.disabled, readonly: this.readonly, value: this.opacity, onChanged: this.handleOpacityInput }))))), h("div", { key: '819cdd95734c0425f33da35afbb836b9dcff987a', class: "rgb-footer" }, this.format === 'hex' ? `HEX: ${displayHex}` :
            this.format === 'rgb' ? `RGB: ${displayRgb}` :
                `HSB: ${displayHsb}`, !this.hideOpacity && ` / Opacity: ${this.opacity}`)));
    }
    static get watchers() { return {
        "value": ["watchValue"],
        "format": ["watchFormat"]
    }; }
    static get style() { return syColorpickerContentCss; }
}, [258, "sy-colorpicker-content", {
        "value": [1],
        "opacity": [1026],
        "hideOpacity": [4, "hideopacity"],
        "format": [1025],
        "disabled": [4],
        "readonly": [4],
        "hue": [32],
        "indicatorX": [32],
        "indicatorY": [32],
        "rgb": [32],
        "hsb": [32]
    }, undefined, {
        "value": ["watchValue"],
        "format": ["watchFormat"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-colorpicker-content", "sy-empty", "sy-icon", "sy-input", "sy-input-number", "sy-option", "sy-select", "sy-spinner", "sy-tag", "sy-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-colorpicker-content":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyColorpickerContent);
            }
            break;
        case "sy-empty":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "sy-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "sy-input-number":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-tag":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyColorpickerContent as S, hsbToRgb as a, defineCustomElement as d, hexToRgb as h, isValidFormat as i, rgbToHsb as r };
