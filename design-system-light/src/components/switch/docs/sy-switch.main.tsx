import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SySwitchProps extends Components.SySwitch {
  changed?: (event: CustomEvent<boolean>) => void;
}

export const Switch = ({ checked, disabled, label, loading, readonly, size, name }: SySwitchProps) => html`
  <sy-switch
    ?checked=${!!checked}
    ?disabled=${!!disabled}
    ?loading=${!!loading}
    ?readonly=${!!readonly}
    label=${ifDefined(label)}
    size=${ifDefined(size)}
    name=${ifDefined(name)}>
  </sy-switch>
`;

export const SwitchChecked  = (args: { checked: boolean })  => html`<sy-switch ?checked=${!!args.checked} label="Checked demo"></sy-switch>`;
export const SwitchDisabled = (args: { disabled: boolean }) => html`<sy-switch ?disabled=${!!args.disabled} label="Disabled demo"></sy-switch>`;
export const SwitchLabel    = (args: { label: string })     => html`<sy-switch label=${ifDefined(args.label)}></sy-switch>`;
export const SwitchLoading  = (args: { loading: boolean })  => html`<sy-switch ?loading=${!!args.loading} label="Loading demo"></sy-switch>`;
export const SwitchReadonly = (args: { readonly: boolean }) => html`<sy-switch ?readonly=${!!args.readonly} label="Readonly demo"></sy-switch>`;
export const SwitchSize     = (args: { size: 'small' | 'medium' }) => html`<sy-switch size=${ifDefined(args.size)} label="Size demo"></sy-switch>`;
export const SwitchName     = (args: { name: string })      => html`<sy-switch name=${ifDefined(args.name)} label="Name demo"></sy-switch>`;

export const SwitchChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('switchChangedResult');
    if (out) out.textContent = `changed: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-switch label="Toggle me" @changed=${handle}></sy-switch>
    <p id="switchChangedResult">(idle)</p>
  `;
};
