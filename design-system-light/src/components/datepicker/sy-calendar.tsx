import { Component, Prop, State, h, Event, EventEmitter, Element } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

export interface HTMLSyCalendarElement extends HTMLElement {
  mode?: 'day' | 'month' | 'year';
  variant?: 'date' | 'datetime' | 'range' | 'time';
  format?: string;
  active?: string;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  rangestartdefault?: string;
  rangeenddefault?: string;
  dateNames?: string;
  mondayStart?: boolean;
  hideWeekend?: boolean;
  selected: EventEmitter<any>;
  closed: EventEmitter<void>;
}

@Component({
  tag: 'sy-calendar',
  styleUrl: 'sy-calendar.scss',
  shadow: false,
  scoped: true
})
export class CalendarElement {
  @Element() host: HTMLSyDateCalendarElement;

  @Prop() mode: 'day' | 'month' | 'year' = 'day';
  @Prop() variant: 'date' | 'datetime' | 'range' | 'time' = 'date';
  @Prop() format: string = 'hh:mm:ss';
  @Prop({ reflect: true }) active!: string;

  @Prop() year!: number;
  @Prop() month!: number;
  @Prop() day!: number;
  @Prop() hour!: number;
  @Prop() minute!: number;
  @Prop() second!: number;

  @Prop() rangestartdefault!: string;
  @Prop() rangeenddefault!: string;
  @Prop({ attribute: 'dateNames', mutable: true }) dateNames: string = 'Su,Mo,Tu,We,Th,Fr,Sa';
  @Prop({ attribute: 'mondayStart', mutable: true }) mondayStart: boolean = false;
  @Prop({ attribute: 'hideWeekend', mutable: true }) hideWeekend: boolean = false;

  @Event() selected: EventEmitter;
  @Event() closed: EventEmitter;

  private readonly todayDate = new Date();

  @State() private rangestart: {year: number, month: number, day: number } | undefined = undefined;
  @State() private rangeend: {year: number, month: number, day: number } | undefined = undefined;
  @State() private rangeSelected = {start: false, end: false};
  @State() selectedDatetime!: {year: number, month: number, day: number, hour: number, minute: number, second: number};

  private parentDom: any;
  private addedToBody = false;
  private preventRender = false;
  private initialRender: boolean = true;
  private renderTimeoutId: any;

  componentWillLoad() {
    this.dateNames = fnAssignPropFromAlias(this.host, 'date-names') ?? this.dateNames;
    this.mondayStart = fnAssignPropFromAlias(this.host, 'monday-start') ?? this.mondayStart;
    this.hideWeekend = fnAssignPropFromAlias(this.host, 'hide-weekend') ?? this.hideWeekend;
  }

  componentDidLoad() {
    this.rangeSelected = {start: false, end: false};

    if(!this.rangestartdefault || !this.rangeenddefault) {
      // this.datetime = {year: this.year, month: this.month, day: this.day, hour: this.hour, minute: this.minute, second: this.second};
    } else {
      this.rangestart = this.rangestartdefault ? JSON.parse(this.rangestartdefault) : undefined;
      this.rangeend = this.rangeenddefault ? JSON.parse(this.rangeenddefault) : undefined;
    }

    this.selectedDatetime = {
      year: this.year ?? undefined,
      month: this.month ?? undefined,
      day: this.day ?? undefined,
      hour: (this.selectedDatetime && typeof this.selectedDatetime.hour === 'number') ? this.selectedDatetime.hour : (this.hour ? this.hour : new Date().getHours()),
      minute: (this.selectedDatetime && typeof this.selectedDatetime.minute === 'number') ? this.selectedDatetime.minute : (this.minute ? this.minute : new Date().getMinutes()),
      second: (this.selectedDatetime && typeof this.selectedDatetime.second === 'number') ? this.selectedDatetime.second : (this.second ? this.second : new Date().getSeconds())
    };

    this.appendToRoot();
  }

  componentDidUpdate() {
    // updated 로직
  }

  private appendToRoot = () => {
    if (this.parentDom !== document.body) {
      this.parentDom = this.parentDom || document.body;

      // Stencil에서는 호스트 엘리먼트를 직접 이동시키지 않습니다
      // 필요한 경우 포털 패턴을 사용하거나 다른 방식으로 처리
      this.addedToBody = true;
    }
  }

  private handleRangeDateSelected = (event: CustomEvent) => {
    const { year, month, day, range} = event.detail;
    console.log({year, month, day, range});

    if(range === 'start') {
      if(year && month !== undefined && day) {
        this.rangestart = {year, month, day};
        this.rangeend = undefined;
        this.rangeSelected = {start: true, end: false};
      } else {
        this.rangestart = undefined as any;
        this.rangeend = undefined;
        this.rangeSelected = {start: false, end: false};
      }
    } else if (range === 'end') {
      this.rangeend = {year, month, day};
      this.rangeSelected = {...this.rangeSelected, end: true};
    }

    this.selected.emit({year, month, day, range});

    if(this.rangeSelected.start && this.rangeSelected.end) {
      this.rangeSelected = {start: false, end: false};
    } else if (this.rangeSelected.start && !this.rangeSelected.end) {
      this.active = 'end';
    } else if (!this.rangeSelected.start && this.rangeSelected.end) {
      this.active = 'start';
    }
  }

  private handleDateTimeSelected = (event: CustomEvent) => {
    event.stopPropagation();

    const { closable, year, month, day, hour, minute, second, range } = event.detail;

    // 선택된 datetime을 저장
    this.selectedDatetime = {year, month, day, hour, minute, second};

    this.selected.emit({closable, year, month, day, hour, minute, second, range});

    if(closable) {
      this.handleCalendarClosed(event);
    }
  }

  private handleDateSelected = (event: CustomEvent) => {
    event.stopPropagation();

    const { closable, year, month, day, hour, minute, second, range } = event.detail;

    // 선택된 datetime을 저장
    this.selectedDatetime = {year, month, day, hour, minute, second};

    this.selected.emit({closable, year, month, day, hour, minute, second, range});

    if(closable) {
      this.handleCalendarClosed(event);
    }
  }

  private handleTimeSelected = (e: CustomEvent) => {
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

    if(closable) {
      this.handleCalendarClosed(e);
    }
  }

  private handleCalendarClosed = (event: Event) => {
    this.closed.emit(undefined);
  }

render() {
  return (
    <div class="calendar">
      {this.variant === 'datetime' ? (
        <sy-date-time-calendar
          mode={this.mode}
          dateNames={this.dateNames}
          datetime={this.selectedDatetime}
          mondayStart={this.mondayStart}
          hideWeekend={this.hideWeekend}
          onSelected={this.handleDateTimeSelected}>
        </sy-date-time-calendar>
      ) : this.variant === 'range' ? (
        <sy-range-calendar
          active={this.active}
          mode={this.mode}
          dateNames={this.dateNames}
          datetime={this.selectedDatetime}
          rangestart={this.rangestart}
          rangeend={this.rangeend}
          mondayStart={this.mondayStart}
          hideWeekend={this.hideWeekend}
          onSelected={this.handleRangeDateSelected}>
        </sy-range-calendar>
      ) : this.variant === 'date' ? (
        <sy-date-calendar
          mode={this.mode}
          dateNames={this.dateNames}
          datetime={this.selectedDatetime}
          active=""
          hoverDate=""
          mondayStart={this.mondayStart}
          hideWeekend={this.hideWeekend}
          onSelected={this.handleDateSelected}>
        </sy-date-calendar>
      ) : (
        <sy-timepicker
          hour={this.selectedDatetime?.hour ?? this.todayDate.getHours()}
          minute={this.selectedDatetime?.minute ?? this.todayDate.getMinutes()}
          second={this.selectedDatetime?.second ?? this.todayDate.getSeconds()}
          format={this.format}>
        </sy-timepicker>
      )}
    </div>
  );
}
}
