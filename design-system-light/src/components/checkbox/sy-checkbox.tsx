import { Component, h, Prop, State, Method, Element, Event, EventEmitter, Watch, Listen, AttachInternals } from '@stencil/core';

/**
 * sy-checkbox — two-state toggle (checked / unchecked), with optional indeterminate.
 *
 * Spec: design-system-specs/components/checkbox.yaml
 * Anatomy:
 *   .checkbox-wrapper
 *     ├─ <label> → <input type="checkbox"> + .checkbox-visual-label (✓ / –) + <slot> (label text)
 *     └─ .error-container → <slot name="error">
 *
 * Form-associated: participates in <form> via ElementInternals.
 *
 * Custom-error pattern (shared across all SAIDA form controls — see autocomplete comment):
 *   1. Declarative slot — author writes the error UI once:
 *        <sy-checkbox required>
 *          I agree
 *          <div slot="error">You must agree to continue</div>
 *        </sy-checkbox>
 *      When `required` is violated and the user has touched the field or submitted
 *      the form, the slot content becomes visible.
 *   2. Programmatic — app code decides an invalid state at any time:
 *        el.setCustomError();   // reveals the same slot
 *        el.clearCustomError(); // reverts to native-only validation
 */
@Component({
  tag: 'sy-checkbox',
  styleUrl: 'sy-checkbox.scss',
  shadow: false,
  formAssociated: true,
})
export class SyCheckbox {
  @Element() host!: HTMLSyCheckboxElement;
  @AttachInternals() internals!: ElementInternals;

  private inputEl?: HTMLInputElement;
  private labelEl?: HTMLLabelElement;

  // --- Public Properties (spec: attributes) ---
  @Prop({ attribute: 'title' }) checkboxTitle: string = '';
  @Prop() name: string = '';
  @Prop() value: string = 'on';
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  @Prop({ mutable: true, reflect: true }) indeterminate: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop() noNativeValidity: boolean = false;

  // --- Private State ---
  @State() private hasFocus: boolean = false;
  @State() isTree: boolean = false;
  @State() private renderIndeterminate: boolean = false;
  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'custom' | '' = '';
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;
  @State() private touched: boolean = false;
  @State() private formSubmitted: boolean = false;

  // --- Events (spec: api.events) ---
  @Event() changed!: EventEmitter<{ value: boolean; isValid: boolean; checked: boolean; indeterminate: boolean }>;
  @Event() focused!: EventEmitter<boolean>;
  @Event() blured!: EventEmitter<boolean>;

  // --- Custom validity getters (mirroring ElementInternals; read via `(el as any).validity`) ---
  get validity(): ValidityState {
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
      } as ValidityState;
    }
    return this.internals?.validity;
  }

  get validationMessage(): string {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return this.getSlotErrorText() || this.getErrorMessage(this.validStatus);
    }
    return this.internals?.validationMessage;
  }

  get willValidate(): boolean {
    if (this.validStatus === 'custom' || this.hasSlotErrorMessage) return true;
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
  formDisabledCallback(disabled: boolean) { this.disabled = disabled; }
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
  formStateRestoreCallback(state: string) {
    this.checked = state === 'on' || state === this.value;
    this.setCheckedValidation();
  }

  // --- Watchers ---
  @Watch('checked')
  handleCheckedChange() {
    if (!this.checked && this.indeterminate) {
      this.renderIndeterminate = this.indeterminate;
    } else {
      this.setCheckedValidation();
    }
    this.internals?.setFormValue(this.checked ? (this.value || 'on') : null);
  }

  @Watch('indeterminate')
  handleIndeterminateChange() {
    this.renderIndeterminate = this.indeterminate;
    if (this.checked && this.indeterminate) this.renderIndeterminate = false;
  }

  @Watch('required')
  handleRequiredChange() { this.updateValidityState(); }

  // --- Public Methods (spec: api.methods) ---
  @Method() async setFocus() { this.labelEl?.focus(); this.handleFocus(); }
  @Method() async setBlur()  { this.labelEl?.blur();  this.handleBlur(); }
  @Method() async checkValidity(): Promise<boolean>  { this.updateValidityState(); return this.internals.checkValidity(); }
  @Method() async reportValidity(): Promise<boolean> { this.updateValidityState(); return this.internals.reportValidity(); }

  @Method()
  async getValidStatus(): Promise<string> {
    return this.isValid ? '' : this.validStatus;
  }

  @Method()
  async setCustomError() {
    this.customSettingError();
  }

  @Method()
  async clearCustomError() {
    if (this.validStatus === 'custom') {
      this.validStatus = '';
      this.isValid = true;
    }
    this.updateValidityState();
  }

  // --- Listeners ---
  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    this.formSubmitted = true;
    this.isValid = false;

    const errorSlotElement = this.host.querySelector('[slot="error"]');
    const slotHasContent =
      !!errorSlotElement && (errorSlotElement.textContent?.trim().length ?? 0) > 0;

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
      } else {
        this.host.removeAttribute('has-custom-error');
      }
    } else {
      this.hasSlotErrorMessage = false;
      this.host.removeAttribute('has-custom-error');
    }

    this.updateValidityState();
  }

  // --- Event handlers ---
  private handleFocus = () => {
    this.hasFocus = true;
    this.focused.emit(this.checked);
  };

  private handleBlur = () => {
    this.hasFocus = false;
    this.touched = true;
    this.updateValidityState();
    this.blured.emit(this.checked);
  };

  private handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (this.disabled || this.readonly) return;
    this.touched = true;
    this.checked = !this.checked;
  };

  private onChange = (e: Event) => {
    e.preventDefault();
    if (this.disabled || this.readonly) return;
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      this.touched = true;
      this.checked = !this.checked;
    }
  };

  private handleFormSubmit = (_e: Event) => {
    this.formSubmitted = true;
    this.updateValidityState();
  };

  // --- Form hookup ---
  private formSubmitListener() {
    if (this.internals?.form) {
      this.internals.form.addEventListener('submit', this.handleFormSubmit);
    }
  }
  private formSubmitListenerRemover() {
    if (this.internals?.form) {
      this.internals.form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  private setCheckedValidation() {
    if (this.indeterminate) this.indeterminate = false;
    this.updateValidityState();
    this.changed.emit({
      value: this.checked,
      isValid: this.isValid,
      checked: this.checked,
      indeterminate: this.renderIndeterminate,
    });
  }

  // --- Validation (shared form-error pattern) ---
  private getSlotErrorText(): string {
    const slotEl = this.host.querySelector('[slot="error"]');
    return (slotEl?.textContent ?? '').trim();
  }

  private updateValidityState() {
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
      } else {
        this.internals?.setValidity(
          { valueMissing: true },
          this.getErrorMessage('valueMissing')
        );
      }
    } else {
      this.internals?.setValidity({});
    }
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    this.touched = true;
    this.updateValidityState();
  }

  private handleSlotChange = () => {
    const errorSlot = this.host.querySelector('[slot="error"]');
    if (!errorSlot) {
      this.hasSlotErrorMessage = false;
      this.hasPopupErrorComponent = false;
      return;
    }
    this.hasPopupErrorComponent = !!errorSlot.querySelector(
      'sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message'
    );
    this.hasSlotErrorMessage =
      (errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0;
  };

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    if (type === '') return '';
    const messages = {
      valueMissing: 'This checkbox is required',
      custom: 'Invalid input',
    };
    return messages[type] || '';
  }

  render() {
    const showInvalid = (this.formSubmitted || this.touched) && !this.isValid;

    const wrapperClasses: Record<string, boolean> = {
      'checkbox': true,
      'checkbox--checked': this.checked,
      'checkbox--disabled': this.disabled,
      'checkbox--focused': this.hasFocus,
      'checkbox--indeterminate': this.renderIndeterminate,
      'checkbox--invalid': showInvalid,
      'readonly': this.readonly,
    };

    const errorContainerClasses: Record<string, boolean> = {
      'error-container': true,
      'popup-error-container': this.hasPopupErrorComponent,
      'text-error-container': !this.hasPopupErrorComponent,
      'visible-error': showInvalid,
    };

    const ariaChecked: 'true' | 'false' | 'mixed' =
      this.renderIndeterminate ? 'mixed' : (this.checked ? 'true' : 'false');

    return (
      <div class="checkbox-wrapper">
        <label
          ref={(el) => (this.labelEl = el)}
          class={Object.keys(wrapperClasses).filter((k) => wrapperClasses[k]).join(' ')}
          tabindex={this.disabled ? -1 : 0}
          onClick={this.handleClick}
        >
          <input
            ref={(el) => (this.inputEl = el)}
            class="checkbox--input"
            type="checkbox"
            title={this.checkboxTitle}
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            required={this.required}
            aria-checked={ariaChecked}
            aria-invalid={showInvalid ? 'true' : 'false'}
            aria-disabled={this.disabled ? 'true' : undefined}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.onChange}
            tabindex="-1"
          />
          <span class={`checkbox-visual-label ${this.isTree ? 'checkbox-label' : ''}`}>
            <sy-icon size="xsmall" class="checked">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M534 132.5C544.8 140.2 547.2 155.2 539.5 166L275.5 534C271.4 539.7 265 543.4 258 543.9C251 544.4 244 542 239 537L103 401C93.6 391.6 93.6 376.4 103 367.1C112.4 357.8 127.6 357.7 136.9 367.1L253 483L500.5 138C508.2 127.2 523.2 124.8 534 132.5z" /></svg>
            </sy-icon>
            <sy-icon size="xsmall" class="indeterminate">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M64 128C64 92.7 92.7 64 128 64L512 64C547.3 64 576 92.7 576 128L576 512C576 547.3 547.3 576 512 576L128 576C92.7 576 64 547.3 64 512L64 128z" /></svg>
            </sy-icon>
          </span>
          <div class={`checkbox-slot ${this.isTree ? 'checkbox-slot' : ''}`}>
            <slot />
          </div>
        </label>
        <div class={Object.keys(errorContainerClasses).filter((k) => errorContainerClasses[k]).join(' ')}>
          <slot name="error" onSlotchange={this.handleSlotChange}></slot>
        </div>
      </div>
    );
  }
}
