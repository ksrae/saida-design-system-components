import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$4 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$3 } from './p-H6hwOjjT.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$1 } from './p-D83RAFCG.js';

const syDateTimeCalendarCss = ".sc-sy-date-time-calendar-h .datetime-container.sc-sy-date-time-calendar{display:flex;flex-direction:row;align-items:stretch;box-sizing:border-box}.sc-sy-date-time-calendar-h .datetime-calendar-container.sc-sy-date-time-calendar{display:flex;flex-direction:column;flex-grow:1;box-sizing:border-box;width:auto}.sc-sy-date-time-calendar-h .datetime-calendar-container.sc-sy-date-time-calendar .calendar-footer.sc-sy-date-time-calendar{display:flex;height:37px}.sc-sy-date-time-calendar-h .time-picker-container.sc-sy-date-time-calendar{display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;width:160px;border-left:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}.sc-sy-date-time-calendar-h .time-section.sc-sy-date-time-calendar{box-sizing:border-box;border-left:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}.sc-sy-date-time-calendar-h .calendar-footer.sc-sy-date-time-calendar{display:flex;justify-content:flex-end;padding:var(--spacing-2xsmall) var(--spacing-xsmall);box-sizing:border-box;border-top:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}";

const SyDateTimeCalendar = /*@__PURE__*/ proxyCustomElement(class SyDateTimeCalendar extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    mode = 'day';
    datetime = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds()
    };
    dateNames = 'Su,Mo,Tu,We,Th,Fr,Sa';
    mondayStart = false;
    hideWeekend = false;
    selected;
    hasInitialSelection = false;
    internalDatetime;
    watchDatetime(newVal) {
        this.hasInitialSelection = !!(newVal && newVal.day !== undefined);
        this.internalDatetime = { ...newVal };
    }
    componentWillLoad() {
        this.dateNames = fnAssignPropFromAlias(this.host, 'date-names') ?? this.dateNames;
        this.mondayStart = fnAssignPropFromAlias(this.host, 'monday-start') ?? this.mondayStart;
        this.hideWeekend = fnAssignPropFromAlias(this.host, 'hide-weekend') ?? this.hideWeekend;
        this.hasInitialSelection = !!(this.datetime && this.datetime.day !== undefined);
        if (!this.hasInitialSelection) {
            const now = new Date();
            this.internalDatetime = {
                year: now.getFullYear(),
                month: now.getMonth(),
                day: now.getDate(),
                hour: now.getHours(),
                minute: now.getMinutes(),
                second: now.getSeconds()
            };
        }
        else {
            this.internalDatetime = { ...this.datetime };
        }
    }
    render() {
        const now = new Date();
        return (h("div", { key: 'f6178e0a1b5a1f5304dd0654fd2beb4d5d6a0258', class: "datetime-container" }, h("div", { key: 'd84b63a20737efb8e6b289a62013907d2e36e816', class: "datetime-calendar-container" }, h("sy-date-calendar", { key: 'cf7099dff0f6509487d0b77590ae3fedeaa83384', mode: this.mode, dateNames: this.dateNames, datetime: this.internalDatetime, active: "", hoverDate: "", mondayStart: this.mondayStart, hideWeekend: this.hideWeekend, onSelected: this.handleDateSelected })), h("div", { key: 'b6b0d636edc7be471abc58678974ff9c6c521a9a', class: "time-picker-container" }, h("sy-timepicker", { key: 'f2811949ff3fd680ac258cd41fb99fab5ff3a33e', hour: (this.hasInitialSelection && this.internalDatetime) ? this.internalDatetime.hour : now.getHours(), minute: (this.hasInitialSelection && this.internalDatetime) ? this.internalDatetime.minute : now.getMinutes(), second: (this.hasInitialSelection && this.internalDatetime) ? this.internalDatetime.second : now.getSeconds(), hideButton: true, onChanged: this.handleTimeChanged }), h("div", { key: 'd67fb9982a1039082227326a936573a8dfb41c34', class: "calendar-footer" }, h("sy-button", { key: 'eb73d6f8d8ff423bf3b369e25eb15f54913c6542', variant: "primary", size: "small", onClick: this.confirmSelection }, "OK")))));
    }
    handleDateSelected = (event) => {
        event.stopPropagation();
        const { year, month, day } = event.detail;
        let hour, minute, second;
        if (this.hasInitialSelection && this.internalDatetime) {
            hour = this.internalDatetime.hour;
            minute = this.internalDatetime.minute;
            second = this.internalDatetime.second;
        }
        else {
            const now = new Date();
            hour = now.getHours();
            minute = now.getMinutes();
            second = now.getSeconds();
        }
        this.internalDatetime = { year, month, day, hour, minute, second };
        this.hasInitialSelection = true;
        this.selected.emit({
            closable: false,
            ...this.internalDatetime,
        });
    };
    handleTimeChanged = (event) => {
        event.stopPropagation();
        const { hour, minute, second } = event.detail;
        const year = this.internalDatetime?.year ?? new Date().getFullYear();
        const month = this.internalDatetime?.month ?? new Date().getMonth();
        const day = this.internalDatetime?.day ?? new Date().getDate();
        this.internalDatetime = { year, month, day, hour, minute, second };
    };
    confirmSelection = () => {
        if (!this.hasInitialSelection) {
            const now = new Date();
            this.internalDatetime = {
                year: now.getFullYear(),
                month: now.getMonth(),
                day: now.getDate(),
                hour: this.internalDatetime?.hour ?? now.getHours(),
                minute: this.internalDatetime?.minute ?? now.getMinutes(),
                second: this.internalDatetime?.second ?? now.getSeconds(),
            };
        }
        this.selected.emit({
            closable: true,
            ...this.internalDatetime,
            range: undefined
        });
    };
    static get watchers() { return {
        "datetime": ["watchDatetime"]
    }; }
    static get style() { return syDateTimeCalendarCss; }
}, [258, "sy-date-time-calendar", {
        "mode": [1],
        "datetime": [16],
        "dateNames": [1025, "datenames"],
        "mondayStart": [1028, "mondaystart"],
        "hideWeekend": [1028, "hideweekend"],
        "hasInitialSelection": [32],
        "internalDatetime": [32]
    }, undefined, {
        "datetime": ["watchDatetime"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-date-time-calendar", "sy-button", "sy-date-calendar", "sy-icon", "sy-timepicker"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-date-time-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyDateTimeCalendar);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-date-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-icon":
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

export { SyDateTimeCalendar as S, defineCustomElement as d };
