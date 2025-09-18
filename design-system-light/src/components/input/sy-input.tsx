import { Component, Prop, State, Event, EventEmitter, h, Element, Method, Watch, Listen } from '@stencil/core';

export interface HTMLSyInputElement extends HTMLElement {
  // Public Props
  autofocus: boolean;
  borderless: boolean;
  clearable: boolean;
  disabled: boolean;
  label: string;
  max?: number;
  min?: number;
  name: string;
  placeholder: string;
  readonly: boolean;
  required: boolean;
  size: "small" | "medium" | "large";
  status: 'default' | 'warning' | 'error' | 'success';
  value: string;
  variant: "password" | "search" | "text";
  noNativeValidity: boolean;

  // Public Methods
  setFocus: () => Promise<void>;
  setBlur: () => Promise<void>;
  checkValidity: () => Promise<boolean>;
  reportValidity: () => Promise<boolean>;
  setCustomError: () => Promise<void>;
  clearCustomError: () => Promise<void>;
  getStatus: () => Promise<'valueMissing' | 'tooShort' | 'tooLong' | 'custom' | ''>;

  // Form Properties (Readonly)
  readonly validity: ValidityState;
  readonly validationMessage: string;
  readonly willValidate: boolean;
}

@Component({
  tag: 'sy-input',
  styleUrl: 'sy-input.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SyInput {
  // --- Element References ---
  @Element() hostElement: HTMLSyInputElement;
  private internals: ElementInternals;
  private input!: HTMLInputElement;

  private _isUserInput: boolean = false;
  private initialValue: string = '';

  // --- Props ---
  @Prop() autofocus = false;
  @Prop({ reflect: true }) borderless = false;
  @Prop() clearable = false;
  @Prop({ reflect: true, mutable: true }) disabled = false;
  @Prop() label: string = "";
  @Prop() max?: number;
  @Prop() min?: number;
  @Prop() name: string = "";
  @Prop() placeholder: string = "";
  @Prop({ reflect: true }) readonly = false;
  @Prop({ reflect: true }) required = false;
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  @Prop() status: 'default' | 'warning' | 'error' | 'success' = 'default';
  @Prop({ mutable: true, reflect: true }) value: string = "";
  @Prop({ reflect: true }) variant: "password" | "search" | "text" = "text";
  @Prop({ attribute: 'noNativeValidity' }) noNativeValidity = false;

  // --- State ---
  @State() private hasFocus = false;
  @State() private passwordvisible = false;
  @State() private hasPrefix: boolean = false;
  @State() private hasSuffix: boolean = false;
  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'tooShort' | 'tooLong' | 'custom' | '' = "";
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;
  @State() private touched: boolean = false;
  @State() private formSubmitted: boolean = false;

  // --- Events ---
  @Event() changed: EventEmitter<{ value: string; isValid: boolean; status: string }>;
  @Event() blured: EventEmitter<{ value: string; isValid: boolean; status: string }>;
  @Event() focused: EventEmitter<{ value: string; isValid: boolean; status: string }>;

  // --- Custom Validity Getters ---
  get validity(): ValidityState {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return {
        badInput: false, customError: true, patternMismatch: false, rangeOverflow: false,
        rangeUnderflow: false, stepMismatch: false, tooLong: this.validStatus === 'tooLong',
        tooShort: this.validStatus === 'tooShort', typeMismatch: false, valid: false,
        valueMissing: this.validStatus === 'valueMissing',
      } as ValidityState;
    }
    return this.internals?.validity;
  }

  get validationMessage(): string {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return this.getErrorMessage(this.validStatus);
    }
    return this.internals?.validationMessage;
  }

  get willValidate(): boolean {
    return this.internals?.willValidate;
  }

  // --- Lifecycle Methods ---
  connectedCallback() {
    if (this.hostElement.attachInternals) {
      this.internals = this.hostElement.attachInternals();
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
    this.initialValue = this.value;
    this.handleSlotChange();
    this.updateValidityState();
  }

  componentDidLoad() {
    // this.handleSlotChange(); <-- 여기에서 위로 이동했습니다.
    if (this.autofocus) {
      requestAnimationFrame(() => this.input?.focus());
    }
    if(this.value) {
      this.emitChangedEvent();
    }
  }

  // --- Form Associated Callbacks ---
  formDisabledCallback(disabled: boolean) { this.disabled = disabled; }
  formResetCallback() {
    this.value = this.initialValue;
    this.touched = false;
    this.formSubmitted = false;
    this.updateValidityState();
  }
  formStateRestoreCallback(state: string) {
    this.value = state;
    this.updateValidityState();
  }

  // --- Watchers ---
  @Watch('value')
  handleValueChange() {
    if (!this._isUserInput) {
      this.emitChangedEvent();
    }
    this._isUserInput = false;
    this.updateValidityState();
  }

  @Watch('min')
  @Watch('max')
  @Watch('required')
  handleConstraintChange() {
    this.updateValidityState();
  }

  // --- Public Methods ---
  @Method() async setFocus() { this.input?.focus(); }
  @Method() async setBlur() { this.input?.blur(); }
  @Method() async checkValidity(): Promise<boolean> { this.updateValidityState(); return this.internals.checkValidity(); }
  @Method() async reportValidity(): Promise<boolean> { this.updateValidityState(); return this.internals.reportValidity(); }
  @Method() async setCustomError() { this.customSettingError(); }
  @Method() async clearCustomError() {
    if (!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }
  @Method() async getStatus() { return this.isValid ? '' : this.validStatus; }

  // --- Host Event Listeners ---
  @Listen('focus')
  handleHostFocus() {
    if (!this.disabled) {
      this.input?.focus();
    }
  }

  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    const hasErrorSlot = !!this.hostElement.querySelector('[slot="error"]');
    if (this.noNativeValidity || hasErrorSlot) {
      const errorSlotElement = this.hostElement.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim();
      if (hasContent) {
        this.hasSlotErrorMessage = true;
        e.preventDefault();
        e.stopPropagation();
        if (this.input) this.input.setCustomValidity('');
        this.internals?.setValidity({ customError: true }, ' ');
      } else {
        this.hasSlotErrorMessage = false;
      }
    } else {
      this.hasSlotErrorMessage = false;
      setTimeout(() => {
        if (!this.isValid) this.input?.reportValidity();
      }, 0);
    }
    this.isValid = false;
  }

  // --- Event Handlers ---
  private handleFocus = () => {
    this.hasFocus = true;
    this.focused.emit({ value: this.value, isValid: this.isValid, status: this.validStatus });
  };

  private handleBlur = () => {
    this.hasFocus = false;
    this.touched = true;
    this.updateValidityState();
    this.blured.emit({ value: this.value, isValid: this.isValid, status: this.validStatus });
  };

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.touched = true;
    this._isUserInput = true;
    this.value = target.value;
    this.emitChangedEvent();
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleBlur();
    }
  };

  private handleClearClick = () => {
    console.log('clear');
    this._isUserInput = true;
    this.value = "";
    this.emitChangedEvent();
    this.input?.focus();
  };

  private handlePasswordToggle = () => {
    this.passwordvisible = !this.passwordvisible;
  };

  private handleFormSubmit = (_e: Event) => {
    this.formSubmitted = true;
    this.updateValidityState();
  };

  private handleSlotChange = () => {
    this.hasPrefix = this.hostElement.querySelector('[slot="prefix"]') !== null;
    this.hasSuffix = this.hostElement.querySelector('[slot="suffix"]') !== null;

    const errorSlot = this.hostElement.querySelector('[slot="error"]');
    if (!errorSlot) {
      this.hasSlotErrorMessage = false;
      this.hasPopupErrorComponent = false;
      return;
    }
    this.hasPopupErrorComponent = !!errorSlot.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
    this.hasSlotErrorMessage = errorSlot.textContent.trim().length > 0 || errorSlot.children.length > 0;
  };

  // --- Private Methods ---
  private emitChangedEvent() {
    this.updateValidityState();
    this.changed.emit({
      value: this.value,
      isValid: this.isValid,
      status: this.validStatus,
    });
  }

  private updateValidityState() {
    if (this.validStatus === 'custom' && !this.isValid) {
      this.internals.setValidity({ customError: true }, this.getErrorMessage('custom'));
      return;
    }

    let currentIsValid = true;
    let currentValidStatus: typeof this.validStatus = "";

    if (this.required && !this.value) {
      currentIsValid = false;
      currentValidStatus = "valueMissing";
    } else if (this.value && this.min !== undefined && this.value.length < this.min) {
      currentIsValid = false;
      currentValidStatus = "tooShort";
    } else if (this.value && this.max !== undefined && this.value.length > this.max) {
      currentIsValid = false;
      currentValidStatus = "tooLong";
    }

    this.isValid = currentIsValid;
    this.validStatus = currentValidStatus;
    const validityMessage = this.getErrorMessage(this.validStatus);

    this.internals.setFormValue(this.value, this.value);

    if (!this.isValid) {
      if (this.hasSlotErrorMessage) {
        this.internals.setValidity({ customError: true }, validityMessage);
      } else {
        this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
      }
    } else {
      this.internals.setValidity({});
    }
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    this.updateValidityState();
  }

  private getErrorMessage(type: typeof this.validStatus) {
    const messages = {
      valueMissing: "This field is required",
      tooShort: `Value must be at least ${this.min} characters long`,
      tooLong: `Value cannot exceed ${this.max} characters`,
      custom: 'Invalid by custom'
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

    const inputType = (this.variant === "password" && this.passwordvisible) || this.variant === "text" ? "text" : this.variant;

    return (
      <div class="input--item input--item-vertical">
        {this.label?.trim().length > 0 && (
          <span class="input--label">
            {this.required && <span class="required">*</span>}
            {this.label}
          </span>
        )}
        <div class="input-wrapper">
          <div class={wrapperClasses}>
            <span class="prefix-wrapper" style={{ display: this.hasPrefix ? 'flex' : 'none' }}>
              <slot name="prefix" onSlotchange={this.handleSlotChange} />
            </span>
            <input
              ref={(el) => (this.input = el as HTMLInputElement)}
              class="input--control"
              type={inputType}
              name={this.name}
              disabled={this.disabled}
              readOnly={this.readonly}
              required={this.required}
              autoFocus={this.autofocus}
              placeholder={placeholder}
              minLength={this.min}
              maxLength={this.max}
              value={this.value}
              onInput={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeydown}
            />
            {hasClearIcon && this.hasFocus && (
              <sy-icon
                class="input--clear"
                size={this.size}
                selectable
                onMouseDown={(e: MouseEvent) => e.preventDefault()}
                onSelected={this.handleClearClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>
              </sy-icon>
            )}
            {this.renderVariantIcon()}
          </div>
          <div class={errorContainerClasses}>
            <slot name="error" onSlotchange={this.handleSlotChange}></slot>
          </div>
        </div>
      </div>
    );
  }

  private renderVariantIcon() {
    switch (this.variant) {
      case 'password':
        return this.passwordvisible ? (
          <sy-icon
            class="input-password-toggle"
            selectable
            onMouseDown={(e: MouseEvent) => e.preventDefault()}
            onSelected={this.handlePasswordToggle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5zM286 196.6C296.8 193.6 308.2 192.1 319.9 192.1C328.7 192.1 337.4 193 345.7 194.7C346 194.8 346.2 194.8 346.5 194.9C404.4 207.1 447.9 258.6 447.9 320.1C447.9 390.8 390.6 448.1 319.9 448.1C258.3 448.1 206.9 404.6 194.7 346.7C192.9 338.1 191.9 329.2 191.9 320.1C191.9 309.1 193.3 298.3 195.9 288.1C196.1 287.4 196.2 286.8 196.4 286.2C208.3 242.8 242.5 208.6 285.9 196.7z"/></svg>
          </sy-icon>
        ) : (
          <sy-icon
            class="input-password-toggle"
            selectable
            onMouseDown={(e: MouseEvent) => e.preventDefault()}
            onSelected={this.handlePasswordToggle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM208.9 175.1C241 156.2 278.1 144 320 144C385.2 144 438.8 173.6 479.9 211.7C518.4 247.4 545 290 558.5 320C544.9 350 518.3 392.5 479.9 428.3C476.8 431.1 473.7 433.9 470.5 436.7L425.8 392C439.8 371.5 448 346.7 448 320C448 249.3 390.7 192 320 192C293.3 192 268.5 200.2 248 214.2L208.9 175.1zM390.9 357.1L282.9 249.1C294 243.3 306.6 240 320 240C364.2 240 400 275.8 400 320C400 333.4 396.7 346 390.9 357.1zM135.4 237.2L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L384.2 486C364.2 492.4 342.8 496 320 496C254.8 496 201.2 466.4 160.1 428.3C121.6 392.6 95 350 81.5 320C91.9 296.9 110.1 266.4 135.5 237.2z"></path></svg>
          </sy-icon>
        );
      case 'search':
        return (
          <sy-icon
            class="search-icon"
            size="medium"
            selectable
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M432 272C432 183.6 360.4 112 272 112C183.6 112 112 183.6 112 272C112 360.4 183.6 432 272 432C360.4 432 432 360.4 432 272zM401.1 435.1C365.7 463.2 320.8 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272C480 320.8 463.2 365.7 435.1 401.1L569 535C578.4 544.4 578.4 559.6 569 568.9C559.6 578.2 544.4 578.3 535.1 568.9L401.1 435.1z"/></svg>
          </sy-icon>
        );
      default:
        return (
          <span class="suffix-wrapper" style={{ display: this.hasSuffix ? 'flex' : 'none' }}>
            <slot name="suffix" onSlotchange={this.handleSlotChange} />
          </span>
        );
    }
  }
}
