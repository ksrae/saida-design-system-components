import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
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
// Form-related stories share one helper. Real <form> + <sy-button type="submit">
// so the browser actually performs validation; the helper accepts an
// optional extraButtons slot for stories that drive a method on top of the
// submit flow (checkValidity / reportValidity / setCustomValidity).
const preventSubmit = (e: Event) => e.preventDefault();

const renderTreeSelectFormStory = (
  attrs: { required?: boolean; noNativeValidity?: boolean; slotError?: string },
  description: unknown,
  extraButtons?: (sRef: Ref<HTMLSyTreeSelectElement>) => unknown,
) => {
  const sRef: Ref<HTMLSyTreeSelectElement> = createRef();
  return html`
    <div>
      ${description}
      <form @submit=${preventSubmit}>
        <sy-tree-select
          ${ref(sRef)}
          ?required=${!!attrs.required}
          .noNativeValidity=${attrs.noNativeValidity}
          .nodes=${sampleNodes}
        >
          ${attrs.slotError ? html`<span slot="error">${attrs.slotError}</span>` : ''}
        </sy-tree-select>
        <br/>
        <sy-button type="submit" variant="primary">Submit</sy-button>
        ${extraButtons ? extraButtons(sRef) : ''}
      </form>
    </div>
  `;
};

export const TreeSelectRequired = (a: { required: boolean }) =>
  renderTreeSelectFormStory(
    { required: a.required },
    html`<p>Toggle <code>required</code> in Controls. Click <strong>Submit</strong> with nothing selected &mdash; with <code>required</code> on, the browser blocks submission and shows the native validity popup.</p>`,
  );

export const TreeSelectName              = (a: { name: string })           => html`<sy-tree-select name=${ifDefined(a.name)} .nodes=${sampleNodes}></sy-tree-select>`;

export const TreeSelectNoNativeValidity = (a: { noNativeValidity: boolean }) =>
  renderTreeSelectFormStory(
    {
      required: true,
      noNativeValidity: a.noNativeValidity,
      slotError: 'Please pick at least one option from the tree.',
    },
    html`<p>The tree-select is <code>required</code>. Click <strong>Submit</strong> with nothing selected. With <code>noNativeValidity=true</code> the native popup is suppressed and the slotted error appears under the control; with <code>false</code> the browser shows its native popup instead.</p>`,
  );

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

// Validity / setCustomValidity reuse the same form helper as the
// attribute stories — same wrapper, same submit, just an extra button
// that drives the method directly. Keeping every form-related story on
// one renderer means there's a single place to fix when the pattern
// needs to change.
export const TreeSelectCheckValidity = () => {
  const description = html`<p>The tree-select is <code>required</code>. Click <strong>checkValidity()</strong> with nothing selected to see <code>false</code>; pick an option and click again for <code>true</code>. <strong>Submit</strong> also exercises the validity check.</p>`;
  return renderTreeSelectFormStory({ required: true }, description, (sRef) => {
    const check = async () => {
      const ok = await sRef.value?.checkValidity();
      const out = document.getElementById('tsCheckValidityResult');
      if (out) out.textContent = String(ok);
    };
    return html`
      <sy-button @click=${check}>checkValidity()</sy-button>
      <p>Result: <span id="tsCheckValidityResult">(idle)</span></p>
    `;
  });
};

export const TreeSelectReportValidity = () => {
  const description = html`<p>The tree-select is <code>required</code>. Click <strong>reportValidity()</strong> (or <strong>Submit</strong>) without picking anything &mdash; the browser shows its native validity popup. Pick an option first and both succeed silently.</p>`;
  return renderTreeSelectFormStory({ required: true }, description, (sRef) => html`
    <sy-button @click=${() => sRef.value?.reportValidity()}>reportValidity()</sy-button>
  `);
};

export const TreeSelectSetCustomValidity = () => {
  const description = html`<p>Click <strong>setCustomValidity("Invalid")</strong> &mdash; the tree-select gains the error border and the slotted message appears underneath. Click <strong>setCustomValidity("")</strong> to clear it.</p>`;
  return renderTreeSelectFormStory(
    { slotError: 'Pre-filled custom error message' },
    description,
    (sRef) => html`
      <sy-button @click=${() => sRef.value?.setCustomValidity('Invalid')}>setCustomValidity("Invalid")</sy-button>
      <sy-button @click=${() => sRef.value?.setCustomValidity('')}>setCustomValidity("")</sy-button>
    `,
  );
};
