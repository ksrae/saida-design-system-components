import { Component, Prop, State, Element, h, Event, EventEmitter, Watch, AttachInternals, Listen } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

export interface HTMLSyDatepickerElement extends HTMLElement {
  mode?: 'day' | 'month' | 'year';
  variant?: 'date' | 'datetime' | 'range' | 'time';
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
  second?: string;
  dateNames?: string;
  mondayStart?: boolean;
  hideWeekend?: boolean;
  placeholder?: string;
  format?: string;
  selected: EventEmitter<any>;
  changed: EventEmitter<any>;
}

@Component({
  tag: 'sy-datepicker',
  styleUrl: 'sy-datepicker.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SyDatePicker {
  @Element() host: HTMLSyDatepickerElement;

  @Prop() mode: 'day' | 'month' | 'year' = 'day';
  @Prop() variant: 'date' | 'datetime' | 'range' | 'time' = 'date';
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop() year!: string;
  @Prop() month!: string;
  @Prop() day!: string;
  @Prop() hour!: string;
  @Prop() minute!: string;
  @Prop() second!: string;
  @Prop({ attribute: 'dateNames', mutable: true }) dateNames: string = 'Su,Mo,Tu,We,Th,Fr,Sa';
  @Prop({ attribute: 'mondayStart', mutable: true }) mondayStart: boolean = false;
  @Prop({ attribute: 'hideWeekend', mutable: true }) hideWeekend: boolean = false;
  @Prop() placeholder: string = '';
  @Prop() format: string = 'yyyy-MM-dd hh:mm:ss';
  @Prop() name: string = '';

  @Event() changed: EventEmitter;
  @Event() selected: EventEmitter;

  @State() private displayPlaceholder: string = this.placeholder;
  @State() private touched = false;
  @State() private startTouched = false;
  @State() private endTouched = false;
  @State() private formSubmitted = false;
  @State() private rangestart: {year: number, month: number, day: number } | undefined = undefined;
  @State() private rangeend: {year: number, month: number, day: number } | undefined = undefined;
  @State() private showCalendar = false;
  @State() private startResult: string = '';
  @State() private endResult: string = '';
  @State() private active: string = '';
  @State() private selectedDatetime!: {
    year: number | undefined,
    month: number | undefined,
    day: number | undefined,
    hour: number | undefined,
    minute: number | undefined,
    second: number | undefined
  };
  @State() private _isEditingRange = false;
  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'custom' | '' = "";
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;
  @State() private lastValidStartResult: string = '';
  @State() private lastValidEndResult: string = '';
  @State() private isInputting: boolean = false;
  @State() private lastInputTime: number = 0;
  @State() private initialStartResult: string = '';
  @State() private initialEndResult: string = '';

  private inputDebounceTimer: any = null;
  private isInputFocused: boolean = false;
  private popupContainer: any;
  private selectionMode: 'start' | 'end' | null = null;

  // ElementInternals 추가
  private internals: ElementInternals;

@Watch('startResult')
@Watch('endResult')
watchResultChanges() {
  this.updateValidityState();
}

  @Watch('year')
  @Watch('month')
  @Watch('day')
  @Watch('hour')
  @Watch('minute')
  @Watch('second')
  watchDateProps() {
    this.selectedDatetime = {
      year: this.year ? Number(this.year) : undefined,
      month: this.month ? Number(this.month) - 1 : undefined,
      day: this.day ? Number(this.day) : undefined,
      hour: this.hour ? Number(this.hour) : undefined,
      minute: this.minute ? Number(this.minute) : undefined,
      second: this.second ? Number(this.second) : undefined
    };

    const { year, month, day, hour, minute, second } = this.selectedDatetime;
    const hasDateValues = year !== undefined && month !== undefined && day !== undefined;
    const hasTimeValues = hour !== undefined && minute !== undefined && second !== undefined;

    if ((hasDateValues && !(this.variant === 'datetime' || this.variant === 'time')) ||
      (hasDateValues && hasTimeValues && (this.variant === 'datetime' || this.variant === 'time'))) {
      this.showResult(
        year,
        month,
        day,
        hour ?? 0,
        minute ?? 0,
        second ?? 0
      );
    }
  }

  @Watch('format')
  watchFormat(newVal: string) {
    if(!newVal?.trim()) {
      this.format = 'yyyy-MM-dd hh:mm:ss';
    } else {
      this.format = newVal.trim();
    }
    this.setPlaceholder();

    if (this.startResult && this.variant !== 'range') {
      if (this.variant === 'time') {
        if (this.validateTimeInput(this.startResult)) {
          setTimeout(() => {
            const inputElement = this.host.querySelector('sy-input.startContent') as any;
            if (inputElement) {
              inputElement.value = this.startResult;
            }
          }, 0);
        }
      } else {
        const parsed = this.parseInputValue(this.startResult);
        if (parsed) {
          const { year, month, day, hour, minute, second } = parsed;
          this.startResult = this.formatDisplayDate(year, month + 1, day, hour, minute, second);

          setTimeout(() => {
            const inputElement = this.host.querySelector('sy-input.startContent') as any;
            if (inputElement) {
              inputElement.value = this.startResult;
            }
          }, 0);
        }
      }
    }
  }

  @Watch('placeholder')
  @Watch('variant')
  watchPlaceholderVariant() {
    this.setPlaceholder();
  }

@Listen('invalid', { capture: true })
private handleInvalid(e: Event) {
  const hasErrorSlot = !!this.host.querySelector('[slot="error"]');
  if (hasErrorSlot) {
    const errorSlotElement = this.host.querySelector('[slot="error"]');
    const hasContent = errorSlotElement?.textContent?.trim();
    if (hasContent) {
      this.hasSlotErrorMessage = true;
      e.preventDefault();
      e.stopPropagation();
      this.internals?.setValidity({ customError: true }, ' ');
    } else {
      this.hasSlotErrorMessage = false;
    }
  } else {
    this.hasSlotErrorMessage = false;
    setTimeout(() => {
      if (!this.isValid) {
        const inputElement = this.host.querySelector('sy-input') as any;
        if (inputElement && inputElement.reportValidity) {
          inputElement.reportValidity();
        }
      }
    }, 0);
  }
  this.isValid = false;
}

  connectedCallback() {
    // ElementInternals 초기화 추가
    if (this.host.attachInternals && !this.internals) {
      this.internals = this.host.attachInternals();
    }

    document.addEventListener('click', this.handleOutsideClick, true);
    this.host.addEventListener('keydown', this.handleKeyDown);
    this.setupFormSubmitListener();

    // createHiddenInput() 호출 제거
  }

  componentWillLoad() {
    this.dateNames = fnAssignPropFromAlias(this.host, 'date-names') ?? this.dateNames;
    this.mondayStart = fnAssignPropFromAlias(this.host, 'monday-start') ?? this.mondayStart;
    this.hideWeekend = fnAssignPropFromAlias(this.host, 'hide-weekend') ?? this.hideWeekend;

    this.setPlaceholder();
    this.updateSelectedDatetimeFromInput();

    // 초기값 저장 (formReset을 위해)
    this.initialStartResult = this.startResult;
    this.initialEndResult = this.endResult;
  }

  componentDidLoad() {

  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick, true);
    this.host.removeEventListener('keydown', this.handleKeyDown);
    this.closeCalendar();
    this.removeFormSubmitListener();

  }

public formResetCallback() {
  this.year = '';
  this.month = '';
  this.day = '';
  this.hour = '';
  this.minute = '';
  this.second = '';
  this.startResult = this.initialStartResult || '';
  this.endResult = this.initialEndResult || '';
  this.rangestart = undefined;
  this.rangeend = undefined;

  this.touched = false;
  this.startTouched = false;
  this.endTouched = false;
  this.formSubmitted = false;
  this.updateValidityState();
}

public formDisabledCallback(disabled: boolean) {
  this.disabled = disabled;
}

public formStateRestoreCallback(state: string) {
  try {
    if (this.variant === 'range') {
      const parsed = JSON.parse(state);
      this.startResult = parsed.start || '';
      this.endResult = parsed.end || '';
    } else {
      this.startResult = state;
    }
    this.updateValidityState();
  } catch (e) {
    console.warn('Failed to restore form state:', e);
  }
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

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.variant !== 'range') return;

    if (e.key === 'Tab') {
      const activeElement = this.host.shadowRoot?.activeElement;
      const startInput = this.host.querySelector('sy-input.startContent');
      const endInput = this.host.querySelector('sy-input.endContent');

      if (e.shiftKey) {
        if (activeElement === endInput || this.active === 'end') {
          e.preventDefault();
          this.active = 'start';
          this.selectionMode = 'start';
          (startInput as any)?.focus();
        }
      } else {
        if (activeElement === startInput || this.active === 'start') {
          e.preventDefault();
          this.active = 'end';
          this.selectionMode = 'end';
          (endInput as any)?.focus();
        }
      }

      if (this.showCalendar) {
        this.renderPopup();
      }
    }
  }

  private setupFormSubmitListener() {
    const form = this.host.closest('form');
    if (form) {
      form.addEventListener('submit', this.handleFormSubmit);
    }
  }

  private removeFormSubmitListener() {
    const form = this.host.closest('form');
    if (form) {
      form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  private handleFormSubmit = () => {
    this.formSubmitted = true;
    this.updateValidityState();
  }

  render() {
    const inputGroupClass = {
      'input-group': true,
      'input--focused': this.isInputFocused,
      'focus-start': this.isInputFocused && this.active === 'start',
      'focus-end': this.isInputFocused && this.active === 'end',
    };

    const containerClass = {
      "container": true,
      "range-visible": this.variant === 'range',
      "range-hidden": this.variant !== 'range',
    };

    const errorContainerClass = {
      'error-container': true,
      'popup-error-container': this.hasPopupErrorComponent,
      'text-error-container': !this.hasPopupErrorComponent,
      'hidden-error': (this.touched || this.formSubmitted) && !this.isValid
    };

    return (
      <div class={containerClass}>
        <div class={inputGroupClass}>
          <sy-input
            class="startContent"
            placeholder={this.variant === 'range' ? 'Start date' : this.displayPlaceholder}
            clearable={true}
            disabled={this.disabled}
            readonly={this.readonly}
            borderless={this.variant === 'range'}
            value={this.startResult}
            onFocused={this.handleStartFocused}
            onBlured={(e: Event) => this.handleBlur('start', e)}
            onChanged={(e: Event) => this.handleInput('start', e)}
            onMouseDown={this.activeStartCalendar}>
            {this.variant === 'range' ?
              <sy-icon slot="suffix" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M569 337C578.4 327.6 578.4 312.4 569 303.1L401 135C391.6 125.6 376.4 125.6 367.1 135C357.8 144.4 357.7 159.6 367.1 168.9L494.1 295.9L88 295.9C74.7 295.9 64 306.6 64 319.9C64 333.2 74.7 343.9 88 343.9L494.1 343.9L367.1 470.9C357.7 480.3 357.7 495.5 367.1 504.8C376.5 514.1 391.7 514.2 401 504.8L569 337z"/></svg></sy-icon>
            : <sy-icon slot="suffix" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg></sy-icon>
            }
          </sy-input>
          {this.variant === 'range' ? (
            <sy-input
              class="endContent"
              placeholder="End date"
              clearable={true}
              disabled={this.disabled}
              readonly={this.readonly}
              borderless={true}
              value={this.endResult}
              onFocused={this.handleEndFocused}
              onBlured={(e: Event) => this.handleBlur('end', e)}
              onChanged={(e: Event) => this.handleInput('end', e)}
              onMouseDown={this.activeEndCalendar}>
              <sy-icon slot="suffix" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg></sy-icon>
            </sy-input>
          ) : null}
        </div>
        <div class={errorContainerClass}>
          <slot name="error" onSlotchange={this.handleCustomErrorSlot}></slot>
        </div>
      </div>
    );
  }

  private setPlaceholder() {
    if(!this.placeholder?.trim()) {
      if (this.variant === 'datetime') {
        this.displayPlaceholder = this.format;
      } else if (this.variant === 'time') {
        const timeFormat = this.format.includes(':') ? this.format : 'hh:mm:ss';
        this.displayPlaceholder = timeFormat.includes(' ') ? timeFormat.split(' ').pop()?.trim() || 'hh:mm:ss' : timeFormat;
      } else {
        const dateFormat = this.format.split(' ')[0];
        this.displayPlaceholder = dateFormat || 'yyyy-MM-dd';
      }
    } else {
      this.displayPlaceholder = this.placeholder;
    }
  }

  private handleStartFocused = () => {
    this.lastValidStartResult = this.startResult;
    this.startTouched = true;
    this.isInputFocused = true;

    if(this.readonly) { return; }

    if (this.variant === 'range') {
      this.active = 'start';
      this.selectionMode = 'start';

      if (this.showCalendar) {
        this.updateSelectedDatetimeFromInput();
        this.renderPopup();
      }
    }

    if(this.variant !== 'range') {
      this.touched = true;
    } else {
      if(this.endTouched) this.touched = true;
    }
  }

  private handleEndFocused = () => {
    this.lastValidEndResult = this.endResult;
    this.endTouched = true;
    this.isInputFocused = true;

    if(this.readonly) { return; }

    if (this.variant === 'range') {
      this.active = 'end';
      this.selectionMode = 'end';

      if (this.showCalendar) {
        this.updateSelectedDatetimeFromInput();
        this.renderPopup();
      }
    }

    if(this.startTouched) this.touched = true;
  }

  private tryParseNumericInput(value: string): string | null {
    if (!/^\d+$/.test(value)) return null;

    const { dateSeparator, timeSeparator } = this.extractSeparators();

    if (this.variant === 'time') {
      if (value.length === 6) {
        const hour = parseInt(value.substr(0, 2));
        const minute = parseInt(value.substr(2, 2));
        const second = parseInt(value.substr(4, 2));

        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60) {
          return `${value.substr(0, 2)}${timeSeparator}${value.substr(2, 2)}${timeSeparator}${value.substr(4, 2)}`;
        }
      }
      return null;
    }

    if (value.length === 8) {
      let year: number, month: number, day: number;

      if (this.format.startsWith('yyyy')) {
        year = parseInt(value.substr(0, 4));
        month = parseInt(value.substr(4, 2));
        day = parseInt(value.substr(6, 2));
      } else if (this.format.startsWith('dd')) {
        day = parseInt(value.substr(0, 2));
        month = parseInt(value.substr(2, 2));
        year = parseInt(value.substr(4, 4));
      } else if (this.format.startsWith('MM')) {
        month = parseInt(value.substr(0, 2));
        day = parseInt(value.substr(2, 2));
        year = parseInt(value.substr(4, 4));
      } else {
        return null;
      }

      if (year >= 1900 && year <= 2100 && month >= 1 && month <= 12) {
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day >= 1 && day <= daysInMonth) {
          if (this.format.startsWith('yyyy')) {
            return `${value.substr(0, 4)}${dateSeparator}${value.substr(4, 2)}${dateSeparator}${value.substr(6, 2)}`;
          } else if (this.format.startsWith('dd')) {
            return `${value.substr(0, 2)}${dateSeparator}${value.substr(2, 2)}${dateSeparator}${value.substr(4, 4)}`;
          } else if (this.format.startsWith('MM')) {
            return `${value.substr(0, 2)}${dateSeparator}${value.substr(2, 2)}${dateSeparator}${value.substr(4, 4)}`;
          }
        }
      }
    }

    return null;
  }

  private handleInput = (mode: 'start' | 'end', e: any) => {
    e.stopPropagation();

    this.isInputting = true;
    this.lastInputTime = Date.now();

    const inputValue = e.target.value;
    const formattedValue = this.tryParseNumericInput(inputValue);
    if (formattedValue) {
      e.target.value = formattedValue;
    }

    if (this.inputDebounceTimer) {
      clearTimeout(this.inputDebounceTimer);
    }

    let value = e.target.value;
    const originalValue = value;

    if (this.variant === 'time' && value.trim()) {
      if (value.match(/^\d{2}:\d{2}:\d{2}$/)) {
        if (!this.isValidTimeFormat(value)) {
          const lastValidValue = mode === 'start' ? this.lastValidStartResult : this.lastValidEndResult;
          e.target.value = lastValidValue;
          if (mode === 'start') {
            this.startResult = lastValidValue;
          } else {
            this.endResult = lastValidValue;
          }
          return;
        }
      }
    }

    const rangeType = mode;
    const detail = this.variant === 'range' ? { mode: rangeType, value: e.target.value } : { value: e.target.value };
    this.changed.emit(detail);

    if (!value.trim()) {
      this.handleEmptyInput(mode);
      return;
    }

    const shouldFormat = this.shouldApplyAutoFormat(value, originalValue);
    if (shouldFormat) {
      const formattedValue = this.formatInputValueCarefully(value);
      if (formattedValue !== originalValue && this.isFormattingBeneficial(originalValue, formattedValue)) {
        value = formattedValue;
        e.target.value = value;
      }
    }

    if (mode === 'start') {
      this.startResult = value;
    } else {
      this.endResult = value;
    }

    if (this.variant === 'range') {
      this.active = mode;
    }

    const isValid = this.isValidInput(value);

    if (isValid) {
      this.processValidInput(mode, value);

      if (this.variant === 'range') {
        this.updateCalendarIfOpen();
      }
    }

    if (this.variant !== 'range' && isValid) {
      this.inputDebounceTimer = setTimeout(() => {
        this.updateCalendarIfOpen();
      }, 100);
    }
  }

  private handleEmptyInput(mode: 'start' | 'end') {
    if (mode === 'start') {
      this.startResult = '';
      if (this.variant === 'range') {
        this.rangestart = undefined;
      } else {
        this.selectedDatetime = {
          year: undefined,
          month: undefined,
          day: undefined,
          hour: undefined,
          minute: undefined,
          second: undefined
        };
      }
    } else {
      this.endResult = '';
      if (this.variant === 'range') {
        this.rangeend = undefined;
      }
    }
    this.updateCalendarIfOpen();
  }

  private shouldApplyAutoFormat(value: string, originalValue: string): boolean {
    if (this.hasUserEnteredSeparators(originalValue)) {
      return false;
    }

    const currentResult = this.startResult || this.endResult || '';
    if (value.length < currentResult.replace(/[^\d]/g, '').length) {
      return false;
    }

    const digitsOnly = value.replace(/[^\d]/g, '');
    if (digitsOnly.length < 4) {
      return false;
    }

    const timeSinceLastInput = Date.now() - this.lastInputTime;
    if (timeSinceLastInput < 300) {
      return false;
    }

    return true;
  }

  private hasUserEnteredSeparators(value: string): boolean {
    const separators = ['-', '/', '.', ':', ' '];
    return separators.some(sep => value.includes(sep));
  }

  private isFormattingBeneficial(original: string, formatted: string): boolean {
    if (Math.abs(formatted.length - original.length) > 3) {
      return false;
    }

    const originalDigits = original.replace(/[^\d]/g, '');
    const formattedDigits = formatted.replace(/[^\d]/g, '');
    if (originalDigits !== formattedDigits) {
      return false;
    }

    const addedChars = formatted.length - original.length;
    if (addedChars > 0) {
      const nonDigitChars = formatted.replace(/[\d]/g, '').length;
      const originalNonDigits = original.replace(/[\d]/g, '').length;
      if (nonDigitChars - originalNonDigits !== addedChars) {
        return false;
      }
    }

    return true;
  }

  private formatInputValueCarefully(value: string): string {
    if (!this.format || !value) return value;

    const digits = value.replace(/[^\d]/g, '');
    if (!digits || digits.length < 4) return value;

    const hasExistingSeparators = /[^\d]/.test(value);
    if (hasExistingSeparators) {
      return value;
    }

    if (this.variant === 'date') {
      return this.formatDateInputCarefully(digits);
    } else if (this.variant === 'time') {
      return this.formatTimeInputCarefully(digits);
    } else if (this.variant === 'datetime') {
      return this.formatDateTimeInputCarefully(digits, value);
    }

    return value;
  }

  private formatDateInputCarefully(digits: string): string {
    if (digits.length < 4) return digits;

    const dateFormat = this.format.split(' ')[0];
    const separator = this.getDateSeparator(dateFormat);

    let result = '';

    if (this.isYearFirstFormat(dateFormat)) {
      result = digits.slice(0, 4);
      if (digits.length >= 6) {
        result += separator + digits.slice(4, 6);
      } else if (digits.length > 4) {
        result += separator + digits.slice(4);
      }
      if (digits.length >= 8) {
        result += separator + digits.slice(6, 8);
      } else if (digits.length > 6) {
        result += separator + digits.slice(6);
      }
    } else {
      if (digits.length >= 8) {
        result = this.formatDateDigits(digits);
      } else {
        return digits;
      }
    }

    return result;
  }

  private formatTimeInputCarefully(digits: string): string {
    if (digits.length < 2) return digits;

    let result = digits.slice(0, 2);
    if (digits.length >= 4) {
      result += ':' + digits.slice(2, 4);
    } else if (digits.length > 2) {
      result += ':' + digits.slice(2);
    }
    if (digits.length >= 6) {
      result += ':' + digits.slice(4, 6);
    } else if (digits.length > 4) {
      result += ':' + digits.slice(4);
    }

    return result;
  }

  private formatDateTimeInputCarefully(digits: string, originalValue: string): string {
    const hasSpace = originalValue.includes(' ');

    if (digits.length <= 8 && !hasSpace) {
      if (digits.length === 8) {
        return this.formatDateInputCarefully(digits) + ' ';
      } else {
        return this.formatDateInputCarefully(digits);
      }
    } else {
      const dateDigits = digits.slice(0, 8);
      const timeDigits = digits.slice(8);

      const formattedDate = this.formatDateInputCarefully(dateDigits);
      if (timeDigits.length === 0) {
        return formattedDate + ' ';
      }
      const formattedTime = this.formatTimeInputCarefully(timeDigits);

      return formattedDate + ' ' + formattedTime;
    }
  }

  private formatDateDigits(digits: string): string {
    if (!digits) return '';

    const dateFormat = this.format.split(' ')[0];
    const separator = this.getDateSeparator(dateFormat);

    let formattedDate = '';

    if (this.isYearFirstFormat(dateFormat)) {
      if (digits.length >= 1) formattedDate += digits.slice(0, Math.min(4, digits.length));
      if (digits.length >= 5) formattedDate += separator + digits.slice(4, Math.min(6, digits.length));
      if (digits.length >= 7) formattedDate += separator + digits.slice(6, Math.min(8, digits.length));
    } else if (this.isDayFirstFormat(dateFormat)) {
      if (digits.length >= 1) formattedDate += digits.slice(0, Math.min(2, digits.length));
      if (digits.length >= 3) formattedDate += separator + digits.slice(2, Math.min(4, digits.length));
      if (digits.length >= 5) formattedDate += separator + digits.slice(4, Math.min(8, digits.length));
    } else if (this.isMonthFirstFormat(dateFormat)) {
      if (digits.length >= 1) formattedDate += digits.slice(0, Math.min(2, digits.length));
      if (digits.length >= 3) formattedDate += separator + digits.slice(2, Math.min(4, digits.length));
      if (digits.length >= 5) formattedDate += separator + digits.slice(4, Math.min(8, digits.length));
    } else {
      if (digits.length >= 1) formattedDate += digits.slice(0, Math.min(4, digits.length));
      if (digits.length >= 5) formattedDate += separator + digits.slice(4, Math.min(6, digits.length));
      if (digits.length >= 7) formattedDate += separator + digits.slice(6, Math.min(8, digits.length));
    }

    return formattedDate;
  }

  private getDateSeparator(dateFormat: string): string {
    if (dateFormat.includes('/')) return '/';
    if (dateFormat.includes('.')) return '.';
    return '-';
  }

  private isYearFirstFormat(dateFormat: string): boolean {
    return dateFormat.startsWith('yyyy') || dateFormat.startsWith('yy');
  }

  private isDayFirstFormat(dateFormat: string): boolean {
    return dateFormat.startsWith('dd');
  }

  private isMonthFirstFormat(dateFormat: string): boolean {
    return dateFormat.startsWith('MM');
  }

  private isValidInput(value: string): boolean {
    if (!value.trim()) return false;

    if (this.variant === 'time') {
      return this.isValidTimeFormat(value);
    } else if (this.variant === 'datetime') {
      return this.isValidDateTimeFormat(value);
    } else if (this.variant === 'date' || this.variant === 'range') {
      return this.isValidDateFormat(value);
    }

    return false;
  }

  private isValidDateFormat(value: string): boolean {
    let dateFormat = this.format;
    if (this.variant === 'range' || this.variant === 'date') {
      dateFormat = this.format.split(' ')[0];
    }

    const separator = this.getDateSeparator(dateFormat);
    const separatorPattern = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    let pattern: string;
    if (this.isYearFirstFormat(dateFormat)) {
      pattern = `^\\d{4}${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])$`;
    } else if (this.isDayFirstFormat(dateFormat)) {
      pattern = `^(0[1-9]|[12][0-9]|3[01])${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}\\d{4}$`;
    } else if (this.isMonthFirstFormat(dateFormat)) {
      pattern = `^(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])${separatorPattern}\\d{4}$`;
    } else {
      pattern = `^\\d{4}${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])$`;
    }

    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      return false;
    }

    return this.isValidDateValue(value);
  }

  private isValidTimeFormat(value: string): boolean {
    const timeSeparator = this.extractSeparators().timeSeparator;
    const escapedSeparator = timeSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const pattern = `^([01][0-9]|2[0-3])${escapedSeparator}([0-5][0-9])${escapedSeparator}([0-5][0-9])$`;

    const regex = new RegExp(pattern);
    if (!regex.test(value)) return false;

    const parts = value.split(timeSeparator).map(Number);
    const [hours, minutes, seconds] = parts;

    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59;
  }

  private isValidDateTimeFormat(value: string): boolean {
    if (!value.includes(' ')) return false;

    const [datePart, timePart] = value.split(' ');
    if (!datePart || !timePart) return false;

    return this.isValidDateFormat(datePart) && this.isValidTimeFormat(timePart);
  }

  private isValidDateValue(dateString: string): boolean {
    let dateFormat = this.format;
    if (this.variant === 'range' || this.variant === 'date') {
      dateFormat = this.format.split(' ')[0];
    }

    const separator = this.getDateSeparator(dateFormat);
    const parts = dateString.split(separator);

    if (parts.length !== 3) return false;

    let year: number, month: number, day: number;

    if (this.isYearFirstFormat(dateFormat)) {
      [year, month, day] = parts.map(Number);
    } else if (this.isDayFirstFormat(dateFormat)) {
      [day, month, year] = parts.map(Number);
    } else if (this.isMonthFirstFormat(dateFormat)) {
      [month, day, year] = parts.map(Number);
    } else {
      [year, month, day] = parts.map(Number);
    }

    if (year < 1000 || year > 9999) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day;
  }

  private processValidInput(mode: 'start' | 'end', value: string) {
    if (this.variant === 'time') {
      this.processTimeInput(mode, value);
    } else if (this.variant === 'datetime') {
      this.processDateTimeInput(mode, value);
    } else if (this.variant === 'date' || this.variant === 'range') {
      this.processDateInput(mode, value);
    }
  }

  private processDateInput(mode: 'start' | 'end', value: string) {
    const parsedDate = this.parseDateString(value);
    if (!parsedDate) return;

    const { year, month, day } = parsedDate;

    if (mode === 'start') {
      this.startResult = value;
      if (this.variant === 'range') {
        const newStartDate = { year, month: month - 1, day };
        const newStartDateObj = new Date(year, month - 1, day);

        if (this.rangeend) {
          const endDateObj = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);
          if (newStartDateObj >= endDateObj) {
            this.rangeend = undefined;
            this.endResult = '';
          }
        }

        this.rangestart = newStartDate;

        this.selectedDatetime = {
          year,
          month: month - 1,
          day,
          hour: 0,
          minute: 0,
          second: 0
        };
      } else {
        this.selectedDatetime = {
          year,
          month: month - 1,
          day,
          hour: 0,
          minute: 0,
          second: 0
        };
      }
    } else {
      this.endResult = value;
      if (this.variant === 'range') {
        const newEndDate = { year, month: month - 1, day };
        const newEndDateObj = new Date(year, month - 1, day);

        if (this.rangestart) {
          const startDateObj = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
          if (newEndDateObj <= startDateObj) {
            this.rangestart = undefined;
            this.startResult = '';
          }
        }

        this.rangeend = newEndDate;

        this.selectedDatetime = {
          year,
          month: month - 1,
          day,
          hour: 0,
          minute: 0,
          second: 0
        };
      }
    }
  }

  private processTimeInput(mode: 'start' | 'end', value: string) {
    const timeMatch = value.match(/^(\d{2}):(\d{2}):(\d{2})$/);
    if (!timeMatch) return;

    const [, hours, minutes, seconds] = timeMatch;
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const second = parseInt(seconds, 10);

    if (mode === 'start') {
      this.startResult = value;
      const now = new Date();
      this.selectedDatetime = {
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        hour,
        minute,
        second
      };
    }
  }

  private processDateTimeInput(mode: 'start' | 'end', value: string) {
    const [datePart, timePart] = value.split(' ');
    if (!datePart || !timePart) return;

    const parsedDate = this.parseDateString(datePart);
    const timeMatch = timePart.match(/^(\d{2}):(\d{2}):(\d{2})$/);

    if (!parsedDate || !timeMatch) return;

    const { year, month, day } = parsedDate;
    const [, hours, minutes, seconds] = timeMatch;
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const second = parseInt(seconds, 10);

    if (mode === 'start') {
      this.startResult = value;
      if (this.variant === 'range') {
        const newStartDate = { year, month: month - 1, day };
        this.rangestart = newStartDate;

        if (this.active === 'start') {
          this.selectedDatetime = {
            year,
            month: month - 1,
            day,
            hour,
            minute,
            second
          };
        }
      } else {
        this.selectedDatetime = {
          year,
          month: month - 1,
          day,
          hour,
          minute,
          second
        };
      }
    } else {
      this.endResult = value;
      if (this.variant === 'range') {
        const newEndDate = { year, month: month - 1, day };
        this.rangeend = newEndDate;

        if (this.active === 'end') {
          this.selectedDatetime = {
            year,
            month: month - 1,
            day,
            hour,
            minute,
            second
          };
        }
      }
    }
  }

  private parseDateString(dateString: string): { year: number, month: number, day: number } | null {
    const dateFormat = this.format.split(' ')[0];
    const separator = this.getDateSeparator(dateFormat);
    const parts = dateString.split(separator);

    if (parts.length !== 3) return null;

    let year: number, month: number, day: number;

    if (this.isYearFirstFormat(dateFormat)) {
      [year, month, day] = parts.map(Number);
    } else if (this.isDayFirstFormat(dateFormat)) {
      [day, month, year] = parts.map(Number);
    } else if (this.isMonthFirstFormat(dateFormat)) {
      [month, day, year] = parts.map(Number);
    } else {
      [year, month, day] = parts.map(Number);
    }

    return { year, month, day };
  }

  private handleBlur = (mode: 'start' | 'end', e: any) => {
    this.isInputting = false;

    const input = e.target as HTMLInputElement;
    const currentValue = input.value.trim();

    if (this.inputDebounceTimer) {
      clearTimeout(this.inputDebounceTimer);
      this.inputDebounceTimer = null;
    }

    if (!currentValue) {
      if (mode === 'start') {
        this.startResult = '';
        this.lastValidStartResult = '';
        if (this.variant === 'range') {
          this.rangestart = undefined;
        }
      } else {
        this.endResult = '';
        this.lastValidEndResult = '';
        if (this.variant === 'range') {
          this.rangeend = undefined;
        }
      }
      this.updateValidityState();
      this.updateCalendarIfOpen();
      return;
    }

    if (this.isValidInput(currentValue)) {
      if (mode === 'start') {
        this.startResult = currentValue;
        this.lastValidStartResult = currentValue;
      } else {
        this.endResult = currentValue;
        this.lastValidEndResult = currentValue;
      }

      this.processValidInput(mode, currentValue);
    } else {
      const lastValidValue = mode === 'start' ? this.lastValidStartResult : this.lastValidEndResult;

      const valueToRestore = lastValidValue || '';
      input.value = valueToRestore;

      if (mode === 'start') {
        this.startResult = valueToRestore;
      } else {
        this.endResult = valueToRestore;
      }

      if (valueToRestore) {
        this.processValidInput(mode, valueToRestore);
      } else {
        if (this.variant === 'range') {
          if (mode === 'start') {
            this.rangestart = undefined;
          } else {
            this.rangeend = undefined;
          }
        } else {
          this.selectedDatetime = {
            year: undefined,
            month: undefined,
            day: undefined,
            hour: undefined,
            minute: undefined,
            second: undefined
          };
        }
      }
    }

    this.updateValidityState();
    this.updateCalendarIfOpen();
  }

  private validateTimeInput(value: string): boolean {
    return this.isValidTimeFormat(value);
  }

  private activeStartCalendar = (e: Event) => {
    if(this.readonly) { return; }

    this.active = 'start';
    this.selectionMode = 'start';

    if (!this.showCalendar) {
      this.showCalendar = true;
      this.openCalendar();
    } else {
      this.updateSelectedDatetimeFromInput();
      this.renderPopup();
    }
  }

  private activeEndCalendar = (e: Event) => {
    if(this.readonly) { return; }

    this.active = 'end';
    this.selectionMode = 'end';

    if (!this.showCalendar) {
      this.showCalendar = true;
      this.openCalendar();
    } else {
      this.updateSelectedDatetimeFromInput();
      this.renderPopup();
    }
  }

  private toggleCalendar() {
    if (!this.showCalendar) {
      this.showCalendar = true;
      this.openCalendar();
    } else {
      this.showCalendar = false;
      this.closeCalendar();
    }
  }

  private updateSelectedDatetimeFromInput() {
    const now = new Date();
    let baseDateSource: { year: number, month: number, day: number } | undefined;

    if (this.variant === 'range') {
      if (this.active === 'start') {
        baseDateSource = this.rangestart || this.rangeend;
      } else if (this.active === 'end') {
        baseDateSource = this.rangeend || this.rangestart;
      }

      if (baseDateSource) {
        this.selectedDatetime = {
          year: baseDateSource.year,
          month: baseDateSource.month,
          day: baseDateSource.day,
          hour: 0, minute: 0, second: 0
        };
      } else {
        this.selectedDatetime = {
          year: now.getFullYear(),
          month: now.getMonth(),
          day: now.getDate(),
          hour: 0, minute: 0, second: 0
        };
      }
    } else {
      if (this.startResult) {
        const parsed = this.parseInputValue(this.startResult);
        if (parsed) {
          this.selectedDatetime = parsed;
        }
      } else {
        this.selectedDatetime = { year: undefined, month: undefined, day: undefined, hour: undefined, minute: undefined, second: undefined };
      }
    }
  }

  private openCalendar() {
    this._isEditingRange = !!(this.rangestart && this.rangeend);

    this.updateSelectedDatetimeFromInput();
    this.renderPopup();

    window.addEventListener('resize', this.handleViewportChange);
    window.addEventListener('scroll', this.handleViewportChange, true);
  }

  private closeCalendar() {
    if (this.variant === 'range') {
      const isStartValid = this.rangestart && this.rangestart.year !== undefined;
      const isEndValid = this.rangeend && this.rangeend.year !== undefined;

      if (isStartValid && !isEndValid) {
        const startDate = new Date(this.rangestart!.year, this.rangestart!.month, this.rangestart!.day);
        startDate.setDate(startDate.getDate() + 1);

        this.rangeend = {
          year: startDate.getFullYear(),
          month: startDate.getMonth(),
          day: startDate.getDate(),
        };
        this.endResult = this.formatDisplayDate(this.rangeend.year, this.rangeend.month + 1, this.rangeend.day);
      } else if (!isStartValid && isEndValid) {
        const endDate = new Date(this.rangeend!.year, this.rangeend!.month, this.rangeend!.day);
        endDate.setDate(endDate.getDate() - 1);

        this.rangestart = {
          year: endDate.getFullYear(),
          month: endDate.getMonth(),
          day: endDate.getDate(),
        };
        this.startResult = this.formatDisplayDate(this.rangestart.year, this.rangestart.month + 1, this.rangestart.day);
      }
    }

    this._isEditingRange = false;
    this.closePopup();

    window.removeEventListener('resize', this.handleViewportChange);
    window.removeEventListener('scroll', this.handleViewportChange, true);
  }

  private renderPopup() {
    if (!this.showCalendar) {
      return;
    }

    if (this.popupContainer && document.body.contains(this.popupContainer)) {
      this.popupContainer.format = this.format;

      if (this.variant === 'range') {
        this.popupContainer.active = this.active;
        (this.popupContainer as any).rangestart = this.rangestart;
        (this.popupContainer as any).rangeend = this.rangeend;

        const displayDate = this.active === 'start' ? this.rangestart : this.rangeend;
        if (displayDate && typeof displayDate.year === 'number') {
          this.popupContainer.year = displayDate.year;
          this.popupContainer.month = displayDate.month;
          this.popupContainer.day = displayDate.day;
        }
      } else {
        if (this.selectedDatetime && this.selectedDatetime.day !== undefined) {
          (this.popupContainer as any).selectedDatetime = this.selectedDatetime;
        } else {
          (this.popupContainer as any).selectedDatetime = undefined;
        }
      }

      this.updatePopupPosition();
      return;
    }

    const calendar = document.createElement('sy-calendar');
    calendar.style.visibility = 'hidden';

    calendar.mondayStart = this.mondayStart;
    calendar.hideWeekend = this.hideWeekend;
    calendar.variant = this.variant;
    calendar.mode = this.mode;
    calendar.dateNames = this.dateNames;
    calendar.format = this.format;

    const now = new Date();
    if (this.variant === 'range') {
      calendar.active = this.active;
      (calendar as any).rangestart = this.rangestart;
      (calendar as any).rangeend = this.rangeend;
      const displayDate = this.active === 'start' ? this.rangestart : this.rangeend;
      if (displayDate && typeof displayDate.year === 'number') {
        calendar.year = displayDate.year;
        calendar.month = displayDate.month;
        calendar.day = displayDate.day;
      } else {
        calendar.year = now.getFullYear();
        calendar.month = now.getMonth();
        calendar.day = now.getDate();
      }
    } else {
      if (this.selectedDatetime && typeof this.selectedDatetime.year === 'number') {
        (calendar as any).selectedDatetime = this.selectedDatetime;
        calendar.year = this.selectedDatetime.year;
        calendar.month = this.selectedDatetime.month as number;
        calendar.day = this.selectedDatetime.day ?? now.getDate();
      } else {
        calendar.year = now.getFullYear();
        calendar.month = now.getMonth();
        calendar.day = now.getDate();
      }
    }

    this.popupContainer = calendar;
    this.setupPopupEventListeners();
    document.body.appendChild(this.popupContainer);

    setTimeout(() => {
      this.syncPopupState();
      setTimeout(() => {
        this.updatePopupPosition();
        this.popupContainer.style.visibility = 'visible';
      }, 0);
    }, 50);
  }

  private async syncPopupState() {
    if (!this.popupContainer) return;

    if (this.variant === 'range') {
      this.popupContainer.setAttribute('active', this.selectionMode || 'start');

      let selectedDate = null;

      if (this.active === 'start') {
        if (this.rangestart) {
          selectedDate = {
            year: this.rangestart.year,
            month: this.rangestart.month,
            day: this.rangestart.day,
            hour: 0,
            minute: 0,
            second: 0
          };
        }
      } else if (this.active === 'end') {
        if (this.rangeend) {
          selectedDate = {
            year: this.rangeend.year,
            month: this.rangeend.month,
            day: this.rangeend.day,
            hour: 0,
            minute: 0,
            second: 0
          };
        }
      }

      if (this.selectedDatetime && this.selectedDatetime.year !== undefined) {
        selectedDate = this.selectedDatetime;
      }

      if (selectedDate) {
        this.popupContainer.selectedDatetime = selectedDate;
        if (selectedDate.year !== undefined) {
          this.popupContainer.year = selectedDate.year;
        }
        if (selectedDate.month !== undefined) {
          this.popupContainer.month = selectedDate.month + 1;
        }
        if (selectedDate.day !== undefined) {
          this.popupContainer.day = selectedDate.day;
        }
      }

    } else {
      if (this.selectedDatetime && this.selectedDatetime.day !== undefined) {
        this.popupContainer.selectedDatetime = this.selectedDatetime;
      } else {
        this.popupContainer.selectedDatetime = undefined;
      }
    }
  }

  private updateCalendarIfOpen() {
    if (this.showCalendar && this.popupContainer) {
      this.renderPopup();
    }
  }

  private setupPopupEventListeners() {
    if (!this.popupContainer) return;
    this.popupContainer.removeEventListener('selected', this.handleDateSelected);
    this.popupContainer.addEventListener('selected', this.handleDateSelected);
  }

  private handleDateSelected = (event: Event) => {
    event.stopPropagation();
    const customEvent = event as CustomEvent;
    const { closable, year, month, day, hour, minute, second } = customEvent.detail;

    if (this.variant === 'range') {
      const selectedDate = { year, month, day };
      const selectedDateObj = new Date(year, month, day);

      if (this.selectionMode === 'start') {
        this.rangestart = selectedDate;
        this.startResult = this.formatDisplayDate(year, month + 1, day);

        if (this.rangeend) {
          const endDateObj = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);
          if (selectedDateObj > endDateObj) {
            this.rangeend = undefined;
            this.endResult = '';
          }
        }

        this.selectionMode = 'end';
        this.active = 'end';

        if (!this.rangeend) {
          setTimeout(() => {
            const endInputComponent = this.host.querySelector('sy-input.endContent') as any;
            if (endInputComponent) {
              endInputComponent.focus();
            }
          }, 0);
        }

      } else {
        this.rangeend = selectedDate;
        this.endResult = this.formatDisplayDate(year, month + 1, day);

        if (this.rangestart) {
          const startDateObj = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
          if (selectedDateObj < startDateObj) {
            this.rangestart = undefined;
            this.startResult = '';
          }
        }

        this.selectionMode = 'start';
        this.active = 'start';

        if (!this.rangestart) {
          setTimeout(() => {
            const startInputComponent = this.host.querySelector('sy-input.startContent') as any;
            if (startInputComponent) {
              startInputComponent.focus();
            }
          }, 0);
        }
      }

      if (this.rangestart && this.rangeend) {
        this.updateInputFocusState();
        this.toggleCalendar();
      } else {
        this.renderPopup();
      }

      this.selected.emit({ rangestart: this.rangestart, rangeend: this.rangeend });

    } else {
      this.year = String(year);
      this.month = String(month + 1);
      this.day = String(day);
      this.hour = String(hour);
      this.minute = String(minute);
      this.second = String(second);
      this.selectedDatetime = { year, month, day, hour, minute, second };

      if (this.variant === 'time') {
        this.startResult = this.formatDisplayDate(year, month + 1, day, hour, minute, second);
      } else {
        this.showResult(year, month, day, hour, minute, second);
      }

      this.selected.emit({ year, month, day, hour, minute, second });

      if (closable !== false) {
        this.toggleCalendar();
      }
    }
  }

  private formatDisplayDate(year: number, month: number, day: number, hour?: number, minute?: number, second?: number): string {
    if (year === undefined || month === undefined || day === undefined) return '';

    if (this.variant === 'time') {
      const h = hour ?? 0;
      const m = minute ?? 0;
      const s = second ?? 0;

      return this.format.replace(/hh/g, String(h).padStart(2, '0'))
                       .replace(/mm/g, String(m).padStart(2, '0'))
                       .replace(/ss/g, String(s).padStart(2, '0'));
    }

    let result = this.format.replace(/yyyy/g, String(year))
                            .replace(/yy/g, String(year % 100).padStart(2, '0'))
                            .replace(/MM/g, String(month).padStart(2, '0'))
                            .replace(/dd/g, String(day).padStart(2, '0'));

    if (this.variant === 'datetime') {
      const h = hour ?? 0;
      const m = minute ?? 0;
      const s = second ?? 0;
      result = result.replace(/hh/g, String(h).padStart(2, '0'))
                     .replace(/mm/g, String(m).padStart(2, '0'))
                     .replace(/ss/g, String(s).padStart(2, '0'));
    } else {
      result = result.replace(/\s*hh:mm:ss\s*/, '').trim();
    }

    return result;
  }

  private parseInputValue(value: string): {year: number, month: number, day: number, hour: number, minute: number, second: number} | null {
    if (!value) return null;

    try {
      if (this.variant === 'time') {
        const timeMatch = value.match(/^(\d{2}):(\d{2}):(\d{2})$/);
        if (timeMatch) {
          const now = new Date();
          const timeParts = [parseInt(timeMatch[1]), parseInt(timeMatch[2]), parseInt(timeMatch[3])];
          let hour: number, minute: number, second: number;

          const timeFormat = this.format.includes(':') ? this.format : 'hh:mm:ss';

          if (timeFormat.startsWith('ss:mm:hh')) {
            [second, minute, hour] = timeParts;
          } else if (timeFormat.startsWith('mm:ss:hh')) {
            [minute, second, hour] = timeParts;
          } else if (timeFormat.startsWith('hh:ss:mm')) {
            [hour, second, minute] = timeParts;
          } else {
            [hour, minute, second] = timeParts;
          }

          return {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate(),
            hour: hour,
            minute: minute,
            second: second
          };
        }
      } else if (this.variant === 'datetime') {
        if (!value.includes(' ')) return null;

        const [datePart, timePart] = value.split(' ');
        if (!datePart || !timePart) return null;

        const dateFormat = this.format.split(' ')[0];
        const separator = dateFormat.includes('/') ? '\\/' : (dateFormat.includes('.') ? '\\.' : '-');
        const datePattern = new RegExp(`^(\\d{2,4})${separator}(\\d{2})${separator}(\\d{2,4})$`);
        const dateMatch = datePart.match(datePattern);

        if (!dateMatch) return null;

        let year: number, month: number, day: number;
        if (dateFormat.startsWith('yyyy') || dateFormat.startsWith('yy')) {
          [, year, month, day] = dateMatch.map(Number);
        } else if (dateFormat.startsWith('dd')) {
          [, day, month, year] = dateMatch.map(Number);
        } else if (dateFormat.startsWith('MM')) {
          [, month, day, year] = dateMatch.map(Number);
        } else {
          [, year, month, day] = dateMatch.map(Number);
        }

        const timeMatch = timePart.match(/^(\d{2}):(\d{2}):(\d{2})$/);
        if (!timeMatch) return null;

        const timeParts = [parseInt(timeMatch[1]), parseInt(timeMatch[2]), parseInt(timeMatch[3])];
        let hour: number, minute: number, second: number;

        const timeFormat = this.format.split(' ')[1] || 'hh:mm:ss';
        if (timeFormat.startsWith('ss:mm:hh')) {
          [second, minute, hour] = timeParts;
        } else if (timeFormat.startsWith('mm:ss:hh')) {
          [minute, second, hour] = timeParts;
        } else if (timeFormat.startsWith('hh:ss:mm')) {
          [hour, second, minute] = timeParts;
        } else {
          [hour, minute, second] = timeParts;
        }

        return {
          year: year,
          month: month - 1,
          day: day,
          hour: hour,
          minute: minute,
          second: second
        };
      } else {
        const dateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (dateMatch) {
          const result = {
            year: parseInt(dateMatch[1]),
            month: parseInt(dateMatch[2]) - 1,
            day: parseInt(dateMatch[3]),
            hour: 0,
            minute: 0,
            second: 0
          };
          return result;
        }

        const flexibleMatch = value.match(/(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
        if (flexibleMatch) {
          const result = {
            year: parseInt(flexibleMatch[1]),
            month: parseInt(flexibleMatch[2]) - 1,
            day: parseInt(flexibleMatch[3]),
            hour: 0,
            minute: 0,
            second: 0
          };
          return result;
        }
      }
    } catch (e) {
      console.warn('Error parsing input value:', e);
    }

    return null;
  }

  private updatePopupPosition() {
    if (!this.popupContainer) return;

    const inputRect = this.host.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    const estimatedPopupHeight = 320;
    const estimatedPopupWidth = 280;

    const spaceBelow = viewportHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;

    this.popupContainer.style.position = 'absolute';
    this.popupContainer.style.zIndex = '9999';
    this.popupContainer.style.visibility = 'hidden';
    this.popupContainer.style.display = 'block';
    this.popupContainer.style.maxHeight = 'none';
    this.popupContainer.style.overflowY = 'visible';

    let shouldShowAbove = false;

    if (spaceBelow >= estimatedPopupHeight) {
      shouldShowAbove = false;
    } else if (spaceAbove >= estimatedPopupHeight) {
      shouldShowAbove = true;
    } else {
      shouldShowAbove = spaceAbove > spaceBelow;
    }

    const popupRect = this.popupContainer.getBoundingClientRect();
    let actualPopupHeight = popupRect.height || estimatedPopupHeight;
    let actualPopupWidth = popupRect.width || estimatedPopupWidth;

    if (actualPopupHeight < 50) {
      actualPopupHeight = estimatedPopupHeight;
    }
    if (actualPopupWidth < 50) {
      actualPopupWidth = estimatedPopupWidth;
    }

    if (shouldShowAbove) {
      if (spaceAbove < actualPopupHeight) {
        this.popupContainer.style.maxHeight = `${Math.max(200, spaceAbove - 10)}px`;
        this.popupContainer.style.overflowY = 'auto';
      }
    } else {
      if (spaceBelow < actualPopupHeight) {
        this.popupContainer.style.maxHeight = `${Math.max(200, spaceBelow - 10)}px`;
        this.popupContainer.style.overflowY = 'auto';
      }
    }

    let top;
    if (shouldShowAbove) {
      const popupHeight = (this.popupContainer.style.maxHeight &&
                          this.popupContainer.style.maxHeight !== 'none') ?
        parseInt(this.popupContainer.style.maxHeight) : actualPopupHeight;
      top = inputRect.top + scrollY - popupHeight;
    } else {
      top = inputRect.bottom + scrollY;
    }

    let left = inputRect.left + scrollX;

    if (left + actualPopupWidth > viewportWidth + scrollX - 10) {
      left = viewportWidth + scrollX - actualPopupWidth - 10;
    }

    if (left < scrollX + 10) {
      left = scrollX + 10;
    }

    this.popupContainer.style.top = `${Math.max(0, top)}px`;
    this.popupContainer.style.left = `${Math.max(0, left)}px`;
    this.popupContainer.style.visibility = 'visible';
  }

  private closePopup() {
    if (this.popupContainer) {
      this.popupContainer.remove();
      this.popupContainer = undefined;
    }
  }

  private handleViewportChange = () => {
    if (this.popupContainer) this.updatePopupPosition();
  }

  private showResult(year: number, month: number, day: number, hour: number, minute: number, second: number, range?: 'start' | 'end') {
    if (isNaN(year) || isNaN(month) || isNaN(day)) return;
    const dateString = this.formatDisplayDate(year, month + 1, day, hour, minute, second);
    if(!range) this.startResult = dateString;
    else if (range === 'start') {
      this.startResult = dateString;
      this.rangestart = {year, month, day};
    } else if (range === 'end') {
      this.endResult = dateString;
      this.rangeend = {year, month, day};
    }
  }

  private updateInputFocusState() {
    if (this.variant === 'range' && this.rangestart && this.rangeend) {
      this.isInputFocused = false;
      this.active = '';
    }
  }

  private handleOutsideClick = (e: Event) => {
    if (this.host.contains(e.target as Node) || (this.popupContainer && this.popupContainer.contains(e.target as Node))) {
      return;
    }

    if (this.variant === 'range') {
      const isStartValid = this.rangestart && this.rangestart.year !== undefined;
      const isEndValid = this.rangeend && this.rangeend.year !== undefined;

      if (isStartValid && !isEndValid) {
        const startDate = new Date(this.rangestart!.year, this.rangestart!.month, this.rangestart!.day);
        startDate.setDate(startDate.getDate() + 1);

        this.rangeend = {
          year: startDate.getFullYear(),
          month: startDate.getMonth(),
          day: startDate.getDate(),
        };
        this.endResult = this.formatDisplayDate(this.rangeend.year, this.rangeend.month + 1, this.rangeend.day);
      } else if (!isStartValid && isEndValid) {
        const endDate = new Date(this.rangeend!.year, this.rangeend!.month, this.rangeend!.day);
        endDate.setDate(endDate.getDate() - 1);

        this.rangestart = {
          year: endDate.getFullYear(),
          month: endDate.getMonth(),
          day: endDate.getDate(),
        };
        this.startResult = this.formatDisplayDate(this.rangestart.year, this.rangestart.month + 1, this.rangestart.day);
      }
    }

    this.isInputFocused = false;
    this.active = '';

    if (this.showCalendar) {
      this.toggleCalendar();
    }
  }

  // Form validation methods
  public getStatus() { return this.isValid ? '' : this.validStatus; }

  public setCustomError() {
    this.isValid = false;
    this.validStatus = 'custom';
  }

  public clearCustomError() {
    if(!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }

public checkValidity(): boolean {
  this.updateValidityState();
  return this.internals.checkValidity();
}

public reportValidity(): boolean {
  this.updateValidityState();
  return this.internals.reportValidity();
}

private updateValidityState() {
  if (this.validStatus === 'custom' && !this.isValid) {
    this.internals.setValidity(
      { customError: true },
      this.getErrorMessage('custom')
    );
    return;
  }

  this.isValid = true;
  this.validStatus = "";

  if (this.required) {
    let hasValue = false;
    if (this.variant === 'range') {
      hasValue = !!(this.startResult && this.endResult);
    } else {
      hasValue = !!this.startResult;
    }
    if (!hasValue) {
      this.isValid = false;
      this.validStatus = "valueMissing";
    }
  }

  // ElementInternals로 폼 값 설정
  let formValue = '';
  if (this.variant === 'range') {
    formValue = JSON.stringify({
      start: this.startResult,
      end: this.endResult
    });
  } else {
    formValue = this.startResult;
  }

  this.internals.setFormValue(formValue, formValue);

  // 유효성 상태 설정
  if (!this.isValid) {
    const validityMessage = this.getErrorMessage(this.validStatus);
    if (this.hasSlotErrorMessage) {
      this.internals.setValidity({ customError: true }, validityMessage);
    } else {
      this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
    }
  } else {
    this.internals.setValidity({});
  }
}

  private extractSeparators(): { dateSeparator: string; timeSeparator: string } {
    const format = this.format || 'yyyy-MM-dd hh:mm:ss';

    const dateFormat = format.split(' ')[0];
    const timeFormat = format.split(' ')[1] || (this.variant === 'time' ? format : 'hh:mm:ss');

    let dateSeparator = '-';
    if (dateFormat.includes('/')) {
      dateSeparator = '/';
    } else if (dateFormat.includes('.')) {
      dateSeparator = '.';
    }

    let timeSeparator = ':';
    if (timeFormat.includes('/')) {
      timeSeparator = '/';
    } else if (timeFormat.includes('.')) {
      timeSeparator = '.';
    }

    return { dateSeparator, timeSeparator };
  }

private getErrorMessage(type: 'valueMissing' | 'custom' | ''): string {
  const messages = {
    valueMissing: "This field is required",
    custom: 'Invalid by custom'
  };
  return messages[type] || '';
}

private handleCustomErrorSlot = () => {
  const errorSlot = this.host.querySelector('[slot="error"]');

  if (!errorSlot) {
    this.hasSlotErrorMessage = false;
    this.hasPopupErrorComponent = false;
    return;
  }

  // errorSlot은 Element이므로, 그 안에 팝업 컴포넌트가 있는지 확인
  this.hasPopupErrorComponent = !!errorSlot.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');

  // 텍스트 내용이나 자식 요소가 있는지 확인
  this.hasSlotErrorMessage = (errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0;
}
}
