import { Component, Prop, State, h, Element, Watch, Event, EventEmitter, Method, AttachInternals, Listen } from '@stencil/core';

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
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false; // disabled 속성 추가
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop({ reflect: true }) min: number = 0;
  @Prop() placeholder: string = '';
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  @Prop() required: boolean = false;
  @Prop({ mutable: true }) value: string = '';
  @Prop({ mutable: true }) source: string[] = [];
  @Prop() trigger: "focus" | "input" = "focus";
  @Prop() noNativeValidity = false;
  @Prop() errorMessage: string = '';

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
  @State() private isFilterActive: boolean = false;

  // --- Events ---
  @Event() changed: EventEmitter<{ value: string; isValid: boolean; status: string }>;
  @Event() selected: EventEmitter<{ value: string; isValid: boolean; status: string }>;

  @Watch('required')
  @Watch('value')
  handleValidityChange() {
    this.updateValidityState();
  }

  connectedCallback() {
    this.initialValue = this.value || '';
    this.formSubmitListener();
    this.handleSlotChange();
    this.updateValidityState();

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
    this.updateValidityState();
  }

  componentDidLoad() {
    this.host.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("resize", this.updateOptionPosition);
    window.addEventListener("scroll", this.updateOptionPosition, true);

    // form value 설정
    this.setFormValue();
  }

  private formSubmitListener() {
    if (this.internals?.form) {
      this.internals.form.addEventListener('submit', this.handleFormSubmit);
    }
  }

  private formSubmitListenerRemover() {
    if (this.internals?.form) {
      this.internals.form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    this.updateValidityState();
  }

  // Invalid 이벤트 리스너 추가
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
        if (!this.isValid && this.input) {
          this.input.reportValidity();
        }
      }, 0);
    }

    this.isValid = false;
    this.updateValidityState();
  }

  // --- Form Associated Callbacks ---
  formAssociatedCallback() {
    this.setFormValue();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    if (this.input) {
      this.input.value = this.initialValue;
    }
    this.value = this.initialValue;
    this.touched = false;
    this.formSubmitted = false;
    this.updateValidityState();
    this.setFormValue();
  }

  formStateRestoreCallback(state: string) {
    if (this.input) {
      this.input.value = state;
    }
    this.value = state;
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
    return this.internals ? this.internals.checkValidity() : true;
  }

  @Method()
  async reportValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals ? this.internals.reportValidity() : true;
  }

  @Method()
  async getStatus(): Promise<string> {
    return this.isValid ? '' : this.validStatus;
  }

  @Method()
  async setCustomError() {
    this.isValid = false;
    this.validStatus = 'custom';

    if (this.hasSlotErrorMessage) {
      this.host.setAttribute('has-custom-error', '');
    }
    this.input?.setCustomValidity('');
    this.internals?.setValidity({ customError: true }, ' ');
  }

  @Method()
  async clearCustomError() {
    if (!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.host.removeAttribute('has-custom-error');
    this.updateValidityState();
  }

  // Form value 설정 메서드
  private setFormValue() {
    this.internals?.setFormValue(this.value || '');
  }

  // --- Private Methods ---
  private handleInput = (event: Event) => {
    if (this.disabled) return;

    this.touched = true;
    const value = (event.target as HTMLInputElement).value;
    this.value = value;

    this.setFormValue();

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setData(value?.trim());
      this.updateValidityState();
    }, this.debounceTime);

    this.eventEmitter('changed', value);
  }

  private handleClick = (e: Event) => {
    if (this.disabled || this.hasFocus) return;

    this.handleFocus();
    if (this.trigger === 'focus' || (this.trigger === 'input' && (e.target as HTMLInputElement).value)) {
      this.setData((e.target as HTMLInputElement).value?.trim());
    }
  }

  private handleFocus = () => {
    if (this.disabled || this.hasFocus) return;

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
      this.setFormValue();
    }, 150);
  }

  private handleSlotChange() {
    const errorSlotElement = this.host.querySelector('[slot="error"]');
    if (!errorSlotElement) {
      this.hasSlotErrorMessage = false;
      this.hasPopupErrorComponent = false;
      return;
    }

    const popupTags = ['sy-tooltip', 'sy-popover', 'sy-popconfirm', 'sy-inline-message'];
    const containsPopup = popupTags.some(tag => !!errorSlotElement.querySelector(tag));
    const isPopupItself = popupTags.includes((errorSlotElement.tagName || '').toLowerCase());

    this.hasPopupErrorComponent = containsPopup || isPopupItself;
    const textContent = errorSlotElement.textContent?.trim();
    this.hasSlotErrorMessage = !!(textContent && textContent.length) || errorSlotElement.children.length > 0;

    this.updateValidityState();
  }

  private updateValidityState() {
    // custom error 상태일 때는 바로 반환
    if (this.validStatus === 'custom' && !this.isValid) return;

    let currentIsValid = true;
    let currentValidStatus: typeof this.validStatus = "";

    if (this.required && (!this.value || this.value.length === 0)) {
      currentIsValid = false;
      currentValidStatus = "valueMissing";
    }

    this.isValid = currentIsValid;
    this.validStatus = currentValidStatus;
    const validityMessage = this.getErrorMessage(this.validStatus);

    if (!this.isValid) {
      if (this.hasSlotErrorMessage) {
        this.host.setAttribute('has-custom-error', '');
        this.input?.setCustomValidity('');
        this.internals?.setValidity({ customError: true }, ' ');
      } else {
        this.host.removeAttribute('has-custom-error');
        if (this.input) {
          this.internals?.setValidity({ [this.validStatus]: true } as any, validityMessage, this.input);
        }
      }
    } else {
      this.host.removeAttribute('has-custom-error');
      this.internals?.setValidity({});
    }
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    if (this.errorMessage) {
      return this.errorMessage;
    }

    const validityMessage = {
      valueMissing: "This field is required",
      custom: "Invalid by custom"
    };

    return type === 'custom' || type === '' ? '' : (validityMessage[type] || '');
  }

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
      const newOptionElement = document.createElement('sy-autocomplete-option') as any;

      if (originalOptionElement.className) {
        newOptionElement.className = originalOptionElement.className;
      }

      newOptionElement.style.position = 'absolute';
      newOptionElement.style.display = 'none';
      newOptionElement.style.visibility = 'hidden';
      newOptionElement.id = 'sy-autocomplete-options-list';
      newOptionElement.style.zIndex = 'var(--z-index-autocomplete, 1000)';

      newOptionElement.source = this.source || [];
      newOptionElement.loading = false;
      newOptionElement.activeIndex = -1;

      newOptionElement.addEventListener("click", (e: Event) => e.stopPropagation());
      newOptionElement.addEventListener("selected", this.handleSelected);
      newOptionElement.addEventListener("activeChanged", this.activeChanged);

      document.body.appendChild(newOptionElement);

      this.optionElementClone = newOptionElement;

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
    if (this.disabled) return;

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
      this.isFilterActive = true;
    } else if (!searchInput && this.trigger === 'focus') {
      data = [...this.source];
      this.isFilterActive = true;
    } else {
      this.isFilterActive = false;
    }

    const limitedData = data.slice(0, this.maxItemCount);
    const shouldShowOptions = this.loading || limitedData.length > 0 || (searchInput && searchInput.length >= this.min);

    if (shouldShowOptions) {
      this.setOptionList(limitedData, resetActive);
    } else {
      this.hideOptions();
    }
  }

  private setOptionList = (data: string[], resetActive: boolean = true) => {
    if (!this.optionElementClone) return;

    const isSameData = this.filteredList.length === data.length &&
        this.filteredList.every((item, index) => item === data[index]);

    if (isSameData) {
      if (resetActive && this.active !== 0 && this.filteredList.length > 0) {
        this.active = 0;
        const cloneElement = this.optionElementClone as any;
        cloneElement.activeIndex = this.active;
      }
      requestAnimationFrame(() => {
        this.updateOptionPosition();
      });
      return;
    }

    this.filteredList = [...data];

    if (resetActive) {
      this.active = this.filteredList.length > 0 ? 0 : -1;
    } else {
      if (this.active >= this.filteredList.length) {
        this.active = this.filteredList.length > 0 ? this.filteredList.length - 1 : -1;
      } else if (this.active < 0 && this.filteredList.length > 0) {
        this.active = 0;
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
        this.setFormValue();
        this.updateValidityState();
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

  private updateOptionPosition = () => {
    if (!this.optionElementClone) return;

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
    this.isFilterActive = false;
    (this.optionElementClone as any).style.visibility = 'hidden';
    (this.optionElementClone as any).style.display = 'none';
    (this.optionElementClone as any).loading = false;
  }

  render() {
    const inputClasses = {
      'autocomplete-inner': true,
      'autocomplete': true,
      'autocomplete--small': this.size === 'small',
      'autocomplete--medium': this.size === 'medium',
      'autocomplete--large': this.size === 'large',
      'autocomplete--focused': this.hasFocus,
      'autocomplete--disabled': this.disabled,
      'autocomplete--invalid': (this.formSubmitted || this.touched) && (!this.isValid || !!this.validStatus)
    };

    const errorClasses = {
      'error-container': true,
      'popup-error-container': this.hasPopupErrorComponent,
      'text-error-container': !this.hasPopupErrorComponent,
      'visible-error': (this.touched || this.formSubmitted) && !this.isValid
    };

    return (
      <div class="autocomplete-container">
        <div class="autocomplete-wrapper">
          <div
            tabindex="-1"
            class={inputClasses}
          >
            <input
              ref={(el) => this.input = el as HTMLInputElement}
              type="text"
              placeholder={this.placeholder}
              disabled={this.disabled}
              required={this.required}
              onClick={(e) => this.handleClick(e)}
              onInput={(e) => this.handleInput(e)}
              onFocus={() => this.handleFocus()}
              onBlur={(e) => this.handleBlur(e)}
              value={this.value}
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
        <div class={errorClasses}>
          <slot name="error" onSlotchange={() => this.handleSlotChange()}></slot>
        </div>
      </div>
    );
  }
}
