import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyTreeSelectProps extends Components.SyTreeSelect {
  slot?: any;
  changed?: (e: CustomEvent<any>) => void;
}

const sampleNodes = [
  { label: 'Fruits', value: 'fruits', children: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]},
  { label: 'Vegetables', value: 'vegetables' },
];

export const TreeSelect = (a: SyTreeSelectProps) => html`
  <sy-tree-select
    .nodes=${a.nodes ?? sampleNodes}
    ?checkable=${!!a.checkable} ?clearable=${!!a.clearable}
    ?disabled=${!!a.disabled} ?expandable=${!!a.expandable}
    ?line=${!!a.line} ?loading=${!!a.loading}
    ?readonly=${!!a.readonly} ?required=${!!a.required}
    .defaultValue=${a.defaultValue}
    status=${ifDefined(a.status as any)}
    .expandAll=${a.expandAll}
    .maxTagCount=${a.maxTagCount} .nodeWidth=${a.nodeWidth}
    placeholder=${ifDefined(a.placeholder)}
    .appendParent=${a.appendParent}
    name=${ifDefined(a.name)}
    .noNativeValidity=${a.noNativeValidity}>
  </sy-tree-select>
`;

export const TreeSelectNodes             = (a: { nodes: any[] })           => html`<sy-tree-select .nodes=${a.nodes}></sy-tree-select>`;
export const TreeSelectCheckable         = (a: { checkable: boolean })     => html`<sy-tree-select ?checkable=${!!a.checkable} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectClearable         = (a: { clearable: boolean })     => html`<sy-tree-select ?clearable=${!!a.clearable} .defaultValue=${'apple'} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectDefaultValue      = (a: { defaultValue: string })   => html`<sy-tree-select .defaultValue=${a.defaultValue} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectDisabled          = (a: { disabled: boolean })      => html`<sy-tree-select ?disabled=${!!a.disabled} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectStatus            = (a: { status: any })            => html`<sy-tree-select status=${ifDefined(a.status)} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectExpandable        = (a: { expandable: boolean })    => html`<sy-tree-select ?expandable=${!!a.expandable} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectExpandAll         = (a: { expandAll: boolean })     => html`<sy-tree-select .expandAll=${a.expandAll} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectLine              = (a: { line: boolean })          => html`<sy-tree-select ?line=${!!a.line} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectLoading           = (a: { loading: boolean })       => html`<sy-tree-select ?loading=${!!a.loading} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectMaxTagCount       = (a: { maxTagCount: number })    => html`<sy-tree-select checkable .maxTagCount=${a.maxTagCount} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectNodeWidth         = (a: { nodeWidth: number })      => html`<sy-tree-select .nodeWidth=${a.nodeWidth} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectPlaceholder       = (a: { placeholder: string })    => html`<sy-tree-select placeholder=${ifDefined(a.placeholder)} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectAppendParent      = (a: { appendParent: boolean })  => html`<sy-tree-select checkable .appendParent=${a.appendParent} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectReadonly          = (a: { readonly: boolean })      => html`<sy-tree-select ?readonly=${!!a.readonly} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectRequired          = (a: { required: boolean })      => html`<sy-tree-select ?required=${!!a.required} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectName              = (a: { name: string })           => html`<sy-tree-select name=${ifDefined(a.name)} .nodes=${sampleNodes}></sy-tree-select>`;
export const TreeSelectNoNativeValidity  = (a: { noNativeValidity: boolean }) => html`<sy-tree-select required .noNativeValidity=${a.noNativeValidity} .nodes=${sampleNodes}></sy-tree-select>`;

export const TreeSelectChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('tsChResult');
    if (out) out.textContent = `changed: ${JSON.stringify((e as CustomEvent).detail)}`;
  };
  return html`
    <sy-tree-select .nodes=${sampleNodes} @changed=${handle}></sy-tree-select>
    <p id="tsChResult">(idle)</p>
  `;
};

const renderMethod = (label: string, action: (el: HTMLSyTreeSelectElement, out: HTMLElement | null) => void | Promise<void>) => {
  const sRef: Ref<HTMLSyTreeSelectElement> = createRef();
  const outId = `tsOut_${Math.random().toString(36).slice(2, 8)}`;
  return html`
    <sy-tree-select ${ref(sRef)} required .nodes=${sampleNodes}></sy-tree-select><br/>
    <sy-button @click=${async () => { if (sRef.value) await action(sRef.value, document.getElementById(outId)); }}>${label}</sy-button>
    <p id=${outId}>(idle)</p>
  `;
};

export const TreeSelectSetCustomValidity = () => renderMethod('setCustomValidity("Invalid")', async (el, out) => { await el.setCustomValidity('Invalid'); if (out) out.textContent = 'set'; });
export const TreeSelectCheckValidity     = () => renderMethod('checkValidity()',              async (el, out) => { const r = await el.checkValidity(); if (out) out.textContent = `valid: ${r}`; });
export const TreeSelectReportValidity    = () => renderMethod('reportValidity()',             async (el, out) => { await el.reportValidity(); if (out) out.textContent = 'reported'; });
