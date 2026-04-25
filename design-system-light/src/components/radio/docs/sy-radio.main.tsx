import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
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

// Overview renders three buttons in the group so you can see size/variant
// applied across the whole set, click between options to verify mutual
// exclusion, and observe the active visual against inactive siblings. The
// Controls-driven props (checked / disabled / value) are pinned to the first
// button so toggling them in the panel produces a clear comparison against
// the unaffected B and C buttons.
export const RadioButton = (a: SyRadioButtonProps) => html`
  <sy-radio-group size=${ifDefined(a.size)} variant=${ifDefined(a.variant)}>
    <sy-radio-button ?checked=${!!a.checked} ?disabled=${!!a.disabled} value=${ifDefined(a.value || 'a')}>${a.value || 'A'}</sy-radio-button>
    <sy-radio-button value="b">B</sy-radio-button>
    <sy-radio-button value="c">C</sy-radio-button>
  </sy-radio-group>
`;

// radio attrs
export const RadioChecked  = (a: { checked: boolean })  => html`<sy-radio ?checked=${!!a.checked} value="a">Option</sy-radio>`;
export const RadioDisabled = (a: { disabled: boolean }) => html`<sy-radio ?disabled=${!!a.disabled} value="a">Option</sy-radio>`;
export const RadioReadonly = (a: { readonly: boolean }) => html`<sy-radio ?readonly=${!!a.readonly} value="a">Option</sy-radio>`;
// Show the value as the radio's visible label AND surface the emitted
// `selected` payload so the Controls input, the canvas text, and the event
// detail all match. The previous version used "Option ${a.value}", which
// rendered as "Option option-a" while the Controls panel showed just
// "option-a" — the two looked like different values.
export const RadioValue    = (a: { value: string })     => {
  const onSelect = (e: Event) => {
    const out = document.getElementById('rValResult');
    if (out) out.textContent = `selected: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-radio value=${ifDefined(a.value)} @selected=${onSelect}>${a.value}</sy-radio>
    <p id="rValResult">selected: (click the radio to fire)</p>
  `;
};

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

// `required` and `noNativeValidity` need a real <form> + submit button so
// the user can actually trigger validation. Without form context, neither
// the native validity popup nor the slotted error message has anywhere to
// surface from. The submit handler calls preventDefault so the page doesn't
// navigate when the form is valid.
export const RadioGroupRequired         = (a: { required: boolean })   => html`
  <form @submit=${(e: Event) => e.preventDefault()}>
    <sy-radio-group ?required=${!!a.required}>${defaultGroupChildren}</sy-radio-group>
    <br/>
    <sy-button type="submit">Submit</sy-button>
  </form>
  <p>Click Submit without selecting any radio. With <code>required</code> the browser blocks the submission and shows its native validity popup.</p>
`;

export const RadioGroupNoNativeValidity = (a: { noNativeValidity: boolean }) => html`
  <form @submit=${(e: Event) => e.preventDefault()}>
    <sy-radio-group required .noNativeValidity=${a.noNativeValidity}>
      ${defaultGroupChildren}
      <span slot="error">Please pick one of A / B / C.</span>
    </sy-radio-group>
    <br/>
    <sy-button type="submit">Submit</sy-button>
  </form>
  <p>Click Submit without picking a radio. With <code>noNativeValidity=true</code> the native popup is suppressed and the slotted error text appears under the group; with <code>noNativeValidity=false</code> the browser shows its native popup instead.</p>
`;

// `size` and `variant` apply only to sy-radio-button children (the toggle
// style). They have no effect on the regular sy-radio circle, so they are
// not exposed as standalone radio-group attribute stories — they're
// covered by the dedicated RadioButton stories in RadioButton/Attributes
// instead.
export const RadioGroupPosition         = (a: { position: any })       => html`<sy-radio-group position=${ifDefined(a.position)}>${defaultGroupChildren}</sy-radio-group>`;

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

// =============================================================================
// Group methods
// =============================================================================

// checkValidity — read-only; shouldn't visibly toggle anything. Shows "true"
// when valid, "false" otherwise.
export const RadioGroupCheckValidity = () => {
  const gRef: Ref<HTMLSyRadioGroupElement> = createRef();
  const check = async () => {
    const r = await gRef.value?.checkValidity();
    const out = document.getElementById('rgChkValidResult');
    if (out) out.textContent = `valid: ${r}`;
  };
  return html`
    <p>The group is <code>required</code>. Click <strong>checkValidity()</strong> without selecting any radio to see <code>false</code>; pick one then click again to see <code>true</code>.</p>
    <sy-radio-group ${ref(gRef)} required>${defaultGroupChildren}</sy-radio-group>
    <br/>
    <sy-button variant="primary" @click=${check}>checkValidity()</sy-button>
    <p>Result: <span id="rgChkValidResult">(idle)</span></p>
  `;
};

// reportValidity — should show the browser's native validity popup (anchored
// to the first radio) when the group is invalid. Wrapped in a <form> with a
// submit button so the popup has somewhere realistic to anchor to and so the
// "submit while invalid" path also works for testing.
export const RadioGroupReportValidity = () => {
  const gRef: Ref<HTMLSyRadioGroupElement> = createRef();
  return html`
    <p>The group is <code>required</code>. Click <strong>reportValidity()</strong> (or <strong>Submit</strong>) without selecting a radio &mdash; the browser shows its native validity popup. Pick a radio first and the buttons silently succeed.</p>
    <form @submit=${(e: Event) => e.preventDefault()}>
      <sy-radio-group ${ref(gRef)} required>${defaultGroupChildren}</sy-radio-group>
      <br/>
      <sy-button variant="primary" @click=${() => gRef.value?.reportValidity()}>reportValidity()</sy-button>
      <sy-button type="submit">Submit</sy-button>
    </form>
  `;
};

// setCustomError + clearCustomError on the same story — modeled after
// sy-input's SetCustomError pattern. The slotted <span slot="error"> is the
// surface that becomes visible when setCustomError() flips the group to
// `customError`. clearCustomError() reverts the group to the default
// validation flow.
export const RadioGroupSetCustomError = () => {
  const gRef: Ref<HTMLSyRadioGroupElement> = createRef();
  const submitResultId = `radioSubmitResult_${Math.random().toString(36).slice(2, 8)}`;
  let submitFired = false;
  const handleSubmitClick = () => {
    submitFired = false;
    requestAnimationFrame(() => {
      const out = document.getElementById(submitResultId);
      if (!out) return;
      if (submitFired) {
        out.textContent = 'Submit succeeded ✓';
        out.style.color = 'var(--success-text, #2e7d32)';
      } else {
        out.textContent = 'Submit blocked ✗ (custom error active)';
        out.style.color = 'var(--required, #c0392b)';
      }
    });
  };
  const handleSubmit = (e: Event) => { e.preventDefault(); submitFired = true; };
  return html`
    <form @submit=${handleSubmit}>
      <p>Click <strong>setCustomError()</strong> then <strong>Submit</strong> &mdash; submit is blocked. Click <strong>clearCustomError()</strong> then <strong>Submit</strong> &mdash; submit succeeds.</p>
      <sy-radio-group ${ref(gRef)} .noNativeValidity=${true}>
        ${defaultGroupChildren}
        <span slot="error">Pre-filled custom error message</span>
      </sy-radio-group>
      <br/>
      <sy-button variant="primary" @click=${() => gRef.value?.setCustomError()}>setCustomError()</sy-button>
      <sy-button @click=${() => gRef.value?.clearCustomError()}>clearCustomError()</sy-button>
      <sy-button type="submit" variant="primary" @mouseDown=${handleSubmitClick}>Submit</sy-button>
      <p id=${submitResultId}>(idle)</p>
    </form>
  `;
};

// getStatus — surfaces the validity status string. With required + nothing
// selected, returns "valueMissing". After selecting a radio it returns "".
// The previous implementation used a shared renderGroupMethod helper that
// hid the meaning behind a generic label; this one shows the status output
// inline so the user can see the call's actual return value.
export const RadioGroupGetStatus = () => {
  const gRef: Ref<HTMLSyRadioGroupElement> = createRef();
  const read = async () => {
    const s = await gRef.value?.getStatus();
    const out = document.getElementById('rgStatusResult');
    if (out) out.textContent = s ? s : '(valid)';
  };
  return html`
    <p>The group is <code>required</code>. Click <strong>getStatus()</strong> without picking a radio &mdash; status is <code>valueMissing</code>. Select a radio and click again &mdash; status becomes <code>(valid)</code> (empty string).</p>
    <sy-radio-group ${ref(gRef)} required>${defaultGroupChildren}</sy-radio-group>
    <br/>
    <sy-button variant="primary" @click=${read}>getStatus()</sy-button>
    <p>Status: <span id="rgStatusResult">(idle)</span></p>
  `;
};

// =============================================================================
// Radio button stories — every one shows three options inside the group so
// the user can interact with a real button group, see the focused/checked
// states pass between siblings, and confirm size/variant/disabled behavior
// against unaffected neighbors.
// =============================================================================

const buttonGroupChildren = html`
  <sy-radio-button value="a">A</sy-radio-button>
  <sy-radio-button value="b">B</sy-radio-button>
  <sy-radio-button value="c">C</sy-radio-button>
`;

export const RadioButtonChecked = (a: { checked: boolean }) => html`
  <p>Toggle <code>checked</code> in Controls. The first button (A) reflects the prop; the others (B, C) stay alongside so you can verify mutual exclusion when you click them.</p>
  <sy-radio-group>
    <sy-radio-button ?checked=${!!a.checked} value="a">A</sy-radio-button>
    <sy-radio-button value="b">B</sy-radio-button>
    <sy-radio-button value="c">C</sy-radio-button>
  </sy-radio-group>
`;

export const RadioButtonDisabled = (a: { disabled: boolean }) => html`
  <p>Toggle <code>disabled</code> on the first button (A) only &mdash; B and C remain interactive so you can compare the disabled visual against the active ones.</p>
  <sy-radio-group>
    <sy-radio-button ?disabled=${!!a.disabled} value="a">A</sy-radio-button>
    <sy-radio-button value="b">B</sy-radio-button>
    <sy-radio-button value="c">C</sy-radio-button>
  </sy-radio-group>
`;

export const RadioButtonValue = (a: { value: string }) => {
  const onSelect = (e: Event) => {
    const out = document.getElementById('rbValResult');
    if (out) out.textContent = `selected: ${(e as CustomEvent).detail}`;
  };
  return html`
    <p>The first button's <code>value</code> follows the Controls input. Click any button and watch the emitted <code>selected.detail</code> below.</p>
    <sy-radio-group @selected=${onSelect}>
      <sy-radio-button value=${ifDefined(a.value)}>${a.value || 'A'}</sy-radio-button>
      <sy-radio-button value="b">B</sy-radio-button>
      <sy-radio-button value="c">C</sy-radio-button>
    </sy-radio-group>
    <p>Result: <span id="rbValResult">(click a button)</span></p>
  `;
};

export const RadioButtonSize = (a: { size: any }) => html`
  <p>Change <code>size</code> in Controls. The whole group resizes consistently.</p>
  <sy-radio-group size=${ifDefined(a.size)}>${buttonGroupChildren}</sy-radio-group>
`;

export const RadioButtonVariant = (a: { variant: any }) => html`
  <p>Change <code>variant</code> between <code>outlined</code> and <code>solid</code> &mdash; click between buttons to see the active visual differ between variants.</p>
  <sy-radio-group variant=${ifDefined(a.variant)}>${buttonGroupChildren}</sy-radio-group>
`;

export const RadioButtonSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('rbSelResult');
    if (out) out.textContent = `selected: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-radio-group @selected=${handle}>${buttonGroupChildren}</sy-radio-group>
    <p>Result: <span id="rbSelResult">(idle)</span></p>
  `;
};
