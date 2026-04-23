import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SyDatepickerProps extends Components.SyDatepicker {
  changed?: (event: CustomEvent<any>) => void;
  selected?: (event: CustomEvent<any>) => void;
}

const renderDatepicker = (args: Partial<SyDatepickerProps>) => html`
  <sy-datepicker
    ?disabled=${!!args.disabled}
    ?readonly=${!!args.readonly}
    ?mondayStart=${!!args.mondayStart}
    ?hideWeekend=${!!args.hideWeekend}
    mode=${ifDefined(args.mode)}
    variant=${ifDefined(args.variant)}
    year=${ifDefined(args.year as any)}
    month=${ifDefined(args.month as any)}
    day=${ifDefined(args.day as any)}
    hour=${ifDefined(args.hour as any)}
    minute=${ifDefined(args.minute as any)}
    second=${ifDefined(args.second as any)}
    dateNames=${ifDefined(args.dateNames as any)}
    placeholder=${ifDefined(args.placeholder)}
    format=${ifDefined(args.format)}
  ></sy-datepicker>
`;

export const Datepicker = (args: SyDatepickerProps) => renderDatepicker(args);

export const DatepickerDate = (args: { year: string; month: string; day: string; hour: string; minute: string; second: string }) =>
  renderDatepicker({ ...args, variant: 'datetime' } as any);

export const DatepickerDateNames    = (args: { dateNames: string })                              => renderDatepicker(args as any);
export const DatepickerDisabled     = (args: { disabled: boolean })                              => renderDatepicker(args);
export const DatepickerFormat       = (args: { format: string; variant: 'date'|'datetime'|'range'|'time' }) => renderDatepicker(args);
export const DatepickerHideWeekend  = (args: { hideWeekend: boolean })                           => renderDatepicker(args);
export const DatepickerMode         = (args: { mode: 'day'|'month'|'year' })                     => renderDatepicker(args);
export const DatepickerMondayStart  = (args: { mondayStart: boolean })                           => renderDatepicker(args);
export const DatepickerPlaceholder  = (args: { placeholder: string })                            => renderDatepicker(args);
export const DatepickerReadonly     = (args: { readonly: boolean })                              => renderDatepicker(args);
export const DatepickerVariant      = (args: { variant: 'date'|'datetime'|'range'|'time' })      => renderDatepicker(args);

export const DatepickerSelected = (args: { variant: 'date'|'datetime'|'time'|'range' }) => {
  const handle = (event: Event) => {
    const result      = document.getElementById('datepickerSelectedResult');
    const startResult = document.getElementById('datepickerRangeStartSelectedResult');
    const endResult   = document.getElementById('datepickerRangeEndSelectedResult');
    if (result) result.textContent = '';
    if (startResult) startResult.textContent = '';
    if (endResult) endResult.textContent = '';

    const detail = (event as CustomEvent).detail ?? {};

    if (args.variant === 'range') {
      const { rangestart, rangeend } = detail;
      if (rangestart && startResult) {
        startResult.textContent = `Start Date: ${rangestart.year}-${rangestart.month}-${rangestart.day}`;
      }
      if (rangeend && endResult) {
        endResult.textContent = `End Date: ${rangeend.year}-${rangeend.month}-${rangeend.day}`;
      }
    } else {
      const { year, month, day, hour, minute, second } = detail;
      if (result) {
        result.textContent =
          `Selected Date: ${year ?? ''}-${month ?? ''}-${day ?? ''} ${hour ?? ''}:${minute ?? ''}:${second ?? ''}`;
      }
    }
  };

  return html`
    <sy-datepicker variant=${ifDefined(args.variant)} @selected=${handle}></sy-datepicker>
    <p id="datepickerSelectedResult"></p>
    <p id="datepickerRangeStartSelectedResult"></p>
    <p id="datepickerRangeEndSelectedResult"></p>
  `;
};

export const DatepickerChanged = () => {
  const handle = (event: Event) => {
    const result = document.getElementById('datepickerChangedResult');
    const { mode, value } = (event as CustomEvent).detail ?? {};
    if (result) result.textContent = `value: ${value}` + (mode ? `, mode: ${mode}` : '');
  };
  return html`
    <sy-datepicker @changed=${handle}></sy-datepicker>
    <p id="datepickerChangedResult">(idle)</p>
  `;
};
