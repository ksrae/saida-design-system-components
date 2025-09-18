import { Component, Prop, State, Event, EventEmitter, h, Element, Method, Watch, Listen } from '@stencil/core';

export interface HTMLSyInputNumberElement extends HTMLElement {
  autofocus: boolean;
  borderless: boolean;
  decimalPlaces?: number;
  disabled: boolean;
  label: string;
  max: number;
  min: number;
  name: string;
  readonly: boolean;
  required: boolean;
  rounding?: 'round' | 'ceil' | 'floor';
  size: "small" | "medium" | "large";
  status: 'default' | 'warning' | 'error' | 'success';
  step: number;
  value: string | number;
  noNativeValidity: boolean;
  setFocus: () => Promise<void>;
  setBlur: () => Promise<void>;
  stepUp: (n?: number) => Promise<void>;
  stepDown: (n?: number) => Promise<void>;
  setClear: () => Promise<void>;
  checkValidity: () => Promise<boolean>;
  reportValidity: () => Promise<boolean>;
  setCustomError: () => Promise<void>;
  clearCustomError: () => Promise<void>;
  getStatus: () => Promise<'valueMissing' | 'rangeUnderflow' | 'rangeOverflow' | 'stepMismatch' | 'typeMismatch' | 'custom' | ''>;
  readonly validity: ValidityState;
  readonly validationMessage: string;
  readonly willValidate: boolean;
}

@Component({
  tag: 'sy-input-number',
  styleUrl: 'sy-input-number.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SyInputNumber {
  // --- Element References ---
  @Element()
  hostElement: HTMLSyInputNumberElement;

  private internals: ElementInternals;
  private input!: HTMLInputElement;

  private initialValue: string | number = '';
  private stepTimer: any;
  private readonly stepInterval = 150;

  // --- Props ---
  @Prop() autofocus = false;
  @Prop({ reflect: true }) borderless = false;
  @Prop({ attribute: 'decimalPlaces' }) decimalPlaces?: number;
  @Prop({ reflect: true, mutable: true }) disabled = false;
  @Prop() label: string = "";
  @Prop() max: number = Number.MAX_SAFE_INTEGER;
  @Prop() min: number = Number.MIN_SAFE_INTEGER;
  @Prop() name: string = "";
  @Prop({ reflect: true }) readonly = false;
  @Prop({ reflect: true }) required = false;
  @Prop() rounding?: 'round' | 'ceil' | 'floor';
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  @Prop() status: 'default' | 'warning' | 'error' | 'success' = 'default';
  @Prop() step: number = 1;
  @Prop({ mutable: true, reflect: true }) value: string | number = '';
  @Prop({ attribute: 'noNativeValidity' }) noNativeValidity = false;

  // --- State ---
  @State()
  private hasFocus = false;

  @State()
  private hasPrefix: boolean = false;

  @State()
  private hasSuffix: boolean = false;

  @State()
  private isValid: boolean = true;

  @State()
  private validStatus: 'valueMissing' | 'rangeUnderflow' | 'rangeOverflow' | 'stepMismatch' | 'typeMismatch' | 'custom' | '' = "";

  @State()
  private hasSlotErrorMessage: boolean = false;

  @State()
  private hasPopupErrorComponent: boolean = false;

  @State()
  private touched: boolean = false;

  @State()
  private formSubmitted: boolean = false;

  // --- Events ---
  @Event()
  changed: EventEmitter<{ value: number | null; isValid: boolean; status: string }>;

  @Event()
  blured: EventEmitter<{ value: number | null; isValid: boolean; status: string }>;

  @Event()
  focused: EventEmitter<{ value: number | null; isValid: boolean; status: string }>;

  // --- Custom Validity Getters ---
  get validity(): ValidityState {
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
    this.clearStepTimer();
  }

  componentWillLoad() {
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
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

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
  handleValueChange(newValue: string | number, oldValue: string | number) {
    this.updateValidityState();
    if (newValue !== oldValue) {
      this.emitChangedEvent();
    }
  }

  @Watch('min')
  @Watch('max')
  @Watch('step')
  @Watch('required')
  handleConstraintChange() {
    this.updateValidityState();
  }

  // --- Public Methods ---
  @Method()
  async setFocus() {
    console.log('setFocus')
    this.input?.focus();
  }

  @Method()
  async setBlur() {
    console.log('setBlur')
    this.input?.blur();
  }

  @Method()
  async stepUp(n: number = 1) {
    for (let i = 0; i < n; i++) {
      this.performStep(1);
    }
  }

  @Method()
  async stepDown(n: number = 1) {
    for (let i = 0; i < n; i++) {
      this.performStep(-1);
    }
  }

  @Method()
  async setClear() {
    this.value = '';
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals.checkValidity();
  }

  @Method()
  async reportValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals.reportValidity();
  }

  @Method()
  async setCustomError() {
    this.customSettingError();
  }

  @Method()
  async clearCustomError() {
    if (!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }

  @Method()
  async getStatus() {
    return this.isValid ? '' : this.validStatus;
  }

  // --- Host Event Listeners ---
  @Listen('focus')
  handleHostFocus() {
    if (!this.disabled) {
      this.input?.focus();
    }
  }

  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    if (this.noNativeValidity || this.hasSlotErrorMessage) {
      e.preventDefault();
    }
  }

  // --- Event Handlers ---
  private handleFocus = () => {
    this.hasFocus = true;
    this.focused.emit({
      value: this.parseValue(this.value),
      isValid: this.isValid,
      status: this.validStatus
    });
  };

  private handleBlur = () => {
    this.hasFocus = false;
    this.touched = true;

    const currentValue = this.parseValue(this.value);

    if (currentValue !== null) {
      const clampedValue = this.clampValue(currentValue);
      const formattedValue = this.formatValue(clampedValue);
      if (this.value.toString() !== formattedValue) {
        this.value = formattedValue;
      }
    } else if (String(this.value).trim() !== '') {
      this.value = '';
    }

    this.updateValidityState();
    this.blured.emit({
      value: this.parseValue(this.value),
      isValid: this.isValid,
      status: this.validStatus
    });
  };

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.touched = true;
    this.value = target.value;
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.performStep(1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.performStep(-1);
    } else if (e.key === 'Enter') {
      this.handleBlur();
    }
  };

  private handleStepMouseDown = (direction: 1 | -1, e: MouseEvent) => {
    e.preventDefault();
    if (this.disabled || this.readonly) {
      return;
    }
    this.performStep(direction);
    this.clearStepTimer();
    this.stepTimer = setInterval(() => this.performStep(direction), this.stepInterval);
  }

  private handleStepMouseUpOrLeave = () => {
    this.clearStepTimer();
    this.input?.focus();
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    this.touched = true;
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
    this.changed.emit({
      value: this.parseValue(this.value),
      isValid: this.isValid,
      status: this.validStatus,
    });
  }

  private performStep(direction: 1 | -1) {
    this.touched = true;
    const currentValue = this.parseValue(this.value) ?? 0;
    const step = this.step || 1;
    const precision = Math.max(this.getDecimalPlaces(currentValue), this.getDecimalPlaces(step));
    const multiplier = Math.pow(10, precision);
    const nextValue = (Math.round(currentValue * multiplier) + direction * Math.round(step * multiplier)) / multiplier;
    const clampedValue = this.clampValue(nextValue);
    this.value = this.formatValue(clampedValue);
  }

  private parseValue(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined || String(value).trim() === '') {
      return null;
    }
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  private formatValue(num: number | null): string {
    if (num === null) {
      return '';
    }

    let valueToFormat = num;
    const propDecimalPlaces = this.decimalPlaces !== undefined ? Number(this.decimalPlaces) : undefined;
    const decimalPlaces = (propDecimalPlaces !== undefined && !isNaN(propDecimalPlaces))
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
    return valueToFormat.toFixed(decimalPlaces);
  }

  private clampValue(num: number): number {
    return Math.max(this.min, Math.min(this.max, num));
  }

  private getDecimalPlaces(value: number): number {
    const str = String(value);
    const decimalIndex = str.indexOf('.');
    return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
  }

  private clearStepTimer() {
    if(this.stepTimer) {
      clearInterval(this.stepTimer);
      this.stepTimer = null;
    }
  }

  private updateValidityState() {
    if (this.validStatus === 'custom' && !this.isValid) {
      this.internals.setValidity({ customError: true }, this.getErrorMessage('custom'));
      return;
    }

    let currentIsValid = true;
    let currentValidStatus: typeof this.validStatus = "";
    const valueStr = String(this.value).trim();
    const numValue = this.parseValue(this.value);

    if (this.required && valueStr === '') {
      currentIsValid = false;
      currentValidStatus = "valueMissing";
    } else if (valueStr !== '' && numValue === null) {
      currentIsValid = false;
      currentValidStatus = "typeMismatch";
    } else if (numValue !== null) {
      if (this.min !== undefined && numValue < this.min) {
        currentIsValid = false;
        currentValidStatus = "rangeUnderflow";
      } else if (this.max !== undefined && numValue > this.max) {
        currentIsValid = false;
        currentValidStatus = "rangeOverflow";
      } else if (this.step > 0 && this.step !== 1) {
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
              type="text"
              inputMode="decimal"
              name={this.name}
              disabled={this.disabled}
              readOnly={this.readonly}
              required={this.required}
              autoFocus={this.autofocus}
              min={this.min}
              max={this.max}
              step={this.step}
              value={this.value}
              onInput={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeydown}
            />
            <span class="suffix-wrapper" style={{ display: this.hasSuffix ? 'flex' : 'none' }}>
              <slot name="suffix" onSlotchange={this.handleSlotChange} />
            </span>
            <div class="input-number-handle">
              <span
                class="handle handle-up"
                onMouseDown={(e) => this.handleStepMouseDown(1, e)}
                onMouseUp={this.handleStepMouseUpOrLeave}
                onMouseLeave={this.handleStepMouseUpOrLeave}
              >
                <sy-icon size="xsmall">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path
                      fill="currentColor"
                      d="M303.5 207C312.9 197.6 328.1 197.6 337.4 207L497.4 367C506.8 376.4 506.8 391.6 497.4 400.9C488 410.2 472.8 410.3 463.5 400.9L320.5 257.9L177.5 400.9C168.1 410.3 152.9 410.3 143.6 400.9C134.3 391.5 134.2 376.3 143.6 367L303.6 207z"
                    />
                  </svg>
                </sy-icon>
              </span>
              <span
                class="handle handle-down"
                onMouseDown={(e) => this.handleStepMouseDown(-1, e)}
                onMouseUp={this.handleStepMouseUpOrLeave}
                onMouseLeave={this.handleStepMouseUpOrLeave}
              >
                <sy-icon size="xsmall">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path
                      fill="currentColor"
                      d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"
                    />
                  </svg>
                </sy-icon>
              </span>
            </div>
          </div>
          <div class={errorContainerClasses}>
            <slot name="error" onSlotchange={this.handleSlotChange}></slot>
          </div>
        </div>
      </div>
    );
  }
}
