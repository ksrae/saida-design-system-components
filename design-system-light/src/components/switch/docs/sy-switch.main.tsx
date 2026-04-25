import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SySwitchProps extends Components.SySwitch {
  changed?: (event: CustomEvent<boolean>) => void;
}

// Each story returns ONE root <div>. The story-template wraps multi-root
// fragments in `<div class="sb-story-wrapper">`, which would show up in the
// docs source view; a single root sidesteps that wrapper entirely.

export const Switch = ({ checked, disabled, label, loading, readonly, size, required }: SySwitchProps) => html`
  <div>
    <sy-switch
      ?checked=${!!checked}
      ?disabled=${!!disabled}
      ?loading=${!!loading}
      ?readonly=${!!readonly}
      ?required=${!!required}
      label=${ifDefined(label)}
      size=${ifDefined(size)}>
    </sy-switch>
  </div>
`;

export const SwitchChecked  = (args: { checked: boolean })  => html`<div><sy-switch ?checked=${!!args.checked} label="Checked demo"></sy-switch></div>`;
export const SwitchDisabled = (args: { disabled: boolean }) => html`<div><sy-switch ?disabled=${!!args.disabled} label="Disabled demo"></sy-switch></div>`;
export const SwitchLabel    = (args: { label: string })     => html`<div><sy-switch label=${ifDefined(args.label)}></sy-switch></div>`;
export const SwitchLoading  = (args: { loading: boolean })  => html`<div><sy-switch ?loading=${!!args.loading} label="Loading demo"></sy-switch></div>`;
export const SwitchReadonly = (args: { readonly: boolean }) => html`<div><sy-switch ?readonly=${!!args.readonly} label="Readonly demo"></sy-switch></div>`;
export const SwitchSize     = (args: { size: 'small' | 'medium' }) => html`<div><sy-switch size=${ifDefined(args.size)} label="Size demo"></sy-switch></div>`;

// =============================================================================
// Form-related stories — share one helper. Real <form> + <sy-button type="submit">
// so the browser actually performs validation.
//
// Submit feedback: each form has a status line below it that flips between
//   "Submit succeeded ✓"  ← @submit fires (form passed validation)
//   "Submit blocked ✗"    ← @submit didn't fire by next frame
//
// Why @mouseDown (not @click) on the Submit button:
//   sy-button[type=submit] runs its own click handler at the inner-button
//   target phase and calls event.stopPropagation(), so a @click on the outer
//   <sy-button> never fires. mouseDown fires *before* click and isn't blocked,
//   so we use it to reset `submitFired` and schedule the rAF check.
// =============================================================================

const renderFormStory = (
  attrs: { required?: boolean; checked?: boolean; slotError?: string; label?: string },
  description: unknown,
  extraButtons?: (sRef: Ref<HTMLSySwitchElement>) => unknown,
) => {
  const sRef: Ref<HTMLSySwitchElement> = createRef();
  const resultId = `switchSubmitResult_${Math.random().toString(36).slice(2, 8)}`;
  let submitFired = false;
  const resetBlockedResult = () => {
    const out = document.getElementById(resultId);
    if (!out?.textContent?.startsWith('Submit blocked')) return;
    out.textContent = '(idle)';
    out.style.color = '';
  };
  const isSwitchInvalid = async () => {
    const el = sRef.value;
    if (!el) return !submitFired;
    const status = await el.getValidStatus();
    return !!status || el.matches(':invalid');
  };
  // Keep the slotted error in lockstep with the switch state. sy-switch's
  // own .visible-error class can re-appear after a `changed` event because
  // its internal validity tracking lags the visual `checked` state by a
  // frame, so we drive the slot span's display directly: visible only when
  // `required` is set AND the switch is off. Synced both on every toggle
  // (@changed) and on every submit attempt (mouseDown + @submit) — the
  // toggle hook covers UX while the submit hooks defeat any race against
  // sy-switch's re-render.
  const syncSlotError = async (resetResultWhenValid = false) => {
    const el = sRef.value;
    if (!el) return;
    const slot = el.querySelector('[slot="error"]') as HTMLElement | null;
    if (!slot) return;
    const status = await el.getValidStatus();
    const shouldShow = (!!el.required && !el.checked) || status === 'custom';
    slot.style.display = shouldShow ? '' : 'none';
    if (resetResultWhenValid && !shouldShow) resetBlockedResult();
  };
  const armSubmitDetector = () => {
    submitFired = false;
    void syncSlotError();
    requestAnimationFrame(async () => {
      await syncSlotError();
      const out = document.getElementById(resultId);
      if (!out) return;
      const blocked = !submitFired && await isSwitchInvalid();
      if (!blocked) {
        out.textContent = 'Submit succeeded ✓';
        out.style.color = 'var(--success-text, #2e7d32)';
      } else {
        out.textContent = 'Submit blocked ✗ (validation failed)';
        out.style.color = 'var(--required, #c0392b)';
      }
    });
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    submitFired = true;
    void syncSlotError();
  };
  return html`
    <div>
      ${description}
      <form @submit=${handleSubmit}>
        <sy-switch
          ${ref(sRef)}
          name="agree"
          label=${ifDefined(attrs.label ?? 'I agree to the terms')}
          ?checked=${!!attrs.checked}
          ?required=${!!attrs.required}
          @changed=${() => { void syncSlotError(true); }}>
          ${attrs.slotError
            ? html`<span slot="error">${attrs.slotError}</span>`
            : ''}
        </sy-switch>
        <br/>
        <sy-button type="submit" variant="primary" @mouseDown=${armSubmitDetector}>Submit</sy-button>
        ${extraButtons ? extraButtons(sRef) : ''}
        <p id=${resultId}>(idle)</p>
      </form>
    </div>
  `;
};

export const SwitchRequired = (a: { required: boolean }) =>
  renderFormStory(
    { required: a.required, slotError: 'Please toggle this on to continue.' },
    html`<p>Toggle <code>required</code> in Controls. Click <strong>Submit</strong> with the switch off &mdash; with <code>required=true</code> the submit is blocked and the slotted error message appears below the switch. Toggle the switch on and submit succeeds.</p>`,
  );

// =============================================================================
// Method stories — run inside a real <form> so internals are wired up.
// =============================================================================

export const SwitchCheckValidity = () =>
  renderFormStory(
    { required: true, slotError: 'Please toggle this on to continue.' },
    html`<p>The switch is <code>required</code>. Click <strong>checkValidity()</strong> &mdash; it returns <code>false</code> while off, <code>true</code> once toggled on.</p>`,
    (sRef) => html`
      <sy-button @click=${async () => {
        if (!sRef.value) return;
        const r = await sRef.value.checkValidity();
        const out = document.getElementById('switchCheckValidityResult');
        if (out) out.textContent = `valid: ${r}`;
      }}>checkValidity()</sy-button>
      <p id="switchCheckValidityResult">(idle)</p>
    `,
  );

export const SwitchReportValidity = () =>
  renderFormStory(
    { required: true, slotError: 'Please toggle this on to continue.' },
    html`<p>The switch is <code>required</code>. Click <strong>reportValidity()</strong> while off &mdash; the slotted error appears below the switch (sy-switch has no native popup; the slot is the only error surface).</p>`,
    (sRef) => html`
      <sy-button @click=${() => sRef.value?.reportValidity()}>reportValidity()</sy-button>
    `,
  );

export const SwitchSetCustomError = () =>
  renderFormStory(
    { slotError: 'Custom error from setCustomError()' },
    html`<p>Three flows on one form:</p>
         <ul>
           <li><strong>Submit</strong> as-is &rarr; <em>Submit succeeded</em></li>
           <li>Click <strong>clearCustomError()</strong>, then <strong>Submit</strong> &rarr; <em>Submit succeeded</em></li>
           <li>Click <strong>setCustomError()</strong>, then <strong>Submit</strong> &rarr; <em>Submit blocked</em>, slotted error shown</li>
         </ul>`,
    (sRef) => html`
      <sy-button @click=${async () => { await sRef.value?.setCustomError(); const slot = sRef.value?.querySelector('[slot="error"]') as HTMLElement | null; if (slot) slot.style.display = ''; }}>setCustomError()</sy-button>
      <sy-button @click=${() => sRef.value?.clearCustomError()}>clearCustomError()</sy-button>
    `,
  );

// =============================================================================
// Event story
// =============================================================================

export const SwitchChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('switchChangedResult');
    if (out) out.textContent = `changed: ${(e as CustomEvent).detail}`;
  };
  return html`
    <div>
      <sy-switch label="Toggle me" @changed=${handle}></sy-switch>
      <p id="switchChangedResult">(idle)</p>
    </div>
  `;
};
