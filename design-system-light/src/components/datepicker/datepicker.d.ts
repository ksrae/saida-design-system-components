import { CalendarElement } from "./calendar.element";
import { DateCalendarElement } from "./date-calendar.element";
import { DateTimeCalendarElement } from "./date-time-calendar.element";
import { DatePickerElement } from "./datepicker.element";
import { RangeCalendarElement } from "./range-calendar.element";
import { TimePickerElement } from "./timepicker.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-calendar': CalendarElement;
    'sy-datepicker': DatePickerElement;
    'sy-timepicker': TimePickerElement;
    'sy-date-calendar': DateCalendarElement;
    'sy-date-time-calendar': DateTimeCalendarElement;
    'sy-range-calendar': RangeCalendarElement;
  }
}

// currentDate: 달력을 이동시킬 목적
// datetime: 현재 선택된 날짜를 표시할 목적

// sy-calendar는 date-picker를 연결시켜주기 위한 매개체이므로 직접 호출하면 정상 동작이 안됨
// sy-datepicker가 검색 가능한 달력의 중심
// sy-timepicker는 
// sy-date-caneldar는 캘린더만 호출

// 

