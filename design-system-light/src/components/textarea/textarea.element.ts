import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import globalCSS from "./styles/textarea.scss?inline";
import "../icon/icon.element";

@customElement("sy-textarea")
export class TextareaElement extends LitElement {
  static formAssociated = true;

  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)}; 
  `;


  private internals: ElementInternals;
  private initialValue: string = '';

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.initialValue = this.value;
    this.addEventListener('invalid', this.handleInvalid);
  }

  @property({ type: Boolean }) autofocus: boolean = false;
  @property({ type: Boolean }) borderless = false;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean }) counter: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) label: string = "";
  @property({ type: Number, reflect: true }) max: number = Number.MAX_SAFE_INTEGER;
  @property({ type: Number, reflect: true }) min: number = 0;
  @property({ type: String }) placeholder: string = "";
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) resize: "none" | "horizontal" | "vertical" | "both" = "none";
  @property({ type: Number }) rows = 4;
  @property({ type: String }) size: "small" | "medium" | "large" = "medium";
  @property({ type: String }) status: 'default' | 'warning' | 'error' | 'success' = 'default'; // 상태 코드 추가: default, warning, error 등  @property({ type: String }) value: string = "";
  @property({ type: String }) value: string = "";
  @property({ type: String }) name: string = "";
  @property({ type: Boolean }) noNativeValidity = false;
  
  @query("textarea") textarea!: HTMLTextAreaElement;
  @query("slot") slot!: any;

  @state() private hasScroll = false;
  @state() private charCount: number = 0;
  @state() private touched = false;
  @state() private formSubmitted = false;

  @state() private isValid: boolean = true;
  @state() private validStatus: 'valueMissing' | 'tooShort' | 'tooLong' | 'custom' | '' = "";  // 상태 코드 추가: valid, required, tooShort, tooLong 등
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;

  private resizeObserver!: ResizeObserver;

  public setFocus() {
    this.textarea?.focus();
    this.handleFocus();
  }
  public setBlur() {
    this.textarea?.blur();
    this.handleBlur();
  }

  async firstUpdated() {
    await this.updateComplete;

    this.checkForScroll();
    
    // 초기화 시에는 handleInput 대신 필요한 작업만 수행
    this.charCount = this.textarea.value?.length ?? 0;
    this.textarea.addEventListener("input", this.handleInput);

    this.setFormValue();

    this.resizeObserver = new ResizeObserver(() => {
      this.checkForScroll();
    });
    this.resizeObserver.observe(this.textarea);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if(changedProperties.has('autofocus')) {
      if(this.textarea && this.autofocus) {
        setTimeout(() => {
          this.textarea.focus();
        }, 0);
      }
    }
    if (changedProperties.has("min")) {
      if (this.min < 0) {
        this.min = 0;
      }
      if (this.min > 0 && this.max > 0 && this.min > this.max) {
        this.max = this.min;
      }
      this.updateValidityState();
    } else if (changedProperties.has("max")) {
      if (this.min > 0 && this.max > 0 && this.min > this.max) {
        this.max = this.min;
      }
      this.updateValidityState();
    } 
    if (changedProperties.has("rows")) {
      if (this.rows <= 0) {
        this.rows = 4;
      }
      this.checkForScroll();
    } 
    // else if (changedProperties.has("validation")) {
    //   if (this.value) {
    //     this.updateValidityState();
    //   } else {
    //     this.isValid = true;
    //     this.status = "";
    //   }
    // } 
    if (changedProperties.has("value")) {
      this.checkForScroll();
      this.updateValidityState();
      this.setFormValue();
    }
    if (changedProperties.has("required")) {
      this.updateValidityState();
    }
  }
  
  connectedCallback(): void {
    super.connectedCallback();
    this.formSubmitListener();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.formSubmitListenerRemover();
    this.textarea.removeEventListener("input", this.handleInput);
    this.textarea.removeEventListener("scroll", this.checkForScroll);
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.textarea);
    }
  }

  formAssociatedCallback() {
    this.setFormValue();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.textarea.value = this.initialValue;
    this.value = this.initialValue;
    this.charCount = this.initialValue.length;
    this.touched = false;
    this.formSubmitted = false;
    this.updateValidityState();
    this.setFormValue();
  }

  formStateRestoreCallback(state: string) {
    this.textarea.value = state;
    this.value = state;
    this.charCount = state.length;
    this.updateValidityState();
  }
  
  private setFormValue() {
    this.internals.setFormValue(this.textarea?.value || '');
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
    const hasClearIcon =
      this.clearable && !this.disabled && !this.readonly && this.textarea?.value
        ? true
        : false;

    return html`
      <div
        class="${classMap({
          "textarea-container": true,
          "textarea--clearable": hasClearIcon === true,
          "textarea--vertical": true,
          "textarea--nolabel": !this.label || !this.label?.length,
          "textarea--borderless": this.borderless
        })}"
      >
      ${this.label && this.label?.trim().length > 0 ? html`
        <span class="textarea--label">
          ${this.required ? html`<span class="required">*</span>` : nothing}
          <span class="label">${this.label}</span>
        </span>
        ` : nothing}

      <div class="textarea-wrapper">
        <div class="textarea-box">
          <textarea
            class="${classMap({
              textarea: true,
              "textarea--small": this.size === "small",
              "textarea--medium": this.size === "medium",
              "textarea--large": this.size === "large",

              "textarea--resize-none": this.resize === "none",
              "textarea--resize-horizontal": this.resize === "horizontal",
              "textarea--resize-vertical": this.resize === "vertical",
              "textarea--resize-both": this.resize === "both",
              'textarea--default': this.status === 'default',
              'textarea--warning': this.status === 'warning',
              'textarea--error': this.status === 'error',
              'textarea--success': this.status === 'success',
              // "textarea--valid": (this.formSubmitted || this.touched) && (this.isValid || this.validStatus === ''),
              "textarea--invalid": (this.formSubmitted || this.touched) && (!this.isValid || this.validStatus?.length),
            })}"
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?autofocus=${this.autofocus}
            ?required=${this.required}
            rows="${this.rows}"
            minlength=${ifDefined(this.min > 0 ? this.min : undefined)}
            maxlength=${ifDefined(this.max > 0 ? this.max : undefined)}
            placeholder=${this.placeholder}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            >${this.value}</textarea>
          ${hasClearIcon
            ? html` 
              <sy-icon 
                class="${classMap({
                  "textarea-clear": true,
                  "scroll": this.hasScroll
                })}"
                selectable
                size="${this.size}"
                @selected=${this.handleIcon}
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg></sy-icon>`
            : nothing}
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
        ${!this.counter
          ? nothing
          : html`${this.counter && this.max > 0
                ? html` <div class="textarea--count">
                    ${this.charCount}/${this.max}
                  </div>`
                : nothing}
            </div>`}

      </div>
    `;
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    
    this.updateValidityState();
    this.requestUpdate();
  }

  private handleFocus() {
    this.dispatchEvent(
      new CustomEvent("focused", {
        detail: { 
          value: this.value, 
          isValid: this.isValid, 
          status: this.validStatus 
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleBlur() {
    this.updateValidityState(); // blur 시점에 유효성 검사 수행

    this.dispatchEvent(
      new CustomEvent("blured", {
        detail: { 
          value: this.value, 
          isValid: this.isValid, 
          status: this.validStatus 
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private checkForScroll = () => {
    if (this.textarea) {
      const hasVerticalScroll = this.textarea.scrollHeight > this.textarea.clientHeight;
      this.hasScroll = hasVerticalScroll;
    }
  };

  private handleInput = () => {
    if (this.disabled || this.readonly) {
      return;
    }

    // 사용자가 입력을 시작하면 touched 상태로 설정
    if (!this.touched) {
      this.touched = true;
    }
    
    this.value = this.textarea.value;
    this.charCount = this.textarea.value?.length ?? 0;
    this.checkForScroll();
    
    // input 이벤트에서는 유효성 검사를 하지 않음 (blur나 submit에서만 수행)
    // this.updateValidityState();
    this.setFormValue();

    this.changedEvent();
  };

  private changedEvent() {
    this.dispatchEvent(
      new CustomEvent("changed", {
        detail: {
          value: this.textarea.value,
          length: this.charCount,
          isValid: this.isValid,
          status: this.validStatus
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleIcon(e: MouseEvent) {
    e.preventDefault();
    if (this.textarea.value) {
      this.textarea.value = "";
      this.value = "";
      this.charCount = 0;
      this.setFocus();
      
      this.updateValidityState();
      this.setFormValue();
      
      this.requestUpdate();
      this.changedEvent();
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
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: this.validStatus === 'tooLong',
        tooShort: this.validStatus === 'tooShort',
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

  private updateValidityState() {
    // 이미 사용자가 직접 에러 설정한 경우, 기본 유효성 검사 건너뛰기
    if (this.validStatus === 'custom' && !this.isValid) {
      return;
    }

    this.isValid = true;
    this.validStatus = "";

    // 필수 입력 검증
    if (this.required && (!this.value || this.value.length === 0)) {
      this.isValid = false;
      this.validStatus = "valueMissing";
    }
    // 최소 길이 검증
    else if (this.value && this.min > 0 && this.value.length < this.min) {
      this.isValid = false;
      this.validStatus = "tooShort";
    }
    // 최대 길이 검증
    else if (this.value && this.max > 0 && this.value.length > this.max) {
      this.isValid = false;
      this.validStatus = "tooLong";
    }

    const validityMessage = this.getErrorMessage(this.validStatus);

    // ElementInternals에 유효성 상태 보고
    if (!this.isValid) {
      if (this.hasSlotErrorMessage) {
        // 슬롯 에러가 있으면 customError만 설정
        // 메시지는 비워두고 input은 유효하게 처리
        this.textarea.setCustomValidity(""); // must be empty
        this.internals.setValidity({ customError: true }, " ");
      } else {
        // 슬롯 에러가 없으면 기본 유효성 검사 에러를 사용
        if(this.textarea) {
          this.internals.setValidity({ [this.validStatus]: true }, validityMessage, this.textarea);
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
    this.textarea.setCustomValidity(""); // must be empty
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
        this.textarea.setCustomValidity(""); // must be empty
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
          this.textarea.reportValidity();
        }
      }, 0);
    }
    
    // 이벤트와 관계없이 무효 상태 설정
    this.isValid = false;
  };

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
    
    // 요소가 업데이트되도록 상태 변경을 알림
    this.requestUpdate();
  }
  private getErrorMessage(type: 'valueMissing' | 'tooShort' | 'tooLong' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "This field is required",
      tooShort: `Value must be at least ${this.min} characters long`,
      tooLong: `Value cannot exceed ${this.max} characters`,
      custom: 'Invalid by custom'
    }

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }
}