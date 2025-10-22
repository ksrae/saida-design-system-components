import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from "lit/directives/class-map.js";
import '../input/input.element';
import '../button/button.element'
import globalCSS from './styles/datepicker.scss?inline';

@customElement('sy-datepicker')
export class DatePickerElement extends LitElement {
  
  // 폼 연관 요소로 등록
  static formAssociated = true;

  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`
  
  // ElementInternals 인스턴스 저장
  private internals: ElementInternals;

  @property({ type: String }) mode: 'day' | 'month' | 'year' = 'day';
  @property({ type: String }) variant: 'date' | 'datetime' | 'range' | 'time' = 'date';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: String }) year!: string;
  @property({ type: String }) month!: string;
  @property({ type: String }) day!: string;
  @property({ type: String }) hour!: string;
  @property({ type: String }) minute!: string;
  @property({ type: String }) second!: string;
  @property({ type: String }) dateNames: string = '';
  @property({ type: Boolean }) mondayStart: boolean = false;
  @property({ type: Boolean }) hideWeekend: boolean = false;
  // @property({ type: String }) placement: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' = 'bottomLeft';
  @property({ type: String }) placeholder: string = '';
  @property({ type: String }) format: string = 'yyyy-MM-dd hh:mm:ss';

  @query("input.startContent") inputStart!: HTMLInputElement;
  @query("input.endContent") endStart!: HTMLInputElement;
  
  // y, M, d, h, m
  @state() private displayPlaceholder: string = this.placeholder;

  @state() private touched = false;
  @state() private startTouched = false;
  @state() private endTouched = false;
  @state() private formSubmitted = false;

  @state() private rangestart: {year: number, month: number, day: number } | undefined = undefined;
  @state() private rangeend: {year: number, month: number, day: number } | undefined = undefined;

  @state() private showCalendar = false;
  @state() private startResult: string = '';
  @state() private endResult: string = '';
  @state() private active: string = '';
  @state() private selectedDatetime!: {
    year: number | undefined, 
    month: number | undefined, 
    day: number | undefined, 
    hour: number | undefined, 
    minute: number | undefined, 
    second: number | undefined
  };
  @state() private _isEditingRange = false;

  @state() private isValid: boolean = true;
  @state() private validStatus: 'valueMissing' | 'custom' | '' = ""; 
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;
  // 이전 유효한 값들을 저장하기 위한 프로퍼티 추가
  @state() private lastValidStartResult: string = '';
  @state() private lastValidEndResult: string = '';
  @state() private isInputting: boolean = false;
  @state() private lastInputTime: number = 0;
  @state() private inputDebounceTimer: any = null;
  // input focus
  private isInputFocused: boolean = false;

  private popupContainer: any;
  private selectionMode: 'start' | 'end' | null = null;

  constructor() {
    super();

    this.internals = this.attachInternals();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addEventListener('invalid', this.handleInvalid);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick, true);
    this.addEventListener('keydown', this.handleKeyDown);
    this.setupFormSubmitListener();
  }

  async firstUpdated() {
    await this.updateComplete;

    this.setPlaceholder();

    // 초기 selectedDatetime 설정
    this.updateSelectedDatetimeFromInput();
  }

  updated(changedProperties: Map<string, unknown>) {    
    const dateProps = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    const hasDatePropsChanged = dateProps.some(prop => changedProperties.has(prop));
      
    if(hasDatePropsChanged) {
      this.selectedDatetime = {
        year: this.year ? Number(this.year) : undefined,
        month: this.month ? Number(this.month) - 1 : undefined,
        day: this.day ? Number(this.day) : undefined,
        hour: this.hour ? Number(this.hour) : undefined,
        minute: this.minute ? Number(this.minute) : undefined,
        second: this.second ? Number(this.second) : undefined
      }

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
    
    // startResult와 endResult가 변경될 때 lastValid 값들 업데이트
    if (changedProperties.has('startResult') && this.startResult && this.isValidInput(this.startResult)) {
      this.lastValidStartResult = this.startResult;
    }
    
    if (changedProperties.has('endResult') && this.endResult && this.isValidInput(this.endResult)) {
      this.lastValidEndResult = this.endResult;
    }
    
    if(changedProperties.has('format')) {
      if(!this.format?.trim()) {
        this.format = 'yyyy-MM-dd hh:mm:ss';
      } else {
        this.format = this.format.trim();
      }
      this.setPlaceholder();
      
      // Reformat existing input value to match new format
      if (this.startResult && this.variant !== 'range') {
        if (this.variant === 'time') {
          // For time variant, validate and keep existing time value
          if (this.validateTimeInput(this.startResult)) {
            // Time format is consistent, no need to reformat
            requestAnimationFrame(() => {
              const inputElement = this.shadowRoot?.querySelector('sy-input.startContent') as any;
              if (inputElement) {
                inputElement.value = this.startResult;
              }
            });
          }
        } else {
          // For date/datetime variants
          const parsed = this.parseInputValue(this.startResult);
          if (parsed) {
            const { year, month, day, hour, minute, second } = parsed;
            this.startResult = this.formatDisplayDate(year, month + 1, day, hour, minute, second);
            
            // Update input field
            requestAnimationFrame(() => {
              const inputElement = this.shadowRoot?.querySelector('sy-input.startContent') as any;
              if (inputElement) {
                inputElement.value = this.startResult;
              }
            });
          }
        }
      }
    }

    if(changedProperties.has('placeholder') || changedProperties.has('variant')) {
      this.setPlaceholder();
    }

    // startResult가 변경되었을 때 selectedDatetime 업데이트 (range가 아닌 경우)
    if (changedProperties.has('startResult') && this.variant !== 'range') {
        if (this.startResult) {
            const parsed = this.parseInputValue(this.startResult);
            if (parsed) {
                this.selectedDatetime = parsed;
            }
        } else {
            // 값이 비워졌을 때 selectedDatetime도 초기화
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

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick, true);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.closeCalendar();
    this.removeFormSubmitListener();
  }

  private handleKeyDown(e: KeyboardEvent) {
    // range variant일 때만 Tab 키 처리
    if (this.variant !== 'range') return;
    
    if (e.key === 'Tab') {
      // 현재 포커스된 input 요소 확인
      const activeElement = this.shadowRoot?.activeElement;
      const startInput = this.shadowRoot?.querySelector('sy-input.startContent');
      const endInput = this.shadowRoot?.querySelector('sy-input.endContent');
      
      if (e.shiftKey) {
        // Shift + Tab: end -> start로 이동
        if (activeElement === endInput || this.active === 'end') {
          e.preventDefault();
          this.active = 'start';
          this.selectionMode = 'start';
          (startInput as any)?.focus();
        }
      } else {
        // Tab: start -> end로 이동
        if (activeElement === startInput || this.active === 'start') {
          e.preventDefault();
          this.active = 'end';
          this.selectionMode = 'end';
          (endInput as any)?.focus();
        }
      }
      
      // 캘린더가 열려있으면 업데이트
      if (this.showCalendar) {
        this.renderPopup();
      }
    }
  }

  public formResetCallback() {
    this.year = '';
    this.month = '';
    this.day = '';
    this.hour = '';
    this.minute = '';
    this.second = '';
    this.startResult = '';
    this.endResult = '';
    this.rangestart = undefined;
    this.rangeend = undefined;
    
    this.touched = false;
    this.startTouched = false;
    this.endTouched = false;
    this.formSubmitted = false;
    this.updateValidityState();
    this.requestUpdate();
  }

  public formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    this.requestUpdate();
  }

  private setupFormSubmitListener() {
    const form = this.internals.form;
    if (form) {
      form.addEventListener('submit', this.handleFormSubmit);
    }
  }

  private removeFormSubmitListener() {
    const form = this.internals.form;
    if (form) {
      form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  private handleFormSubmit = () => {
    this.formSubmitted = true;
    this.updateValidityState();
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="${classMap({
        "container": true,
        "range-visible": this.variant === 'range',
        "range-hidden": this.variant !== 'range',
      })}">
        <div class="${classMap({
          'input-group': true,
          'input--focused': this.isInputFocused,
          'focus-start': this.isInputFocused && this.active === 'start',
          'focus-end': this.isInputFocused && this.active === 'end',
        })}">
          <sy-input class="startContent"
            placeholder=${this.variant === 'range' ? 'Start date' : this.displayPlaceholder}
            clearable
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?borderless=${this.variant === 'range'}
            .value=${this.startResult}
            @focused=${this.handleStartFocused}
            @blured="${(e: Event) => this.handleBlur('start', e)}" 
            @changed="${(e: Event) => this.handleInput('start', e)}"
            @mousedown="${this.activeStartCalendar}">
            ${this.variant === 'range' ?
              html`<sy-icon slot="suffix" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M569 337C578.4 327.6 578.4 312.4 569 303.1L401 135C391.6 125.6 376.4 125.6 367.1 135C357.8 144.4 357.7 159.6 367.1 168.9L494.1 295.9L88 295.9C74.7 295.9 64 306.6 64 319.9C64 333.2 74.7 343.9 88 343.9L494.1 343.9L367.1 470.9C357.7 480.3 357.7 495.5 367.1 504.8C376.5 514.1 391.7 514.2 401 504.8L569 337z"/></svg></sy-icon>`
            : html`<sy-icon slot="suffix" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg></sy-icon>`
            }
          </sy-input>
        ${this.variant === 'range' ? html`
          <sy-input class="endContent"
            placeholder="End date" 
            clearable
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            borderless
            .value=${this.endResult}
            @focused=${this.handleEndFocused}
            @blured="${(e: Event) => this.handleBlur('end', e)}" 
            @changed="${(e: Event) => this.handleInput('end', e)}"
            @mousedown="${this.activeEndCalendar}">
            <sy-icon slot="suffix" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg></sy-icon>
          </sy-input>
        ` : ''}
        </div>
        <div class="${classMap({
            'error-container': true,
            'popup-error-container': this.hasPopupErrorComponent,
            'text-error-container': !this.hasPopupErrorComponent,
            'hidden-error': (this.touched || this.formSubmitted) && !this.isValid
          })}">
            <slot name="error" class="error-message" @slotchange=${this.handleCustomErrorSlot}></slot>          
        </div>
      </div>
    `;
  }

  private setPlaceholder() {
    if(!this.placeholder?.trim()) {
      if (this.variant === 'datetime') {
        this.displayPlaceholder = this.format;
      } else if (this.variant === 'time') {
        // Extract time format part or use default
        const timeFormat = this.format.includes(':') ? this.format : 'hh:mm:ss';
        this.displayPlaceholder = timeFormat.includes(' ') ? timeFormat.split(' ').pop()?.trim() || 'hh:mm:ss' : timeFormat;
      } else {
        // For date variant, extract date part only
        const dateFormat = this.format.split(' ')[0];
        this.displayPlaceholder = dateFormat || 'yyyy-MM-dd';
      }
    } else {
      this.displayPlaceholder = this.placeholder;
    }
  }

  private handleStartFocused() {
    this.lastValidStartResult = this.startResult;

    this.startTouched = true;
    this.isInputFocused = true;
    
    if(this.readonly) { return ; }

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

  private handleEndFocused() {
    this.lastValidEndResult = this.endResult;

    this.endTouched = true;
    this.isInputFocused = true;

    if(this.readonly) { return ; }
    
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
    // 숫자로만 이루어진 입력값인지 확인
    if (!/^\d+$/.test(value)) return null;

    const { dateSeparator, timeSeparator } = this.extractSeparators();
    
    if (this.variant === 'time') {
      // 시간 형식 (6자리 숫자)
      if (value.length === 6) {
        const hour = parseInt(value.substr(0, 2));
        const minute = parseInt(value.substr(2, 2));
        const second = parseInt(value.substr(4, 2));
        
        // 유효한 시간인지 확인
        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60) {
          return `${value.substr(0, 2)}${timeSeparator}${value.substr(2, 2)}${timeSeparator}${value.substr(4, 2)}`;
        }
      }
      return null;
    }

    // 날짜 형식 (8자리 숫자)
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

      // 유효한 날짜인지 확인
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

  private handleInput(mode: 'start' | 'end', e: any) {
    e.stopPropagation();
    
    // 이전 유효한 값 저장
    // if (!this.isInputting) {
    //   this.lastValidStartResult = this.startResult;
    //   this.lastValidEndResult = this.endResult;
    // }
    this.isInputting = true;
    this.lastInputTime = Date.now();

    // 숫자만으로 된 입력값 처리
    const inputValue = e.target.value;
    const formattedValue = this.tryParseNumericInput(inputValue);
    if (formattedValue) {
      e.target.value = formattedValue;
    }

    // 디바운스 타이머 클리어
    if (this.inputDebounceTimer) {
      clearTimeout(this.inputDebounceTimer);
    }

    let value = e.target.value;
    const originalValue = value;

    // variant가 time일 때 특별 처리
    if (this.variant === 'time' && value.trim()) {
      // 완전한 시간 형식일 때만 검증
      if (value.match(/^\d{2}:\d{2}:\d{2}$/)) {
        if (!this.isValidTimeFormat(value)) {
          // 잘못된 시간 형식이면 이전 유효한 값으로 복원
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

    // Emit the changed event with mode for range
    const rangeType = mode;
    const detail = this.variant === 'range' ? { mode: rangeType, value: e.target.value } : { value: e.target.value };
    this.dispatchEvent(
      new CustomEvent('changed', {
        detail: {
          ...detail,
        },
      })
    );

    // 입력값이 완전히 비어있는 경우 처리
    if (!value.trim()) {
      this.handleEmptyInput(mode);
      return;
    }

    // 자동 포맷팅
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

    // range 모드에서 active 상태 설정
    if (this.variant === 'range') {
      this.active = mode;
    }

    // 유효한 형식인지 검증 
    const isValid = this.isValidInput(value);
    
    if (isValid) {
      // 유효한 형식일 때만 내부 상태 및 캘린더 업데이트
      this.processValidInput(mode, value);
      
      // range 모드에서는 즉시 캘린더 업데이트
      if (this.variant === 'range') {
        this.updateCalendarIfOpen();
      }
    }

    // 디바운스된 캘린더 업데이트 (일반 모드용) - 유효한 입력일 때만
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
    // 자동 포맷팅을 적용할지 매우 신중하게 결정
    
    // 1. 사용자가 구분자를 직접 입력했다면 포맷팅하지 않음
    if (this.hasUserEnteredSeparators(originalValue)) {
      return false;
    }
    
    // 2. 값이 줄어들고 있다면 (삭제 중) 포맷팅하지 않음
    const currentResult = this.startResult || this.endResult || '';
    if (value.length < currentResult.replace(/[^\d]/g, '').length) {
      return false;
    }
    
    // 3. 숫자만 있고 충분히 긴 경우에만 포맷팅 적용
    const digitsOnly = value.replace(/[^\d]/g, '');
    if (digitsOnly.length < 4) {
      return false;
    }
    
    // 4. 빠른 연속 입력 중이라면 포맷팅 지연
    const timeSinceLastInput = Date.now() - this.lastInputTime;
    if (timeSinceLastInput < 300) {
      return false;
    }
    
    return true;
  }

  private hasUserEnteredSeparators(value: string): boolean {
    // 사용자가 직접 구분자를 입력했는지 확인
    const separators = ['-', '/', '.', ':', ' '];
    return separators.some(sep => value.includes(sep));
  }

  private isFormattingBeneficial(original: string, formatted: string): boolean {    
    // 1. 길이가 크게 변하지 않아야 함
    if (Math.abs(formatted.length - original.length) > 3) {
      return false;
    }
    
    // 2. 숫자는 보존되어야 함
    const originalDigits = original.replace(/[^\d]/g, '');
    const formattedDigits = formatted.replace(/[^\d]/g, '');
    if (originalDigits !== formattedDigits) {
      return false;
    }
    
    // 3. 구분자만 추가되어야 함
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

    // 기존 구분자가 있다면 보존
    const hasExistingSeparators = /[^\d]/.test(value);
    if (hasExistingSeparators) {
      return value; // 이미 구분자가 있다면 건드리지 않음
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
      // yyyy-MM-dd 형태
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
      // 다른 형식들도 비슷하게 처리하되 매우 보수적으로
      if (digits.length >= 8) {
        result = this.formatDateDigits(digits);
      } else {
        return digits; // 불완전하면 포맷팅하지 않음
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
      // 날짜 부분만 있는 경우
      if (digits.length === 8) {
        return this.formatDateInputCarefully(digits) + ' ';
      } else {
        return this.formatDateInputCarefully(digits);
      }
    } else {
      // 날짜와 시간 모두 있는 경우
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
      // yyyy-MM-dd 형태
      if (digits.length >= 1) formattedDate += digits.slice(0, Math.min(4, digits.length));
      if (digits.length >= 5) formattedDate += separator + digits.slice(4, Math.min(6, digits.length));
      if (digits.length >= 7) formattedDate += separator + digits.slice(6, Math.min(8, digits.length));
    } else if (this.isDayFirstFormat(dateFormat)) {
      // dd-MM-yyyy 형태
      if (digits.length >= 1) formattedDate += digits.slice(0, Math.min(2, digits.length));
      if (digits.length >= 3) formattedDate += separator + digits.slice(2, Math.min(4, digits.length));
      if (digits.length >= 5) formattedDate += separator + digits.slice(4, Math.min(8, digits.length));
    } else if (this.isMonthFirstFormat(dateFormat)) {
      // MM-dd-yyyy 형태
      if (digits.length >= 1) formattedDate += digits.slice(0, Math.min(2, digits.length));
      if (digits.length >= 3) formattedDate += separator + digits.slice(2, Math.min(4, digits.length));
      if (digits.length >= 5) formattedDate += separator + digits.slice(4, Math.min(8, digits.length));
    } else {
      // 기본값: yyyy-MM-dd
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
      // range variant일 때도 date 형식 검증 사용
      return this.isValidDateFormat(value);
    }

    return false;
  }


  private isValidDateFormat(value: string): boolean {
    // range variant일 때는 date part만 사용
    let dateFormat = this.format;
    if (this.variant === 'range' || this.variant === 'date') {
      dateFormat = this.format.split(' ')[0]; // date part만 추출
    }
    
    const separator = this.getDateSeparator(dateFormat);
    const separatorPattern = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // 엄격한 format 검증: 정확히 yyyy-MM-dd, dd-MM-yyyy, MM-dd-yyyy 형식만 허용
    let pattern: string;
    if (this.isYearFirstFormat(dateFormat)) {
      // yyyy-MM-dd 형식: 정확히 4자리-2자리-2자리
      pattern = `^\\d{4}${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])$`;
    } else if (this.isDayFirstFormat(dateFormat)) {
      // dd-MM-yyyy 형식: 정확히 2자리-2자리-4자리
      pattern = `^(0[1-9]|[12][0-9]|3[01])${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}\\d{4}$`;
    } else if (this.isMonthFirstFormat(dateFormat)) {
      // MM-dd-yyyy 형식: 정확히 2자리-2자리-4자리
      pattern = `^(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])${separatorPattern}\\d{4}$`;
    } else {
      // 기본값은 yyyy-MM-dd
      pattern = `^\\d{4}${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])$`;
    }

    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      return false;
    }

    // 실제 날짜 유효성 검증
    return this.isValidDateValue(value);
  }

  private isValidTimeFormat(value: string): boolean {
    // 시간 형식에 따른 유효성 검증
    const timeSeparator = this.extractSeparators().timeSeparator;
    const escapedSeparator = timeSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // 형식에 따라 패턴 생성
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
    // range variant일 때는 date part만 사용
    let dateFormat = this.format;
    if (this.variant === 'range' || this.variant === 'date') {
      dateFormat = this.format.split(' ')[0]; // date part만 추출
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

    // 기본적인 범위 체크
    if (year < 1000 || year > 9999) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // 실제 날짜 유효성 검증
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
      // range variant일 때도 date 처리 로직 사용
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
        
        // range 모드에서 selectedDatetime 업데이트 (캘린더 반영을 위해)
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
        
        // range 모드에서 selectedDatetime 업데이트 (캘린더 반영을 위해)
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
        
        // range 모드에서도 selectedDatetime 업데이트 (캘린더 반영을 위해)
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
        
        // range 모드에서도 selectedDatetime 업데이트 (캘린더 반영을 위해)
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


  private handleBlur(mode: 'start' | 'end', e: any) {
    this.isInputting = false;
    
    const input = e.target as HTMLInputElement;
    const currentValue = input.value.trim();
    
    // 디바운스 타이머 클리어
    if (this.inputDebounceTimer) {
      clearTimeout(this.inputDebounceTimer);
      this.inputDebounceTimer = null;
    }
    
    // 빈 값인 경우 허용
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
    
    // 유효한 입력값인지 확인
    if (this.isValidInput(currentValue)) {
      // 유효한 값인 경우 내부 상태 업데이트 및 마지막 유효한 값으로 저장
      if (mode === 'start') {
        this.startResult = currentValue;
        this.lastValidStartResult = currentValue;
      } else {
        this.endResult = currentValue;
        this.lastValidEndResult = currentValue;
      }
      
      // 유효한 입력값으로 내부 상태 업데이트
      this.processValidInput(mode, currentValue);
    } else {
      // 잘못된 입력값인 경우 이전 유효한 값으로 복원 (기존 로직 유지)
      const lastValidValue = mode === 'start' ? this.lastValidStartResult : this.lastValidEndResult;
      
      // 이전 유효한 값이 없으면 빈 값으로 설정
      const valueToRestore = lastValidValue || '';
      input.value = valueToRestore;
      
      if (mode === 'start') {
        this.startResult = valueToRestore;
      } else {
        this.endResult = valueToRestore;
      }
      
      // 복원된 값으로 내부 상태 업데이트
      if (valueToRestore) {
        this.processValidInput(mode, valueToRestore);
      } else {
        // 빈 값으로 복원된 경우 상태 초기화
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

  private isCompleteAndValid(value: string): boolean {
    if (!value.trim()) return true; // 빈 값은 허용
    
    // 완전하고 유효한 입력인지 확인 (부분 입력은 허용하지 않음)
    if (this.variant === 'time') {
      return /^\d{2}:\d{2}:\d{2}$/.test(value) && this.isValidTimeFormat(value);
    } else if (this.variant === 'date') {
      return this.isValidDateFormat(value);
    } else if (this.variant === 'datetime') {
      return this.isValidDateTimeFormat(value);
    }
    
    return false;
  }

  // 기존의 validateDateTimeInput 메서드를 isValidInput으로 대체
  private validateDateTimeInput(value: string): boolean {
    return this.isValidInput(value);
  }

  // 기존의 validateTimeInput 메서드를 isValidTimeFormat으로 대체  
  private validateTimeInput(value: string): boolean {
    return this.isValidTimeFormat(value);
  }

  private activeStartCalendar(e: Event) {
    if(this.readonly) { return ; }

    this.active = 'start';
    this.selectionMode = 'start';

    if (!this.showCalendar) {
      this.showCalendar = true;
      this.openCalendar();
    } else {
      // [핵심 수정 1] 캘린더가 이미 열려있을 때도 상태 동기화를 위해
      // updateSelectedDatetimeFromInput를 명시적으로 호출합니다.
      this.updateSelectedDatetimeFromInput();
      this.renderPopup();
    }
  }
  
  private activeEndCalendar(e: Event) {
    if(this.readonly) { return ; }
    
    this.active = 'end';
    this.selectionMode = 'end';

    if (!this.showCalendar) {
      this.showCalendar = true;
      this.openCalendar();
    } else {
      // [핵심 수정 2] 캘린더가 이미 열려있을 때도 상태 동기화를 위해
      // updateSelectedDatetimeFromInput를 명시적으로 호출합니다.
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
      // [핵심 수정 3] 버그의 근원인 input 문자열 파싱 로직을 완전히 제거하고,
      // 신뢰할 수 있는 내부 상태(rangestart, rangeend)만을 사용합니다.
      if (this.active === 'start') {
        // start가 활성화되면, rangestart 값을 기준으로 달력을 보여줍니다.
        // rangestart가 없으면 rangeend 값을 기준으로 보여줍니다.
        baseDateSource = this.rangestart || this.rangeend;
      } else if (this.active === 'end') {
        // end가 활성화되면, rangeend 값을 기준으로 달력을 보여줍니다.
        // rangeend가 없으면 rangestart 값을 기준으로 보여줍니다.
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
        // 아무 값도 없는 초기 상태면 오늘 날짜를 기준으로 합니다.
        this.selectedDatetime = {
          year: now.getFullYear(),
          month: now.getMonth(),
          day: now.getDate(),
          hour: 0, minute: 0, second: 0
        };
      }
    } else {
      // range가 아닐 때의 로직은 기존대로 유지합니다.
      if (this.startResult) {
        const parsed = this.parseInputValue(this.startResult);
        if (parsed) {
          this.selectedDatetime = parsed;
        }
      } else {
        this.selectedDatetime = { year: undefined, month: undefined, day: undefined, hour: undefined, minute: undefined, second: undefined };
      }
    }

    // 상태 변경 후 UI 업데이트를 요청합니다.
    this.requestUpdate();
  }

  private openCalendar() {
    this._isEditingRange = !!(this.rangestart && this.rangeend);
    
    // 캘린더 렌더링을 위해 항상 updateSelectedDatetimeFromInput를 호출하여
    // input 값에 기반한 현재 상태를 먼저 설정합니다.
    this.updateSelectedDatetimeFromInput();
    
    // 그 다음 팝업을 렌더링합니다.
    this.renderPopup();
    
    // 이벤트 리스너 등록
    window.addEventListener('resize', this.handleViewportChange.bind(this));
    window.addEventListener('scroll', this.handleViewportChange.bind(this), true);
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
  
    // [핵심] 캘린더가 이미 열려 있는 경우 (popupContainer가 존재)
    if (this.popupContainer && document.body.contains(this.popupContainer)) {
      // format 속성 동기화
      this.popupContainer.format = this.format;
      
      if (this.variant === 'range') {
        // 현재 active 상태를 popupContainer(sy-calendar)의 active 속성에 할당
        this.popupContainer.active = this.active; 
        
        // 나머지 속성들도 동기화
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
      
      // 속성 변경 후, 자식 컴포넌트의 렌더링을 트리거
      this.popupContainer.requestUpdate();
      this.updatePopupPosition();
      return;
    }
  
    // 새 팝업 생성 로직 (기존 코드와 동일)
    const calendar = document.createElement('sy-calendar');
    calendar.style.visibility = 'hidden';
    
    calendar.mondayStart = this.mondayStart;
    calendar.hideWeekend = this.hideWeekend;
    calendar.variant = this.variant;
    calendar.mode = this.mode;
    calendar.dateNames = this.dateNames;
    calendar.format = this.format; // format 프로퍼티 전달
  
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
    
    this.popupContainer.updateComplete.then(() => {
      this.syncPopupState(); 
      requestAnimationFrame(() => {
        this.updatePopupPosition();
        this.popupContainer.style.visibility = 'visible';
      });
    }).catch(() => {
      setTimeout(() => {
        this.syncPopupState();
        requestAnimationFrame(() => {
          this.updatePopupPosition();
          this.popupContainer.style.visibility = 'visible';
        });
      }, 50);
    });
  }

  private async syncPopupState() {
    if (!this.popupContainer) return;

    // range 모드인 경우
    if (this.variant === 'range') {
      this.popupContainer.setAttribute('active', this.selectionMode || 'start');
      
      // 현재 활성화된 input에 따라 캘린더의 선택된 날짜 설정
      let selectedDate = null;
      
      // 사용자가 직접 입력한 값을 우선적으로 반영
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
      
      // selectedDatetime이 있으면 우선적으로 사용 (사용자가 직접 입력한 값 반영)
      if (this.selectedDatetime && this.selectedDatetime.year !== undefined) {
        selectedDate = this.selectedDatetime;
      }
      
      if (selectedDate) {
        this.popupContainer.selectedDatetime = selectedDate;
        // 캘린더 년/월 표시도 업데이트
        if (selectedDate.year !== undefined) {
          this.popupContainer.year = selectedDate.year;
        }
        if (selectedDate.month !== undefined) {
          this.popupContainer.month = selectedDate.month + 1; // month는 0-based이므로 +1
        }
        if (selectedDate.day !== undefined) {
          this.popupContainer.day = selectedDate.day;
        }
      }

    } else {
      // 일반 모드에서 selectedDatetime을 popupContainer에 전달
      if (this.selectedDatetime && this.selectedDatetime.day !== undefined) {
        this.popupContainer.selectedDatetime = this.selectedDatetime;
      } else {
        this.popupContainer.selectedDatetime = undefined;
      }
    }

    // 상태 업데이트를 기다림
    this.popupContainer.requestUpdate();
    await this.popupContainer.updateComplete;
  }

  private updateCalendarIfOpen() {
    if (this.showCalendar && this.popupContainer) {
      // 캘린더 속성을 실제로 업데이트하기 위해 renderPopup() 호출
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
        // 1. 새 시작 날짜를 설정합니다.
        this.rangestart = selectedDate;
        this.startResult = this.formatDisplayDate(year, month + 1, day);

        // 2. 기존 종료 날짜가 있고, 범위가 역전되었다면
        if (this.rangeend) {
          const endDateObj = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);
          if (selectedDateObj > endDateObj) {
            // 3. 기존 종료 날짜를 초기화합니다.
            this.rangeend = undefined;
            this.endResult = '';
          }
        }
        
        // 4. 다음 선택은 종료 날짜가 되도록 모드를 변경합니다.
        this.selectionMode = 'end';
        this.active = 'end';

        // 5. 종료 날짜 input으로 포커스를 이동합니다. (단, 두 값이 모두 선택되지 않은 경우에만)
        if (!this.rangeend) {
          setTimeout(() => {
            const endInputComponent = this.shadowRoot?.querySelector('sy-input.endContent') as any;
            if (endInputComponent) {
              endInputComponent.focus();
            }
          }, 0);
        }

      } else { // selectionMode === 'end'
        // 1. 새 종료 날짜를 설정합니다.
        this.rangeend = selectedDate;
        this.endResult = this.formatDisplayDate(year, month + 1, day);

        // 2. 기존 시작 날짜가 있고, 범위가 역전되었다면
        if (this.rangestart) {
          const startDateObj = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
          if (selectedDateObj < startDateObj) {
            // 3. 기존 시작 날짜를 초기화합니다.
            this.rangestart = undefined;
            this.startResult = '';
          }
        }
        
        // 4. 다음 선택은 시작 날짜가 되도록 모드를 변경합니다.
        this.selectionMode = 'start';
        this.active = 'start';

        // 5. 시작 날짜 input으로 포커스를 이동합니다. (단, 두 값이 모두 선택되지 않은 경우에만)
        if (!this.rangestart) {
          setTimeout(() => {
            const startInputComponent = this.shadowRoot?.querySelector('sy-input.startContent') as any;
            if (startInputComponent) {
              startInputComponent.focus();
            }
          }, 0);
        }
      }

      // 시작과 종료 날짜가 모두 선택되었다면 캘린더를 닫습니다.
      if (this.rangestart && this.rangeend) {
          this.updateInputFocusState();
          this.toggleCalendar();
      } else {
        // 그렇지 않으면 캘린더를 다시 렌더링하여 변경된 상태(ex: 초기화된 날짜)를 시각적으로 반영합니다.
        this.renderPopup();
      }

      this.dispatchEvent(new CustomEvent('selected', { detail: { rangestart: this.rangestart, rangeend: this.rangeend }, bubbles: true, composed: true }));

    } else {
      this.year = String(year);
      this.month = String(month + 1);
      this.day = String(day);
      this.hour = String(hour);
      this.minute = String(minute);
      this.second = String(second);
      this.selectedDatetime = { year, month, day, hour, minute, second };
      
      // time variant일 때만 시간 형식으로 표시
      if (this.variant === 'time') {
        // 시간만 표시하고 날짜는 내부적으로만 저장
        this.startResult = this.formatDisplayDate(year, month + 1, day, hour, minute, second);
      } else {
        this.showResult(year, month, day, hour, minute, second);
      }
      
      this.dispatchEvent(new CustomEvent('selected', { detail: { year, month, day, hour, minute, second }, bubbles: true, composed: true }));

      if (closable !== false) { 
        this.toggleCalendar();
      }
    }
  }

  private formatDisplayDate(year: number, month: number, day: number, hour?: number, minute?: number, second?: number): string {
    if (year === undefined || month === undefined || day === undefined) return '';
    
    // time variant의 경우 시간만 포매팅
    if (this.variant === 'time') {
      const h = hour ?? 0;
      const m = minute ?? 0;
      const s = second ?? 0;
      
      // format에 따라 시간 포매팅
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
        // Parse time based on current format
        const timeMatch = value.match(/^(\d{2}):(\d{2}):(\d{2})$/);
        if (timeMatch) {
          const now = new Date();
          const timeParts = [parseInt(timeMatch[1]), parseInt(timeMatch[2]), parseInt(timeMatch[3])];
          let hour: number, minute: number, second: number;
          
          // Determine the format order
          const timeFormat = this.format.includes(':') ? this.format : 'hh:mm:ss';
          
          if (timeFormat.startsWith('ss:mm:hh')) {
            // ss:mm:hh format - reverse order
            [second, minute, hour] = timeParts;
          } else if (timeFormat.startsWith('mm:ss:hh')) {
            // mm:ss:hh format
            [minute, second, hour] = timeParts;
          } else if (timeFormat.startsWith('hh:ss:mm')) {
            // hh:ss:mm format
            [hour, second, minute] = timeParts;
          } else {
            // Default hh:mm:ss format
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
        // Parse datetime based on current format
        if (!value.includes(' ')) return null; // Space is mandatory for datetime
        
        const [datePart, timePart] = value.split(' ');
        if (!datePart || !timePart) return null;
        
        // Parse date part
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
        
        // Parse time part based on time format
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
          month: month - 1, // month는 0-based index
          day: day,
          hour: hour,
          minute: minute,
          second: second
        };
      } else {
        // date 형식: yyyy-MM-dd 또는 다른 형식들
        const dateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (dateMatch) {
          const result = {
            year: parseInt(dateMatch[1]),
            month: parseInt(dateMatch[2]) - 1, // month는 0-based index
            day: parseInt(dateMatch[3]),
            hour: 0,
            minute: 0,
            second: 0
          };
          return result;
        }
        
        // 다른 형식도 시도해보기
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
    
    console.warn('Failed to parse value:', value);
    return null;
  }
  
  private updatePopupPosition() {
    if (!this.popupContainer) return;
    
    const inputRect = this.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    // 팝업의 예상 크기 (calendar 컴포넌트의 일반적인 크기)
    // 실제 측정이 어려우므로 예상값 사용
    const estimatedPopupHeight = 320; // calendar의 대략적인 높이
    const estimatedPopupWidth = 280;  // calendar의 대략적인 너비
    
    // 초기 공간 확인
    const spaceBelow = viewportHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;
  
    // 팝업 스타일 초기화
    this.popupContainer.style.position = 'absolute';
    this.popupContainer.style.zIndex = '9999';
    this.popupContainer.style.visibility = 'hidden';
    this.popupContainer.style.display = 'block';
    this.popupContainer.style.maxHeight = 'none';
    this.popupContainer.style.overflowY = 'visible';
    
    // 세로 위치 결정
    let shouldShowAbove = false;
    
    if (spaceBelow >= estimatedPopupHeight) {
      // 아래쪽에 충분한 공간이 있음
      shouldShowAbove = false;
    } else if (spaceAbove >= estimatedPopupHeight) {
      // 위쪽에 충분한 공간이 있음
      shouldShowAbove = true;
    } else {
      // 양쪽 모두 공간이 부족하면 더 넓은 쪽을 선택
      shouldShowAbove = spaceAbove > spaceBelow;
    }
    
    // 실제 팝업 크기 측정 (DOM에 추가된 후)
    const popupRect = this.popupContainer.getBoundingClientRect();
    let actualPopupHeight = popupRect.height || estimatedPopupHeight;
    let actualPopupWidth = popupRect.width || estimatedPopupWidth;
    
    // 만약 측정된 크기가 너무 작다면 (아직 렌더링이 완료되지 않음) 추정값 사용
    if (actualPopupHeight < 50) {
      actualPopupHeight = estimatedPopupHeight;
    }
    if (actualPopupWidth < 50) {
      actualPopupWidth = estimatedPopupWidth;
    }
    
    // 실제 크기로 다시 공간 확인
    if (shouldShowAbove) {
      if (spaceAbove < actualPopupHeight) {
        // 위쪽 공간이 부족하면 스크롤 설정
        this.popupContainer.style.maxHeight = `${Math.max(200, spaceAbove - 10)}px`;
        this.popupContainer.style.overflowY = 'auto';
      }
    } else {
      if (spaceBelow < actualPopupHeight) {
        // 아래쪽 공간이 부족하면 스크롤 설정
        this.popupContainer.style.maxHeight = `${Math.max(200, spaceBelow - 10)}px`;
        this.popupContainer.style.overflowY = 'auto';
      }
    }
    
    // 세로 위치 설정
    let top;
    if (shouldShowAbove) {
      // 위쪽에 표시할 때: input의 위쪽에서 팝업 높이만큼 위로
      // maxHeight가 설정되어 있으면 그 값을, 아니면 실제 높이를 사용
      const popupHeight = (this.popupContainer.style.maxHeight && 
                          this.popupContainer.style.maxHeight !== 'none') ? 
        parseInt(this.popupContainer.style.maxHeight) : actualPopupHeight;
      top = inputRect.top + scrollY - popupHeight;
    } else {
      // 아래쪽에 표시할 때: input 바로 아래
      top = inputRect.bottom + scrollY;
    }
    
    // 가로 위치 계산
    let left = inputRect.left + scrollX;
    
    // 오른쪽 경계 확인
    if (left + actualPopupWidth > viewportWidth + scrollX - 10) {
      left = viewportWidth + scrollX - actualPopupWidth - 10;
    }
    
    // 왼쪽 경계 확인
    if (left < scrollX + 10) {
      left = scrollX + 10;
    }
    
    // 최종 위치 설정
    this.popupContainer.style.top = `${Math.max(0, top)}px`;
    this.popupContainer.style.left = `${Math.max(0, left)}px`;
    this.popupContainer.style.visibility = 'visible';
  }

  private closePopup() {
    if (this.popupContainer) {
      this.popupContainer.remove();
      this.popupContainer = undefined;
    } else {
      // console.log('No popup container to remove');
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

  private handleOutsideClick(e: Event) {
    if (this.contains(e.target as Node) || (this.popupContainer && this.popupContainer.contains(e.target as Node))) {
      return;
    }

    // [핵심 수정] 외부 클릭 시, 한 쪽 값만 있으면 반대쪽 값을 자동으로 채워주는 로직
    if (this.variant === 'range') {
      const isStartValid = this.rangestart && this.rangestart.year !== undefined;
      const isEndValid = this.rangeend && this.rangeend.year !== undefined;
      
      // 시작일만 있고 종료일이 없을 때
      if (isStartValid && !isEndValid) {
        const startDate = new Date(this.rangestart!.year, this.rangestart!.month, this.rangestart!.day);
        startDate.setDate(startDate.getDate() + 1);
        
        this.rangeend = {
          year: startDate.getFullYear(),
          month: startDate.getMonth(),
          day: startDate.getDate(),
        };
        this.endResult = this.formatDisplayDate(this.rangeend.year, this.rangeend.month + 1, this.rangeend.day);
      } 
      // 종료일만 있고 시작일이 없을 때
      else if (!isStartValid && isEndValid) {
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

  // =======================================================
  // Form validation
  // =======================================================
  public getStatus() { return this.isValid ? '' : this.validStatus; }
  public setCustomError() { this.customSettingError(); }
  public clearCustomError() {
    if(!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }
  get validity() { 
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return {
        badInput: false, customError: this.validStatus === 'custom', patternMismatch: false, rangeOverflow: false, rangeUnderflow: false, stepMismatch: false, tooLong: false, tooShort: false, typeMismatch: false, valid: false, valueMissing: this.validStatus === 'valueMissing'
      };
    }
    return this.internals.validity; 
  }
  get validationMessage() {     
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return this.getErrorMessage(this.validStatus);
    }
    return this.internals.validationMessage; 
  }
  get willValidate() { return this.internals.willValidate; }

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
  }

  private handleInvalid = (e: Event) => {
    const hasErrorSlot = !!this.querySelector('[slot="error"]');
    if (hasErrorSlot) {
      const errorSlotElement = this.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim();
      if (hasContent) {
        this.hasSlotErrorMessage = true;
        this.setAttribute('has-custom-error', '');
        e.preventDefault();
        e.stopPropagation();
        const inputElement = this.shadowRoot?.querySelector('sy-input') as any;
        if (inputElement) {
          inputElement.setCustomValidity?.("");
        }
        this.internals.setValidity({ customError: true }, " ");
      } else {
        this.hasSlotErrorMessage = false;
        this.removeAttribute('has-custom-error');
      }
    } else {
      this.hasSlotErrorMessage = false;
      this.removeAttribute('has-custom-error');
      setTimeout(() => {
        if (!this.isValid) {
          const inputElement = this.shadowRoot?.querySelector('sy-input') as any;
          if (inputElement && inputElement.reportValidity) {
            inputElement.reportValidity();
          }
        }
      }, 0);
    }
    this.isValid = false;
  };

  private extractSeparators(): { dateSeparator: string; timeSeparator: string } {
    const format = this.format || 'yyyy-MM-dd hh:mm:ss';
    
    // Extract date format part
    const dateFormat = format.split(' ')[0];
    const timeFormat = format.split(' ')[1] || (this.variant === 'time' ? format : 'hh:mm:ss');
    
    // Extract date separator
    let dateSeparator = '-'; // 기본 구분자
    if (dateFormat.includes('/')) {
      dateSeparator = '/';
    } else if (dateFormat.includes('.')) {
      dateSeparator = '.';
    }
    
    // Extract time separator
    let timeSeparator = ':'; // 기본 구분자
    if (timeFormat.includes('/')) {
      timeSeparator = '/';
    } else if (timeFormat.includes('.')) {
      timeSeparator = '.';
    }
    
    return { dateSeparator, timeSeparator };
  }

  private handleCustomErrorSlot() {
    const errorSlot = this.renderRoot?.querySelector('slot[name="error"]') as HTMLSlotElement;
    const lightDomSlot = this.querySelector('[slot="error"]');
    if (!errorSlot || !lightDomSlot) {
      this.hasSlotErrorMessage = false;
      this.hasPopupErrorComponent = false;
      this.removeAttribute('has-custom-error');
      return;
    }
    const errorNodes = errorSlot.assignedNodes();
    this.hasPopupErrorComponent = errorNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName?.toLowerCase() || '';
        if (['sy-tooltip', 'sy-popover', 'sy-popconfirm', 'sy-inline-message'].includes(tagName)) {
          return true;
        }
        return !!element.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
      }
      return false;
    });
    this.hasSlotErrorMessage = errorNodes.some(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        return !!(element.textContent?.trim() || element.children.length > 0);
      }
      return false;
    });
    if (this.hasSlotErrorMessage) {
      this.setAttribute('has-custom-error', '');
    } else {
      this.removeAttribute('has-custom-error');
    }
    this.requestUpdate();
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "This field is required",
      custom: 'Invalid by custom'
    }
    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    const inputElement = this.shadowRoot?.querySelector('sy-input') as any;
    if (inputElement) {
      inputElement.setCustomValidity?.("");
    }
    this.internals.setValidity({ customError: true }, " ");
    this.requestUpdate();
  }
}