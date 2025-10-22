import { LitElement, css, unsafeCSS, html, nothing, CSSResultGroup } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import globalCSS from "./styles/input.scss?inline";
import { ifDefined } from "lit/directives/if-defined.js";
import { choose } from "lit/directives/choose.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import "../icon/icon.element";

@customElement("sy-input")
export class InputElement extends LitElement {
  // 폼 연관 요소로 등록
  static formAssociated = true;
  
  // Ensure browser validation UI is fully suppressed
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;

  // ElementInternals 인스턴스 저장
  private internals: ElementInternals;
  private initialValue: string = '';

  constructor() {
    super();
    // ElementInternals 객체 생성
    this.internals = this.attachInternals();
    this.addEventListener('invalid', this.handleInvalid);
    // 초기 값 설정
    this.initialValue = this._value;
  }

  @property({ type: Boolean }) autofocus = false;
  @property({ type: Boolean, reflect: true }) borderless = false;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) label: string = "";
  // @property({ type: String }) labelPosition: "horizontal" | "vertical" = "horizontal";
  @property({ type: Number }) max: number = Number.MAX_SAFE_INTEGER;
  @property({ type: Number }) min: number = 0;
  // name을 state에서 property로 변경
  @property({ type: String }) name: string = "";
  @property({ type: String }) placeholder: string = "";
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) size: "small" | "medium" | "large" = "medium";
  @property({ type: String }) status: 'default' | 'warning' | 'error' | 'success' = 'default'; // 상태 코드 추가: default, warning, error 등
  private _value: string = "";
  private _isUserInput: boolean = false; // 사용자 입력인지 구분하는 플래그

  @property({ type: String })
  get value(): string {
    return this._value;
  }
  
  set value(newValue: string) {
    if (this._value !== newValue) {
      const oldValue = this._value;
      this._value = newValue;
      
      this.requestUpdate('value', oldValue);
      
      // 사용자 입력이 아닌 경우(프로그래밍적 변경)에만 이벤트 발생
      if (!this._isUserInput) {
        this.emitChangedEvent();
      }
      this._isUserInput = false; // 플래그 리셋
    }
  }

  //@property({ type: Boolean }) validation = false;
  @property({ type: String, reflect: true }) variant: "password" | "search" | "text" = "text";
  @property({ type: Boolean }) noNativeValidity = false;

  @query("input") input!: HTMLInputElement;
  @query('slot[name="prefix"]') prefixSlot!: HTMLSlotElement;
  @query('slot[name="suffix"]') suffixSlot!: HTMLSlotElement;

  @state() private hasFocus = false;
  @state() private passwordvisible = false;
  @state() private hasPrefix: boolean = false;
  @state() private hasSuffix: boolean = false;
  
  @state() private isInsideHeader: boolean = false; // this is for global header

  @state() private isValid: boolean = true;
  @state() private validStatus: 'valueMissing' | 'tooShort' | 'tooLong' | 'custom' | '' = "";  // 상태 코드 추가: valid, required, tooShort, tooLong 등
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;

  @state() private touched: boolean = false; // 사용자가 input과 상호작용했는지 추적
  @state() private formSubmitted: boolean = false;
  // form 속성을 통해 연결된 form 요소에 접근할 수 있게 함
  // get form() { 
  //   return this.internals.form; 
  // }

  public setFocus() {
    this.input?.focus();

    this.handleFocus();
  }
  
  public setBlur() {
    this.handleBlur();
  }

  // formReset 이벤트 핸들러 추가
  // form 이벤트에 따라 브라우저가 호출
  public formResetCallback() {
    this.value = this.initialValue;
    this.input.value = this.initialValue;
    this.touched = false; // form reset 시 touched 상태도 초기화
    this.formSubmitted = false;
    this.updateValidityState();
    this.requestUpdate();
  }

  // formDisable 이벤트에 대응
  public formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    this.requestUpdate();
  }

  private setFormValue() {
    // 폼 제출 시 사용할 값 설정
    this.internals.setFormValue(this.value);
  }

  private emitChangedEvent() {
    // 이벤트 발생 전에 validation 상태 업데이트
    this.updateValidityState();
    this.setFormValue();
    
    this.dispatchEvent(
      new CustomEvent("changed", {
        detail: {
          value: this.value,
          isValid: this.isValid,
          status: this.validStatus
        },
        bubbles: true,
        composed: true
      })
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this.handleHostFocus);
    // 초기 값 저장 (form reset에서 사용) - 이미 constructor에서 설정됨
    if (!this.initialValue) {
      this.initialValue = this.value;
    }

    this.formSubmitListener();
    // tabindex 속성을 추가하여 호스트 요소가 포커스를 받을 수 있도록 함
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.formSubmitListenerRemover();
    this.removeEventListener('focus', this.handleHostFocus);
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

  async firstUpdated() {
    await this.updateComplete;

    this.input.addEventListener("input", (e: any) => this.handleChange(e));
    
    this.handleCustomErrorSlot();
    
    // 초기 상태의 form 값 설정
    this.setFormValue();
    
    // 부모가 sy-globalheader인지 확인
    this.checkParentElement();

    // 초기값이 있을 때만 changed 이벤트 발생
    if(this.value) {
      this.emitChangedEvent();
    }
  }
  
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if(changedProperties.has('autofocus')) {
      if(this.input && this.autofocus) {
        setTimeout(() => {
          this.input.focus();
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
    if (changedProperties.has("value")) {
      if (this.input) {
        this.input.value = this.value;
      }
      this.updateValidityState();
      // 값이 변경될 때마다 form 값도 업데이트
      this.setFormValue();
    } 
    if (changedProperties.has("required")) {
      this.updateValidityState();
    }

    // 호스트 요소를 포커스 가능하게 만들기
    // if (!this.hasAttribute('tabindex')) {
    //   this.setAttribute('tabindex', '0');
    // }
  }
  
  private handleBlur() {
    this.hasFocus = false;
    this.input.blur();
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

  private handleFocus() {
    this.hasFocus = true;
    // this.touched는 입력이 있을 때만 true로 변경 (focus만으로는 변경하지 않음)

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

  render() {
    const hasClearIcon =
      this.clearable &&
      !this.disabled &&
      !this.readonly &&
      this.input?.value?.length > 0;

    const placeholder =
      !this.placeholder && this.variant === "search"
        ? "Search"
        : this.placeholder;
      
        
    return html`
      <div class="input--item input--item-vertical">
        ${this.label && this.label?.trim().length > 0 ? html`
          <span class="input--label">
            ${this.required ? html`<span class="required">*</span>` : nothing}
            ${this.label}
          </span>
        ` : nothing}
        <div class="input-wrapper">
          <div
            tabindex="0"
            class=${classMap({
              input: true,
              "input--small": this.size === "small",
              "input--medium": this.size === "medium",
              "input--large": this.size === "large",
              "input--disabled": this.disabled,
              "input--readonly": this.readonly,
              "input--focused": this.hasFocus,
              "input--borderless": this.borderless,
              "input--empty": !this.value,
              // "input--valid": (this.formSubmitted || this.touched) && (this.isValid || this.validStatus === ''),
              "input--invalid": (this.formSubmitted || this.touched) && (!this.isValid || this.validStatus?.length),
              "input--default": this.status === 'default',
              "input--warning": this.status === 'warning',
              "input--error": this.status === 'error',            
              "input--success": this.status === 'success',
            })}>
            <slot
              name="prefix"
              class="prefix-custom-icon"
              style=${styleMap({
                display: this.hasPrefix ? "flex" : "none",
              })}
              @slotchange=${this.prefixslotChange}
            >
            </slot>
            <input
              class=${classMap({
                "input--control": true,
              })}
              type=${(this.variant === "password" && this.passwordvisible) ||
              this.variant === "text"
                ? "text"
                : this.variant}
              name=${ifDefined(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              ?autofocus=${this.autofocus}
              placeholder=${placeholder}
              minlength=${ifDefined(this.min)}
              maxlength=${ifDefined(this.max)}
              value=${this.value}
              @keydown=${this.handleKeydown}
              @input=${this.handleInput}
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />
            ${hasClearIcon && this.hasFocus
              ? html` <sy-icon
                  class="input--clear"
                  size=${this.size}
                  selectable
                  @mousedown=${(e: MouseEvent) => e.preventDefault()} 
                  @selected=${this.handleClearClick}
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>
                </sy-icon>`
              : nothing}          
            ${choose(
              this.variant,
              [
                [
                  "password",
                  () =>
                    html`${this.passwordvisible
                      ? html`<sy-icon
                          class="input-password-toggle"
                          selectable
                          @mousedown=${(e: MouseEvent) => e.preventDefault()} 
                          @selected=${this.handlePasswordToggle}
                        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5zM286 196.6C296.8 193.6 308.2 192.1 319.9 192.1C328.7 192.1 337.4 193 345.7 194.7C346 194.8 346.2 194.8 346.5 194.9C404.4 207.1 447.9 258.6 447.9 320.1C447.9 390.8 390.6 448.1 319.9 448.1C258.3 448.1 206.9 404.6 194.7 346.7C192.9 338.1 191.9 329.2 191.9 320.1C191.9 309.1 193.3 298.3 195.9 288.1C196.1 287.4 196.2 286.8 196.4 286.2C208.3 242.8 242.5 208.6 285.9 196.7z"/></svg></sy-icon>`
                      : html`<sy-icon
                          class="input-password-toggle"
                          selectable
                          @mousedown=${(e: MouseEvent) => e.preventDefault()} 
                          @selected=${this.handlePasswordToggle}
                        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM208.9 175.1C241 156.2 278.1 144 320 144C385.2 144 438.8 173.6 479.9 211.7C518.4 247.4 545 290 558.5 320C544.9 350 518.3 392.5 479.9 428.3C476.8 431.1 473.7 433.9 470.5 436.7L425.8 392C439.8 371.5 448 346.7 448 320C448 249.3 390.7 192 320 192C293.3 192 268.5 200.2 248 214.2L208.9 175.1zM390.9 357.1L282.9 249.1C294 243.3 306.6 240 320 240C364.2 240 400 275.8 400 320C400 333.4 396.7 346 390.9 357.1zM135.4 237.2L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L384.2 486C364.2 492.4 342.8 496 320 496C254.8 496 201.2 466.4 160.1 428.3C121.6 392.6 95 350 81.5 320C91.9 296.9 110.1 266.4 135.5 237.2z"></path></svg>
                        </sy-icon>`} `
                ],
                [
                  "search",
                  () =>
                    html` <sy-icon
                      class="search-icon"
                      size="medium"
                      selectable
                      @mousedown=${(e: MouseEvent) => e.preventDefault()} 
                      @selected=${this.handleSearch}
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M432 272C432 183.6 360.4 112 272 112C183.6 112 112 183.6 112 272C112 360.4 183.6 432 272 432C360.4 432 432 360.4 432 272zM401.1 435.1C365.7 463.2 320.8 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272C480 320.8 463.2 365.7 435.1 401.1L569 535C578.4 544.4 578.4 559.6 569 568.9C559.6 578.2 544.4 578.3 535.1 568.9L401.1 435.1z"/></svg></sy-icon>`,
                ],
              ],
              //type = 'text'
              () =>
                html` <slot
                  name="suffix"
                  class="suffix-custom-icon"
                  style=${styleMap({
                    display: this.hasSuffix ? "flex" : "none",
                  })}
                  @slotchange=${this.suffixslotChange}
                >
                </slot>`
            )}
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

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    
    this.updateValidityState();
    this.requestUpdate();
  }

  private checkParentElement() {
    // this.isInsideHeader = this.parentElement?.getAttribute('name')?.toLowerCase() === 'sy-global-header-extra-elements-in-header' ? true : false;

    this.isInsideHeader = false;
    // 첫 번째 부모 요소 찾기
    let parent = this.parentElement as any;
    
    // 부모가 없으면 Shadow Root의 호스트로 이동 시도
    if (parent && parent.getRootNode() instanceof ShadowRoot) {
      // 두 번째 부모 요소 찾기
      const shadowRoot = parent.getRootNode() as ShadowRoot;
      const grandparent = shadowRoot?.host;
      
      // 부모의 부모가 sy-global-header인지 확인
      this.isInsideHeader = grandparent?.tagName.toLowerCase() === 'sy-global-header';
      
    }
  }

  private prefixslotChange() {
    const prefixNodes = this.prefixSlot?.assignedNodes({ flatten: true });
    this.hasPrefix = prefixNodes?.some((node: any) =>
      node.nodeType === Node.TEXT_NODE ? node.textContent.trim() !== "" : true
    );
  }

  private suffixslotChange() {
    const suffixNodes = this.suffixSlot?.assignedNodes({ flatten: true });
    this.hasSuffix = suffixNodes?.some((node: any) =>
      node.nodeType === Node.TEXT_NODE ? node.textContent.trim() !== "" : true
    );
  }

  private handleKeydown(event: KeyboardEvent) {
    //e.preventDefault();
    if (event.key === 'Enter') {
      this.handleBlur();
    }
  }

  private handleChange(e: MouseEvent) {
    e.preventDefault();

    if(!this.disabled && !this.readonly) {
      this._isUserInput = true; // 사용자 입력 플래그 설정
      this.value = this.input.value;
      
      this.touched = true; // 입력이 발생하면 touched true
      this.updateValidityState();
      this.setFormValue();

      // 사용자 입력으로 인한 변경이므로 직접 이벤트 발생
      this.dispatchEvent(
        new CustomEvent("changed", {
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
  }

  private handleInput(e: any) {
    // 입력이 발생하면 touched true
    this.touched = true;
    //   this.dispatchEvent(new CustomEvent('entered', {detail: { value: this.value, valid: this.validState  }}));
    //   this.value = this.input.value;
    //   this.#checkValidity();
  }

  private handlePasswordToggle(e: Event) {
    e.preventDefault();

    if (!this.disabled && !this.readonly) {
      this.passwordvisible = !this.passwordvisible;
    }
    
  }

  private handleClearClick(e: MouseEvent | Event) {
    e.preventDefault();

    this._isUserInput = true; // 사용자 입력 플래그 설정
    this.value = "";
    this.input.value = "";

    this.updateValidityState();
    this.setFormValue();

    // 사용자 clear 액션으로 인한 변경이므로 직접 이벤트 발생
    this.dispatchEvent(
      new CustomEvent("changed", {
        detail: { 
          value: this.value, 
          isValid: this.isValid, 
          status: this.validStatus 
        },
        bubbles: true,
        composed: true,
      })
    );
    // this.handleFocus();
  }

  private handleSearch(e: MouseEvent) {
    e.preventDefault();
  }

  // 호스트 요소가 포커스를 받을 때 내부 input으로 포커스 위임
  private handleHostFocus = () => {
    if (this.input && !this.disabled) {
      setTimeout(() => {
        this.input.focus();
      }, 0);
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
    // reportValidity가 호출되면 touched 상태로 변경
    
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
  // Use a NoOp validity state that doesn't trigger UI but reports invalid state
  private updateValidityState() {
    // touched 상태가 아니면 유효성 검사를 수행하지 않음
    
    // 이미 사용자가 직접 에러 설정한 경우, 기본 유효성 검사 건너뛰기
    if (this.validStatus === 'custom' && !this.isValid) {
      return;
    }
    
    this.isValid = true;
    this.validStatus = "";
    
    // 필수 입력 검증
    if (this.required && !this.value) {
      this.isValid = false;
      this.validStatus = "valueMissing";
    }
    // 최소 길이 검증 - validation 속성과 관계없이 검증
    else if (this.value && this.min && this.value.length < this.min) {
      this.isValid = false;
      this.validStatus = "tooShort";
    }
    // 최대 길이 검증 - validation 속성과 관계없이 검증
    else if (this.value && this.max && this.value.length > this.max) {
      this.isValid = false;
      this.validStatus = "tooLong";
    }

    const validityMessage = this.getErrorMessage(this.validStatus);

    // ElementInternals에 유효성 상태 보고
    if (!this.isValid) {
      if (this.hasSlotErrorMessage) {
        // 슬롯 에러가 있으면 customError만 설정
        // 메시지는 비워두고 input은 유효하게 처리
        this.input.setCustomValidity(""); // must be empty
        this.internals.setValidity({ customError: true }, " ");
      } else {
        // 슬롯 에러가 없으면 기본 유효성 검사 에러를 사용
        if(this.input) {
          this.internals.setValidity({ [this.validStatus]: true }, validityMessage, this.input);
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
    this.input.setCustomValidity(""); // must be empty
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
        this.input.setCustomValidity(""); // must be empty
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
          this.input.reportValidity();
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