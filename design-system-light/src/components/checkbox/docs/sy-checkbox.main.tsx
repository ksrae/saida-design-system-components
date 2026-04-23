import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyCheckboxProps extends Components.SyCheckbox {
  slot?: string;
  changed?: (event: CustomEvent<any>) => void;
  focused?: (event: CustomEvent<any>) => void;
  blured?: (event: CustomEvent<any>) => void;
}

/* -------------------- Overview & Attributes -------------------- */

export const Checkbox = ({ checked, disabled, indeterminate, readonly, slot }: SyCheckboxProps) => html`
  <sy-checkbox
    ?checked=${!!checked}
    ?indeterminate=${!!indeterminate}
    ?disabled=${!!disabled}
    ?readonly=${!!readonly}
  >${slot ? unsafeHTML(slot) : 'Checkbox'}</sy-checkbox>
`;

export const CheckboxChecked       = (args: { checked: boolean })       => html`<sy-checkbox ?checked=${!!args.checked}>Checkbox</sy-checkbox>`;
export const CheckboxIndeterminate = (args: { indeterminate: boolean }) => html`<sy-checkbox ?indeterminate=${!!args.indeterminate}>Checkbox</sy-checkbox>`;
export const CheckboxDisabled      = (args: { disabled: boolean })      => html`<sy-checkbox ?disabled=${!!args.disabled}>Checkbox</sy-checkbox>`;
export const CheckboxReadonly      = (args: { readonly: boolean })      => html`<sy-checkbox ?readonly=${!!args.readonly}>Checkbox</sy-checkbox>`;

export const CheckboxRequired = (args: { required: boolean }) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const out = document.getElementById('chkRequiredResult');
    if (out) out.textContent = 'Form submitted (OK — checkbox is checked or not required)';
  };
  const handleInvalid = (_e: Event) => {
    const out = document.getElementById('chkRequiredResult');
    if (out) out.textContent = 'Blocked — checkbox is required but not checked';
  };
  return html`
    <p style="margin: 0 0 8px;">
      With <code>required</code>, clicking <b>Submit</b> while the checkbox is
      unchecked must NOT fire the form's submit handler. Toggle the checkbox on
      and submit to confirm the happy path still works.
    </p>
    <form @submit=${handleSubmit}>
      <sy-checkbox ?required=${!!args.required} @invalid=${handleInvalid}>Required checkbox</sy-checkbox>
      <div style="margin-top:8px;">
        <sy-button type="submit">Submit</sy-button>
      </div>
    </form>
    <p>Status: <span id="chkRequiredResult">(idle)</span></p>
  `;
};

export const CheckboxSlot = (args: { slotContent: string }) => html`
  <sy-checkbox>${args.slotContent ? unsafeHTML(args.slotContent) : 'Checkbox'}</sy-checkbox>
`;

/* -------------------- Events -------------------- */

export const CheckboxChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('chkChangedResult');
    if (out) out.textContent = (e as CustomEvent).detail.checked ? 'checked' : 'unchecked';
  };
  return html`
    <sy-checkbox @changed=${handle}>Checkbox</sy-checkbox>
    <p id="chkChangedResult">(idle)</p>
  `;
};

/* -------------------- Methods -------------------- */

export const CheckboxFocusBlur = () => {
  const elRef: Ref<HTMLSyCheckboxElement> = createRef();
  const update = (text: string) => {
    const out = document.getElementById('chkFocusResult');
    if (out) out.textContent = text;
  };
  return html`
    <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
      <sy-checkbox
        ${ref(elRef)}
        @focused=${() => update('focus')}
        @blured=${() => update('blur')}
      >checkbox</sy-checkbox>
      <sy-button variant="primary" @click=${() => elRef.value?.setFocus()}>Call setFocus()</sy-button>
      <sy-button variant="secondary" @click=${() => elRef.value?.setBlur()}>Call setBlur()</sy-button>
    </div>
    <p>Status: <span id="chkFocusResult">(idle)</span></p>
  `;
};

/* -------------------- Form Demo -------------------- */

export const CheckboxForm = () => {
  const normalRef:        Ref<HTMLSyCheckboxElement> = createRef();
  const checkedRef:       Ref<HTMLSyCheckboxElement> = createRef();
  const indeterminateRef: Ref<HTMLSyCheckboxElement> = createRef();
  const requiredRef:      Ref<HTMLSyCheckboxElement> = createRef();

  const setIndeterminate = (el?: Element) => {
    (indeterminateRef as any).value = el;
    if (el) (el as any).indeterminate = true;
  };

  const writeResult = (text: string) => {
    const out = document.getElementById('formResult');
    if (out) out.textContent = text;
  };

  const summarize = (heading: string) => {
    let result = heading + '\n\n체크 상태:\n';
    result += 'normalCheck: '        + (normalRef.value?.checked) + '\n';
    result += 'checkedCheck: '       + (checkedRef.value?.checked) + '\n';
    result += 'indeterminateCheck: ' + (indeterminateRef.value?.checked) + '\n';
    result += 'requiredCheck: '      + (requiredRef.value?.checked) + '\n';
    result += '\n불확정 상태:\nindeterminateCheck: ' + (indeterminateRef.value?.indeterminate);
    return result;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    writeResult(summarize('폼 데이터:'));
  };

  const handleReset = () => {
    setTimeout(() => writeResult(summarize('폼이 리셋되었습니다.')), 0);
  };

  return html`
    <div>
      <h3>체크박스 폼 테스트</h3>
      <form @submit=${handleSubmit} @reset=${handleReset}>
        <div><sy-checkbox ${ref(normalRef)} name="normalCheck">기본 체크박스</sy-checkbox></div>
        <div style="margin-top: 10px;">
          <sy-checkbox ${ref(checkedRef)} name="checkedCheck" checked>미리 체크된 체크박스</sy-checkbox>
        </div>
        <div style="margin-top: 10px;">
          <sy-checkbox ${ref(setIndeterminate)} name="indeterminateCheck">불확정 체크박스</sy-checkbox>
        </div>
        <div style="margin-top: 10px;">
          <sy-checkbox ${ref(requiredRef)} name="requiredCheck" required>필수 체크박스</sy-checkbox>
        </div>
        <div style="margin-top: 20px;">
          <sy-button type="submit">폼 제출</sy-button>
          <sy-button type="reset">폼 리셋</sy-button>
        </div>
      </form>

      <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px;">
        <h4>폼 제출 결과:</h4>
        <pre id="formResult">결과가 여기에 표시됩니다</pre>
      </div>
    </div>
  `;
};
