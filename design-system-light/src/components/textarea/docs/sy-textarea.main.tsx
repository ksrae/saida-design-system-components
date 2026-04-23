import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyTextareaProps extends Components.SyTextarea {
  changed?: (event: CustomEvent<{ value: string; length: number; isValid: boolean; status: string }>) => void;
  blured?: (event: CustomEvent<{ value: string; isValid: boolean; status: string }>) => void;
  focused?: (event: CustomEvent<{ value: string; isValid: boolean; status: string }>) => void;
}

export const Textarea = (a: SyTextareaProps) => html`
  <sy-textarea
    ?autofocus=${!!a.autofocus}
    ?borderless=${!!a.borderless}
    ?clearable=${!!a.clearable}
    ?counter=${!!a.counter}
    ?disabled=${!!a.disabled}
    ?readonly=${!!a.readonly}
    ?required=${!!a.required}
    label=${ifDefined(a.label)}
    placeholder=${ifDefined(a.placeholder)}
    resize=${ifDefined(a.resize)}
    size=${ifDefined(a.size)}
    status=${ifDefined(a.status)}
    name=${ifDefined(a.name)}
    .max=${a.max}
    .min=${a.min}
    .rows=${a.rows}
    .value=${a.value}
    .noNativeValidity=${a.noNativeValidity}>
  </sy-textarea>
`;

export const TextareaAutofocus        = (args: { autofocus: boolean })   => html`<sy-textarea ?autofocus=${!!args.autofocus}></sy-textarea>`;
export const TextareaBorderless       = (args: { borderless: boolean })  => html`<sy-textarea ?borderless=${!!args.borderless}></sy-textarea>`;
export const TextareaClearable        = (args: { clearable: boolean })   => html`<sy-textarea ?clearable=${!!args.clearable} .value=${'type to clear'}></sy-textarea>`;
export const TextareaCounter          = (args: { counter: boolean })     => html`<sy-textarea ?counter=${!!args.counter} .max=${100}></sy-textarea>`;
export const TextareaDisabled         = (args: { disabled: boolean })    => html`<sy-textarea ?disabled=${!!args.disabled}></sy-textarea>`;
export const TextareaLabel            = (args: { label: string })        => html`<sy-textarea label=${ifDefined(args.label)}></sy-textarea>`;
export const TextareaMax              = (args: { max: number })          => html`<sy-textarea counter .max=${args.max}></sy-textarea>`;
export const TextareaMin              = (args: { min: number })          => html`<sy-textarea counter .min=${args.min}></sy-textarea>`;
export const TextareaPlaceholder      = (args: { placeholder: string })  => html`<sy-textarea placeholder=${ifDefined(args.placeholder)}></sy-textarea>`;
export const TextareaReadonly         = (args: { readonly: boolean })    => html`<sy-textarea ?readonly=${!!args.readonly} .value=${'readonly text'}></sy-textarea>`;
export const TextareaRequired         = (args: { required: boolean })    => html`<sy-textarea ?required=${!!args.required}></sy-textarea>`;
export const TextareaResize           = (args: { resize: any })          => html`<sy-textarea resize=${ifDefined(args.resize)}></sy-textarea>`;
export const TextareaRows             = (args: { rows: number })         => html`<sy-textarea .rows=${args.rows}></sy-textarea>`;
export const TextareaSize             = (args: { size: any })            => html`<sy-textarea size=${ifDefined(args.size)}></sy-textarea>`;
export const TextareaStatus           = (args: { status: any })          => html`<sy-textarea status=${ifDefined(args.status)}></sy-textarea>`;
export const TextareaValue            = (args: { value: string })        => html`<sy-textarea .value=${args.value}></sy-textarea>`;
export const TextareaName             = (args: { name: string })         => html`<sy-textarea name=${ifDefined(args.name)}></sy-textarea>`;
export const TextareaNoNativeValidity = (args: { noNativeValidity: boolean }) => html`<sy-textarea required .noNativeValidity=${args.noNativeValidity}></sy-textarea>`;

const renderEvent = (resultId: string, eventName: 'changed' | 'blured' | 'focused') => {
  const handle = (e: Event) => {
    const out = document.getElementById(resultId);
    if (out) out.textContent = `${eventName}: ${JSON.stringify((e as CustomEvent).detail)}`;
  };
  if (eventName === 'changed') {
    return html`<sy-textarea @changed=${handle}></sy-textarea><p id=${resultId}>(idle)</p>`;
  }
  if (eventName === 'blured') {
    return html`<sy-textarea @blured=${handle}></sy-textarea><p id=${resultId}>(idle)</p>`;
  }
  return html`<sy-textarea @focused=${handle}></sy-textarea><p id=${resultId}>(idle)</p>`;
};

export const TextareaChanged = () => renderEvent('taChangedResult', 'changed');
export const TextareaBlured  = () => renderEvent('taBluredResult', 'blured');
export const TextareaFocused = () => renderEvent('taFocusedResult', 'focused');

const renderMethod = (label: string, action: (el: HTMLSyTextareaElement, out: HTMLElement | null) => void | Promise<void>, opts: { autofocus?: boolean; required?: boolean } = {}) => {
  const tRef: Ref<HTMLSyTextareaElement> = createRef();
  const outId = `taOut_${Math.random().toString(36).slice(2, 8)}`;
  return html`
    <sy-textarea ${ref(tRef)} ?autofocus=${!!opts.autofocus} ?required=${!!opts.required}></sy-textarea><br/>
    <sy-button @click=${async () => {
      if (!tRef.value) return;
      await action(tRef.value, document.getElementById(outId));
    }}>${label}</sy-button>
    <p id=${outId}>(idle)</p>
  `;
};

export const TextareaSetFocus          = () => renderMethod('setFocus()', (el) => { el.setFocus(); });
export const TextareaSetBlur           = () => renderMethod('setBlur()', (el) => { el.setBlur(); }, { autofocus: true });
export const TextareaCheckValidity     = () => renderMethod('checkValidity()', async (el, out) => { const r = await el.checkValidity(); if (out) out.textContent = `valid: ${r}`; }, { required: true });
export const TextareaReportValidity    = () => renderMethod('reportValidity()', (el) => { el.reportValidity(); }, { required: true });
export const TextareaSetCustomError    = () => renderMethod('setCustomError()', (el) => { el.setCustomError(); });
export const TextareaClearCustomError  = () => renderMethod('clearCustomError()', (el) => { el.clearCustomError(); });
export const TextareaGetStatus         = () => renderMethod('getStatus()', async (el, out) => { const s = await el.getStatus(); if (out) out.textContent = `status: ${s}`; });
