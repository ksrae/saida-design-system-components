import { Component, Prop, State, h, Element, Watch, Event, EventEmitter, Method, AttachInternals, Listen } from '@stencil/core';

// 동작
// loading, 대소문자 size 등
// 미동작
// 1. disabled 상태 안됨
// 2. form 관련 안됨 비어 있는데도 valid가 나옴.

@Component({
  tag: 'sy-autocomplete',
  styleUrl: 'sy-autocomplete.scss',
  scoped: true,
  shadow: false,
  formAssociated: true,
})
export class SyAutocomplete {
  @Element() host: HTMLElement;
  @AttachInternals() internals: ElementInternals;

  private input!: HTMLInputElement;
  private maxItemCount: number = 100;
  private timer: any;
  private optionElementClone: HTMLSyAutocompleteOptionElement | null = null;
  private blurTimeout: number | undefined;
  private initialValue: string = '';

  // --- Public Properties ---
  @Prop() caseSensitive: boolean = false;
  @Prop() debounceTime: number = 0;
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop({ reflect: true }) min: number = 0;
  @Prop() placeholder: string = '';
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  @Prop() required: boolean = false;
  @Prop({ mutable: true }) value: string = '';
  @Prop({ mutable: true }) source: string[] = [];
  @Prop() trigger: "focus" | "input" = "focus";
  @Prop() noNativeValidity = false;

  // --- Private State ---
  @State() private filteredList: string[] = [];
  @State() private hasFocus = false;
  @State() private touched = false;
  @State() private formSubmitted = false;
  @State() private active = -1;
  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'custom' | '' = "";
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;
  @State() private isFilterActive: boolean = false; // 필터링이 활성화되었는지 여부

  // --- Events ---
  @Event() changed: EventEmitter<{ value: string; isValid: boolean; status: string }>;
  @Event() selected: EventEmitter<{ value: string; isValid: boolean; status: string }>;

  @Watch('required')
  @Watch('value')
  handleValidityChange() {
    this.updateValidityState();
  }

  connectedCallback() {
    this.formSubmitListener();
    this.handleSlotChange();
    if (!this.host.hasAttribute('tabindex')) {
      this.host.setAttribute('tabindex', '0');
    }
  }

  disconnectedCallback() {
    this.formSubmitListenerRemover();
    window.removeEventListener("resize", this.updateOptionPosition);
    window.removeEventListener("scroll", this.updateOptionPosition, true);
    this.host.removeEventListener("keydown", this.handleKeydown);
    clearTimeout(this.timer);
    clearTimeout(this.blurTimeout);
    this.removeOptionClone();
  }

  componentWillLoad() {
    this.initialValue = this.value || '';
    this.handleSlotChange();
    this.updateValidityState();
  }

  componentDidLoad() {
    this.host.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("resize", this.updateOptionPosition);
    window.addEventListener("scroll", this.updateOptionPosition, true);
  }

  componentDidUpdate() {
    // Updated lifecycle
  }

  private formSubmitListener() {
    if (this.internals.form) {
      this.internals.form.addEventListener('submit', this.handleFormSubmit);
    }
  }

  private formSubmitListenerRemover() {
    if (this.internals.form) {
      this.internals.form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  private handleFormSubmit = (_e: Event) => {
    this.formSubmitted = true;
    this.updateValidityState();
  }

  // --- Public Methods ---
  @Method()
  async setFocus() {
    this.input?.focus();
    this.handleFocus();
  }

  @Method()
  async setBlur() {
    this.input?.blur();
    this.blurEvent();
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
  async getStatus(): Promise<string> {
    return this.isValid ? '' : this.validStatus;
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

  get validity(): ValidityState {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
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
      } as ValidityState;
    }
    return this.internals.validity;
  }

  get validationMessage(): string {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return this.getErrorMessage(this.validStatus);
    }
    return this.internals.validationMessage;
  }

  get willValidate(): boolean {
    return this.internals.willValidate;
  }

  // --- Private Methods ---
  private appendOptionClone = (): boolean => {
    if (this.optionElementClone) {
      return true;
    }

    const originalOptionElement = this.host.querySelector("sy-autocomplete-option") as any;

    if (!originalOptionElement) {
      console.error("Cannot find <sy-autocomplete-option> in DOM.");
      return false;
    }

    try {
      // cloneNode 대신 새로 createElement
      const newOptionElement = document.createElement('sy-autocomplete-option') as any;
      
      // 원본의 클래스 복사
      if (originalOptionElement.className) {
        newOptionElement.className = originalOptionElement.className;
      }
      
      // 스타일 설정
      newOptionElement.style.position = 'absolute';
      newOptionElement.style.display = 'none';
      newOptionElement.style.visibility = 'hidden';
      newOptionElement.id = 'sy-autocomplete-options-list';
      newOptionElement.style.zIndex = 'var(--z-index-autocomplete, 1000)';
      
      // 데이터 설정
      newOptionElement.source = this.source || [];
      newOptionElement.loading = false;
      newOptionElement.activeIndex = -1;

      newOptionElement.addEventListener("click", (e: Event) => e.stopPropagation());
      newOptionElement.addEventListener("selected", this.handleSelected);
      newOptionElement.addEventListener("activeChanged", this.activeChanged);

      document.body.appendChild(newOptionElement);
      
      this.optionElementClone = newOptionElement;

      // 원본은 완전히 숨김
      originalOptionElement.style.setProperty('display', 'none', 'important');
      originalOptionElement.style.setProperty('visibility', 'hidden', 'important');
      originalOptionElement.style.setProperty('position', 'absolute', 'important');
      originalOptionElement.style.setProperty('pointer-events', 'none', 'important');
      originalOptionElement.style.setProperty('z-index', '-9999', 'important');
      
      return true;

    } catch (error) {
      console.error('sy-autocomplete appendOptionClone FAILED:', error);
      this.optionElementClone = null;
      return false;
    }
  }

  private removeOptionClone = () => {
    if (this.optionElementClone && (this.optionElementClone as any).parentElement === document.body) {
      try {
        (this.optionElementClone as any).removeEventListener("selected", this.handleSelected);
        (this.optionElementClone as any).removeEventListener("activeChanged", this.activeChanged);
        document.body.removeChild(this.optionElementClone as any);
      } catch (e) {
        console.warn("Error removing option clone", e);
      }
    }
    this.optionElementClone = null;
  }

  private activeChanged = (e: Event) => {
    if (e instanceof CustomEvent) {
      e.preventDefault();

      if (e.detail !== undefined && typeof e.detail === 'number') {
        this.active = e.detail;
      }
    }
  }

  private handleKeydown = (e: KeyboardEvent) => {
    const optionsVisible = (this.optionElementClone as any)?.style.visibility === 'visible';

    if (e.key === "Escape") {
      if (optionsVisible) {
        e.preventDefault();
        this.hideOptions();
        this.input?.focus();
      }
    } else if (e.key === "Enter") {
      if (optionsVisible && this.active >= 0 && this.active < this.filteredList.length) {
        e.preventDefault();
        (this.optionElementClone as any)?.setEvent(this.active);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!this.optionElementClone) {
        if (!this.appendOptionClone()) return;
      }
      if (this.filteredList.length > 0) {
        if (!optionsVisible) {
          // Arrow 키로 열 때는 active를 리셋하지 않음
          this.setData(this.input.value?.trim(), false);
        } else {
          const newActive = (this.active + 1) % this.filteredList.length;
          this.active = newActive;
          if (this.optionElementClone) {
            (this.optionElementClone as any).activeIndex = this.active;
          }
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
          // Arrow 키로 열 때는 active를 리셋하지 않음
          this.setData(this.input.value?.trim(), false);
        } else {
          this.active = (this.active - 1 + this.filteredList.length) % this.filteredList.length;
          if (this.optionElementClone) (this.optionElementClone as any).activeIndex = this.active;
          this.scrollToSelectedItem("up");
        }
      }
    }
  }

  private scrollToSelectedItem = (direction: "down" | "up") => {
    if (!(this.optionElementClone as any)) return;
    
    const optionList = (this.optionElementClone as any).querySelector(".autocomplete-option-container") as HTMLElement;
    const activeItem = (this.optionElementClone as any).querySelector(".option--active") as HTMLElement;

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

  private setFilter = (value?: string, resetActive: boolean = true) => {
    let data: string[] = [];
    const searchInput = value ? (this.caseSensitive ? value : value.toLowerCase()) : '';

    if (searchInput && searchInput.length >= this.min) {
      data = this.source.filter(item => {
        const itemValue = this.caseSensitive ? item : item.toLowerCase();
        return itemValue.includes(searchInput);
      });
      this.isFilterActive = true; // 필터링 활성화
    } else if (!searchInput && this.trigger === 'focus') {
      data = [...this.source];
      this.isFilterActive = true; // 전체 목록 표시도 활성화
    } else {
      this.isFilterActive = false; // 필터링 비활성화
    }

    const limitedData = data.slice(0, this.maxItemCount);
    
    // 검색어가 있고 결과가 없을 때는 empty를 보여줘야 함
    // loading일 때나, 데이터가 있을 때, 또는 검색어가 있고(입력 중) 결과가 없을 때 표시
    const shouldShowOptions = this.loading || limitedData.length > 0 || (searchInput && searchInput.length >= this.min);
    
    if (shouldShowOptions) {
      this.setOptionList(limitedData, resetActive);
    } else {
      this.hideOptions();
    }
  }

  private setOptionList = (data: string[], resetActive: boolean = true) => {
    if (!this.optionElementClone) return;

    // 같은 데이터라도 위치 업데이트는 필요하므로 source만 같으면 skip
    const isSameData = this.filteredList.length === data.length && this.filteredList.every((item, index) => item === data[index]);
    
    
    if (isSameData) {      
      // 같은 데이터지만 resetActive가 true면 active를 0으로 리셋
      if (resetActive && this.active !== 0 && this.filteredList.length > 0) {
        this.active = 0;
        const cloneElement = this.optionElementClone as any;
        cloneElement.activeIndex = this.active;
      }
      
      // source는 이미 설정되어 있으므로 위치만 업데이트
      requestAnimationFrame(() => {
        this.updateOptionPosition();
      });
      return;
    }

    this.filteredList = [...data];
    
    // resetActive가 true일 때만 0으로 초기화 (입력 중일 때)
    // Arrow 키로 이동 중이면 현재 active 유지
    if (resetActive) {
      this.active = this.filteredList.length > 0 ? 0 : -1;
    } else {
      // Arrow 키로 이동 중: active가 범위를 벗어나지 않도록 보정
      if (this.active >= this.filteredList.length) {
        this.active = this.filteredList.length > 0 ? this.filteredList.length - 1 : -1;
      } else if (this.active < 0 && this.filteredList.length > 0) {
        this.active = 0;
      } else {
        console.log('[setOptionList] kept active as:', this.active);
      }
    }
    
    const cloneElement = this.optionElementClone as any;
    cloneElement.activeIndex = this.active;
    cloneElement.source = [...this.filteredList];
        
    if (typeof cloneElement.forceUpdate === 'function') {
      cloneElement.forceUpdate();
    }

    requestAnimationFrame(() => {
      this.updateOptionPosition();
    });
  }

  private handleInput = (event: Event) => {
    this.touched = true;
    const value = (event.target as HTMLInputElement).value;
    this.value = value;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setData(value?.trim());
      this.updateValidityState();
    }, this.debounceTime);

    this.eventEmitter('changed', value);
  }

  private handleClick = (e: Event) => {
    if (this.hasFocus) {
      // 이미 포커스가 있으면 중복 호출 방지
      return;
    }
    this.handleFocus();
    if (this.trigger === 'focus' || (this.trigger === 'input' && (e.target as HTMLInputElement).value)) {
      this.setData((e.target as HTMLInputElement).value?.trim());
    }
  }

  private handleFocus = () => {
    if (this.hasFocus) {
      return;
    }
    
    clearTimeout(this.blurTimeout);
    
    if (!this.optionElementClone) {
      if (!this.appendOptionClone()) return;
    }

    this.hasFocus = true;

    if (this.trigger === 'focus') {
      this.setData(this.input?.value?.trim() ?? '');
    } else if (this.trigger === 'input' && this.input?.value) {
      this.setData(this.input?.value?.trim());
    }
  }

  private setData = (value: string, resetActive: boolean = true) => {
    if (!this.optionElementClone) {
      console.warn("setData called but clone does not exist.");
      return;
    }

    if (!this.loading) {
      (this.optionElementClone as any).loading = false;
      this.setFilter(value, resetActive);
    } else {
      const shouldShowLoading = this.trigger === "focus" || (this.trigger === "input" && value.length >= this.min);
      if (shouldShowLoading) {
        // source를 빈 배열로 설정하지 말고 loading만 true로
        // (this.optionElementClone as any).source = [];
        (this.optionElementClone as any).loading = true;
        requestAnimationFrame(() => {
          this.updateOptionPosition();
        });
      } else {
        this.hideOptions();
      }
    }
  }

  private handleSelected = (e: Event) => {
    if (e instanceof CustomEvent) {
      if (e.detail !== undefined && typeof e.detail === 'string') {
        this.touched = true;
        this.value = e.detail;
        this.eventEmitter('selected', e.detail);
      }
    }
  }

  private eventEmitter = (type: string, value: string) => {
    const eventDetail = {
      value: value,
      isValid: this.isValid,
      status: this.validStatus
    };

    if (type === 'changed') {
      this.changed.emit(eventDetail);
    } else if (type === 'selected') {
      this.selected.emit(eventDetail);
    }

    if (this.input) {
      this.input.value = value;
      this.input.focus();
    }
    this.hideOptions();
  }

  private handleBlur = (e: FocusEvent) => {
    const relatedTarget = e.relatedTarget as Node | null;
    const isFocusInsideClone = (this.optionElementClone as any)?.contains(relatedTarget);

    if (!isFocusInsideClone) {
      this.blurEvent();
    }
  }

  private blurEvent() {
    this.blurTimeout = window.setTimeout(() => {
      this.hasFocus = false;
      this.hideOptions();

      if (this.input) {
        this.value = this.input.value;
      }
      this.updateValidityState();
    }, 150);
  }

  private updateOptionPosition = () => {
    if (!this.optionElementClone) return;

    // isFilterActive가 true면 필터링이 활성화된 상태 -> empty라도 보여줘야 함
    const shouldShow = this.hasFocus && (this.loading || this.isFilterActive);

    if (shouldShow) {
      const cloneElement = this.optionElementClone as any;
      
      cloneElement.style.display = 'block';
      cloneElement.style.visibility = 'hidden';

      const inputRect = this.host.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      const optionRect = cloneElement.getBoundingClientRect();
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

      cloneElement.style.top = `${Math.max(0, top)}px`;
      cloneElement.style.left = `${Math.max(0, left)}px`;
      cloneElement.style.width = `${inputRect.width}px`;
      cloneElement.style.visibility = 'visible';

    } else {
      this.hideOptions();
    }
  }

  private hideOptions = () => {
    if (!this.optionElementClone) return;
    this.active = -1;
    this.isFilterActive = false; // 필터링 비활성화
    (this.optionElementClone as any).style.visibility = 'hidden';
    (this.optionElementClone as any).style.display = 'none';
    (this.optionElementClone as any).loading = false;
  }

  /*******************************************************
   * Form validation with custom error handling
   *******************************************************/

  formAssociatedCallback() {
    this.updateValidityState();
  }

  formDisabledCallback(_disabled: boolean) {
    // autocomplete에는 disabled 속성이 없으므로 필요하면 추가 필요
  }

  formResetCallback() {
    if (this.input) {
      this.input.value = this.initialValue;
      this.value = this.initialValue;
      this.touched = false;
      this.formSubmitted = false;
    }
    this.updateValidityState();
  }

  formStateRestoreCallback(state: string) {
    if (this.input) {
      this.input.value = state;
      this.value = state;
    }
    this.updateValidityState();
  }

  private updateValidityState() {
    if (this.validStatus === 'custom' && !this.isValid) {
      this.internals.setValidity({ customError: true }, this.getErrorMessage('custom'));
      return;
    }

    let currentIsValid = true;
    let currentValidStatus: typeof this.validStatus = "";

    if (this.required && (!this.value || this.value.length === 0)) {
      currentIsValid = false;
      currentValidStatus = "valueMissing";
    }

    this.isValid = currentIsValid;
    this.validStatus = currentValidStatus;
    const validityMessage = this.getErrorMessage(this.validStatus);

    // input처럼 항상 setFormValue 호출
    this.internals.setFormValue(this.value || '', this.value || '');

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

  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    this.formSubmitted = true;

    const hasErrorSlot = !!this.host.querySelector('[slot="error"]');
    if (this.noNativeValidity || hasErrorSlot) {
      const errorSlotElement = this.host.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim();
      if (hasContent) {
        this.hasSlotErrorMessage = true;
        this.host.setAttribute('has-custom-error', '');
        e.preventDefault();
        e.stopPropagation();
        if (this.input) this.input.setCustomValidity('');
        this.internals?.setValidity({ customError: true }, ' ');
      } else {
        this.hasSlotErrorMessage = false;
        this.host.removeAttribute('has-custom-error');
      }
    } else {
      this.hasSlotErrorMessage = false;
      this.host.removeAttribute('has-custom-error');
      setTimeout(() => {
        if (!this.isValid) this.input?.reportValidity();
      }, 0);
    }
    this.isValid = false;
    this.updateValidityState();
  }

  private handleSlotChange = () => {
    const errorSlot = this.host.querySelector('[slot="error"]');
    if (!errorSlot) {
      this.hasSlotErrorMessage = false;
      this.hasPopupErrorComponent = false;
      return;
    }
    this.hasPopupErrorComponent = !!errorSlot.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
    this.hasSlotErrorMessage = errorSlot.textContent.trim().length > 0 || errorSlot.children.length > 0;
  };

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "This field is required",
      custom: "Invalid by custom"
    }

    return type === 'custom' || type === '' ? '' : (validityMessage[type] || '');
  }

  render() {
    return (
      <div class="autocomplete-container">
        <div class="autocomplete-wrapper">
          <div
            tabindex="-1"
            class={{
              'autocomplete-inner': true,
              "autocomplete": true,
              "autocomplete--small": this.size === "small",
              "autocomplete--medium": this.size === "medium",
              "autocomplete--large": this.size === "large",
              "autocomplete--focused": this.hasFocus,
              "autocomplete--invalid": (this.formSubmitted || this.touched) && this.required && !this.isValid,
            }}
          >
            <input
              ref={(el) => this.input = el as HTMLInputElement}
              type="text"
              placeholder={this.placeholder}
              onClick={(e) => this.handleClick(e)}
              onInput={(e) => this.handleInput(e)}
              onFocus={() => this.handleFocus()}
              onBlur={(e) => this.handleBlur(e)}
            />
            <sy-autocomplete-option
              ref={(el) => {
                if (el) {
                  (el as any).style.setProperty('display', 'none', 'important');
                  (el as any).style.setProperty('visibility', 'hidden', 'important');
                  (el as any).style.setProperty('position', 'absolute', 'important');
                  (el as any).style.setProperty('pointer-events', 'none', 'important');
                  (el as any).style.setProperty('z-index', '-9999', 'important');
                }
              }}
              source={this.source}
            ></sy-autocomplete-option>
          </div>
        </div>
        <div class={{
          'error-container': true,
          'popup-error-container': this.hasPopupErrorComponent,
          'text-error-container': !this.hasPopupErrorComponent,
          'visible-error': (this.touched || this.formSubmitted) && !this.isValid
        }}>
          <slot name="error" onSlotchange={() => this.handleSlotChange()}></slot>
        </div>
      </div>
    );
  }
}
