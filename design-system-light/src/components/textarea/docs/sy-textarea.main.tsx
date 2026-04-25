import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyTextareaProps extends Components.SyTextarea {
  changed?: (event: CustomEvent<{ value: string; length: number; isValid: boolean; status: string }>) => void;
  blured?: (event: CustomEvent<{ value: string; isValid: boolean; status: string }>) => void;
  focused?: (event: CustomEvent<{ value: string; isValid: boolean; status: string }>) => void;
}

// Each story returns a SINGLE root element so story-template skips its
// auto-wrapper (`<div class="sb-story-wrapper">`) — keeps the docs source
// view tight, no extra wrapper showing up around every example.

export const Textarea = (a: SyTextareaProps) => html`
  <div>
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
      .max=${a.max}
      .min=${a.min}
      .rows=${a.rows}
      .value=${a.value}
      .noNativeValidity=${a.noNativeValidity}>
    </sy-textarea>
  </div>
`;

// =============================================================================
// Attribute stories
// =============================================================================

export const TextareaAutofocus  = (args: { autofocus: boolean })   => html`<div><sy-textarea ?autofocus=${!!args.autofocus}></sy-textarea></div>`;
export const TextareaBorderless = (args: { borderless: boolean })  => html`<div><sy-textarea ?borderless=${!!args.borderless}></sy-textarea></div>`;
export const TextareaClearable  = (args: { clearable: boolean })   => html`<div><sy-textarea ?clearable=${!!args.clearable} .value=${'type to clear'}></sy-textarea></div>`;
export const TextareaCounter    = (args: { counter: boolean })     => html`<div><sy-textarea ?counter=${!!args.counter} .max=${100}></sy-textarea></div>`;
export const TextareaDisabled   = (args: { disabled: boolean })    => html`<div><sy-textarea ?disabled=${!!args.disabled}></sy-textarea></div>`;
export const TextareaLabel      = (args: { label: string })        => html`<div><sy-textarea label=${ifDefined(args.label)}></sy-textarea></div>`;
export const TextareaMax        = (args: { max: number })          => html`<div><sy-textarea counter .max=${args.max}></sy-textarea></div>`;
export const TextareaMin        = (args: { min: number })          => html`<div><sy-textarea counter .min=${args.min}></sy-textarea></div>`;
export const TextareaPlaceholder = (args: { placeholder: string }) => html`<div><sy-textarea placeholder=${ifDefined(args.placeholder)}></sy-textarea></div>`;
export const TextareaReadonly   = (args: { readonly: boolean })    => html`<div><sy-textarea ?readonly=${!!args.readonly} .value=${'readonly text'}></sy-textarea></div>`;
export const TextareaResize     = (args: { resize: any })          => html`<div><sy-textarea resize=${ifDefined(args.resize)}></sy-textarea></div>`;
export const TextareaRows       = (args: { rows: number })         => html`<div><sy-textarea .rows=${args.rows}></sy-textarea></div>`;
export const TextareaSize       = (args: { size: any })            => html`<div><sy-textarea size=${ifDefined(args.size)}></sy-textarea></div>`;
export const TextareaStatus     = (args: { status: any })          => html`<div><sy-textarea status=${ifDefined(args.status)} .value=${'Status preview'}></sy-textarea></div>`;
export const TextareaValue      = (args: { value: string })        => html`<div><sy-textarea .value=${args.value}></sy-textarea></div>`;

// =============================================================================
// Form-related stories — share one helper. Real <form> + <sy-button type="submit">
// so the browser actually performs validation; an optional `extraButtons`
// slot lets stories add method-driven buttons on top of the submit flow.
// =============================================================================

// Submit feedback: each form has a status line below it that flips between
//   "Submit succeeded ✓"  ← @submit fires (form passed validation)
//   "Submit blocked ✗"    ← @submit didn't fire by next frame (validation failed)
// The click-to-rAF gap is the cleanest way to know whether the submit went
// through, without depending on `invalid` events (they don't bubble, so
// onInvalid on the <form> wouldn't catch field-level invalidity in the
// story-template renderer that has no capture-phase listener support).

const renderFormStory = (
  attrs: { required?: boolean; noNativeValidity?: boolean; min?: number; max?: number; counter?: boolean; slotError?: string; defaultValue?: string },
  description: unknown,
  extraButtons?: (tRef: Ref<HTMLSyTextareaElement>) => unknown,
) => {
  const tRef: Ref<HTMLSyTextareaElement> = createRef();
  const resultId = `taSubmitResult_${Math.random().toString(36).slice(2, 8)}`;
  let submitFired = false;
  const handleClick = () => {
    submitFired = false;
    requestAnimationFrame(() => {
      const out = document.getElementById(resultId);
      if (!out) return;
      if (submitFired) {
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
  };
  return html`
    <div>
      ${description}
      <form @submit=${handleSubmit}>
        <sy-textarea
          ${ref(tRef)}
          ?required=${!!attrs.required}
          ?counter=${!!attrs.counter}
          .min=${attrs.min ?? 0}
          .max=${attrs.max ?? Number.MAX_SAFE_INTEGER}
          .value=${attrs.defaultValue ?? ''}
          .noNativeValidity=${attrs.noNativeValidity}>
          ${attrs.slotError
            ? html`<span slot="error">${attrs.slotError}</span>`
            : ''}
        </sy-textarea>
        <br/>
        <sy-button type="submit" variant="primary" @mouseDown=${handleClick}>Submit</sy-button>
        ${extraButtons ? extraButtons(tRef) : ''}
        <p id=${resultId}>(idle)</p>
      </form>
    </div>
  `;
};

export const TextareaRequired = (a: { required: boolean }) =>
  renderFormStory(
    { required: a.required },
    html`<p>Toggle <code>required</code> in Controls. Click <strong>Submit</strong> with the field empty &mdash; with <code>required=true</code> the browser blocks submission and shows the native validity popup.</p>`,
  );

export const TextareaNoNativeValidity = (a: { noNativeValidity: boolean }) =>
  renderFormStory(
    {
      required: true,
      noNativeValidity: a.noNativeValidity,
      slotError: 'Please write a message before submitting.',
    },
    html`<p>The textarea is <code>required</code>. Click <strong>Submit</strong> with the field empty. With <code>noNativeValidity=true</code> the native popup is suppressed and the slotted error appears below the textarea; with <code>false</code> the browser shows its native popup instead.</p>`,
  );

// =============================================================================
// Event stories
// =============================================================================

const writeEventResult = (resultId: string, label: string) => (e: Event) => {
  const out = document.getElementById(resultId);
  if (out) out.textContent = `${label}: ${JSON.stringify((e as CustomEvent).detail ?? null)}`;
};

export const TextareaChanged = () => {
  const handle = writeEventResult('taChangedResult', 'changed');
  return html`
    <div>
      <p>Type into the textarea &mdash; <code>changed</code> fires per keystroke with <code>{ value, length, isValid, status }</code>.</p>
      <sy-textarea @changed=${handle}></sy-textarea>
      <p id="taChangedResult">(idle)</p>
    </div>
  `;
};

export const TextareaBlured = () => {
  const handle = writeEventResult('taBluredResult', 'blured');
  return html`
    <div>
      <p>Focus the textarea then click outside &mdash; <code>blured</code> fires.</p>
      <sy-textarea @blured=${handle}></sy-textarea>
      <p id="taBluredResult">(idle)</p>
    </div>
  `;
};

export const TextareaFocused = () => {
  const handle = writeEventResult('taFocusedResult', 'focused');
  return html`
    <div>
      <p>Tab into or click the textarea &mdash; <code>focused</code> fires.</p>
      <sy-textarea @focused=${handle}></sy-textarea>
      <p id="taFocusedResult">(idle)</p>
    </div>
  `;
};

// =============================================================================
// Method stories — focus / blur are standalone; the validation methods all
// run inside a real <form> via renderFormStory so the textarea is wired to
// ElementInternals the same way the user's apps will use it.
// =============================================================================

const renderMethodStandalone = (label: string, action: (el: HTMLSyTextareaElement, out: HTMLElement | null) => void | Promise<void>, opts: { autofocus?: boolean } = {}) => {
  const tRef: Ref<HTMLSyTextareaElement> = createRef();
  const outId = `taOut_${Math.random().toString(36).slice(2, 8)}`;
  return html`
    <div>
      <sy-textarea ${ref(tRef)} ?autofocus=${!!opts.autofocus}></sy-textarea>
      <br/>
      <sy-button @click=${async () => {
        if (!tRef.value) return;
        await action(tRef.value, document.getElementById(outId));
      }}>${label}</sy-button>
      <p id=${outId}>(idle)</p>
    </div>
  `;
};

export const TextareaSetFocus = () => renderMethodStandalone('setFocus()', (el) => { el.setFocus(); });
export const TextareaSetBlur  = () => renderMethodStandalone('setBlur()',  (el) => { el.setBlur(); }, { autofocus: true });

export const TextareaCheckValidity = () =>
  renderFormStory(
    { required: true },
    html`<p>The textarea is <code>required</code>. Click <strong>checkValidity()</strong> &mdash; it returns <code>false</code> while empty (no popup), and <code>true</code> once you've typed something.</p>`,
    (tRef) => html`
      <sy-button @click=${async () => {
        if (!tRef.value) return;
        const r = await tRef.value.checkValidity();
        const out = document.getElementById('taCheckValidityResult');
        if (out) out.textContent = `valid: ${r}`;
      }}>checkValidity()</sy-button>
      <p id="taCheckValidityResult">(idle)</p>
    `,
  );

export const TextareaReportValidity = () =>
  renderFormStory(
    { required: true },
    html`<p>The textarea is <code>required</code>. Click <strong>reportValidity()</strong> while empty &mdash; the browser shows its native validity popup just like the Submit path.</p>`,
    (tRef) => html`
      <sy-button @click=${() => tRef.value?.reportValidity()}>reportValidity()</sy-button>
    `,
  );

export const TextareaSetCustomError = () =>
  renderFormStory(
    { noNativeValidity: true, slotError: 'Custom error from setCustomError()' },
    html`<p>Click <strong>setCustomError()</strong> then <strong>Submit</strong> &mdash; submit is blocked. Click <strong>clearCustomError()</strong> then <strong>Submit</strong> &mdash; submit succeeds.</p>`,
    (tRef) => html`
      <sy-button @click=${() => tRef.value?.setCustomError()}>setCustomError()</sy-button>
      <sy-button @click=${() => tRef.value?.clearCustomError()}>clearCustomError()</sy-button>
    `,
  );

export const TextareaGetStatus = () =>
  renderFormStory(
    { required: true, min: 5 },
    html`<p>The textarea is <code>required</code> with <code>min=5</code>. Click <strong>getStatus()</strong> at different points: empty &rarr; <code>valueMissing</code>; with 1&ndash;4 chars &rarr; <code>tooShort</code>; with 5+ &rarr; empty string.</p>`,
    (tRef) => html`
      <sy-button @click=${async () => {
        if (!tRef.value) return;
        const s = await tRef.value.getStatus();
        const out = document.getElementById('taGetStatusResult');
        if (out) out.textContent = `status: ${s || '(valid)'}`;
      }}>getStatus()</sy-button>
      <p id="taGetStatusResult">(idle)</p>
    `,
  );

// =============================================================================
// Form integration story — confirms the textarea participates natively in
// <form> and submits the value under its `name`.
// =============================================================================

export const TextareaFormData = () => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const pairs: string[] = [];
    data.forEach((v, k) => pairs.push(`${k}=${v}`));
    const out = document.getElementById('taFormDataResult');
    if (out) out.textContent = pairs.join(', ') || '(empty)';
  };
  return html`
    <form @submit=${handleSubmit}>
      <sy-textarea name="comment" label="Comment" placeholder="Type something then submit"></sy-textarea>
      <br/>
      <sy-button type="submit" variant="primary">Submit</sy-button>
      <p>FormData: <span id="taFormDataResult">(idle)</span></p>
    </form>
  `;
};
