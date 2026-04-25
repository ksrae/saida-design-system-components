import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syInputNumberCss = "@charset \"UTF-8\";.sc-sy-input-number:root,.sc-sy-input-number-h{display:inline-block;width:100%;--input-size-large:var(--component-large);--input-size-medium:var(--component-medium);--input-size-small:var(--component-small);--input-spacing-large:var(--spacing-small);--input-spacing-medium:var(--spacing-xsmall);--input-spacing-small:var(--spacing-2xsmall)}.sc-sy-input-number:root .input--item.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number{width:100%;gap:var(--input-spacing-medium);display:flex;align-items:center}.sc-sy-input-number:root .input--item.sc-sy-input-number .input--label.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input--label.sc-sy-input-number{display:flex;align-items:center;width:100%}.sc-sy-input-number:root .input--item.sc-sy-input-number .input--label.sc-sy-input-number .required.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input--label.sc-sy-input-number .required.sc-sy-input-number{color:var(--inputnumber-label-required-enabled)}.sc-sy-input-number:root .input--item.sc-sy-input-number .input--small.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input--small.sc-sy-input-number{padding:0 var(--input-spacing-small);font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.sc-sy-input-number:root .input--item.sc-sy-input-number .input--medium.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input--medium.sc-sy-input-number{font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px}.sc-sy-input-number:root .input--item.sc-sy-input-number .input--large.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input--large.sc-sy-input-number{padding:0 var(--input-spacing-large);font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px}.sc-sy-input-number:root .input--item.sc-sy-input-number .input.sc-sy-input-number button.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input.sc-sy-input-number button.sc-sy-input-number{padding:0px}.sc-sy-input-number:root .input--item.sc-sy-input-number .input.input--error.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input.input--error.sc-sy-input-number{border:var(--border-small) var(--inputnumber-form-field-border-error)}.sc-sy-input-number:root .input--item.sc-sy-input-number .input.input--warning.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input.input--warning.sc-sy-input-number{border:var(--border-small) var(--inputnumber-form-field-border-warning)}.sc-sy-input-number:root .input--item.sc-sy-input-number .input.input--success.sc-sy-input-number,.sc-sy-input-number-h .input--item.sc-sy-input-number .input.input--success.sc-sy-input-number{border:var(--border-small) var(--inputnumber-form-field-border-success)}.sc-sy-input-number:root .input--item.input--item-vertical.sc-sy-input-number,.sc-sy-input-number-h .input--item.input--item-vertical.sc-sy-input-number{display:block}.sc-sy-input-number:root .input--item.input--item-vertical.sc-sy-input-number .input--small.sc-sy-input-number,.sc-sy-input-number-h .input--item.input--item-vertical.sc-sy-input-number .input--small.sc-sy-input-number{gap:var(--spacing-3xsmall)}.sc-sy-input-number:root .input--item.input--item-vertical.sc-sy-input-number .input--medium.sc-sy-input-number,.sc-sy-input-number-h .input--item.input--item-vertical.sc-sy-input-number .input--medium.sc-sy-input-number{gap:var(--spacing-3xsmall)}.sc-sy-input-number:root .input--item.input--item-vertical.sc-sy-input-number .input--large.sc-sy-input-number,.sc-sy-input-number-h .input--item.input--item-vertical.sc-sy-input-number .input--large.sc-sy-input-number{gap:var(--spacing-3xsmall)}.sc-sy-input-number:root .input--item.input--suffix.sc-sy-input-number .input.sc-sy-input-number,.sc-sy-input-number-h .input--item.input--suffix.sc-sy-input-number .input.sc-sy-input-number{padding-right:32px}.sc-sy-input-number:root .input.sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number{display:flex;align-items:center;position:relative;flex:1;height:var(--input-size-medium);border:var(--border-small) var(--inputnumber-form-field-border-enabled);padding:var(--input-spacing-medium);color:var(--inputnumber-form-field-text-enabled);background-color:var(--inputnumber-form-field-background-enabled);border-radius:var(--border-radius-medium);box-sizing:border-box;font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;outline:none;gap:var(--spacing-2xsmall);width:100%}.sc-sy-input-number:root .input.sc-sy-input-number:hover,.sc-sy-input-number-h .input.sc-sy-input-number:hover{color:var(--inputnumber-form-field-text-hover);border:var(--border-small) var(--inputnumber-form-field-border-hover);background-color:var(--inputnumber-form-field-background-hover)}.sc-sy-input-number:root .input.sc-sy-input-number:hover .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number:hover .input-number-handle.sc-sy-input-number{display:inline-block !important}.sc-sy-input-number:root .input.input--focused.sc-sy-input-number,.sc-sy-input-number-h .input.input--focused.sc-sy-input-number{border:var(--border-small) var(--focus-outline);outline:var(--border-small) var(--focus-outline)}.sc-sy-input-number:root .input.sc-sy-input-number:focus-visible,.sc-sy-input-number-h .input.sc-sy-input-number:focus-visible{border:var(--border-small) var(--focus-outline);outline:var(--border-small) var(--focus-outline)}.sc-sy-input-number:root .input.input--valid.sc-sy-input-number,.sc-sy-input-number-h .input.input--valid.sc-sy-input-number{border:var(--border-small) green}.sc-sy-input-number:root .input.input--invalid.sc-sy-input-number,.sc-sy-input-number-h .input.input--invalid.sc-sy-input-number{border:var(--border-small) red}.sc-sy-input-number:root .input.input--large.sc-sy-input-number,.sc-sy-input-number-h .input.input--large.sc-sy-input-number{height:var(--input-size-large);padding:var(--input-spacing-large);padding-right:0px;height:40px}.sc-sy-input-number:root .input.input--large.sc-sy-input-number input.sc-sy-input-number,.sc-sy-input-number-h .input.input--large.sc-sy-input-number input.sc-sy-input-number{font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px}.sc-sy-input-number:root .input.input--large.sc-sy-input-number::-webkit-inner-spin-button,.sc-sy-input-number-h .input.input--large.sc-sy-input-number::-webkit-inner-spin-button{height:40px}.sc-sy-input-number:root .input.input--small.sc-sy-input-number,.sc-sy-input-number-h .input.input--small.sc-sy-input-number{height:var(--input-size-small);padding:0 var(--input-spacing-small);border-radius:var(--border-radius-small);padding-right:0px}.sc-sy-input-number:root .input.input--small.sc-sy-input-number input.sc-sy-input-number,.sc-sy-input-number-h .input.input--small.sc-sy-input-number input.sc-sy-input-number{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;padding-right:var(--input-spacing-small)}.sc-sy-input-number:root .input.input--borderless.sc-sy-input-number,.sc-sy-input-number-h .input.input--borderless.sc-sy-input-number{background:none;border-color:transparent;outline:none}.sc-sy-input-number:root .input.input--borderless.sc-sy-input-number .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input.input--borderless.sc-sy-input-number .input-number-handle.sc-sy-input-number{display:none}.sc-sy-input-number:root .input.input--borderless.sc-sy-input-number:hover .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input.input--borderless.sc-sy-input-number:hover .input-number-handle.sc-sy-input-number{display:block}.sc-sy-input-number:root .input.input--borderless.focus-visible.sc-sy-input-number,.sc-sy-input-number-h .input.input--borderless.focus-visible.sc-sy-input-number{border:var(--border-small) var(--focus-outline) !important;outline:var(--border-small) var(--focus-outline) !important}.sc-sy-input-number:root .input.input--borderless.sc-sy-input-number:focus,.sc-sy-input-number-h .input.input--borderless.sc-sy-input-number:focus{border:1px solid transparent !important;outline:none !important}.sc-sy-input-number:root .input.input--borderless.sc-sy-input-number:-moz-focusring,.sc-sy-input-number-h .input.input--borderless.sc-sy-input-number:-moz-focusring{border:1px solid transparent;outline:none}.sc-sy-input-number:root .input.input--disabled.sc-sy-input-number,.sc-sy-input-number-h .input.input--disabled.sc-sy-input-number{background-color:var(--inputnumber-form-field-background-disabled);border:var(--border-small) var(--inputnumber-form-field-border-disabled);cursor:not-allowed}.sc-sy-input-number:root .input.input--disabled.sc-sy-input-number input.sc-sy-input-number,.sc-sy-input-number-h .input.input--disabled.sc-sy-input-number input.sc-sy-input-number{color:var(--inputnumber-form-field-text-disabled);cursor:not-allowed}.sc-sy-input-number:root .input.input--disabled.input--borderless.sc-sy-input-number,.sc-sy-input-number-h .input.input--disabled.input--borderless.sc-sy-input-number{border:var(--border-small) var(--inputnumber-form-field-border-disabled)}.sc-sy-input-number:root .input.input--disabled.sc-sy-input-number .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input.input--disabled.sc-sy-input-number .input-number-handle.sc-sy-input-number{display:none !important}.sc-sy-input-number:root .input.input--disabled.sc-sy-input-number:hover,.sc-sy-input-number-h .input.input--disabled.sc-sy-input-number:hover{background-color:var(--inputnumber-form-field-background-disabled);border:var(--border-small) var(--inputnumber-form-field-border-disabled);color:var(--inputnumber-form-field-text-disabled)}.sc-sy-input-number:root .input.input--disabled.sc-sy-input-number:hover .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input.input--disabled.sc-sy-input-number:hover .input-number-handle.sc-sy-input-number{display:none !important}.sc-sy-input-number:root .input.input--readonly.sc-sy-input-number,.sc-sy-input-number-h .input.input--readonly.sc-sy-input-number{color:var(--inputnumber-form-field-text-readonly);background-color:var(--inputnumber-form-field-background-readonly);border:var(--border-small) var(--inputnumber-form-field-border-readonly);outline:none;cursor:default}.sc-sy-input-number:root .input.input--readonly.sc-sy-input-number input.sc-sy-input-number,.sc-sy-input-number-h .input.input--readonly.sc-sy-input-number input.sc-sy-input-number{color:var(--inputnumber-form-field-text-readonly);cursor:default}.sc-sy-input-number:root .input.input--readonly.sc-sy-input-number .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input.input--readonly.sc-sy-input-number .input-number-handle.sc-sy-input-number{display:none !important}.sc-sy-input-number:root .input.input--readonly.sc-sy-input-number:hover,.sc-sy-input-number-h .input.input--readonly.sc-sy-input-number:hover{background-color:var(--inputnumber-form-field-background-readonly);border:var(--border-small) var(--inputnumber-form-field-border-readonly);color:var(--inputnumber-form-field-text-readonly)}.sc-sy-input-number:root .input.input--readonly.sc-sy-input-number:hover .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input.input--readonly.sc-sy-input-number:hover .input-number-handle.sc-sy-input-number{display:none !important}.sc-sy-input-number:root .input.sc-sy-input-number input.sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number input.sc-sy-input-number{flex:1;border:var(--border-small) transparent;background-color:transparent;color:var(--input-form-field-text-enabled);outline:none;height:100%;padding:0;width:-webkit-fill-available;font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px}.sc-sy-input-number:root .input.sc-sy-input-number input.sc-sy-input-number:focus-visible,.sc-sy-input-number-h .input.sc-sy-input-number input.sc-sy-input-number:focus-visible{box-shadow:none;outline-offset:0px;outline:none}.sc-sy-input-number:root .input.sc-sy-input-number input[disabled].sc-sy-input-number,.sc-sy-input-number:root .input.sc-sy-input-number input[readonly].sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number input[disabled].sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number input[readonly].sc-sy-input-number{cursor:auto}.sc-sy-input-number:root .input.sc-sy-input-number .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number .input-number-handle.sc-sy-input-number{position:absolute;display:none !important;width:23px;height:100%;top:0px;right:0cap;display:flex;flex-direction:column;cursor:pointer;height:100%}.sc-sy-input-number:root .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle.sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle.sc-sy-input-number{width:auto;display:flex;align-items:center;justify-content:center;height:50%;color:#ccc}.sc-sy-input-number:root .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle-down.sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle-down.sc-sy-input-number{position:relative}.sc-sy-input-number:root .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle.sc-sy-input-number:hover,.sc-sy-input-number-h .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle.sc-sy-input-number:hover{color:var(--inputnumber-form-field-icon-hover)}.sc-sy-input-number:root .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle.sc-sy-input-number:hover i.sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle.sc-sy-input-number:hover i.sc-sy-input-number{color:var(--icon-brand-subtle)}.sc-sy-input-number:root .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle.sc-sy-input-number i.sc-sy-input-number,.sc-sy-input-number-h .input.sc-sy-input-number .input-number-handle.sc-sy-input-number .handle.sc-sy-input-number i.sc-sy-input-number{height:12px;zoom:0.8;color:var(--icon-default)}.sc-sy-input-number:root .prefix.sc-sy-input-number,.sc-sy-input-number-h .prefix.sc-sy-input-number{height:var(--component-small);font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;height:100%;display:flex;align-items:center;line-height:initial}.sc-sy-input-number:root .prefix.sc-sy-input-number+.default.sc-sy-input-number,.sc-sy-input-number-h .prefix.sc-sy-input-number+.default.sc-sy-input-number{padding-left:16px}.sc-sy-input-number:root input[type=number].sc-sy-input-number::-webkit-outer-spin-button,.sc-sy-input-number:root input[type=number].sc-sy-input-number::-webkit-inner-spin-button,.sc-sy-input-number-h input[type=number].sc-sy-input-number::-webkit-outer-spin-button,.sc-sy-input-number-h input[type=number].sc-sy-input-number::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.sc-sy-input-number:root input[type=number].sc-sy-input-number,.sc-sy-input-number-h input[type=number].sc-sy-input-number{-moz-appearance:textfield}.sc-sy-input-number:root input[type=number].sc-sy-input-number::-webkit-inner-spin-button,.sc-sy-input-number-h input[type=number].sc-sy-input-number::-webkit-inner-spin-button{opacity:1 !important;background:transparent !important;border-width:0px;margin:0;height:34px;width:23px;cursor:pointer;display:inline-block;content:\"\"}.sc-sy-input-number:root .input-number-handle.sc-sy-input-number,.sc-sy-input-number-h .input-number-handle.sc-sy-input-number{border-left:var(--border-small) var(--inputnumber-form-field-border-enabled) !important}.sc-sy-input-number:root .input-number-handle.sc-sy-input-number .handle-down.sc-sy-input-number:after,.sc-sy-input-number-h .input-number-handle.sc-sy-input-number .handle-down.sc-sy-input-number:after{display:block;content:\"\";width:100%;position:absolute;top:0px;left:0px;border-top:var(--border-small) var(--inputnumber-form-field-border-enabled)}.sc-sy-input-number:root input.sc-sy-input-number:focus-visible+.input-number-handle.sc-sy-input-number .handle-down.sc-sy-input-number:after,.sc-sy-input-number-h input.sc-sy-input-number:focus-visible+.input-number-handle.sc-sy-input-number .handle-down.sc-sy-input-number:after{display:block;content:\"\";width:calc(100% - 1px) !important;position:absolute;top:0px;left:0px;border-top:var(--border-small) var(--inputnumber-form-field-border-enabled)}.sc-sy-input-number:root .error-container.sc-sy-input-number,.sc-sy-input-number-h .error-container.sc-sy-input-number{color:var(--required);display:none}.sc-sy-input-number:root .error-container.visible-error.sc-sy-input-number,.sc-sy-input-number-h .error-container.visible-error.sc-sy-input-number{display:flex}sy-input-number[disabled].sc-sy-input-number-h .input--label.sc-sy-input-number{color:var(--inputnumber-form-field-text-disabled)}sy-input-number[size=small].sc-sy-input-number-h .input--label.sc-sy-input-number{height:var(--component-small)}sy-input-number[size=medium].sc-sy-input-number-h .input--label.sc-sy-input-number{height:var(--component-medium)}sy-input-number[size=large].sc-sy-input-number-h .input--label.sc-sy-input-number{height:var(--component-large)}.input-wrapper.sc-sy-input-number{position:relative;width:100%}.input.sc-sy-input-number{width:100%}.error-container.sc-sy-input-number{color:var(--required);font-size:0.85rem;margin-top:4px}.popup-error-container.sc-sy-input-number{display:block !important}.popup-error-container>.sc-sy-input-number-s>*{pointer-events:auto;display:block;width:100%;height:100%}";

const SyInputNumber = /*@__PURE__*/ proxyCustomElement(class SyInputNumber extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.blured = createEvent(this, "blured");
        this.focused = createEvent(this, "focused");
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    input;
    initialValue = '';
    stepTimer;
    stepInterval = 150;
    // --- Props ---
    autofocus = false;
    borderless = false;
    decimalPlaces;
    disabled = false;
    label = "";
    max = Number.MAX_SAFE_INTEGER;
    min = Number.MIN_SAFE_INTEGER;
    name = "";
    readonly = false;
    required = false;
    rounding;
    size = "medium";
    status = 'default';
    step = 1;
    value = '';
    noNativeValidity = false;
    // --- State ---
    hasFocus = false;
    hasPrefix = false;
    hasSuffix = false;
    isValid = true;
    validStatus = "";
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    touched = false;
    formSubmitted = false;
    // --- Events ---
    changed;
    blured;
    focused;
    // --- Custom Validity Getters ---
    get validity() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return {
                badInput: false,
                customError: this.validStatus === 'custom',
                patternMismatch: false,
                rangeOverflow: this.validStatus === 'rangeOverflow',
                rangeUnderflow: this.validStatus === 'rangeUnderflow',
                stepMismatch: this.validStatus === 'stepMismatch',
                tooLong: false,
                tooShort: false,
                typeMismatch: this.validStatus === 'typeMismatch',
                valid: false,
                valueMissing: this.validStatus === 'valueMissing',
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
        this.clearStepTimer();
    }
    componentWillLoad() {
        // Manually check for decimal-places attribute if prop is undefined
        if (this.decimalPlaces === undefined) {
            const decimalPlacesAttr = this.host.getAttribute('decimal-places') || this.host.getAttribute('decimalPlaces');
            if (decimalPlacesAttr !== null) {
                const parsed = Number(decimalPlacesAttr);
                if (!isNaN(parsed) && parsed >= 0) {
                    this.decimalPlaces = parsed;
                }
            }
        }
        this.noNativeValidity = fnAssignPropFromAlias(this.host, 'no-native-validity') ?? this.noNativeValidity;
        this.initialValue = this.value;
        this.handleSlotChange();
        // [수정] 초기 유효성 검사를 componentWillLoad에서 수행합니다.
        this.updateValidityState();
    }
    componentDidLoad() {
        if (this.autofocus) {
            requestAnimationFrame(() => this.input?.focus());
        }
        // [수정] 불필요한 리렌더링을 유발하는 updateValidityState() 호출을 제거합니다.
    }
    // --- Form Associated Callbacks ---
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
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
    handleValueChange(newValue, oldValue) {
        this.updateValidityState();
        if (newValue !== oldValue) {
            this.emitChangedEvent();
        }
    }
    handleConstraintChange() {
        this.updateValidityState();
    }
    // --- Public Methods ---
    async setFocus() {
        this.input?.focus();
    }
    async setBlur() {
        this.input?.blur();
    }
    async stepUp(n = 1) {
        for (let i = 0; i < n; i++) {
            this.performStep(1);
        }
    }
    async stepDown(n = 1) {
        for (let i = 0; i < n; i++) {
            this.performStep(-1);
        }
    }
    async setClear() {
        this.value = '';
    }
    async checkValidity() {
        this.updateValidityState();
        return this.internals.checkValidity();
    }
    async reportValidity() {
        this.updateValidityState();
        return this.internals.reportValidity();
    }
    async setCustomError() {
        this.customSettingError();
    }
    async clearCustomError() {
        if (!this.isValid && this.validStatus === 'custom') {
            this.validStatus = '';
        }
        this.updateValidityState();
    }
    async getStatus() {
        return this.isValid ? '' : this.validStatus;
    }
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
        this.focused.emit({
            value: this.parseValue(this.value),
            isValid: this.isValid,
            status: this.validStatus
        });
    };
    handleBlur = () => {
        this.hasFocus = false;
        this.touched = true;
        const currentValue = this.parseValue(this.value);
        if (currentValue !== null) {
            const clampedValue = this.clampValue(currentValue);
            const formattedValue = this.formatValue(clampedValue);
            if (this.value.toString() !== formattedValue) {
                this.value = formattedValue;
            }
        }
        else if (String(this.value).trim() !== '') {
            this.value = '';
        }
        this.updateValidityState();
        this.blured.emit({
            value: this.parseValue(this.value),
            isValid: this.isValid,
            status: this.validStatus
        });
    };
    handleInput = (e) => {
        const target = e.target;
        this.touched = true;
        this.value = target.value;
    };
    handleKeydown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.performStep(1);
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.performStep(-1);
        }
        else if (e.key === 'Enter') {
            this.handleBlur();
        }
    };
    handleStepMouseDown = (direction, e) => {
        e.preventDefault();
        if (this.disabled || this.readonly) {
            return;
        }
        this.performStep(direction);
        this.clearStepTimer();
        this.stepTimer = setInterval(() => this.performStep(direction), this.stepInterval);
    };
    handleStepMouseUpOrLeave = () => {
        this.clearStepTimer();
        this.input?.focus();
    };
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.formSubmitted = true;
        this.touched = true;
        this.updateValidityState();
    };
    handleSlotChange = () => {
        this.hasPrefix = this.host.querySelector('[slot="prefix"]') !== null;
        this.hasSuffix = this.host.querySelector('[slot="suffix"]') !== null;
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
        this.changed.emit({
            value: this.parseValue(this.value),
            isValid: this.isValid,
            status: this.validStatus,
        });
    }
    performStep(direction) {
        this.touched = true;
        const currentValue = this.parseValue(this.value) ?? 0;
        const step = this.step || 1;
        const precision = Math.max(this.getDecimalPlaces(currentValue), this.getDecimalPlaces(step));
        const multiplier = Math.pow(10, precision);
        const nextValue = (Math.round(currentValue * multiplier) + direction * Math.round(step * multiplier)) / multiplier;
        const clampedValue = this.clampValue(nextValue);
        this.value = this.formatValue(clampedValue);
    }
    parseValue(value) {
        if (value === null || value === undefined || String(value).trim() === '') {
            return null;
        }
        const num = Number(value);
        return isNaN(num) ? null : num;
    }
    formatValue(num) {
        if (num === null) {
            return '';
        }
        let valueToFormat = num;
        const propDecimalPlaces = this.decimalPlaces !== undefined && this.decimalPlaces !== null
            ? Number(this.decimalPlaces)
            : undefined;
        // If decimalPlaces is explicitly set and is a valid number (including 0), use it. Otherwise, calculate from step and num.
        const decimalPlaces = (typeof propDecimalPlaces === 'number' && !isNaN(propDecimalPlaces) && propDecimalPlaces >= 0)
            ? propDecimalPlaces
            : Math.max(this.getDecimalPlaces(this.step), this.getDecimalPlaces(num));
        const multiplier = Math.pow(10, decimalPlaces);
        switch (this.rounding) {
            case 'ceil':
                valueToFormat = Math.ceil(num * multiplier) / multiplier;
                break;
            case 'floor':
                valueToFormat = Math.floor(num * multiplier) / multiplier;
                break;
            case 'round':
                valueToFormat = Math.round(num * multiplier) / multiplier;
                break;
        }
        const result = valueToFormat.toFixed(decimalPlaces);
        return result;
    }
    clampValue(num) {
        return Math.max(this.min, Math.min(this.max, num));
    }
    getDecimalPlaces(value) {
        const str = String(value);
        const decimalIndex = str.indexOf('.');
        return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
    }
    clearStepTimer() {
        if (this.stepTimer) {
            clearInterval(this.stepTimer);
            this.stepTimer = null;
        }
    }
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    updateValidityState() {
        // (1) Programmatic custom error takes priority — the message shown for
        // `reportValidity()` / form submission is the slot's own text if present,
        // else a neutral default. Mirrors autocomplete's setCustomError flow.
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
            this.internals?.setValidity({ customError: true }, msg);
            this.internals?.setFormValue(String(this.value ?? ''), String(this.value ?? ''));
            return;
        }
        let currentIsValid = true;
        let currentValidStatus = "";
        const valueStr = String(this.value).trim();
        const numValue = this.parseValue(this.value);
        if (this.required && valueStr === '') {
            currentIsValid = false;
            currentValidStatus = "valueMissing";
        }
        else if (valueStr !== '' && numValue === null) {
            currentIsValid = false;
            currentValidStatus = "typeMismatch";
        }
        else if (numValue !== null) {
            if (this.min !== undefined && numValue < this.min) {
                currentIsValid = false;
                currentValidStatus = "rangeUnderflow";
            }
            else if (this.max !== undefined && numValue > this.max) {
                currentIsValid = false;
                currentValidStatus = "rangeOverflow";
            }
            else if (this.step > 0 && this.step !== 1) {
                const base = this.min ?? 0;
                const remainder = Math.abs(numValue - base) % this.step;
                const tolerance = 1e-9;
                if (remainder > tolerance && Math.abs(remainder - this.step) > tolerance) {
                    currentIsValid = false;
                    currentValidStatus = "stepMismatch";
                }
            }
        }
        this.isValid = currentIsValid;
        this.validStatus = currentValidStatus;
        const validityMessage = this.getErrorMessage(this.validStatus);
        this.internals.setFormValue(valueStr === '' ? null : valueStr, valueStr === '' ? null : valueStr);
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
        // Force visual invalid state immediately — developer-triggered errors
        // shouldn't wait for the user to blur or submit the form.
        this.touched = true;
        // Slot UI is the surface for programmatic errors, regardless of the
        // noNativeValidity toggle (which only gates the browser-driven popup).
        this.hasSlotErrorMessage =
            !!this.host.querySelector('[slot="error"]') &&
                (this.host.querySelector('[slot="error"]')?.textContent?.trim().length ?? 0) > 0;
        this.updateValidityState();
    }
    getErrorMessage(type) {
        const messages = {
            valueMissing: "This field is required",
            typeMismatch: "Please enter a valid number.",
            rangeUnderflow: `Value must be at least ${this.min}`,
            rangeOverflow: `Value cannot exceed ${this.max}`,
            stepMismatch: `Value must be a multiple of ${this.step} starting from ${this.min ?? 0}`,
            custom: 'Invalid by custom'
        };
        return messages[type] || '';
    }
    render() {
        const wrapperClasses = {
            'input': true,
            'input--small': this.size === "small",
            'input--medium': this.size === "medium",
            'input--large': this.size === "large",
            'input--disabled': this.disabled,
            'input--readonly': this.readonly,
            'input--focused': this.hasFocus,
            'input--borderless': this.borderless,
            'input--empty': this.value === '' || this.value === null || this.value === undefined,
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
        return (h("div", { key: 'beade4d88f99f87eed5a290e11715f820a229e60', class: "input--item input--item-vertical" }, this.label?.trim().length > 0 && (h("span", { key: '893997b4d3606115092a20151916014407657245', class: "input--label" }, this.required && h("span", { key: 'cb3ab8aeda3947b0fd078902f6dc10a5f20bd23e', class: "required" }, "*"), this.label)), h("div", { key: '26fc611818d60f5e07da66e972b32856b8743415', class: "input-wrapper" }, h("div", { key: 'cff0249640a492406f15aa2235d44bc0cba555d7', class: wrapperClasses }, h("span", { key: 'ef4a2f8d2247894a8740b60013f8bd4f2933413b', class: "prefix-wrapper", style: { display: this.hasPrefix ? 'flex' : 'none' } }, h("slot", { key: '7d511baac5496621d869f272c58ee673ee9ffb69', name: "prefix", onSlotchange: this.handleSlotChange })), h("input", { key: '00d490e6cdc4703dccc7a7d81ac41e8757d88a92', ref: (el) => (this.input = el), class: "input--control", type: "text", inputMode: "decimal", name: this.name, disabled: this.disabled, readOnly: this.readonly, required: this.required, autoFocus: this.autofocus, min: this.min, max: this.max, step: this.step, value: this.value, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeydown }), h("span", { key: 'd03f97653a15a0901f6092c311bac8ea55b86e27', class: "suffix-wrapper", style: { display: this.hasSuffix ? 'flex' : 'none' } }, h("slot", { key: '8eeb381e5546b56488818d8f37aa0a1acaf01d46', name: "suffix", onSlotchange: this.handleSlotChange })), h("div", { key: '830d21bbe3ac1f29a007326c90652e3cc6907b25', class: "input-number-handle" }, h("span", { key: '54d6c1b60be3aa47948fd43ceb9c8e5733151136', class: "handle handle-up", onMouseDown: (e) => this.handleStepMouseDown(1, e), onMouseUp: this.handleStepMouseUpOrLeave, onMouseLeave: this.handleStepMouseUpOrLeave }, h("sy-icon", { key: '57e2471499ce071cc614b1f31b020464500fbb49', size: "xsmall" }, h("svg", { key: '641ba1e3e87b3b8bc8fa46bc892efc56532ccbc0', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '0579637f6ba658f22c8fd9c623ba829f95c60ad8', fill: "currentColor", d: "M303.5 207C312.9 197.6 328.1 197.6 337.4 207L497.4 367C506.8 376.4 506.8 391.6 497.4 400.9C488 410.2 472.8 410.3 463.5 400.9L320.5 257.9L177.5 400.9C168.1 410.3 152.9 410.3 143.6 400.9C134.3 391.5 134.2 376.3 143.6 367L303.6 207z" })))), h("span", { key: 'df7be8f80c6bdb106dad5846983d046cc57d996e', class: "handle handle-down", onMouseDown: (e) => this.handleStepMouseDown(-1, e), onMouseUp: this.handleStepMouseUpOrLeave, onMouseLeave: this.handleStepMouseUpOrLeave }, h("sy-icon", { key: '11f90bf89fb86d89c6665ceb1113be10ec86b136', size: "xsmall" }, h("svg", { key: '7dd07510bedb6a2a23fe5fcac5a33a09903314f2', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '15e8d577275e83893b732cb560ecfcabaf515140', fill: "currentColor", d: "M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z" })))))), h("div", { key: '7b4950ae132a9be77e3ad37d50c950f4d6a9c531', class: errorContainerClasses }, h("slot", { key: 'c45b42f24684b95688dad5926bbebab5c25da150', name: "error", onSlotchange: this.handleSlotChange })))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["handleValueChange"],
        "min": ["handleConstraintChange"],
        "max": ["handleConstraintChange"],
        "step": ["handleConstraintChange"],
        "required": ["handleConstraintChange"]
    }; }
    static get style() { return syInputNumberCss; }
}, [326, "sy-input-number", {
        "autofocus": [4],
        "borderless": [516],
        "decimalPlaces": [1026, "decimal-places"],
        "disabled": [1540],
        "label": [1],
        "max": [2],
        "min": [2],
        "name": [1],
        "readonly": [516],
        "required": [516],
        "rounding": [1],
        "size": [513],
        "status": [1],
        "step": [2],
        "value": [1544],
        "noNativeValidity": [1028, "nonativevalidity"],
        "hasFocus": [32],
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
        "stepUp": [64],
        "stepDown": [64],
        "setClear": [64],
        "checkValidity": [64],
        "reportValidity": [64],
        "setCustomError": [64],
        "clearCustomError": [64],
        "getStatus": [64]
    }, [[0, "focus", "handleHostFocus"], [2, "invalid", "handleInvalidEvent"]], {
        "value": ["handleValueChange"],
        "min": ["handleConstraintChange"],
        "max": ["handleConstraintChange"],
        "step": ["handleConstraintChange"],
        "required": ["handleConstraintChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-input-number", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-input-number":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyInputNumber);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyInputNumber as S, defineCustomElement as d };
