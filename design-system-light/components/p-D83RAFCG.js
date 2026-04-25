import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$1 } from './p-DeTd2AfI.js';

const syTimepickerCss = ".sc-sy-timepicker-h{width:auto}.sc-sy-timepicker-h .time-section.sc-sy-timepicker{display:flex;width:168px;flex-direction:column;overflow:hidden;flex-grow:1;border-left:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}.sc-sy-timepicker-h .time-contents.sc-sy-timepicker{display:flex;flex-direction:row;overflow:hidden;height:208px}.sc-sy-timepicker-h .time-contents.sc-sy-timepicker .time-column.sc-sy-timepicker{border-left:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}.sc-sy-timepicker-h .time-contents.sc-sy-timepicker .time-column.sc-sy-timepicker:first-child{border:none}.sc-sy-timepicker-h .time-column.sc-sy-timepicker{flex:1;overflow-y:auto;overflow-x:hidden;scroll-behavior:smooth}.sc-sy-timepicker-h .time-item.sc-sy-timepicker{height:28px;cursor:pointer;justify-content:center;display:flex;align-items:center;box-sizing:border-box;align-items:center}.sc-sy-timepicker-h .time-item.sc-sy-timepicker:hover{background-color:var(--date-time-picker-calendar-time-item-background-hover)}.sc-sy-timepicker-h .selected.sc-sy-timepicker{background-color:var(--date-time-picker-calendar-time-item-background-selected)}.sc-sy-timepicker-h .selected.sc-sy-timepicker:hover{background-color:var(--date-time-picker-calendar-time-item-background-selected)}.sc-sy-timepicker-h .header.sc-sy-timepicker{width:100%;height:36px;text-align:center;padding:var(--spacing-2xsmall) var(--spacing-xsmall);border-bottom:1px solid var(--date-time-picker-calendar-container-body-border-enabled);box-sizing:border-box;font-family:\"Roboto\";font-size:14px;font-weight:500;line-height:22px;letter-spacing:0.25px}.sc-sy-timepicker-h .time-padding-bottom.sc-sy-timepicker{height:calc(100% - 28px);min-height:100px}.sc-sy-timepicker-h .time-padding-bottom.hour.sc-sy-timepicker{height:calc(100% - 28px)}.sc-sy-timepicker-h .calendar-footer.sc-sy-timepicker{display:flex;justify-content:flex-end;padding:var(--spacing-2xsmall) var(--spacing-xsmall);box-sizing:border-box;border-top:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}";

const SyTimePicker = /*@__PURE__*/ proxyCustomElement(class SyTimePicker extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
        this.changed = createEvent(this, "changed");
    }
    get host() { return this; }
    hour = 0;
    minute = 0;
    second = 0;
    hideButton = false;
    timeSeparator = ':'; // 시간 구분자 추가
    format = 'hh:mm:ss'; // 시간 형식 지원 추가
    selected;
    changed;
    selectedTime = '00:00:00';
    internalHour = 0;
    internalMinute = 0;
    internalSecond = 0;
    hourColumn;
    minuteColumn;
    secondColumn;
    componentWillLoad() {
        this.hideButton = fnAssignPropFromAlias(this.host, 'hide-button') ?? this.hideButton;
        this.timeSeparator = fnAssignPropFromAlias(this.host, 'time-separator') ?? this.timeSeparator;
        // Initialize internal state from props
        this.internalHour = this.hour;
        this.internalMinute = this.minute;
        this.internalSecond = this.second;
    }
    componentWillUpdate() {
        // Sync internal state with prop changes
        if (this.hour !== this.internalHour)
            this.internalHour = this.hour;
        if (this.minute !== this.internalMinute)
            this.internalMinute = this.minute;
        if (this.second !== this.internalSecond)
            this.internalSecond = this.second;
    }
    visibilityObserver;
    componentDidLoad() {
        this.updateSelectedTime();
        this.cacheColumnRefs();
        // Initial scroll attempt — if the picker is being rendered hidden
        // (inside a just-opened popup), `offsetHeight` is 0 and the math
        // collapses to scrollTop = 0. Watch for the timepicker becoming
        // visible and re-attempt then.
        this.scrollToSelected();
        this.watchForVisibility();
    }
    componentDidUpdate() {
        this.updateSelectedTime();
        this.cacheColumnRefs();
        this.scrollToSelected();
    }
    disconnectedCallback() {
        this.visibilityObserver?.disconnect();
        this.visibilityObserver = undefined;
    }
    watchForVisibility() {
        if (typeof IntersectionObserver === 'undefined')
            return;
        // When the timepicker transitions from 0 intersection ratio (hidden)
        // to > 0 (popup opened), its columns finally have a non-zero height
        // and we can snap to the selected row. Disconnect after one hit.
        this.visibilityObserver = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    this.cacheColumnRefs();
                    this.scrollToSelected();
                    this.visibilityObserver?.disconnect();
                    this.visibilityObserver = undefined;
                    break;
                }
            }
        });
        this.visibilityObserver.observe(this.host);
    }
    render() {
        return (h("div", { key: 'd418e04044a7d82cf6dc909d9d6058c364be9c6c', class: "time-section" }, h("div", { key: 'db7a29a243cf50a301f0e45960fb33bbe923936c', class: "header" }, this.selectedTime), h("div", { key: 'a72429096799af680a8883b549d690f1f85ecefe', class: "time-contents" }, h("div", { key: '4644ecaf054627d092ad6c1b56c56d22f9977846', class: "time-column hour" }, this.renderTimeColumn('hour', 24, this.internalHour)), h("div", { key: '0f8d3a69f10c1f63ee76caf2ca0a1dcea699b0ae', class: "time-column minute" }, this.renderTimeColumn('minute', 60, this.internalMinute)), h("div", { key: '06b9553e9c9bea0fcbc76a2cf4c0218ae332b383', class: "time-column second" }, this.renderTimeColumn('second', 60, this.internalSecond))), !this.hideButton ? (h("div", { class: "calendar-footer" }, h("sy-button", { variant: "primary", size: "small", onClick: this.confirmSelection }, "OK"))) : null));
    }
    confirmSelection = () => {
        // closable = true
        this.selected.emit({
            closable: true,
            hour: this.internalHour,
            minute: this.internalMinute,
            second: this.internalSecond,
            range: undefined
        });
    };
    renderTimeColumn(type, max, selected) {
        const items = [];
        for (let i = 0; i < max; i++) {
            const value = i < 10 ? `0${i}` : `${i}`;
            const isSelected = selected === i;
            items.push(h("div", { class: `time-item ${isSelected ? 'selected' : ''}`, onClick: () => this.selectTime(type, i) }, value));
        }
        items.push(h("div", { class: `${type} time-padding-bottom` }));
        return items;
    }
    selectTime = (type, value) => {
        // Update internal state instead of props
        if (type === 'hour') {
            this.internalHour = value;
        }
        else if (type === 'minute') {
            this.internalMinute = value;
        }
        else {
            this.internalSecond = value;
        }
        // Emit changed event for parent to update props if needed
        this.changed.emit({
            hour: this.internalHour,
            minute: this.internalMinute,
            second: this.internalSecond
        });
        // selected 이벤트도 발생 (closable: false)
        this.selected.emit({
            closable: false,
            hour: this.internalHour,
            minute: this.internalMinute,
            second: this.internalSecond,
            range: undefined
        });
    };
    updateSelectedTime() {
        // format에 따라 시간을 포맷팅
        const hour = this.internalHour < 10 ? '0' + this.internalHour : this.internalHour.toString();
        const minute = this.internalMinute < 10 ? '0' + this.internalMinute : this.internalMinute.toString();
        const second = this.internalSecond < 10 ? '0' + this.internalSecond : this.internalSecond.toString();
        // format 패턴에 따라 시간 문자열 생성
        let formattedTime = this.format;
        // hh -> hour, mm -> minute, ss -> second 치환
        formattedTime = formattedTime.replace(/hh/g, hour);
        formattedTime = formattedTime.replace(/mm/g, minute);
        formattedTime = formattedTime.replace(/ss/g, second);
        this.selectedTime = formattedTime;
    }
    cacheColumnRefs() {
        if (!this.hourColumn) {
            this.hourColumn = this.host.querySelector('.time-column.hour');
        }
        if (!this.minuteColumn) {
            this.minuteColumn = this.host.querySelector('.time-column.minute');
        }
        if (!this.secondColumn) {
            this.secondColumn = this.host.querySelector('.time-column.second');
        }
    }
    scrollToSelected() {
        if (this.hourColumn) {
            this.scrollToIndex(this.hourColumn, this.internalHour);
        }
        if (this.minuteColumn) {
            this.scrollToIndex(this.minuteColumn, this.internalMinute);
        }
        if (this.secondColumn) {
            this.scrollToIndex(this.secondColumn, this.internalSecond);
        }
    }
    scrollToIndex(column, index) {
        const firstItem = column.querySelector('.time-item');
        if (!firstItem)
            return;
        const attempt = (remainingRetries) => {
            const itemHeight = firstItem.offsetHeight;
            // If the column hasn't been laid out yet (hidden popup, display:none
            // ancestor, etc.) offsetHeight is 0 — retry on the next frame until
            // the column actually has height, or we run out of retries.
            if (itemHeight <= 0) {
                if (remainingRetries > 0) {
                    requestAnimationFrame(() => attempt(remainingRetries - 1));
                }
                return;
            }
            const top = itemHeight * index;
            // `scrollTop` is more reliable than `scrollTo({ behavior: 'smooth' })`
            // on a just-shown container — smooth animation from the current
            // scrollTop (often 0) can race with the popup's own transition.
            column.scrollTop = top;
        };
        attempt(20);
    }
    static get style() { return syTimepickerCss; }
}, [258, "sy-timepicker", {
        "hour": [2],
        "minute": [2],
        "second": [2],
        "hideButton": [1028, "hidebutton"],
        "timeSeparator": [1025, "timeseparator"],
        "format": [1],
        "selectedTime": [32],
        "internalHour": [32],
        "internalMinute": [32],
        "internalSecond": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-timepicker", "sy-button"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-timepicker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTimePicker);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyTimePicker as S, defineCustomElement as d };
