import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import globalCSS from './styles/timepicker.scss?inline';
import '../button/button.element';


@customElement('sy-timepicker')
export class TimePickerElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Number }) hour = 0;
  @property({ type: Number }) minute = 0;
  @property({ type: Number }) second = 0;
  @property({ type: Boolean }) hideButton = false; 
  @property({ type: String }) timeSeparator = ':'; // 시간 구분자 추가
  @property({ type: String }) format = 'hh:mm:ss'; // 시간 형식 지원 추가

  @state() selectedTime = '00:00:00';

  @query('.hour') hourColumn!: HTMLElement;
  @query('.minute') minuteColumn!: HTMLElement;
  @query('.second') secondColumn!: HTMLElement;


  async firstUpdated() {
    await this.updateComplete;

    this.updateSelectedTime();
    this.scrollToSelected();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('hour') || changedProperties.has('minute') || changedProperties.has('second') || changedProperties.has('timeSeparator') || changedProperties.has('format')) {
      this.updateSelectedTime();
      this.scrollToSelected();
    }
  }

  render() {
    return html`
      <div class="time-section">
        <div class="header">${this.selectedTime}</div>
        <div class="time-contents">
          <div class="time-column hour">${this.renderTimeColumn('hour', 24, this.hour)}</div>
          <div class="time-column minute">${this.renderTimeColumn('minute', 60, this.minute)}</div>
          <div class="time-column second">${this.renderTimeColumn('second', 60, this.second)}</div>
        </div>
        ${!this.hideButton ? html`
        <div class="calendar-footer">
          <sy-button variant="primary" size="small"  @click="${this.confirmSelection}">OK</sy-button>
        </div>` : nothing}
      </div>
    `;
  }

  
private confirmSelection() {
    // closable = true
    this.dispatchEvent(new CustomEvent('selected', {
      detail: {
        closable: true,
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        range: undefined
      },
        bubbles: true,
        composed: true
      })
    );
}

  private renderTimeColumn(type: 'hour' | 'minute' | 'second', max: number, selected?: number) {
    const items = [];
    for (let i = 0; i < max; i++) {
      const value = i < 10 ? `0${i}` : `${i}`;
      const isSelected = selected === i;
      items.push(html`
        <div class="time-item ${isSelected ? 'selected' : ''}" @click="${() => this.selectTime(type, i)}">
          ${value}
        </div>
      `);
    }

    items.push(html`<div class="${type} time-padding-bottom"></div>`);
    return items;
  }

  private selectTime(type: 'hour' | 'minute' | 'second', value: number) {
    this[type] = value;
    this.updateSelectedTime();

    this.dispatchEvent(new CustomEvent('selected', {
      detail: {
        closable: false,
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        range: undefined
      },
        bubbles: true,
        composed: true
      })
    );
  }

  private updateSelectedTime() {
    // format에 따라 시간을 포맷팅
    const hour = this.hour < 10 ? '0' + this.hour : this.hour.toString();
    const minute = this.minute < 10 ? '0' + this.minute : this.minute.toString();
    const second = this.second < 10 ? '0' + this.second : this.second.toString();

    // format 패턴에 따라 시간 문자열 생성
    let formattedTime = this.format;
    
    // hh -> hour, mm -> minute, ss -> second 치환
    formattedTime = formattedTime.replace(/hh/g, hour);
    formattedTime = formattedTime.replace(/mm/g, minute);
    formattedTime = formattedTime.replace(/ss/g, second);
    
    this.selectedTime = formattedTime;
  }

  private scrollToSelected() {
    if (this.hourColumn) {
      this.scrollToIndex(this.hourColumn, this.hour);
    }
    if (this.minuteColumn) {
      this.scrollToIndex(this.minuteColumn, this.minute);
    }
    if (this.secondColumn) {
      this.scrollToIndex(this.secondColumn, this.second);
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
