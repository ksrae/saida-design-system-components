import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SyColorpickerProps extends Components.SyColorpicker {
  changed?: (event: CustomEvent<any>) => void;
}

const renderColorpicker = (args: Partial<SyColorpickerProps>) => html`
  <sy-colorpicker
    ?disabled=${!!args.disabled}
    ?readonly=${!!args.readonly}
    ?inline=${!!args.inline}
    ?hideOpacity=${!!args.hideOpacity}
    ?showText=${!!args.showText}
    format=${ifDefined(args.format)}
    value=${ifDefined(args.value)}
    opacity=${ifDefined(args.opacity as any)}
    @changed=${args.changed ?? (() => {})}
  ></sy-colorpicker>
`;

export const ColorPicker = (args: SyColorpickerProps) => renderColorpicker(args);

export const ColorpickerFormat      = (args: { format: 'hex'|'hsb'|'rgb' }) => renderColorpicker(args);
export const ColorpickerOpacity     = (args: { opacity: number })           => renderColorpicker(args);
export const ColorpickerValue       = (args: { value: string })             => renderColorpicker(args);
export const ColorpickerDisabled    = (args: { disabled: boolean })         => renderColorpicker({ ...args, value: '#ff0000', opacity: 1 });
export const ColorpickerReadonly    = (args: { readonly: boolean })         => renderColorpicker({ ...args, value: '#ff0000', opacity: 1 });
export const ColorpickerShowText    = (args: { showText: boolean })         => renderColorpicker({ ...args, value: '#ff0000', opacity: 1 });
export const ColorpickerInline      = (args: { inline: boolean })           => renderColorpicker(args);
export const ColorpickerHideOpacity = (args: { hideOpacity: boolean })      => renderColorpicker(args);

export const ColorpickerChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('colorpickerChangedResult');
    const detail = (e as CustomEvent).detail ?? {};
    if (out) out.innerHTML = 'value:' + detail.value + '<br/>opacity:' + detail.opacity + '<br/>format:' + detail.format;
  };
  return html`
    <sy-colorpicker @changed=${handle}></sy-colorpicker>
    <p id="colorpickerChangedResult">(idle)</p>
  `;
};
