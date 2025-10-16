import { Component, Prop, State, Element, h, Event, EventEmitter, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-range-calendar',
  styleUrl: 'sy-range-calendar.scss',
  shadow: false,
  scoped: true
})
export class SyRangeCalendar {
  @Element() host: HTMLSyRangeCalendarElement;

  @Prop({ mutable: true })
  get mode(): 'day' | 'month' | 'year' {
    return this._mode;
  }
  set mode(value: 'day' | 'month' | 'year') {
    this._mode = value;
    this.startCalendarMode = value;
    this.endCalendarMode = value;
  }


  @Prop() active!: string;
  @Prop() datetime?: {year: number, month: number, day: number, hour: number, minute: number, second: number};
  @Prop() rangestart?: { year: number, month: number, day: number };
  @Prop() rangeend?: { year: number, month: number, day: number };
  @Prop({ attribute: 'dateNames', mutable: true }) dateNames: string = 'Su,Mo,Tu,We,Th,Fr,Sa';
  @Prop({ attribute: 'mondayStart', mutable: true }) mondayStart: boolean = false;
  @Prop({ attribute: 'hideWeekend', mutable: true }) hideWeekend: boolean = false;

  @Event() selected: EventEmitter;

  @State() private startCalendarDate: Date = new Date();
  @State() private endCalendarDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));
  @State() private startCalendarMode: 'day' | 'month' | 'year' = 'day';
  @State() private endCalendarMode: 'day' | 'month' | 'year' = 'day';
  @State() private hoverDate = '';
  private _mode: 'day' | 'month' | 'year' = 'day';

  // Watch를 사용하여 props 변경 감지
  @Watch('active')
  @Watch('rangestart')
  @Watch('rangeend')
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

  private initializeCalendarDates() {
    const isSameMonth = this.rangestart && this.rangeend &&
                        this.rangestart.year === this.rangeend.year &&
                        this.rangestart.month === this.rangeend.month;

    if (isSameMonth) {
      const baseDate = new Date(this.rangestart!.year, this.rangestart!.month, 1);
      if (this.active === 'start') {
        this.endCalendarDate = baseDate;
        const newStartDate = new Date(baseDate);
        if (this.endCalendarMode === 'year') newStartDate.setFullYear(newStartDate.getFullYear() - 10);
        else if (this.endCalendarMode === 'month') newStartDate.setFullYear(newStartDate.getFullYear() - 1);
        else newStartDate.setMonth(newStartDate.getMonth() - 1);
        this.startCalendarDate = newStartDate;
      } else {
        this.startCalendarDate = baseDate;
        const newEndDate = new Date(baseDate);
        if (this.startCalendarMode === 'year') newEndDate.setFullYear(newEndDate.getFullYear() + 10);
        else if (this.startCalendarMode === 'month') newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        else newEndDate.setMonth(newEndDate.getMonth() + 1);
        this.endCalendarDate = newEndDate;
      }
    } else {
      const now = new Date();
      let baseDate: Date;
      if (this.active === 'start' && this.rangestart) {
        baseDate = new Date(this.rangestart.year, this.rangestart.month, 1);
        this.startCalendarDate = baseDate;
        const newEndDate = new Date(baseDate);
        if (this.startCalendarMode === 'year') newEndDate.setFullYear(newEndDate.getFullYear() + 10);
        else if (this.startCalendarMode === 'month') newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        else newEndDate.setMonth(newEndDate.getMonth() + 1);
        this.endCalendarDate = newEndDate;
      } else if (this.active === 'end' && this.rangeend) {
        baseDate = new Date(this.rangeend.year, this.rangeend.month, 1);
        this.endCalendarDate = baseDate;
        const newStartDate = new Date(baseDate);
        if (this.endCalendarMode === 'year') newStartDate.setFullYear(newStartDate.getFullYear() - 10);
        else if (this.endCalendarMode === 'month') newStartDate.setFullYear(newStartDate.getFullYear() - 1);
        else newStartDate.setMonth(newStartDate.getMonth() - 1);
        this.startCalendarDate = newStartDate;
      } else if (this.rangestart) {
        baseDate = new Date(this.rangestart.year, this.rangestart.month, 1);
        this.startCalendarDate = baseDate;
        const newEndDate = new Date(baseDate);
        if (this.startCalendarMode === 'year') newEndDate.setFullYear(newEndDate.getFullYear() + 10);
        else if (this.startCalendarMode === 'month') newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        else newEndDate.setMonth(newEndDate.getMonth() + 1);
        this.endCalendarDate = newEndDate;
      } else {
        baseDate = new Date(now.getFullYear(), now.getMonth(), 1);
        this.startCalendarDate = baseDate;
        const newEndDate = new Date(baseDate);
        if (this.startCalendarMode === 'year') newEndDate.setFullYear(newEndDate.getFullYear() + 10);
        else if (this.startCalendarMode === 'month') newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        else newEndDate.setMonth(newEndDate.getMonth() + 1);
        this.endCalendarDate = newEndDate;
      }
    }
  }

  render() {
    return (
      <div class="range-calendar-container">
        <sy-date-calendar
          range="start"
          mode={this.startCalendarMode}
          currentDate={this.startCalendarDate}
          rangestart={this.rangestart}
          rangeend={this.rangeend}
          hoverDate={this.hoverDate}
          active={this.active}
          dateNames={this.dateNames}
          mondayStart={this.mondayStart}
          hideWeekend={this.hideWeekend}
          onChanged={this.handleChangedStartCalendar}
          onSelected={this.handleSelectedCalendar}
          onEntered={this.handleEnteredCalendar}
          onMode-changed={this.handleModeChanged}
        ></sy-date-calendar>
        <sy-date-calendar
          range="end"
          mode={this.endCalendarMode}
          currentDate={this.endCalendarDate}
          rangestart={this.rangestart}
          rangeend={this.rangeend}
          hoverDate={this.hoverDate}
          active={this.active}
          dateNames={this.dateNames}
          mondayStart={this.mondayStart}
          hideWeekend={this.hideWeekend}
          onChanged={this.handleChangedEndCalendar}
          onSelected={this.handleSelectedCalendar}
          onEntered={this.handleEnteredCalendar}
          onMode-changed={this.handleModeChanged}
        ></sy-date-calendar>
      </div>
    );
  }

  private handleChangedStartCalendar = (e: CustomEvent): void => {
    e.stopPropagation();
    const newStartDate = new Date(e.detail.date);
    this.startCalendarDate = newStartDate;

    if (this.startCalendarMode === this.endCalendarMode) {
      const newEndDate = new Date(newStartDate);
      if (this.startCalendarMode === 'year') newEndDate.setFullYear(newStartDate.getFullYear() + 10);
      else if (this.startCalendarMode === 'month') newEndDate.setFullYear(newStartDate.getFullYear() + 1);
      else newEndDate.setMonth(newStartDate.getMonth() + 1);
      this.endCalendarDate = newEndDate;
    }
  }

  private handleChangedEndCalendar = (e: CustomEvent): void => {
    e.stopPropagation();
    const newEndDate = new Date(e.detail.date);
    this.endCalendarDate = newEndDate;

    if (this.startCalendarMode === this.endCalendarMode) {
      const newStartDate = new Date(newEndDate);
      if (this.endCalendarMode === 'year') newStartDate.setFullYear(newEndDate.getFullYear() - 10);
      else if (this.endCalendarMode === 'month') newStartDate.setFullYear(newEndDate.getFullYear() - 1);
      else newStartDate.setMonth(newStartDate.getMonth() - 1);
      this.startCalendarDate = newStartDate;
    }
  }

  private handleModeChanged = (e: CustomEvent): void => {
    const { mode, range } = e.detail;

    if (range === 'start') {
      this.startCalendarMode = mode;
    } else {
      this.endCalendarMode = mode;
    }

    if (this.startCalendarMode === this.endCalendarMode) {
      if (range === 'start') {
        const newEndDate = new Date(this.startCalendarDate);
        if (this.startCalendarMode === 'year') newEndDate.setFullYear(newEndDate.getFullYear() + 10);
        else if (this.startCalendarMode === 'month') newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        else newEndDate.setMonth(newEndDate.getMonth() + 1);
        this.endCalendarDate = newEndDate;
      } else {
        const newStartDate = new Date(this.endCalendarDate);
        if (this.endCalendarMode === 'year') newStartDate.setFullYear(newStartDate.getFullYear() - 10);
        else if (this.endCalendarMode === 'month') newStartDate.setFullYear(newStartDate.getFullYear() - 1);
        else newStartDate.setMonth(newStartDate.getMonth() - 1);
        this.startCalendarDate = newStartDate;
      }
    }
  }

  private handleSelectedCalendar = (e: CustomEvent) => {
    e.stopPropagation();
    this.selected.emit(e.detail);
  }

  private handleEnteredCalendar = (e: CustomEvent) => {
    e.stopPropagation();
    this.hoverDate = e.detail.hoverDate;
  }
}
