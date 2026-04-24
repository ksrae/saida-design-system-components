import { Component, Prop, State, h, Element, Watch, Event, EventEmitter, Method, AttachInternals, Listen } from '@stencil/core';

@Component({
  tag: 'sy-autocomplete',
  styleUrl: 'sy-autocomplete.scss',
  scoped: true,
  shadow: false,
  formAssociated: true,
})
export class SyAutocomplete {
  @Element() host!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  private input!: HTMLInputElement;
  private maxItemCount: number = 100;
  private timer: any;
  private optionElementClone: HTMLSyAutocompleteOptionElement | null = null;
  private blurTimeout: number | undefined;
  private initialValue: string = '';

  // --- Public Properties ---
  @Prop({ reflect: true }) caseSensitive: boolean = false;
  @Prop() debounceTime: number = 0;
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  @Prop({ reflect: true }) highlightMatches: boolean = false;
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop({ reflect: true }) min: number = 0;
  @Prop() name: string = '';
  @Prop() placeholder: string = '';
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop({ reflect: true }) required: boolean = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true }) status: 'default' | 'warning' | 'error' | 'success' = 'default';
  @Prop({ mutable: true }) value: string = '';
  @Prop({ mutable: true }) source: string[] = [];
  @Prop({ reflect: true }) trigger: 'focus' | 'input' = 'focus';
  @Prop() noNativeValidity: boolean = false;

  // --- Private State ---
  @State() private filteredList: string[] = [];
  @State() private hasFocus = false;
  @State() private touched = false;
  @State() private formSubmitted = false;
  @State() private active = -1;
  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'custom' | '' = '';
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;
  @State() private isFilterActive: boolean = false;
  @State() private searchTerm: string = '';

  // --- Events ---
  @Event() changed!: EventEmitter<{ value: string; isValid: boolean; status: string }>;
  @Event() selected!: EventEmitter<{ value: string; isValid: boolean; status: string }>;

  // --- Watchers ---
  @Watch('required')
  @Watch('value')
  @Watch('min')
  handleValidityChange() {
    this.updateValidityState();
  }

  @Watch('source')
  handleSourceChange() {
    if (this.optionElementClone && this.hasFocus) {
      this.setData(this.input?.value?.trim() ?? '');
    }
  }

  @Watch('disabled')
  handleDisabledChange(newVal: boolean) {
    if (newVal && this.hasFocus) {
      this.setBlur();
    }
  }

  // --- Lifecycle ---
  connectedCallback() {
    this.formSubmitListener();
    this.handleSlotChange();
    if (!this.host.hasAttribute('tabindex')) {
      this.host.setAttribute('tabindex', '0');
    }
  }

  disconnectedCallback() {
    this.formSubmitListenerRemover();
    window.removeEventListener('resize', this.updateOptionPosition);
    window.removeEventListener('scroll', this.updateOptionPosition, true);
    this.host.removeEventListener('keydown', this.handleKeydown);
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
    this.host.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.updateOptionPosition);
    window.addEventListener('scroll', this.updateOptionPosition, true);
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

  private handleFormSubmit = (_e: Event) => {
    this.formSubmitted = true;
    this.updateValidityState();
  }

  // --- Public Methods ---
  @Method()
  async setFocus() {
    if (this.disabled || this.readonly) return;
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
  async getValidStatus(): Promise<string> {
    return this.isValid ? '' : this.validStatus;
  }

  /**
   * Force the component into an app-driven invalid state (ValidityState.customError).
   * The error UI is whatever the consumer declared in [slot="error"]; if the slot is empty,
   * a neutral default message is supplied to ElementInternals so the native report bubble
   * still has something to show.
   */
  @Method()
  async setCustomError() {
    this.customSettingError();
  }

  @Method()
  async clearCustomError() {
    if (this.validStatus === 'custom') {
      this.validStatus = '';
      this.isValid = true;
    }
    this.updateValidityState();
  }

  get validity(): ValidityState {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return {
        badInput: false,
        customError: this.validStatus === 'custom' || this.hasSlotErrorMessage,
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

  // --- Option clone management ---
  private appendOptionClone = (): boolean => {
    if (this.optionElementClone) return true;

    const originalOptionElement = this.host.querySelector('sy-autocomplete-option') as any;
    if (!originalOptionElement) {
      console.error('Cannot find <sy-autocomplete-option> in DOM.');
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
      newOptionElement.style.zIndex = 'var(--z-index-autocomplete, 800)';

      newOptionElement.source = this.source || [];
      newOptionElement.loading = false;
      newOptionElement.activeIndex = -1;
      newOptionElement.searchTerm = '';
      newOptionElement.caseSensitive = this.caseSensitive;
      newOptionElement.highlightMatches = this.highlightMatches;

      newOptionElement.addEventListener('click', (e: Event) => e.stopPropagation());
      newOptionElement.addEventListener('selected', this.handleSelected);
      newOptionElement.addEventListener('activeChanged', this.activeChanged);

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
        (this.optionElementClone as any).removeEventListener('selected', this.handleSelected);
        (this.optionElementClone as any).removeEventListener('activeChanged', this.activeChanged);
        document.body.removeChild(this.optionElementClone as any);
      } catch (e) {
        console.warn('Error removing option clone', e);
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

  // --- Keyboard handling ---
  private handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    const optionsVisible = (this.optionElementClone as any)?.style.visibility === 'visible';

    if (e.key === 'Escape') {
      if (optionsVisible) {
        e.preventDefault();
        this.hideOptions();
        this.input?.focus();
      }
    } else if (e.key === 'Enter') {
      if (optionsVisible && this.active >= 0 && this.active < this.filteredList.length) {
        e.preventDefault();
        (this.optionElementClone as any)?.setEvent(this.active);
      }
    } else if (e.key === 'ArrowDown') {
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
          this.scrollToSelectedItem('down');
        }
      }
    } else if (e.key === 'ArrowUp') {
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
          this.scrollToSelectedItem('up');
        }
      }
    } else if (e.key === 'Tab') {
      if (optionsVisible) {
        this.hideOptions();
      }
    }
  }

  private scrollToSelectedItem = (direction: 'down' | 'up') => {
    if (!(this.optionElementClone as any)) return;

    const optionList = (this.optionElementClone as any).querySelector('.autocomplete-option-container') as HTMLElement;
    const activeItem = (this.optionElementClone as any).querySelector('.option--active') as HTMLElement;

    if (optionList && activeItem) {
      const optionListRect = optionList.getBoundingClientRect();
      const activeItemRect = activeItem.getBoundingClientRect();
      const itemHeight = activeItem.offsetHeight;

      if (direction === 'down') {
        if (activeItemRect.bottom > optionListRect.bottom) {
          optionList.scrollTop += itemHeight;
        } else if (this.active === 0) {
          optionList.scrollTop = 0;
        }
      } else if (direction === 'up') {
        if (activeItemRect.top < optionListRect.top) {
          optionList.scrollTop -= itemHeight;
        } else if (this.active === this.filteredList.length - 1) {
          optionList.scrollTop = optionList.scrollHeight;
        }
      }
    }
  }

  // --- Filtering / dropdown data ---
  // Per spec (autocomplete.yaml::options_guide.trigger):
  //   trigger=focus  → dropdown opens whenever min-length is met (including empty when min=0)
  //   trigger=input  → dropdown opens only after the user has typed AND min-length is met
  private setFilter = (value?: string, resetActive: boolean = true) => {
    let data: string[] = [];
    const rawInput = value ?? '';
    const searchInput = this.caseSensitive ? rawInput : rawInput.toLowerCase();
    this.searchTerm = rawInput;

    const meetsMin = rawInput.length >= (this.min || 0);
    const hasInputContent = rawInput.length > 0;

    const shouldFilter = this.trigger === 'focus'
      ? meetsMin
      : hasInputContent && meetsMin;

    if (shouldFilter) {
      if (hasInputContent) {
        data = this.source.filter(item => {
          const itemValue = this.caseSensitive ? item : item.toLowerCase();
          return itemValue.includes(searchInput);
        });
      } else {
        data = [...this.source];
      }
      this.isFilterActive = true;
    } else {
      this.isFilterActive = false;
    }

    const limitedData = data.slice(0, this.maxItemCount);
    const shouldShowOptions = this.loading || this.isFilterActive;

    if (shouldShowOptions) {
      this.setOptionList(limitedData, resetActive);
    } else {
      this.hideOptions();
    }
  }

  private setOptionList = (data: string[], resetActive: boolean = true) => {
    if (!this.optionElementClone) return;

    const cloneElement = this.optionElementClone as any;
    cloneElement.searchTerm = this.searchTerm;
    cloneElement.caseSensitive = this.caseSensitive;
    cloneElement.highlightMatches = this.highlightMatches;

    const isSameData = this.filteredList.length === data.length && this.filteredList.every((item, index) => item === data[index]);

    if (isSameData) {
      if (resetActive && this.active !== 0 && this.filteredList.length > 0) {
        this.active = 0;
        cloneElement.activeIndex = this.active;
      }
      requestAnimationFrame(() => this.updateOptionPosition());
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

    cloneElement.activeIndex = this.active;
    cloneElement.source = [...this.filteredList];

    if (typeof cloneElement.forceUpdate === 'function') {
      cloneElement.forceUpdate();
    }

    requestAnimationFrame(() => this.updateOptionPosition());
  }

  // --- Input / focus / blur handlers ---
  private handleInput = (event: Event) => {
    if (this.disabled || this.readonly) return;
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
    if (this.disabled || this.readonly) return;
    if (this.hasFocus) return;

    this.handleFocus();
    if (this.trigger === 'focus' || (this.trigger === 'input' && (e.target as HTMLInputElement).value)) {
      this.setData((e.target as HTMLInputElement).value?.trim());
    }
  }

  private handleFocus = () => {
    if (this.disabled || this.readonly) return;
    if (this.hasFocus) return;

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
      console.warn('setData called but clone does not exist.');
      return;
    }

    if (!this.loading) {
      (this.optionElementClone as any).loading = false;
      this.setFilter(value, resetActive);
    } else {
      const shouldShowLoading = this.trigger === 'focus' || (this.trigger === 'input' && value.length >= this.min);
      if (shouldShowLoading) {
        (this.optionElementClone as any).loading = true;
        requestAnimationFrame(() => this.updateOptionPosition());
      } else {
        this.hideOptions();
      }
    }
  }

  private handleSelected = (e: Event) => {
    if (e instanceof CustomEvent && typeof e.detail === 'string') {
      this.touched = true;
      this.value = e.detail;
      this.eventEmitter('selected', e.detail);
    }
  }

  private eventEmitter = (type: 'changed' | 'selected', value: string) => {
    const eventDetail = {
      value,
      isValid: this.isValid,
      status: this.validStatus
    };

    if (type === 'changed') this.changed.emit(eventDetail);
    else if (type === 'selected') this.selected.emit(eventDetail);

    if (type === 'selected' && this.input) {
      this.input.value = value;
      this.input.focus();
    }

    if (type === 'selected') {
      this.hideOptions();
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
      this.touched = true;
      this.updateValidityState();
    }, 150);
  }

  // --- Dropdown positioning ---
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

  // --- Form-associated callbacks ---
  formAssociatedCallback() {
    this.updateValidityState();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = this.initialValue;
    if (this.input) {
      this.input.value = this.initialValue;
    }
    this.touched = false;
    this.formSubmitted = false;
    if (!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
      this.isValid = true;
    }
    this.updateValidityState();
  }

  formStateRestoreCallback(state: string) {
    this.value = state || '';
    if (this.input) {
      this.input.value = this.value;
    }
    this.updateValidityState();
  }

  /* ===========================================================================
   *  Form-error pattern (shared across all SAIDA form-associated components)
   * ---------------------------------------------------------------------------
   *  One slot, two triggers:
   *
   *    1. Declarative — consumer writes the UI once, it appears automatically
   *       when any native constraint (`required`, …) fails AND the user has
   *       either touched the field or submitted the form.
   *
   *         <sy-autocomplete required>
   *           <div slot="error">Please pick a fruit</div>
   *         </sy-autocomplete>
   *
   *    2. Programmatic — app code decides a value is invalid per business
   *       rule and surfaces the same slot via setCustomError() / clearCustomError().
   *
   *         el.setCustomError();   // validStatus = 'custom', isValid = false
   *         el.clearCustomError(); // revert to native constraint validation
   *
   *  ElementInternals.validationMessage receives the slot's textContent when
   *  present (so FormData / reportValidity surfaces it), otherwise a neutral
   *  default is used. CSS controls visibility: `.visible-error` is applied
   *  when `(touched || formSubmitted) && !isValid`.
   * =========================================================================== */

  private getSlotErrorText(): string {
    const slotEl = this.host.querySelector('[slot="error"]');
    return (slotEl?.textContent ?? '').trim();
  }

  private updateValidityState() {
    // (1) Programmatic custom error takes priority — set by setCustomError().
    if (this.validStatus === 'custom' && !this.isValid) {
      const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
      this.internals?.setValidity({ customError: true }, msg);
      this.internals?.setFormValue(this.value || '', this.value || '');
      return;
    }

    // (2) Native constraint validation (required, …).
    let currentIsValid = true;
    let currentValidStatus: typeof this.validStatus = '';

    if (this.required && (!this.value || this.value.length === 0)) {
      currentIsValid = false;
      currentValidStatus = 'valueMissing';
    }

    this.isValid = currentIsValid;
    this.validStatus = currentValidStatus;

    this.internals?.setFormValue(this.value || '', this.value || '');

    if (!this.isValid) {
      // When the consumer supplied a slot="error" UI, we mark it as customError
      // (with the slot's text as the validation message) so the native bubble is
      // suppressed and the slot is what the user sees.
      if (this.hasSlotErrorMessage) {
        const slotText = this.getSlotErrorText() || this.getErrorMessage(this.validStatus) || ' ';
        this.internals?.setValidity({ customError: true }, slotText);
      } else {
        this.internals?.setValidity(
          { [this.validStatus]: true },
          this.getErrorMessage(this.validStatus)
        );
      }
    } else {
      this.internals?.setValidity({});
    }
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    // Force visual invalid state — developer-triggered error should be immediately visible
    // without waiting for the user to blur or submit.
    this.touched = true;
    this.updateValidityState();
  }

  @Listen('focus')
  handleHostFocus() {
    // Tab-key focus lands on the host (tabindex="0"). Forward it to the inner input
    // so keyboard users get the same behaviour as mouse users.
    if (this.disabled || this.readonly) return;
    if (document.activeElement === this.input) return;
    this.input?.focus();
  }

  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    this.formSubmitted = true;
    this.isValid = false;

    const errorSlotElement = this.host.querySelector('[slot="error"]');
    const slotHasContent =
      !!errorSlotElement && (errorSlotElement.textContent?.trim().length ?? 0) > 0;

    // Clear-cut toggle — consistent across all form-associated SAIDA controls:
    //   noNativeValidity=true  → native popup suppressed, slot becomes the UI
    //   noNativeValidity=false → browser shows native popup. DO NOT call
    //     preventDefault — per HTML spec, a single preventDefaulted invalid
    //     event suppresses popups on every form control in the form.
    if (this.noNativeValidity) {
      e.preventDefault();
      e.stopPropagation();
      this.hasSlotErrorMessage = slotHasContent;
      if (slotHasContent) {
        this.host.setAttribute('has-custom-error', '');
        if (this.input) this.input.setCustomValidity('');
        this.internals?.setValidity({ customError: true }, ' ');
      } else {
        this.host.removeAttribute('has-custom-error');
      }
    } else {
      this.hasSlotErrorMessage = false;
      this.host.removeAttribute('has-custom-error');
    }

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
    if (type === '') return '';
    const validityMessage = {
      valueMissing: 'This field is required',
      custom: 'Invalid input'
    };
    return validityMessage[type] || '';
  }

  render() {
    const filled = !!(this.value && this.value.length > 0);
    const showInvalid = (this.formSubmitted || this.touched) && !this.isValid;

    const wrapperClasses = {
      'autocomplete-inner': true,
      'autocomplete': true,
      'autocomplete--small': this.size === 'small',
      'autocomplete--medium': this.size === 'medium',
      'autocomplete--large': this.size === 'large',
      'autocomplete--filled': filled,
      'autocomplete--focused': this.hasFocus,
      'autocomplete--disabled': this.disabled,
      'autocomplete--readonly': this.readonly,
      'autocomplete--default': this.status === 'default',
      'autocomplete--warning': this.status === 'warning',
      'autocomplete--error': this.status === 'error',
      'autocomplete--success': this.status === 'success',
      'autocomplete--invalid': showInvalid,
    };

    const errorContainerClasses = {
      'error-container': true,
      'popup-error-container': this.hasPopupErrorComponent,
      'text-error-container': !this.hasPopupErrorComponent,
      'visible-error': showInvalid,
    };

    return (
      <div class="autocomplete-container">
        <div class="autocomplete-wrapper">
          <div tabindex="-1" class={wrapperClasses}>
            <input
              ref={(el) => this.input = el as HTMLInputElement}
              type="text"
              name={this.name}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readonly}
              required={this.required}
              aria-autocomplete="list"
              aria-expanded={this.hasFocus ? 'true' : 'false'}
              aria-invalid={showInvalid ? 'true' : 'false'}
              autoComplete="off"
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
          <div class={errorContainerClasses}>
            <slot name="error" onSlotchange={() => this.handleSlotChange()}></slot>
          </div>
        </div>
      </div>
    );
  }
}
