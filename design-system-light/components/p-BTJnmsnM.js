import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syCheckboxCss = "@charset \"UTF-8\";sy-checkbox{position:relative;display:flex;flex-direction:column;}sy-checkbox .checkbox-wrapper{position:relative;display:flex;flex-direction:column;}sy-checkbox .error-container{width:100%;color:var(--required);font-size:0.85rem;margin-top:4px;box-sizing:border-box;display:none;}sy-checkbox .popup-error-container{position:absolute;top:0;left:0;right:0;margin-top:0;z-index:1;pointer-events:none;width:100%;height:100%}sy-checkbox slot[name=error]{display:block;width:100%;height:100%}sy-checkbox slot[name=error]>*{display:block;width:100%;height:100%}sy-checkbox .visible-error{display:block}sy-checkbox{display:inline-flex;align-self:center;flex-direction:column;vertical-align:middle;}sy-checkbox .checkbox-wrapper{display:inline-flex;align-items:center;}sy-checkbox .checkbox{display:inline-flex;justify-content:center;align-items:center;min-height:var(--component-small);cursor:var(--cursor-button);gap:var(--spacing-3xsmall)}sy-checkbox .checkbox sy-icon.checked,sy-checkbox .checkbox sy-icon.indeterminate{display:none}sy-checkbox .checkbox.readonly{cursor:auto}sy-checkbox .checkbox.readonly .checkbox-slot{color:var(--checkbox-unchecked-text-readonly)}sy-checkbox .checkbox.readonly:hover .checkbox-visual-label{border:var(--border-small) var(--checkbox-unchecked-border-readonly);cursor:auto}sy-checkbox .checkbox.readonly:focus .checkbox-visual-label{border:var(--border-small) var(--checkbox-unchecked-border-disabled) !important;outline:none !important}sy-checkbox .checkbox:hover .checkbox-visual-label{border:var(--border-small) var(--checkbox-unchecked-border-hover)}sy-checkbox .checkbox:focus .checkbox-visual-label{border:var(--border-small) var(--checkbox-unchecked-border-focus) !important;outline:var(--border-small) var(--checkbox-unchecked-border-focus) !important}sy-checkbox .checkbox input[type=checkbox]{display:none}sy-checkbox .checkbox .checkbox-visual-label{display:inline-flex;align-items:center;text-align:center;justify-content:center;box-sizing:border-box;width:16px;height:16px;border:var(--border-small) var(--checkbox-unchecked-border-enabled);position:relative;border-radius:var(--border-radius-medium);cursor:var(--cursor-button)}sy-checkbox .checkbox .checkbox-visual-label:hover{border:var(--border-small) var(--checkbox-unchecked-border-hover)}sy-checkbox .checkbox.checkbox--disabled{color:var(--checkbox-unchecked-text-disabled)}sy-checkbox .checkbox.checkbox--disabled:hover{cursor:auto}sy-checkbox .checkbox.checkbox--disabled:hover .checkbox-visual-label{border:var(--border-small) var(--checkbox-unchecked-border-disabled);cursor:auto}sy-checkbox .checkbox.checkbox--disabled .checkbox-visual-label:hover{border:var(--border-small) var(--checkbox-unchecked-border-disabled)}sy-checkbox .checkbox.checkbox--disabled .checkbox-visual-label:focus{outline:none}sy-checkbox .checkbox.readonly .checkbox-visual-label{background-color:var(--checkbox-unchecked-background-disabled)}sy-checkbox .checkbox.readonly .checkbox-visual-label:hover{background-color:var(--checkbox-checked-background-readonly);border:var(--border-small) var(--checkbox-checked-border-readonly);color:var(--checkbox-checked-icon-readonly);outline:none}sy-checkbox .checkbox .checkbox-slot{display:inline-flex;line-height:normal;align-items:center;flex:1}sy-checkbox .checkbox.checkbox--checked sy-icon.checked{display:inline-flex}sy-checkbox .checkbox.checkbox--checked .checkbox-visual-label{border:var(--border-small) var(--checkbox-checked-background-enabled);background-color:var(--checkbox-checked-background-enabled);color:var(--checkbox-checked-icon-enabled);position:relative;border-radius:var(--border-radius-medium)}sy-checkbox .checkbox.checkbox--checked .checkbox-visual-label:hover{border:var(--border-small) var(--checkbox-checked-border-hover)}sy-checkbox .checkbox.checkbox--checked.checkbox--disabled{color:var(--checkbox-unchecked-text-disabled)}sy-checkbox .checkbox.checkbox--checked.checkbox--disabled .checkbox-visual-label{background-color:var(--checkbox-checked-background-disabled);border:var(--border-small) var(--checkbox-checked-border-disabled);color:var(--checkbox-checked-icon-disabled);outline:none}sy-checkbox .checkbox.checkbox--checked.checkbox--disabled .checkbox-visual-label:hover{border:var(--border-small) var(--checkbox-checked-border-disabled)}sy-checkbox .checkbox.checkbox--checked.readonly{cursor:auto}sy-checkbox .checkbox.checkbox--checked.readonly .checkbox-visual-label{background-color:var(--checkbox-checked-background-readonly);border:var(--border-small) var(--checkbox-checked-border-readonly);color:var(--checkbox-checked-icon-readonly);outline:none;cursor:auto}sy-checkbox .checkbox.checkbox--checked.readonly .checkbox-visual-label:hover{background-color:var(--checkbox-unchecked-background-readonly);color:var(--checkbox-checked-icon-readonly)}sy-checkbox .checkbox.checkbox--indeterminate{}sy-checkbox .checkbox.checkbox--indeterminate sy-icon.indeterminate,sy-checkbox .checkbox.checkbox--indeterminate sy-icon.checked{display:none}sy-checkbox .checkbox.checkbox--indeterminate .checkbox-visual-label{background-color:var(--background-default);display:flex;align-items:center;justify-content:center}sy-checkbox .checkbox.checkbox--indeterminate .checkbox-visual-label::after{content:\"\";display:block;width:8px;height:8px;background-color:var(--checkbox-indeterminate-icon-enabled);border-radius:1px}sy-checkbox .checkbox.checkbox--indeterminate.checkbox--disabled{color:var(--checkbox-unchecked-text-disabled)}sy-checkbox .checkbox.checkbox--indeterminate.checkbox--disabled .checkbox-visual-label{background-color:var(--checkbox-checked-background-disabled);border:var(--border-small) var(--checkbox-checked-border-disabled);color:var(--checkbox-checked-icon-disabled)}sy-checkbox .checkbox.checkbox--indeterminate.checkbox--disabled .checkbox-visual-label:hover{border:var(--border-small) var(--checkbox-checked-border-disabled);cursor:auto}sy-checkbox .checkbox.checkbox--indeterminate.readonly .checkbox-visual-label{background-color:var(--checkbox-checked-background-disabled);border:var(--border-small) var(--checkbox-checked-border-disabled);color:var(--checkbox-checked-icon-disabled)}sy-checkbox .checkbox.checkbox--indeterminate.readonly .checkbox-visual-label:hover{background-color:var(--checkbox-unchecked-background-disabled);color:var(--checkbox-checked-icon-disabled)}sy-checkbox .checkbox--medium{font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px;align-items:center}sy-checkbox .checkbox-label{margin:var(--spacing-4xsmall)}sy-checkbox .checkbox-slot{padding-left:0px !important}";

const SyCheckbox = /*@__PURE__*/ proxyCustomElement(class SyCheckbox extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.focused = createEvent(this, "focused");
        this.blured = createEvent(this, "blured");
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    inputEl;
    labelEl;
    // --- Public Properties (spec: attributes) ---
    checkboxTitle = '';
    name = '';
    value = 'on';
    checked = false;
    disabled = false;
    indeterminate = false;
    readonly = false;
    required = false;
    noNativeValidity = false;
    // --- Private State ---
    hasFocus = false;
    isTree = false;
    renderIndeterminate = false;
    isValid = true;
    validStatus = '';
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    touched = false;
    formSubmitted = false;
    // --- Events (spec: api.events) ---
    changed;
    focused;
    blured;
    // --- Custom validity getters (mirroring ElementInternals; read via `(el as any).validity`) ---
    get validity() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return {
                badInput: false,
                customError: this.validStatus === 'custom' || this.hasSlotErrorMessage,
                patternMismatch: false,
                rangeOverflow: false,
                rangeUnderflow: false,
                stepMismatch: false,
                tooLong: false,
                tooShort: false,
                typeMismatch: false,
                valid: false,
                valueMissing: this.validStatus === 'valueMissing',
            };
        }
        return this.internals?.validity;
    }
    get validationMessage() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return this.getSlotErrorText() || this.getErrorMessage(this.validStatus);
        }
        return this.internals?.validationMessage;
    }
    get willValidate() {
        if (this.validStatus === 'custom' || this.hasSlotErrorMessage)
            return true;
        return this.internals?.willValidate;
    }
    // --- Lifecycle ---
    componentWillLoad() {
        this.renderIndeterminate = this.indeterminate;
        this.handleSlotChange();
        this.updateValidityState();
    }
    connectedCallback() {
        this.formSubmitListener();
        this.host.addEventListener('keydown', this.handleKeydown);
    }
    disconnectedCallback() {
        this.formSubmitListenerRemover();
        this.host.removeEventListener('keydown', this.handleKeydown);
    }
    componentDidRender() {
        if (this.inputEl) {
            this.inputEl.indeterminate = this.renderIndeterminate;
        }
    }
    // --- Form-associated callbacks ---
    formAssociatedCallback() { this.internals?.setFormValue(this.checked ? (this.value || 'on') : null); }
    formDisabledCallback(disabled) { this.disabled = disabled; }
    formResetCallback() {
        this.checked = false;
        this.indeterminate = false;
        this.touched = false;
        this.formSubmitted = false;
        if (!this.isValid && this.validStatus === 'custom') {
            this.validStatus = '';
            this.isValid = true;
        }
        this.setCheckedValidation();
    }
    formStateRestoreCallback(state) {
        this.checked = state === 'on' || state === this.value;
        this.setCheckedValidation();
    }
    // --- Watchers ---
    handleCheckedChange() {
        if (!this.checked && this.indeterminate) {
            this.renderIndeterminate = this.indeterminate;
        }
        else {
            this.setCheckedValidation();
        }
        this.internals?.setFormValue(this.checked ? (this.value || 'on') : null);
    }
    handleIndeterminateChange() {
        this.renderIndeterminate = this.indeterminate;
        if (this.checked && this.indeterminate)
            this.renderIndeterminate = false;
    }
    handleRequiredChange() { this.updateValidityState(); }
    // --- Public Methods (spec: api.methods) ---
    async setFocus() { this.labelEl?.focus(); this.handleFocus(); }
    async setBlur() { this.labelEl?.blur(); this.handleBlur(); }
    async checkValidity() { this.updateValidityState(); return this.internals.checkValidity(); }
    async reportValidity() { this.updateValidityState(); return this.internals.reportValidity(); }
    async getValidStatus() {
        return this.isValid ? '' : this.validStatus;
    }
    async setCustomError() {
        this.customSettingError();
    }
    async clearCustomError() {
        if (this.validStatus === 'custom') {
            this.validStatus = '';
            this.isValid = true;
        }
        this.updateValidityState();
    }
    // --- Listeners ---
    handleInvalidEvent(e) {
        this.formSubmitted = true;
        this.isValid = false;
        const errorSlotElement = this.host.querySelector('[slot="error"]');
        const slotHasContent = !!errorSlotElement && (errorSlotElement.textContent?.trim().length ?? 0) > 0;
        // Consistent toggle with sy-input / sy-input-number / sy-textarea:
        //   noNativeValidity=true  → native popup suppressed, slot = UI
        //   noNativeValidity=false → browser shows native popup; DO NOT call
        //     preventDefault (per HTML spec a single preventDefaulted invalid
        //     event kills popups on every other form control too).
        if (this.noNativeValidity) {
            e.preventDefault();
            e.stopPropagation();
            this.hasSlotErrorMessage = slotHasContent;
            if (slotHasContent) {
                this.host.setAttribute('has-custom-error', '');
                this.internals?.setValidity({ customError: true }, ' ');
            }
            else {
                this.host.removeAttribute('has-custom-error');
            }
        }
        else {
            this.hasSlotErrorMessage = false;
            this.host.removeAttribute('has-custom-error');
        }
        this.updateValidityState();
    }
    // --- Event handlers ---
    handleFocus = () => {
        this.hasFocus = true;
        this.focused.emit(this.checked);
    };
    handleBlur = () => {
        this.hasFocus = false;
        this.touched = true;
        this.updateValidityState();
        this.blured.emit(this.checked);
    };
    handleClick = (e) => {
        e.preventDefault();
        if (this.disabled || this.readonly)
            return;
        this.touched = true;
        this.checked = !this.checked;
    };
    onChange = (e) => {
        e.preventDefault();
        if (this.disabled || this.readonly)
            return;
        const target = e.target;
        this.checked = target.checked;
    };
    handleKeydown = (e) => {
        if (this.disabled || this.readonly)
            return;
        if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            this.touched = true;
            this.checked = !this.checked;
        }
    };
    handleFormSubmit = (_e) => {
        this.formSubmitted = true;
        this.updateValidityState();
    };
    // --- Form hookup ---
    formSubmitListener() {
        if (this.internals?.form) {
            this.internals.form.addEventListener('submit', this.handleFormSubmit);
        }
    }
    formSubmitListenerRemover() {
        if (this.internals?.form) {
            this.internals.form.removeEventListener('submit', this.handleFormSubmit);
        }
    }
    setCheckedValidation() {
        if (this.indeterminate)
            this.indeterminate = false;
        this.updateValidityState();
        this.changed.emit({
            value: this.checked,
            isValid: this.isValid,
            checked: this.checked,
            indeterminate: this.renderIndeterminate,
        });
    }
    // --- Validation (shared form-error pattern) ---
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    updateValidityState() {
        // (1) Programmatic custom error takes priority.
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
            this.internals?.setValidity({ customError: true }, msg);
            this.internals?.setFormValue(this.checked ? (this.value || 'on') : null);
            return;
        }
        // (2) Native constraint: required + (unchecked && !indeterminate) → invalid.
        const satisfiesRequired = !this.required || this.checked || this.indeterminate;
        this.isValid = satisfiesRequired;
        this.validStatus = satisfiesRequired ? '' : 'valueMissing';
        this.internals?.setFormValue(this.checked ? (this.value || 'on') : null);
        if (!this.isValid) {
            if (this.hasSlotErrorMessage) {
                const slotText = this.getSlotErrorText() || this.getErrorMessage('valueMissing') || ' ';
                this.internals?.setValidity({ customError: true }, slotText);
            }
            else {
                this.internals?.setValidity({ valueMissing: true }, this.getErrorMessage('valueMissing'));
            }
        }
        else {
            this.internals?.setValidity({});
        }
    }
    customSettingError() {
        this.isValid = false;
        this.validStatus = 'custom';
        this.touched = true;
        this.updateValidityState();
    }
    handleSlotChange = () => {
        const errorSlot = this.host.querySelector('[slot="error"]');
        if (!errorSlot) {
            this.hasSlotErrorMessage = false;
            this.hasPopupErrorComponent = false;
            return;
        }
        this.hasPopupErrorComponent = !!errorSlot.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
        this.hasSlotErrorMessage =
            (errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0;
    };
    getErrorMessage(type) {
        if (type === '')
            return '';
        const messages = {
            valueMissing: 'This checkbox is required',
            custom: 'Invalid input',
        };
        return messages[type] || '';
    }
    render() {
        const showInvalid = (this.formSubmitted || this.touched) && !this.isValid;
        const wrapperClasses = {
            'checkbox': true,
            'checkbox--checked': this.checked,
            'checkbox--disabled': this.disabled,
            'checkbox--focused': this.hasFocus,
            'checkbox--indeterminate': this.renderIndeterminate,
            'checkbox--invalid': showInvalid,
            'readonly': this.readonly,
        };
        const errorContainerClasses = {
            'error-container': true,
            'popup-error-container': this.hasPopupErrorComponent,
            'text-error-container': !this.hasPopupErrorComponent,
            'visible-error': showInvalid,
        };
        const ariaChecked = this.renderIndeterminate ? 'mixed' : (this.checked ? 'true' : 'false');
        return (h("div", { key: '331672faf0312a7d75feaa1d7adec0c06539c769', class: "checkbox-wrapper" }, h("label", { key: '895c813a4212d5228a92e108bc58cc66848f024a', ref: (el) => (this.labelEl = el), class: Object.keys(wrapperClasses).filter((k) => wrapperClasses[k]).join(' '), tabindex: this.disabled ? -1 : 0, onClick: this.handleClick }, h("input", { key: 'bb477a0fb317b0463962589dd54e586021fc7b95', ref: (el) => (this.inputEl = el), class: "checkbox--input", type: "checkbox", title: this.checkboxTitle, name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, required: this.required, "aria-checked": ariaChecked, "aria-invalid": showInvalid ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : undefined, onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.onChange, tabindex: "-1" }), h("span", { key: '7f2ed7db6511a81dabdcf5176b940ab7b761ce48', class: `checkbox-visual-label ${this.isTree ? 'checkbox-label' : ''}` }, h("sy-icon", { key: 'c798f0c385363cc54106c37bbc103efa38577cf3', size: "xsmall", class: "checked" }, h("svg", { key: 'fec8c72a0d85ac6257068d41e45548866117fcd9', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '74827546f1fd1437f7a3d76283037dbd7356e449', fill: "currentColor", d: "M534 132.5C544.8 140.2 547.2 155.2 539.5 166L275.5 534C271.4 539.7 265 543.4 258 543.9C251 544.4 244 542 239 537L103 401C93.6 391.6 93.6 376.4 103 367.1C112.4 357.8 127.6 357.7 136.9 367.1L253 483L500.5 138C508.2 127.2 523.2 124.8 534 132.5z" }))), h("sy-icon", { key: 'd8886bcb249a6bdabc2bc68b1e8997412a759c6b', size: "xsmall", class: "indeterminate" }, h("svg", { key: '41eb27fff308b66aac3af5054f75a5b6541ab2a7', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: 'a722e6f97b026f7f4717d0c0c7f138dc4c53960e', fill: "currentColor", d: "M64 128C64 92.7 92.7 64 128 64L512 64C547.3 64 576 92.7 576 128L576 512C576 547.3 547.3 576 512 576L128 576C92.7 576 64 547.3 64 512L64 128z" })))), h("div", { key: '2d400b591c4bf549ff42b37f02b9f2e6b89171a3', class: `checkbox-slot ${this.isTree ? 'checkbox-slot' : ''}` }, h("slot", { key: '27a8630973ae77b131a15069ec88cd43177ab895' }))), h("div", { key: 'f0e42aed955ee19c92e271e56237ed955d94cd2e', class: Object.keys(errorContainerClasses).filter((k) => errorContainerClasses[k]).join(' ') }, h("slot", { key: '251218af249c3574fdf0ef7097023b36f97e9526', name: "error", onSlotchange: this.handleSlotChange }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "checked": ["handleCheckedChange"],
        "indeterminate": ["handleIndeterminateChange"],
        "required": ["handleRequiredChange"]
    }; }
    static get style() { return syCheckboxCss; }
}, [324, "sy-checkbox", {
        "checkboxTitle": [1, "title"],
        "name": [1],
        "value": [1],
        "checked": [1540],
        "disabled": [1540],
        "indeterminate": [1540],
        "readonly": [516],
        "required": [4],
        "noNativeValidity": [4, "no-native-validity"],
        "hasFocus": [32],
        "isTree": [32],
        "renderIndeterminate": [32],
        "isValid": [32],
        "validStatus": [32],
        "hasSlotErrorMessage": [32],
        "hasPopupErrorComponent": [32],
        "touched": [32],
        "formSubmitted": [32],
        "setFocus": [64],
        "setBlur": [64],
        "checkValidity": [64],
        "reportValidity": [64],
        "getValidStatus": [64],
        "setCustomError": [64],
        "clearCustomError": [64]
    }, [[2, "invalid", "handleInvalidEvent"]], {
        "checked": ["handleCheckedChange"],
        "indeterminate": ["handleIndeterminateChange"],
        "required": ["handleRequiredChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-checkbox", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-checkbox":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyCheckbox);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyCheckbox as S, defineCustomElement as d };
