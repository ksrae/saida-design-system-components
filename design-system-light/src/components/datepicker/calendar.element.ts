import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../button/button.element';
import globalCSS from './styles/calendar.scss?inline';

@customElement('sy-calendar')
export class CalendarElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;
  
  @property({ type: String }) mode: 'day' | 'month' | 'year' = 'day'; // 'month' 추가
  @property({ type: String }) variant: 'date' | 'datetime' | 'range' | 'time' = 'date';
  @property({ type: String }) format: string = 'hh:mm:ss'; // datepicker에서 전달받을 format
  @property({ type: String, reflect: true }) active!: string;
  @property({
    type: Number,
    converter: {
      fromAttribute: (value: string | null) => {
        return value !== null && value !== undefined && (value !== '' || isNaN(Number(value))) ? Number(value) : undefined;
      },
    },
  }) year!: number;
  @property({
    type: Number,
    converter: {
      fromAttribute: (value: string | null) => {
        return value !== null && value !== undefined && (value !== '' || isNaN(Number(value))) ? Number(value) : undefined;
      },
    },
  }) month!: number;
  @property({
    type: Number,
    converter: {
      fromAttribute: (value: string | null) => {
        return value !== null && value !== undefined && (value !== '' || isNaN(Number(value))) ? Number(value) : undefined;
      },
    },
  }) day!: number;
  @property({
    type: Number,
    converter: {
      fromAttribute: (value: string | null) => {
        return value !== null && value !== undefined && (value !== '' || isNaN(Number(value))) ? Number(value) : undefined;
      },
    },
  }) hour!: number;
  @property({
    type: Number,
    converter: {
      fromAttribute: (value: string | null) => {
        return value !== null && value !== undefined && (value !== '' || isNaN(Number(value))) ? Number(value) : undefined;
      },
    },
  }) minute!: number;
  @property({
    type: Number,
    converter: {
      fromAttribute: (value: string | null) => {
        return value !== null && value !== undefined && (value !== '' || isNaN(Number(value))) ? Number(value) : undefined;
      },
    },
  }) second!: number;
  
  

  @property({ type: String }) rangestartdefault!: string;
  @property({ type: String }) rangeenddefault!: string;
  @property({ type: String }) dateNames!: string;
  @property({ type: Boolean }) mondayStart: boolean = false;
  @property({ type: Boolean }) hideWeekend: boolean = false;

  private readonly todayDate = new Date();

  @state() private rangestart: {year: number, month: number, day: number } | undefined = undefined;
  @state() private rangeend: {year: number, month: number, day: number } | undefined = undefined;
  @state() private rangeSelected = {start: false, end: false};

  @state() selectedDatetime!: {year: number, month: number, day: number, hour: number, minute: number, second: number};
  private parentDom: any;
  private addedToBody = false;
  private preventRender = false;
  private initialRender: boolean = true;
  private renderTimeoutId: any;

  async firstUpdated() {
    await this.updateComplete;

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

  updated(changedProperties: Map<PropertyKey, unknown>) {
    if(changedProperties.has('selectedDatetime')) {
    }
  }
  // connectedCallback() {
  //   super.connectedCallback();
  //   this.requestUpdate();
  // }


  protected shouldUpdate(changedProperties: Map<PropertyKey, unknown>): boolean {
    // 초기 렌더링은 항상 허용
    if (this.initialRender) {
      this.initialRender = false;
      return true;
    }
    
    // preventRender가 true면 렌더링 방지
    if (this.preventRender) {
      return false;
    }
    
    // 중요한 속성이 변경된 경우에만 렌더링 허용
    const importantProps = [
      'year', 'month', 'day', 'datetime', 'selectedDatetime',
      'rangestart', 'rangeend', 'active', 'inrange'
    ];
    
    const hasImportantChanges = Array.from(changedProperties.keys())
      .some(prop => importantProps.includes(prop.toString()));
    
    if (hasImportantChanges) {
      // 렌더링 허용 후 연속 렌더링 방지
      this.preventRender = true;
      
      // 일정 시간 후 preventRender 해제
      this.scheduleRenderReset();
      return true;
    }
    
    return false;
  }

  // 렌더링 방지 플래그를 초기화하는 메서드
  private scheduleRenderReset(): void {
    // 기존 타이머가 있다면 제거
    if (this.renderTimeoutId) {
      clearTimeout(this.renderTimeoutId);
    }
    
    // 렌더링 방지 해제
    this.renderTimeoutId = setTimeout(() => {
      this.preventRender = false;
      this.renderTimeoutId = null;
    }, 0);
  }

  private appendToRoot = () => {
    if (this.parentDom !== document.body) {
      this.parentDom = this.parentNode || this.parentElement;
      
      document.body.appendChild(this);
      this.addedToBody = true;
  
      setTimeout(() => this.requestUpdate(), 0);
    }
  }
  

  render() {    
    return html`
      <div class="calendar">
        ${this.variant === 'datetime' ? html`
          <sy-date-time-calendar
            mode=${this.mode}
            dateNames=${this.dateNames}
            .datetime=${this.selectedDatetime}
            ?mondayStart=${this.mondayStart}
            ?hideWeekend=${this.hideWeekend}
            @selected=${this.handleDateTimeSelected}>
          </sy-date-time-calendar>` : 
          this.variant === 'range' ? html`
          <sy-range-calendar
            active=${this.active}
            mode=${this.mode}
            dateNames=${this.dateNames}
            .datetime=${this.selectedDatetime}
            .rangestart=${this.rangestart}
            .rangeend=${this.rangeend}
            ?mondayStart=${this.mondayStart}
            ?hideWeekend=${this.hideWeekend}
            @startSelected=${this.handleRangeDateSelected}
            @endSelected=${this.handleRangeDateSelected}>
          </sy-range-calendar>` : 
          this.variant === 'date' ?
          html`
            <sy-date-calendar
              mode=${this.mode}
              dateNames=${this.dateNames}
              .datetime=${this.selectedDatetime}
              ?mondayStart=${this.mondayStart}
              ?hideWeekend=${this.hideWeekend}
              @selected=${this.handleDateSelected}>
            </sy-date-calendar>          
            `  : html`
            <sy-timepicker
                .hour="${this.selectedDatetime?.hour ?? this.todayDate.getHours()}"
                .minute="${this.selectedDatetime?.minute ?? this.todayDate.getMinutes()}"
                .second="${this.selectedDatetime?.second ?? this.todayDate.getSeconds()}"
                .format="${this.format}"
                @selected="${this.handleTimeSelected}">
            </sy-timepicker>
          `}
      </div>
    `;
  }


  private handleRangeDateSelected = (event: Event) => {   
    const customEvent = event as CustomEvent;

    const { year, month, day, range} = customEvent.detail;
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
    
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: {year, month, day, range},
        bubbles: true,
        composed: true
      })
    );

    if(this.rangeSelected.start && this.rangeSelected.end) {
      this.rangeSelected = {start: false, end: false};
    } else if (this.rangeSelected.start && !this.rangeSelected.end) {
      this.active = 'end';
    } else if (!this.rangeSelected.start && this.rangeSelected.end) {
      this.active = 'start';
    }
  }

  private handleDateTimeSelected = (event: Event) => {
    event.stopPropagation();
    const customEvent = event as CustomEvent;
  
    const { closable, year, month, day, hour, minute, second, range } = customEvent.detail;

    // 선택된 datetime을 저장
    this.selectedDatetime = {year, month, day, hour, minute, second};
    
    this.requestUpdate();
  
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: {closable, year, month, day, hour, minute, second, range},
        bubbles: true,
        composed: true
      })
    );
  
    if(closable) {
      this.handleCalendarClosed(event);
    }
  }


  private handleDateSelected = (event: Event) => {
    event.stopPropagation();
    const customEvent = event as CustomEvent;
  
    const { closable, year, month, day, hour, minute, second, range } = customEvent.detail;

    // 선택된 datetime을 저장
    this.selectedDatetime = {year, month, day, hour, minute, second};
    
    this.requestUpdate();
  
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: {closable, year, month, day, hour, minute, second, range},
        bubbles: true,
        composed: true
      })
    );
  
    if(closable) {
      this.handleCalendarClosed(event);
    }
  }


  private handleTimeSelected = (e: CustomEvent) => {
    e?.stopPropagation();
    
    const customEvent = e as CustomEvent;
    const { closable, hour, minute, second } = customEvent.detail;

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

    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: { 
          closable,
          year,
          month, 
          day,
          hour: this.selectedDatetime.hour,
          minute: this.selectedDatetime.minute, 
          second: this.selectedDatetime.second,
          format: this.format, // format 정보도 함께 전달
          range: undefined
        },
        bubbles: true,
        composed: true
      })
    );

    if(closable) {
      this.handleCalendarClosed(e);
    }
  }

  private handleCalendarClosed = (event: Event) => {
    this.dispatchEvent(
      new CustomEvent('closed', {
        detail: undefined,
        bubbles: true,
        composed: true
      })
    );
  }
}

