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

/* ============================================================================
 * Slot-based custom-error pattern — identical to sy-autocomplete / sy-input etc.
 *
 * Pattern (applies to every SAIDA form-associated component):
 *   1. Author writes the error UI once inside [slot="error"].
 *   2. Either a native constraint fails (required) or app code calls
 *      el.setCustomError(): the same slot surfaces as the error.
 *   3. el.clearCustomError() restores native-only validation.
 * ============================================================================ */

/* Programmatic setCustomError demo with slot-declared message + result panel. */
export const CheckboxSetCustomError = () => {
  const elRef: Ref<HTMLSyCheckboxElement> = createRef();

  const writeStatus = async () => {
    const out = document.getElementById('chkCustomErrorOut');
    const el = elRef.value;
    if (!el || !out) return;
    const valid = await el.checkValidity();
    const status = await (el as any).getValidStatus();
    const message = (el as any).validationMessage ?? '';
    out.textContent = `valid=${valid}, status=${status || 'ok'}, message="${message}"`;
  };

  return html`
    <div style="display:flex; flex-direction:column; gap:12px; width:360px;">
      <sy-checkbox ${ref(elRef)}>
        I agree to the custom rule
        <div slot="error">
          <p style="color:#c0392b; margin:4px 0 0;">🚫 Custom error: this selection was rejected by the app.</p>
        </div>
      </sy-checkbox>
      <div style="display:flex; gap:8px;">
        <sy-button variant="primary"
          @click=${() => elRef.value?.setCustomError().then(writeStatus)}>Force setCustomError()</sy-button>
        <sy-button variant="secondary"
          @click=${() => elRef.value?.clearCustomError().then(writeStatus)}>clearCustomError()</sy-button>
      </div>
      <p>Result: <span id="chkCustomErrorOut">(idle)</span></p>
    </div>
  `;
};

/* Required + declarative slot error — matches the canonical HTML consumer pattern. */
export const CheckboxRequiredSlotError = () => {
  const elRef: Ref<HTMLSyCheckboxElement> = createRef();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const out = document.getElementById('chkSlotErrorFormOut');
    const el = elRef.value;
    if (out && el) out.textContent = `Submitted: checked=${(el as any).checked}`;
  };

  const justValidate = async () => {
    const out = document.getElementById('chkSlotErrorFormOut');
    const el = elRef.value;
    if (!el) return;
    const valid = await el.reportValidity();
    if (out) out.textContent = `reportValidity() → ${valid}`;
  };

  return html`
    <form novalidate style="display:flex; flex-direction:column; gap:12px; width:360px;" @submit=${handleSubmit}>
      <sy-checkbox ${ref(elRef)} required name="terms">
        I accept the terms and conditions
        <div slot="error">
          <p style="color:#c0392b; margin:4px 0 0;">🚫 You must accept the terms to continue.</p>
        </div>
      </sy-checkbox>
      <div style="display:flex; gap:8px;">
        <sy-button type="submit" variant="primary">Submit</sy-button>
        <sy-button type="button" variant="secondary" @click=${justValidate}>Just Validate</sy-button>
      </div>
      <p>Result: <span id="chkSlotErrorFormOut">(idle)</span></p>
    </form>
  `;
};

/* FormData integration — confirms the checkbox participates natively in <form>. */
export const CheckboxFormData = () => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const out = document.getElementById('chkFormDataOut');
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const pairs: string[] = [];
    data.forEach((v, k) => pairs.push(`${k}=${v}`));
    if (out) out.textContent = pairs.join(', ') || '(empty)';
  };

  return html`
    <form style="display:flex; flex-direction:column; gap:12px; width:360px;" @submit=${handleSubmit}>
      <sy-checkbox name="newsletter" value="yes">Subscribe to newsletter</sy-checkbox>
      <sy-checkbox name="beta" value="enrolled">Join beta program</sy-checkbox>
      <sy-checkbox name="agree" value="accepted" required>
        I accept the terms
        <div slot="error">
          <p style="color:#c0392b; margin:4px 0 0;">Required</p>
        </div>
      </sy-checkbox>
      <div style="display:flex; gap:8px;">
        <sy-button type="submit" variant="primary">Submit</sy-button>
        <sy-button type="reset" variant="secondary">Reset</sy-button>
      </div>
      <p>FormData: <span id="chkFormDataOut">(idle)</span></p>
    </form>
  `;
};
