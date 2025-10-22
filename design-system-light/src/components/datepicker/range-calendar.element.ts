// sy-range-calendar.ts

import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import globalCSS from './styles/range-calendar.scss?inline';
import './date-calendar.element';

@customElement('sy-range-calendar')
export class RangeCalendarElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)}`;

  @property({ type: String })
  set mode(value: 'day' | 'month' | 'year') {
    const oldVal = this._mode;
    this._mode = value;

    this.startCalendarMode = value;
    this.endCalendarMode = value;
    this.requestUpdate('mode', oldVal);
  }
  get mode(): 'day' | 'month' | 'year' {
    return this._mode;
  }
  
  @property({ type: String }) active!: string;
  @property({ type: Object }) rangestart: { year: number, month: number, day: number } | undefined = undefined;
  @property({ type: Object }) rangeend: { year: number, month: number, day: number } | undefined = undefined;
  @property({ type: Boolean }) mondayStart: boolean = false;
  @property({ type: Boolean }) hideWeekend: boolean = false;

  @state() private startCalendarDate: Date = new Date();
  @state() private endCalendarDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));
  @state() private startCalendarMode: 'day' | 'month' | 'year' = 'day';
  @state() private endCalendarMode: 'day' | 'month' | 'year' = 'day';
  @state() private hoverDate = '';
  private _mode: 'day' | 'month' | 'year' = 'day';

  connectedCallback() {
    super.connectedCallback();
    this.startCalendarMode = this.mode;
    this.endCalendarMode = this.mode;
    this.initializeCalendarDates();
  }

  /**
   * [핵심] rangestart, rangeend, 또는 'active' 속성이 변경될 때마다
   * 달력의 위치를 다시 계산하는 initializeCalendarDates()를 호출합니다.
   * 이것이 캘린더가 열린 상태에서 start/end 클릭에 반응하게 만드는 부분입니다.
   */
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('rangestart') || changedProperties.has('rangeend') || changedProperties.has('active')) {
      this.initializeCalendarDates();
    }
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
    return html`
      <div class="range-calendar-container">
        <sy-date-calendar
          range="start"
          .mode=${this.startCalendarMode}
          .currentDate=${this.startCalendarDate}
          .rangestart=${this.rangestart}
          .rangeend=${this.rangeend}
          .hoverDate=${this.hoverDate}
          .active=${this.active}
          ?mondayStart=${this.mondayStart}
          ?hideWeekend=${this.hideWeekend}
          @changed=${this.handleChangedStartCalendar}
          @selected=${this.handleSelectedCalendar}
          @entered=${this.handleEnteredCalendar}
          @mode-changed=${this.handleModeChanged}
        ></sy-date-calendar>
        <sy-date-calendar
          range="end"
          .mode=${this.endCalendarMode}
          .currentDate=${this.endCalendarDate}
          .rangestart=${this.rangestart}
          .rangeend=${this.rangeend}
          .hoverDate=${this.hoverDate}
          .active=${this.active}
          ?mondayStart=${this.mondayStart}
          ?hideWeekend=${this.hideWeekend}
          @changed=${this.handleChangedEndCalendar}
          @selected=${this.handleSelectedCalendar}
          @entered=${this.handleEnteredCalendar}
          @mode-changed=${this.handleModeChanged}
        ></sy-date-calendar>
      </div>
    `;
  }

  private handleChangedStartCalendar(e: CustomEvent): void {
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

  private handleChangedEndCalendar(e: CustomEvent): void {
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

  private handleModeChanged(e: CustomEvent): void {
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

  private handleSelectedCalendar(e: CustomEvent) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('selected', { detail: e.detail, bubbles: true, composed: true }));
  }

  private handleEnteredCalendar(e: CustomEvent) {
    e.stopPropagation();
    this.hoverDate = e.detail.hoverDate;
  }
}