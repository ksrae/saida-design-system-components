import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
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

/* ============================================================================
 * Shared form-error pattern — identical to sy-autocomplete / sy-checkbox.
 *
 *   1. Author writes the error UI once inside [slot="error"].
 *   2. Either a native constraint fails (required) or app code calls
 *      el.setCustomError(): the same slot surfaces as the error.
 *   3. el.clearCustomError() restores native-only validation.
 * ============================================================================ */

export const DatepickerSetCustomError = () => {
  const elRef: Ref<HTMLSyDatepickerElement> = createRef();

  const writeStatus = async () => {
    const out = document.getElementById('datepickerCustomErrorOut');
    const el = elRef.value;
    if (!el || !out) return;
    const valid = await el.checkValidity();
    const status = await (el as any).getValidStatus();
    const message = (el as any).validationMessage ?? '';
    out.textContent = `valid=${valid}, status=${status || 'ok'}, message="${message}"`;
  };

  return html`
    <div style="display:flex; flex-direction:column; gap:12px; width:360px;">
      <sy-datepicker ${ref(elRef)} placeholder="Pick a date…">
        <div slot="error">
          <p style="color:#c0392b; margin:4px 0 0;">🚫 Custom error: this date is blocked by the app.</p>
        </div>
      </sy-datepicker>
      <div style="display:flex; gap:8px;">
        <sy-button variant="primary"
          @click=${() => elRef.value?.setCustomError().then(writeStatus)}>Force setCustomError()</sy-button>
        <sy-button variant="secondary"
          @click=${() => elRef.value?.clearCustomError().then(writeStatus)}>clearCustomError()</sy-button>
      </div>
      <p>Result: <span id="datepickerCustomErrorOut">(idle)</span></p>
    </div>
  `;
};

export const DatepickerRequiredSlotError = () => {
  const elRef: Ref<HTMLSyDatepickerElement> = createRef();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const out = document.getElementById('datepickerSlotErrorFormOut');
    const el = elRef.value;
    if (out && el) out.textContent = `Submitted (datepicker value on form)`;
  };

  const justValidate = async () => {
    const out = document.getElementById('datepickerSlotErrorFormOut');
    const el = elRef.value;
    if (!el) return;
    const valid = await el.reportValidity();
    if (out) out.textContent = `reportValidity() → ${valid}`;
  };

  return html`
    <form novalidate style="display:flex; flex-direction:column; gap:12px; width:360px;" @submit=${handleSubmit}>
      <sy-datepicker
        ${ref(elRef)}
        required
        name="deliveryDate"
        placeholder="Pick a delivery date"
      >
        <div slot="error">
          <p style="color:#c0392b; margin:4px 0 0;">🚫 Please select a delivery date.</p>
        </div>
      </sy-datepicker>
      <div style="display:flex; gap:8px;">
        <sy-button type="submit" variant="primary">Submit</sy-button>
        <sy-button type="button" variant="secondary" @click=${justValidate}>Just Validate</sy-button>
      </div>
      <p>Result: <span id="datepickerSlotErrorFormOut">(idle)</span></p>
    </form>
  `;
};

export const DatepickerFormData = () => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const out = document.getElementById('datepickerFormDataOut');
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const pairs: string[] = [];
    data.forEach((v, k) => pairs.push(`${k}=${v}`));
    if (out) out.textContent = pairs.join(', ') || '(empty)';
  };

  return html`
    <form style="display:flex; flex-direction:column; gap:12px; width:360px;" @submit=${handleSubmit}>
      <sy-datepicker name="startDate" variant="date" required placeholder="Start date">
        <div slot="error"><p style="color:#c0392b; margin:4px 0 0;">Required</p></div>
      </sy-datepicker>
      <sy-datepicker name="appointment" variant="datetime" placeholder="Appointment"></sy-datepicker>
      <div style="display:flex; gap:8px;">
        <sy-button type="submit" variant="primary">Submit</sy-button>
        <sy-button type="reset" variant="secondary">Reset</sy-button>
      </div>
      <p>FormData: <span id="datepickerFormDataOut">(idle)</span></p>
    </form>
  `;
};
