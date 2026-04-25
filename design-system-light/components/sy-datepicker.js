import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$9 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$8 } from './p-CE4Ye5an.js';
import { d as defineCustomElement$7 } from './p-H6hwOjjT.js';
import { d as defineCustomElement$6 } from './p-Dz-3bzTq.js';
import { d as defineCustomElement$5 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$4 } from './p-BYla455P.js';
import { d as defineCustomElement$3 } from './p-Bqmvhiz7.js';
import { d as defineCustomElement$2 } from './p-D83RAFCG.js';

const syDatepickerCss = "@charset \"UTF-8\";.sc-sy-datepicker-h{display:inline-block}.sc-sy-datepicker-h .container.sc-sy-datepicker{display:flex;flex-direction:column;align-items:flex-start}.sc-sy-datepicker-h .container.sc-sy-datepicker .input-group.sc-sy-datepicker{display:flex;position:relative;gap:var(--spacing-3xsmall)}.sc-sy-datepicker-h .container.sc-sy-datepicker .input-group.sc-sy-datepicker sy-icon.sc-sy-datepicker{color:var(--date-time-picker-calendar-container-header-icon-enabled)}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker{height:32px;display:flex;box-sizing:border-box}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.sc-sy-datepicker{border:var(--border-small) var(--input-form-field-border-enabled);background-color:var(--input-form-field-background-enabled);border-radius:var(--border-radius-medium);height:32px;display:flex;box-sizing:border-box;gap:initial}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.sc-sy-datepicker:hover{color:var(--input-form-field-text-hover);border:var(--border-small) var(--input-form-field-border-hover);background-color:var(--input-form-field-background-hover)}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.input--focused.sc-sy-datepicker{border:var(--border-small) var(--focus-outline);outline:var(--border-small) var(--focus-outline)}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.datepicker--invalid.sc-sy-datepicker,.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.datepicker--invalid.sc-sy-datepicker:hover,.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.datepicker--invalid.input--focused.sc-sy-datepicker{border:var(--border-small) var(--input-form-field-border-error) !important}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.focus-start.sc-sy-datepicker{position:relative}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.focus-start.sc-sy-datepicker:after{content:\"\";display:flex;position:absolute;border-bottom:2px solid var(--focus-outline);bottom:0px;left:7px;width:80px;height:12px;transition:all var(--ease-in-out) var(--normal-duration)}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.focus-end.sc-sy-datepicker{position:relative}.sc-sy-datepicker-h .range-visible.sc-sy-datepicker .input-group.focus-end.sc-sy-datepicker:after{content:\"\";display:flex;position:absolute;border-bottom:2px solid var(--focus-outline);bottom:0px;left:134px;width:80px;height:5px;transition:all var(--ease-in-out) var(--normal-duration)}.sc-sy-datepicker-h .date-input.sc-sy-datepicker{flex-grow:1;width:200px;border:none;outline:none}.sc-sy-datepicker-h button.sc-sy-datepicker{margin-left:-20px}.sc-sy-datepicker-h .error-container.sc-sy-datepicker{width:100%;color:var(--required);font-size:0.85rem;margin-top:4px;box-sizing:border-box;display:none}.sc-sy-datepicker-h .visible-error.sc-sy-datepicker{display:block}.sc-sy-datepicker-h .popup-error-container.sc-sy-datepicker{position:relative;margin-top:0;pointer-events:none}sy-datepicker[variant=range][disabled].sc-sy-datepicker-h .input-group.sc-sy-datepicker{background-color:var(--date-time-picker-input-field-background-disabled);border:var(--border-small) var(--date-time-picker-input-field-border-disabled);color:var(--date-time-picker-input-field-text-disabled)}sy-datepicker[variant=range][disabled].sc-sy-datepicker-h .input-group.sc-sy-datepicker:hover{border:var(--border-small) var(--date-time-picker-input-field-border-disabled)}sy-datepicker[variant=range][readonly].sc-sy-datepicker-h .input-group.sc-sy-datepicker{background-color:var(--date-time-picker-input-field-background-readonly);border:var(--border-small) var(--date-time-picker-input-field-border-readonly);color:var(--date-time-picker-input-field-text-readonly)}sy-datepicker[variant=range][readonly].sc-sy-datepicker-h .input-group.sc-sy-datepicker:hover{border:var(--border-small) var(--date-time-picker-input-field-border-readonly)}sy-datepicker[variant=range].sc-sy-datepicker-h sy-input.sc-sy-datepicker{display:flex;align-items:center;width:125px}sy-datepicker[mode=day].sc-sy-datepicker-h sy-input.sc-sy-datepicker,sy-datepicker[mode=month].sc-sy-datepicker-h sy-input.sc-sy-datepicker,sy-datepicker[mode=year].sc-sy-datepicker-h sy-input.sc-sy-datepicker{width:125px}sy-datepicker[variant=datetime].sc-sy-datepicker-h sy-input.sc-sy-datepicker,sy-datepicker[variant=time].sc-sy-datepicker-h sy-input.sc-sy-datepicker{width:190px}";

const SyDatePicker = /*@__PURE__*/ proxyCustomElement(class SyDatePicker extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.selected = createEvent(this, "selected");
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    mode = 'day';
    variant = 'date';
    disabled = false;
    readonly = false;
    required = false;
    year;
    month;
    day;
    hour;
    minute;
    second;
    dateNames = 'Su,Mo,Tu,We,Th,Fr,Sa';
    mondayStart = false;
    hideWeekend = false;
    placeholder = '';
    format = 'yyyy-MM-dd hh:mm:ss';
    name = '';
    noNativeValidity = false;
    changed;
    selected;
    displayPlaceholder = this.placeholder;
    touched = false;
    startTouched = false;
    endTouched = false;
    formSubmitted = false;
    rangestart = undefined;
    rangeend = undefined;
    showCalendar = false;
    startResult = '';
    endResult = '';
    active = '';
    selectedDatetime;
    _isEditingRange = false;
    isValid = true;
    validStatus = "";
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    lastValidStartResult = '';
    lastValidEndResult = '';
    isInputting = false;
    lastInputTime = 0;
    initialStartResult = '';
    initialEndResult = '';
    inputDebounceTimer = null;
    isInputFocused = false;
    popupContainer;
    isDateSelecting = false; // 날짜 선택 중인지 표시
    watchResultChanges() {
        this.updateValidityState();
    }
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
            this.showResult(year, month, day, hour ?? 0, minute ?? 0, second ?? 0);
        }
    }
    watchFormat(newVal) {
        if (!newVal?.trim()) {
            this.format = 'yyyy-MM-dd hh:mm:ss';
        }
        else {
            this.format = newVal.trim();
        }
        this.setPlaceholder();
        if (this.startResult && this.variant !== 'range') {
            if (this.variant === 'time') {
                if (this.validateTimeInput(this.startResult)) {
                    setTimeout(() => {
                        const inputElement = this.host.querySelector('sy-input.startContent');
                        if (inputElement) {
                            inputElement.value = this.startResult;
                        }
                    }, 0);
                }
            }
            else {
                const parsed = this.parseInputValue(this.startResult);
                if (parsed) {
                    const { year, month, day, hour, minute, second } = parsed;
                    this.startResult = this.formatDisplayDate(year, month + 1, day, hour, minute, second);
                    setTimeout(() => {
                        const inputElement = this.host.querySelector('sy-input.startContent');
                        if (inputElement) {
                            inputElement.value = this.startResult;
                        }
                    }, 0);
                }
            }
        }
    }
    watchPlaceholder() {
        this.setPlaceholder();
    }
    watchVariant() {
        // Clear any previously selected dates when the variant changes (e.g. date → range
        // or range → date). Carrying them over produces stale state that no longer matches
        // the new variant's expectations (e.g. range endpoints with no in-between).
        this.startResult = '';
        this.endResult = '';
        this.rangestart = undefined;
        this.rangeend = undefined;
        this.selectedDatetime = {
            year: undefined,
            month: undefined,
            day: undefined,
            hour: undefined,
            minute: undefined,
            second: undefined,
        };
        this.lastValidStartResult = '';
        this.lastValidEndResult = '';
        this.touched = false;
        this.startTouched = false;
        this.endTouched = false;
        this.formSubmitted = false;
        this.active = '';
        this.setPlaceholder();
        this.updateValidityState();
    }
    handleInvalidEvent(e) {
        this.formSubmitted = true;
        const errorSlotElement = this.host.querySelector('[slot="error"]');
        const slotHasContent = !!errorSlotElement && (errorSlotElement.textContent?.trim().length ?? 0) > 0;
        // Clear-cut toggle — consistent across every form-associated SAIDA control:
        //   noNativeValidity=true  → native popup suppressed, slot = UI
        //   noNativeValidity=false → browser shows native popup. DO NOT call
        //     preventDefault — per HTML spec, one preventDefaulted invalid event
        //     suppresses popups on every form control in the form.
        if (this.noNativeValidity) {
            e.preventDefault();
            e.stopPropagation();
            this.hasSlotErrorMessage = slotHasContent;
            if (slotHasContent) {
                this.internals?.setValidity({ customError: true }, ' ');
            }
        }
        else {
            this.hasSlotErrorMessage = false;
        }
        this.updateValidityState();
    }
    connectedCallback() {
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
        // Touch members to avoid TypeScript "declared but its value is never read"
        // warnings for fields that are used indirectly (e.g., via event handlers
        // or template bindings) or only assigned at runtime.
        this._markUsedMembers();
    }
    // No-op reader for intentionally kept state fields to satisfy the
    // `noUnusedLocals` compiler option without changing runtime behavior.
    _markUsedMembers() {
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick, true);
        this.host.removeEventListener('keydown', this.handleKeyDown);
        this.closeCalendar();
        this.removeFormSubmitListener();
    }
    formResetCallback() {
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
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    formStateRestoreCallback(state) {
        try {
            if (this.variant === 'range') {
                const parsed = JSON.parse(state);
                this.startResult = parsed.start || '';
                this.endResult = parsed.end || '';
            }
            else {
                this.startResult = state;
            }
            this.updateValidityState();
        }
        catch (e) {
            console.warn('Failed to restore form state:', e);
        }
    }
    get validity() {
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
            };
        }
        return this.internals?.validity;
    }
    get validationMessage() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return this.getErrorMessage(this.validStatus);
        }
        return this.internals?.validationMessage;
    }
    get willValidate() {
        return this.internals?.willValidate;
    }
    handleKeyDown = (e) => {
        if (this.variant !== 'range')
            return;
        if (e.key === 'Tab') {
            const activeElement = this.host.shadowRoot?.activeElement;
            const startInput = this.host.querySelector('sy-input.startContent');
            const endInput = this.host.querySelector('sy-input.endContent');
            if (e.shiftKey) {
                if (activeElement === endInput || this.active === 'end') {
                    e.preventDefault();
                    this.active = 'start';
                    startInput?.focus();
                }
            }
            else {
                if (activeElement === startInput || this.active === 'start') {
                    e.preventDefault();
                    this.active = 'end';
                    endInput?.focus();
                }
            }
            if (this.showCalendar) {
                this.renderPopup();
            }
        }
    };
    setupFormSubmitListener() {
        const form = this.host.closest('form');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit);
        }
    }
    removeFormSubmitListener() {
        const form = this.host.closest('form');
        if (form) {
            form.removeEventListener('submit', this.handleFormSubmit);
        }
    }
    handleFormSubmit = () => {
        this.formSubmitted = true;
        this.updateValidityState();
    };
    render() {
        // Visual invalid gate: show red borders only after the user has touched the field
        // or submitted the form (matches sy-input / sy-checkbox / sy-autocomplete convention).
        const showInvalid = (this.touched || this.formSubmitted) && !this.isValid;
        // Propagate invalid state to the inner sy-input so its own SCSS paints the red border
        // via its `status="error"` path — this covers non-range variants where the datepicker
        // does not draw its own wrapper border.
        const inputStatus = showInvalid ? 'error' : 'default';
        const inputGroupClass = {
            'input-group': true,
            'input--focused': this.isInputFocused,
            'focus-start': this.isInputFocused && this.active === 'start',
            'focus-end': this.isInputFocused && this.active === 'end',
            'datepicker--invalid': showInvalid,
        };
        const containerClass = {
            "container": true,
            "range-visible": this.variant === 'range',
            "range-hidden": this.variant !== 'range',
            'datepicker--invalid': showInvalid,
        };
        const errorContainerClass = {
            'error-container': true,
            'popup-error-container': this.hasPopupErrorComponent,
            'text-error-container': !this.hasPopupErrorComponent,
            'visible-error': showInvalid,
        };
        return (h("div", { key: '9df93c3ac823cdd18cb6c229fc495626ed29bf0d', class: containerClass }, h("div", { key: 'd4582e6c82f4e1df76b2ae08c8760bd095f2b516', class: inputGroupClass }, h("sy-input", { key: 'd6c38957b22069febe09b53bc536c0235dc5c926', class: "startContent", placeholder: this.variant === 'range' ? 'Start date' : this.displayPlaceholder, clearable: true, disabled: this.disabled, readonly: this.readonly, borderless: this.variant === 'range', status: inputStatus, value: this.startResult, onFocused: this.handleStartFocused, onBlured: (e) => this.handleBlur('start', e), onChanged: (e) => this.handleInput('start', e), onMouseDown: this.activeStartCalendar }, this.variant === 'range' ?
            h("sy-icon", { slot: "suffix", size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M569 337C578.4 327.6 578.4 312.4 569 303.1L401 135C391.6 125.6 376.4 125.6 367.1 135C357.8 144.4 357.7 159.6 367.1 168.9L494.1 295.9L88 295.9C74.7 295.9 64 306.6 64 319.9C64 333.2 74.7 343.9 88 343.9L494.1 343.9L367.1 470.9C357.7 480.3 357.7 495.5 367.1 504.8C376.5 514.1 391.7 514.2 401 504.8L569 337z" })))
            : h("sy-icon", { slot: "suffix", size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" })))), this.variant === 'range' ? (h("sy-input", { class: "endContent", placeholder: "End date", clearable: true, disabled: this.disabled, readonly: this.readonly, borderless: true, status: inputStatus, value: this.endResult, onFocused: this.handleEndFocused, onBlured: (e) => this.handleBlur('end', e), onChanged: (e) => this.handleInput('end', e), onMouseDown: this.activeEndCalendar }, h("sy-icon", { slot: "suffix", size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" }))))) : null), h("div", { key: '880d5436e6f9ecc220f897cc3c6a92366307f140', class: errorContainerClass }, h("slot", { key: '3adf2bdf18044a334a342229775d2572376319db', name: "error", onSlotchange: this.handleCustomErrorSlot }))));
    }
    setPlaceholder() {
        if (!this.placeholder?.trim()) {
            if (this.variant === 'datetime') {
                this.displayPlaceholder = this.format;
            }
            else if (this.variant === 'time') {
                const timeFormat = this.format.includes(':') ? this.format : 'hh:mm:ss';
                this.displayPlaceholder = timeFormat.includes(' ') ? timeFormat.split(' ').pop()?.trim() || 'hh:mm:ss' : timeFormat;
            }
            else {
                const dateFormat = this.format.split(' ')[0];
                this.displayPlaceholder = dateFormat || 'yyyy-MM-dd';
            }
        }
        else {
            this.displayPlaceholder = this.placeholder;
        }
    }
    handleStartFocused = () => {
        this.lastValidStartResult = this.startResult;
        this.startTouched = true;
        this.isInputFocused = true;
        if (this.readonly) {
            return;
        }
        if (this.variant === 'range') {
            this.active = 'start';
            if (this.showCalendar) {
                this.updateSelectedDatetimeFromInput();
                this.renderPopup();
            }
        }
        if (this.variant !== 'range') {
            this.touched = true;
        }
        else {
            if (this.endTouched)
                this.touched = true;
        }
    };
    handleEndFocused = () => {
        this.lastValidEndResult = this.endResult;
        this.endTouched = true;
        this.isInputFocused = true;
        if (this.readonly) {
            return;
        }
        if (this.variant === 'range') {
            this.active = 'end';
            if (this.showCalendar) {
                this.updateSelectedDatetimeFromInput();
                this.renderPopup();
            }
        }
        if (this.startTouched)
            this.touched = true;
    };
    tryParseNumericInput(value) {
        if (!/^\d+$/.test(value))
            return null;
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
            let year, month, day;
            if (this.format.startsWith('yyyy')) {
                year = parseInt(value.substr(0, 4));
                month = parseInt(value.substr(4, 2));
                day = parseInt(value.substr(6, 2));
            }
            else if (this.format.startsWith('dd')) {
                day = parseInt(value.substr(0, 2));
                month = parseInt(value.substr(2, 2));
                year = parseInt(value.substr(4, 4));
            }
            else if (this.format.startsWith('MM')) {
                month = parseInt(value.substr(0, 2));
                day = parseInt(value.substr(2, 2));
                year = parseInt(value.substr(4, 4));
            }
            else {
                return null;
            }
            if (year >= 1900 && year <= 2100 && month >= 1 && month <= 12) {
                const daysInMonth = new Date(year, month, 0).getDate();
                if (day >= 1 && day <= daysInMonth) {
                    if (this.format.startsWith('yyyy')) {
                        return `${value.substr(0, 4)}${dateSeparator}${value.substr(4, 2)}${dateSeparator}${value.substr(6, 2)}`;
                    }
                    else if (this.format.startsWith('dd')) {
                        return `${value.substr(0, 2)}${dateSeparator}${value.substr(2, 2)}${dateSeparator}${value.substr(4, 4)}`;
                    }
                    else if (this.format.startsWith('MM')) {
                        return `${value.substr(0, 2)}${dateSeparator}${value.substr(2, 2)}${dateSeparator}${value.substr(4, 4)}`;
                    }
                }
            }
        }
        return null;
    }
    handleInput = (mode, e) => {
        e.stopPropagation();
        // 날짜 선택 중일 때는 input 이벤트 무시 (프로그래밍 방식 변경)
        if (this.isDateSelecting) {
            return;
        }
        // 렌더링 후에 state 변경 (경고 방지)
        setTimeout(() => {
            this.isInputting = true;
            this.lastInputTime = Date.now();
        }, 0);
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
                    }
                    else {
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
        }
        else {
            this.endResult = value;
        }
        // 날짜 선택 중이 아닐 때만 active를 변경 (사용자가 직접 입력할 때만)
        // 렌더링 후에 state 변경 (경고 방지)
        if (this.variant === 'range' && !this.isDateSelecting) {
            setTimeout(() => {
                this.active = mode;
            }, 0);
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
    };
    handleEmptyInput(mode) {
        if (mode === 'start') {
            this.startResult = '';
            if (this.variant === 'range') {
                this.rangestart = undefined;
            }
            else {
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
        else {
            this.endResult = '';
            if (this.variant === 'range') {
                this.rangeend = undefined;
            }
        }
        this.updateCalendarIfOpen();
    }
    shouldApplyAutoFormat(value, originalValue) {
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
    hasUserEnteredSeparators(value) {
        const separators = ['-', '/', '.', ':', ' '];
        return separators.some(sep => value.includes(sep));
    }
    isFormattingBeneficial(original, formatted) {
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
    formatInputValueCarefully(value) {
        if (!this.format || !value)
            return value;
        const digits = value.replace(/[^\d]/g, '');
        if (!digits || digits.length < 4)
            return value;
        const hasExistingSeparators = /[^\d]/.test(value);
        if (hasExistingSeparators) {
            return value;
        }
        if (this.variant === 'date') {
            return this.formatDateInputCarefully(digits);
        }
        else if (this.variant === 'time') {
            return this.formatTimeInputCarefully(digits);
        }
        else if (this.variant === 'datetime') {
            return this.formatDateTimeInputCarefully(digits, value);
        }
        return value;
    }
    formatDateInputCarefully(digits) {
        if (digits.length < 4)
            return digits;
        const dateFormat = this.format.split(' ')[0];
        const separator = this.getDateSeparator(dateFormat);
        let result = '';
        if (this.isYearFirstFormat(dateFormat)) {
            result = digits.slice(0, 4);
            if (digits.length >= 6) {
                result += separator + digits.slice(4, 6);
            }
            else if (digits.length > 4) {
                result += separator + digits.slice(4);
            }
            if (digits.length >= 8) {
                result += separator + digits.slice(6, 8);
            }
            else if (digits.length > 6) {
                result += separator + digits.slice(6);
            }
        }
        else {
            if (digits.length >= 8) {
                result = this.formatDateDigits(digits);
            }
            else {
                return digits;
            }
        }
        return result;
    }
    formatTimeInputCarefully(digits) {
        if (digits.length < 2)
            return digits;
        let result = digits.slice(0, 2);
        if (digits.length >= 4) {
            result += ':' + digits.slice(2, 4);
        }
        else if (digits.length > 2) {
            result += ':' + digits.slice(2);
        }
        if (digits.length >= 6) {
            result += ':' + digits.slice(4, 6);
        }
        else if (digits.length > 4) {
            result += ':' + digits.slice(4);
        }
        return result;
    }
    formatDateTimeInputCarefully(digits, originalValue) {
        const hasSpace = originalValue.includes(' ');
        if (digits.length <= 8 && !hasSpace) {
            if (digits.length === 8) {
                return this.formatDateInputCarefully(digits) + ' ';
            }
            else {
                return this.formatDateInputCarefully(digits);
            }
        }
        else {
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
    formatDateDigits(digits) {
        if (!digits)
            return '';
        const dateFormat = this.format.split(' ')[0];
        const separator = this.getDateSeparator(dateFormat);
        let formattedDate = '';
        if (this.isYearFirstFormat(dateFormat)) {
            if (digits.length >= 1)
                formattedDate += digits.slice(0, Math.min(4, digits.length));
            if (digits.length >= 5)
                formattedDate += separator + digits.slice(4, Math.min(6, digits.length));
            if (digits.length >= 7)
                formattedDate += separator + digits.slice(6, Math.min(8, digits.length));
        }
        else if (this.isDayFirstFormat(dateFormat)) {
            if (digits.length >= 1)
                formattedDate += digits.slice(0, Math.min(2, digits.length));
            if (digits.length >= 3)
                formattedDate += separator + digits.slice(2, Math.min(4, digits.length));
            if (digits.length >= 5)
                formattedDate += separator + digits.slice(4, Math.min(8, digits.length));
        }
        else if (this.isMonthFirstFormat(dateFormat)) {
            if (digits.length >= 1)
                formattedDate += digits.slice(0, Math.min(2, digits.length));
            if (digits.length >= 3)
                formattedDate += separator + digits.slice(2, Math.min(4, digits.length));
            if (digits.length >= 5)
                formattedDate += separator + digits.slice(4, Math.min(8, digits.length));
        }
        else {
            if (digits.length >= 1)
                formattedDate += digits.slice(0, Math.min(4, digits.length));
            if (digits.length >= 5)
                formattedDate += separator + digits.slice(4, Math.min(6, digits.length));
            if (digits.length >= 7)
                formattedDate += separator + digits.slice(6, Math.min(8, digits.length));
        }
        return formattedDate;
    }
    getDateSeparator(dateFormat) {
        if (dateFormat.includes('/'))
            return '/';
        if (dateFormat.includes('.'))
            return '.';
        return '-';
    }
    isYearFirstFormat(dateFormat) {
        return dateFormat.startsWith('yyyy') || dateFormat.startsWith('yy');
    }
    isDayFirstFormat(dateFormat) {
        return dateFormat.startsWith('dd');
    }
    isMonthFirstFormat(dateFormat) {
        return dateFormat.startsWith('MM');
    }
    isValidInput(value) {
        if (!value.trim())
            return false;
        if (this.variant === 'time') {
            return this.isValidTimeFormat(value);
        }
        else if (this.variant === 'datetime') {
            return this.isValidDateTimeFormat(value);
        }
        else if (this.variant === 'date' || this.variant === 'range') {
            return this.isValidDateFormat(value);
        }
        return false;
    }
    isValidDateFormat(value) {
        let dateFormat = this.format;
        if (this.variant === 'range' || this.variant === 'date') {
            dateFormat = this.format.split(' ')[0];
        }
        const separator = this.getDateSeparator(dateFormat);
        const separatorPattern = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let pattern;
        if (this.isYearFirstFormat(dateFormat)) {
            pattern = `^\\d{4}${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])$`;
        }
        else if (this.isDayFirstFormat(dateFormat)) {
            pattern = `^(0[1-9]|[12][0-9]|3[01])${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}\\d{4}$`;
        }
        else if (this.isMonthFirstFormat(dateFormat)) {
            pattern = `^(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])${separatorPattern}\\d{4}$`;
        }
        else {
            pattern = `^\\d{4}${separatorPattern}(0[1-9]|1[0-2])${separatorPattern}(0[1-9]|[12][0-9]|3[01])$`;
        }
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
            return false;
        }
        return this.isValidDateValue(value);
    }
    isValidTimeFormat(value) {
        const timeSeparator = this.extractSeparators().timeSeparator;
        const escapedSeparator = timeSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = `^([01][0-9]|2[0-3])${escapedSeparator}([0-5][0-9])${escapedSeparator}([0-5][0-9])$`;
        const regex = new RegExp(pattern);
        if (!regex.test(value))
            return false;
        const parts = value.split(timeSeparator).map(Number);
        const [hours, minutes, seconds] = parts;
        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59;
    }
    isValidDateTimeFormat(value) {
        if (!value.includes(' '))
            return false;
        const [datePart, timePart] = value.split(' ');
        if (!datePart || !timePart)
            return false;
        return this.isValidDateFormat(datePart) && this.isValidTimeFormat(timePart);
    }
    isValidDateValue(dateString) {
        let dateFormat = this.format;
        if (this.variant === 'range' || this.variant === 'date') {
            dateFormat = this.format.split(' ')[0];
        }
        const separator = this.getDateSeparator(dateFormat);
        const parts = dateString.split(separator);
        if (parts.length !== 3)
            return false;
        let year, month, day;
        if (this.isYearFirstFormat(dateFormat)) {
            [year, month, day] = parts.map(Number);
        }
        else if (this.isDayFirstFormat(dateFormat)) {
            [day, month, year] = parts.map(Number);
        }
        else if (this.isMonthFirstFormat(dateFormat)) {
            [month, day, year] = parts.map(Number);
        }
        else {
            [year, month, day] = parts.map(Number);
        }
        if (year < 1000 || year > 9999)
            return false;
        if (month < 1 || month > 12)
            return false;
        if (day < 1 || day > 31)
            return false;
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day;
    }
    processValidInput(mode, value) {
        if (this.variant === 'time') {
            this.processTimeInput(mode, value);
        }
        else if (this.variant === 'datetime') {
            this.processDateTimeInput(mode, value);
        }
        else if (this.variant === 'date' || this.variant === 'range') {
            this.processDateInput(mode, value);
        }
    }
    processDateInput(mode, value) {
        const parsedDate = this.parseDateString(value);
        if (!parsedDate)
            return;
        const { year, month, day } = parsedDate;
        // 렌더링 후에 state 변경 (경고 방지)
        setTimeout(() => {
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
                }
                else {
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
            else {
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
        }, 0);
    }
    processTimeInput(mode, value) {
        const timeMatch = value.match(/^(\d{2}):(\d{2}):(\d{2})$/);
        if (!timeMatch)
            return;
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
    processDateTimeInput(mode, value) {
        const [datePart, timePart] = value.split(' ');
        if (!datePart || !timePart)
            return;
        const parsedDate = this.parseDateString(datePart);
        const timeMatch = timePart.match(/^(\d{2}):(\d{2}):(\d{2})$/);
        if (!parsedDate || !timeMatch)
            return;
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
            }
            else {
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
        else {
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
    parseDateString(dateString) {
        const dateFormat = this.format.split(' ')[0];
        const separator = this.getDateSeparator(dateFormat);
        const parts = dateString.split(separator);
        if (parts.length !== 3)
            return null;
        let year, month, day;
        if (this.isYearFirstFormat(dateFormat)) {
            [year, month, day] = parts.map(Number);
        }
        else if (this.isDayFirstFormat(dateFormat)) {
            [day, month, year] = parts.map(Number);
        }
        else if (this.isMonthFirstFormat(dateFormat)) {
            [month, day, year] = parts.map(Number);
        }
        else {
            [year, month, day] = parts.map(Number);
        }
        return { year, month, day };
    }
    handleBlur = (mode, e) => {
        this.isInputting = false;
        const input = e.target;
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
            }
            else {
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
            }
            else {
                this.endResult = currentValue;
                this.lastValidEndResult = currentValue;
            }
            this.processValidInput(mode, currentValue);
        }
        else {
            const lastValidValue = mode === 'start' ? this.lastValidStartResult : this.lastValidEndResult;
            const valueToRestore = lastValidValue || '';
            input.value = valueToRestore;
            if (mode === 'start') {
                this.startResult = valueToRestore;
            }
            else {
                this.endResult = valueToRestore;
            }
            if (valueToRestore) {
                this.processValidInput(mode, valueToRestore);
            }
            else {
                if (this.variant === 'range') {
                    if (mode === 'start') {
                        this.rangestart = undefined;
                    }
                    else {
                        this.rangeend = undefined;
                    }
                }
                else {
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
    };
    validateTimeInput(value) {
        return this.isValidTimeFormat(value);
    }
    activeStartCalendar = (_e) => {
        if (this.readonly) {
            return;
        }
        this.active = 'start';
        if (!this.showCalendar) {
            this.showCalendar = true;
            this.openCalendar();
        }
        else {
            this.updateSelectedDatetimeFromInput();
            this.renderPopup();
        }
    };
    activeEndCalendar = (_e) => {
        if (this.readonly) {
            return;
        }
        this.active = 'end';
        if (!this.showCalendar) {
            this.showCalendar = true;
            this.openCalendar();
        }
        else {
            this.updateSelectedDatetimeFromInput();
            this.renderPopup();
        }
    };
    toggleCalendar() {
        if (!this.showCalendar) {
            this.showCalendar = true;
            this.openCalendar();
        }
        else {
            this.showCalendar = false;
            this.closeCalendar();
        }
    }
    updateSelectedDatetimeFromInput() {
        const now = new Date();
        let baseDateSource;
        if (this.variant === 'range') {
            if (this.active === 'start') {
                baseDateSource = this.rangestart || this.rangeend;
            }
            else if (this.active === 'end') {
                baseDateSource = this.rangeend || this.rangestart;
            }
            if (baseDateSource) {
                this.selectedDatetime = {
                    year: baseDateSource.year,
                    month: baseDateSource.month,
                    day: baseDateSource.day,
                    hour: 0, minute: 0, second: 0
                };
            }
            else {
                this.selectedDatetime = {
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    day: now.getDate(),
                    hour: 0, minute: 0, second: 0
                };
            }
        }
        else {
            if (this.startResult) {
                const parsed = this.parseInputValue(this.startResult);
                if (parsed) {
                    this.selectedDatetime = parsed;
                }
            }
            else {
                this.selectedDatetime = { year: undefined, month: undefined, day: undefined, hour: undefined, minute: undefined, second: undefined };
            }
        }
    }
    openCalendar() {
        this._isEditingRange = !!(this.rangestart && this.rangeend);
        this.updateSelectedDatetimeFromInput();
        this.renderPopup();
        window.addEventListener('resize', this.handleViewportChange);
        window.addEventListener('scroll', this.handleViewportChange, true);
    }
    closeCalendar() {
        if (this.variant === 'range') {
            const isStartValid = this.rangestart && this.rangestart.year !== undefined;
            const isEndValid = this.rangeend && this.rangeend.year !== undefined;
            if (isStartValid && !isEndValid) {
                const startDate = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
                startDate.setDate(startDate.getDate() + 1);
                this.rangeend = {
                    year: startDate.getFullYear(),
                    month: startDate.getMonth(),
                    day: startDate.getDate(),
                };
                this.endResult = this.formatDisplayDate(this.rangeend.year, this.rangeend.month + 1, this.rangeend.day);
            }
            else if (!isStartValid && isEndValid) {
                const endDate = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);
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
        this.showCalendar = false;
        this.closePopup();
        window.removeEventListener('resize', this.handleViewportChange);
        window.removeEventListener('scroll', this.handleViewportChange, true);
    }
    renderPopup() {
        if (!this.showCalendar) {
            return;
        }
        if (this.popupContainer && document.body.contains(this.popupContainer)) {
            this.popupContainer.format = this.format;
            if (this.variant === 'range') {
                this.popupContainer.active = this.active;
                this.popupContainer.rangestart = this.rangestart;
                this.popupContainer.rangeend = this.rangeend;
                const displayDate = this.active === 'start' ? this.rangestart : this.rangeend;
                if (displayDate && typeof displayDate.year === 'number') {
                    this.popupContainer.year = displayDate.year;
                    this.popupContainer.month = displayDate.month;
                    this.popupContainer.day = displayDate.day;
                }
            }
            else {
                if (this.selectedDatetime && this.selectedDatetime.day !== undefined) {
                    this.popupContainer.selectedDatetime = this.selectedDatetime;
                }
                else {
                    this.popupContainer.selectedDatetime = undefined;
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
            calendar.rangestart = this.rangestart;
            calendar.rangeend = this.rangeend;
            const displayDate = this.active === 'start' ? this.rangestart : this.rangeend;
            if (displayDate && typeof displayDate.year === 'number') {
                calendar.year = displayDate.year;
                calendar.month = displayDate.month;
                calendar.day = displayDate.day;
            }
            else {
                calendar.year = now.getFullYear();
                calendar.month = now.getMonth();
                calendar.day = now.getDate();
            }
        }
        else {
            if (this.selectedDatetime && typeof this.selectedDatetime.year === 'number') {
                calendar.selectedDatetime = this.selectedDatetime;
                calendar.year = this.selectedDatetime.year;
                calendar.month = this.selectedDatetime.month;
                calendar.day = this.selectedDatetime.day ?? now.getDate();
            }
            else {
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
    async syncPopupState() {
        if (!this.popupContainer)
            return;
        if (this.variant === 'range') {
            this.popupContainer.setAttribute('active', this.active || 'start');
            // rangestart와 rangeend를 항상 업데이트
            this.popupContainer.rangestart = this.rangestart;
            this.popupContainer.rangeend = this.rangeend;
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
            }
            else if (this.active === 'end') {
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
        }
        else {
            if (this.selectedDatetime && this.selectedDatetime.day !== undefined) {
                this.popupContainer.selectedDatetime = this.selectedDatetime;
            }
            else {
                this.popupContainer.selectedDatetime = undefined;
            }
        }
    }
    updateCalendarIfOpen() {
        if (this.showCalendar && this.popupContainer) {
            this.renderPopup();
        }
    }
    setupPopupEventListeners() {
        if (!this.popupContainer)
            return;
        this.popupContainer.removeEventListener('selected', this.handleDateSelected);
        this.popupContainer.addEventListener('selected', this.handleDateSelected);
    }
    handleDateSelected = (event) => {
        event.stopPropagation();
        const customEvent = event;
        const { closable, year, month, day, hour, minute, second } = customEvent.detail;
        if (this.variant === 'range') {
            // 날짜 선택 플래그 설정 (input 이벤트에서 active를 덮어쓰지 않도록)
            this.isDateSelecting = true;
            // Lit3 로직: calendar에서는 year, month, day, range만 전달
            // datepicker에서 자체적으로 rangestart/rangeend 관리
            const selectedDate = { year, month, day };
            const selectedDateObj = new Date(year, month, day);
            // 렌더링 후에 state 변경 (경고 방지)
            setTimeout(() => {
                // active 기준으로 처리 (range 값은 캘린더가 어느쪽인지만 나타냄)
                if (this.active === 'start') {
                    // 1. 새 시작 날짜 설정
                    this.rangestart = selectedDate;
                    this.startResult = this.formatDisplayDate(year, month + 1, day);
                    // 2. 기존 종료 날짜 체크
                    let hasValidEnd = false;
                    if (this.rangeend) {
                        const endDateObj = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);
                        if (selectedDateObj > endDateObj) {
                            // 범위가 역전되었다면 종료 날짜 초기화
                            this.rangeend = undefined;
                            this.endResult = '';
                        }
                        else {
                            // valid한 end가 있음
                            hasValidEnd = true;
                        }
                    }
                    // 3. valid한 end가 있으면 종료, 없으면 end 모드로 전환
                    if (hasValidEnd) {
                        this.closeCalendar();
                    }
                    else {
                        this.active = 'end';
                    }
                }
                else if (this.active === 'end') {
                    // 1. 새 종료 날짜 설정
                    this.rangeend = selectedDate;
                    this.endResult = this.formatDisplayDate(year, month + 1, day);
                    // 2. 기존 시작 날짜 체크
                    let hasValidStart = false;
                    if (this.rangestart) {
                        const startDateObj = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
                        if (selectedDateObj < startDateObj) {
                            // 범위가 역전되었다면 시작 날짜 초기화
                            this.rangestart = undefined;
                            this.startResult = '';
                        }
                        else {
                            // valid한 start가 있음
                            hasValidStart = true;
                        }
                    }
                    // 3. valid한 start가 있으면 종료, 없으면 start 모드로 전환
                    if (hasValidStart) {
                        this.closeCalendar();
                    }
                    else {
                        this.active = 'start';
                    }
                }
                this.selected.emit({ rangestart: this.rangestart, rangeend: this.rangeend });
                // props를 업데이트하여 달력에 반영
                this.syncPopupState();
                // 날짜 선택 완료 후 플래그 해제
                setTimeout(() => {
                    this.isDateSelecting = false;
                }, 50);
            }, 0);
        }
        else {
            this.year = String(year);
            this.month = String(month + 1);
            this.day = String(day);
            this.hour = String(hour);
            this.minute = String(minute);
            this.second = String(second);
            this.selectedDatetime = { year, month, day, hour, minute, second };
            if (this.variant === 'time') {
                this.startResult = this.formatDisplayDate(year, month + 1, day, hour, minute, second);
            }
            else {
                this.showResult(year, month, day, hour, minute, second);
            }
            this.selected.emit({ year, month, day, hour, minute, second });
            if (closable !== false) {
                this.toggleCalendar();
            }
        }
    };
    formatDisplayDate(year, month, day, hour, minute, second) {
        if (year === undefined || month === undefined || day === undefined)
            return '';
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
        }
        else {
            result = result.replace(/\s*hh:mm:ss\s*/, '').trim();
        }
        return result;
    }
    parseInputValue(value) {
        if (!value)
            return null;
        try {
            if (this.variant === 'time') {
                const timeMatch = value.match(/^(\d{2}):(\d{2}):(\d{2})$/);
                if (timeMatch) {
                    const now = new Date();
                    const timeParts = [parseInt(timeMatch[1]), parseInt(timeMatch[2]), parseInt(timeMatch[3])];
                    let hour, minute, second;
                    const timeFormat = this.format.includes(':') ? this.format : 'hh:mm:ss';
                    if (timeFormat.startsWith('ss:mm:hh')) {
                        [second, minute, hour] = timeParts;
                    }
                    else if (timeFormat.startsWith('mm:ss:hh')) {
                        [minute, second, hour] = timeParts;
                    }
                    else if (timeFormat.startsWith('hh:ss:mm')) {
                        [hour, second, minute] = timeParts;
                    }
                    else {
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
            }
            else if (this.variant === 'datetime') {
                if (!value.includes(' '))
                    return null;
                const [datePart, timePart] = value.split(' ');
                if (!datePart || !timePart)
                    return null;
                const dateFormat = this.format.split(' ')[0];
                const separator = dateFormat.includes('/') ? '\\/' : (dateFormat.includes('.') ? '\\.' : '-');
                const datePattern = new RegExp(`^(\\d{2,4})${separator}(\\d{2})${separator}(\\d{2,4})$`);
                const dateMatch = datePart.match(datePattern);
                if (!dateMatch)
                    return null;
                let year, month, day;
                if (dateFormat.startsWith('yyyy') || dateFormat.startsWith('yy')) {
                    [, year, month, day] = dateMatch.map(Number);
                }
                else if (dateFormat.startsWith('dd')) {
                    [, day, month, year] = dateMatch.map(Number);
                }
                else if (dateFormat.startsWith('MM')) {
                    [, month, day, year] = dateMatch.map(Number);
                }
                else {
                    [, year, month, day] = dateMatch.map(Number);
                }
                const timeMatch = timePart.match(/^(\d{2}):(\d{2}):(\d{2})$/);
                if (!timeMatch)
                    return null;
                const timeParts = [parseInt(timeMatch[1]), parseInt(timeMatch[2]), parseInt(timeMatch[3])];
                let hour, minute, second;
                const timeFormat = this.format.split(' ')[1] || 'hh:mm:ss';
                if (timeFormat.startsWith('ss:mm:hh')) {
                    [second, minute, hour] = timeParts;
                }
                else if (timeFormat.startsWith('mm:ss:hh')) {
                    [minute, second, hour] = timeParts;
                }
                else if (timeFormat.startsWith('hh:ss:mm')) {
                    [hour, second, minute] = timeParts;
                }
                else {
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
            }
            else {
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
        }
        catch (e) {
            console.warn('Error parsing input value:', e);
        }
        return null;
    }
    updatePopupPosition() {
        if (!this.popupContainer)
            return;
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
        }
        else if (spaceAbove >= estimatedPopupHeight) {
            shouldShowAbove = true;
        }
        else {
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
        }
        else {
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
        }
        else {
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
    closePopup() {
        if (this.popupContainer) {
            this.popupContainer.remove();
            this.popupContainer = undefined;
        }
    }
    handleViewportChange = () => {
        if (this.popupContainer)
            this.updatePopupPosition();
    };
    showResult(year, month, day, hour, minute, second, range) {
        if (isNaN(year) || isNaN(month) || isNaN(day))
            return;
        const dateString = this.formatDisplayDate(year, month + 1, day, hour, minute, second);
        if (!range)
            this.startResult = dateString;
        else if (range === 'start') {
            this.startResult = dateString;
            this.rangestart = { year, month, day };
        }
        else if (range === 'end') {
            this.endResult = dateString;
            this.rangeend = { year, month, day };
        }
    }
    handleOutsideClick = (e) => {
        if (this.host.contains(e.target) || (this.popupContainer && this.popupContainer.contains(e.target))) {
            return;
        }
        // 렌더링 후에 state 변경 (경고 방지)
        setTimeout(() => {
            if (this.variant === 'range') {
                const isStartValid = this.rangestart && this.rangestart.year !== undefined;
                const isEndValid = this.rangeend && this.rangeend.year !== undefined;
                if (isStartValid && !isEndValid) {
                    const startDate = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
                    startDate.setDate(startDate.getDate() + 1);
                    this.rangeend = {
                        year: startDate.getFullYear(),
                        month: startDate.getMonth(),
                        day: startDate.getDate(),
                    };
                    this.endResult = this.formatDisplayDate(this.rangeend.year, this.rangeend.month + 1, this.rangeend.day);
                }
                else if (!isStartValid && isEndValid) {
                    const endDate = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);
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
        }, 0);
    };
    /* ============================================================================
     *  Shared form-error pattern (see sy-autocomplete / sy-checkbox for reference).
     *  Slot [slot="error"] is the one error UI. Both `required` violation and
     *  programmatic setCustomError() surface it. getValidStatus() exposes the
     *  underlying constraint to app code.
     * ============================================================================ */
    async getValidStatus() {
        return this.isValid ? '' : this.validStatus;
    }
    async setCustomError() {
        this.isValid = false;
        this.validStatus = 'custom';
        // Force visual invalid state immediately without waiting for blur/submit.
        this.touched = true;
        this.startTouched = true;
        this.endTouched = true;
        this.updateValidityState();
    }
    async clearCustomError() {
        if (this.validStatus === 'custom') {
            this.validStatus = '';
            this.isValid = true;
        }
        this.updateValidityState();
    }
    async checkValidity() {
        this.updateValidityState();
        return this.internals.checkValidity();
    }
    async reportValidity() {
        this.updateValidityState();
        return this.internals.reportValidity();
    }
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    computeFormValue() {
        if (this.variant === 'range') {
            return JSON.stringify({ start: this.startResult, end: this.endResult });
        }
        return this.startResult;
    }
    updateValidityState() {
        // (1) Programmatic custom error takes priority.
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
            this.internals?.setValidity({ customError: true }, msg);
            this.internals?.setFormValue(this.computeFormValue(), this.computeFormValue());
            return;
        }
        // (2) Native constraint validation.
        this.isValid = true;
        this.validStatus = '';
        if (this.required) {
            const hasValue = this.variant === 'range'
                ? !!(this.startResult && this.endResult)
                : !!this.startResult;
            if (!hasValue) {
                this.isValid = false;
                this.validStatus = 'valueMissing';
            }
        }
        const formValue = this.computeFormValue();
        this.internals?.setFormValue(formValue, formValue);
        if (!this.isValid) {
            if (this.hasSlotErrorMessage) {
                const slotText = this.getSlotErrorText() || this.getErrorMessage(this.validStatus) || ' ';
                this.internals?.setValidity({ customError: true }, slotText);
            }
            else {
                this.internals?.setValidity({ [this.validStatus]: true }, this.getErrorMessage(this.validStatus));
            }
        }
        else {
            this.internals?.setValidity({});
        }
    }
    extractSeparators() {
        const format = this.format || 'yyyy-MM-dd hh:mm:ss';
        const dateFormat = format.split(' ')[0];
        const timeFormat = format.split(' ')[1] || (this.variant === 'time' ? format : 'hh:mm:ss');
        let dateSeparator = '-';
        if (dateFormat.includes('/')) {
            dateSeparator = '/';
        }
        else if (dateFormat.includes('.')) {
            dateSeparator = '.';
        }
        let timeSeparator = ':';
        if (timeFormat.includes('/')) {
            timeSeparator = '/';
        }
        else if (timeFormat.includes('.')) {
            timeSeparator = '.';
        }
        return { dateSeparator, timeSeparator };
    }
    getErrorMessage(type) {
        if (type === '')
            return '';
        const messages = {
            valueMissing: 'This field is required',
            custom: 'Invalid input'
        };
        return messages[type] || '';
    }
    handleCustomErrorSlot = () => {
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
    };
    static get formAssociated() { return true; }
    static get watchers() { return {
        "startResult": ["watchResultChanges"],
        "endResult": ["watchResultChanges"],
        "year": ["watchDateProps"],
        "month": ["watchDateProps"],
        "day": ["watchDateProps"],
        "hour": ["watchDateProps"],
        "minute": ["watchDateProps"],
        "second": ["watchDateProps"],
        "format": ["watchFormat"],
        "placeholder": ["watchPlaceholder"],
        "variant": ["watchVariant"]
    }; }
    static get style() { return syDatepickerCss; }
}, [326, "sy-datepicker", {
        "mode": [1],
        "variant": [1],
        "disabled": [1028],
        "readonly": [4],
        "required": [4],
        "year": [1],
        "month": [1],
        "day": [1],
        "hour": [1],
        "minute": [1],
        "second": [1],
        "dateNames": [1025, "datenames"],
        "mondayStart": [1028, "mondaystart"],
        "hideWeekend": [1028, "hideweekend"],
        "placeholder": [1],
        "format": [1],
        "name": [1],
        "noNativeValidity": [4, "no-native-validity"],
        "displayPlaceholder": [32],
        "touched": [32],
        "startTouched": [32],
        "endTouched": [32],
        "formSubmitted": [32],
        "rangestart": [32],
        "rangeend": [32],
        "showCalendar": [32],
        "startResult": [32],
        "endResult": [32],
        "active": [32],
        "selectedDatetime": [32],
        "_isEditingRange": [32],
        "isValid": [32],
        "validStatus": [32],
        "hasSlotErrorMessage": [32],
        "hasPopupErrorComponent": [32],
        "lastValidStartResult": [32],
        "lastValidEndResult": [32],
        "isInputting": [32],
        "lastInputTime": [32],
        "initialStartResult": [32],
        "initialEndResult": [32],
        "getValidStatus": [64],
        "setCustomError": [64],
        "clearCustomError": [64],
        "checkValidity": [64],
        "reportValidity": [64]
    }, [[2, "invalid", "handleInvalidEvent"]], {
        "startResult": ["watchResultChanges"],
        "endResult": ["watchResultChanges"],
        "year": ["watchDateProps"],
        "month": ["watchDateProps"],
        "day": ["watchDateProps"],
        "hour": ["watchDateProps"],
        "minute": ["watchDateProps"],
        "second": ["watchDateProps"],
        "format": ["watchFormat"],
        "placeholder": ["watchPlaceholder"],
        "variant": ["watchVariant"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-datepicker", "sy-button", "sy-calendar", "sy-date-calendar", "sy-date-time-calendar", "sy-icon", "sy-input", "sy-range-calendar", "sy-timepicker"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-datepicker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyDatePicker);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "sy-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "sy-date-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "sy-date-time-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-range-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-timepicker":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyDatepicker = SyDatePicker;
const defineCustomElement = defineCustomElement$1;

export { SyDatepicker, defineCustomElement };
