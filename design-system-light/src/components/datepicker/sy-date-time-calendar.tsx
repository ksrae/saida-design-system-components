import { Component, Prop, State, Element, h, Event, EventEmitter, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-date-time-calendar',
  styleUrl: 'sy-date-time-calendar.scss',
  shadow: false,
  scoped: true
})
export class SyDateTimeCalendar {
  @Element() host!: HTMLSyDateTimeCalendarElement;

  @Prop() mode: 'day' | 'month' | 'year' | 'decade' = 'day';
  @Prop() datetime: {year: number, month: number, day: number, hour: number, minute: number, second: number} = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds()
  };
  @Prop({ attribute: 'dateNames', mutable: true }) dateNames: string = 'Su,Mo,Tu,We,Th,Fr,Sa';
  @Prop({ attribute: 'mondayStart', mutable: true }) mondayStart: boolean = false;
  @Prop({ attribute: 'hideWeekend', mutable: true }) hideWeekend: boolean = false;

  @Event() selected!: EventEmitter;

  @State() private hasInitialSelection = false;
  @State() private internalDatetime: {year: number, month: number, day: number, hour: number, minute: number, second: number};

  @Watch('datetime')
  watchDatetime(newVal: any) {
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
    } else {
      this.internalDatetime = { ...this.datetime };
    }
  }

  render() {
    const now = new Date();
    return (
      <div class="datetime-container">
        <div class="datetime-calendar-container">
        <sy-date-calendar
          mode={this.mode}
          dateNames={this.dateNames}
          datetime={this.internalDatetime}
          active=""
          hoverDate=""
          mondayStart={this.mondayStart}
          hideWeekend={this.hideWeekend}
          onSelected={this.handleDateSelected}>
        </sy-date-calendar>
        </div>
        <div class="time-picker-container">
          <sy-timepicker
            hour={(this.hasInitialSelection && this.internalDatetime) ? this.internalDatetime.hour : now.getHours()}
            minute={(this.hasInitialSelection && this.internalDatetime) ? this.internalDatetime.minute : now.getMinutes()}
            second={(this.hasInitialSelection && this.internalDatetime) ? this.internalDatetime.second : now.getSeconds()}
            hideButton={true}
            onChanged={this.handleTimeChanged}>
          </sy-timepicker>
          <div class="calendar-footer">
            <sy-button variant="primary" size="small" onClick={this.confirmSelection}>OK</sy-button>
          </div>
        </div>
      </div>
    );
  }

  private handleDateSelected = (event: CustomEvent) => {
    event.stopPropagation();
    const { year, month, day } = event.detail;

    let hour, minute, second;

    if (this.hasInitialSelection && this.internalDatetime) {
      hour = this.internalDatetime.hour;
      minute = this.internalDatetime.minute;
      second = this.internalDatetime.second;
    } else {
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
  }

  private handleTimeChanged = (event: CustomEvent) => {
    event.stopPropagation();
    const { hour, minute, second } = event.detail;

    const year = this.internalDatetime?.year ?? new Date().getFullYear();
    const month = this.internalDatetime?.month ?? new Date().getMonth();
    const day = this.internalDatetime?.day ?? new Date().getDate();

    this.internalDatetime = { year, month, day, hour, minute, second };
  }

  private confirmSelection = () => {
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
  }
}
