// sy-radio-group.tsx

import { Component, Prop, State, Event, EventEmitter, h, Element, Method, Watch, Listen } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-radio-group',
  styleUrl: 'sy-radio-group.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SyRadioGroup {
  // --- Element References ---
  @Element() host: HTMLSyRadioGroupElement;
  private internals: ElementInternals;
  private slot!: HTMLSlotElement;
  private radioList: HTMLSyRadioElement[] = [];
  private radioButtonList: any[] = [];
  private initialValue: string = '';

  // --- Props ---
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  @Prop({ mutable: true, attribute: 'defaultValue' }) defaultValue: string = '';
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop({ reflect: true }) required: boolean = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() position: 'horizontal' | 'vertical' = 'horizontal';
  @Prop() variant: 'outlined' | 'solid' = 'outlined';
  @Prop() name: string = '';
  @Prop({ attribute: 'noNativeValidity', mutable: true }) noNativeValidity = false;

  // --- State ---
  @State() private selectedValue: string = '';
  @State() private touched: boolean = false;
  @State() private formSubmitted: boolean = false;
  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'custom' | '' = '';
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;
  @State() private isButtonGroup: boolean = false;

  // --- Events ---
  @Event() changed: EventEmitter<{ value: string; isValid: boolean; status: string }>;

  // --- Custom Validity Getters ---
  get validity(): ValidityState {
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

  formDisabledCallback(disabled: boolean) {
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

  formStateRestoreCallback(state: string) {
    this.selectedValue = state;
    this.updateRadioCheck();
    this.updateValidityState();
  }

  // --- Watchers ---
  @Watch('disabled')
  handleDisabledChange() {
    this.updateRadioDisabled();
  }

  @Watch('readonly')
  handleReadonlyChange() {
    this.updateRadioReadonly();
  }

  @Watch('variant')
  handleVariantChange() {
    this.updateRadioButtonVariant();
  }

  @Watch('size')
  handleSizeChange() {
    this.updateRadioButtonSize();
  }

  @Watch('defaultValue')
  handleDefaultValueChange() {
    this.setDefaultSelectedValue();
  }

  @Watch('selectedValue')
  handleSelectedValueChange() {
    this.updateFormValue();
  }

  // --- Public Methods ---
  @Method()
  async checkValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals.checkValidity();
  }

  @Method()
  async reportValidity(): Promise<boolean> {
    this.updateValidityState();
    if (!this.isValid && this.radioList.length > 0) {
      const firstRadio = this.radioList[0] as any;
      firstRadio?.querySelector('input')?.focus();
    }
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
  @Listen('selected', { target: 'body' })
  handleRadioSelected(e: CustomEvent<string>) {
    const target = e.target as HTMLElement;
    if (!this.host.contains(target) || (target.tagName !== 'SY-RADIO' && target.tagName !== 'SY-RADIO-BUTTON')) return;

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

  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    this.formSubmitted = true;

    const hasErrorSlot = !!this.host.querySelector('[slot="error"]');
    if (this.noNativeValidity || hasErrorSlot) {
      const errorSlotElement = this.host.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim() || errorSlotElement?.children.length > 0;

      if (hasContent) {
        this.hasSlotErrorMessage = true;
        e.preventDefault();
        e.stopPropagation();

        if (this.radioList.length > 0) {
          const firstRadio = this.radioList[0] as any;
          setTimeout(() => {
            firstRadio?.querySelector('input')?.focus();
          }, 0);
        }

        this.internals?.setValidity({ customError: true }, ' ');
      } else {
        this.hasSlotErrorMessage = false;
      }
    } else {
      this.hasSlotErrorMessage = false;
    }
    this.isValid = false;
  }

  // --- Event Handlers ---
  private handleFormSubmit = (_e: Event) => {
    this.formSubmitted = true;
    this.updateValidityState();
  };

  private handleSlotChange = () => {
    this.setRadioList();
    this.handleCustomErrorSlot();
  };

  private handleCustomErrorSlot = () => {
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
  private emitChangedEvent() {
    this.updateValidityState();
    this.changed.emit({
      value: this.selectedValue,
      isValid: this.isValid,
      status: this.validStatus
    });
  }

  private setRadioList() {
    if (!this.slot) return;

    const assignedElements = this.slot.assignedElements();
    this.radioList = [];
    this.radioButtonList = [];

    assignedElements.forEach((element) => {
      const tagName = element.tagName?.toLowerCase();
      if (tagName === 'sy-radio') {
        this.radioList.push(element as HTMLSyRadioElement);
      } else if (tagName === 'sy-radio-button') {
        this.radioButtonList.push(element);
      }
    });

    // [수정] 여기서 isButtonGroup 상태를 변경하는 코드를 제거합니다.
    // 상태는 componentWillLoad에서 한 번만 설정하는 것으로 충분합니다.
    // this.isButtonGroup = this.radioButtonList.length > 0;
  }

  private setDefaultSelectedValue() {
    this.selectedValue = this.defaultValue;

    if (this.selectedValue) {
      this.updateValidityState();
      this.emitChangedEvent();
    }

    this.updateRadioCheck();
  }

  private updateRadioReadonly() {
    this.radioList?.forEach((radio: any) => {
      radio.readonly = this.readonly;
    });
  }

  private updateRadioCheck() {
    this.radioList?.forEach((radio: any) => {
      radio.checked = radio.value === this.selectedValue;
    });

    this.radioButtonList?.forEach((radioButton: any) => {
      radioButton.checked = radioButton.value === this.selectedValue;
    });
  }

  private updateRadioDisabled() {
    this.radioList?.forEach((radio: any) => {
      radio.disabled = this.disabled;
    });

    this.radioButtonList?.forEach((radioButton: any) => {
      radioButton.disabled = this.disabled;
    });
  }

  private updateRadioButtonVariant() {
    this.radioButtonList?.forEach((radioButton: any) => {
      radioButton.variant = this.variant;
    });
  }

  private updateRadioButtonSize() {
    this.radioButtonList?.forEach((radioButton: any) => {
      radioButton.size = this.size;
    });
  }

  private updateFormValue() {
    if (this.internals) {
      this.internals.setFormValue(this.selectedValue, this.selectedValue);
    }
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    this.updateValidityState();
  }

  private updateValidityState() {
    if (this.validStatus === 'custom' && !this.isValid) {
      this.internals.setValidity({ customError: true }, this.getErrorMessage('custom'));
      return;
    }

    let currentIsValid = true;
    let currentValidStatus: typeof this.validStatus = "";

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
        this.internals.setValidity({ customError: true }, validityMessage);
      } else {
        this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
      }
    } else {
      this.internals.setValidity({});
    }
  }

  private getErrorMessage(type: typeof this.validStatus) {
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

    return (
      <div class="radio-group-container">
        <fieldset role="radiogroup" class={fieldsetClasses}>
          <slot
            ref={(el) => (this.slot = el as HTMLSlotElement)}
            onSlotchange={this.handleSlotChange}
          />
        </fieldset>
        <div class={errorContainerClasses}>
          <slot name="error" onSlotchange={this.handleCustomErrorSlot} />
        </div>
      </div>
    );
  }
}
