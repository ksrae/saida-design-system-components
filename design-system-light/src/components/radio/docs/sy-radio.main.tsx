import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyRadioProps extends Components.SyRadio {
  slot?: any;
  selected?: (event: CustomEvent<string>) => void;
}
export interface SyRadioGroupProps extends Components.SyRadioGroup {
  slot?: any;
  changed?: (event: CustomEvent<{ value: string; isValid: boolean; status: string }>) => void;
}
export interface SyRadioButtonProps extends Components.SyRadioButton {
  slot?: any;
  selected?: (event: CustomEvent<string>) => void;
}

const defaultGroupChildren = html`
  <sy-radio value="a">A</sy-radio>
  <sy-radio value="b">B</sy-radio>
  <sy-radio value="c">C</sy-radio>
`;

export const RadioGroup = (a: SyRadioGroupProps) => html`
  <sy-radio-group
    ?disabled=${!!a.disabled}
    ?readonly=${!!a.readonly}
    ?required=${!!a.required}
    .defaultValue=${a.defaultValue}
    .noNativeValidity=${a.noNativeValidity}
    size=${ifDefined(a.size)}
    position=${ifDefined(a.position)}
    variant=${ifDefined(a.variant)}
    name=${ifDefined(a.name)}
  >${defaultGroupChildren}</sy-radio-group>
`;

export const Radio = (a: SyRadioProps) => html`
  <sy-radio ?checked=${!!a.checked} ?disabled=${!!a.disabled} ?readonly=${!!a.readonly} value=${ifDefined(a.value)}>Option</sy-radio>
`;

export const RadioButton = (a: SyRadioButtonProps) => html`
  <sy-radio-group>
    <sy-radio-button ?checked=${!!a.checked} ?disabled=${!!a.disabled} value=${ifDefined(a.value)} size=${ifDefined(a.size)} variant=${ifDefined(a.variant)}>Option</sy-radio-button>
  </sy-radio-group>
`;

// radio attrs
export const RadioChecked  = (a: { checked: boolean })  => html`<sy-radio ?checked=${!!a.checked} value="a">Option</sy-radio>`;
export const RadioDisabled = (a: { disabled: boolean }) => html`<sy-radio ?disabled=${!!a.disabled} value="a">Option</sy-radio>`;
export const RadioReadonly = (a: { readonly: boolean }) => html`<sy-radio ?readonly=${!!a.readonly} value="a">Option</sy-radio>`;
export const RadioValue    = (a: { value: string })     => html`<sy-radio value=${ifDefined(a.value)}>Option ${a.value}</sy-radio>`;

export const RadioSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('rSelResult');
    if (out) out.textContent = `selected: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-radio value="a" @selected=${handle}>Option</sy-radio>
    <p id="rSelResult">(idle)</p>
  `;
};

// group attrs
export const RadioGroupDisabled         = (a: { disabled: boolean })   => html`<sy-radio-group ?disabled=${!!a.disabled}>${defaultGroupChildren}</sy-radio-group>`;
export const RadioGroupDefaultValue     = (a: { defaultValue: string })=> html`<sy-radio-group .defaultValue=${a.defaultValue}>${defaultGroupChildren}</sy-radio-group>`;
export const RadioGroupReadonly         = (a: { readonly: boolean })   => html`<sy-radio-group ?readonly=${!!a.readonly}>${defaultGroupChildren}</sy-radio-group>`;
export const RadioGroupRequired         = (a: { required: boolean })   => html`<sy-radio-group ?required=${!!a.required}>${defaultGroupChildren}</sy-radio-group>`;
export const RadioGroupSize             = (a: { size: any })           => html`<sy-radio-group size=${ifDefined(a.size)}>${defaultGroupChildren}</sy-radio-group>`;
export const RadioGroupPosition         = (a: { position: any })       => html`<sy-radio-group position=${ifDefined(a.position)}>${defaultGroupChildren}</sy-radio-group>`;
export const RadioGroupVariant          = (a: { variant: any })        => html`<sy-radio-group variant=${ifDefined(a.variant)}>${defaultGroupChildren}</sy-radio-group>`;
export const RadioGroupName             = (a: { name: string })        => html`<sy-radio-group name=${ifDefined(a.name)}>${defaultGroupChildren}</sy-radio-group>`;
export const RadioGroupNoNativeValidity = (a: { noNativeValidity: boolean }) =>
  html`<sy-radio-group required .noNativeValidity=${a.noNativeValidity}>${defaultGroupChildren}</sy-radio-group>`;

export const RadioGroupChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('rgChResult');
    if (out) out.textContent = JSON.stringify((e as CustomEvent).detail);
  };
  return html`
    <sy-radio-group @changed=${handle}>${defaultGroupChildren}</sy-radio-group>
    <p id="rgChResult">(idle)</p>
  `;
};

const renderGroupMethod = (label: string, action: (g: HTMLSyRadioGroupElement, out: HTMLElement | null) => Promise<void> | void, attrs?: { required?: boolean }) => {
  const gRef: Ref<HTMLSyRadioGroupElement> = createRef();
  const outId = `rgm-${Math.random().toString(36).slice(2, 8)}`;
  return html`
    <sy-radio-group ${ref(gRef)} ?required=${!!attrs?.required}>${defaultGroupChildren}</sy-radio-group><br/>
    <sy-button @click=${async () => { if (gRef.value) await action(gRef.value, document.getElementById(outId)); }}>${label}</sy-button>
    <p id=${outId}>(idle)</p>
  `;
};

export const RadioGroupCheckValidity = () =>
  renderGroupMethod('checkValidity()', async (g, out) => { const r = await g.checkValidity(); if (out) out.textContent = `valid: ${r}`; }, { required: true });
export const RadioGroupReportValidity = () =>
  renderGroupMethod('reportValidity()', (g) => { g.reportValidity(); }, { required: true });
export const RadioGroupSetCustomError = () =>
  renderGroupMethod('setCustomError()', (g) => { g.setCustomError(); });
export const RadioGroupClearCustomError = () =>
  renderGroupMethod('clearCustomError()', (g) => { g.clearCustomError(); });
export const RadioGroupGetStatus = () =>
  renderGroupMethod('getStatus()', async (g, out) => { const s = await g.getStatus(); if (out) out.textContent = `status: ${s}`; });

// radio-button attrs
export const RadioButtonChecked  = (a: { checked: boolean })  => html`<sy-radio-group><sy-radio-button ?checked=${!!a.checked} value="a">Opt</sy-radio-button></sy-radio-group>`;
export const RadioButtonDisabled = (a: { disabled: boolean }) => html`<sy-radio-group><sy-radio-button ?disabled=${!!a.disabled} value="a">Opt</sy-radio-button></sy-radio-group>`;
export const RadioButtonValue    = (a: { value: string })     => html`<sy-radio-group><sy-radio-button value=${ifDefined(a.value)}>Opt</sy-radio-button></sy-radio-group>`;
export const RadioButtonSize     = (a: { size: any })         => html`<sy-radio-group size=${ifDefined(a.size)}><sy-radio-button value="a">A</sy-radio-button><sy-radio-button value="b">B</sy-radio-button></sy-radio-group>`;
export const RadioButtonVariant  = (a: { variant: any })      => html`<sy-radio-group variant=${ifDefined(a.variant)}><sy-radio-button value="a">A</sy-radio-button><sy-radio-button value="b">B</sy-radio-button></sy-radio-group>`;

export const RadioButtonSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('rbSelResult');
    if (out) out.textContent = `selected: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-radio-group><sy-radio-button value="a" @selected=${handle}>Opt</sy-radio-button></sy-radio-group>
    <p id="rbSelResult">(idle)</p>
  `;
};
