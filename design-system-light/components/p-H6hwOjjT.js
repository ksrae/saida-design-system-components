import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$2 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syDateCalendarCss = "@charset \"UTF-8\";.sc-sy-date-calendar-h .datetime-container.sc-sy-date-calendar{display:flex;flex-direction:row;align-items:stretch;box-sizing:border-box}.sc-sy-date-calendar-h .datetime-container.sc-sy-date-calendar .calendar-footer.sc-sy-date-calendar{display:flex !important;height:36px}.sc-sy-date-calendar-h .date-calendar-container.sc-sy-date-calendar{display:flex;align-items:center;flex-direction:column;height:100%}.sc-sy-date-calendar-h .time-picker-container.sc-sy-date-calendar{display:flex;flex-direction:column;box-sizing:border-box;height:inherit}.sc-sy-date-calendar-h .time-picker-container.sc-sy-date-calendar .calendar-footer.sc-sy-date-calendar{height:36px;display:flex;justify-content:flex-end;padding:var(--spacing-2xsmall) var(--spacing-xsmall);box-sizing:border-box;border-top:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}.sc-sy-date-calendar-h .calendar-header.sc-sy-date-calendar{display:flex;align-items:center;height:36px;gap:4px;justify-content:space-between;width:100%;padding:var(--spacing-2xsmall) var(--spacing-xsmall);box-sizing:border-box;border-bottom:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}.sc-sy-date-calendar-h .calendar-header.sc-sy-date-calendar sy-icon.sc-sy-date-calendar{color:var(--date-time-picker-calendar-container-header-icon-enabled);cursor:pointer}.sc-sy-date-calendar-h .calendar-header.sc-sy-date-calendar sy-icon.sc-sy-date-calendar:hover{color:var(--date-time-picker-calendar-container-header-icon-hover)}.sc-sy-date-calendar-h .calendar-header.sc-sy-date-calendar .calendar-header-privious.sc-sy-date-calendar{display:flex;align-items:center;gap:var(--spacing-3xsmal)}.sc-sy-date-calendar-h .calendar-header.sc-sy-date-calendar .calendar-title.sc-sy-date-calendar{padding-left:var(--spacing-xsmall);padding-right:var(--spacing-xsmall);cursor:pointer;color:var(--date-time-picker-calendar-container-header-text-enabled);font-family:\"Roboto\";font-size:14px;font-weight:500;line-height:22px;letter-spacing:0.25px}.sc-sy-date-calendar-h .calendar-header.sc-sy-date-calendar .calendar-title.sc-sy-date-calendar:hover{color:var(--date-time-picker-calendar-container-header-text-hover)}.sc-sy-date-calendar-h .calendar-header.sc-sy-date-calendar .calendar-header-next.sc-sy-date-calendar{display:flex;align-items:center;gap:var(--spacing-3xsmal)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar{row-gap:var(--spacing-3xsmall);display:flex;flex:1;box-sizing:border-box;flex-direction:column;padding:var(--spacing-xsmall)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar{width:224px;display:flex;align-items:center;justify-content:space-between}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar li.sc-sy-date-calendar{display:flex;justify-content:center;align-items:center;box-sizing:border-box;width:32px}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar ul.sc-sy-date-calendar,.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar li.sc-sy-date-calendar{margin:0;padding:0;list-style:none}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar{display:grid;flex:1;justify-content:space-between}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar .current-month.sc-sy-date-calendar .date-item.sc-sy-date-calendar{display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:24px;height:24px;color:var(--date-time-picker-calendar-menu-item-text-enabled)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar .current-month.sc-sy-date-calendar:hover .date-item.sc-sy-date-calendar{border-radius:var(--border-radius-small);background-color:var(--date-time-picker-calendar-menu-item-background-hover);cursor:pointer}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar .current-month.highlight-start.sc-sy-date-calendar:hover .date-item.sc-sy-date-calendar,.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar .current-month.highlight-end.sc-sy-date-calendar:hover .date-item.sc-sy-date-calendar{background-color:transparent}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .not-current-month.sc-sy-date-calendar .date-item.sc-sy-date-calendar{display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:24px;height:24px;color:var(--date-time-picker-calendar-container-body-text-disabled)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-selected].sc-sy-date-calendar .date-item.sc-sy-date-calendar{border-radius:var(--border-radius-small);color:var(--date-time-picker-calendar-menu-item-text-selected);background-color:var(--date-time-picker-calendar-menu-item-background-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-selected].sc-sy-date-calendar .date-item.sc-sy-date-calendar:hover{color:var(--date-time-picker-calendar-menu-item-text-selected);background-color:var(--date-time-picker-calendar-menu-item-background-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-rangestart].sc-sy-date-calendar .date-item.sc-sy-date-calendar,.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-rangeend].sc-sy-date-calendar .date-item.sc-sy-date-calendar{background-color:var(--background-brand-contrast-subtle);color:var(--date-time-picker-calendar-menu-item-text-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-rangestart].sc-sy-date-calendar .date-item.sc-sy-date-calendar:hover,.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-rangeend].sc-sy-date-calendar .date-item.sc-sy-date-calendar:hover{background-color:var(--background-brand-contrast-subtle);color:var(--date-time-picker-calendar-menu-item-text-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight-start[data-rangestart].sc-sy-date-calendar:hover .date-item.sc-sy-date-calendar,.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight-start[data-rangeend].sc-sy-date-calendar:hover .date-item.sc-sy-date-calendar{background-color:var(--background-brand-contrast-subtle);color:var(--date-time-picker-calendar-menu-item-text-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-rangestart].sc-sy-date-calendar{position:relative}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-rangestart].sc-sy-date-calendar:before{content:\"\";position:absolute;display:flex;width:17px;height:24px;left:50%;z-index:-1;background-color:var(--background-brand-default)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-rangeend].sc-sy-date-calendar{position:relative}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-rangeend].sc-sy-date-calendar:before{content:\"\";position:absolute;display:flex;width:17px;height:24px;right:50%;z-index:-1;background-color:var(--background-brand-default)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-inrange].sc-sy-date-calendar{background-color:var(--background-brand-default)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month[data-inrange].sc-sy-date-calendar .date-item.sc-sy-date-calendar{background-color:var(--background-brand-default)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight.sc-sy-date-calendar{position:relative}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight.sc-sy-date-calendar:after{content:\"\";display:flex;width:36px;height:24px;position:absolute;top:50%;z-index:0;border-top:1px dashed var(--date-time-picker-calendar-container-body-border-selected) !important;border-bottom:1px dashed var(--date-time-picker-calendar-container-body-border-selected) !important;transform:translateY(-50%);transition:all 0.3s;content:\"\";box-sizing:border-box}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight.sc-sy-date-calendar .date-item.sc-sy-date-calendar:hover{background-color:transparent}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight[data-inrange].sc-sy-date-calendar{background-color:var(--date-time-picker-calendar-time-item-background-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight[data-inrange].sc-sy-date-calendar .date-item.sc-sy-date-calendar{background-color:var(--date-time-picker-calendar-time-item-background-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight[data-inrange].sc-sy-date-calendar:after{border:transparent}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight[data-inrange].sc-sy-date-calendar:first-child:after{border-left:1px dashed transparent;border-right:1px dashed transparent}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight[data-inrange].sc-sy-date-calendar:last-child:after{border-left:1px dashed transparent;border-right:1px dashed transparent}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight.sc-sy-date-calendar:first-child:after{border-left:1px dashed var(--date-time-picker-calendar-container-body-border-selected);border-right:1px dashed transparent;border-bottom-left-radius:var(--border-radius-small)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight.sc-sy-date-calendar:last-child:after{border-left:1px dashed transparent;border-right:1px dashed var(--date-time-picker-calendar-container-body-border-selected);border-bottom-right-radius:var(--border-radius-small)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight-start.sc-sy-date-calendar{position:relative}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight-start.sc-sy-date-calendar:after{content:\"\";display:flex;position:absolute;width:34px;height:24px;top:50%;left:0px;z-index:0;border-right:1px dashed transparent;border-left:1px dashed var(--date-time-picker-calendar-container-body-border-selected);border-top:1px dashed var(--date-time-picker-calendar-container-body-border-selected);border-bottom:1px dashed var(--date-time-picker-calendar-container-body-border-selected);border-bottom-left-radius:var(--border-radius-small);transform:translateY(-50%);transition:all 0.3s;content:\"\";box-sizing:border-box}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight-end.sc-sy-date-calendar{position:relative}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .current-month.highlight-end.sc-sy-date-calendar:after{content:\"\";display:flex;position:absolute;width:34px;height:24px;top:50%;left:0px;z-index:0;border-left:1px dashed transparent;border-right:1px dashed var(--date-time-picker-calendar-container-body-border-selected);border-top:1px dashed var(--date-time-picker-calendar-container-body-border-selected);border-bottom:1px dashed var(--date-time-picker-calendar-container-body-border-selected);border-bottom-right-radius:var(--border-radius-small);transform:translateY(-50%);transition:all 0.3s;content:\"\";box-sizing:border-box}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar li[data-selected].sc-sy-date-calendar .date-item.sc-sy-date-calendar,.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar li[data-selected][data-today].sc-sy-date-calendar .date-item.sc-sy-date-calendar{background-color:var(--date-time-picker-calendar-menu-item-background-selected);color:var(--date-time-picker-calendar-menu-item-text-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar li[data-selected].sc-sy-date-calendar .date-item.sc-sy-date-calendar:hover,.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar li[data-selected][data-today].sc-sy-date-calendar .date-item.sc-sy-date-calendar:hover{background-color:var(--date-time-picker-calendar-menu-item-background-selected);color:var(--date-time-picker-calendar-menu-item-text-selected)}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar li[data-today].sc-sy-date-calendar .date-item.sc-sy-date-calendar{border-radius:var(--border-radius-small);border:1px solid var(--date-time-picker-calendar-menu-item-border-current);color:var(--date-time-picker-calendar-menu-item-text-enabled);z-index:1}.sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar li.sc-sy-date-calendar .date-item.sc-sy-date-calendar:hover{border-radius:var(--border-radius-small);background-color:var(--date-time-picker-calendar-menu-item-background-hover);cursor:pointer}.sc-sy-date-calendar-h .calendar-footer.sc-sy-date-calendar{display:flex;height:36px;align-items:center;gap:4px;justify-content:center;width:100%;padding:var(--spacing-2xsmall) var(--spacing-xsmall);box-sizing:border-box;border-top:1px solid var(--date-time-picker-calendar-container-body-border-enabled)}.sc-sy-date-calendar-h:not([range]) .calendar-grid.sc-sy-date-calendar .current-month.sc-sy-date-calendar:hover .date-item.sc-sy-date-calendar{border:1px solid var(--date-time-picker-input-field-border-hover);border-radius:var(--border-radius-small)}.sc-sy-date-calendar-h:not([range]) .calendar-grid.sc-sy-date-calendar .current-month.highlight.sc-sy-date-calendar::after,.sc-sy-date-calendar-h:not([range]) .calendar-grid.sc-sy-date-calendar .current-month.highlight-start.sc-sy-date-calendar::after,.sc-sy-date-calendar-h:not([range]) .calendar-grid.sc-sy-date-calendar .current-month.highlight-end.sc-sy-date-calendar::after{display:none !important}[mode=year].sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar{row-gap:0}[mode=year].sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar{padding:var(--spacing-xsmall) 0}[mode=year].sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .date-item.sc-sy-date-calendar{display:flex;width:60px;height:24px;align-items:center;justify-content:center}[mode=month].sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar{row-gap:0}[mode=month].sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar{min-height:48px}[mode=month].sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .date-item.sc-sy-date-calendar{display:flex;width:60px;height:24px;align-items:center;justify-content:center;box-sizing:border-box}[mode=day].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar{grid-template-columns:repeat(7, 1fr)}[mode=week].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar{grid-template-columns:repeat(8, 1fr);min-height:48px}[mode=month].sc-sy-date-calendar-h .calendar-footer.sc-sy-date-calendar,[mode=year].sc-sy-date-calendar-h .calendar-footer.sc-sy-date-calendar{display:none}[mode=month].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar,[mode=year].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar,[mode=decade].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar{grid-template-columns:repeat(3, 1fr)}[mode=day].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar li.sc-sy-date-calendar{height:24px}[mode=day].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar li.day-header.sc-sy-date-calendar:hover{cursor:text}[mode=week].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar li.sc-sy-date-calendar{height:30px}[mode=month].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar li.sc-sy-date-calendar,[mode=year].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar li.sc-sy-date-calendar,[mode=decade].sc-sy-date-calendar-h .calendar-grid.sc-sy-date-calendar li.sc-sy-date-calendar{min-width:60px;height:30px;width:100%}[mode=week].sc-sy-date-calendar-h .week-hoverable.sc-sy-date-calendar:hover li.sc-sy-date-calendar{background-color:var(--date-time-picker-calendar-time-item-background-hove)}[range=start].sc-sy-date-calendar-h .calendar-footer.sc-sy-date-calendar{display:none}[range=end].sc-sy-date-calendar-h .calendar-footer.sc-sy-date-calendar{display:none}[mode=decade].sc-sy-date-calendar-h .date-item.sc-sy-date-calendar{width:75px;text-align:center}[mode=day][hideweekend].sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar{grid-template-columns:repeat(5, 1fr)}[mode=day][hideweekend].sc-sy-date-calendar-h .calendar-content.sc-sy-date-calendar .calendar-grid.sc-sy-date-calendar li.sc-sy-date-calendar{width:auto}";

const SyDateCalendar = /*@__PURE__*/ proxyCustomElement(class SyDateCalendar extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.selected = createEvent(this, "selected");
        this.entered = createEvent(this, "entered");
        this.modeChanged = createEvent(this, "mode-changed");
    }
    get host() { return this; }
    today = new Date();
    inrange = false;
    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
    }
    _mode = 'day';
    datetime = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds()
    };
    range;
    active;
    rangestart;
    rangeend;
    hoverDate;
    dateNames = 'Su,Mo,Tu,We,Th,Fr,Sa';
    mondayStart = false;
    hideWeekend = false;
    currentDate = new Date();
    changed;
    selected;
    entered;
    modeChanged;
    preMode = '';
    originalDatetime;
    componentWillLoad() {
        this.dateNames = fnAssignPropFromAlias(this.host, 'date-names') ?? this.dateNames;
        this.mondayStart = fnAssignPropFromAlias(this.host, 'monday-start') ?? this.mondayStart;
        this.hideWeekend = fnAssignPropFromAlias(this.host, 'hide-weekend') ?? this.hideWeekend;
        this.originalDatetime = {
            year: this.datetime?.year ?? new Date().getFullYear(),
            month: this.datetime?.month ?? new Date().getMonth(),
            day: this.datetime?.day ?? new Date().getDate(),
            hour: this.datetime?.hour ?? new Date().getHours(),
            minute: this.datetime?.minute ?? new Date().getMinutes(),
            second: this.datetime?.second ?? new Date().getSeconds()
        };
        if (!this.currentDate) {
            const { year, month, day } = this.originalDatetime;
            this.currentDate = new Date(year, month, day);
        }
        // Read intentionally-kept members to satisfy TypeScript's `noUnusedLocals`.
        // These members are kept for API symmetry and possible future use.
        this._markUsedMembers();
    }
    watchRangeChanges() {
        if (this.rangestart && this.rangeend) {
            const startDate = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
            const endDate = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);
            this.inrange = startDate <= endDate;
        }
        else {
            this.inrange = false;
        }
    }
    watchDatetime() {
        if (!this.range) {
            if (this.datetime?.year !== undefined && this.datetime.month !== undefined && this.datetime?.day !== undefined) {
                this.currentDate = new Date(this.datetime.year, this.datetime.month, this.datetime.day);
            }
        }
    }
    watchOriginalDatetime() {
        if (!this.range) {
            if (this.originalDatetime &&
                typeof this.originalDatetime.year === 'number' &&
                typeof this.originalDatetime.month === 'number') {
                const { year, month, day } = this.originalDatetime;
                this.currentDate = new Date(year, month, day);
            }
        }
    }
    watchHoverDate() {
        this.setHoverStyle();
    }
    render() {
        return (h("div", { key: '29c8e16e39eb38921f8f92460532c42c8c0d08be', class: "date-calendar-container" }, h("div", { key: '2c1833fc1bec1bcaf3ff914602f4c09af16fe92c', class: "calendar-header" }, h("div", { key: '0f8516452614a1b0e797f674abb7c6d6912a446d', class: "calendar-header-privious" }, this.mode === 'day' ? h("sy-icon", { size: "medium", onClick: this.prevMonth }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M103.5 303C94.1 312.4 94.1 327.6 103.5 336.9L303.5 536.9C312.9 546.3 328.1 546.3 337.4 536.9C346.7 527.5 346.8 512.3 337.4 503L154.4 320L337.4 137C346.8 127.6 346.8 112.4 337.4 103.1C328 93.8 312.8 93.7 303.5 103.1L103.5 303zM495.5 103L295.5 303C286.1 312.4 286.1 327.6 295.5 336.9L495.5 536.9C504.9 546.3 520.1 546.3 529.4 536.9C538.7 527.5 538.8 512.3 529.4 503L346.4 320L529.4 137C538.8 127.6 538.8 112.4 529.4 103.1C520 93.8 504.8 93.7 495.5 103.1z" }))) : null, this.mode === 'day' ? h("sy-icon", { size: "medium", onClick: this.prevMonth }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M207.5 303C198.1 312.4 198.1 327.6 207.5 336.9L367.5 496.9C376.9 506.3 392.1 506.3 401.4 496.9C410.7 487.5 410.8 472.3 401.4 463L258.4 320L401.4 177C410.8 167.6 410.8 152.4 401.4 143.1C392 133.8 376.8 133.7 367.5 143.1L207.5 303z" }))) : null), h("div", { key: '93764ca46fd40bca0beab3cde1e24c3353d7fae9', class: "calendar-title" }, this.setHeaderText()), h("div", { key: 'cff8030ac61a2356d5729a9a059586e590183f12', class: "calendar-header-next" }, this.mode === 'day' ? h("sy-icon", { size: "medium", onClick: this.nextMonth }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z" }))) : null, h("sy-icon", { key: '38e95cc476495d3da391859f15b1a078629dba5c', size: "medium", onClick: this.setPost }, h("svg", { key: '28dfe3dc869a3e84320e88135a3c3c4617dff131', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '60866a3e2b47f2a5870dcbcabfed2ef23185b6f6', fill: "currentColor", d: "M177.5 497L337.5 337C346.9 327.6 346.9 312.4 337.5 303.1L177.5 143C168.1 133.6 152.9 133.6 143.6 143C134.3 152.4 134.2 167.6 143.6 176.9L286.6 319.9L143.6 462.9C134.2 472.3 134.2 487.5 143.6 496.8C153 506.1 168.2 506.2 177.5 496.8zM369.5 497L529.5 337C538.9 327.6 538.9 312.4 529.5 303.1L369.5 143C360.1 133.6 344.9 133.6 335.6 143C326.3 152.4 326.2 167.6 335.6 176.9L478.6 319.9L335.6 462.9C326.2 472.3 326.2 487.5 335.6 496.8C345 506.1 360.2 506.2 369.5 496.8z" }))))), h("div", { key: 'c4bae7b12a51cb6f038324cd2a256de62cbf2e63', class: "calendar-content", onMouseLeave: this.range ? this.handleMouseLeave : null }, this.mode === 'day' ? (h("ul", { class: "calendar-grid" }, this.renderDayNames())) : null, this.generateCalendarDays()), h("div", { key: '7fca50669912942e8f61b2907e8d80d2408213c1', class: "calendar-footer" }, this.mode === 'day' && !this.range ? (
        // The footer already has `border-top` in SCSS — a second `<sy-divider>` was
        // redundant, and its default `margin: 1rem 0` overflowed the 36px-tall footer,
        // which pushed the Now button below the calendar and caused an iframe scroll.
        h("sy-button", { size: "small", variant: "borderless", onClick: this.handleToday }, "Now")) : null)));
    }
    generateCalendarDays() {
        if (this.mode === 'decade')
            return this.generateDecades();
        else if (this.mode === 'year')
            return this.generateYears();
        else if (this.mode === 'month')
            return this.generateMonths();
        return this.generateDays();
    }
    generateDecades() {
        const decades = [];
        const currentCenturyStart = Math.floor(this.currentDate?.getFullYear() / 100) * 100;
        for (let i = currentCenturyStart - 10; i <= currentCenturyStart + 100; i += 10) {
            const isSelected = this.datetime?.year >= i && this.datetime?.year <= i + 9;
            const isToday = new Date().getFullYear() >= i && new Date().getFullYear() <= i + 9;
            const isNotCurrentMonth = i === currentCenturyStart - 10 || i === currentCenturyStart + 100;
            const decade = (h("li", { class: isNotCurrentMonth ? 'not-current-month' : '', "data-selected": isSelected ? '' : undefined, "data-today": isToday ? '' : undefined, onClick: () => {
                    if (i === currentCenturyStart - 10) {
                        this.prevDecade();
                        this.selectDecade(i);
                    }
                    else if (i === currentCenturyStart + 100) {
                        this.nextDecade();
                        this.selectDecade(i);
                    }
                    else {
                        this.selectDecade(i);
                    }
                } }, h("span", { class: "date-item" }, i, "-", i + 9)));
            decades.push(decade);
        }
        const rows = [];
        for (let i = 0; i < decades.length; i += 3) {
            rows.push(h("ul", { class: "calendar-grid" }, decades.slice(i, i + 3)));
        }
        return rows;
    }
    generateYears() {
        const years = [];
        const startDecade = Math.floor(this.currentDate?.getFullYear() / 10) * 10;
        for (let i = startDecade - 1; i <= startDecade + 10; i++) {
            const isSelected = i === this.datetime?.year;
            const isToday = i === this.today.getFullYear();
            const isNotCurrentMonth = i === startDecade - 1 || i === startDecade + 10;
            const year = (h("li", { class: isNotCurrentMonth ? 'not-current-month' : '', "data-selected": isSelected ? '' : undefined, "data-today": isToday ? '' : undefined, onMouseEnter: () => this.range ? this.setHoverEvent(String(i)) : null, onClick: () => {
                    if (i === startDecade - 1) {
                        this.prevYear();
                        this.selectYear(i, false);
                    }
                    else if (i === startDecade + 10) {
                        this.nextYear();
                        this.selectYear(i, false);
                    }
                    else {
                        this.selectYear(i);
                    }
                } }, h("span", { class: "date-item" }, i)));
            years.push(year);
        }
        const rows = [];
        for (let i = 0; i < years.length; i += 3) {
            rows.push(h("ul", { class: "calendar-grid" }, years.slice(i, i + 3)));
        }
        return rows;
    }
    generateMonths() {
        const months = [];
        for (let i = 0; i < 12; i++) {
            const year = this.currentDate?.getFullYear();
            const isSelected = year === this.datetime?.year && i === this.datetime?.month;
            const isToday = year === this.today.getFullYear() && i === this.today.getMonth();
            const monthDate = new Date(year, i, 1);
            const monthValue = Number(monthDate.getFullYear().toString() + (i + 1).toString().padStart(2, '0') + '01');
            const month = (h("li", { "data-selected": isSelected ? '' : undefined, "data-today": isToday ? '' : undefined, onMouseEnter: () => this.range ? this.setHoverEvent(String(monthValue)) : null, onClick: () => this.selectMonth(i) }, h("span", { class: "date-item" }, new Date(0, i).toLocaleString('default', { month: 'short' }))));
            months.push(month);
        }
        const rows = [];
        for (let i = 0; i < months.length; i += 3) {
            rows.push(h("ul", { class: "calendar-grid" }, months.slice(i, i + 3)));
        }
        return rows;
    }
    renderDayNames() {
        if (this.mode !== 'day')
            return null;
        let dayNames = this.dateNames.split(',').map(name => name.trim());
        if (this.hideWeekend) {
            dayNames = this.mondayStart ? dayNames.slice(1, 6) : dayNames.slice(1, 6);
        }
        else if (this.mondayStart) {
            dayNames = [...dayNames.slice(1), dayNames[0]];
        }
        return dayNames.map(name => h("li", { class: "day-header" }, name));
    }
    generateDays() {
        const days = [];
        const year = this.currentDate?.getFullYear();
        const month = this.currentDate?.getMonth();
        const numDays = this.daysInMonth;
        const daysPerWeek = this.hideWeekend ? 5 : 7;
        let firstDay = this.firstDayOfMonth;
        let startDay;
        if (this.hideWeekend) {
            if (firstDay === 0 || firstDay === 6)
                startDay = 0;
            else
                startDay = firstDay - 1;
        }
        else if (this.mondayStart) {
            startDay = firstDay === 0 ? 6 : firstDay - 1;
        }
        else {
            startDay = firstDay;
        }
        let isRangeValid = true;
        if (this.rangestart && this.rangeend) {
            const startDate = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
            const endDate = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);
            isRangeValid = startDate <= endDate;
        }
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = 0; i < startDay; i++) {
            const dayOffset = startDay - i - 1;
            const preDate = prevMonthDays - dayOffset;
            const preMonth = month === 0 ? 11 : month - 1;
            const preYear = month === 0 ? year - 1 : year;
            if (this.hideWeekend) {
                const tempDate = new Date(preYear, preMonth, preDate);
                const dayOfWeek = tempDate.getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6)
                    continue;
            }
            days.push(h("li", { class: "not-current-month", onClick: () => {
                    this.prevMonth();
                    this.selectDate(preYear, preMonth, preDate, false);
                } }, h("span", { class: "date-item" }, preDate)));
        }
        for (let day = 1; day <= numDays; day++) {
            if (this.hideWeekend) {
                const tempDate = new Date(year, month, day);
                const dayOfWeek = tempDate.getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6)
                    continue;
            }
            const isSelected = !this.range && year === this.datetime?.year && month === this.datetime?.month && day === this.datetime?.day;
            const isToday = year === this.today.getFullYear() && month === this.today.getMonth() && day === this.today.getDate();
            const isRangeStartDay = this.rangestart &&
                (year === this.rangestart.year && month === this.rangestart.month && day === this.rangestart.day);
            const isRangeEndDay = this.rangeend &&
                (year === this.rangeend.year && month === this.rangeend.month && day === this.rangeend.day);
            const isOverRangeStart = isRangeValid && this.rangestart && ((year > this.rangestart.year) ||
                (year === this.rangestart.year && month > this.rangestart.month) ||
                (year === this.rangestart.year && month === this.rangestart.month && day > this.rangestart.day));
            const isOverRangeEnd = isRangeValid && this.rangeend && ((year < this.rangeend.year) ||
                (year === this.rangeend.year && month < this.rangeend.month) ||
                (year === this.rangeend.year && month === this.rangeend.month && day < this.rangeend.day));
            const inRangeForThisDay = isOverRangeStart && isOverRangeEnd;
            const dataDate = this.formatTwoDigitDate(year, month, day);
            const liAttrs = {
                class: 'current-month',
                'data-date': dataDate,
                // Dashed highlight overlays are strictly a range-mode preview. Gating the hover
                // handlers on `this.range` prevents `.highlight*` classes from being added in
                // single-select mode, which was colliding with the solid hover border.
                onMouseEnter: this.range ? (() => this.setHoverEvent(dataDate)) : undefined,
                onMouseLeave: this.range ? this.handleMouseLeave : undefined,
                onClick: () => this.selectDate(year, month, day)
            };
            if (isToday)
                liAttrs['data-today'] = '';
            if (isSelected)
                liAttrs['data-selected'] = '';
            if (inRangeForThisDay)
                liAttrs['data-inrange'] = '';
            if (isRangeStartDay)
                liAttrs['data-rangestart'] = '';
            if (isRangeEndDay)
                liAttrs['data-rangeend'] = '';
            days.push(h("li", { ...liAttrs }, h("span", { class: "date-item" }, day)));
        }
        const totalDays = daysPerWeek * 6;
        let nextMonthDay = 1;
        while (days.length < totalDays) {
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextYear = month === 11 ? year + 1 : year;
            if (this.hideWeekend) {
                const tempDate = new Date(nextYear, nextMonth, nextMonthDay);
                const dayOfWeek = tempDate.getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    nextMonthDay++;
                    continue;
                }
            }
            days.push(h("li", { class: "not-current-month", onClick: () => {
                    this.nextMonth();
                    this.selectDate(nextYear, nextMonth, nextMonthDay, false);
                } }, h("span", { class: "date-item" }, nextMonthDay)));
            nextMonthDay++;
        }
        const weeks = [];
        for (let i = 0; i < days.length; i += daysPerWeek) {
            weeks.push(h("ul", { class: "calendar-grid" }, days.slice(i, i + daysPerWeek)));
        }
        return weeks;
    }
    get daysInMonth() {
        return new Date(this.currentDate?.getFullYear(), this.currentDate?.getMonth() + 1, 0).getDate();
    }
    get firstDayOfMonth() {
        return new Date(this.currentDate?.getFullYear(), this.currentDate?.getMonth(), 1).getDay();
    }
    // private setPast = () => {
    //   if(this.mode === 'decade') this.prevCentury();
    //   else if(this.mode === 'year') this.prevDecade();
    //   else this.prevYear();
    // }
    setHeaderText() {
        if (this.mode === 'decade') {
            return h("span", null, Math.floor(this.currentDate?.getFullYear() / 100) * 100, "-", Math.floor(this.currentDate?.getFullYear() / 100) * 100 + 99);
        }
        else if (this.mode === 'year') {
            return h("span", { onClick: this.changeToDecadeView }, Math.floor(this.currentDate?.getFullYear() / 10) * 10, "-", Math.floor(this.currentDate?.getFullYear() / 10) * 10 + 9);
        }
        else if (this.mode === 'month') {
            return h("span", { onClick: this.changeToYearView }, this.currentDate?.getFullYear());
        }
        else { // this.mode === 'day'
            return [
                h("span", { onClick: this.changeToMonthView }, this.currentDate?.toLocaleString('default', { year: 'numeric' })),
                h("span", { onClick: this.changeToMonthView }, this.currentDate?.toLocaleString('default', { month: 'long' }))
            ];
        }
    }
    setPost = () => {
        if (this.mode === 'decade')
            this.nextCentury();
        else if (this.mode === 'year')
            this.nextDecade();
        else
            this.nextYear();
    };
    prevCentury = () => {
        this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate?.getFullYear() - 100));
        this.setHeaderEvent('century');
    };
    // Touch members that are intentionally present but sometimes only referenced
    // dynamically or left for future feature toggles. Reading them here prevents
    // TypeScript from reporting "declared but its value is never read" while
    // keeping runtime behavior unchanged.
    _markUsedMembers() {
    }
    nextCentury = () => {
        this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate?.getFullYear() + 100));
        this.setHeaderEvent('century');
    };
    prevDecade = () => {
        this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate?.getFullYear() - 10));
        this.setHeaderEvent('decade');
    };
    nextDecade = () => {
        this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate?.getFullYear() + 10));
        this.setHeaderEvent('decade');
    };
    prevYear = () => {
        this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate.getFullYear() - 1));
        this.setHeaderEvent('year');
    };
    nextYear = () => {
        this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate.getFullYear() + 1));
        this.setHeaderEvent('year');
    };
    prevMonth = () => {
        let newYear = this.currentDate?.getFullYear();
        let newMonth = this.currentDate?.getMonth() - 1;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        this.currentDate = new Date(newYear, newMonth, 1);
        this.originalDatetime = { ...this.originalDatetime, year: newYear, month: newMonth };
        this.setHeaderEvent('month');
    };
    nextMonth = () => {
        let newYear = this.currentDate?.getFullYear();
        let newMonth = this.currentDate?.getMonth() + 1;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        this.currentDate = new Date(newYear, newMonth, 1);
        this.originalDatetime = { ...this.originalDatetime, year: newYear, month: newMonth };
        this.setHeaderEvent('month');
    };
    changeToDecadeView = () => this.setMode('decade');
    changeToYearView = () => this.setMode('year');
    changeToMonthView = () => this.setMode('month');
    setHoverStyle() {
        const hoverDateNum = Number(this.hoverDate);
        // mode에 따라 다른 selector 사용
        let items;
        if (this.mode === 'day') {
            items = this.host.querySelectorAll('.current-month');
        }
        else {
            // month, year, decade 모드에서는 모든 date-item을 선택
            items = this.host.querySelectorAll('.date-item');
        }
        if (isNaN(hoverDateNum) || hoverDateNum <= 0) {
            this.handleMouseLeave();
            return;
        }
        items?.forEach((item) => {
            const itemElement = this.mode === 'day' ? item : item.parentElement;
            const itemDateNum = Number(this.mode === 'day' ? item.dataset.date : item.textContent);
            // highlight 클래스는 date-item에 적용
            const targetElement = this.mode === 'day' ? itemElement : item;
            targetElement.classList.remove('highlight', 'highlight-start', 'highlight-end');
            if (this.active === 'start') {
                // start에 focus가 있을 때
                if (!this.rangestart && !this.rangeend) {
                    // 1-1. start, end 값이 모두 없을 때
                    if (itemDateNum === hoverDateNum) {
                        targetElement.classList.add('highlight-start');
                    }
                }
                else if (this.rangestart) {
                    // 1-2. start값이 있을 때
                    const startNum = Number(this.formatTwoDigitDate(this.rangestart.year, this.rangestart.month, this.rangestart.day));
                    if (hoverDateNum < startNum) {
                        // 1-2-1. hover한 값이 start보다 작을 때
                        if (itemDateNum === hoverDateNum) {
                            targetElement.classList.add('highlight-start');
                        }
                        else if (itemDateNum === startNum) {
                            targetElement.classList.add('highlight-end');
                        }
                        else if (itemDateNum > hoverDateNum && itemDateNum < startNum) {
                            targetElement.classList.add('highlight');
                        }
                    }
                    else {
                        // 1-2-2. hover한 값이 start보다 클 때
                        if (this.rangeend) {
                            const endNum = Number(this.formatTwoDigitDate(this.rangeend.year, this.rangeend.month, this.rangeend.day));
                            if (hoverDateNum < endNum) {
                                // end 값이 있고 hover한 값이 end 값보다 작다면
                                if (itemDateNum === hoverDateNum) {
                                    targetElement.classList.add('highlight-start');
                                }
                                else if (itemDateNum === endNum) {
                                    targetElement.classList.add('highlight-end');
                                }
                                else if (itemDateNum > hoverDateNum && itemDateNum < endNum) {
                                    targetElement.classList.add('highlight');
                                }
                            }
                            else {
                                // end 값이 있고 hover한 값이 end 값보다 크다면
                                if (itemDateNum === hoverDateNum) {
                                    targetElement.classList.add('highlight-start');
                                }
                            }
                        }
                        else {
                            // end 값이 없는 경우
                            if (itemDateNum === hoverDateNum) {
                                targetElement.classList.add('highlight-start');
                            }
                        }
                    }
                }
                else if (this.rangeend) {
                    // start 값이 없고 end 값만 있을 때
                    const endNum = Number(this.formatTwoDigitDate(this.rangeend.year, this.rangeend.month, this.rangeend.day));
                    if (hoverDateNum < endNum) {
                        // hover한 값이 end 값보다 작다면
                        if (itemDateNum === hoverDateNum) {
                            targetElement.classList.add('highlight-start');
                        }
                        else if (itemDateNum === endNum) {
                            targetElement.classList.add('highlight-end');
                        }
                        else if (itemDateNum > hoverDateNum && itemDateNum < endNum) {
                            targetElement.classList.add('highlight');
                        }
                    }
                    else {
                        // hover한 값이 end 값보다 크거나 같다면
                        if (itemDateNum === hoverDateNum) {
                            targetElement.classList.add('highlight-start');
                        }
                    }
                }
                else {
                    // start, end 값이 모두 없을 때 (중복 처리)
                    if (itemDateNum === hoverDateNum) {
                        targetElement.classList.add('highlight-start');
                    }
                }
            }
            else { // active === 'end'
                // end에 focus가 있을 때
                if (!this.rangestart && !this.rangeend) {
                    // 2-1. start, end 값이 모두 없을 때
                    if (itemDateNum === hoverDateNum) {
                        targetElement.classList.add('highlight-end');
                    }
                }
                else if (this.rangeend) {
                    // 2-2. end값이 있을 때
                    const endNum = Number(this.formatTwoDigitDate(this.rangeend.year, this.rangeend.month, this.rangeend.day));
                    if (hoverDateNum > endNum) {
                        // 2-2-1. hover한 값이 end보다 클 때
                        if (itemDateNum === hoverDateNum) {
                            targetElement.classList.add('highlight-end');
                        }
                        else if (itemDateNum === endNum) {
                            targetElement.classList.add('highlight-start');
                        }
                        else if (itemDateNum > endNum && itemDateNum < hoverDateNum) {
                            targetElement.classList.add('highlight');
                        }
                    }
                    else {
                        // 2-2-2. hover한 값이 end보다 작을 때
                        if (this.rangestart) {
                            const startNum = Number(this.formatTwoDigitDate(this.rangestart.year, this.rangestart.month, this.rangestart.day));
                            if (hoverDateNum > startNum) {
                                // start 값이 있고 hover한 값이 start 값보다 크다면
                                if (itemDateNum === hoverDateNum) {
                                    targetElement.classList.add('highlight-end');
                                }
                                else if (itemDateNum === startNum) {
                                    targetElement.classList.add('highlight-start');
                                }
                                else if (itemDateNum > startNum && itemDateNum < hoverDateNum) {
                                    targetElement.classList.add('highlight');
                                }
                            }
                            else {
                                // start 값이 있고 hover한 값이 start보다 작다면
                                if (itemDateNum === hoverDateNum) {
                                    targetElement.classList.add('highlight-end');
                                }
                            }
                        }
                        else {
                            // start 값이 없는 경우
                            if (itemDateNum === hoverDateNum) {
                                targetElement.classList.add('highlight-end');
                            }
                        }
                    }
                }
                else if (this.rangestart) {
                    // end 값이 없고 start 값만 있을 때
                    const startNum = Number(this.formatTwoDigitDate(this.rangestart.year, this.rangestart.month, this.rangestart.day));
                    if (hoverDateNum > startNum) {
                        // hover한 값이 start 값보다 크다면
                        if (itemDateNum === hoverDateNum) {
                            targetElement.classList.add('highlight-end');
                        }
                        else if (itemDateNum === startNum) {
                            targetElement.classList.add('highlight-start');
                        }
                        else if (itemDateNum > startNum && itemDateNum < hoverDateNum) {
                            targetElement.classList.add('highlight');
                        }
                    }
                    else {
                        // hover한 값이 start 값보다 작거나 같다면
                        if (itemDateNum === hoverDateNum) {
                            targetElement.classList.add('highlight-end');
                        }
                    }
                }
                else {
                    // start, end 값이 모두 없을 때
                    if (itemDateNum === hoverDateNum) {
                        targetElement.classList.add('highlight-end');
                    }
                }
            }
        });
    }
    handleMouseLeave = () => {
        const items = this.host.querySelectorAll('.highlight, .highlight-start, .highlight-end');
        items?.forEach(item => {
            item.classList.remove('highlight', 'highlight-start', 'highlight-end');
        });
        this.hoverDate = '';
        this.setHoverEvent('');
    };
    selectDate = (year, month, day, closable = true) => {
        this.originalDatetime = { ...this.originalDatetime, year, month, day };
        if (!this.preMode || this.preMode === 'day') {
            this.setSelectEvent(closable);
        }
    };
    selectMonth = (month) => {
        this.currentDate = new Date(this.currentDate.getFullYear(), month, 1);
        this.originalDatetime = { ...this.originalDatetime, month };
        this.setHeaderEvent('month');
        if (this.preMode === 'month') {
            this.setSelectEvent();
        }
        else {
            this.setMode('day');
        }
    };
    selectYear = (year, closable = true) => {
        this.currentDate = new Date(year, this.currentDate.getMonth(), 1);
        this.originalDatetime = { ...this.originalDatetime, year };
        this.setHeaderEvent('year');
        if (this.preMode === 'year') {
            this.setSelectEvent(closable);
        }
        else {
            this.setMode('month');
        }
    };
    selectDecade = (decade) => {
        this.currentDate = new Date(decade, this.currentDate.getMonth(), 1);
        this.originalDatetime = { ...this.originalDatetime, year: decade };
        this.setHeaderEvent('decade');
        this.setMode('year');
    };
    handleToday = () => {
        const now = new Date();
        this.originalDatetime = {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds()
        };
        this.currentDate = new Date();
        this.setSelectEvent(true);
    };
    setMode(newMode) {
        if (this._mode !== newMode) {
            this._mode = newMode;
            this.modeChanged.emit({
                mode: this._mode,
                range: this.range
            });
        }
    }
    setHeaderEvent(_mode) {
        if (!this.range)
            return;
        this.changed.emit({ date: this.currentDate });
    }
    setSelectEvent(closable = true) {
        this.selected.emit({
            closable,
            year: this.originalDatetime.year,
            month: this.originalDatetime.month,
            day: this.originalDatetime.day,
            hour: this.originalDatetime.hour,
            minute: this.originalDatetime.minute,
            second: this.originalDatetime.second,
            range: this.range
        });
    }
    setHoverEvent(hoverDate) {
        this.hoverDate = hoverDate;
        this.entered.emit({ hoverDate });
    }
    formatTwoDigitDate(year, month, day) {
        const m = month + 1;
        return `${year}${m > 9 ? String(m) : '0' + m}${day > 9 ? String(day) : '0' + day}`;
    }
    static get watchers() { return {
        "rangestart": ["watchRangeChanges"],
        "rangeend": ["watchRangeChanges"],
        "datetime": ["watchDatetime"],
        "originalDatetime": ["watchOriginalDatetime"],
        "hoverDate": ["watchHoverDate"]
    }; }
    static get style() { return syDateCalendarCss; }
}, [258, "sy-date-calendar", {
        "mode": [7681],
        "datetime": [16],
        "range": [513],
        "active": [1],
        "rangestart": [16],
        "rangeend": [16],
        "hoverDate": [1025, "hover-date"],
        "dateNames": [1025, "datenames"],
        "mondayStart": [1028, "mondaystart"],
        "hideWeekend": [1540, "hideweekend"],
        "currentDate": [1040],
        "today": [32],
        "inrange": [32],
        "_mode": [32],
        "preMode": [32],
        "originalDatetime": [32]
    }, undefined, {
        "rangestart": ["watchRangeChanges"],
        "rangeend": ["watchRangeChanges"],
        "datetime": ["watchDatetime"],
        "originalDatetime": ["watchOriginalDatetime"],
        "hoverDate": ["watchHoverDate"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-date-calendar", "sy-button", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-date-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyDateCalendar);
            }
            break;
        case "sy-button":
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

export { SyDateCalendar as S, defineCustomElement as d };
