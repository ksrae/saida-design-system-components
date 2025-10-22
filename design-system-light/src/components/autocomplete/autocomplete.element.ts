import { LitElement, html, CSSResultGroup, css, unsafeCSS } from "lit";
import { property, customElement, state, query } from "lit/decorators.js";
import { AutocompleteOptionElement } from "./autocomplete-option.element";
import globalCSS from "./styles/autocomplete.scss?inline";
import { classMap } from "lit/directives/class-map.js";

@customElement("sy-autocomplete")
export class AutocompleteElement extends LitElement {
  // 폼 연동을 위한 속성 추가
  static formAssociated = true;

static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};

    :host {
      display: block; /* 컴포넌트 자체가 블록 레벨 요소가 되도록 함 */
      width: 100%;
    }

    .autocomplete-wrapper {
      position: relative;
    }

    .error-container {
      width: 100%;
      /* 일반 텍스트 에러를 위한 스타일 */
      color: var(--required);
      font-size: 0.85rem;
      margin-top: 4px;
      box-sizing: border-box;
    }
    
    .popup-error-container {
      /* 에러 팝업이 input 위를 덮지 않도록 position, z-index, height, pointer-events 모두 제거 */
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin-top: 0;
      z-index: 1;
      pointer-events: none;
      width: 100%;
      height: 100%;
    }
    
    .error-message {
      display: block;
      width: 100%;
      height: 100%;
    }

    .error-message::slotted(*) {
      display:block;
      width: 100%;
      height: 100%;
    }

    .visible-error {
      display: block;
    }

    
    `;

  // --- Public Properties ---
  @property({ type: Boolean }) caseSensitive: boolean = false;
  @property({ type: Number }) debounceTime: number = 0;
  @property({ type: Boolean, reflect: true }) loading: boolean = false;
  @property({ type: Number, reflect: true }) min: number = 0;
  @property({ type: String }) placeholder: string = '';
  @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  @property({ type: Boolean }) required: boolean = false; // required 속성 추가
  @property({ type: String }) value: string = '';  // 값 추가
  @property({
    type: Array,
    converter: {
      fromAttribute(value: string | null): string[] {
        if (!value) return [];
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
            return parsed;
          }
          console.warn("Invalid source format: Expected array of strings.", value);
          return [];
        } catch (e) {
          console.error("Error parsing source attribute:", e, value);
          return [];
        }
      },
      toAttribute(value: string[]) {
        return JSON.stringify(value);
      },
    },
  })
  source: string[] = [];
  @property({ type: String }) trigger: "focus" | "input" = "focus";
  @property({ type: Boolean }) noNativeValidity = false;

  // --- Private State ---
  @state() private filteredList: string[] = [];
  @state() private hasFocus = false;
  @state() private touched = false;
  @state() private formSubmitted = false;
  @state() private active = -1;
  @state() private selectedValue: string = ''; // 선택된 값 추적
  @state() private isValid: boolean = true;
  @state() private validStatus: 'valueMissing' | 'custom' | '' = "";
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;

  // --- Private Queries ---
  @query("input") private input!: HTMLInputElement;

  // --- Private Fields ---
  private maxItemCount: number = 100;
  private timer: any;
  private optionElementClone: AutocompleteOptionElement | null = null;
  private blurTimeout: number | undefined;
  private internals: ElementInternals;
  private initialValue: string = '';

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.addEventListener('invalid', this.handleInvalid);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.formSubmitListener();
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }
  // --- Lifecycle Callbacks ---
  async firstUpdated() {
    await this.updateComplete;
    this.addEventListener("keydown", this.handleKeydown.bind(this));
    window.addEventListener("resize", this.updateOptionPosition);
    window.addEventListener("scroll", this.updateOptionPosition, true);
    
    // 초기 유효성 상태 확인
    this.updateValidityState();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.formSubmitListenerRemover();
    window.removeEventListener("resize", this.updateOptionPosition);
    window.removeEventListener("scroll", this.updateOptionPosition, true);
    this.removeEventListener("keydown", this.handleKeydown.bind(this));
    this.removeEventListener('invalid', this.handleInvalid);
    clearTimeout(this.timer);
    clearTimeout(this.blurTimeout);
    this.removeOptionClone();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('required') || changedProperties.has('value')) {
      this.updateValidityState();
    }
    
    if (changedProperties.has('selectedValue')) {
      // this.updateValidityState(); // value가 이미 selectedValue로 설정되었으므로 위에서 처리됨
      this.setFormValue();
    }
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

  // --- Template ---
  render() {
    return html`
      <div class="autocomplete-container">
        <div class="autocomplete-wrapper">
          <div tabindex="-1"
            class=${classMap({
              'autocomplete-inner': true,
              "autocomplete": true,
              "autocomplete--small": this.size === "small",
              "autocomplete--medium": this.size === "medium",
              "autocomplete--large": this.size === "large",
              "autocomplete--focused": this.hasFocus,
              "autocomplete--invalid": (this.formSubmitted || this.touched) && this.required && !this.isValid,
              // "input--valid": (this.formSubmitted || this.touched) && this.required && this.isValid,
          })}
          >
            <input
              type="text"
              placeholder="${this.placeholder}"
              @click=${this.handleClick}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />
            <sy-autocomplete-option
              style="display: none;"
              .source=${[]}
            ></sy-autocomplete-option>       
          </div>  
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
    `;
  }

  // --- Public Methods ---
  public setFocus() {
    this.input?.focus();
    this.handleFocus();
  }

  public setBlur() {
    this.input?.blur();
    this.blurEvent();
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    
    this.updateValidityState();
    this.requestUpdate();
  }
  
  // --- Private Methods (using 'private' keyword and arrow functions for binding) ---

  private appendOptionClone = (): boolean => {
    if (this.optionElementClone) {
      return true;
    }

    const originalOptionElement = this.shadowRoot?.querySelector("sy-autocomplete-option") as AutocompleteOptionElement;

    if (!originalOptionElement) {
      console.error("Cannot find <sy-autocomplete-option> in shadow DOM.");
      return false;
    }

    try {
      this.optionElementClone = originalOptionElement.cloneNode(true) as AutocompleteOptionElement;

      this.optionElementClone.style.position = 'absolute';
      this.optionElementClone.style.display = 'none';
      this.optionElementClone.style.visibility = 'hidden';
      this.optionElementClone.id = 'sy-autocomplete-options-list';

      // Add event listeners using bound private methods
      this.optionElementClone.addEventListener("click", (e: Event) => e.stopPropagation());
      this.optionElementClone.addEventListener("selected", this.handleSelected); // Already bound
      this.optionElementClone.addEventListener("activeChanged", this.activeChanged); // Already bound
      

      document.body.appendChild(this.optionElementClone);

      originalOptionElement.style.display = "none";
      return true;

    } catch (error) {
      console.error('sy-autocomplete appendOptionClone FAILED:', error);
      this.optionElementClone = null;
      return false;
    }
  }

  private removeOptionClone = () => {
    if (this.optionElementClone && this.optionElementClone.parentElement === document.body) {
       try {
         // Remove listeners using the same bound private method references
         this.optionElementClone.removeEventListener("selected", this.handleSelected);
         this.optionElementClone.removeEventListener("activeChanged", this.activeChanged);
         // Inline click listener doesn't need explicit removal here if clone is destroyed
         document.body.removeChild(this.optionElementClone);
       } catch(e) {
         console.warn("Error removing option clone", e);
       }
    }
    this.optionElementClone = null;
  }

  // Bound private method for event listener
  private activeChanged = (e: Event) => { // Type as Event, use CustomEvent inside
    // Check if it's a CustomEvent before accessing detail

    if (e instanceof CustomEvent) {
        e.preventDefault(); // Prevent default if needed
        
        if (e.detail !== undefined && typeof e.detail === 'number') {
          this.active = e.detail;
        }
    }
  }

  // Bound private method for event listener
  private handleKeydown = (e: KeyboardEvent) => {
    const optionsVisible = this.optionElementClone?.style.visibility === 'visible';

    if (e.key === "Escape") {
      if (optionsVisible) {
         e.preventDefault();
         this.hideOptions();
         this.input?.focus();
      }
    } else if (e.key === "Enter") {
        if (optionsVisible && this.active >= 0 && this.active < this.filteredList.length) {
            e.preventDefault();
            this.optionElementClone?.setEvent(this.active);
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!this.optionElementClone) {
            if (!this.appendOptionClone()) return;
        }
        if (this.filteredList.length > 0) {
            if (!optionsVisible) {
                this.setData(this.input.value?.trim());
            } else {
                this.active = (this.active + 1) % this.filteredList.length;
                if(this.optionElementClone) this.optionElementClone.activeIndex = this.active;
                this.scrollToSelectedItem("down");
            }
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
         if (!this.optionElementClone) {
            if (!this.appendOptionClone()) return;
        }
        if (this.filteredList.length > 0) {
             if (!optionsVisible) {
                this.setData(this.input.value?.trim());
            } else {
                this.active = (this.active - 1 + this.filteredList.length) % this.filteredList.length;
                if(this.optionElementClone) this.optionElementClone.activeIndex = this.active;
                this.scrollToSelectedItem("up");
            }
        }
    }
  }

  private scrollToSelectedItem = (direction: "down" | "up") => {
      if (!this.optionElementClone?.shadowRoot) return;
      const optionList = this.optionElementClone.shadowRoot.querySelector(".autocomplete-option-container") as HTMLElement;
      const activeItem = this.optionElementClone.shadowRoot.querySelector(".option--active") as HTMLElement;
  
      if (optionList && activeItem) {
        const optionListRect = optionList.getBoundingClientRect();
        const activeItemRect = activeItem.getBoundingClientRect();
        const itemHeight = activeItem.offsetHeight;
  
          if (direction === "down") {
            if (activeItemRect.bottom > optionListRect.bottom) {
                optionList.scrollTop += itemHeight;
            } else if (this.active === 0) {
                optionList.scrollTop = 0;
            }
        } else if (direction === "up") {
            if (activeItemRect.top < optionListRect.top) {
                optionList.scrollTop -= itemHeight;
            } else if (this.active === this.filteredList.length - 1) {
                optionList.scrollTop = optionList.scrollHeight;
            }
        }
      }
  }

  private setFilter = (value?: string) => {
    let data: string[] = [];
    const searchInput = value ? (this.caseSensitive ? value : value.toLowerCase()) : '';

    if (searchInput && searchInput.length >= this.min) {
      data = this.source.filter(item => {
        const itemValue = this.caseSensitive ? item : item.toLowerCase();
        return itemValue.includes(searchInput);
      });
    } else if (!searchInput && this.trigger === 'focus') {
      data = [...this.source];
    }

    const limitedData = data.slice(0, this.maxItemCount);
    if (limitedData.length > 0 || this.loading) {
      this.setOptionList(limitedData);
    } else if (this.trigger !== 'input' || value) {
      this.hideOptions();
    }
  }

  private setOptionList = (data: string[]) => {
    if (!this.optionElementClone) return;
  
    // 이전 코드:
    // const previousActiveValue = this.active >= 0 ? this.filteredList[this.active] : undefined;
    // this.filteredList = [...data];
    // const newIndex = previousActiveValue ? this.filteredList.indexOf(previousActiveValue) : -1;
    // this.active = (newIndex !== -1 && newIndex < this.filteredList.length) ? newIndex : (this.filteredList.length > 0 ? 0 : -1);
  
    // 새로운 코드:
    // 필터링된 데이터로 목록 업데이트
    this.filteredList = [...data];
    
    // 필터링된 목록이 변경되었으므로 active 인덱스를 항상 처음(0)으로 초기화
    this.active = this.filteredList.length > 0 ? 0 : -1;
    
    // 옵션 요소의 activeIndex 업데이트
    this.optionElementClone.activeIndex = this.active;
    this.optionElementClone.source = this.filteredList;
  
    requestAnimationFrame(() => {
      this.updateOptionPosition();
    });
  }

  // Bound private method for event listener
  private handleInput = (event: Event) => {
    this.touched = true; // 사용자가 입력을 시작했으므로 touched로 표시
    const value = (event.target as HTMLInputElement).value;
    this.value = value; // 내부 value 상태를 즉시 동기화

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setData(value?.trim());
      this.updateValidityState(); // 입력이 끝난 후 유효성 상태 업데이트
    }, this.debounceTime);
    
    this.eventEmitter('changed', value); // input 이벤트 발생
  }

  // Bound private method for event listener
  private handleClick = (e: Event) => {
    this.handleFocus(); // Use bound private method
    if (this.trigger === 'focus' || (this.trigger === 'input' && (e.target as HTMLInputElement).value)) {
      this.setData((e.target as HTMLInputElement).value?.trim());
    }
  }

  // Bound private method for event listener
  private handleFocus = () => {
    if (!this.optionElementClone) {
        if (!this.appendOptionClone()) return;
    }

    clearTimeout(this.blurTimeout);
    this.hasFocus = true;

    if (this.trigger === 'focus' || this.input?.value) {
       this.setData(this.input?.value?.trim() ?? '');
    }
  }

  private setData = (value: string) => {
    if (!this.optionElementClone) {
        console.warn("setData called but clone does not exist.");
        return;
    }

    if (!this.loading) {
      this.optionElementClone.loading = false;
      this.setFilter(value);
    } else {
      const shouldShowLoading = this.trigger === "focus" || (this.trigger === "input" && value.length >= this.min);
      if (shouldShowLoading) {
        this.optionElementClone.source = [];
        this.optionElementClone.loading = true;
        requestAnimationFrame(() => { this.updateOptionPosition(); }); // Use bound private method
      } else {
        this.hideOptions(); // Use bound private method
      }
    }
  }

  // Bound private method for event listener
  private handleSelected = (e: Event) => {
      if (e instanceof CustomEvent) {
          if (e.detail !== undefined && typeof e.detail === 'string') {
            this.touched = true; // 항목 선택도 중요한 상호작용이므로 touched로 표시
            this.value = e.detail;
            this.selectedValue = e.detail;
            // this.updateValidityState(); // value나 selectedValue 변경 시 updated()에서 이미 처리됨
            this.eventEmitter('selected', e.detail);
          }
      }
  }

  private eventEmitter = (type: string, value: string) => {
    this.dispatchEvent(
      new CustomEvent(type, {
        detail: {
          value: value,
          isValid: this.isValid,
          status: this.validStatus
        },
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
    if (this.input) {
        this.input.value = value;
        this.input.focus();
    }
    this.hideOptions(); // Use bound private method
  }

  // Bound private method for event listener
  private handleBlur = (e: FocusEvent) => {
    const relatedTarget = e.relatedTarget as Node | null;
    const isFocusInsideClone = this.optionElementClone?.contains(relatedTarget);

    if (!isFocusInsideClone) {
      this.blurEvent();
    }
  }

  private blurEvent() {
    this.blurTimeout = window.setTimeout(() => {
      this.hasFocus = false;
      this.hideOptions();

      // 포커스가 나갈 때, input의 최종 값을 value와 동기화하고 유효성 검사
      if (this.input) {
        this.value = this.input.value;
      }
      this.updateValidityState();
    }, 150);
  }

  // Bound private method for window/requestAnimationFrame callbacks
  private updateOptionPosition = () => {
    if (!this.optionElementClone) return;

    const shouldShow = this.hasFocus && ( (this.filteredList && this.filteredList.length > 0) || this.loading );

    if (shouldShow) {
      this.optionElementClone.style.display = 'block';
      this.optionElementClone.style.visibility = 'hidden';

      const inputRect = this.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      const optionRect = this.optionElementClone.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let top = inputRect.bottom + scrollTop;
      if ((inputRect.bottom + optionRect.height > viewportHeight) && (inputRect.top - optionRect.height > 0)) {
        top = inputRect.top - optionRect.height + scrollTop;
      }

      let left = inputRect.left + scrollLeft;
      if (left + inputRect.width > viewportWidth + scrollLeft - 5) {
           left = viewportWidth + scrollLeft - inputRect.width - 5;
      }
      if (left < scrollLeft + 5) {
           left = scrollLeft + 5;
      }

      this.optionElementClone.style.top = `${Math.max(0, top)}px`;
      this.optionElementClone.style.left = `${Math.max(0, left)}px`;
      this.optionElementClone.style.width = `${inputRect.width}px`;
      this.optionElementClone.style.visibility = 'visible';

    } else {
      this.hideOptions(); // Use bound private method
    }
  }

  // Bound private method
  private hideOptions = () => {
    if (!this.optionElementClone) return;
    this.active = -1;
    this.optionElementClone.style.visibility = 'hidden';
    this.optionElementClone.style.display = 'none';
    this.optionElementClone.source = [];
    this.optionElementClone.loading = false;
  }


  /*******************************************************
   * Form validation with custom error handling
   *******************************************************/

  // 폼 연동 메서드 추가
  private setFormValue() {
    this.internals.setFormValue(this.input?.value || '');
  }
  
  // 폼 연결 콜백
  formAssociatedCallback() {
    this.setFormValue();
  }

  // 폼 비활성화 콜백
  formDisabledCallback(disabled: boolean) {
    // autocomplete에는 disabled 속성이 없으므로 필요하면 추가 필요
  }

  // 폼 리셋 콜백
  formResetCallback() {
    if (this.input) {
      this.input.value = this.initialValue;
      this.value = this.initialValue;
      this.selectedValue = this.initialValue;
      this.touched = false;
      this.formSubmitted = false;
    }
    this.updateValidityState();
    this.setFormValue();
  }

  // 폼 상태 복원 콜백
  formStateRestoreCallback(state: string) {
    if (this.input) {
      this.input.value = state;
      this.value = state;
      this.selectedValue = state;
    }
    this.updateValidityState();
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
        } else {
          this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
        }
      }
    } else {
      this.internals.setValidity({});
    }
  }


  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    
    // 사용자 정의 오류 설정
    this.internals.setValidity({ customError: true }, "Custom validation error");
    
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
      setTimeout(() => {
        // 무효한 상태가 유지되면 브라우저 에러 표시
        if (!this.isValid && this.input) {
          this.input.reportValidity();
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
  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "This field is required",
      custom: 'Invalid by custom'
    }

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }
} // End of class AutocompleteElement
