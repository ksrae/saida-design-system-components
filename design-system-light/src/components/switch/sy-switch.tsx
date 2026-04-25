import { Component, Prop, State, Event, EventEmitter, h, Watch, Element, AttachInternals, Method, Listen } from '@stencil/core';

/**
 * sy-switch — binary on/off toggle with form-association.
 *
 * Spec: design-system-specs/components/switch.yaml
 *
 * Form-associated: participates in <form> via ElementInternals. Submits the
 * `value` (default `"on"`) under `name` only when checked, matching native
 * checkbox convention. When `required` is set the switch must be checked or
 * the form is invalid.
 *
 * Error UI: there is no native popup for sy-switch — every invalid state
 * (required-failed, setCustomError) renders the same slot/text below the
 * switch. Authors can supply `[slot="error"]` for custom copy; otherwise a
 * default message is rendered.
 *
 * Props: checked, disabled, readonly, loading, size (small | medium), label,
 * name, value, required.
 *
 * Events: `changed` — emitted with the new checked boolean.
 */
@Component({
  tag: 'sy-switch',
  styleUrl: 'sy-switch.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SySwitch {
  @Element() host!: HTMLSySwitchElement;
  @AttachInternals() internals!: ElementInternals;

  // Props
  @Prop({ reflect: true, mutable: true }) checked: boolean = false;
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  @Prop() label: string = '';
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' = 'medium';
  @Prop() name: string = '';
  /** Value submitted as the form value when checked. Defaults to `"on"` (native convention). */
  @Prop() value: string = 'on';
  @Prop({ reflect: true }) required: boolean = false;

  // State
  @State() private internalDisabled: boolean = false;
  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'custom' | '' = '';
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private touched: boolean = false;
  @State() private formSubmitted: boolean = false;

  // Events
  @Event() changed!: EventEmitter<boolean>;

  // --- Form-association lifecycle ---
  formAssociatedCallback() { this.syncFormValue(); }
  formResetCallback() {
    this.checked = false;
    this.touched = false;
    this.formSubmitted = false;
    if (!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
      this.isValid = true;
    }
    this.updateValidityState();
  }
  formDisabledCallback(disabled: boolean) { this.disabled = disabled; }
  formStateRestoreCallback(state: string | File | FormData | null) {
    this.checked = state === this.value || state === 'on';
    this.updateValidityState();
  }

  // Lifecycle
  componentWillLoad() {
    this.updateInternalDisabled();
    this.handleSlotChange();
    this.updateValidityState();
  }

  componentDidLoad() {
    // Slotted children are attached AFTER componentWillLoad, so re-scan once
    // the DOM is settled. Without this, `hasSlotErrorMessage` stays false on
    // first render and the fallback default-text path is taken even when the
    // consumer supplied `<span slot="error">…</span>`.
    this.handleSlotChange();
  }

  connectedCallback() {
    this.formSubmitListener();
  }

  disconnectedCallback() {
    this.formSubmitListenerRemover();
  }

  // Watchers
  @Watch('loading')
  @Watch('disabled')
  handleLoadingOrDisabledChange() {
    this.updateInternalDisabled();
  }

  @Watch('checked')
  handleCheckedChange() {
    this.updateValidityState();
    // Toggling the switch ON satisfies `required`, so wipe the submission
    // gate — the error message must disappear immediately, not stick around
    // until the next submit attempt. (showInvalid uses formSubmitted/touched,
    // both gated to !isValid; resetting them here is belt-and-braces.)
    if (this.isValid) {
      this.formSubmitted = false;
      this.touched = false;
    }
    this.changed.emit(this.checked);
  }

  @Watch('required')
  handleRequiredChange() {
    this.updateValidityState();
  }

  // --- Public Methods ---
  @Method() async checkValidity(): Promise<boolean>  { this.updateValidityState(); return this.internals.checkValidity(); }
  @Method() async reportValidity(): Promise<boolean> { this.updateValidityState(); return this.internals.reportValidity(); }
  @Method() async getValidStatus(): Promise<string>  { return this.isValid ? '' : this.validStatus; }
  @Method() async setCustomError() {
    this.isValid = false;
    this.validStatus = 'custom';
    this.touched = true;
    this.updateValidityState();
  }
  @Method() async clearCustomError() {
    if (this.validStatus === 'custom') {
      this.validStatus = '';
      this.isValid = true;
    }
    this.updateValidityState();
    // Clearing the custom error must also wipe the submission gate so the
    // error UI vanishes — otherwise the slot stays visible until the user
    // toggles the switch.
    if (this.isValid) {
      this.formSubmitted = false;
      this.touched = false;
    }
  }

  // --- Listeners ---
  // Switch has no native popup UI — preventDefault on every invalid event so
  // the browser doesn't try to anchor a popup to the host. The slot/text
  // surface below the switch is the ONLY error channel.
  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.formSubmitted = true;
    this.updateValidityState();
  }

  // --- Private helpers ---
  private updateInternalDisabled() {
    this.internalDisabled = this.loading ? true : this.disabled;
  }

  private syncFormValue() {
    // Only submit a value when checked (matches native checkbox convention).
    this.internals?.setFormValue(this.checked ? this.value : null);
  }

  private formSubmitListener() {
    if (this.internals?.form) this.internals.form.addEventListener('submit', this.handleFormSubmit);
  }

  private formSubmitListenerRemover() {
    if (this.internals?.form) this.internals.form.removeEventListener('submit', this.handleFormSubmit);
  }

  private handleFormSubmit = (_e: Event) => {
    this.formSubmitted = true;
    this.updateValidityState();
  };

  private getSlotErrorText(): string {
    const slotEl = this.host.querySelector('[slot="error"]');
    return (slotEl?.textContent ?? '').trim();
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    if (type === '') return '';
    const messages = {
      valueMissing: 'This switch is required',
      custom: 'Invalid input',
    };
    return messages[type] || '';
  }

  private updateValidityState() {
    // (1) Programmatic custom error takes priority — slot text drives the
    // validity message so reportValidity surfaces the same copy on screen.
    if (this.validStatus === 'custom' && !this.isValid) {
      const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
      this.internals?.setValidity({ customError: true }, msg);
      this.syncFormValue();
      return;
    }

    // (2) Native constraint: required && !checked → invalid.
    const satisfiesRequired = !this.required || this.checked;
    this.isValid = satisfiesRequired;
    this.validStatus = satisfiesRequired ? '' : 'valueMissing';

    this.syncFormValue();

    if (!this.isValid) {
      // Always route invalid through customError so the browser doesn't try
      // to render a native popup for valueMissing. The error text is whatever
      // the consumer slotted, falling back to a default message.
      const slotText = this.getSlotErrorText() || this.getErrorMessage(this.validStatus) || ' ';
      this.host.setAttribute('has-custom-error', '');
      this.internals?.setValidity({ customError: true }, slotText);
    } else {
      this.host.removeAttribute('has-custom-error');
      this.internals?.setValidity({});
    }
  }

  private handleSlotChange = () => {
    const errorSlot = this.host.querySelector('[slot="error"]');
    if (!errorSlot) {
      this.hasSlotErrorMessage = false;
      return;
    }
    this.hasSlotErrorMessage =
      (errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0;
    this.updateValidityState();
  };

  private handleClick = () => {
    if (this.internalDisabled || this.readonly) return;
    this.touched = true;
    this.checked = !this.checked;
    // `changed` event is emitted by the @Watch('checked') handler above to
    // avoid double-firing when consumers set `checked` programmatically.
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.internalDisabled || this.readonly) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.touched = true;
      this.checked = !this.checked;
    }
  };

  // Render
  render() {
    const showInvalid = (this.formSubmitted || this.touched) && !this.isValid;

    const switchClasses = {
      switch: true,
      on: this.checked,
      readonly: this.readonly,
      disabled: this.internalDisabled,
      'switch--small': this.size === 'small',
      'switch--medium': this.size === 'medium',
      'switch--invalid': showInvalid,
    };

    const errorContainerClasses = {
      'error-container': true,
      'visible-error': showInvalid,
    };

    return (
      <div class="switch-wrapper">
        <div
          class={switchClasses}
          tabindex={this.internalDisabled ? -1 : 0}
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          aria-disabled={this.internalDisabled ? 'true' : undefined}
          aria-readonly={this.readonly ? 'true' : undefined}
          aria-required={this.required ? 'true' : undefined}
          aria-invalid={showInvalid ? 'true' : 'false'}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          <div class="handle">
            {this.loading && <div class="loader"></div>}
          </div>
        </div>
        {this.label && (
          <span class="switch-label">
            {this.required && <span class="required">*</span>}
            {this.label}
          </span>
        )}
        <div class={errorContainerClasses}>
          <slot name="error" onSlotchange={this.handleSlotChange}></slot>
          {/* Sibling fallback (not slot fallback content): scoped:true mode
             doesn't reliably render slot-fallback children. Instead we render
             a sibling span next to the slot, shown only when the consumer
             didn't supply a slot error AND the switch is currently invalid. */}
          {showInvalid && !this.hasSlotErrorMessage && (
            <span class="error-fallback">{this.getErrorMessage(this.validStatus)}</span>
          )}
        </div>
      </div>
    );
  }
}
