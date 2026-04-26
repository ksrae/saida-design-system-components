import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyTreeSelectProps extends Components.SyTreeSelect {
  slot?: any;
  changed?: (e: CustomEvent<any>) => void;
}

// Fresh deep-clone per story render. sy-tree-select mutates `node.expanded`
// in-place during initializeDefaultValue / expandNodesForDefaultValue, so a
// shared `const sampleNodes` would carry expanded=true into unrelated stories.
const buildSampleNodes = () => [
  { label: 'Fruits', value: 'fruits', children: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]},
  { label: 'Vegetables', value: 'vegetables', children: [
    { label: 'Carrot', value: 'carrot' },
    { label: 'Broccoli', value: 'broccoli' },
  ]},
];

export const TreeSelect = (a: SyTreeSelectProps) => html`
  <sy-tree-select
    .nodes=${a.nodes ?? buildSampleNodes()}
    ?checkable=${!!a.checkable} ?clearable=${!!a.clearable}
    ?disabled=${!!a.disabled} ?expandable=${!!a.expandable}
    ?line=${!!a.line} ?loading=${!!a.loading}
    ?readonly=${!!a.readonly} ?required=${!!a.required}
    .defaultValue=${a.defaultValue}
    status=${ifDefined(a.status as any)}
    .expandAll=${a.expandAll}
    .maxTagCount=${a.maxTagCount} .nodeWidth=${a.nodeWidth}
    placeholder=${ifDefined(a.placeholder)}
    .noNativeValidity=${a.noNativeValidity}>
  </sy-tree-select>
`;

// Tree expanded by default in nodes/checkable/clickable/etc. so the user
// can see the data immediately without an extra click. Tests that
// specifically exercise expand behavior (TreeSelectExpandable,
// TreeSelectExpandAll) keep that off so the toggle has visible effect.
export const TreeSelectNodes             = (a: { nodes: any[] })           => html`<sy-tree-select expandAll .nodes=${(a.nodes && a.nodes.length > 0) ? a.nodes : buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectCheckable         = (a: { checkable: boolean })     => html`<sy-tree-select expandAll ?checkable=${!!a.checkable} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectClearable         = (a: { clearable: boolean })     => html`<sy-tree-select ?clearable=${!!a.clearable} .defaultValue=${'apple'} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectDefaultValue      = (a: { defaultValue: string })   => html`<sy-tree-select .defaultValue=${a.defaultValue} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectDisabled          = (a: { disabled: boolean })      => html`<sy-tree-select ?disabled=${!!a.disabled} .defaultValue=${'apple'} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectStatus            = (a: { status: any })            => html`<sy-tree-select status=${ifDefined(a.status)} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectExpandable        = (a: { expandable: boolean })    => html`<sy-tree-select ?expandable=${!!a.expandable} .expandAll=${false} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectExpandAll         = (a: { expandAll: boolean })     => html`<sy-tree-select .expandAll=${a.expandAll} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectLine              = (a: { line: boolean })          => html`<sy-tree-select ?line=${!!a.line} expandAll .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectLoading           = (a: { loading: boolean })       => html`<sy-tree-select ?loading=${!!a.loading} .nodes=${buildSampleNodes()}></sy-tree-select>`;
// maxTagCount caps how many tag chips render before collapsing to a "+N"
// chip. defaultValue pre-selects 3 leaves so the demo immediately shows a
// chip + overflow on first render. The leaf-collection algorithm means
// each ticked leaf produces one chip — so 3 selected + maxTagCount=1
// renders as "Apple +2".
export const TreeSelectMaxTagCount       = (a: { maxTagCount: number })    => html`<sy-tree-select checkable expandAll .maxTagCount=${a.maxTagCount} .defaultValue=${'apple,banana,carrot'} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectPlaceholder       = (a: { placeholder: string })    => html`<sy-tree-select placeholder=${ifDefined(a.placeholder)} .nodes=${buildSampleNodes()}></sy-tree-select>`;
export const TreeSelectReadonly          = (a: { readonly: boolean })      => html`<sy-tree-select ?readonly=${!!a.readonly} .nodes=${buildSampleNodes()}></sy-tree-select>`;

const renderTreeSelectFormStory = (
  attrs: { required?: boolean; noNativeValidity?: boolean; slotError?: string },
  description: unknown,
  extraButtons?: (sRef: Ref<HTMLSyTreeSelectElement>) => unknown,
) => {
  const sRef: Ref<HTMLSyTreeSelectElement> = createRef();
  const resultId = `tsSubmitResult_${Math.random().toString(36).slice(2, 8)}`;
  let submitFired = false;
  const isTreeSelectInvalid = async () => {
    const el = sRef.value;
    if (!el) return !submitFired;
    const status = await el.getStatus();
    return !!status || el.matches(':invalid');
  };
  const armSubmitDetector = () => {
    submitFired = false;
    requestAnimationFrame(async () => {
      const out = document.getElementById(resultId);
      if (!out) return;
      const blocked = !submitFired && await isTreeSelectInvalid();
      if (blocked) {
        out.textContent = 'Submit blocked (tree-select is invalid)';
        out.style.color = 'var(--required, #c0392b)';
      } else {
        out.textContent = 'Submit succeeded';
        out.style.color = 'var(--success-text, #2e7d32)';
      }
    });
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    submitFired = true;
  };
  return html`
    <div>
      ${description}
      <form @submit=${handleSubmit}>
        <sy-tree-select
          ${ref(sRef)}
          expandAll
          ?required=${!!attrs.required}
          .noNativeValidity=${attrs.noNativeValidity}
          .nodes=${buildSampleNodes()}
        >
          ${attrs.slotError ? html`<span slot="error">${attrs.slotError}</span>` : ''}
        </sy-tree-select>
        <br/>
        <sy-button type="submit" variant="primary" @mouseDown=${armSubmitDetector}>Submit</sy-button>
        ${extraButtons ? extraButtons(sRef) : ''}
        <p id=${resultId}>(idle)</p>
      </form>
    </div>
  `;
};

export const TreeSelectRequired = (a: { required: boolean }) =>
  renderTreeSelectFormStory(
    { required: a.required },
    html`<p>Toggle <code>required</code> in Controls. Click <strong>Submit</strong> with nothing selected &mdash; with <code>required</code> on, the browser blocks submission and shows the native validity popup anchored to the tree-select.</p>`,
  );

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
    <sy-tree-select expandAll .nodes=${buildSampleNodes()} @changed=${handle}></sy-tree-select>
    <p id="tsChResult">(idle)</p>
  `;
};

export const TreeSelectCheckValidity = () => {
  const description = html`<p>The tree-select is <code>required</code>. Click <strong>checkValidity()</strong> with nothing selected to see <code>false</code>; pick an option and click again for <code>true</code>. The result text below shows the boolean — checkValidity does NOT trigger the native popup.</p>`;
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
  const description = html`<p>The tree-select is <code>required</code>. Click <strong>reportValidity()</strong> without picking anything &mdash; the browser shows the native validity popup anchored to the tree-select. Pick an option first and reportValidity returns <code>true</code> silently.</p>`;
  return renderTreeSelectFormStory({ required: true }, description, (sRef) => {
    const report = async () => {
      const ok = await sRef.value?.reportValidity();
      const out = document.getElementById('tsReportValidityResult');
      if (out) out.textContent = String(ok);
    };
    return html`
      <sy-button @click=${report}>reportValidity()</sy-button>
      <p>Result: <span id="tsReportValidityResult">(idle)</span></p>
    `;
  });
};

// setCustomError — mirrors sy-textarea's pattern: setCustomError() flips the
// element into custom-invalid state and shows the slotted error; clearCustomError()
// resets. Combined with noNativeValidity=true so the slot is the only error UI.
export const TreeSelectSetCustomError = () => {
  const description = html`<p>Click <strong>setCustomError()</strong> &mdash; the tree-select gains the error border and the slotted message appears underneath. Click <strong>clearCustomError()</strong> to reset.</p>`;
  return renderTreeSelectFormStory(
    { noNativeValidity: true, slotError: 'Custom error from setCustomError()' },
    description,
    (sRef) => html`
      <sy-button @click=${() => (sRef.value as any)?.setCustomError()}>setCustomError()</sy-button>
      <sy-button @click=${() => (sRef.value as any)?.clearCustomError()}>clearCustomError()</sy-button>
    `,
  );
};
