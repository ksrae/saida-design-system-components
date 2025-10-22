import { LitElement, CSSResultGroup, css, unsafeCSS, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import globalCSS from './styles/input-number.scss?inline';
import { classMap } from 'lit/directives/class-map.js';
import '../icon/icon.element';

@customElement('sy-input-number')
export class InputNumberElement extends LitElement {
  // 폼 연관 요소로 등록
  static formAssociated = true;
  
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;
  
  // ElementInternals 인스턴스 저장
  private internals: ElementInternals;

  constructor() {
    super();
    // ElementInternals 객체 생성
    this.internals = this.attachInternals();
    this.addEventListener('invalid', this.handleInvalid);
  }
  
  @property({ type: Boolean }) autofocus = false;
  @property({ type: Boolean, reflect: true }) borderless = false;
  @property({ type: Number }) decimalPlaces!: number | undefined;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) label: string = '';
  @property({ type: Number }) max: number = Number.MAX_SAFE_INTEGER;
  @property({ type: Number }) min: number = Number.MIN_SAFE_INTEGER;
  @property({ type: String }) name: string = '';
  @property({ type: String }) prefix: string = '';
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String }) rounding: 'round' | 'ceil' | 'floor' | '' = '';
  @property({ type: String, reflect: true }) size: 'medium' | 'small' | 'large' = 'medium';
  @property({ type: Number }) step: number = 1;
  @property({ type: String }) status: 'default' | 'warning' | 'error' | 'success' = 'default';  // 사용자 지정 UI 상태
  @property({ type: String }) suffix: string = '';
  @property({ type: String })
  set value(val: string | number) {
    this._value = typeof val === 'number' ? val.toString() : val;
  }
  get value(): string {
    return this._value;
  }
  
  @property({ type: Boolean }) noNativeValidity = false;

  @state() private hasFocus = false;
  @state() private touched: boolean = false; // 사용자가 input과 상호작용했는지 추적
  @state() private formSubmitted: boolean = false;
  @state() private isValid = true;
  @state() private validStatus: 'valueMissing' | 'rangeOverflow' | 'rangeUnderflow' | 'stepMismatch' | 'custom' | '' = '';  // 내부 유효성 상태
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;
  
  @query('input') inputNumber!: HTMLInputElement;
  
  private _value: string = '';
  private lastValidValue: number | null = null;
  private innerDecimalPlaces: number | undefined = undefined;
  private stepTimer: any;
  private stepInterval = 200;
  private originalValue: number | undefined = undefined; // 사용자 입력 원본값 (라운딩 적용 전)
  private displayValue: string = ''; // 화면 출력값
  private initialValue: string = ''; // 초기값 문자열로 변경
  private inputBuffer: string = ''; // 키보드 입력 중 임시 버퍼

  private setFormValue() {
    // 폼 제출 시 사용할 값 설정 - originalValue의 숫자값 사용
    this.internals.setFormValue(this.originalValue?.toString() || '');
  }

  public setFocus() {
    this.inputNumber?.focus();
    this.handleFocus();
  }
  
  public setBlur() {
    this.hasFocus = false;
    this.inputNumber?.blur();

    this.blurEvent(this.originalValue);
  }

  // formReset 이벤트 핸들러 추가
  public formResetCallback() {
    this.originalValue = this.parseValueString(this.initialValue);
    this.updateDisplay();
    this.touched = false;
    this.formSubmitted = false;
    this.updateValidityState();
    this.requestUpdate();
  }

  // formDisable 이벤트에 대응
  public formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    this.requestUpdate();
  }

  public setClear() {
    // 모든 값 초기화
    this.originalValue = undefined;
    this.displayValue = '';
    
    // input 요소의 값 제거
    if (this.inputNumber) {
      this.inputNumber.value = '';
    }
        
    // 유효성 상태 업데이트
    this.updateValidityState();
    
    // 폼 값 설정
    this.setFormValue();
    
    // UI 업데이트를 위한 requestUpdate 호출
    this.requestUpdate();
    
    // 변경 이벤트 발생
    this.changedEvent(undefined);
  }

  // value가 설정될 때 타입 검증을 위한 별도 메서드 - 삭제 (더이상 this.value 수정 안함)
  
  // 문자열 value를 숫자로 파싱하는 메서드
  private parseValueString(valueStr: string): number {
    if (!valueStr || valueStr.trim() === '') return 0;
    const num = parseFloat(valueStr);
    return isNaN(num) ? 0 : num;
  }
  
  // 디스플레이 값 업데이트 메서드
  private updateDisplay(targetValue?: number) {
    const valueToUse = targetValue !== undefined ? targetValue : this.originalValue;
    
    if (valueToUse === undefined) {
      this.displayValue = '';
    } else {
      // 라운딩과 소수점 적용
      this.innerDecimalPlaces = this.decimalPlaces === undefined 
        ? Math.max(this.getDecimalPlaces(this.step), this.getDecimalPlaces(valueToUse)) 
        : this.decimalPlaces;
      
      const roundedValue = this.setRoundValue(valueToUse);
      this.displayValue = Number(roundedValue.toFixed(this.innerDecimalPlaces)).toString();
    }
    
    // DOM 입력 필드 업데이트
    if (this.inputNumber) {
      this.inputNumber.value = this.displayValue;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this.handleHostFocus);
    this.formSubmitListener();
    // 초기 값 저장 (form reset에서 사용)
    this.initialValue = this._value;
    
    // 초기 originalValue 설정
    this.originalValue = this.parseValueString(this._value);
    
    // tabindex 속성 추가하여 포커스 가능하게 함
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleHostFocus);
    
    this.formSubmitListenerRemover();
    this.stopStepTimer();
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

  // JavaScript DOM API와 호환을 위한 메서드 구현
  public stepUp(n: number = 1): void {
    for (let i = 0; i < n; i++) {
      this.performStepUp();
    }
  }

  public stepDown(n: number = 1): void {
    for (let i = 0; i < n; i++) {
      this.performStepDown();
    }
  }

  // 단일 step 증가 동작 수행
  private performStepUp(): void {
    const currentValue = this.originalValue ?? 0;
    this.touched = true;
    
    const stepUpValue = this.safeAdd(currentValue, this.step);
    const clampedValue = Math.min(stepUpValue, this.max);
    const finalValue = Math.max(clampedValue, this.min);
    
    // 사용자 조작이므로 originalValue 업데이트
    this.originalValue = finalValue;
    this.updateDisplay();
    this.updateValidityState();
    this.setFormValue();
    this.changedEvent(this.originalValue);
    this.requestUpdate();
  }

  // 단일 step 감소 동작 수행
  private performStepDown(): void {
    const currentValue = this.originalValue ?? 0;
    this.touched = true;
    
    const stepDownValue = this.safeSubtract(currentValue, this.step);
    const clampedValue = Math.max(stepDownValue, this.min);
    const finalValue = Math.min(clampedValue, this.max);
    
    // 사용자 조작이므로 originalValue 업데이트
    this.originalValue = finalValue;
    this.updateDisplay();
    this.updateValidityState();
    this.setFormValue();
    this.changedEvent(this.originalValue);
    this.requestUpdate();
  }

  async firstUpdated() {
    await this.updateComplete;

    this.step = this.step && this.step > 0 ? this.step : 1;
    this.validateMinMax();
    this.updateValidityState();
    this.setFormValue();

  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if(changedProperties.has('autofocus')) {
      if(this.inputNumber && this.autofocus) {
        setTimeout(() => {
          this.inputNumber.focus();
        }, 0);
      }
    }
    if (changedProperties.has('min') || changedProperties.has('max')) {
      this.validateMinMax();
      this.updateValidityState();
    } 
    
    if (changedProperties.has('decimalPlaces')) {
      this.validateNumberProperty('decimalPlaces', this.decimalPlaces);
      // decimalPlaces가 변경되면 디스플레이 업데이트
      this.updateDisplay();
    } 
    
    if(changedProperties.has('step')) {
      this.step = this.step && this.step > 0 ? this.step : 1;
    } 
    
    // value property 변경 시 (외부에서 설정)
    if (changedProperties.has('value')) {
      // const oldValue = changedProperties.get('value');
        // 문자열 value를 originalValue에 반영
        this.originalValue = this.parseValueString(this._value);
        this.updateDisplay();
        this.updateValidityState();
        this.setFormValue();
      
    }
    
    // rounding 변경 시 디스플레이 업데이트
    if (changedProperties.has('rounding')) {
      this.updateDisplay();
    }
    
    if (changedProperties.has("required")) {
      this.updateValidityState();
    }
  }

  render() {
    return html`
    <div
    class=${classMap({
      'input--item': true,
      'input--item-vertical': true,
      'input--suffix': this.suffix,
      })}>
      ${this.label && this.label?.trim().length > 0 ? html`
        <span class="input--label">
          ${this.required ? html`<span class="required">*</span>` : nothing}
          ${this.label}
        </span>
      ` : nothing}
      <div class="input-wrapper">
        <div 
        tabindex="0"  
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        class=${classMap({    
          'input' : true,
          'input--borderless': this.borderless,
          'input--focused': this.hasFocus,
          'input--small': this.size === 'small',
          'input--medium': this.size === 'medium',
          'input--large': this.size === 'large',
          'input--default': this.status === 'default',
          'input--warning': this.status === 'warning',
          'input--error': this.status === 'error',
          'input--success': this.status === 'success',
          // 'input--valid': (this.formSubmitted || this.touched) && (this.isValid || this.validStatus === ''),
          'input--invalid': (this.formSubmitted || this.touched) && (!this.isValid || this.validStatus?.length),
        })}>
          ${this.prefix ? html`<span class="prefix">${this.prefix}</span>` : ''}
          <input
            type="number"
            value=${ifDefined(this._value ?? undefined)}
            ?autofocus=${this.autofocus}
            min=${ifDefined(this.min ?? undefined)}
            max=${ifDefined(this.max ?? undefined)}
            step=${this.step ?? 1}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            @keydown=${this.handleKeydown}
            @keyup=${this.handleKeyup}
            @input=${this.handleChange}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />
          ${this.suffix ? html`<span class="suffix">${this.suffix}</span>` : ''}
          <span class="input-number-handle">
            <span class="handle handle-up" @mousedown=${this.stepUpStart} @mouseup=${this.stepStop} @mouseleave=${this.stepStop}>
              <sy-icon size="xsmall"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M303.5 207C312.9 197.6 328.1 197.6 337.4 207L497.4 367C506.8 376.4 506.8 391.6 497.4 400.9C488 410.2 472.8 410.3 463.5 400.9L320.5 257.9L177.5 400.9C168.1 410.3 152.9 410.3 143.6 400.9C134.3 391.5 134.2 376.3 143.6 367L303.6 207z"/></svg></sy-icon>
            </span>
            <span class="handle handle-down" @mousedown=${this.stepDownStart} @mouseup=${this.stepStop} @mouseleave=${this.stepStop}>
            <sy-icon size="xsmall"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"/></svg></sy-icon>
            </span>
          </span> 
        </div>
        <div class="${classMap({
            'error-container': true,
            'popup-error-container': this.hasPopupErrorComponent,
            'text-error-container': !this.hasPopupErrorComponent,
            'visible-error': (this.touched || this.formSubmitted) && !this.isValid // 유효한 상태일 때는 숨김
          })}">
            <slot name="error" class="error-message" @slotchange=${this.handleCustomErrorSlot}></slot>
        </div>  
                
      </div>
    </div>
    `;
  }

  private validateValue(): number | null {
    const value = this.inputNumber.value !== '' ? Number(this.inputNumber.value) : '';
    
    if (typeof value !== 'number' || typeof value === 'number' && isNaN(value)) {
      return null;
    }
    
    if (this.min !== null && value < this.min) {
      return null;
    }

    if (this.max !== null && value > this.max) {
      return null;
    }

    return value;
  }


  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    this.updateValidityState();
    this.requestUpdate();
  }
 
  private stepUpStart(e: Event) {
    if (this.readonly || this.disabled) {
        e.preventDefault();
        return;
    }

    // Initial step
    this.performStepUp();

    // Start interval for continuous stepping if not already started
    if (this.stepTimer === null) {
      this.stepTimer = window.setInterval(() => {
        this.performStepUp();
      }, this.stepInterval);
    }

    // Prevent text selection
    e.preventDefault();
  }

  private stepDownStart(e: Event) {
    if (this.readonly || this.disabled) {
        e.preventDefault();
        return;
    }

    // Initial step
    this.performStepDown();

    // Start interval for continuous stepping if not already started
    if (this.stepTimer === null) {
      this.stepTimer = window.setInterval(() => {
        this.performStepDown();
      }, this.stepInterval);
    }

    // Prevent text selection
    e.preventDefault();
  }
  private stepStop = () => {
    if (this.stepTimer !== null) {
      window.clearInterval(this.stepTimer);
      this.stepTimer = null;
    }

    this.inputNumber?.focus();
  }

  // 기존 updateValue 메서드 제거 - 더이상 this.value 수정하지 않음

  // this function is only used when this.decimalPlaces is null or undefined.
  private roundToFixed(num: number) {
    const digits = Math.max(0, -Math.floor(Math.log10(this.step)));
    return Number(num.toFixed(digits));
  }

  // 부동소수점 연산을 안전하게 처리하는 함수
  private safeAdd(a: number, b: number): number {
    const decimalsA = this.getDecimalPlaces(a);
    const decimalsB = this.getDecimalPlaces(b);
    const maxDecimals = Math.max(decimalsA, decimalsB);
    const multiplier = Math.pow(10, maxDecimals);
    
    return Math.round((a * multiplier + b * multiplier)) / multiplier;
  }

  private safeSubtract(a: number, b: number): number {
    const decimalsA = this.getDecimalPlaces(a);
    const decimalsB = this.getDecimalPlaces(b);
    const maxDecimals = Math.max(decimalsA, decimalsB);
    const multiplier = Math.pow(10, maxDecimals);
    
    return Math.round((a * multiplier - b * multiplier)) / multiplier;
  }

  // 기존 private checkValidity 함수의 이름을 validateAndNotify로 변경
  private validateAndNotify() {
    // 값이 비어있는 경우 처리
    if (this.inputNumber.value === '') {
      if (this.required) {
        this.isValid = false;
        this.validStatus = 'valueMissing';
      } else {
        // 필수가 아닌 경우 빈 값도 유효함
        this.isValid = true;
        this.validStatus = '';
        this.lastValidValue = null;
      }
    } else {
      // 숫자 값 검증
      const numValue = Number(this.inputNumber.value);
      
      // NaN 체크
      if (isNaN(numValue)) {
        this.isValid = false;
        this.validStatus = 'custom';
      } 
      // 최소값 체크
      else if (this.min !== null && numValue < this.min) {
        this.isValid = false;
        this.validStatus = 'rangeUnderflow';
        this.lastValidValue = this.min;
      } 
      // 최대값 체크
      else if (this.max !== null && numValue > this.max) {
        this.isValid = false;
        this.validStatus = 'rangeOverflow';
        this.lastValidValue = this.max;
      } 
      // step 체크 (정수 배수 검사)
      // else if (this.step > 0 && ((numValue - (this.min || 0)) % this.step !== 0)) {
      //   this.isValid = false;
      //   this.validStatus = 'stepMismatch';
      //   this.lastValidValue = numValue;
      // } 
      else {
        this.isValid = true;
        this.validStatus = '';
        this.lastValidValue = numValue;
      }
    }
    
    // // 변경 이벤트 발생
    // this.dispatchEvent(
    //   new CustomEvent("valid", {
    //     detail: { 
    //       value: this.lastValidValue, 
    //       isValid: this.isValid, 
    //       status: this.validStatus
    //     },
    //     bubbles: true,
    //     composed: true,
    //   })
    // );
    
    // ElementInternals에 유효성 상태를 반영하기 위해 updateValidityState 호출
    this.updateValidityState();
  }

  private validateMinMax() {
    this.min = this.min === null || this.min === undefined ? Number.MIN_SAFE_INTEGER : this.min;
    this.max = this.max === null || this.max === undefined  || this.min >= this.max ? Number.MAX_SAFE_INTEGER : this.max;
  }

  private validateNumberProperty(prop: string, value: any) {
    if (typeof value !== 'number' || isNaN(value)) {
      (this as any)[prop] = null;
    }
  }

private setRoundValue(value: number): number {
    // value가 숫자가 아닌 경우 처리
    if (typeof value !== 'number' || isNaN(value)) {
      return 0; // 또는 기본값
    }
    
    // innerDecimalPlaces가 undefined인 경우 처리
    const decimalPlaces = this.innerDecimalPlaces ?? 0;
    
    switch (this.rounding) {
      case 'ceil':
        return Math.ceil(value * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
      case 'floor':
        return Math.floor(value * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
      case 'round':
        return Math.round(value * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
      default:
        return value;
    }
}

  private getDecimalPlaces(value: number) {
    const str = value.toString();
    const decimalIndex = str.indexOf('.');
    
    return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
  }

  // 입력 값을 초기화하는 메소드
  // private resetInput(resetValue: boolean = false) {
  //   const valueStr = this.inputNumber.value ? this.inputNumber.value?.toString() : '';
    
  //   let value: number | null = parseFloat(valueStr);
  //   let isReset = false;

  //   if (this.inputNumber.value === '' || isNaN(value)) {
  //     isReset = true;
  //   } 
    

  //   if(resetValue && isReset) {
  //     this.inputNumber.value = this.value ? this.value.toString() : '';
  //     this.updateValue(null);
  //   }
    
  //   return isReset;
  // }

  private handleKeydown(event: KeyboardEvent) {   
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.stepUpStart(event);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.stepDownStart(event);
    } else if (event.key === 'Enter') {
      // this.inputNumber.blur();
    } else if (event.key === 'Escape') {
      // 입력 취소
    } else if (event.key === 'Backspace') {
      // 백스페이스는 브라우저가 처리
    } else if(event.key === '-') {
      // 마이너스 키 처리
      this.inputBuffer += event.key;
      if(this.inputNumber.value !== '') {
        if(this.isPartiallyNotNumber()) {
          this.inputBuffer = this.inputBuffer.slice(0, -1);
          event.preventDefault();
        }
      }
    }
    else if(event.key === 'e' || event.key === 'E') {
      // 지수 표기법 처리
      if(!this.inputBuffer.includes('e') && !this.inputBuffer.includes('E')) {
        this.inputBuffer += event.key;
      } else {
        this.inputBuffer += event.key;
        if(this.isPartiallyNotNumber()) {
          this.inputBuffer = this.inputBuffer.slice(0, -1);
          event.preventDefault();
        }
      }
    }
    else {
      // 기타 키 입력 처리
      this.inputBuffer += event.key;
      if(this.isPartiallyNotNumber()) {
        this.inputBuffer = this.inputBuffer.slice(0, -(event.key.length));
        event.preventDefault();
      }
    }
  }

  private isPartiallyNotNumber() {
    return Number.isNaN(Number(this.inputBuffer));
  }

  private handleKeyup = (event: KeyboardEvent) => {
    // Immediately stop stepping when ArrowUp or ArrowDown keys are released
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.stepStop();
    } else if(event.key === 'Enter') {
      this.inputNumber.blur();
    } else if(event.key === 'Backspace') {
      // 백스페이스 시 inputBuffer 동기화
      this.inputBuffer = this.inputNumber.value;
    }
  }

  private handleChange(event: any) {
    event.preventDefault();

    if(this.readonly || this.disabled) {    
      return;
    }

    this.touched = true;
    const inputValue = event.target.value;
    let numValue = this.parseValueString(inputValue);
    
    // 값이 범위를 벗어나는지 확인하고 조정
    if (this.min !== undefined && numValue < this.min) {
      numValue = this.min;
      this.originalValue = numValue;
      this.updateDisplay(numValue);
    } else if (this.max !== undefined && numValue > this.max) {
      numValue = this.max;
      this.originalValue = numValue;
      this.updateDisplay(numValue);
    } else {
      // 유효한 숫자로 변환 가능할 때만 originalValue 업데이트
      if (!isNaN(numValue)) {
        this.originalValue = numValue;
      }
    }
    
    this.changedEvent(this.originalValue);
  }

  private handleBlur(event: any) {
    if(this.readonly || this.disabled) {
      event.preventDefault();
      return;
    }
    this.hasFocus = false;

    // 범위를 벗어나는 값 처리
    const currentValue = this.originalValue ?? 0;
    if(this.min !== undefined && currentValue < this.min) {
      this.originalValue = this.min;
      this.updateDisplay();
    } else if (this.max !== undefined && currentValue > this.max) {
      this.originalValue = this.max;
      this.updateDisplay();
    }

    // checkValidity 대신 validateAndNotify 호출
    this.validateAndNotify();

    this.updateValidityState();
    this.setFormValue();
    this.requestUpdate();

    this.changedEvent(this.originalValue);
    this.blurEvent(this.originalValue);
  }

  private changedEvent(elementValue: number | null | undefined) {
    this.dispatchEvent(new CustomEvent('changed', { 
      detail: {
        value: elementValue,
        isValid: this.isValid,
        status: this.validStatus
      }, 
      bubbles: true, 
      composed: true 
    }));
  }

  private blurEvent(elementValue: number | null | undefined) {
    this.dispatchEvent(new CustomEvent('blured', { 
      detail: {
        value: elementValue,
        isValid: this.isValid,
        status: this.validStatus
      }, 
      bubbles: true, 
      composed: true 
    }));
  }

  private handleFocus() {
    this.hasFocus = true;

    this.dispatchEvent(new CustomEvent('focused', { 
      detail: {
        value: this._value,
        isValid: this.isValid,
        status: this.validStatus
      }, 
      bubbles: true, 
      composed: true 
    }));
  }

  // 호스트 요소가 포커스를 받을 때 내부 input으로 포커스 위임
  private handleHostFocus = () => {
    if (this.inputNumber && !this.disabled) {
      // 작은 지연을 추가하여 포커스 전환이 부드럽게 이루어지도록 함
      this.handleFocus();
    }
  }

  // 타이머 정리 메서드
  private stopStepTimer() {
    if (this.stepTimer) {
      clearInterval(this.stepTimer);
      this.stepTimer = null;
    }
  }

  /*******************************************************
   * Form validation with custom error handling
   *******************************************************/


  // validity 상태를 반환 - 커스텀 에러 상태 고려
  get validity() { 
    // 커스텀 에러나 슬롯 에러가 설정된 경우 가상의 ValidationState 반환
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      // 브라우저의 ValidityState와 유사한 객체 반환
      return {
        badInput: false,
        customError: this.validStatus === 'custom',
        patternMismatch: false,
        rangeOverflow: this.validStatus === 'rangeOverflow',
        rangeUnderflow: this.validStatus === 'rangeUnderflow',
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
      return this.getErrorMessage(this.validStatus);
    }
    
    return this.internals.validationMessage; 
  }

  // 폼 내 유효성 상태 확인 - 항상 true 반환 (커스텀 에러 처리 가능)
  get willValidate() { 
    // 커스텀 에러나 슬롯 에러는 무조건 유효성 검사 대상
    // if (this.validStatus === 'custom' || this.hasSlotErrorMessage) {
    //   return true;
    // }
    return this.internals.willValidate; 
  }

  // 사용자 정의 유효성 검사를 실행하고 폼에 보고
  public checkValidity(): boolean {
    // 항상 최신 슬롯 상태 확인
    this.updateValidityState();
    
    // if (this.hasSlotErrorMessage && !this.isValid) {
    //   return false;
    // }
    
    return this.internals.checkValidity();
  }

  public reportValidity(): boolean {
    // 최신 상태 확인
    this.updateValidityState();
    
    // if (this.hasSlotErrorMessage && !this.isValid) {
    //   return false;
    // }
    
    // // 슬롯이 없으면 브라우저 기본 보고 방식 사용
    // if (!this.hasSlotErrorMessage && !this.isValid) {
    //   // 브라우저 기본 에러 메시지를 명시적으로 표시
    //   this.removeAttribute('has-custom-error');
    //   return this.input.reportValidity();
    // }
    
    return this.internals.reportValidity();
  }

  public getStatus() {
    return this.isValid ? '' : this.validStatus;
  }

  public setCustomError() {
    this.customSettingError();
    // return this;
  }

  // 에러 상태 초기화 함수 추가
  public clearCustomError() {
    if(!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }

  // 기존 checkValidity를 updateValidityState로 이름 변경하고 기능 확장
  private updateValidityState() {
    // if (!this.touched && !this.formSubmitted) {
    // 사용자가 직접 에러 설정한 경우 처리
    if (this.validStatus === 'custom' && !this.isValid) {
      // 사용자 정의 에러는 그대로 유지
      return;
    }
    
    // 유효성 상태 초기화
    this.isValid = true;
    this.validStatus = "";
    
    // 필수 입력 검증
    if (this.required && (this.originalValue === undefined || this.originalValue === null)) {
      this.isValid = false;
      this.validStatus = "valueMissing";
    }
    // 최소값 검증
    else if (this.originalValue !== undefined && this.min !== undefined && this.originalValue < this.min) {
      this.isValid = false;
      this.validStatus = "rangeUnderflow";
    }
    // 최대값 검증
    else if (this.originalValue !== undefined && this.max !== undefined && this.originalValue > this.max) {
      this.isValid = false;
      this.validStatus = "rangeOverflow";
    }
    // 스텝 검증
    // else if (this.originalValue !== undefined && this.step > 0 && ((this.originalValue - (this.min || 0)) % this.step !== 0)) {
    //   this.isValid = false;
    //   this.validStatus = "stepMismatch";
    // }

    const validityMessage = this.getErrorMessage(this.validStatus);

    // ElementInternals에 유효성 상태 보고
    if (!this.isValid) {
      if (this.hasSlotErrorMessage) {
        // 슬롯 에러가 있으면 customError만 설정
        this.inputNumber.setCustomValidity(""); // must be empty
        this.internals.setValidity({ customError: true }, " ");
      } else {
        // 슬롯 에러가 없으면 기본 유효성 검사 에러를 사용
        if (this.inputNumber) {
          this.internals.setValidity({ [this.validStatus]: true }, validityMessage, this.inputNumber);
        }
      }
    } else {
      this.internals.setValidity({});
    }
  }


  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    
    // 사용자 정의 오류 메시지가 있는 경우
    this.inputNumber.setCustomValidity(""); // must be empty
    this.internals.setValidity({ customError: true }, " ");
        
    this.requestUpdate();
  }


  private handleInvalid = (e: Event) => {
    // 최신 슬롯 상태 확인 (Light DOM에서 직접)
    const hasErrorSlot = !!this.querySelector('[slot="error"]');
    
    // 슬롯 상태 확인
    if (this.noNativeValidity || hasErrorSlot) {
      // 슬롯에 있는 내용 확인
      const errorSlotElement = this.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim();
                        
      if (hasContent) {
        // 슬롯에 내용이 있을 때만 커스텀 에러 처리
        this.hasSlotErrorMessage = true;
        this.setAttribute('has-custom-error', '');
        
        // 브라우저 기본 UI 방지
        e.preventDefault();
        e.stopPropagation();
        
        // 커스텀 에러 설정
        this.inputNumber.setCustomValidity(""); // must be empty
        this.internals.setValidity({ customError: true }, " ");
      } else {
        // 슬롯이 비어 있으면 기본 브라우저 에러 사용
        this.hasSlotErrorMessage = false;
        this.removeAttribute('has-custom-error');
        
        // 브라우저 기본 UI 허용 (preventDefault 호출 안함)
      }
    } else {
      // 슬롯이 없으면 브라우저 기본 에러 사용
      this.hasSlotErrorMessage = false;
      this.removeAttribute('has-custom-error');
      
      // 브라우저 기본 동작을 방해하지 않도록 함
      // 단, 이미 다른 코드에서 preventDefault가 호출됐을 수 있어 명시적 허용이 필요
      setTimeout(() => {
        // 무효한 상태가 유지되면 브라우저 에러 표시
        if (!this.isValid) {
          this.inputNumber.reportValidity();
        }
      }, 0);
    }
    
    // 이벤트와 관계없이 무효 상태 설정
    this.isValid = false;
  };

  private handleCustomErrorSlot() {
    // Shadow DOM의 슬롯과 Light DOM의 슬롯 모두 확인
    const errorSlot = this.renderRoot?.querySelector('slot[name="error"]') as HTMLSlotElement;
    const lightDomSlot = this.querySelector('[slot="error"]');
    
    // 슬롯이 아예 없는 경우
    if (!errorSlot || !lightDomSlot) {
      this.hasSlotErrorMessage = false;
      this.hasPopupErrorComponent = false;
      this.removeAttribute('has-custom-error');
      return;
    }
    
    // 슬롯이 있을 때 내용 확인
    const errorNodes = errorSlot.assignedNodes();
    
    // 특수 컴포넌트 확인
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

    // 슬롯에 실제 콘텐츠가 있는지 확인 (빈 div는 콘텐츠로 간주하지 않음)
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
    
    // 슬롯 에러 유무에 따라 호스트 속성 설정
    if (this.hasSlotErrorMessage) {
      this.setAttribute('has-custom-error', '');
    } else {
      this.removeAttribute('has-custom-error');
    }
    
    // 요소가 업데이트되도록 상태 변경을 알림
    this.requestUpdate();
  }

  private getErrorMessage(type: 'valueMissing' | 'rangeUnderflow' | 'rangeOverflow' | 'stepMismatch' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "This field is required",
      rangeUnderflow: `Value must be at least ${this.min}`,
      rangeOverflow: `Value cannot exceed ${this.max}`,
      stepMismatch: `Value must be a multiple of ${this.step}`,
      custom: 'Invalid by custom'
    }

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }
}
