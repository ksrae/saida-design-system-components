import { Component, Prop, State, Event, EventEmitter, h, Element, Method, Watch, Listen, AttachInternals } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-textarea',
  styleUrl: 'sy-textarea.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SyTextarea {
  @Element() host: HTMLSyTextareaElement;
  @AttachInternals() internals: ElementInternals;
  private textarea!: HTMLTextAreaElement;

  private initialValue: string = '';

  // Props
  @Prop() autofocus: boolean = false;
  @Prop() borderless = false;
  @Prop() clearable = false;
  @Prop() counter: boolean = false;
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  @Prop() label: string = "";
  @Prop({ reflect: true }) max: number = Number.MAX_SAFE_INTEGER;
  @Prop({ reflect: true }) min: number = 0;
  @Prop() placeholder: string = "";
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop({ reflect: true }) required = false;
  @Prop({ reflect: true }) resize: "none" | "horizontal" | "vertical" | "both" = "none";
  @Prop() rows = 4;
  @Prop() size: "small" | "medium" | "large" = "medium";
  @Prop() status: 'default' | 'warning' | 'error' | 'success' = 'default';
  @Prop({ mutable: true, reflect: true }) value: string = "";
  @Prop() name: string = "";
  @Prop({ attribute: 'noNativeValidity', mutable: true }) noNativeValidity = false;

  // State
  @State() private hasScroll = false;
  @State() private charCount: number = 0;
  @State() private touched = false;
  @State() private formSubmitted = false;

  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'tooShort' | 'tooLong' | 'custom' | '' = "";
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;

  private resizeObserver!: ResizeObserver;

  // Events
  @Event() changed: EventEmitter<{ value: string; length: number; isValid: boolean; status: string }>;
  @Event() blured: EventEmitter<{ value: string; isValid: boolean; status: string }>;
  @Event() focused: EventEmitter<{ value: string; isValid: boolean; status: string }>;

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
    this.textarea = this.host.querySelector('textarea') as HTMLTextAreaElement;

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
    if (this.resizeObserver && this.textarea) this.resizeObserver.unobserve(this.textarea);
  }

  // Form callbacks
  formAssociatedCallback() {
    this.setFormValue();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    if (this.textarea) this.textarea.value = this.initialValue;
    this.value = this.initialValue;
    this.charCount = this.initialValue.length;
    this.touched = false;
    this.formSubmitted = false;
    this.updateValidityState();
    this.setFormValue();
  }

  formStateRestoreCallback(state: string) {
    if (this.textarea) this.textarea.value = state;
    this.value = state;
    this.charCount = state.length;
    this.updateValidityState();
  }

  // Public methods
  @Method()
  async setFocus() {
    this.textarea?.focus();
    this.handleFocus();
  }

  @Method()
  async setBlur() {
    this.textarea?.blur();
    this.handleBlur();
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals ? this.internals.checkValidity() : true;
  }

  @Method()
  async reportValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals ? this.internals.reportValidity() : true;
  }

  @Method()
  async setCustomError() {
    this.isValid = false;
    this.validStatus = 'custom';

    // 슬롯 에러가 있으면 has-custom-error 속성 추가
    if (this.hasSlotErrorMessage) {
      this.host.setAttribute('has-custom-error', '');
    }
    this.textarea?.setCustomValidity('');
    this.internals?.setValidity({ customError: true }, ' ');
  }

  @Method()
  async clearCustomError() {
    if (!this.isValid && this.validStatus === 'custom') this.validStatus = '';
    // has-custom-error 속성 제거
    this.host.removeAttribute('has-custom-error');
    this.updateValidityState();
  }

  @Method()
  async getStatus() {
    return this.isValid ? '' : this.validStatus;
  }

  // Watchers
  @Watch('value')
  protected valueChanged() {
    this.charCount = this.value?.length ?? 0;
    this.checkForScroll();
    this.updateValidityState();
    this.setFormValue();
  }

  @Watch('min')
  @Watch('max')
  @Watch('required')
  protected constraintChanged() {
    this.updateValidityState();
  }

  // Listen invalid event
  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    // Mark that a submission/validation attempt occurred so errors become visible
    this.formSubmitted = true;

    const hasErrorSlot = !!this.host.querySelector('[slot="error"]');
    if (this.noNativeValidity || hasErrorSlot) {
      const errorSlotElement = this.host.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim();
      if (hasContent) {
        this.hasSlotErrorMessage = true;
        this.host.setAttribute('has-custom-error', '');
        e.preventDefault();
        e.stopPropagation();
        if (this.textarea) this.textarea.setCustomValidity('');
        this.internals?.setValidity({ customError: true }, ' ');
      } else {
        this.hasSlotErrorMessage = false;
        this.host.removeAttribute('has-custom-error');
      }
    } else {
      this.hasSlotErrorMessage = false;
      this.host.removeAttribute('has-custom-error');
      setTimeout(() => {
        if (!this.isValid) this.textarea?.reportValidity();
      }, 0);
    }
    this.isValid = false;
    // Re-evaluate validity so render reflects formSubmitted state immediately
    this.updateValidityState();
  }

  // Helpers
  private setFormValue() {
    this.internals?.setFormValue(this.textarea?.value || '');
  }

  private formSubmitListener() {
    if (this.internals?.form) this.internals.form.addEventListener('submit', this.handleFormSubmit);
  }

  private formSubmitListenerRemover() {
    if (this.internals?.form) this.internals.form.removeEventListener('submit', this.handleFormSubmit);
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    this.updateValidityState();
  };

  private handleFocus = () => {
    this.focused.emit({ value: this.value, isValid: this.isValid, status: this.validStatus });
  };

  private handleBlur = () => {
    this.updateValidityState();
    this.blured.emit({ value: this.value, isValid: this.isValid, status: this.validStatus });
  };

  private checkForScroll = () => {
    if (this.textarea) this.hasScroll = this.textarea.scrollHeight > this.textarea.clientHeight;
  };

  private handleInput = () => {
    if (this.disabled || this.readonly) return;
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

  private changedEvent() {
    this.changed.emit({ value: this.textarea?.value || '', length: this.charCount, isValid: this.isValid, status: this.validStatus });
  }

  private handleIcon = (_: CustomEvent<{ value: string }>) => {
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

  private handleSlotChange() {
    const host = this.host as HTMLSyTextareaElement;
    this.hasSlotErrorMessage = false;
    this.hasPopupErrorComponent = false;

    const errorSlotElement = host.querySelector('[slot="error"]');
    if (!errorSlotElement) return;

    const popupTags = ['sy-tooltip', 'sy-popover', 'sy-popconfirm', 'sy-inline-message'];
    const containsPopup = popupTags.some(tag => !!errorSlotElement.querySelector(tag));
    const isPopupItself = popupTags.includes((errorSlotElement.tagName || '').toLowerCase());

    this.hasPopupErrorComponent = containsPopup || isPopupItself;
    const textContent = errorSlotElement.textContent?.trim();
    this.hasSlotErrorMessage = !!(textContent && textContent.length) || errorSlotElement.children.length > 0;

    // Re-evaluate validity state after slot content changes
    this.updateValidityState();
  }

  private getErrorMessage(type: 'valueMissing' | 'tooShort' | 'tooLong' | 'custom' | '') {
    const validityMessage = {
      valueMissing: 'This field is required',
      tooShort: `Value must be at least ${this.min} characters long`,
      tooLong: `Value cannot exceed ${this.max} characters`,
      custom: 'Invalid by custom',
    } as any;
    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }

  private updateValidityState() {
    if (this.validStatus === 'custom' && !this.isValid) return;
    this.isValid = true;
    this.validStatus = '';

    if (this.required && (!this.value || this.value.length === 0)) {
      this.isValid = false;
      this.validStatus = 'valueMissing';
    } else if (this.value && this.min > 0 && this.value.length < this.min) {
      this.isValid = false;
      this.validStatus = 'tooShort';
    } else if (this.value && this.max > 0 && this.value.length > this.max) {
      this.isValid = false;
      this.validStatus = 'tooLong';
    }

    const validityMessage = this.getErrorMessage(this.validStatus);

    if (!this.isValid) {
      if (this.hasSlotErrorMessage) {
        // 슬롯 에러가 있으면 has-custom-error 속성 추가
        this.host.setAttribute('has-custom-error', '');
        this.textarea?.setCustomValidity('');
        this.internals?.setValidity({ customError: true }, ' ');
      } else {
        // 슬롯 에러가 없으면 has-custom-error 속성 제거
        this.host.removeAttribute('has-custom-error');
        if (this.textarea) this.internals?.setValidity({ [this.validStatus]: true } as any, validityMessage, this.textarea);
      }
    } else {
      // 유효한 상태일 때는 has-custom-error 속성 제거
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
    } as any;

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
    } as any;

    const errorContainerClasses = {
      'error-container': true,
      'popup-error-container': this.hasPopupErrorComponent,
      'text-error-container': !this.hasPopupErrorComponent,
      'visible-error': (this.touched || this.formSubmitted) && !this.isValid,
    } as any;

    return (
      <div class={containerClasses}>
        {this.label && this.label.trim().length > 0 && (
          <span class="textarea--label">
            {this.required && <span class="required">*</span>}
            <span class="label">{this.label}</span>
          </span>
        )}

        <div class="textarea-wrapper">
          <div class="textarea-box">
            <textarea
              class={textareaClasses}
              disabled={this.disabled}
              readOnly={this.readonly}
              autoFocus={this.autofocus}
              required={this.required}
              rows={this.rows}
              minLength={this.min > 0 ? this.min : undefined}
              maxLength={this.max > 0 ? this.max : undefined}
              placeholder={this.placeholder}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              ref={(el) => (this.textarea = el as HTMLTextAreaElement)}
            >{this.value}</textarea>

            {hasClearIcon && (
              <sy-icon
                class={{ 'textarea-clear': true, scroll: this.hasScroll }}
                selectable
                size={this.size}
                onSelected={(this.handleIcon as any)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>
              </sy-icon>
            )}
          </div>

          <div class={errorContainerClasses}>
            <slot name="error" onSlotchange={() => this.handleSlotChange()}></slot>
          </div>
        </div>

        {!this.counter ? null : (this.counter && this.max > 0 ? (
          <div class="textarea--count">{this.charCount}/{this.max}</div>
        ) : null)}
      </div>
    );
  }
}
