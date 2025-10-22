import { html } from "lit";
import '../datepicker.element';
import '../calendar.element';
import '../date-calendar.element';
import '../date-time-calendar.element';
import '../range-calendar.element';
import '../timepicker.element';


export interface DatepickerProps {
	mode: 'day' | 'month' | 'year';
	variant: 'date' | 'datetime' | 'range' | 'time';
	disabled: boolean;
	readonly: boolean;
	year: string;
	month: string;
	day: string;
	hour: string;
	minute: string;
	second: string;
	dateNames: string;
	mondayStart: boolean;
	hideWeekend: boolean;
	// placement: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
	placeholder: string;
	format: string;
	changed?: () => void;
	selected?: () => void;
}

export const Datepicker = ({mode, variant, year, month, day, hour, minute, second, dateNames, disabled, readonly, mondayStart, hideWeekend, placeholder, format} : DatepickerProps) => {
	return html`
		<sy-datepicker 
			mode="${mode}"
			variant="${variant}"
			year="${year}"
			month="${month}"
			day="${day}"
			hour="${hour}"
			minute="${minute}"
			second="${second}"
			dateNames="${dateNames}"
			?disabled=${disabled}
			?readonly=${readonly}
			?mondayStart=${mondayStart}
			?hideWeekend=${hideWeekend}
			placeholder="${placeholder}"
			format="${format}"
		>
		</sy-datepicker>`;
}

export const DatepickerDate = (args: {year: string, month: string, day: string, hour: string, minute: string, second: string}) => {
  return html`
<sy-datepicker variant="datetime" year="${args.year}" month="${args.month}" day="${args.day}" hour="${args.hour}" minute="${args.minute}" second="${args.second}">
</sy-datepicker>
`
};

export const DatepickerDateNames = (args: {dateNames: string}) => {
  return html`
<sy-datepicker dateNames="${args.dateNames}">
</sy-datepicker>
`
};

export const DatepickerDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-datepicker ?disabled="${args.disabled}">
</sy-datepicker>
`
};

export const DatepickerFormat = (args: {format: string, variant: 'date' | 'datetime' | 'range' | 'time'}) => {
  return html`
<sy-datepicker variant="${args.variant}" format="${args.format}">
</sy-datepicker>
`
};

export const DatepickerHideWeekend = (args: {hideWeekend: boolean}) => {
  return html`
<sy-datepicker ?hideWeekend="${args.hideWeekend}">
</sy-datepicker>
`
};

export const DatepickerMode = (args: {mode: 'day' | 'month' | 'year'}) => {
  return html`
<sy-datepicker mode="${args.mode}">
</sy-datepicker>
`
};

export const DatepickerMondayStart = (args: {mondayStart: boolean}) => {
  return html`
<sy-datepicker ?mondayStart="${args.mondayStart}">
</sy-datepicker>
`
};

export const DatepickerPlaceholder = (args: {placeholder: string}) => {
  return html`
<sy-datepicker placeholder="${args.placeholder}">
</sy-datepicker>
`
};

// export const DatepickerPlacement = (args: {placement: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'}) => {
//   return html`
// <sy-datepicker placement="${args.placement}">
// </sy-datepicker>
// `
// };

export const DatepickerReadonly = (args: {readonly: boolean}) => {
  return html`
<sy-datepicker ?readonly="${args.readonly}">
</sy-datepicker>
`
};

export const DatepickerVariant = (args: {variant: 'date' | 'datetime' | 'range' | 'time'}) => {
  return html`
<sy-datepicker variant="${args.variant}">
</sy-datepicker>
`
};

export const DatepickerSelected = (args: {variant: 'date' | 'datetime' | 'time' | 'range'}) => {
  return html`
<sy-datepicker id="datepickerSelected" variant="${args.variant}">
</sy-datepicker>

<p id="datepickerSelectedResult"></p>
<p id="datepickerRangeStartSelectedResult"></p>
<p id="datepickerRangeEndSelectedResult"></p>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const datepicker = document.getElementById('datepickerSelected');
    const result = document.getElementById('datepickerSelectedResult');
    const startResult = document.getElementById('datepickerRangeStartSelectedResult');
    const endResult = document.getElementById('datepickerRangeEndSelectedResult');

    if (datepicker) {
      datepicker.addEventListener('selected', (event) => {
				result.textContent = '';
				startResult.textContent = '';
				endResult.textContent = '';

				const variant = document.querySelector('#control-variant')?.value || 'date';

        if (variant === 'range') {
          const { rangestart, rangeend } = event.detail;
					if(rangestart) {
						startResult.textContent = "Start Date: " + rangestart.year + "-" + rangestart.month + "-" + rangestart.day;
					}
          if(rangeend) {
						endResult.textContent = "End Date: " + rangeend.year + "-" + rangeend.month + "-" + rangeend.day;
					}
        } else {
          const { year, month, day, hour, minute, second } = event.detail;
          result.textContent = "Selected Date: " + (year || '') + "-" + (month || '') + "-" + (day || '') + " " + (hour || '') + ":" + (minute || '') + ":" + (second || '');
        }
      });
    }
  });
</script>
`;
};

export const DatepickerChanged = () => {
  return html`
<sy-datepicker id="datepickerChanged">
</sy-datepicker>

<p id="datepickerChangedResult"></p>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const datepicker = document.getElementById('datepickerChanged');
    const result = document.getElementById('datepickerChangedResult');

    if (datepicker) {
      datepicker.addEventListener('changed', (event) => {
				result.textContent = '';

          const { mode, value } = event.detail;
          result.textContent = "value: " + value + (mode ? ", mode: " + mode : "");
        // }
      });
    }
  });
</script>
`;
};
