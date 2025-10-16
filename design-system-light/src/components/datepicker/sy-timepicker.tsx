import { Component, Prop, State, Element, h, Event, EventEmitter } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-timepicker',
  styleUrl: 'sy-timepicker.scss',
  shadow: false,
  scoped: true
})
export class SyTimePicker {
  @Element() host: HTMLSyTimepickerElement;

  @Prop() hour = 0;
  @Prop() minute = 0;
  @Prop() second = 0;
  @Prop({ attribute: 'hideButton', mutable: true }) hideButton = false;
  @Prop({ attribute: 'timeSeparator', mutable: true }) timeSeparator = ':'; // 시간 구분자 추가
  @Prop() format = 'hh:mm:ss'; // 시간 형식 지원 추가

  @Event() selected: EventEmitter;
  @Event() changed: EventEmitter;

  @State() selectedTime = '00:00:00';
  @State() private internalHour: number = 0;
  @State() private internalMinute: number = 0;
  @State() private internalSecond: number = 0;

  private hourColumn?: HTMLElement;
  private minuteColumn?: HTMLElement;
  private secondColumn?: HTMLElement;

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
    if (this.hour !== this.internalHour) this.internalHour = this.hour;
    if (this.minute !== this.internalMinute) this.internalMinute = this.minute;
    if (this.second !== this.internalSecond) this.internalSecond = this.second;
  }
  
  componentDidLoad() {
    this.updateSelectedTime();
    this.cacheColumnRefs();
    this.scrollToSelected();
  }

  componentDidUpdate() {
    this.updateSelectedTime();
    this.cacheColumnRefs();
    this.scrollToSelected();
  }

  render() {
    return (
      <div class="time-section">
        <div class="header">{this.selectedTime}</div>
        <div class="time-contents">
          <div class="time-column hour">{this.renderTimeColumn('hour', 24, this.internalHour)}</div>
          <div class="time-column minute">{this.renderTimeColumn('minute', 60, this.internalMinute)}</div>
          <div class="time-column second">{this.renderTimeColumn('second', 60, this.internalSecond)}</div>
        </div>
        {!this.hideButton ? (
          <div class="calendar-footer">
            <sy-button variant="primary" size="small" onClick={this.confirmSelection}>OK</sy-button>
          </div>
        ) : null}
      </div>
    );
  }

  private confirmSelection = () => {
    // closable = true
    this.selected.emit({
      closable: true,
      hour: this.internalHour,
      minute: this.internalMinute,
      second: this.internalSecond,
      range: undefined
    });
  }

  private renderTimeColumn(type: 'hour' | 'minute' | 'second', max: number, selected?: number) {
    const items = [];
    for (let i = 0; i < max; i++) {
      const value = i < 10 ? `0${i}` : `${i}`;
      const isSelected = selected === i;
      items.push(
        <div
          class={`time-item ${isSelected ? 'selected' : ''}`}
          onClick={() => this.selectTime(type, i)}>
          {value}
        </div>
      );
    }

    items.push(<div class={`${type} time-padding-bottom`}></div>);
    return items;
  }

  private selectTime = (type: 'hour' | 'minute' | 'second', value: number) => {
    // Update internal state instead of props
    if (type === 'hour') {
      this.internalHour = value;
    } else if (type === 'minute') {
      this.internalMinute = value;
    } else {
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
  }

  private updateSelectedTime() {
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

  private cacheColumnRefs() {
    if (!this.hourColumn) {
      this.hourColumn = this.host.querySelector('.time-column.hour') as HTMLElement;
    }
    if (!this.minuteColumn) {
      this.minuteColumn = this.host.querySelector('.time-column.minute') as HTMLElement;
    }
    if (!this.secondColumn) {
      this.secondColumn = this.host.querySelector('.time-column.second') as HTMLElement;
    }
  }

  private scrollToSelected() {
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

  private scrollToIndex(column: HTMLElement, index: number) {
    // Find the first item to calculate its height
    const firstItem = column.querySelector('.time-item') as HTMLElement;

    if (!firstItem) {
      console.error('No time-item found in the column.');
      return;
    }

    // Calculate the height of an item
    const itemHeight = firstItem.offsetHeight;

    // Calculate the total scroll position
    const totalHeight = itemHeight * index;

    // Ensure the column is set to scroll
    column.scrollTo({
      top: totalHeight,
      behavior: 'smooth'
    });
  }
}
