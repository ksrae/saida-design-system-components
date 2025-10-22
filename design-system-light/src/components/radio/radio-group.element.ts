import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from './styles/radio-group.scss?inline';

@customElement('sy-radio-group')
export class RadioGroupElement extends LitElement {
  // form 연동을 위한 속성 추가
  static formAssociated = true;
  
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) defaultValue: string = '';
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) position: 'horizontal' | 'vertical' = 'horizontal'; // horizontal, vertical
  @property({ type: String }) variant : 'outlined' | 'solid' = 'outlined'; 
  @property({ type: String }) name: string = '';
  
  @state() private selectedValue: string = '';
  @state() private touched = false;
  @state() private formSubmitted = false;

  @state() private isValid: boolean = true;
  @state() private validStatus: 'valueMissing' | 'custom' | '' = "";  // 상태 코드 추가: valid, required, tooShort, tooLong 등
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;

  @query('slot') slot!: any;
  private radioList: any[] = [];
  private radioButtonList: any[] = []; 

  private internals: ElementInternals;
  private initialValue: string = '';

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.initialValue = this.defaultValue;
  }

  static styles: CSSResultGroup = css`
  ${unsafeCSS(globalCSS)};
`

  // validity 상태를 반환 - 커스텀 에러 상태 고려
  get validity() { 
    // 커스텀 에러나 슬롯 에러가 설정된 경우 가상의 ValidationState 반환
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      // 브라우저의 ValidityState와 유사한 객체 반환
      return {
        badInput: false,
        customError: this.validStatus === 'custom',
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valid: false,
        valueMissing: this.validStatus === 'valueMissing'
      };
    }
    
    return this.internals.validity; 
  }

  // validation 메시지 반환 - 커스텀 에러 상태 고려
  get validationMessage() { 
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      // 커스텀 메시지를 반환하거나 기본 메시지 사용
      const errrorMessage = this.getErrorMessage(this.validStatus);
      return this.validStatus === 'custom' ? 'Invalid by custom' : errrorMessage;
    }
    return this.internals.validationMessage; 
  }

  // 폼 내 유효성 상태 확인 - 항상 true 반환 (커스텀 에러 처리 가능)
  get willValidate() { 
    // 커스텀 에러나 슬롯 에러는 무조건 유효성 검사 대상
    if (this.validStatus === 'custom' || this.hasSlotErrorMessage) {
      return true;
    }
    return this.internals.willValidate; 
  }


  // checkValidity 메서드 수정 (이미 업데이트한 경우 그대로 유지)
  public checkValidity(): boolean {
    this.updateValidityState();
    return this.internals.checkValidity();
  }

  // reportValidity 메서드 수정
  public reportValidity(): boolean {
    this.updateValidityState();
    return this.internals.reportValidity();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.formSubmitListener();
  }

  async firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
    await this.updateComplete;
    this.radioList = [];
    this.radioButtonList = [];
    this.isValid = this.required && (this.defaultValue || this.selectedValue) ? true : false;
    this.setRadioList();  
    

    // this.addEventListener('selected', this.#handleChange);

    // if defaultvalue is exists, event fired.
    if(this.defaultValue) {
      this.setDefaultSelectedValue();
    } else {
      // this.#setValid();
    }

    if(this.disabled) {
      this.updateRadioDisabled();
    }

    if(this.readonly) {
      this.updateRadioReadonly();
    } 

    if(this.variant) {
      this.updateRadioButtonVariant();
    }

    if(this.size) {
      this.updateRadioButtonSize();
    }

  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if(changedProperties.has('disabled')) {
      this.updateRadioDisabled();
    }
    if(changedProperties.has('readonly')) {
      this.updateRadioReadonly();
    }
    if(changedProperties.has('variant')) {
      this.updateRadioButtonVariant();
    }
    if(changedProperties.has('size')) {
      this.updateRadioButtonSize();
    }
    if(changedProperties.has('defaultValue')) {
      this.setDefaultSelectedValue();
    }
    // 선택된 값이 변경되면 폼 값도 업데이트
    if (changedProperties.has('selectedValue')) {
      this.updateFormValue();
    }
  }
  
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.formSubmitListenerRemover();
    // this.removeEventListener('selected', this.#handleChange);
  }

  private formSubmitListener() {
    if(this.internals.form) {
      this.internals.form.addEventListener('submit', this.handleFormSubmit);
    }
  }
  private formSubmitListenerRemover() {
    if(this.internals.form) {
      this.internals.form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  public setCustomError() {
    this.customSettingError();
  }

  public clearCustomError() {
    if(!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }

  render() {
    return html`
    <div class="radio-group-container">
      <fieldset role="radiogroup" 
        class=${classMap({
          'radio-group': true,
          'radio-group-position-horizontal': this.position === 'horizontal',
          'radio-group-position-vertical': this.position === 'vertical',
        })}
      >
        <slot @selected=${this.handleChange}></slot>
      </fieldset>
      <div class="${classMap({
          'error-container': true,
          'popup-error-container': this.hasPopupErrorComponent,
          'text-error-container': !this.hasPopupErrorComponent,
          'visible-error': this.formSubmitted && !this.isValid 
        })}">
          <slot name="error" class="error-message" @slotchange=${this.handleCustomErrorSlot}></slot>
      </div>
    </div>
    `;
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    
    this.updateValidityState();
    this.requestUpdate();
  }

  private setRadioList() {
    this.slot.assignedNodes()?.forEach((element: any) => {
      if(element.tagName && element.tagName.toLowerCase() === 'sy-radio') {
        this.radioList.push(element);
      } else if(element.tagName && element.tagName.toLowerCase() === 'sy-radio-button') {
        this.radioButtonList.push(element);
      }
    });
  }
  
  /* The function is the change event when a radio button within the radio group is selected. */
  private handleChange = (e: any) => {
    e.stopPropagation();

    if(this.readonly) {
      return;
    }

    this.selectedValue = e.detail;

    if(this.selectedValue) {
      this.touched = true;
      this.setValidation();
      this.selectedEvent();
      this.updateFormValue();
    }

    this.updateRadioCheck();
  }

  /* The function sets a default selected value, validates it, updates radio check, and triggers a default selected event. */
  private setDefaultSelectedValue() {
    this.selectedValue = this.defaultValue;
  
    if(this.selectedValue) {
      this.touched = true;
      this.setValidation();
      this.selectedEvent();
      // this.#setValid(true);
    }
  
    this.updateRadioCheck();
    // this.selectedEvent();
  }

  /**
   * The function sets the `readonly` property of all `sy-radio` elements to match
   * the `readonly` property of the parent element.
   */
  private updateRadioReadonly() {
    this.radioList?.forEach((radio: any) => {
      radio.readonly = this.readonly;
    });
  }

  /**
   * The function sets all 'sy-radio' elements checked property based on the selected value.
   */
  private updateRadioCheck() {
    this.radioList?.forEach((radio: any) => {
      radio.checked = radio.value === this.selectedValue;
    });

    this.radioButtonList?.forEach((radioButton: any) => {
      radioButton.checked = radioButton.value === this.selectedValue;
    });
  }

  /**
   * The function disables or enables all radio based on the `isDisabled` parameter.
   */
  private updateRadioDisabled() {
    this.radioList?.forEach((radio: any) => {
      radio.disabled = this.disabled;
    });

    this.radioButtonList?.forEach((radioButton: any) => {
      radioButton.disabled = this.disabled;
    });
  }

  // button only
  private updateRadioButtonVariant() {
    this.radioButtonList?.forEach((radioButton: any) => {
      radioButton.variant = this.variant;
    });
  }

  private updateRadioButtonSize() {
    this.radioButtonList?.forEach((radioButton:any) => {
      radioButton.size = this.size;
    })
  }

  private selectedEvent() {
    this.dispatchEvent(new CustomEvent('selected', {
      detail: {value: this.selectedValue, isValid: this.isValid},
      bubbles: true,
      composed: true
    }));
  }

  private setValidation() {    
    // isValid를 직접 설정하지 않고 updateValidityState()를 통해 처리
    this.updateValidityState();
    this.requestUpdate();
  }

  // 폼 값 업데이트 메서드
  private updateFormValue() {
    // 선택된 값을 폼 값으로 설정
    this.internals.setFormValue(this.selectedValue);
  }

  // 폼 연결 콜백
  formAssociatedCallback() {
    // 초기 폼 값 설정
    this.updateFormValue();
  }

  // 폼 비활성화 콜백
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    // this.updateRadioDisabled();
  }

  // 폼 리셋 콜백
  formResetCallback() {
    this.selectedValue = this.initialValue;
    this.defaultValue = this.initialValue;
    this.touched = false;
    this.formSubmitted = false;

    this.updateRadioCheck();
    this.updateFormValue();
  }

  // 폼 상태 복원 콜백
  formStateRestoreCallback(state: string) {
    this.selectedValue = state;
    this.updateRadioCheck();
    this.isValid = !!this.selectedValue;
  }

  // customSettingError 함수 수정
  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    
    // 항상 사용자 정의 오류를 internals에 설정
    this.internals.setValidity(
      { customError: true },
      "Custom validation error"
    );
    
    this.requestUpdate();
  }

  // handleCustomErrorSlot 함수 추가
  private handleCustomErrorSlot() {
    const errorSlot = this.renderRoot?.querySelector('slot[name="error"]') as HTMLSlotElement;
    if (!errorSlot) return;
    
    // 슬롯에 할당된 노드들을 가져옴
    const errorNodes = errorSlot.assignedNodes();
    
    // 특수 컴포넌트(tooltip, popover 등) 존재 여부 확인
    this.hasPopupErrorComponent = errorNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName?.toLowerCase() || '';
        
        // 직접 특수 컴포넌트인지 확인
        if (tagName === 'sy-tooltip' || 
            tagName === 'sy-popover' || 
            tagName === 'sy-popconfirm' || 
            tagName === 'sy-inline-message') {
          return true;
        }
        
        // 자식 요소로 특수 컴포넌트를 포함하는지 확인
        return !!element.querySelector(
          'sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message'
        );
      }
      return false;
    });
    
    // 슬롯에 내용이 있는지 확인
    this.hasSlotErrorMessage = errorNodes.some(node => {
      // 텍스트 노드이고 내용이 있는 경우
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
      // 엘리먼트 노드이고 내부에 실제 콘텐츠가 있는 경우
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        
        // 내부 텍스트가 있거나 자식 요소가 있는 경우만 콘텐츠로 간주
        return !!(element.textContent?.trim() || element.children.length > 0);
      }
      return false;
    });
    
    // 요소가 업데이트되도록 상태 변경을 알림
    this.requestUpdate();
  }

  // 유효성 검사 메서드 수정
  private updateValidityState() {
    // 사용자 정의 오류가 설정된 경우
    if (this.validStatus === 'custom' && !this.isValid) {
      // 항상 internals에 customError 상태를 설정
      this.internals.setValidity(
        { customError: true },
        "Custom validation error"
      );
      return;
    }

    const validityMessage = this.getErrorMessage('valueMissing');
    
    // 유효성 상태 결정
    const isValid = !(this.required && !this.selectedValue);
    this.isValid = isValid;
    this.validStatus = isValid ? "" : "valueMissing";
    
    // ElementInternals 설정 - 슬롯 에러 유무와 관계없이 항상 정확한 상태 반영
    if (!isValid) {
      this.internals.setValidity(
        { valueMissing: true }, 
        validityMessage
      );
    } else {
      this.internals.setValidity({});
    }
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "This radio is required",
    }

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }
}
