import { Component, Prop, State, Element, h, Event, EventEmitter, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

export interface HTMLSyDateCalendarElement extends HTMLElement {
  mode?: 'day' | 'month' | 'year' | 'decade';
  datetime?: {year: number, month: number, day: number, hour: number, minute: number, second: number};
  range?: 'start' | 'end';
  active?: string;
  rangestart?: {year: number, month: number, day: number };
  rangeend?: {year: number, month: number, day: number };
  hoverDate?: string;
  currentDate?: Date;
  dateNames?: string;
  mondayStart?: boolean;
  hideWeekend?: boolean;
  changed?: EventEmitter<any>;
  selected?: EventEmitter<any>;
  entered?: EventEmitter<any>;
  modeChanged?: EventEmitter<any>;
}

@Component({
  tag: 'sy-date-calendar',
  shadow: false,
  scoped: true
})
export class DateCalendarElement {
  @Element() host: HTMLSyDateCalendarElement;

  @State() today = new Date();
  @State() inrange = false;


  @Prop({ mutable: true, reflect: true })
  get mode(): 'day' | 'month' | 'year' | 'decade' {
    return this._mode;
  }
  set mode(value: 'day' | 'month' | 'year' | 'decade') {
    this._mode = value;
  }

  @State() private _mode: 'day' | 'month' | 'year' | 'decade' = 'day';

  @Prop() datetime: {year: number, month: number, day: number, hour: number, minute: number, second: number} = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds()
  };

  @Prop({ reflect: true }) range?: 'start' | 'end';
  @Prop() active!: string;
  @Prop({ reflect: true }) rangestart: {year: number, month: number, day: number } | undefined = undefined;
  @Prop({ reflect: true }) rangeend: {year: number, month: number, day: number } | undefined = undefined;
  @Prop() hoverDate!: string;
  @Prop({ attribute: 'dateNames', mutable: true }) dateNames: string = 'Su,Mo,Tu,We,Th,Fr,Sa';
  @Prop({ attribute: 'mondayStart', mutable: true }) mondayStart: boolean = false;
  @Prop({ attribute: 'hideWeekend', mutable: true, reflect: true }) hideWeekend: boolean = false;
  @Prop({ mutable: true }) currentDate: Date = new Date();

  @Event() changed: EventEmitter;
  @Event() selected: EventEmitter;
  @Event() entered: EventEmitter;
  @Event({ eventName: 'mode-changed' }) modeChanged: EventEmitter;

  @State() private preMode = '';
  @State() originalDatetime!: {year: number, month: number, day: number, hour: number, minute: number, second: number};

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
  }

  @Watch('rangestart')
  @Watch('rangeend')
  watchRangeChanges() {
    if (this.rangestart && this.rangeend) {
      const startDate = new Date(this.rangestart.year, this.rangestart.month, this.rangestart.day);
      const endDate = new Date(this.rangeend.year, this.rangeend.month, this.rangeend.day);

      this.inrange = startDate <= endDate;
    } else {
      this.inrange = false;
    }
  }

  @Watch('datetime')
  watchDatetime() {
    if (!this.range) {
      if(this.datetime?.year !== undefined && this.datetime.month !== undefined && this.datetime?.day !== undefined) {
        this.currentDate = new Date(this.datetime.year, this.datetime.month, this.datetime.day);
      }
    }
  }

  @Watch('originalDatetime')
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

  @Watch('hoverDate')
  watchHoverDate() {
    this.setHoverStyle();
  }

  render() {
    return (
      <div class="date-calendar-container">
        <div class="calendar-header">
          <div class="calendar-header-privious">
            {this.mode === 'day' ? <sy-icon size="medium" onClick={this.prevMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M103.5 303C94.1 312.4 94.1 327.6 103.5 336.9L303.5 536.9C312.9 546.3 328.1 546.3 337.4 536.9C346.7 527.5 346.8 512.3 337.4 503L154.4 320L337.4 137C346.8 127.6 346.8 112.4 337.4 103.1C328 93.8 312.8 93.7 303.5 103.1L103.5 303zM495.5 103L295.5 303C286.1 312.4 286.1 327.6 295.5 336.9L495.5 536.9C504.9 546.3 520.1 546.3 529.4 536.9C538.7 527.5 538.8 512.3 529.4 503L346.4 320L529.4 137C538.8 127.6 538.8 112.4 529.4 103.1C520 93.8 504.8 93.7 495.5 103.1z"></path></svg>
            </sy-icon> : null}
            {this.mode === 'day' ? <sy-icon size="medium" onClick={this.prevMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M207.5 303C198.1 312.4 198.1 327.6 207.5 336.9L367.5 496.9C376.9 506.3 392.1 506.3 401.4 496.9C410.7 487.5 410.8 472.3 401.4 463L258.4 320L401.4 177C410.8 167.6 410.8 152.4 401.4 143.1C392 133.8 376.8 133.7 367.5 143.1L207.5 303z"/></svg>
            </sy-icon> : null}
          </div>
          <div class="calendar-title">
            {this.setHeaderText()}
          </div>
          <div class="calendar-header-next">
            {this.mode === 'day' ? <sy-icon size="medium" onClick={this.nextMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/></svg>
            </sy-icon> : null}
            <sy-icon size="medium" onClick={this.setPost}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M177.5 497L337.5 337C346.9 327.6 346.9 312.4 337.5 303.1L177.5 143C168.1 133.6 152.9 133.6 143.6 143C134.3 152.4 134.2 167.6 143.6 176.9L286.6 319.9L143.6 462.9C134.2 472.3 134.2 487.5 143.6 496.8C153 506.1 168.2 506.2 177.5 496.8zM369.5 497L529.5 337C538.9 327.6 538.9 312.4 529.5 303.1L369.5 143C360.1 133.6 344.9 133.6 335.6 143C326.3 152.4 326.2 167.6 335.6 176.9L478.6 319.9L335.6 462.9C326.2 472.3 326.2 487.5 335.6 496.8C345 506.1 360.2 506.2 369.5 496.8z"/></svg>
            </sy-icon>
          </div>
        </div>
        <div class="calendar-content">
          {this.mode === 'day' ? (
            <ul class="calendar-grid">
              {this.renderDayNames()}
            </ul>
          ) : null}
          {this.generateCalendarDays()}
        </div>
        <div class="calendar-footer">
          {this.mode === 'day' && !this.range ? (
            <div>
              <sy-divider></sy-divider>
              <sy-button size="small" variant="borderless" onClick={this.handleToday}>Now</sy-button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  private generateCalendarDays() {
    if (this.mode === 'decade') return this.generateDecades();
    else if (this.mode === 'year') return this.generateYears();
    else if (this.mode === 'month') return this.generateMonths();
    return this.generateDays();
  }

private generateDecades() {
  const decades = [];
  const currentCenturyStart = Math.floor(this.currentDate?.getFullYear() / 100) * 100;

  for (let i = currentCenturyStart - 10; i <= currentCenturyStart + 100; i += 10) {
    const isSelected = this.datetime?.year >= i && this.datetime?.year <= i + 9;
    const isToday = new Date().getFullYear() >= i && new Date().getFullYear() <= i + 9;
    const isNotCurrentMonth = i === currentCenturyStart - 10 || i === currentCenturyStart + 100;

    const decade = (
      <li
        class={isNotCurrentMonth ? 'not-current-month' : ''}
        data-selected={isSelected ? '' : undefined}
        data-today={isToday ? '' : undefined}
        onClick={
          () => {
            if(i === currentCenturyStart - 10) {
              this.prevDecade();
              this.selectDecade(i);
            } else if (i === currentCenturyStart + 100) {
              this.nextDecade();
              this.selectDecade(i);
            } else {
              this.selectDecade(i);
            }
          }
        }><span class="date-item">{i}-{i+9}</span></li>
    );
    decades.push(decade);
  }
  const rows = [];
  for (let i = 0; i < decades.length; i += 3) {
    rows.push(<ul class="calendar-grid">{decades.slice(i, i + 3)}</ul>);
  }
  return rows;
}

private generateYears() {
  const years = [];
  const startDecade = Math.floor(this.currentDate?.getFullYear() / 10) * 10;
  for (let i = startDecade - 1; i <= startDecade + 10; i++) {
    const isSelected = i === this.datetime?.year;
    const isToday = i === this.today.getFullYear();
    const isNotCurrentMonth = i === startDecade - 1 || i === startDecade + 10;

    const year = (
      <li
        class={isNotCurrentMonth ? 'not-current-month' : ''}
        data-selected={isSelected ? '' : undefined}
        data-today={isToday ? '' : undefined}
        onClick={
          () => {
            if(i === startDecade - 1) {
              this.prevYear();
              this.selectYear(i, false);
            } else if (i === startDecade + 10) {
              this.nextYear();
              this.selectYear(i, false);
            } else {
              this.selectYear(i);
            }
          }
        }><span class="date-item">{i}</span></li>
    );
    years.push(year);
  }
  const rows = [];
  for (let i = 0; i < years.length; i += 3) {
    rows.push(<ul class="calendar-grid">{years.slice(i, i + 3)}</ul>);
  }
  return rows;
}

private generateMonths() {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const year = this.currentDate?.getFullYear();
    const isSelected = year === this.datetime?.year && i === this.datetime?.month;
    const isToday = year === this.today.getFullYear() && i === this.today.getMonth();

    const month = (
      <li
        data-selected={isSelected ? '' : undefined}
        data-today={isToday ? '' : undefined}
        onClick={() => this.selectMonth(i)}>
        <span class="date-item">{new Date(0, i).toLocaleString('default', { month: 'short' })}</span>
      </li>
    );
    months.push(month);
  }
  const rows = [];
  for (let i = 0; i < months.length; i += 3) {
    rows.push(<ul class="calendar-grid">{months.slice(i, i + 3)}</ul>);
  }
  return rows;
}
  private renderDayNames() {
    if (this.mode !== 'day') return null;

    let dayNames = this.dateNames.split(',').map(name => name.trim());

    if (this.hideWeekend) {
      dayNames = this.mondayStart ? dayNames.slice(1, 6) : dayNames.slice(1, 6);
    } else if (this.mondayStart) {
      dayNames = [...dayNames.slice(1), dayNames[0]];
    }

    return dayNames.map(name => <li class="day-header">{name}</li>);
  }

private generateDays() {
  const days = [];
  const year = this.currentDate?.getFullYear();
  const month = this.currentDate?.getMonth();
  const numDays = this.daysInMonth;

  const daysPerWeek = this.hideWeekend ? 5 : 7;
  let firstDay = this.firstDayOfMonth;

  let startDay;
  if (this.hideWeekend) {
    if (firstDay === 0 || firstDay === 6) startDay = 0;
    else startDay = firstDay - 1;
  } else if (this.mondayStart) {
    startDay = firstDay === 0 ? 6 : firstDay - 1;
  } else {
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
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    }

    days.push(
      <li
        class="not-current-month"
        onClick={() => {
          this.prevMonth();
          this.selectDate(preYear, preMonth, preDate, false);
        }}>
        <span class="date-item">{preDate}</span>
      </li>
    );
  }

  for (let day = 1; day <= numDays; day++) {
    if (this.hideWeekend) {
      const tempDate = new Date(year, month, day);
      const dayOfWeek = tempDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    }

    const isSelected = !this.range && year === this.datetime?.year && month === this.datetime?.month && day === this.datetime?.day;
    const isToday = year === this.today.getFullYear() && month === this.today.getMonth() && day === this.today.getDate();

    const isRangeStartDay = this.rangestart &&
      (year === this.rangestart.year && month === this.rangestart.month && day === this.rangestart.day);

    const isRangeEndDay = this.rangeend &&
      (year === this.rangeend.year && month === this.rangeend.month && day === this.rangeend.day);

    const isOverRangeStart = isRangeValid && this.rangestart && (
      (year > this.rangestart.year) ||
      (year === this.rangestart.year && month > this.rangestart.month) ||
      (year === this.rangestart.year && month === this.rangestart.month && day > this.rangestart.day)
    );

    const isOverRangeEnd = isRangeValid && this.rangeend && (
      (year < this.rangeend.year) ||
      (year === this.rangeend.year && month < this.rangeend.month) ||
      (year === this.rangeend.year && month === this.rangeend.month && day < this.rangeend.day)
    );

    const inRangeForThisDay = isOverRangeStart && isOverRangeEnd;
    const dataDate = this.formatTwoDigitDate(year, month, day);

    days.push(
      <li
        class="current-month"
        data-today={isToday ? '' : undefined}
        data-selected={isSelected ? '' : undefined}
        data-inrange={inRangeForThisDay ? '' : undefined}
        data-rangestart={isRangeStartDay ? '' : undefined}
        data-rangeend={isRangeEndDay ? '' : undefined}
        data-date={dataDate}
        onMouseEnter={() => this.setHoverEvent(dataDate)}
        onMouseLeave={this.handleMouseLeave}
        onClick={() => this.selectDate(year, month, day)}>
          <span class="date-item">{day}</span>
        </li>
    );
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

    days.push(
      <li
        class="not-current-month"
        onClick={() => {
          this.nextMonth();
          this.selectDate(nextYear, nextMonth, nextMonthDay, false);
        }}>
        <span class="date-item">{nextMonthDay}</span>
      </li>
    );

    nextMonthDay++;
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += daysPerWeek) {
    weeks.push(<ul class="calendar-grid">{days.slice(i, i + daysPerWeek)}</ul>);
  }

  return weeks;
}

  private get daysInMonth() {
    return new Date(this.currentDate?.getFullYear(), this.currentDate?.getMonth() + 1, 0).getDate();
  }

  private get firstDayOfMonth() {
    return new Date(this.currentDate?.getFullYear(), this.currentDate?.getMonth(), 1).getDay();
  }

  private setPast = () => {
    if(this.mode === 'decade') this.prevCentury();
    else if(this.mode === 'year') this.prevDecade();
    else this.prevYear();
  }

  private setHeaderText() {
    if (this.mode === 'decade') {
      return <span>{Math.floor(this.currentDate?.getFullYear() / 100) * 100}-{Math.floor(this.currentDate?.getFullYear() / 100) * 100 + 99}</span>;
    } else if (this.mode === 'year') {
      return <span onClick={this.changeToDecadeView}>{Math.floor(this.currentDate?.getFullYear() / 10) * 10}-{Math.floor(this.currentDate?.getFullYear() / 10) * 10 + 9}</span>;
    } else if (this.mode === 'month') {
      return <span onClick={this.changeToYearView}>{this.currentDate?.getFullYear()}</span>;
    } else { // this.mode === 'day'
      return [
        <span onClick={this.changeToMonthView}>{this.currentDate?.toLocaleString('default', {year: 'numeric'})}</span>,
        <span onClick={this.changeToMonthView}>{this.currentDate?.toLocaleString('default', { month: 'long' })}</span>
      ];
    }
  }

  private setPost = () => {
    if(this.mode === 'decade') this.nextCentury();
    else if(this.mode === 'year') this.nextDecade();
    else this.nextYear();
  }

  private prevCentury = () => {
    this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate?.getFullYear() - 100));
    this.setHeaderEvent('century');
  }

  private nextCentury = () => {
    this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate?.getFullYear() + 100));
    this.setHeaderEvent('century');
  }

  private prevDecade = () => {
    this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate?.getFullYear() - 10));
    this.setHeaderEvent('decade');
  }

  private nextDecade = () => {
    this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate?.getFullYear() + 10));
    this.setHeaderEvent('decade');
  }

  private prevYear = () => {
    this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate.getFullYear() - 1));
    this.setHeaderEvent('year');
  }

  private nextYear = () => {
    this.currentDate = new Date(this.currentDate?.setFullYear(this.currentDate.getFullYear() + 1));
    this.setHeaderEvent('year');
  }

  private prevMonth = () => {
    let newYear = this.currentDate?.getFullYear();
    let newMonth = this.currentDate?.getMonth() - 1;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    this.currentDate = new Date(newYear, newMonth, 1);
    this.originalDatetime = { ...this.originalDatetime, year: newYear, month: newMonth };
    this.setHeaderEvent('month');
  }

  private nextMonth = () => {
    let newYear = this.currentDate?.getFullYear();
    let newMonth = this.currentDate?.getMonth() + 1;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    this.currentDate = new Date(newYear, newMonth, 1);
    this.originalDatetime = { ...this.originalDatetime, year: newYear, month: newMonth };
    this.setHeaderEvent('month');
  }

  private changeToDecadeView = () => this.setMode('decade');
  private changeToYearView = () => this.setMode('year');
  private changeToMonthView = () => this.setMode('month');

  private setHoverStyle() {
    const hoverDateNum = Number(this.hoverDate);
    const items = this.host.querySelectorAll('.current-month');

    if (isNaN(hoverDateNum) || hoverDateNum <= 0) {
      this.handleMouseLeave();
      return;
    }

    items?.forEach((item: any) => {
      const itemDateNum = Number(item.dataset.date);
      item.classList.remove('highlight', 'highlight-start', 'highlight-end');

      if (this.active === 'start') {
        // start에 focus가 있을 때
        if (!this.rangestart && !this.rangeend) {
          // 1-1. start, end 값이 모두 없을 때
          if (itemDateNum === hoverDateNum) {
            item.classList.add('highlight-start');
          }
        } else if (this.rangestart) {
          // 1-2. start값이 있을 때
          const startNum = Number(this.formatTwoDigitDate(this.rangestart.year, this.rangestart.month, this.rangestart.day));

          if (hoverDateNum < startNum) {
            // 1-2-1. hover한 값이 start보다 작을 때
            if (itemDateNum === hoverDateNum) {
              item.classList.add('highlight-start');
            } else if (itemDateNum === startNum) {
              item.classList.add('highlight-end');
            } else if (itemDateNum > hoverDateNum && itemDateNum < startNum) {
              item.classList.add('highlight');
            }
          } else {
            // 1-2-2. hover한 값이 start보다 클 때
            if (this.rangeend) {
              const endNum = Number(this.formatTwoDigitDate(this.rangeend.year, this.rangeend.month, this.rangeend.day));
              if (hoverDateNum < endNum) {
                // end 값이 있고 hover한 값이 end 값보다 작다면
                if (itemDateNum === hoverDateNum) {
                  item.classList.add('highlight-start');
                } else if (itemDateNum === endNum) {
                  item.classList.add('highlight-end');
                } else if (itemDateNum > hoverDateNum && itemDateNum < endNum) {
                  item.classList.add('highlight');
                }
              } else {
                // end 값이 있고 hover한 값이 end 값보다 크다면
                if (itemDateNum === hoverDateNum) {
                  item.classList.add('highlight-start');
                }
              }
            } else {
              // end 값이 없는 경우
              if (itemDateNum === hoverDateNum) {
                item.classList.add('highlight-start');
              }
            }
          }
        } else if (this.rangeend) {
          // start 값이 없고 end 값만 있을 때
          const endNum = Number(this.formatTwoDigitDate(this.rangeend.year, this.rangeend.month, this.rangeend.day));
          if (hoverDateNum < endNum) {
            // hover한 값이 end 값보다 작다면
            if (itemDateNum === hoverDateNum) {
              item.classList.add('highlight-start');
            } else if (itemDateNum === endNum) {
              item.classList.add('highlight-end');
            } else if (itemDateNum > hoverDateNum && itemDateNum < endNum) {
              item.classList.add('highlight');
            }
          } else {
            // hover한 값이 end 값보다 크거나 같다면
            if (itemDateNum === hoverDateNum) {
              item.classList.add('highlight-start');
            }
          }
        } else {
          // start, end 값이 모두 없을 때 (중복 처리)
          if (itemDateNum === hoverDateNum) {
            item.classList.add('highlight-start');
          }
        }
      } else { // active === 'end'
        // end에 focus가 있을 때
        if (!this.rangestart && !this.rangeend) {
          // 2-1. start, end 값이 모두 없을 때
          if (itemDateNum === hoverDateNum) {
            item.classList.add('highlight-end');
          }
        } else if (this.rangeend) {
          // 2-2. end값이 있을 때
          const endNum = Number(this.formatTwoDigitDate(this.rangeend.year, this.rangeend.month, this.rangeend.day));

          if (hoverDateNum > endNum) {
            // 2-2-1. hover한 값이 end보다 클 때
            if (itemDateNum === hoverDateNum) {
              item.classList.add('highlight-end');
            } else if (itemDateNum === endNum) {
              item.classList.add('highlight-start');
            } else if (itemDateNum > endNum && itemDateNum < hoverDateNum) {
              item.classList.add('highlight');
            }
          } else {
            // 2-2-2. hover한 값이 end보다 작을 때
            if (this.rangestart) {
              const startNum = Number(this.formatTwoDigitDate(this.rangestart.year, this.rangestart.month, this.rangestart.day));
              if (hoverDateNum > startNum) {
                // start 값이 있고 hover한 값이 start 값보다 크다면
                if (itemDateNum === hoverDateNum) {
                  item.classList.add('highlight-end');
                } else if (itemDateNum === startNum) {
                  item.classList.add('highlight-start');
                } else if (itemDateNum > startNum && itemDateNum < hoverDateNum) {
                  item.classList.add('highlight');
                }
              } else {
                // start 값이 있고 hover한 값이 start보다 작다면
                if (itemDateNum === hoverDateNum) {
                  item.classList.add('highlight-end');
                }
              }
            } else {
              // start 값이 없는 경우
              if (itemDateNum === hoverDateNum) {
                item.classList.add('highlight-end');
              }
            }
          }
        } else if (this.rangestart) {
          // end 값이 없고 start 값만 있을 때
          const startNum = Number(this.formatTwoDigitDate(this.rangestart.year, this.rangestart.month, this.rangestart.day));
          if (hoverDateNum > startNum) {
            // hover한 값이 start 값보다 크다면
            if (itemDateNum === hoverDateNum) {
              item.classList.add('highlight-end');
            } else if (itemDateNum === startNum) {
              item.classList.add('highlight-start');
            } else if (itemDateNum > startNum && itemDateNum < hoverDateNum) {
              item.classList.add('highlight');
            }
          } else {
            // hover한 값이 start 값보다 작거나 같다면
            if (itemDateNum === hoverDateNum) {
              item.classList.add('highlight-end');
            }
          }
        } else {
          // start, end 값이 모두 없을 때
          if (itemDateNum === hoverDateNum) {
            item.classList.add('highlight-end');
          }
        }
      }
    });
  }

  private handleMouseLeave = () => {
    const items = this.host.querySelectorAll('.highlight, .highlight-start, .highlight-end');
    items?.forEach(item => {
      item.classList.remove('highlight', 'highlight-start', 'highlight-end');
    });
    this.hoverDate = '';
    this.setHoverEvent('');
  }

  protected selectDate = (year: number, month: number, day: number, closable: boolean = true) => {
    this.originalDatetime = { ...this.originalDatetime, year, month, day };
    if(!this.preMode || this.preMode === 'day') {
      this.setSelectEvent(closable);
    }
  }

  private selectMonth = (month: number) => {
    this.currentDate = new Date(this.currentDate.getFullYear(), month, 1);
    this.originalDatetime = { ...this.originalDatetime, month };
    this.setHeaderEvent('month');

    if(this.preMode === 'month') {
      this.setSelectEvent();
    } else {
      this.setMode('day');
    }
  }

  private selectYear = (year: number, closable: boolean = true) => {
    this.currentDate = new Date(year, this.currentDate.getMonth(), 1);
    this.originalDatetime = { ...this.originalDatetime, year };
    this.setHeaderEvent('year');

    if(this.preMode === 'year') {
      this.setSelectEvent(closable);
    } else {
      this.setMode('month');
    }
  }

  private selectDecade = (decade: number) => {
    this.currentDate = new Date(decade, this.currentDate.getMonth(), 1);
    this.originalDatetime = { ...this.originalDatetime, year: decade };
    this.setHeaderEvent('decade');

    this.setMode('year');
  }

  private handleToday = () => {
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
  }

  private setMode(newMode: 'day' | 'month' | 'year' | 'decade') {
    if (this._mode !== newMode) {
      this._mode = newMode;
      this.modeChanged.emit({
        mode: this._mode,
        range: this.range
      });
    }
  }

  private setHeaderEvent(mode: string) {
    if(!this.range) return;
    this.changed.emit({ date: this.currentDate });
  }

  private setSelectEvent(closable: boolean = true) {
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

  private setHoverEvent(hoverDate: string) {
    this.entered.emit({ hoverDate });
  }

  private formatTwoDigitDate(year: number, month: number, day: number) {
    const m = month + 1;
    return `${year}${m > 9 ? String(m) : '0' + m}${day > 9 ? String(day) : '0' + day}`;
  }
}
