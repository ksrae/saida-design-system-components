import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DateCalendarElement } from './date-calendar.element';
import './timepicker.element'; // Import the new time picker component

@customElement('sy-date-time-calendar')
export class DateTimeCalendarElement extends DateCalendarElement {
  // datetime 속성이 부모로부터 전달되었는지 (즉, 초기 선택값이 있는지) 추적하는 상태
  @state() private hasInitialSelection = false;

  static override styles = css`
    ${super.styles}

    /* 추가 스타일 */
    .datetime-container {
      display: flex;
    }
    .time-picker-container {
      border-left: 1px solid var(--sy-border-color, #e0e0e0); /* Assuming a CSS variable for border color */
      padding: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .calendar-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
      border-top: 1px solid var(--sy-border-color, #e0e0e0);
    }
  `;

  // willUpdate는 속성이 변경되기 직전에 호출됩니다.
  // 여기서 부모로부터 datetime이 전달되었는지 여부를 판단하는 것이 가장 정확합니다.
  override willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('datetime')) {
      // datetime 속성이 변경될 때, 유효한 값(day가 포함된)이 들어왔는지 확인하여
      // 초기 선택값이 있었는지를 판단합니다.
      const newDatetime = changedProperties.get('datetime');
      this.hasInitialSelection = !!(this.datetime && this.datetime.day !== undefined);
    }
    super.willUpdate(changedProperties);
  }

  // firstUpdated에서 초기 상태를 한 번 더 확인합니다.
  override async firstUpdated() {
    await super.firstUpdated();
    // 컴포넌트가 처음 렌더링될 때 datetime 속성의 초기값을 확인합니다.
    this.hasInitialSelection = !!(this.datetime && this.datetime.day !== undefined);
    
    // 만약 초기 datetime 값이 없다면, 내부 상태를 현재 시간으로 초기화합니다.
    // 이는 timepicker가 초기값을 가질 수 있도록 하기 위함입니다.
    if (!this.hasInitialSelection) {
        const now = new Date();
        this.datetime = {
            year: this.currentDate.getFullYear(),
            month: this.currentDate.getMonth(),
            day: this.currentDate.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds()
        };
    }
  }


  override render() {
    const now = new Date();
    return html`
      <div class="datetime-container">
        <div class="datetime-calendar-container">
          <!-- 부모인 DateCalendarElement의 render()를 호출하여 날짜 부분을 렌더링합니다. -->
          ${super.render()}
        </div>
        <div class="time-picker-container">
          <sy-timepicker
            .hour="${(this.hasInitialSelection && this.datetime) ? this.datetime.hour : now.getHours()}"
            .minute="${(this.hasInitialSelection && this.datetime) ? this.datetime.minute : now.getMinutes()}"
            .second="${(this.hasInitialSelection && this.datetime) ? this.datetime.second : now.getSeconds()}"
            hideButton
            @changed="${this.handleTimeChanged}"
          ></sy-timepicker>
          <div class="calendar-footer">
            <sy-button variant="primary" size="small" @click="${this.confirmSelection}">OK</sy-button>
          </div>
        </div>
      </div>
    `;
  }

  // DateCalendarElement의 selectDate 메서드를 오버라이드합니다.
  protected override selectDate(year: number, month: number, day: number, closable: boolean = true): void {
    let hour, minute, second;

    // 만약 초기 선택값이 있었다면(hasInitialSelection), 기존 시간을 유지합니다.
    // 이것은 사용자가 날짜만 바꾸고 시간은 유지하고 싶을 때를 위함입니다.
    if (this.hasInitialSelection && this.datetime) {
      hour = this.datetime.hour;
      minute = this.datetime.minute;
      second = this.datetime.second;
    } else {
      // 초기 선택값이 없었다면(input이 비어있었음), 현재 시간을 가져옵니다.
      const now = new Date();
      hour = now.getHours();
      minute = now.getMinutes();
      second = now.getSeconds();
    }
    
    this.datetime = { year, month, day, hour, minute, second };

    // 날짜를 한 번 선택했으므로, 이제 '선택된 값'이 있는 상태가 됩니다.
    this.hasInitialSelection = true;
    
    // closable: false로 이벤트를 보내, OK 버튼을 누르기 전까지 캘린더가 닫히지 않도록 합니다.
    this.dispatchEvent(new CustomEvent('selected', {
      detail: {
        closable: false, // OK 버튼을 눌러야 닫히므로 항상 false
        ...this.datetime,
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleTimeChanged(event: CustomEvent) {
    const { hour, minute, second } = event.detail;
    
    // 시간이 변경될 때, 날짜는 그대로 두고 시간만 업데이트합니다.
    // 날짜가 아직 선택되지 않은 상태일 수 있으므로, 현재 캘린더가 보여주는 날짜를 사용합니다.
    const year = this.datetime?.year ?? this.currentDate.getFullYear();
    const month = this.datetime?.month ?? this.currentDate.getMonth();
    const day = this.datetime?.day ?? this.currentDate.getDate();

    this.datetime = { year, month, day, hour, minute, second };
  }

  private confirmSelection() {
      // OK 버튼을 누를 때, 날짜가 아직 선택되지 않았다면(초기 상태 그대로)
      // 현재 캘린더에 표시된 오늘 날짜를 선택한 것으로 간주합니다.
    if (!this.hasInitialSelection) {
        const now = new Date();
        this.datetime = {
            year: this.currentDate.getFullYear(),
            month: this.currentDate.getMonth(),
            day: this.currentDate.getDate(),
            hour: this.datetime?.hour ?? now.getHours(),
            minute: this.datetime?.minute ?? now.getMinutes(),
            second: this.datetime?.second ?? now.getSeconds(),
        };
    }

    // 사용자가 OK 버튼을 누르면, closable: true로 이벤트를 보내 캘린더를 닫도록 합니다.
    this.dispatchEvent(new CustomEvent('selected', {
      detail: {
        closable: true,
        ...this.datetime,
        range: undefined
      },
      bubbles: true,
      composed: true
    }));
  }
}