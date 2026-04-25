import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syTextareaCss = "@charset \"UTF-8\";.sc-sy-textarea:root .textarea-container.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.sc-sy-textarea{display:grid;grid-template-columns:auto 1fr auto}.sc-sy-textarea:root .textarea-container.sc-sy-textarea .textarea-clear.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea-clear.sc-sy-textarea{display:none}.sc-sy-textarea:root .textarea-container.sc-sy-textarea .textarea-clear.scroll.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea-clear.scroll.sc-sy-textarea{right:var(--spacing-medium) !important}.sc-sy-textarea:root .textarea-container.sc-sy-textarea .textarea--label.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea--label.sc-sy-textarea{display:inline-flex;padding-right:var(--spacing-xsmall);white-space:nowrap;gap:var(--spacing-3xsmall);align-items:center}.sc-sy-textarea:root .textarea-container.sc-sy-textarea .textarea--label.sc-sy-textarea .required.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea--label.sc-sy-textarea .required.sc-sy-textarea{color:var(--textarea-label-required-enabled)}.sc-sy-textarea:root .textarea-container.sc-sy-textarea .textarea--info.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea--info.sc-sy-textarea{grid-row:2/3;grid-column:2/3}.sc-sy-textarea:root .textarea-container.textarea--nolabel.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--nolabel.sc-sy-textarea{grid-template-columns:1fr}.sc-sy-textarea:root .textarea-container.textarea--nolabel.sc-sy-textarea .textarea--info.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--nolabel.sc-sy-textarea .textarea--info.sc-sy-textarea{grid-area:auto}.sc-sy-textarea:root .textarea-container.textarea--vertical.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--vertical.sc-sy-textarea{display:flex;flex-direction:column;padding:0px;width:100%}.sc-sy-textarea:root .textarea-container.textarea--vertical.sc-sy-textarea .textarea--label.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--vertical.sc-sy-textarea .textarea--label.sc-sy-textarea{display:inline-flex;gap:var(--spacing-3xsmall)}.sc-sy-textarea:root .textarea-container.textarea--borderless.sc-sy-textarea .textarea.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--borderless.sc-sy-textarea .textarea.sc-sy-textarea{border:var(--border-small) transparent;background-color:transparent;outline:none}.sc-sy-textarea:root .textarea-container.textarea--borderless.sc-sy-textarea .textarea.textarea--valid.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--borderless.sc-sy-textarea .textarea.textarea--valid.sc-sy-textarea{border:var(--border-small) var(--textarea-form-field-border-vaild)}.sc-sy-textarea:root .textarea-container.textarea--borderless.sc-sy-textarea .textarea.textarea--invalid.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--borderless.sc-sy-textarea .textarea.textarea--invalid.sc-sy-textarea{border:var(--border-small) var(--textarea-form-field-border-invaild)}.sc-sy-textarea:root .textarea-container.textarea--clearable.sc-sy-textarea .textarea-box.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--clearable.sc-sy-textarea .textarea-box.sc-sy-textarea{position:relative}.sc-sy-textarea:root .textarea-container.textarea--clearable.sc-sy-textarea .textarea-box.sc-sy-textarea .textarea-clear.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--clearable.sc-sy-textarea .textarea-box.sc-sy-textarea .textarea-clear.sc-sy-textarea{position:absolute;display:none;align-content:center;justify-content:center;background:transparent;cursor:var(--cursor-button)}.sc-sy-textarea:root .textarea-container.textarea--clearable.sc-sy-textarea .textarea-box.sc-sy-textarea:hover .textarea-clear.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--clearable.sc-sy-textarea .textarea-box.sc-sy-textarea:hover .textarea-clear.sc-sy-textarea{position:absolute;display:flex;align-items:center;top:var(--spacing-2xsmall);right:var(--spacing-2xsmall);color:var(--textarea-form-clearable-icon-enabled)}.sc-sy-textarea:root .textarea-container.textarea--clearable.sc-sy-textarea .textarea-box.sc-sy-textarea:hover .textarea-clear.sc-sy-textarea:hover,.sc-sy-textarea-h .textarea-container.textarea--clearable.sc-sy-textarea .textarea-box.sc-sy-textarea:hover .textarea-clear.sc-sy-textarea:hover{color:var(--textarea-form-clearable-icon-hover)}.sc-sy-textarea:root .textarea-container.textarea--clearable.sc-sy-textarea .textarea.sc-sy-textarea,.sc-sy-textarea-h .textarea-container.textarea--clearable.sc-sy-textarea .textarea.sc-sy-textarea{padding-right:var(--spacing-xlarge)}.sc-sy-textarea:root .textarea-container.sc-sy-textarea textarea.sc-sy-textarea::placeholder,.sc-sy-textarea-h .textarea-container.sc-sy-textarea textarea.sc-sy-textarea::placeholder{color:var(--textarea-form-field-text-placeholder)}.sc-sy-textarea:root .textarea.sc-sy-textarea,.sc-sy-textarea-h .textarea.sc-sy-textarea{background-color:var(--textarea-form-field-background-enabled);border:var(--border-small) var(--textarea-form-field-border-enabled);color:var(--textarea-form-field-text-enabled);border-radius:var(--border-radius-medium);box-sizing:border-box;display:flex;outline:none;height:100%;min-width:100px;min-height:32px}.sc-sy-textarea:root .textarea.textarea--valid.sc-sy-textarea,.sc-sy-textarea-h .textarea.textarea--valid.sc-sy-textarea{border:var(--border-small) var(--textarea-form-field-border-vaild)}.sc-sy-textarea:root .textarea.textarea--invalid.sc-sy-textarea,.sc-sy-textarea-h .textarea.textarea--invalid.sc-sy-textarea{border:var(--border-small) var(--textarea-form-field-border-invaild)}.sc-sy-textarea:root .textarea.sc-sy-textarea:hover,.sc-sy-textarea-h .textarea.sc-sy-textarea:hover{color:var(--textarea-form-field-text-hover);border:var(--border-small) var(--textarea-form-field-border-hover)}.sc-sy-textarea:root .textarea[disabled].sc-sy-textarea,.sc-sy-textarea-h .textarea[disabled].sc-sy-textarea{background-color:var(--textarea-form-field-background-disabled);border:var(--border-small) var(--textarea-form-field-border-disabled);color:var(--textarea-form-field-text-disabled)}.sc-sy-textarea:root .textarea[readonly].sc-sy-textarea,.sc-sy-textarea-h .textarea[readonly].sc-sy-textarea{background-color:var(--textarea-form-field-background-readonly);border:var(--border-small) var(--textarea-form-field-border-readonly);color:var(--textarea-form-field-text-readonly)}.sc-sy-textarea:root .textarea[readonly].sc-sy-textarea:focus,.sc-sy-textarea:root .textarea[readonly].sc-sy-textarea:focus-visible,.sc-sy-textarea-h .textarea[readonly].sc-sy-textarea:focus,.sc-sy-textarea-h .textarea[readonly].sc-sy-textarea:focus-visible{background-color:var(--textarea-form-field-background-readonly);border:var(--border-small) var(--textarea-form-field-border-readonly);outline:none}.sc-sy-textarea:root .textarea.sc-sy-textarea:focus,.sc-sy-textarea:root .textarea.sc-sy-textarea:focus-visible,.sc-sy-textarea-h .textarea.sc-sy-textarea:focus,.sc-sy-textarea-h .textarea.sc-sy-textarea:focus-visible{color:var(--textarea-form-field-text-focused);border:var(--border-small) var(--textarea-form-field-focusoutline);outline:var(--border-small) var(--textarea-form-field-focusoutline)}.sc-sy-textarea:root .textarea.sc-sy-textarea:focus.textarea--valid,.sc-sy-textarea:root .textarea.sc-sy-textarea:focus-visible.textarea--valid,.sc-sy-textarea-h .textarea.sc-sy-textarea:focus.textarea--valid,.sc-sy-textarea-h .textarea.sc-sy-textarea:focus-visible.textarea--valid{border:var(--border-small) var(--textarea-form-field-border-vaild);outline:var(--border-small) var(--focus-outline) !important}.sc-sy-textarea:root .textarea.sc-sy-textarea:focus.textarea--invalid,.sc-sy-textarea:root .textarea.sc-sy-textarea:focus-visible.textarea--invalid,.sc-sy-textarea-h .textarea.sc-sy-textarea:focus.textarea--invalid,.sc-sy-textarea-h .textarea.sc-sy-textarea:focus-visible.textarea--invalid{border:var(--border-small) var(--textarea-form-field-border-invaild);outline:var(--border-small) var(--focus-outline) !important}.sc-sy-textarea:root .textarea--small.sc-sy-textarea,.sc-sy-textarea-h .textarea--small.sc-sy-textarea{padding:var(--spacing-4xsmall) var(--spacing-2xsmall);border-radius:var(--border-radius-small);font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.sc-sy-textarea:root .textarea--small.sc-sy-textarea .textarea-clear.sc-sy-textarea,.sc-sy-textarea-h .textarea--small.sc-sy-textarea .textarea-clear.sc-sy-textarea{top:var(--spacing-2xsmall);right:var(--spacing-2xsmall)}.sc-sy-textarea:root .textarea--medium.sc-sy-textarea,.sc-sy-textarea-h .textarea--medium.sc-sy-textarea{padding:var(--spacing-3xsmall) var(--spacing-xsmall);font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px}.sc-sy-textarea:root .textarea--medium.sc-sy-textarea .textarea-clear.sc-sy-textarea,.sc-sy-textarea-h .textarea--medium.sc-sy-textarea .textarea-clear.sc-sy-textarea{top:var(--spacing-xsmall);right:var(--spacing-xsmall)}.sc-sy-textarea:root .textarea--large.sc-sy-textarea,.sc-sy-textarea-h .textarea--large.sc-sy-textarea{padding:var(--spacing-2xsmall) var(--spacing-small);font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px}.sc-sy-textarea:root .textarea--large.sc-sy-textarea .textarea-clear.sc-sy-textarea,.sc-sy-textarea-h .textarea--large.sc-sy-textarea .textarea-clear.sc-sy-textarea{top:var(--spacing-small);right:var(--spacing-small)}.sc-sy-textarea:root .textarea--info.sc-sy-textarea,.sc-sy-textarea-h .textarea--info.sc-sy-textarea{height:fit-content;display:flex;align-items:center;justify-content:space-between}.sc-sy-textarea:root .textarea--info.sc-sy-textarea .textarea--messsage.sc-sy-textarea,.sc-sy-textarea-h .textarea--info.sc-sy-textarea .textarea--messsage.sc-sy-textarea{display:inline-flex;align-items:center}.sc-sy-textarea:root .textarea--info.sc-sy-textarea .textarea--messsage.sc-sy-textarea .message.sc-sy-textarea,.sc-sy-textarea-h .textarea--info.sc-sy-textarea .textarea--messsage.sc-sy-textarea .message.sc-sy-textarea{color:var(--textarea-form-message-text-enabled);height:fit-content;margin:0px}.textarea-container.sc-sy-textarea{display:flex;flex-direction:column}.textarea-container.sc-sy-textarea .textarea--count.sc-sy-textarea{color:var(--textarea-form-counter-text-enabled);display:inline-flex;align-items:center}.sc-sy-textarea-h textarea.sc-sy-textarea{width:100%}.textarea--resize-none.sc-sy-textarea{resize:none}.textarea--resize-horizontal.sc-sy-textarea{resize:horizontal;overflow-y:auto}.textarea--resize-vertical.sc-sy-textarea{resize:vertical;overflow-y:auto}.textarea--resize-both.sc-sy-textarea{height:auto;resize:both;overflow-y:auto}.textarea--size-small.sc-sy-textarea{font-size:0.875rem;padding:var(--spacing-3xsmall)}.textarea--size-medium.sc-sy-textarea{font-size:1rem;padding:6px}.textarea--size-large.sc-sy-textarea{font-size:1.25rem;padding:var(--spacing-xsmall)}sy-textarea[disabled].sc-sy-textarea-h .textarea--label.sc-sy-textarea{color:var(--textarea-form-field-text-disabled)}sy-textarea[resize=none].sc-sy-textarea-h .textarea-container.sc-sy-textarea{width:auto}sy-textarea[resize=none].sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea-box.sc-sy-textarea{width:-webkit-fill-available}sy-textarea[resize=horizontal].sc-sy-textarea-h .textarea-container.sc-sy-textarea,sy-textarea[resize=vertical].sc-sy-textarea-h .textarea-container.sc-sy-textarea{width:100%}sy-textarea[resize=horizontal].sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea-box.sc-sy-textarea,sy-textarea[resize=vertical].sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea-box.sc-sy-textarea{width:100%}sy-textarea[resize=both].sc-sy-textarea-h .textarea-container.sc-sy-textarea{width:100%}sy-textarea[resize=both].sc-sy-textarea-h .textarea-container.sc-sy-textarea .textarea-box.sc-sy-textarea{width:100%}.error-container.sc-sy-textarea{color:var(--required);display:none}.error-container.visible-error.sc-sy-textarea{display:block}sy-textarea[size=large].sc-sy-textarea-h .textarea--label.sc-sy-textarea{height:var(--component-large)}sy-textarea[size=medium].sc-sy-textarea-h .textarea--label.sc-sy-textarea{height:var(--component-medium)}sy-textarea[size=small].sc-sy-textarea-h .textarea--label.sc-sy-textarea{height:var(--component-small)}";

const SyTextarea$1 = /*@__PURE__*/ proxyCustomElement(class SyTextarea extends H {
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
    textarea;
    initialValue = '';
    // Props
    autofocus = false;
    borderless = false;
    clearable = false;
    counter = false;
    disabled = false;
    label = "";
    max = Number.MAX_SAFE_INTEGER;
    min = 0;
    placeholder = "";
    readonly = false;
    required = false;
    resize = "none";
    rows = 4;
    size = "medium";
    status = 'default';
    value = "";
    name = "";
    noNativeValidity = false;
    // State
    hasScroll = false;
    charCount = 0;
    touched = false;
    formSubmitted = false;
    isValid = true;
    validStatus = "";
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    resizeObserver;
    // Events
    changed;
    blured;
    focused;
    // Lifecycle
    connectedCallback() {
        this.initialValue = this.value || '';
        this.formSubmitListener();
        this.handleSlotChange();
        this.updateValidityState();
    }
    componentWillLoad() {
        this.noNativeValidity = fnAssignPropFromAlias(this.host, 'no-native-validity') ?? this.noNativeValidity;
        this.initialValue = this.value || '';
        this.charCount = this.initialValue.length;
        this.formSubmitListener();
        this.handleSlotChange();
        this.updateValidityState();
    }
    componentDidLoad() {
        this.textarea = this.host.querySelector('textarea');
        if (this.textarea) {
            this.charCount = this.textarea.value?.length ?? 0;
            this.textarea.addEventListener('input', this.handleInput);
            this.textarea.addEventListener('scroll', this.checkForScroll);
            if (this.autofocus) {
                requestAnimationFrame(() => this.textarea?.focus());
            }
            this.setFormValue();
            this.resizeObserver = new ResizeObserver(() => this.checkForScroll());
            this.resizeObserver.observe(this.textarea);
        }
    }
    disconnectedCallback() {
        this.formSubmitListenerRemover();
        if (this.textarea) {
            this.textarea.removeEventListener('input', this.handleInput);
            this.textarea.removeEventListener('scroll', this.checkForScroll);
        }
        if (this.resizeObserver && this.textarea)
            this.resizeObserver.unobserve(this.textarea);
    }
    // Form callbacks
    formAssociatedCallback() {
        this.setFormValue();
    }
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    formResetCallback() {
        if (this.textarea)
            this.textarea.value = this.initialValue;
        this.value = this.initialValue;
        this.charCount = this.initialValue.length;
        this.touched = false;
        this.formSubmitted = false;
        this.updateValidityState();
        this.setFormValue();
    }
    formStateRestoreCallback(state) {
        if (this.textarea)
            this.textarea.value = state;
        this.value = state;
        this.charCount = state.length;
        this.updateValidityState();
    }
    // Public methods
    async setFocus() {
        this.textarea?.focus();
        this.handleFocus();
    }
    async setBlur() {
        this.textarea?.blur();
        this.handleBlur();
    }
    async checkValidity() {
        this.updateValidityState();
        return this.internals ? this.internals.checkValidity() : true;
    }
    async reportValidity() {
        this.updateValidityState();
        return this.internals ? this.internals.reportValidity() : true;
    }
    async setCustomError() {
        this.isValid = false;
        this.validStatus = 'custom';
        // Force immediate visual invalid state without waiting for blur/submit.
        this.touched = true;
        // Slot UI becomes the surface for programmatic errors regardless of the
        // noNativeValidity toggle.
        const errorSlot = this.host.querySelector('[slot="error"]');
        this.hasSlotErrorMessage =
            !!errorSlot && ((errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0);
        if (this.hasSlotErrorMessage) {
            this.host.setAttribute('has-custom-error', '');
        }
        this.updateValidityState();
    }
    async clearCustomError() {
        if (!this.isValid && this.validStatus === 'custom')
            this.validStatus = '';
        // has-custom-error 속성 제거
        this.host.removeAttribute('has-custom-error');
        this.updateValidityState();
    }
    async getStatus() {
        return this.isValid ? '' : this.validStatus;
    }
    // Watchers
    valueChanged() {
        this.charCount = this.value?.length ?? 0;
        this.checkForScroll();
        this.updateValidityState();
        this.setFormValue();
    }
    constraintChanged() {
        this.updateValidityState();
    }
    // Listen invalid event
    handleInvalidEvent(e) {
        this.formSubmitted = true;
        this.isValid = false;
        const errorSlotElement = this.host.querySelector('[slot="error"]');
        const slotHasContent = !!errorSlotElement && (errorSlotElement.textContent?.trim().length ?? 0) > 0;
        // Clear-cut toggle — consistent with sy-input / sy-input-number:
        //   noNativeValidity=true  → suppress browser popup, slot becomes the UI
        //   noNativeValidity=false → let the browser show its native popup
        // Never call preventDefault on the default path: per HTML spec, a single
        // preventDefaulted invalid event suppresses popups on the entire form.
        if (this.noNativeValidity) {
            e.preventDefault();
            e.stopPropagation();
            this.hasSlotErrorMessage = slotHasContent;
            if (slotHasContent) {
                this.host.setAttribute('has-custom-error', '');
                if (this.textarea)
                    this.textarea.setCustomValidity('');
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
    // Helpers
    setFormValue() {
        this.internals?.setFormValue(this.textarea?.value || '');
    }
    formSubmitListener() {
        if (this.internals?.form)
            this.internals.form.addEventListener('submit', this.handleFormSubmit);
    }
    formSubmitListenerRemover() {
        if (this.internals?.form)
            this.internals.form.removeEventListener('submit', this.handleFormSubmit);
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.formSubmitted = true;
        this.updateValidityState();
    };
    handleFocus = () => {
        this.focused.emit({ value: this.value, isValid: this.isValid, status: this.validStatus });
    };
    handleBlur = () => {
        this.updateValidityState();
        this.blured.emit({ value: this.value, isValid: this.isValid, status: this.validStatus });
    };
    checkForScroll = () => {
        if (this.textarea)
            this.hasScroll = this.textarea.scrollHeight > this.textarea.clientHeight;
    };
    handleInput = () => {
        if (this.disabled || this.readonly)
            return;
        if (!this.touched) {
            this.touched = true;
        }
        if (this.textarea) {
            this.value = this.textarea.value;
            this.charCount = this.textarea.value?.length ?? 0;
            this.checkForScroll();
            this.setFormValue();
            this.changedEvent();
        }
    };
    changedEvent() {
        this.changed.emit({ value: this.textarea?.value || '', length: this.charCount, isValid: this.isValid, status: this.validStatus });
    }
    handleIcon = (_) => {
        // sy-icon emits a CustomEvent with detail { value }
        if (this.textarea && this.textarea.value) {
            this.textarea.value = '';
            this.value = '';
            this.charCount = 0;
            this.setFocus();
            this.updateValidityState();
            this.setFormValue();
            this.changedEvent();
        }
    };
    handleSlotChange() {
        const host = this.host;
        this.hasSlotErrorMessage = false;
        this.hasPopupErrorComponent = false;
        const errorSlotElement = host.querySelector('[slot="error"]');
        if (!errorSlotElement)
            return;
        const popupTags = ['sy-tooltip', 'sy-popover', 'sy-popconfirm', 'sy-inline-message'];
        const containsPopup = popupTags.some(tag => !!errorSlotElement.querySelector(tag));
        const isPopupItself = popupTags.includes((errorSlotElement.tagName || '').toLowerCase());
        this.hasPopupErrorComponent = containsPopup || isPopupItself;
        const textContent = errorSlotElement.textContent?.trim();
        this.hasSlotErrorMessage = !!(textContent && textContent.length) || errorSlotElement.children.length > 0;
        // Re-evaluate validity state after slot content changes
        this.updateValidityState();
    }
    getErrorMessage(type) {
        const validityMessage = {
            valueMissing: 'This field is required',
            tooShort: `Value must be at least ${this.min} characters long`,
            tooLong: `Value cannot exceed ${this.max} characters`,
            custom: 'Invalid by custom',
        };
        return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
    }
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    updateValidityState() {
        // (1) Programmatic custom error takes priority — slot text drives the
        // validity message so reportValidity surfaces the same copy the user
        // sees on screen. Mirrors autocomplete's setCustomError flow.
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
            this.internals?.setValidity({ customError: true }, msg);
            this.internals?.setFormValue(this.value || '');
            return;
        }
        this.isValid = true;
        this.validStatus = '';
        if (this.required && (!this.value || this.value.length === 0)) {
            this.isValid = false;
            this.validStatus = 'valueMissing';
        }
        else if (this.value && this.min > 0 && this.value.length < this.min) {
            this.isValid = false;
            this.validStatus = 'tooShort';
        }
        else if (this.value && this.max > 0 && this.value.length > this.max) {
            this.isValid = false;
            this.validStatus = 'tooLong';
        }
        const validityMessage = this.getErrorMessage(this.validStatus);
        if (!this.isValid) {
            if (this.hasSlotErrorMessage) {
                this.host.setAttribute('has-custom-error', '');
                const slotText = this.getSlotErrorText() || validityMessage || ' ';
                this.textarea?.setCustomValidity('');
                this.internals?.setValidity({ customError: true }, slotText);
            }
            else {
                this.host.removeAttribute('has-custom-error');
                if (this.textarea)
                    this.internals?.setValidity({ [this.validStatus]: true }, validityMessage, this.textarea);
            }
        }
        else {
            this.host.removeAttribute('has-custom-error');
            this.internals?.setValidity({});
        }
    }
    // Render
    render() {
        const hasClearIcon = !!(this.clearable && !this.disabled && !this.readonly && (this.textarea?.value || this.value));
        const containerClasses = {
            'textarea-container': true,
            'textarea--clearable': hasClearIcon,
            'textarea--vertical': true,
            'textarea--nolabel': !this.label || !this.label.length,
            'textarea--borderless': this.borderless,
        };
        const textareaClasses = {
            textarea: true,
            'textarea--small': this.size === 'small',
            'textarea--medium': this.size === 'medium',
            'textarea--large': this.size === 'large',
            'textarea--resize-none': this.resize === 'none',
            'textarea--resize-horizontal': this.resize === 'horizontal',
            'textarea--resize-vertical': this.resize === 'vertical',
            'textarea--resize-both': this.resize === 'both',
            'textarea--default': this.status === 'default',
            'textarea--warning': this.status === 'warning',
            'textarea--error': this.status === 'error',
            'textarea--success': this.status === 'success',
            'textarea--invalid': (this.formSubmitted || this.touched) && (!this.isValid || !!this.validStatus),
        };
        const errorContainerClasses = {
            'error-container': true,
            'popup-error-container': this.hasPopupErrorComponent,
            'text-error-container': !this.hasPopupErrorComponent,
            'visible-error': (this.touched || this.formSubmitted) && !this.isValid,
        };
        return (h("div", { key: '10e7a334e977b85b738d201a5ff182aa6359eb94', class: containerClasses }, this.label && this.label.trim().length > 0 && (h("span", { key: '4fa9e37feac870f71a857ace07588e8192a4a149', class: "textarea--label" }, this.required && h("span", { key: '8154089de8e3232274e50bbd110f5882f0ab2db7', class: "required" }, "*"), h("span", { key: '6091f270975f2d99d05e5b15bceedb7653e689f3', class: "label" }, this.label))), h("div", { key: '5bf43c3ff6f7b25c2662ce0cd01b091a7f40bf82', class: "textarea-wrapper" }, h("div", { key: 'b31ff0eb03d880aeabc4af8296703cc930c9aa28', class: "textarea-box" }, h("textarea", { key: '8fb73ce379956b7fb152b44637dcf3839957a6f3', class: textareaClasses, disabled: this.disabled, readOnly: this.readonly, autoFocus: this.autofocus, required: this.required, rows: this.rows, minLength: this.min > 0 ? this.min : undefined, maxLength: this.max > 0 ? this.max : undefined, placeholder: this.placeholder, onFocus: this.handleFocus, onBlur: this.handleBlur, ref: (el) => (this.textarea = el) }, this.value), hasClearIcon && (h("sy-icon", { key: '2b53607a4d4c8a31016d40f590e27c9a129e5fa2', class: { 'textarea-clear': true, scroll: this.hasScroll }, selectable: true, size: this.size, onSelected: this.handleIcon }, h("svg", { key: '772635b4568d8df65cc1933d65c55eea81d12a2e', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: 'ae102cbe7a8d34bd6d8da9134978079364ab7da5', fill: "currentColor", d: "M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z" }))))), h("div", { key: 'dc422dc84103cbbc4a8bb2a34e6dfa84a614e159', class: errorContainerClasses }, h("slot", { key: '80b7cdfc4599be87cd3b8a535c64c965434b2da6', name: "error", onSlotchange: () => this.handleSlotChange() }))), !this.counter ? null : (this.counter && this.max > 0 ? (h("div", { class: "textarea--count" }, this.charCount, "/", this.max)) : null)));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["valueChanged"],
        "min": ["constraintChanged"],
        "max": ["constraintChanged"],
        "required": ["constraintChanged"]
    }; }
    static get style() { return syTextareaCss; }
}, [326, "sy-textarea", {
        "autofocus": [4],
        "borderless": [4],
        "clearable": [4],
        "counter": [4],
        "disabled": [1540],
        "label": [1],
        "max": [514],
        "min": [514],
        "placeholder": [1],
        "readonly": [516],
        "required": [516],
        "resize": [513],
        "rows": [2],
        "size": [1],
        "status": [1],
        "value": [1537],
        "name": [1],
        "noNativeValidity": [1028, "nonativevalidity"],
        "hasScroll": [32],
        "charCount": [32],
        "touched": [32],
        "formSubmitted": [32],
        "isValid": [32],
        "validStatus": [32],
        "hasSlotErrorMessage": [32],
        "hasPopupErrorComponent": [32],
        "setFocus": [64],
        "setBlur": [64],
        "checkValidity": [64],
        "reportValidity": [64],
        "setCustomError": [64],
        "clearCustomError": [64],
        "getStatus": [64]
    }, [[2, "invalid", "handleInvalidEvent"]], {
        "value": ["valueChanged"],
        "min": ["constraintChanged"],
        "max": ["constraintChanged"],
        "required": ["constraintChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-textarea", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-textarea":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTextarea$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyTextarea = SyTextarea$1;
const defineCustomElement = defineCustomElement$1;

export { SyTextarea, defineCustomElement };
