import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syInputCss = "@charset \"UTF-8\";.sc-sy-input-h{display:inline-block;width:100%;--input-spacing-large:var(--spacing-small);--input-spacing-medium:var(--spacing-xsmall);--input-spacing-small:var(--spacing-2xsmall)}.sc-sy-input-h input.sc-sy-input::placeholder{color:var(--input-form-placeholder-text-enabled)}.sc-sy-input-h input.sc-sy-input::-webkit-input-placeholder{color:var(--input-form-placeholder-text-enabled)}.sc-sy-input-h input.sc-sy-input:-ms-input-placeholder{color:var(--input-form-placeholder-text-enabled)}.sc-sy-input-h .input--item.sc-sy-input{display:flex;width:100%;align-items:baseline;gap:var(--spacing-xsmall)}.sc-sy-input-h .input--item.sc-sy-input .input--label.sc-sy-input{white-space:nowrap}.sc-sy-input-h .input--item.sc-sy-input .input.sc-sy-input{display:flex;width:auto}.sc-sy-input-h .input--item.sc-sy-input .input--small.sc-sy-input{padding:0 var(--spacing-2xsmall);gap:var(--spacing-3xsmall)}.sc-sy-input-h .input--item.sc-sy-input .input--small.sc-sy-input input.sc-sy-input{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.sc-sy-input-h .input--item.sc-sy-input .input--medium.sc-sy-input{padding:0 var(--spacing-xsmall);gap:var(--spacing-3xsmall)}.sc-sy-input-h .input--item.sc-sy-input .input--medium.sc-sy-input input.sc-sy-input{font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px}.sc-sy-input-h .input--item.sc-sy-input .input--large.sc-sy-input{padding:0 var(--spacing-small);gap:var(--spacing-2xsmall)}.sc-sy-input-h .input--item.sc-sy-input .input--large.sc-sy-input input.sc-sy-input{font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px}.sc-sy-input-h .input--item.sc-sy-input .input.sc-sy-input button.sc-sy-input{padding:0px}.sc-sy-input-h .input--item.input--item-vertical.sc-sy-input{display:block}.sc-sy-input-h .input--item.sc-sy-input .input--clear.sc-sy-input{cursor:pointer;color:var(--input-form-clearable-icon-enabled);position:absolute;right:var(--spacing-xsmall);z-index:1;background:var(--background-default)}.sc-sy-input-h .input--item.sc-sy-input .input--clear.sc-sy-input:hover{color:var(--input-form-clearable-icon-hover)}.sc-sy-input-h .input.sc-sy-input{flex:1;width:-webkit-fill-available;height:var(--component-medium);padding:0 var(--spacing-medium);border:var(--border-small) var(--input-form-field-border-enabled);color:var(--input-form-field-text-enabled);background-color:var(--input-form-field-background-enabled);border-radius:var(--border-radius-medium);box-sizing:border-box;font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;outline:none;display:flex;align-items:center;justify-content:space-between}.sc-sy-input-h .input.input--valid.sc-sy-input{border:var(--border-small) var(--input-form-field-border-vaild)}.sc-sy-input-h .input.input--valid.input--borderless.sc-sy-input{border:var(--border-small) var(--input-form-field-border-vaild) !important}.sc-sy-input-h .input.input--valid.sc-sy-input:focus-visible,.sc-sy-input-h .input.input--valid.input--focused.sc-sy-input{border:var(--border-small) var(--input-form-field-border-vaild) !important;outline:var(--border-small) var(--focus-outline) !important}.sc-sy-input-h .input.input--invalid.sc-sy-input{border:var(--border-small) var(--input-form-field-border-invaild)}.sc-sy-input-h .input.input--invalid.input--borderless.sc-sy-input{border:var(--border-small) var(--input-form-field-border-invaild) !important}.sc-sy-input-h .input.input--invalid.sc-sy-input:focus-visible,.sc-sy-input-h .input.input--invalid.input--focused.sc-sy-input{border:var(--border-small) var(--input-form-field-border-invaild) !important;outline:var(--border-small) var(--focus-outline) !important}.sc-sy-input-h .input.sc-sy-input .prefix-custom-icon.sc-sy-input,.sc-sy-input-h .input.sc-sy-input .suffix-custom-icon.sc-sy-input{color:var(--input-form-field-icon-enabled)}.sc-sy-input-h .input.sc-sy-input .input-password-toggle.sc-sy-input,.sc-sy-input-h .input.sc-sy-input .search-icon.sc-sy-input{cursor:pointer}.sc-sy-input-h .input.sc-sy-input:hover{color:var(--input-form-field-text-hover);border:var(--border-small) var(--input-form-field-border-hover);background-color:var(--input-form-field-background-hover)}.sc-sy-input-h .input.input--large.sc-sy-input{height:var(-component-large);font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px;height:40px}.sc-sy-input-h .input.input--large.sc-sy-input .input--clear.sc-sy-input{right:12px}.sc-sy-input-h .input.input--small.sc-sy-input{height:var(--component-small);font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;border-radius:var(--border-radius-small)}.sc-sy-input-h .input.input--small.sc-sy-input .input--clear.sc-sy-input{right:5px}.sc-sy-input-h .input.input--focused.sc-sy-input{border:var(--border-small) var(--focus-outline);outline:var(--border-small) var(--focus-outline)}.sc-sy-input-h .input.input--disabled.sc-sy-input{color:var(--input-form-field-text-disabled);background-color:var(--input-form-field-background-disabled);border:var(--border-small) var(--input-form-field-border-disabled);cursor:auto}.sc-sy-input-h .input.input--disabled.sc-sy-input input.sc-sy-input{color:var(--input-form-field-text-disabled);background-color:transparent;cursor:auto}.sc-sy-input-h .input.input--disabled.sc-sy-input .prefix-custom-icon.sc-sy-input,.sc-sy-input-h .input.input--disabled.sc-sy-input .suffix-custom-icon.sc-sy-input{color:var(--input-form-field-icon-disabled)}.sc-sy-input-h .input.input--disabled.sc-sy-input .input-password-toggle.sc-sy-input,.sc-sy-input-h .input.input--disabled.sc-sy-input .search-icon.sc-sy-input{cursor:auto}.sc-sy-input-h .input.input--borderless.sc-sy-input{border:var(--border-small) transparent;background-color:transparent;outline:none}.sc-sy-input-h .input.input--borderless.sc-sy-input input.sc-sy-input{background-color:transparent}.sc-sy-input-h .input.input--readonly.sc-sy-input{color:var(--input-form-field-text-readonly);background-color:var(--input-form-field-background-readonly);border:var(--border-small) var(--input-form-field-border-readonly);outline:none;cursor:auto}.sc-sy-input-h .input.input--readonly.sc-sy-input input.sc-sy-input{background:transparent !important;cursor:text}.sc-sy-input-h .input.input--readonly.input--borderless.sc-sy-input{border:var(--border-small) transparent;background-color:transparent;outline:none}.sc-sy-input-h .input.input--readonly.input--borderless.sc-sy-input input.sc-sy-input{background-color:transparent}.sc-sy-input-h .input.sc-sy-input:focus-visible{border:var(--border-small) var(--focus-outline);outline:var(--border-small) var(--focus-outline)}.sc-sy-input-h .input.sc-sy-input input.sc-sy-input{flex:1;width:100%;border:var(--border-small) transparent;outline:none;height:calc(100% - var(--spacing-small));background:none;color:var(--input-form-field-text-enabled);text-overflow:ellipsis}.sc-sy-input-h .input.sc-sy-input input.sc-sy-input:focus-visible{border:var(--border-small) transparent;box-shadow:none;outline-offset:0px;outline:none}.sc-sy-input-h .input[type=number].sc-sy-input{padding-right:30px}.sc-sy-input-h .input[type=number].sc-sy-input::-webkit-inner-spin-button{opacity:1 !important;background:transparent !important;border-width:0px;margin:0;height:34px;width:23px;cursor:pointer;display:inline-block;content:\"\"}.sc-sy-input-h .input.sc-sy-input i.sc-sy-input{color:var(--input-form-field-icon-enabled)}.sc-sy-input-h .input.input--error.sc-sy-input{border:var(--border-small) var(--input-form-field-border-error)}.sc-sy-input-h .input.input--warning.sc-sy-input{border:var(--border-small) var(--input-form-field-border-warning)}.sc-sy-input-h .input.input--success.sc-sy-input{border:var(--border-small) var(--input-form-field-border-success)}.sc-sy-input-h .input-control.sc-sy-input{font-size:inherit;font-weight:inherit}.sc-sy-input-h button.sc-sy-input{background:none;border:none}.sc-sy-input-h img.sc-sy-input,.sc-sy-input-h .prefix-custom-icon.sc-sy-input,.sc-sy-input-h .suffix-custom-icon.sc-sy-input{display:inline-flex;justify-content:center;align-items:center;height:1rem;transition:150ms color}.sc-sy-input-h input.sc-sy-input::-webkit-search-decoration,.sc-sy-input-h input.sc-sy-input::-webkit-search-cancel-button,.sc-sy-input-h input.sc-sy-input::-webkit-search-results-button,.sc-sy-input-h input.sc-sy-input::-webkit-search-results-decoration{opacity:0;pointer-events:none}.sc-sy-input-h .error-container.sc-sy-input{color:var(--required);display:none}.sc-sy-input-h .error-container.visible-error.sc-sy-input{display:flex}.sc-sy-input-h .input--message.sc-sy-input{display:flex;align-items:center;gap:var(--spacing-3xsmall);font-size:0.85rem;color:var(--input-form-message-text-enabled, var(--text-subtler));margin-top:var(--spacing-3xsmall)}sy-input[required].sc-sy-input-h .required.sc-sy-input{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;color:var(--input-label-required-enabled)}sy-input[disabled].sc-sy-input-h .input--label.sc-sy-input{color:var(--input-form-field-text-disabled)}sy-input[clearable].sc-sy-input-h .required.sc-sy-input{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;color:var(--input-label-required-enabled)}.input-wrapper.sc-sy-input{position:relative;width:100%}.input.sc-sy-input{width:100%}.error-container.sc-sy-input{color:var(--required);font-size:0.85rem;margin-top:4px}.popup-error-container.sc-sy-input{position:absolute;top:0;left:0;width:100%;height:100%;margin-top:0;pointer-events:none;display:block}.popup-error-container>.sc-sy-input-s>*{pointer-events:auto;display:block;width:100%;height:100%}sy-input[size=small].sc-sy-input-h .input--label.sc-sy-input{display:flex;align-items:center;height:var(--component-small)}sy-input[size=medium].sc-sy-input-h .input--label.sc-sy-input{display:flex;align-items:center;height:var(--component-medium)}sy-input[size=large].sc-sy-input-h .input--label.sc-sy-input{display:flex;align-items:center;height:var(--component-large)}";

const SyInput = /*@__PURE__*/ proxyCustomElement(class SyInput extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.blured = createEvent(this, "blured");
        this.focused = createEvent(this, "focused");
        this.clear = createEvent(this, "clear");
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    input;
    _isUserInput = false;
    initialValue = '';
    // --- Props ---
    autofocus = false;
    borderless = false;
    clearable = false;
    disabled = false;
    label = "";
    max;
    min;
    name = "";
    placeholder = "";
    readonly = false;
    required = false;
    size = "medium";
    status = 'default';
    value = "";
    variant = "text";
    noNativeValidity = false;
    // --- Spec-aligned props ---
    type = 'text';
    message = "";
    // --- State ---
    hasFocus = false;
    passwordvisible = false;
    hasPrefix = false;
    hasSuffix = false;
    isValid = true;
    validStatus = "";
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    touched = false;
    formSubmitted = false;
    // --- Events (legacy names retained; spec-aligned `input`/`change` bubble
    //     up from the inner native <input> element — shadow:false means we don't
    //     re-emit them from Stencil (that would conflict with native DOM events). ---
    changed;
    blured;
    focused;
    clear;
    // --- Custom Validity Getters ---
    get validity() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return {
                badInput: false, customError: true, patternMismatch: false, rangeOverflow: false,
                rangeUnderflow: false, stepMismatch: false, tooLong: this.validStatus === 'tooLong',
                tooShort: this.validStatus === 'tooShort', typeMismatch: this.validStatus === 'typeMismatch',
                valid: false, valueMissing: this.validStatus === 'valueMissing',
            };
        }
        return this.internals?.validity;
    }
    get validationMessage() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return this.getErrorMessage(this.validStatus);
        }
        return this.internals?.validationMessage;
    }
    get willValidate() {
        return this.internals?.willValidate;
    }
    // --- Lifecycle Methods ---
    connectedCallback() {
        if (this.internals?.form) {
            this.internals.form.addEventListener('submit', this.handleFormSubmit);
        }
    }
    disconnectedCallback() {
        if (this.internals?.form) {
            this.internals.form.removeEventListener('submit', this.handleFormSubmit);
        }
    }
    componentWillLoad() {
        this.noNativeValidity = fnAssignPropFromAlias(this.host, 'no-native-validity') ?? this.noNativeValidity;
        // Accept spec-aligned attribute aliases for character-length constraints.
        const minLengthAlias = fnAssignPropFromAlias(this.host, 'min-length', 'minLength');
        if (minLengthAlias !== null && minLengthAlias !== undefined)
            this.min = minLengthAlias;
        const maxLengthAlias = fnAssignPropFromAlias(this.host, 'max-length', 'maxLength');
        if (maxLengthAlias !== null && maxLengthAlias !== undefined)
            this.max = maxLengthAlias;
        // spec `type` ↔ legacy `variant`. Keep both coherent.
        if (this.type && this.type !== 'text') {
            if (this.type === 'password' || this.type === 'search') {
                this.variant = this.type;
            }
            // email/number/tel/url: variant stays 'text' — the native <input type> is driven by `type` directly.
        }
        else if (this.variant && this.variant !== 'text') {
            this.type = this.variant;
        }
        this.initialValue = this.value;
        this.handleSlotChange();
        this.updateValidityState();
    }
    componentDidLoad() {
        // this.handleSlotChange(); <-- 여기에서 위로 이동했습니다.
        if (this.autofocus) {
            requestAnimationFrame(() => this.input?.focus());
        }
        if (this.value) {
            this.emitChangedEvent();
        }
    }
    // --- Form Associated Callbacks ---
    formDisabledCallback(disabled) { this.disabled = disabled; }
    formResetCallback() {
        this.value = this.initialValue;
        this.touched = false;
        this.formSubmitted = false;
        this.updateValidityState();
    }
    formStateRestoreCallback(state) {
        this.value = state;
        this.updateValidityState();
    }
    // --- Watchers ---
    handleValueChange() {
        if (!this._isUserInput) {
            this.emitChangedEvent();
        }
        this._isUserInput = false;
        this.updateValidityState();
    }
    handleConstraintChange() {
        this.updateValidityState();
    }
    // --- Public Methods ---
    async setFocus() { this.input?.focus(); }
    async setBlur() { this.input?.blur(); }
    async checkValidity() { this.updateValidityState(); return this.internals.checkValidity(); }
    async reportValidity() { this.updateValidityState(); return this.internals.reportValidity(); }
    async setCustomError() { this.customSettingError(); }
    async clearCustomError() {
        if (!this.isValid && this.validStatus === 'custom') {
            this.validStatus = '';
        }
        this.updateValidityState();
    }
    async getStatus() { return this.isValid ? '' : this.validStatus; }
    // --- Host Event Listeners ---
    handleHostFocus() {
        if (!this.disabled) {
            this.input?.focus();
        }
    }
    handleInvalidEvent(e) {
        this.formSubmitted = true;
        this.isValid = false;
        const errorSlotElement = this.host.querySelector('[slot="error"]');
        const slotHasContent = !!errorSlotElement && (errorSlotElement.textContent?.trim().length ?? 0) > 0;
        if (this.noNativeValidity) {
            // Opt-out: suppress the browser popup. Slot (if present) is the UI.
            e.preventDefault();
            e.stopPropagation();
            this.hasSlotErrorMessage = slotHasContent;
            if (slotHasContent && e.target === this.host) {
                if (this.input)
                    this.input.setCustomValidity('');
                this.internals?.setValidity({ customError: true }, ' ');
            }
        }
        else {
            // Default: native browser popup. Do NOT call preventDefault here —
            // per HTML spec, if ANY `invalid` event in a form has its default
            // prevented, the browser shows NO validation UI for the entire form.
            // Calling preventDefault would silently kill every popup.
            this.hasSlotErrorMessage = false;
        }
        this.updateValidityState();
    }
    // --- Event Handlers ---
    handleFocus = () => {
        this.hasFocus = true;
        this.focused.emit({ value: this.value, isValid: this.isValid, status: this.validStatus });
    };
    handleBlur = () => {
        this.hasFocus = false;
        this.touched = true;
        this.updateValidityState();
        this.blured.emit({ value: this.value, isValid: this.isValid, status: this.validStatus });
        // Native `change` event fires on the inner <input> at blur and bubbles up.
    };
    handleInput = (e) => {
        const target = e.target;
        this.touched = true;
        this._isUserInput = true;
        this.value = target.value;
        this.emitChangedEvent();
        // Native `input` event bubbles up from the inner <input> automatically.
    };
    handleKeydown = (e) => {
        if (e.key === 'Enter') {
            this.handleBlur();
        }
    };
    handleClearClick = () => {
        this._isUserInput = true;
        this.value = "";
        this.emitChangedEvent();
        this.clear.emit();
        this.input?.focus();
    };
    handlePasswordToggle = () => {
        this.passwordvisible = !this.passwordvisible;
    };
    handleFormSubmit = (_e) => {
        this.formSubmitted = true;
        this.updateValidityState();
    };
    handleSlotChange = () => {
        // Accept both legacy and spec-aligned slot names.
        this.hasPrefix =
            this.host.querySelector('[slot="prefix"]') !== null ||
                this.host.querySelector('[slot="prefix-icon"]') !== null;
        this.hasSuffix =
            this.host.querySelector('[slot="suffix"]') !== null ||
                this.host.querySelector('[slot="suffix-icon"]') !== null;
        const errorSlot = this.host.querySelector('[slot="error"]');
        if (!errorSlot) {
            this.hasSlotErrorMessage = false;
            this.hasPopupErrorComponent = false;
            return;
        }
        this.hasPopupErrorComponent = !!errorSlot.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
        this.hasSlotErrorMessage = errorSlot.textContent.trim().length > 0 || errorSlot.children.length > 0;
    };
    // --- Private Methods ---
    emitChangedEvent() {
        this.updateValidityState();
        this.changed.emit({
            value: this.value,
            isValid: this.isValid,
            status: this.validStatus,
        });
    }
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    updateValidityState() {
        // (1) Programmatic custom error takes priority — use the slot's text as the
        // validity message when present (so reportValidity surfaces the same copy
        // that's on screen). Matches autocomplete's setCustomError flow.
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
            this.internals?.setValidity({ customError: true }, msg);
            this.internals?.setFormValue(this.value, this.value);
            return;
        }
        let currentIsValid = true;
        let currentValidStatus = "";
        if (this.required && !this.value) {
            currentIsValid = false;
            currentValidStatus = "valueMissing";
        }
        else if (this.value && this.min !== undefined && this.value.length < this.min) {
            currentIsValid = false;
            currentValidStatus = "tooShort";
        }
        else if (this.value && this.max !== undefined && this.value.length > this.max) {
            currentIsValid = false;
            currentValidStatus = "tooLong";
        }
        else if (this.value && this.input?.validity?.typeMismatch) {
            // email / url / tel — delegate format checking to the native input, then
            // mirror typeMismatch onto our own state so the visual error activates.
            currentIsValid = false;
            currentValidStatus = "typeMismatch";
        }
        this.isValid = currentIsValid;
        this.validStatus = currentValidStatus;
        const validityMessage = this.getErrorMessage(this.validStatus);
        this.internals.setFormValue(this.value, this.value);
        if (!this.isValid) {
            if (this.hasSlotErrorMessage) {
                const slotText = this.getSlotErrorText() || validityMessage || ' ';
                this.internals.setValidity({ customError: true }, slotText);
            }
            else {
                this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
            }
        }
        else {
            this.internals.setValidity({});
        }
    }
    customSettingError() {
        this.isValid = false;
        this.validStatus = 'custom';
        this.touched = true;
        // Slot UI is the surface for programmatic errors regardless of the
        // noNativeValidity toggle (which only gates the browser-driven popup).
        this.hasSlotErrorMessage =
            !!this.host.querySelector('[slot="error"]') &&
                (this.host.querySelector('[slot="error"]')?.textContent?.trim().length ?? 0) > 0;
        this.updateValidityState();
    }
    getErrorMessage(type) {
        const effectiveType = this.type && this.type !== 'text' ? this.type : this.variant;
        const typeMismatchText = effectiveType === 'email' ? 'Please enter a valid email address'
            : effectiveType === 'url' ? 'Please enter a valid URL'
                : effectiveType === 'tel' ? 'Please enter a valid phone number'
                    : 'Please enter a valid value';
        const messages = {
            valueMissing: "This field is required",
            tooShort: `Value must be at least ${this.min} characters long`,
            tooLong: `Value cannot exceed ${this.max} characters`,
            typeMismatch: typeMismatchText,
            custom: 'Invalid by custom',
        };
        return messages[type] || '';
    }
    // --- Render Method ---
    render() {
        const hasClearIcon = this.clearable && !this.disabled && !this.readonly && this.value?.length > 0;
        const placeholder = !this.placeholder && this.variant === "search" ? "Search" : this.placeholder;
        const wrapperClasses = {
            'input': true,
            'input--small': this.size === "small",
            'input--medium': this.size === "medium",
            'input--large': this.size === "large",
            'input--disabled': this.disabled,
            'input--readonly': this.readonly,
            'input--focused': this.hasFocus,
            'input--borderless': this.borderless,
            'input--empty': !this.value,
            'input--invalid': (this.formSubmitted || this.touched) && !this.isValid,
            'input--default': this.status === 'default',
            'input--warning': this.status === 'warning',
            'input--error': this.status === 'error',
            'input--success': this.status === 'success',
        };
        const errorContainerClasses = {
            'error-container': true,
            'popup-error-container': this.hasPopupErrorComponent,
            'text-error-container': !this.hasPopupErrorComponent,
            'visible-error': (this.touched || this.formSubmitted) && !this.isValid
        };
        // Native <input type="..."> priority: password visibility toggle → spec-aligned `type` → legacy `variant`.
        const effectiveType = this.type && this.type !== 'text' ? this.type : this.variant;
        const inputType = (effectiveType === "password" && this.passwordvisible)
            ? "text"
            : (effectiveType || 'text');
        return (h("div", { key: 'b7b56b90d31d9eea3f341ecf12663d931c03c80c', class: "input--item input--item-vertical" }, this.label?.trim().length > 0 && (h("span", { key: '742bb37798071a056f2c5d6275e4ae9a0dbd6e81', class: "input--label" }, this.required && h("span", { key: 'af251843cf2d8e801462877ac62aec39d65de831', class: "required" }, "*"), this.label)), h("div", { key: '9f0f3edf5e534f6d47901daca3b6fef0171d7dd4', class: "input-wrapper" }, h("div", { key: 'bbcd4f30cf66d9f3542171944938673212182573', class: wrapperClasses }, h("span", { key: '3467549e4a0f474aac5f3653d3641084c150b503', class: "prefix-wrapper", style: { display: this.hasPrefix ? 'flex' : 'none' } }, h("slot", { key: '260a013e3fefccbf83e2bbdf6a37658c6dbfdec4', name: "prefix", onSlotchange: this.handleSlotChange }), h("slot", { key: '41efee759132596f4e86abaf68f5576ec0acf4d6', name: "prefix-icon", onSlotchange: this.handleSlotChange })), h("input", { key: 'd38091a8f7b7e298ba733f9c70002b752365d16f', ref: (el) => (this.input = el), class: "input--control", type: inputType, name: this.name, disabled: this.disabled, readOnly: this.readonly, required: this.required, autoFocus: this.autofocus, placeholder: placeholder, minLength: this.min, maxLength: this.max, value: this.value, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeydown }), hasClearIcon && this.hasFocus && (h("sy-icon", { key: 'db7e024f23b4232d6f381c3f81838b356d5dbf56', class: "input--clear", size: this.size, selectable: true, onMouseDown: (e) => e.preventDefault(), onSelected: this.handleClearClick }, h("svg", { key: '1b6dd16de13e22de6aa2bb07a8c69ab158b30699', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '5e7b0aeae85fa604fbafc1757bf68cc02378f5af', fill: "currentColor", d: "M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z" })))), this.renderVariantIcon()), h("div", { key: '69b44ac2d67a50cd1471bfbea77c491fe1005af0', class: errorContainerClasses }, h("slot", { key: '21b5284018d70623e90eb5e529ffadd592c44b61', name: "error", onSlotchange: this.handleSlotChange })), (this.message || this.host.querySelector('[slot="message"]')) && (h("div", { key: '87a4f674a2a637c6c5339ce060771097bf79641a', class: "input--message" }, h("slot", { key: '581e0d9fcef54505ef9b8de78ccc4b4bbd150070', name: "message" }), this.message && !this.host.querySelector('[slot="message"]') && (h("span", { key: '5a985af8f5a4cea903144e284d1c2086247ada0c' }, this.message)))))));
    }
    renderVariantIcon() {
        switch (this.variant) {
            case 'password':
                return this.passwordvisible ? (h("sy-icon", { class: "input-password-toggle", selectable: true, onMouseDown: (e) => e.preventDefault(), onSelected: this.handlePasswordToggle }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5zM286 196.6C296.8 193.6 308.2 192.1 319.9 192.1C328.7 192.1 337.4 193 345.7 194.7C346 194.8 346.2 194.8 346.5 194.9C404.4 207.1 447.9 258.6 447.9 320.1C447.9 390.8 390.6 448.1 319.9 448.1C258.3 448.1 206.9 404.6 194.7 346.7C192.9 338.1 191.9 329.2 191.9 320.1C191.9 309.1 193.3 298.3 195.9 288.1C196.1 287.4 196.2 286.8 196.4 286.2C208.3 242.8 242.5 208.6 285.9 196.7z" })))) : (h("sy-icon", { class: "input-password-toggle", selectable: true, onMouseDown: (e) => e.preventDefault(), onSelected: this.handlePasswordToggle }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM208.9 175.1C241 156.2 278.1 144 320 144C385.2 144 438.8 173.6 479.9 211.7C518.4 247.4 545 290 558.5 320C544.9 350 518.3 392.5 479.9 428.3C476.8 431.1 473.7 433.9 470.5 436.7L425.8 392C439.8 371.5 448 346.7 448 320C448 249.3 390.7 192 320 192C293.3 192 268.5 200.2 248 214.2L208.9 175.1zM390.9 357.1L282.9 249.1C294 243.3 306.6 240 320 240C364.2 240 400 275.8 400 320C400 333.4 396.7 346 390.9 357.1zM135.4 237.2L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L384.2 486C364.2 492.4 342.8 496 320 496C254.8 496 201.2 466.4 160.1 428.3C121.6 392.6 95 350 81.5 320C91.9 296.9 110.1 266.4 135.5 237.2z" }))));
            case 'search':
                return (h("sy-icon", { class: "search-icon", size: "medium", selectable: true }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { d: "M432 272C432 183.6 360.4 112 272 112C183.6 112 112 183.6 112 272C112 360.4 183.6 432 272 432C360.4 432 432 360.4 432 272zM401.1 435.1C365.7 463.2 320.8 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272C480 320.8 463.2 365.7 435.1 401.1L569 535C578.4 544.4 578.4 559.6 569 568.9C559.6 578.2 544.4 578.3 535.1 568.9L401.1 435.1z" }))));
            default:
                return (h("span", { class: "suffix-wrapper", style: { display: this.hasSuffix ? 'flex' : 'none' } }, h("slot", { name: "suffix", onSlotchange: this.handleSlotChange }), h("slot", { name: "suffix-icon", onSlotchange: this.handleSlotChange })));
        }
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["handleValueChange"],
        "min": ["handleConstraintChange"],
        "max": ["handleConstraintChange"],
        "required": ["handleConstraintChange"]
    }; }
    static get style() { return syInputCss; }
}, [326, "sy-input", {
        "autofocus": [4],
        "borderless": [516],
        "clearable": [4],
        "disabled": [1540],
        "label": [1],
        "max": [1026],
        "min": [1026],
        "name": [1],
        "placeholder": [1],
        "readonly": [516],
        "required": [516],
        "size": [513],
        "status": [1],
        "value": [1537],
        "variant": [1537],
        "noNativeValidity": [1028, "nonativevalidity"],
        "type": [1025],
        "message": [1],
        "hasFocus": [32],
        "passwordvisible": [32],
        "hasPrefix": [32],
        "hasSuffix": [32],
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
        "setCustomError": [64],
        "clearCustomError": [64],
        "getStatus": [64]
    }, [[0, "focus", "handleHostFocus"], [2, "invalid", "handleInvalidEvent"]], {
        "value": ["handleValueChange"],
        "min": ["handleConstraintChange"],
        "max": ["handleConstraintChange"],
        "required": ["handleConstraintChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-input", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-input":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyInput);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyInput as S, defineCustomElement as d };
