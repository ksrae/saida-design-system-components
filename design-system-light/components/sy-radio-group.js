import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const syRadioGroupCss = "@charset \"UTF-8\";sy-radio-group.sc-sy-radio-group-h{display:inline-flex;flex-direction:column;align-items:flex-start}sy-radio-group.sc-sy-radio-group-h .radio-group-container.sc-sy-radio-group{display:contents}sy-radio-group.sc-sy-radio-group-h fieldset.sc-sy-radio-group{width:100%;padding:0px;border:var(--border-small) none;margin:0px;display:flex}sy-radio-group.sc-sy-radio-group-h fieldset.radio-group-position-horizontal.sc-sy-radio-group{flex-direction:row;gap:var(--spacing-xsmall)}sy-radio-group.sc-sy-radio-group-h fieldset.radio-group-position-horizontal.is-button-group.sc-sy-radio-group{gap:0}sy-radio-group.sc-sy-radio-group-h fieldset.radio-group-position-vertical.sc-sy-radio-group{flex-direction:column;gap:var(--spacing-3xsmall)}sy-radio-group.sc-sy-radio-group-h fieldset.radio-group-position-vertical.is-button-group.sc-sy-radio-group{gap:0}sy-radio-group.sc-sy-radio-group-h .error-container.sc-sy-radio-group{color:var(--required);display:none;padding-top:var(--spacing-3xsmall)}sy-radio-group.sc-sy-radio-group-h .error-container.visible-error.sc-sy-radio-group{display:flex}";

const SyRadioGroup$1 = /*@__PURE__*/ proxyCustomElement(class SyRadioGroup extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
    }
    get host() { return this; }
    internals;
    slot;
    radioList = [];
    radioButtonList = [];
    initialValue = '';
    // --- Props ---
    disabled = false;
    defaultValue = '';
    readonly = false;
    required = false;
    size = 'medium';
    position = 'horizontal';
    variant = 'outlined';
    name = '';
    noNativeValidity = false;
    // --- State ---
    selectedValue = '';
    touched = false;
    formSubmitted = false;
    isValid = true;
    validStatus = '';
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    isButtonGroup = false;
    // --- Events ---
    changed;
    // --- Custom Validity Getters ---
    get validity() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return {
                badInput: false,
                customError: true,
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
            return this.getErrorMessage(this.validStatus);
        }
        return this.internals?.validationMessage;
    }
    get willValidate() {
        return this.internals?.willValidate;
    }
    // --- Lifecycle Methods ---
    connectedCallback() {
        if (this.host.attachInternals) {
            this.internals = this.host.attachInternals();
        }
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
        this.defaultValue = fnAssignPropFromAlias(this.host, 'default-value') ?? this.defaultValue;
        this.noNativeValidity = fnAssignPropFromAlias(this.host, 'no-native-validity') ?? this.noNativeValidity;
        this.initialValue = this.defaultValue;
        this.selectedValue = this.defaultValue;
        // [수정] 첫 렌더링 이전에 isButtonGroup 상태를 설정합니다.
        // hostElement를 직접 쿼리하여 light DOM에 sy-radio-button이 있는지 확인합니다.
        this.isButtonGroup = !!this.host.querySelector('sy-radio-button');
        this.handleSlotChange();
        this.updateValidityState();
    }
    componentDidLoad() {
        this.setRadioList();
        if (this.defaultValue) {
            this.setDefaultSelectedValue();
        }
        if (this.disabled) {
            this.updateRadioDisabled();
        }
        if (this.readonly) {
            this.updateRadioReadonly();
        }
        if (this.variant) {
            this.updateRadioButtonVariant();
        }
        if (this.size) {
            this.updateRadioButtonSize();
        }
        if (this.selectedValue) {
            this.emitChangedEvent();
        }
    }
    // --- Form Associated Callbacks ---
    formAssociatedCallback() {
        this.updateFormValue();
    }
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    formResetCallback() {
        this.selectedValue = this.initialValue;
        this.touched = false;
        this.formSubmitted = false;
        this.updateRadioCheck();
        this.updateFormValue();
        this.updateValidityState();
    }
    formStateRestoreCallback(state) {
        this.selectedValue = state;
        this.updateRadioCheck();
        this.updateValidityState();
    }
    // --- Watchers ---
    handleDisabledChange() {
        this.updateRadioDisabled();
    }
    handleReadonlyChange() {
        this.updateRadioReadonly();
    }
    handleVariantChange() {
        this.updateRadioButtonVariant();
    }
    handleSizeChange() {
        this.updateRadioButtonSize();
    }
    handleDefaultValueChange() {
        this.setDefaultSelectedValue();
    }
    handleSelectedValueChange() {
        this.updateFormValue();
    }
    // --- Public Methods ---
    async checkValidity() {
        this.updateValidityState();
        return this.internals.checkValidity();
    }
    async reportValidity() {
        this.updateValidityState();
        if (!this.isValid && this.radioList.length > 0) {
            const firstRadio = this.radioList[0];
            firstRadio?.querySelector('input')?.focus();
        }
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
    handleRadioSelected(e) {
        const target = e.target;
        if (!this.host.contains(target) || (target.tagName !== 'SY-RADIO' && target.tagName !== 'SY-RADIO-BUTTON'))
            return;
        e.stopPropagation();
        if (this.readonly) {
            return;
        }
        this.selectedValue = e.detail;
        if (this.selectedValue) {
            this.touched = true;
            this.updateValidityState();
            this.updateFormValue();
            this.emitChangedEvent();
        }
        this.updateRadioCheck();
    }
    handleInvalidEvent(e) {
        this.formSubmitted = true;
        this.isValid = false;
        const errorSlotElement = this.host.querySelector('[slot="error"]');
        const slotHasContent = !!errorSlotElement &&
            ((errorSlotElement.textContent?.trim().length ?? 0) > 0 || errorSlotElement.children.length > 0);
        // Same clear-cut toggle as sy-input / sy-input-number / sy-textarea:
        //   noNativeValidity=true  → native popup suppressed, slot = UI
        //   noNativeValidity=false → browser handles popup; do NOT preventDefault
        //                            (per HTML spec, preventDefault on any invalid
        //                            event suppresses popups on the entire form).
        if (this.noNativeValidity) {
            e.preventDefault();
            e.stopPropagation();
            this.hasSlotErrorMessage = slotHasContent;
            if (slotHasContent) {
                this.internals?.setValidity({ customError: true }, ' ');
            }
        }
        else {
            this.hasSlotErrorMessage = false;
        }
        this.updateValidityState();
    }
    // --- Event Handlers ---
    handleFormSubmit = (_e) => {
        this.formSubmitted = true;
        this.updateValidityState();
    };
    handleSlotChange = () => {
        this.setRadioList();
        this.handleCustomErrorSlot();
    };
    handleCustomErrorSlot = () => {
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
            value: this.selectedValue,
            isValid: this.isValid,
            status: this.validStatus
        });
    }
    setRadioList() {
        if (!this.slot)
            return;
        const assignedElements = this.slot.assignedElements();
        this.radioList = [];
        this.radioButtonList = [];
        assignedElements.forEach((element) => {
            const tagName = element.tagName?.toLowerCase();
            if (tagName === 'sy-radio') {
                this.radioList.push(element);
            }
            else if (tagName === 'sy-radio-button') {
                this.radioButtonList.push(element);
            }
        });
        // [수정] 여기서 isButtonGroup 상태를 변경하는 코드를 제거합니다.
        // 상태는 componentWillLoad에서 한 번만 설정하는 것으로 충분합니다.
        // this.isButtonGroup = this.radioButtonList.length > 0;
    }
    setDefaultSelectedValue() {
        this.selectedValue = this.defaultValue;
        if (this.selectedValue) {
            this.updateValidityState();
            this.emitChangedEvent();
        }
        this.updateRadioCheck();
    }
    updateRadioReadonly() {
        this.radioList?.forEach((radio) => {
            radio.readonly = this.readonly;
        });
    }
    updateRadioCheck() {
        this.radioList?.forEach((radio) => {
            radio.checked = radio.value === this.selectedValue;
        });
        this.radioButtonList?.forEach((radioButton) => {
            radioButton.checked = radioButton.value === this.selectedValue;
        });
    }
    updateRadioDisabled() {
        this.radioList?.forEach((radio) => {
            radio.disabled = this.disabled;
        });
        this.radioButtonList?.forEach((radioButton) => {
            radioButton.disabled = this.disabled;
        });
    }
    updateRadioButtonVariant() {
        this.radioButtonList?.forEach((radioButton) => {
            radioButton.variant = this.variant;
        });
    }
    updateRadioButtonSize() {
        this.radioButtonList?.forEach((radioButton) => {
            radioButton.size = this.size;
        });
    }
    updateFormValue() {
        if (this.internals) {
            this.internals.setFormValue(this.selectedValue, this.selectedValue);
        }
    }
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    customSettingError() {
        this.isValid = false;
        this.validStatus = 'custom';
        // Force visual invalid state immediately — developer-triggered errors
        // shouldn't wait for the user to interact with any radio.
        this.touched = true;
        // Slot UI becomes the surface for programmatic errors regardless of the
        // noNativeValidity toggle.
        const errorSlot = this.host.querySelector('[slot="error"]');
        this.hasSlotErrorMessage =
            !!errorSlot && ((errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0);
        this.updateValidityState();
    }
    updateValidityState() {
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
            this.internals?.setValidity({ customError: true }, msg);
            this.internals?.setFormValue(this.selectedValue, this.selectedValue);
            return;
        }
        let currentIsValid = true;
        let currentValidStatus = "";
        if (this.required && !this.selectedValue) {
            currentIsValid = false;
            currentValidStatus = "valueMissing";
        }
        this.isValid = currentIsValid;
        this.validStatus = currentValidStatus;
        const validityMessage = this.getErrorMessage(this.validStatus);
        this.internals.setFormValue(this.selectedValue, this.selectedValue);
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
    getErrorMessage(type) {
        const messages = {
            valueMissing: "Please select one of these options",
            custom: 'Invalid by custom',
            '': ''
        };
        return messages[type] || '';
    }
    // --- Render Method ---
    render() {
        const fieldsetClasses = {
            'radio-group': true,
            'radio-group-position-horizontal': this.position === 'horizontal',
            'radio-group-position-vertical': this.position === 'vertical',
            'is-button-group': this.isButtonGroup,
        };
        const errorContainerClasses = {
            'error-container': true,
            'popup-error-container': this.hasPopupErrorComponent,
            'text-error-container': !this.hasPopupErrorComponent,
            'visible-error': (this.touched || this.formSubmitted) && !this.isValid
        };
        return (h("div", { key: '10934b7d6f0707cc5c1cc34b34a80f663f35669a', class: "radio-group-container" }, h("fieldset", { key: 'b7b76d196dc8a516dfaf01ab9fd99071981e11af', role: "radiogroup", class: fieldsetClasses }, h("slot", { key: 'ec645770604391ecb45fe5b27471be0511d2d801', ref: (el) => (this.slot = el), onSlotchange: this.handleSlotChange })), h("div", { key: '94974a9dbd40c5e9432a58ba63970bc6429c6ee8', class: errorContainerClasses }, h("slot", { key: '663b46b33a97339859ac43f0af20ec6f8a80f0c0', name: "error", onSlotchange: this.handleCustomErrorSlot }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "readonly": ["handleReadonlyChange"],
        "variant": ["handleVariantChange"],
        "size": ["handleSizeChange"],
        "defaultValue": ["handleDefaultValueChange"],
        "selectedValue": ["handleSelectedValueChange"]
    }; }
    static get style() { return syRadioGroupCss; }
}, [326, "sy-radio-group", {
        "disabled": [1540],
        "defaultValue": [1025, "defaultvalue"],
        "readonly": [516],
        "required": [516],
        "size": [513],
        "position": [1],
        "variant": [1],
        "name": [1],
        "noNativeValidity": [1028, "nonativevalidity"],
        "selectedValue": [32],
        "touched": [32],
        "formSubmitted": [32],
        "isValid": [32],
        "validStatus": [32],
        "hasSlotErrorMessage": [32],
        "hasPopupErrorComponent": [32],
        "isButtonGroup": [32],
        "checkValidity": [64],
        "reportValidity": [64],
        "setCustomError": [64],
        "clearCustomError": [64],
        "getStatus": [64]
    }, [[16, "selected", "handleRadioSelected"], [2, "invalid", "handleInvalidEvent"]], {
        "disabled": ["handleDisabledChange"],
        "readonly": ["handleReadonlyChange"],
        "variant": ["handleVariantChange"],
        "size": ["handleSizeChange"],
        "defaultValue": ["handleDefaultValueChange"],
        "selectedValue": ["handleSelectedValueChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-radio-group"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-radio-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyRadioGroup$1);
            }
            break;
    } });
}

const SyRadioGroup = SyRadioGroup$1;
const defineCustomElement = defineCustomElement$1;

export { SyRadioGroup, defineCustomElement };
