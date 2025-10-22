import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import globalCSS from './styles/checkbox.scss?inline';
import "../icon/icon.element";

@customElement('sy-checkbox')
export class CheckboxElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `
  static formAssociated = true;

  @query('label') label!: HTMLLabelElement;
  @query('input[type="checkbox"]') input!: HTMLInputElement;
  @state() private hasFocus = false;

  @property() title = '';
  @property() name = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean }) required = false;
  
  @state() isTree = false;
  @state() private renderIndeterminate = false;

  @state() private isValid: boolean = true;
  @state() private validStatus: 'valueMissing' | 'custom' | '' = "";  // 상태 코드 추가: valid, required, tooShort, tooLong 등
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;
  @state() private touched: boolean = false; // it is used from handleFocus
  @state() private formSubmitted: boolean = false;

  private updatedComplete: boolean = false;
  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  public setFocus() {
    this.label?.focus();
    this.handleFocus();
  }
  public setBlur() {
    this.label?.blur();
    this.handleBlur();
  }

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
    this.addEventListener('keydown', this.handleKeydown);
  }

  async firstUpdated() {
    await this.updateComplete;

    this.updatedComplete = true;
    this.renderIndeterminate = this.indeterminate;
    this.isValid = this.required && (this.checked || this.indeterminate) ? true : false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.formSubmitListenerRemover();
    this.removeEventListener('keydown', this.handleKeydown);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if(this.updatedComplete) {
      if (changedProperties.has('checked')) {
        if(!this.checked && this.indeterminate) {
          this.renderIndeterminate = this.indeterminate;
        } else {
          this.setCheckedValidation();
        }
      }
      if (changedProperties.has('indeterminate')) {
        this.renderIndeterminate = this.indeterminate;

        if(this.checked && this.indeterminate) {
          this.renderIndeterminate = false;
        }
      }
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

  render() {
    return html`
      <div class="checkbox-wrapper">
        <label       
          class=${classMap({
            checkbox: true,
            'checkbox--checked': this.checked,
            'checkbox--disabled': this.disabled,
            'checkbox--focused': this.hasFocus,
            'checkbox--indeterminate': this.renderIndeterminate,
            'readonly': this.readonly
          })}
          tabindex="0"
          @click="${this.handleClick}"
        >
          <input
            class="checkbox--input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            ?indeterminate=${live(this.renderIndeterminate)}
            ?checked=${live(this.checked)}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-describedby="help-text"
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @change="${this.onChange}"
          />         
          <label tabindex="0" class="${
            classMap({
              'checkbox-label': this.isTree,
            })
          }">
          <sy-icon size="xsmall" class="checked">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M534 132.5C544.8 140.2 547.2 155.2 539.5 166L275.5 534C271.4 539.7 265 543.4 258 543.9C251 544.4 244 542 239 537L103 401C93.6 391.6 93.6 376.4 103 367.1C112.4 357.8 127.6 357.7 136.9 367.1L253 483L500.5 138C508.2 127.2 523.2 124.8 534 132.5z"/></svg>
          </sy-icon>
          <sy-icon size="xsmall" class="indeterminate">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M64 128C64 92.7 92.7 64 128 64L512 64C547.3 64 576 92.7 576 128L576 512C576 547.3 547.3 576 512 576L128 576C92.7 576 64 547.3 64 512L64 128z"/></svg>
          </sy-icon>
          </label>
          <slot class="${
            classMap({
              'checkbox-slot': this.isTree,
            })
          }"></slot>
        </label>
      </div>
      <!-- 에러 컨테이너를 label 밖으로 이동하여 독립적인 위치에 배치 -->
      <div class="${classMap({
          'error-container': true,
          'popup-error-container': this.hasPopupErrorComponent,
          'text-error-container': !this.hasPopupErrorComponent,
          'visible-error': this.formSubmitted && !this.isValid 
        })}">
          <slot name="error" class="error-message" @slotchange=${this.handleCustomErrorSlot}></slot>
      </div>      
    `;
  }

  private handleFocus() {
    this.hasFocus = true;
    
    this.setEvent("focused", this.checked);
  }

  private handleBlur() {
    this.hasFocus = false;
    this.setEvent("blured", this.checked);
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    
    this.updateValidityState();
    this.requestUpdate();
  }

  private onChange(e: any) {
    e.preventDefault();

    this.touched = true;
    if(this.disabled || this.readonly) { return; }
    this.checked = e.target.checked;

    this.setCheckedValidation();
    this.setEvent('changed', this.checked);
  }

  private handleClick(e: any) {  
    e.preventDefault();
    // e.stopPropagation();
    this.touched = true;
    if(this.disabled || this.readonly) { return; }
    this.checked = !this.checked;

    this.setCheckedValidation();
    this.setEvent('changed', this.checked);
  }
  
  private handleKeydown(e: KeyboardEvent) {
    if(this.disabled || this.readonly) { return; }

    // e.preventDefault();
    if (e.code === 'Enter' || e.code === 'Space') {
      if(this.input) {
        this.touched = true;
        this.checked = !this.checked;
        this.setCheckedValidation();
        this.setEvent('changed', this.checked);
      } 
    }
  }


  private setCheckedValidation() {
    if(this.indeterminate) {
      this.indeterminate = false;
    }
    
    // isValid를 직접 설정하지 않고 updateValidityState()를 통해 처리
    this.updateValidityState();
    this.requestUpdate();
  }

  private setEvent(eventName: string, value: any) {
    // this.checked = false, but this.valid = true ==> indeterminate
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {value, isValid: this.isValid, checked: this.checked, indeterminate: this.renderIndeterminate},
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }

  formAssociatedCallback() {
    this.internals.setFormValue(this.checked ? 'on' : null);
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.checked = false;
    this.indeterminate = false;
    this.touched = false;
    this.formSubmitted = false;
    this.setCheckedValidation();
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === 'on';
    this.setCheckedValidation();
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
    const isValid = !(this.required && !this.checked && !this.indeterminate);
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
      valueMissing: "This checkbox is required",
    }

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }
}



