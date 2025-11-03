import { html } from "lit";
import { Components } from '../../../components';

export interface SyColorpickerProps extends Components.SyColorpicker {
  changed?: (event: CustomEvent<any>) => void;
}
export const ColorPicker = ({format, value, opacity, disabled, readonly, inline, hideOpacity, showText, changed} : SyColorpickerProps) => {
  return html`
		<sy-colorpicker
			format=${format}
			value="${value}"
			opacity="${opacity}"
			?disabled="${disabled}"
			?readonly="${readonly}"
			?inline="${inline}"
			?hideOpacity="${hideOpacity}"
			?showText="${showText}"
			@changed=${changed}
		>
		</sy-colorpicker>
  `
};

export const ColorpickerFormat = (args: {format: 'hex' | 'hsb' | 'rgb'}) => {
	return html`
		<sy-colorpicker format="${args.format}">
		</sy-colorpicker>
	`;
}

export const ColorpickerOpacity = (args: {opacity: number}) => {
	return html`
		<sy-colorpicker opacity="${args.opacity}">
		</sy-colorpicker>
	`;
}

export const ColorpickerValue = (args: {value: string}) => {
	return html`
		<sy-colorpicker value="${args.value}">
		</sy-colorpicker>
	`;
}

export const ColorpickerDisabled = (args: {disabled: boolean}) => {
	return html`
		<sy-colorpicker value="#ff0000" opacity="1" ?disabled="${args.disabled}">
		</sy-colorpicker>
	`;
}

export const ColorpickerReadonly = (args: {readonly: boolean}) => {
	return html`
		<sy-colorpicker value="#ff0000" opacity="1" ?readonly="${args.readonly}">
		</sy-colorpicker>
	`;
}

export const ColorpickerShowText = (args: {showText: boolean}) => {
	return html`
		<sy-colorpicker value="#ff0000" opacity="1" ?showText="${args.showText}">
		</sy-colorpicker>
	`;
}

export const ColorpickerInline = (args: {inline: boolean}) => {
	return html`
	<sy-colorpicker ?inline=${args.inline}></sy-colorpicker>
	`;
}

export const ColorpickerHideOpacity = (args: {hideOpacity: boolean}) => {
	return html`
	<sy-colorpicker ?hideOpacity=${args.hideOpacity}></sy-colorpicker>
	`;
}

export const ColorpickerChanged = () => {
	return html`
	<sy-colorpicker id="syColorpickerChanged"></sy-colorpicker>
	<p id="colorpickerChangedResult"></p>
	<script>
		(() => {
			const colorpicker = document.getElementById('syColorpickerChanged');
			const result = document.getElementById('colorpickerChangedResult');

			const handleChanged = (e) => {
				result.innerHTML = 'value:' + e.detail.value + '<br/>opacity:' + e.detail.opacity + '<br/>format:' + e.detail.format;
			};

			colorpicker.addEventListener('changed', handleChanged);
		})();
	</script>
	`;
}
