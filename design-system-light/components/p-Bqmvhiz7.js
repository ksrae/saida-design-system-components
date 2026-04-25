import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$3 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$2 } from './p-H6hwOjjT.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syRangeCalendarCss = ".sc-sy-range-calendar-h .range-calendar-container.sc-sy-range-calendar{display:flex;justify-content:space-between;display:flex}.sc-sy-range-calendar-h .calendar-header.sc-sy-range-calendar{height:36px;display:flex;align-items:center;justify-content:space-between;padding-bottom:var(--spacing-3xsmall)}.sc-sy-range-calendar-h sy-date-calendar.sc-sy-range-calendar{flex:1}";

const SyRangeCalendar = /*@__PURE__*/ proxyCustomElement(class SyRangeCalendar extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
        this.startCalendarMode = value;
        this.endCalendarMode = value;
    }
    active;
    datetime;
    rangestart;
    rangeend;
    dateNames = 'Su,Mo,Tu,We,Th,Fr,Sa';
    mondayStart = false;
    hideWeekend = false;
    selected;
    startCalendarDate = new Date();
    endCalendarDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
    startCalendarMode = 'day';
    endCalendarMode = 'day';
    hoverDate = '';
    _mode = 'day';
    // Watch를 사용하여 props 변경 감지
    handlePropsChange() {
        // props 변경 시 다음 틱에서 달력 위치 재계산
        setTimeout(() => {
            this.initializeCalendarDates();
        }, 0);
    }
    connectedCallback() {
        this.startCalendarMode = this.mode;
        this.endCalendarMode = this.mode;
    }
    componentWillLoad() {
        this.dateNames = fnAssignPropFromAlias(this.host, 'date-names') ?? this.dateNames;
        this.mondayStart = fnAssignPropFromAlias(this.host, 'monday-start') ?? this.mondayStart;
        this.hideWeekend = fnAssignPropFromAlias(this.host, 'hide-weekend') ?? this.hideWeekend;
        // 초기 달력 위치 설정
        this.initializeCalendarDates();
    }
    initializeCalendarDates() {
        const isSameMonth = this.rangestart && this.rangeend &&
            this.rangestart.year === this.rangeend.year &&
            this.rangestart.month === this.rangeend.month;
        if (isSameMonth) {
            const baseDate = new Date(this.rangestart.year, this.rangestart.month, 1);
            if (this.active === 'start') {
                this.endCalendarDate = baseDate;
                const newStartDate = new Date(baseDate);
                if (this.endCalendarMode === 'year')
                    newStartDate.setFullYear(newStartDate.getFullYear() - 10);
                else if (this.endCalendarMode === 'month')
                    newStartDate.setFullYear(newStartDate.getFullYear() - 1);
                else
                    newStartDate.setMonth(newStartDate.getMonth() - 1);
                this.startCalendarDate = newStartDate;
            }
            else {
                this.startCalendarDate = baseDate;
                const newEndDate = new Date(baseDate);
                if (this.startCalendarMode === 'year')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 10);
                else if (this.startCalendarMode === 'month')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 1);
                else
                    newEndDate.setMonth(newEndDate.getMonth() + 1);
                this.endCalendarDate = newEndDate;
            }
        }
        else {
            const now = new Date();
            let baseDate;
            if (this.active === 'start' && this.rangestart) {
                baseDate = new Date(this.rangestart.year, this.rangestart.month, 1);
                this.startCalendarDate = baseDate;
                const newEndDate = new Date(baseDate);
                if (this.startCalendarMode === 'year')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 10);
                else if (this.startCalendarMode === 'month')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 1);
                else
                    newEndDate.setMonth(newEndDate.getMonth() + 1);
                this.endCalendarDate = newEndDate;
            }
            else if (this.active === 'end' && this.rangeend) {
                baseDate = new Date(this.rangeend.year, this.rangeend.month, 1);
                this.endCalendarDate = baseDate;
                const newStartDate = new Date(baseDate);
                if (this.endCalendarMode === 'year')
                    newStartDate.setFullYear(newStartDate.getFullYear() - 10);
                else if (this.endCalendarMode === 'month')
                    newStartDate.setFullYear(newStartDate.getFullYear() - 1);
                else
                    newStartDate.setMonth(newStartDate.getMonth() - 1);
                this.startCalendarDate = newStartDate;
            }
            else if (this.rangestart) {
                baseDate = new Date(this.rangestart.year, this.rangestart.month, 1);
                this.startCalendarDate = baseDate;
                const newEndDate = new Date(baseDate);
                if (this.startCalendarMode === 'year')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 10);
                else if (this.startCalendarMode === 'month')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 1);
                else
                    newEndDate.setMonth(newEndDate.getMonth() + 1);
                this.endCalendarDate = newEndDate;
            }
            else {
                baseDate = new Date(now.getFullYear(), now.getMonth(), 1);
                this.startCalendarDate = baseDate;
                const newEndDate = new Date(baseDate);
                if (this.startCalendarMode === 'year')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 10);
                else if (this.startCalendarMode === 'month')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 1);
                else
                    newEndDate.setMonth(newEndDate.getMonth() + 1);
                this.endCalendarDate = newEndDate;
            }
        }
    }
    render() {
        return (h("div", { key: '5abe7ebd31cc04506c27fbb8d257ae595c80bd28', class: "range-calendar-container" }, h("sy-date-calendar", { key: '9b6cd3a3eeb699c26b0510f81cf67c88eddffd31', range: "start", mode: this.startCalendarMode, currentDate: this.startCalendarDate, rangestart: this.rangestart, rangeend: this.rangeend, hoverDate: this.hoverDate, active: this.active, dateNames: this.dateNames, mondayStart: this.mondayStart, hideWeekend: this.hideWeekend, onChanged: this.handleChangedStartCalendar, onSelected: this.handleSelectedCalendar, onEntered: this.handleEnteredCalendar, "onMode-changed": this.handleModeChanged }), h("sy-date-calendar", { key: '14b86ebf8fb28820d94ec4a150cd30c03c513ec1', range: "end", mode: this.endCalendarMode, currentDate: this.endCalendarDate, rangestart: this.rangestart, rangeend: this.rangeend, hoverDate: this.hoverDate, active: this.active, dateNames: this.dateNames, mondayStart: this.mondayStart, hideWeekend: this.hideWeekend, onChanged: this.handleChangedEndCalendar, onSelected: this.handleSelectedCalendar, onEntered: this.handleEnteredCalendar, "onMode-changed": this.handleModeChanged })));
    }
    handleChangedStartCalendar = (e) => {
        e.stopPropagation();
        const newStartDate = new Date(e.detail.date);
        this.startCalendarDate = newStartDate;
        if (this.startCalendarMode === this.endCalendarMode) {
            const newEndDate = new Date(newStartDate);
            if (this.startCalendarMode === 'year')
                newEndDate.setFullYear(newStartDate.getFullYear() + 10);
            else if (this.startCalendarMode === 'month')
                newEndDate.setFullYear(newStartDate.getFullYear() + 1);
            else
                newEndDate.setMonth(newStartDate.getMonth() + 1);
            this.endCalendarDate = newEndDate;
        }
    };
    handleChangedEndCalendar = (e) => {
        e.stopPropagation();
        const newEndDate = new Date(e.detail.date);
        this.endCalendarDate = newEndDate;
        if (this.startCalendarMode === this.endCalendarMode) {
            const newStartDate = new Date(newEndDate);
            if (this.endCalendarMode === 'year')
                newStartDate.setFullYear(newEndDate.getFullYear() - 10);
            else if (this.endCalendarMode === 'month')
                newStartDate.setFullYear(newEndDate.getFullYear() - 1);
            else
                newStartDate.setMonth(newStartDate.getMonth() - 1);
            this.startCalendarDate = newStartDate;
        }
    };
    handleModeChanged = (e) => {
        const { mode, range } = e.detail;
        if (range === 'start') {
            this.startCalendarMode = mode;
        }
        else {
            this.endCalendarMode = mode;
        }
        if (this.startCalendarMode === this.endCalendarMode) {
            if (range === 'start') {
                const newEndDate = new Date(this.startCalendarDate);
                if (this.startCalendarMode === 'year')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 10);
                else if (this.startCalendarMode === 'month')
                    newEndDate.setFullYear(newEndDate.getFullYear() + 1);
                else
                    newEndDate.setMonth(newEndDate.getMonth() + 1);
                this.endCalendarDate = newEndDate;
            }
            else {
                const newStartDate = new Date(this.endCalendarDate);
                if (this.endCalendarMode === 'year')
                    newStartDate.setFullYear(newStartDate.getFullYear() - 10);
                else if (this.endCalendarMode === 'month')
                    newStartDate.setFullYear(newStartDate.getFullYear() - 1);
                else
                    newStartDate.setMonth(newStartDate.getMonth() - 1);
                this.startCalendarDate = newStartDate;
            }
        }
    };
    handleSelectedCalendar = (e) => {
        e.stopPropagation();
        this.selected.emit(e.detail);
    };
    handleEnteredCalendar = (e) => {
        e.stopPropagation();
        this.hoverDate = e.detail.hoverDate;
    };
    static get watchers() { return {
        "active": ["handlePropsChange"],
        "rangestart": ["handlePropsChange"],
        "rangeend": ["handlePropsChange"]
    }; }
    static get style() { return syRangeCalendarCss; }
}, [258, "sy-range-calendar", {
        "mode": [7169],
        "active": [1],
        "datetime": [16],
        "rangestart": [16],
        "rangeend": [16],
        "dateNames": [1025, "datenames"],
        "mondayStart": [1028, "mondaystart"],
        "hideWeekend": [1028, "hideweekend"],
        "startCalendarDate": [32],
        "endCalendarDate": [32],
        "startCalendarMode": [32],
        "endCalendarMode": [32],
        "hoverDate": [32]
    }, undefined, {
        "active": ["handlePropsChange"],
        "rangestart": ["handlePropsChange"],
        "rangeend": ["handlePropsChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-range-calendar", "sy-button", "sy-date-calendar", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-range-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyRangeCalendar);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-date-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyRangeCalendar as S, defineCustomElement as d };
