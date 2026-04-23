import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SySelectProps extends Components.SySelect {
  slot?: any;
  opened?: (e: CustomEvent<void>) => void;
  removed?: (e: CustomEvent<any>) => void;
  selected?: (e: CustomEvent<any>) => void;
  focused?: (e: CustomEvent<void>) => void;
  blured?: (e: CustomEvent<void>) => void;
  inputChanged?: (e: CustomEvent<string>) => void;
  cleared?: (e: CustomEvent<void>) => void;
}
export interface SySelectOptionProps extends Components.SySelectOption {
  slot?: any;
  onActivated?: (e: CustomEvent<{ value: string; label: string }>) => void;
}

const defaultOptions = html`
  <sy-select-option value="apple" label="Apple">Apple</sy-select-option>
  <sy-select-option value="banana" label="Banana">Banana</sy-select-option>
  <sy-select-option value="cherry" label="Cherry">Cherry</sy-select-option>
`;

export const Select = (a: SySelectProps) => html`
  <sy-select
    ?clearable=${!!a.clearable}
    ?disabled=${!!a.disabled}
    ?readonly=${!!a.readonly}
    ?empty=${!!a.empty}
    ?error=${!!a.error}
    ?hide=${!!a.hide}
    ?loading=${!!a.loading}
    ?required=${!!a.required}
    .maxTagCount=${a.maxTagCount as any}
    .defaultValue=${a.defaultValue}
    .noNativeValidity=${a.noNativeValidity}
    .isTreeSelect=${a.isTreeSelect}
    .selectedOptions=${a.selectedOptions}
    placeholder=${ifDefined(a.placeholder)}
    size=${ifDefined(a.size)}
    mode=${ifDefined(a.mode)}
    name=${ifDefined(a.name)}
  >${defaultOptions}</sy-select>
`;

export const SelectOption = (a: SySelectOptionProps) => html`
  <sy-select>
    <sy-select-option
      ?disabled=${!!a.disabled}
      ?readonly=${!!a.readonly}
      ?selected=${!!a.selected}
      ?hide=${!!a.hide}
      ?empty=${!!a.empty}
      ?loading=${!!a.loading}
      ?active=${!!a.active}
      .showTooltip=${a.showTooltip}
      .isCustomTag=${a.isCustomTag}
      label=${ifDefined(a.label)}
      value=${ifDefined(a.value)}
    >Option</sy-select-option>
  </sy-select>
`;

// select attrs
export const SelectClearable        = (a: { clearable: boolean })   => html`<sy-select ?clearable=${!!a.clearable} .defaultValue=${'apple'}>${defaultOptions}</sy-select>`;
export const SelectDisabled         = (a: { disabled: boolean })    => html`<sy-select ?disabled=${!!a.disabled}>${defaultOptions}</sy-select>`;
export const SelectReadonly         = (a: { readonly: boolean })    => html`<sy-select ?readonly=${!!a.readonly}>${defaultOptions}</sy-select>`;
export const SelectEmpty            = (a: { empty: boolean })       => html`<sy-select ?empty=${!!a.empty}>${defaultOptions}</sy-select>`;
export const SelectError            = (a: { error: boolean })       => html`<sy-select ?error=${!!a.error}>${defaultOptions}</sy-select>`;
export const SelectHide             = (a: { hide: boolean })        => html`<sy-select ?hide=${!!a.hide}>${defaultOptions}</sy-select>`;
export const SelectLoading          = (a: { loading: boolean })     => html`<sy-select ?loading=${!!a.loading}>${defaultOptions}</sy-select>`;
export const SelectMaxTagCount      = (a: { maxTagCount: number })  => html`<sy-select mode="multiple" .maxTagCount=${a.maxTagCount} .defaultValue=${'apple,banana,cherry'}>${defaultOptions}</sy-select>`;
export const SelectDefaultValue     = (a: { defaultValue: string }) => html`<sy-select .defaultValue=${a.defaultValue}>${defaultOptions}</sy-select>`;
export const SelectPlaceholder      = (a: { placeholder: string })  => html`<sy-select placeholder=${ifDefined(a.placeholder)}>${defaultOptions}</sy-select>`;
export const SelectSize             = (a: { size: any })            => html`<sy-select size=${ifDefined(a.size)}>${defaultOptions}</sy-select>`;
export const SelectMode             = (a: { mode: any })            => html`<sy-select mode=${ifDefined(a.mode)}>${defaultOptions}</sy-select>`;
export const SelectRequired         = (a: { required: boolean })    => html`<sy-select ?required=${!!a.required}>${defaultOptions}</sy-select>`;
export const SelectName             = (a: { name: string })         => html`<sy-select name=${ifDefined(a.name)}>${defaultOptions}</sy-select>`;
export const SelectNoNativeValidity = (a: { noNativeValidity: boolean }) => html`<sy-select required .noNativeValidity=${a.noNativeValidity}>${defaultOptions}</sy-select>`;
export const SelectIsTreeSelect     = (a: { isTreeSelect: boolean }) => html`<sy-select .isTreeSelect=${a.isTreeSelect}>${defaultOptions}</sy-select>`;
export const SelectSelectedOptions  = (a: { selectedOptions: { value: string; label?: string }[] }) =>
  html`<sy-select .selectedOptions=${a.selectedOptions}>${defaultOptions}</sy-select>`;

const renderSelectEvent = (resultId: string, name: string, attrs: { mode?: string; clearable?: boolean; defaultValue?: string } = {}) => {
  const handle = (e: Event) => {
    const out = document.getElementById(resultId);
    if (out) out.textContent = `${name}: ${JSON.stringify((e as CustomEvent).detail ?? null)}`;
  };
  return { handle, attrs };
};

export const SelectOpened = () => {
  const { handle } = renderSelectEvent('sOpResult', 'opened');
  return html`<sy-select @opened=${handle}>${defaultOptions}</sy-select><p id="sOpResult">(idle)</p>`;
};
export const SelectRemoved = () => {
  const { handle } = renderSelectEvent('sRmResult', 'removed');
  return html`<sy-select @removed=${handle}>${defaultOptions}</sy-select><p id="sRmResult">(idle)</p>`;
};
export const SelectSelected = () => {
  const { handle } = renderSelectEvent('sSelResult', 'selected');
  return html`<sy-select @selected=${handle}>${defaultOptions}</sy-select><p id="sSelResult">(idle)</p>`;
};
export const SelectFocused = () => {
  const { handle } = renderSelectEvent('sFocResult', 'focused');
  return html`<sy-select @focused=${handle}>${defaultOptions}</sy-select><p id="sFocResult">(idle)</p>`;
};
export const SelectBlured = () => {
  const { handle } = renderSelectEvent('sBlurResult', 'blured');
  return html`<sy-select @blured=${handle}>${defaultOptions}</sy-select><p id="sBlurResult">(idle)</p>`;
};
export const SelectInputChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('sICResult');
    if (out) out.textContent = `input: ${(e as CustomEvent).detail}`;
  };
  return html`<sy-select mode="searchable" @inputChanged=${handle}>${defaultOptions}</sy-select><p id="sICResult">(idle)</p>`;
};
export const SelectCleared = () => {
  const handle = () => {
    const out = document.getElementById('sClResult');
    if (out) out.textContent = 'cleared';
  };
  return html`<sy-select clearable .defaultValue=${'apple'} @cleared=${handle}>${defaultOptions}</sy-select><p id="sClResult">(idle)</p>`;
};

const renderSelectMethod = (label: string, action: (el: HTMLSySelectElement, out: HTMLElement | null) => Promise<void> | void) => {
  const sRef: Ref<HTMLSySelectElement> = createRef();
  const outId = `sm-${Math.random().toString(36).slice(2, 8)}`;
  return html`
    <sy-select ${ref(sRef)}>${defaultOptions}</sy-select><br/>
    <sy-button @click=${async () => { if (sRef.value) await action(sRef.value, document.getElementById(outId)); }}>${label}</sy-button>
    <p id=${outId}>(idle)</p>
  `;
};

export const SelectSetValue          = () => renderSelectMethod('setValue("banana")', async (el, out) => { await el.setValue('banana'); if (out) out.textContent = 'set'; });
export const SelectClearValue        = () => renderSelectMethod('clearValue()',       async (el, out) => { await el.clearValue(); if (out) out.textContent = 'cleared'; });
export const SelectCloseDropdown     = () => renderSelectMethod('closeDropdown()',    async (el, out) => { await el.closeDropdown(); if (out) out.textContent = 'closed'; });
export const SelectSetCustomError    = () => renderSelectMethod('setCustomError()',   async (el, out) => { await el.setCustomError(); if (out) out.textContent = 'custom error'; });
export const SelectClearCustomError  = () => renderSelectMethod('clearCustomError()', async (el, out) => { await el.clearCustomError(); if (out) out.textContent = 'cleared'; });
export const SelectCheckValidity     = () => renderSelectMethod('checkValidity()',    async (el, out) => { const r = await el.checkValidity(); if (out) out.textContent = `valid: ${r}`; });
export const SelectReportValidity    = () => renderSelectMethod('reportValidity()',   async (el, out) => { await el.reportValidity(); if (out) out.textContent = 'reported'; });

// select-option attrs
export const SelectOptionDisabled    = (a: { disabled: boolean })    => html`<sy-select><sy-select-option ?disabled=${!!a.disabled} value="a" label="A">A</sy-select-option></sy-select>`;
export const SelectOptionLabel       = (a: { label: string })        => html`<sy-select><sy-select-option value="a" label=${ifDefined(a.label)}>${a.label}</sy-select-option></sy-select>`;
export const SelectOptionReadonly    = (a: { readonly: boolean })    => html`<sy-select><sy-select-option ?readonly=${!!a.readonly} value="a" label="A">A</sy-select-option></sy-select>`;
export const SelectOptionValue       = (a: { value: string })        => html`<sy-select><sy-select-option value=${ifDefined(a.value)} label="A">A</sy-select-option></sy-select>`;
export const SelectOptionShowTooltip = (a: { showTooltip: boolean }) => html`<sy-select><sy-select-option .showTooltip=${a.showTooltip} value="a" label="A very long option label that needs a tooltip to be fully readable by the user">A very long option label that needs a tooltip to be fully readable by the user</sy-select-option></sy-select>`;
export const SelectOptionSelected    = (a: { selected: boolean })    => html`<sy-select><sy-select-option ?selected=${!!a.selected} value="a" label="A">A</sy-select-option></sy-select>`;
export const SelectOptionHide        = (a: { hide: boolean })        => html`<sy-select><sy-select-option ?hide=${!!a.hide} value="a" label="A">A</sy-select-option></sy-select>`;
export const SelectOptionEmpty       = (a: { empty: boolean })       => html`<sy-select><sy-select-option ?empty=${!!a.empty} value="a" label="A">A</sy-select-option></sy-select>`;
export const SelectOptionLoading     = (a: { loading: boolean })     => html`<sy-select><sy-select-option ?loading=${!!a.loading} value="a" label="A">A</sy-select-option></sy-select>`;
export const SelectOptionIsCustomTag = (a: { isCustomTag: boolean }) => html`<sy-select><sy-select-option .isCustomTag=${a.isCustomTag} value="a" label="A">A</sy-select-option></sy-select>`;
export const SelectOptionActive      = (a: { active: boolean })      => html`<sy-select><sy-select-option ?active=${!!a.active} value="a" label="A">A</sy-select-option></sy-select>`;

export const SelectOptionActivated = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('soActResult');
    if (out) out.textContent = JSON.stringify((e as CustomEvent).detail);
  };
  return html`
    <sy-select><sy-select-option value="a" label="A" @activated=${handle}>A</sy-select-option></sy-select>
    <p id="soActResult">(idle)</p>
  `;
};
