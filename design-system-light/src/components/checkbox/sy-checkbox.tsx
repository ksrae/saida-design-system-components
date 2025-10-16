// src/components/checkbox/sy-checkbox.tsx

import { Component, h, Prop, State, Method, Element, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'sy-checkbox',
  styleUrl: 'sy-checkbox.scss',
  shadow: false,
  formAssociated: true
})

export class SyCheckbox {
  @Element() hostElement: HTMLSyCheckboxElement;

  private internals: ElementInternals;
  private inputEl?: HTMLInputElement;
  private labelEl?: HTMLLabelElement;

  @Prop() titleText = '';
  @Prop() name = '';
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop({ mutable: true, reflect: true }) indeterminate = false;
  @Prop({ reflect: true }) readonly = false;
  @Prop() required = false;

  @State() private hasFocus = false;
  @State() isTree = false;
  @State() private renderIndeterminate = false;
  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'custom' | '' = "";
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;
  @State() private formSubmitted: boolean = false;


  @Event() changed: EventEmitter<{ value: boolean; isValid: boolean; checked: boolean; indeterminate: boolean; }>;
  @Event() focused: EventEmitter<boolean>;
  @Event() blured: EventEmitter<boolean>;

  // 원본의 커스텀 getter 로직
  get validity(): ValidityState {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return {
        badInput: false, customError: this.validStatus === 'custom', patternMismatch: false,
        rangeOverflow: false, rangeUnderflow: false, stepMismatch: false, tooLong: false,
        tooShort: false, typeMismatch: false, valid: false, valueMissing: this.validStatus === 'valueMissing'
      } as ValidityState;
    }
    return this.internals?.validity;
  }
  get validationMessage(): string {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      const errorMessage = this.getErrorMessage(this.validStatus);
      return this.validStatus === 'custom' ? 'Invalid by custom' : errorMessage;
    }
    return this.internals?.validationMessage;
  }
  get willValidate(): boolean {
    if (this.validStatus === 'custom' || this.hasSlotErrorMessage) {
      return true;
    }
    return this.internals?.willValidate;
  }

  // Lifecycle Methods
  connectedCallback() {
    if (this.hostElement.attachInternals && !this.internals) {
      this.internals = this.hostElement.attachInternals();
    }
    this.formSubmitListener();
    this.hostElement.addEventListener('keydown', this.handleKeydown);
  }
  disconnectedCallback() {
    this.formSubmitListenerRemover();
    this.hostElement.removeEventListener('keydown', this.handleKeydown);
  }
  componentDidLoad() {
    this.renderIndeterminate = this.indeterminate;
    this.isValid = !(this.required && !this.checked && !this.indeterminate);
  }
  componentDidRender() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.renderIndeterminate;
    }
  }

  // Form-Associated Callbacks
  formAssociatedCallback() { this.internals?.setFormValue(this.checked ? 'on' : null); }
  formDisabledCallback(disabled: boolean) { this.disabled = disabled; }
  formResetCallback() {
    this.checked = false;
    this.indeterminate = false;
    this.formSubmitted = false;
    this.setCheckedValidation();
  }
  formStateRestoreCallback(state: string) {
    this.checked = state === 'on';
    this.setCheckedValidation();
  }

  // Watchers
  @Watch('checked')
  handleCheckedChange() {
    if (!this.checked && this.indeterminate) {
      this.renderIndeterminate = this.indeterminate;
    } else {
      this.setCheckedValidation();
    }
    if (this.internals) {
      this.internals.setFormValue(this.checked ? 'on' : null);
    }
  }
  @Watch('indeterminate')
  handleIndeterminateChange() {
    this.renderIndeterminate = this.indeterminate;
    if (this.checked && this.indeterminate) {
      this.renderIndeterminate = false;
    }
  }

  // Public Methods
  @Method() async setFocus() { this.labelEl?.focus(); this.handleFocus(); }
  @Method() async setBlur() { this.labelEl?.blur(); this.handleBlur(); }
  @Method() async checkValidity(): Promise<boolean> { this.updateValidityState(); return this.internals.checkValidity(); }
  @Method() async reportValidity(): Promise<boolean> { this.updateValidityState(); return this.internals.reportValidity(); }
  @Method() async setCustomError() { this.customSettingError(); }
  @Method() async clearCustomError() {
    if (!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }

  // Event Handlers
  private handleFocus = () => { this.hasFocus = true; this.focused.emit(this.checked); }
  private handleBlur = () => { this.hasFocus = false; this.blured.emit(this.checked); }
  private handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (this.disabled || this.readonly) return;
    this.checked = !this.checked;
  }
  private onChange = (e: Event) => {
    e.preventDefault();
    if (this.disabled || this.readonly) return;
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
  }
  private handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      this.checked = !this.checked;
    }
  }
  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    this.updateValidityState();
  }

  // Private Methods
  private formSubmitListener() { if (this.internals?.form) this.internals.form.addEventListener('submit', this.handleFormSubmit); }
  private formSubmitListenerRemover() { if (this.internals?.form) this.internals.form.removeEventListener('submit', this.handleFormSubmit); }
  private setCheckedValidation() {
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    this.updateValidityState();
    this.setEvent('changed', this.checked);
  }
  private setEvent(eventName: string, value: any) {
    if (eventName === 'changed') {
      this.changed.emit({ value, isValid: this.isValid, checked: this.checked, indeterminate: this.renderIndeterminate });
    }
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    this.internals.setValidity({ customError: true }, "Custom validation error");
  }

  private handleCustomErrorSlot = (e: Event) => {
    const errorSlot = e.target as HTMLSlotElement;
    if (!errorSlot) return;
    const errorNodes = errorSlot.assignedNodes({ flatten: true });
    this.hasPopupErrorComponent = errorNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName?.toLowerCase() || '';
        return ['sy-tooltip', 'sy-popover', 'sy-popconfirm', 'sy-inline-message'].includes(tagName) || !!element.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
      }
      return false;
    });
    this.hasSlotErrorMessage = errorNodes.some(node =>
      (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) ||
      (node.nodeType === Node.ELEMENT_NODE && (!!(node as Element).textContent?.trim() || (node as Element).children.length > 0))
    );
  };

  private updateValidityState() {
    if (this.validStatus === 'custom' && !this.isValid) {
      this.internals.setValidity({ customError: true }, "Custom validation error");
      return;
    }
    const isValid = !(this.required && !this.checked && !this.indeterminate);
    this.isValid = isValid;
    this.validStatus = isValid ? "" : "valueMissing";
    if (!isValid) {
      this.internals.setValidity({ valueMissing: true }, this.getErrorMessage('valueMissing'));
    } else {
      this.internals.setValidity({});
    }
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = { valueMissing: "This checkbox is required" };
    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }

  render() {
    const wrapperClasses = { 'checkbox': true, 'checkbox--checked': this.checked, 'checkbox--disabled': this.disabled, 'checkbox--focused': this.hasFocus, 'checkbox--indeterminate': this.renderIndeterminate, 'readonly': this.readonly };
    const errorContainerClasses = { 'error-container': true, 'popup-error-container': this.hasPopupErrorComponent, 'text-error-container': !this.hasPopupErrorComponent, 'visible-error': this.formSubmitted && !this.isValid };

    return (
      <div class="checkbox-wrapper">
        <label ref={el => this.labelEl = el} class={Object.keys(wrapperClasses).filter(k => wrapperClasses[k]).join(' ')} tabindex="0" onClick={this.handleClick}>
          <input ref={el => this.inputEl = el} class="checkbox--input" type="checkbox" title={this.titleText} name={this.name} checked={this.checked} disabled={this.disabled} required={this.required} aria-checked={this.checked ? 'true' : 'false'} aria-describedby="help-text" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.onChange} tabindex="-1" />
          <span class={`checkbox-visual-label ${this.isTree ? 'checkbox-label' : ''}`}>
            <sy-icon size="xsmall" class="checked">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M534 132.5C544.8 140.2 547.2 155.2 539.5 166L275.5 534C271.4 539.7 265 543.4 258 543.9C251 544.4 244 542 239 537L103 401C93.6 391.6 93.6 376.4 103 367.1C112.4 357.8 127.6 357.7 136.9 367.1L253 483L500.5 138C508.2 127.2 523.2 124.8 534 132.5z"/></svg>
            </sy-icon>
            <sy-icon size="xsmall" class="indeterminate">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M64 128C64 92.7 92.7 64 128 64L512 64C547.3 64 576 92.7 576 128L576 512C576 547.3 547.3 576 512 576L128 576C92.7 576 64 547.3 64 512L64 128z"/></svg>
            </sy-icon>
          </span>
          <div class={`checkbox-slot ${this.isTree ? 'checkbox-slot' : ''}`}>
            <slot></slot>
          </div>
        </label>
        <div class={Object.keys(errorContainerClasses).filter(k => errorContainerClasses[k]).join(' ')}>
          <slot name="error" onSlotchange={this.handleCustomErrorSlot}></slot>
        </div>
      </div>
    );
  }
}
