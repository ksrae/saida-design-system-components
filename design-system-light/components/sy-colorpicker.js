import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { h as hexToRgb, r as rgbToHsb, a as hsbToRgb, i as isValidFormat, d as defineCustomElement$c } from './p-DbH-UpFS.js';
import { d as defineCustomElement$b } from './p-Dzzv4fG9.js';
import { d as defineCustomElement$a } from './p-DA_POXvZ.js';
import { d as defineCustomElement$9 } from './p-BYla455P.js';
import { d as defineCustomElement$8 } from './p-CDQjLY4A.js';
import { d as defineCustomElement$7 } from './p-Dt2pN6ep.js';
import { d as defineCustomElement$6 } from './p-CvUaUS4Z.js';
import { d as defineCustomElement$5 } from './p-D9IyzZp_.js';
import { d as defineCustomElement$4 } from './p-Dx2eAEw1.js';
import { d as defineCustomElement$3 } from './p-Bd6oegtc.js';
import { d as defineCustomElement$2 } from './p-C0DM0GPD.js';

const syColorpickerCss = ".sc-sy-colorpicker-h{width:auto;height:auto;display:inline-flex}.sc-sy-colorpicker-h .color-picker-button.sc-sy-colorpicker{background:var(--color-picker-trigger-container-background-enabled, #ffffff);border-radius:var(--border-radius-small, 2px);border:1px solid var(--color-picker-panel-sliders-preview-border-enabled);padding:var(--spacing-3xsmall, 4px);display:flex;gap:var(--spacing-3xsmall, 4px);align-items:center}.sc-sy-colorpicker-h .color-picker-button.sc-sy-colorpicker:hover{border:1px solid var(--color-picker-trigger-container-border-hover)}.sc-sy-colorpicker-h .color-picker-button.sc-sy-colorpicker:focus{border:1px solid var(--color-picker-trigger-container-border-focus);outline:var(--border-small) var(--button-primary-border-focus)}.sc-sy-colorpicker-h .color-picker-button[disabled].sc-sy-colorpicker{color:var(--color-picker-trigger-container-text-disabled);border:1px solid var(--color-picker-trigger-container-border-disabled);background-color:var(--color-picker-trigger-container-background-disabled)}.sc-sy-colorpicker-h .color-picker-button[disabled].sc-sy-colorpicker:focus{border:1px solid var(--color-picker-panel-sliders-preview-border-enabled);outline:none}.sc-sy-colorpicker-h .color-picker-button[disabled].sc-sy-colorpicker .color-preview.sc-sy-colorpicker{cursor:auto}.sc-sy-colorpicker-h .color-picker-button[readonly].sc-sy-colorpicker{border:1px solid var(--color-picker-trigger-container-border-readonly);background-color:var(--color-picker-trigger-container-background-readonly)}.sc-sy-colorpicker-h .color-preview.sc-sy-colorpicker{width:24px;height:24px;border-radius:var(--border-radius-small, 2px);cursor:pointer}.sc-sy-colorpicker-h .color-picker-container.sc-sy-colorpicker{background-color:var(--color-picker-panel-color-area-background-enabled);border-radius:4px;box-shadow:var(--box-shadow)}.sc-sy-colorpicker-h .inline-container.sc-sy-colorpicker{display:inline-block;width:100%;padding:0;margin:0;border:none}.sc-sy-colorpicker-h .color-text.sc-sy-colorpicker{display:flex;align-items:center}";

const SyColorpicker$1 = /*@__PURE__*/ proxyCustomElement(class SyColorpicker extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
    }
    get host() { return this; }
    // --- Public Properties (spec: color_picker_apis) ---
    value = '#ff0000';
    opacity = 1;
    showText = false;
    disabled = false;
    readonly = false;
    inline = false;
    /** Hide the alpha/opacity slider. Alias of the spec name `hideAlpha`. */
    hideOpacity = false;
    /** Current color format. Accepts uppercase (spec) or lowercase (legacy code) — normalised internally. */
    format = 'hex';
    // --- Private State ---
    defaultColor = '#ff0000';
    displayColor = '';
    formattedValue = '';
    hasFocus = false;
    isPanelOpen = false;
    changed;
    // --- Lifecycle ---
    componentWillLoad() {
        // Legacy/spec attribute aliases resolved manually since they're kebab-case mirrors
        // whose casing differs between spec and code.
        const hideAlphaAttr = fnAssignPropFromAlias(this.host, 'hide-alpha', 'hideAlpha');
        if (hideAlphaAttr !== null && hideAlphaAttr !== undefined)
            this.hideOpacity = hideAlphaAttr;
        this.format = this.normaliseFormat(this.format);
        this.validateAndFormatValue();
    }
    disconnectedCallback() {
        const popover = this.host.querySelector('sy-popover');
        if (popover) {
            popover.setAttribute('open', 'false');
            popover.open = false;
        }
    }
    watchInlineOrHideOpacity() { }
    watchValue() {
        this.validateAndFormatValue();
    }
    watchFormat(newVal) {
        const normalised = this.normaliseFormat(newVal);
        if (normalised !== newVal) {
            this.format = normalised;
            return;
        }
        this.validateAndFormatValue();
    }
    // --- Helpers ---
    normaliseFormat(v) {
        const lower = (v || '').toLowerCase();
        if (lower === 'hex' || lower === 'rgb' || lower === 'hsb')
            return lower;
        return 'hex';
    }
    validateAndFormatValue() {
        const isValid = isValidFormat(this.value, this.format);
        if (!isValid) {
            if (this.format === 'hex') {
                this.value = this.defaultColor;
            }
            else if (this.format === 'rgb') {
                const rgb = hexToRgb(this.defaultColor);
                this.value = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            }
            else if (this.format === 'hsb') {
                const rgb = hexToRgb(this.defaultColor);
                const hsb = rgbToHsb(rgb[0], rgb[1], rgb[2]);
                this.value = `hsb(${Math.round(hsb[0])}, ${Math.round(hsb[1])}%, ${Math.round(hsb[2])}%)`;
            }
        }
        this.formattedValue = this.value;
        this.displayColor = this.getDisplayColor(this.value, this.format);
    }
    getDisplayColor(value, format) {
        if (format === 'hex')
            return value;
        if (format === 'rgb')
            return value;
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
    handleColorChange = (e) => {
        e.stopPropagation();
        const { value, opacity, format } = e.detail;
        if (format && format !== this.format)
            this.format = this.normaliseFormat(format);
        this.value = value;
        this.opacity = opacity;
        this.validateAndFormatValue();
        this.changed.emit({ value: this.value, format: this.format, opacity: this.opacity });
    };
    handleClick = (e) => { e.stopPropagation(); };
    handleFocus = () => { this.hasFocus = true; };
    handleBlur = () => { this.hasFocus = false; };
    handleKeydown = (e) => {
        if (this.disabled || this.readonly)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const popover = this.host.querySelector('sy-popover');
            if (popover)
                popover.open = !popover.open;
        }
    };
    // --- Render ---
    render() {
        if (this.inline) {
            return (h("div", { class: "content" }, h("sy-colorpicker-content", { disabled: this.disabled, readonly: this.readonly, value: this.formattedValue, opacity: this.opacity, hideOpacity: this.hideOpacity, format: this.format, onColorChange: this.handleColorChange })));
        }
        const interactive = !this.disabled && !this.readonly;
        return (h("div", { ...(this.disabled && { disabled: true }), ...(this.readonly && { readonly: true }), onClick: this.handleClick, onKeyDown: this.handleKeydown, tabindex: interactive ? 0 : -1, role: "button", "aria-haspopup": "dialog", "aria-expanded": this.isPanelOpen ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": `Color picker, current value ${this.formattedValue}`, onFocus: this.handleFocus, onBlur: this.handleBlur, class: { 'color-picker-button': true } }, h("div", { class: {
                'color-preview': true,
                'focused': this.hasFocus,
                'disabled': this.disabled,
                'readonly': !this.disabled && this.readonly,
            }, style: {
                backgroundColor: this.displayColor,
                opacity: String(this.opacity),
            } }), this.showText && h("span", { class: "color-text" }, this.formattedValue), h("sy-popover", { trigger: "click", position: "top", arrow: true }, h("div", { class: "color-picker-container" }, h("sy-colorpicker-content", { disabled: this.disabled, readonly: this.readonly, value: this.formattedValue, opacity: this.opacity, hideOpacity: this.hideOpacity, format: this.format, onColorChange: this.handleColorChange })))));
    }
    static get watchers() { return {
        "inline": ["watchInlineOrHideOpacity"],
        "hideOpacity": ["watchInlineOrHideOpacity"],
        "value": ["watchValue"],
        "format": ["watchFormat"]
    }; }
    static get style() { return syColorpickerCss; }
}, [258, "sy-colorpicker", {
        "value": [1025],
        "opacity": [1026],
        "showText": [4, "showtext"],
        "disabled": [516],
        "readonly": [516],
        "inline": [4],
        "hideOpacity": [1028, "hideopacity"],
        "format": [1025],
        "defaultColor": [32],
        "displayColor": [32],
        "formattedValue": [32],
        "hasFocus": [32],
        "isPanelOpen": [32]
    }, undefined, {
        "inline": ["watchInlineOrHideOpacity"],
        "hideOpacity": ["watchInlineOrHideOpacity"],
        "value": ["watchValue"],
        "format": ["watchFormat"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-colorpicker", "sy-colorpicker-content", "sy-empty", "sy-icon", "sy-input", "sy-input-number", "sy-option", "sy-popover", "sy-select", "sy-spinner", "sy-tag", "sy-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-colorpicker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyColorpicker$1);
            }
            break;
        case "sy-colorpicker-content":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "sy-empty":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "sy-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "sy-input-number":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "sy-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "sy-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-tag":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyColorpicker = SyColorpicker$1;
const defineCustomElement = defineCustomElement$1;

export { SyColorpicker, defineCustomElement };
