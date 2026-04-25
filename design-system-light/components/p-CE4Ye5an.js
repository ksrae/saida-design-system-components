import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$6 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$5 } from './p-H6hwOjjT.js';
import { d as defineCustomElement$4 } from './p-Dz-3bzTq.js';
import { d as defineCustomElement$3 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$2 } from './p-Bqmvhiz7.js';
import { d as defineCustomElement$1 } from './p-D83RAFCG.js';

const syCalendarCss = "@charset \"UTF-8\";.sc-sy-calendar-h{display:table;position:absolute;background-color:var(--date-time-picker-calendar-container-body-background-enabled);width:auto;height:auto;margin:auto;overflow:hidden;border:1px solid var(--date-time-picker-calendar-container-body-border-enabled);box-shadow:var(--box-shadow);z-index:var(--z-index-800);background-color:var(--date-time-picker-calendar-container-body-background-enabled)}.calendar.sc-sy-calendar{width:100%;height:100%;display:flex;flex-direction:column;z-index:var(--z-index-900);box-sizing:border-box}";

const SyCalendar = /*@__PURE__*/ proxyCustomElement(class SyCalendar extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
        this.closed = createEvent(this, "closed");
    }
    get host() { return this; }
    mode = 'day';
    variant = 'date';
    format = 'hh:mm:ss';
    active;
    year;
    month;
    day;
    hour;
    minute;
    second;
    rangestart;
    rangeend;
    dateNames = 'Su,Mo,Tu,We,Th,Fr,Sa';
    mondayStart = false;
    hideWeekend = false;
    selected;
    closed;
    todayDate = new Date();
    selectedDatetime;
    parentDom;
    addedToBody = false;
    // private preventRender = false;
    // private initialRender: boolean = true;
    // private renderTimeoutId: any;
    componentWillLoad() {
        this.dateNames = fnAssignPropFromAlias(this.host, 'date-names') ?? this.dateNames;
        this.mondayStart = fnAssignPropFromAlias(this.host, 'monday-start') ?? this.mondayStart;
        this.hideWeekend = fnAssignPropFromAlias(this.host, 'hide-weekend') ?? this.hideWeekend;
        // Properly initialize selectedDatetime
        const now = new Date();
        this.selectedDatetime = {
            year: this.year !== undefined ? this.year : (this.selectedDatetime?.year ?? now.getFullYear()),
            month: this.month !== undefined ? this.month : (this.selectedDatetime?.month ?? now.getMonth()),
            day: this.day !== undefined ? this.day : (this.selectedDatetime?.day ?? now.getDate()),
            hour: this.hour !== undefined ? this.hour : (this.selectedDatetime?.hour ?? now.getHours()),
            minute: this.minute !== undefined ? this.minute : (this.selectedDatetime?.minute ?? now.getMinutes()),
            second: this.second !== undefined ? this.second : (this.selectedDatetime?.second ?? now.getSeconds())
        };
    }
    componentDidLoad() {
        this.appendToRoot();
    }
    componentDidUpdate() {
        // updated 로직
    }
    appendToRoot = () => {
        if (this.parentDom !== document.body) {
            this.parentDom = this.parentDom || document.body;
            // Stencil에서는 호스트 엘리먼트를 직접 이동시키지 않습니다
            // 필요한 경우 포털 패턴을 사용하거나 다른 방식으로 처리
            this.addedToBody = true;
        }
    };
    handleRangeDateSelected = (event) => {
        event.stopPropagation(); // 이벤트 버블링 중단!
        const { year, month, day, range } = event.detail;
        // 단순히 이벤트만 전달 - 상태 변경 없음!
        this.selected.emit({
            year,
            month,
            day,
            range
        });
    };
    handleDateTimeSelected = (event) => {
        event.stopPropagation();
        const { closable, year, month, day, hour, minute, second, range } = event.detail;
        // 선택된 datetime을 저장
        this.selectedDatetime = { year, month, day, hour, minute, second };
        this.selected.emit({ closable, year, month, day, hour, minute, second, range });
        if (closable) {
            this.handleCalendarClosed(event);
        }
    };
    handleDateSelected = (event) => {
        event.stopPropagation();
        const { closable, year, month, day, hour, minute, second, range } = event.detail;
        // 선택된 datetime을 저장
        this.selectedDatetime = { year, month, day, hour, minute, second };
        this.selected.emit({ closable, year, month, day, hour, minute, second, range });
        if (closable) {
            this.handleCalendarClosed(event);
        }
    };
    handleTimeSelected = (e) => {
        e?.stopPropagation();
        const { closable, hour, minute, second } = e.detail;
        // time variant에서는 현재 시간의 날짜 부분만 사용
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // 0-11 범위
        const day = today.getDate();
        // 선택된 시간을 저장
        this.selectedDatetime = {
            ...this.selectedDatetime,
            year,
            month,
            day,
            hour: hour ?? this.selectedDatetime?.hour ?? today.getHours(),
            minute: minute ?? this.selectedDatetime?.minute ?? today.getMinutes(),
            second: second ?? this.selectedDatetime?.second ?? today.getSeconds()
        };
        this.selected.emit({
            closable,
            year,
            month,
            day,
            hour: this.selectedDatetime.hour,
            minute: this.selectedDatetime.minute,
            second: this.selectedDatetime.second,
            format: this.format,
            range: undefined
        });
        if (closable) {
            this.handleCalendarClosed(e);
        }
    };
    handleCalendarClosed = (_event) => {
        this.closed.emit(undefined);
    };
    /**
     * For the `time` variant, the parent datepicker may pass a combined
     * date+time format like `yyyy-MM-dd hh:mm:ss`. The timepicker's header
     * does a raw replace on `hh/mm/ss` and would leave `yyyy-MM-dd` as
     * literal text. Strip the date portion and fall back to `hh:mm:ss`.
     */
    extractTimeFormat(format) {
        if (!format)
            return 'hh:mm:ss';
        // Match the first contiguous run starting at `hh` that contains only
        // time tokens + separators. This covers hh:mm, hh:mm:ss, hh-mm-ss, etc.
        const match = format.match(/hh[^a-zA-Z]*mm([^a-zA-Z]*ss)?/);
        return match ? match[0] : 'hh:mm:ss';
    }
    render() {
        return (h("div", { key: '748d2e8b6b73a6c8f4f55c1ae93c388d78eadd80', class: "calendar" }, this.variant === 'datetime' ? (h("sy-date-time-calendar", { mode: this.mode, dateNames: this.dateNames, datetime: this.selectedDatetime, mondayStart: this.mondayStart, hideWeekend: this.hideWeekend, onSelected: this.handleDateTimeSelected })) : this.variant === 'range' ? (h("sy-range-calendar", { active: this.active, mode: this.mode, dateNames: this.dateNames, datetime: this.selectedDatetime, rangestart: this.rangestart, rangeend: this.rangeend, mondayStart: this.mondayStart, hideWeekend: this.hideWeekend, onSelected: this.handleRangeDateSelected })) : this.variant === 'date' ? (h("sy-date-calendar", { mode: this.mode, dateNames: this.dateNames, datetime: this.selectedDatetime, active: "", hoverDate: "", mondayStart: this.mondayStart, hideWeekend: this.hideWeekend, onSelected: this.handleDateSelected })) : (h("sy-timepicker", { hour: this.selectedDatetime?.hour ?? this.todayDate.getHours(), minute: this.selectedDatetime?.minute ?? this.todayDate.getMinutes(), second: this.selectedDatetime?.second ?? this.todayDate.getSeconds(), format: this.extractTimeFormat(this.format), onSelected: this.handleTimeSelected }))));
    }
    static get style() { return syCalendarCss; }
}, [258, "sy-calendar", {
        "mode": [1],
        "variant": [1],
        "format": [1],
        "active": [1537],
        "year": [2],
        "month": [2],
        "day": [2],
        "hour": [2],
        "minute": [2],
        "second": [2],
        "rangestart": [16],
        "rangeend": [16],
        "dateNames": [1025, "datenames"],
        "mondayStart": [1028, "mondaystart"],
        "hideWeekend": [1028, "hideweekend"],
        "selectedDatetime": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-calendar", "sy-button", "sy-date-calendar", "sy-date-time-calendar", "sy-icon", "sy-range-calendar", "sy-timepicker"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyCalendar);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-date-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-date-time-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-range-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "sy-timepicker":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyCalendar as S, defineCustomElement as d };
