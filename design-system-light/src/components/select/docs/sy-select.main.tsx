import { html, ifDefined, ref, createRef, Ref, unsafeHTML } from '../../../utils/story-template';
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

// Inlined as raw HTML (via unsafeHTML) instead of a multi-VNode template so
// that interpolating `${defaultOptions}` doesn't trigger story-template's
// multi-root <div class="sb-story-wrapper"> wrapper inside the <sy-select>.
// The wrapper was harmless at runtime (sy-select queries descendants for
// `sy-option`) but it cluttered Storybook's "Show code" view with nested
// wrapper divs.
//
// Kept on a SINGLE LINE so Storybook's source-code panel renders the
// options compactly. A multi-line template literal preserves its newlines
// and indentation in the inlined markup, which the source viewer
// re-emits with extra blank-line spacing — exactly what the user
// complained looked broken.
const defaultOptionsHTML = `<sy-option value="apple" label="Apple"></sy-option><sy-option value="banana" label="Banana"></sy-option><sy-option value="cherry" label="Cherry"></sy-option>`;
const defaultOptions = unsafeHTML(defaultOptionsHTML);

// Named result-line writers, hoisted so they don't show as inline arrow
// functions in Storybook's source code panel. Each writes a labelled JSON
// dump to the result <p> identified by `resultId`.
const writeEventResult = (resultId: string, label: string) => (e: Event) => {
  const out = document.getElementById(resultId);
  if (out) out.textContent = `${label}: ${JSON.stringify((e as CustomEvent).detail ?? null)}`;
};

// Standard "preventDefault" handler for form submit so storybook iframe
// doesn't navigate away on a valid submit.
const preventSubmit = (e: Event) => e.preventDefault();

export const Select = (a: SySelectProps) => html`
  <div>
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
      .selectedOptions=${a.selectedOptions}
      placeholder=${ifDefined(a.placeholder)}
      size=${ifDefined(a.size)}
      mode=${ifDefined(a.mode)}
      name=${ifDefined(a.name)}
    >${defaultOptions}</sy-select>
  </div>
`;

export const SelectOption = (a: SySelectOptionProps) => html`
  <div>
    <sy-select>
      <sy-option
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
      ></sy-option>
      <sy-option value="banana" label="Banana"></sy-option>
      <sy-option value="cherry" label="Cherry"></sy-option>
    </sy-select>
  </div>
`;

// =============================================================================
// Attribute stories — every story returns a single root <div> so
// story-template doesn't add an auto-wrapper, and inlines defaultOptions
// via unsafeHTML so the inner level is also unwrapped.
// =============================================================================

// Clearable / DefaultValue use `mode="searchable"` so the trigger renders a
// real input — without it, the `default` mode shows just the selected
// label and the clear icon / default-value behavior is harder to observe.
export const SelectClearable    = (a: { clearable: boolean })   => html`<div><sy-select mode="searchable" ?clearable=${!!a.clearable} .defaultValue=${'apple'}>${defaultOptions}</sy-select></div>`;
export const SelectDisabled     = (a: { disabled: boolean })    => html`<div><sy-select ?disabled=${!!a.disabled}>${defaultOptions}</sy-select></div>`;
export const SelectReadonly     = (a: { readonly: boolean })    => html`<div><sy-select ?readonly=${!!a.readonly}>${defaultOptions}</sy-select></div>`;
export const SelectEmpty        = (a: { empty: boolean })       => html`<div><sy-select ?empty=${!!a.empty}>${defaultOptions}</sy-select></div>`;
export const SelectError        = (a: { error: boolean })       => html`<div><sy-select ?error=${!!a.error}>${defaultOptions}</sy-select></div>`;
export const SelectLoading      = (a: { loading: boolean })     => html`<div><sy-select ?loading=${!!a.loading}>${defaultOptions}</sy-select></div>`;
export const SelectMaxTagCount  = (a: { maxTagCount: number })  => html`<div><sy-select mode="multiple" .maxTagCount=${a.maxTagCount} .defaultValue=${'apple,banana,cherry'}>${defaultOptions}</sy-select></div>`;
export const SelectDefaultValue = (a: { defaultValue: string }) => html`<div><sy-select mode="searchable" .defaultValue=${a.defaultValue}>${defaultOptions}</sy-select></div>`;
export const SelectPlaceholder  = (a: { placeholder: string })  => html`<div><sy-select placeholder=${ifDefined(a.placeholder)}>${defaultOptions}</sy-select></div>`;
export const SelectSize         = (a: { size: any })            => html`<div><sy-select size=${ifDefined(a.size)}>${defaultOptions}</sy-select></div>`;
export const SelectMode         = (a: { mode: any })            => html`<div><sy-select mode=${ifDefined(a.mode)}>${defaultOptions}</sy-select></div>`;

export const SelectSelectedOptions = (a: { selectedOptions: { value: string; label?: string }[] }) =>
  html`<div><sy-select mode="multiple" .selectedOptions=${a.selectedOptions}>${defaultOptions}</sy-select></div>`;

// =============================================================================
// Form-related stories share one helper. Real <form> + <sy-button type="submit">
// so the browser actually performs validation; the helper accepts an optional
// `extraButtons` slot for stories that drive a method on top of the submit
// flow (checkValidity / reportValidity / setCustomError).
// =============================================================================

// Submit feedback: each form has a status line below it that flips between
//   "Submit succeeded ✓"  ← @submit fires (form passed validation)
//   "Submit blocked ✗"    ← @submit didn't fire by next frame (validation failed)
const renderFormStory = (
  selectAttrs: { required?: boolean; noNativeValidity?: boolean; slotError?: string },
  description: unknown,
  extraButtons?: (sRef: Ref<HTMLSySelectElement>) => unknown,
) => {
  const sRef: Ref<HTMLSySelectElement> = createRef();
  const resultId = `selectSubmitResult_${Math.random().toString(36).slice(2, 8)}`;
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
        <sy-select
          ${ref(sRef)}
          ?required=${!!selectAttrs.required}
          .noNativeValidity=${selectAttrs.noNativeValidity}
        >
          ${defaultOptions}
          ${selectAttrs.slotError
            ? html`<span slot="error">${selectAttrs.slotError}</span>`
            : ''}
        </sy-select>
        <br/>
        <sy-button type="submit" variant="primary" @mouseDown=${handleClick}>Submit</sy-button>
        ${extraButtons ? extraButtons(sRef) : ''}
        <p id=${resultId}>(idle)</p>
      </form>
    </div>
  `;
};

export const SelectRequired = (a: { required: boolean }) =>
  renderFormStory(
    { required: a.required },
    html`<p>Toggle <code>required</code> in Controls. Click <strong>Submit</strong> without picking an option &mdash; with <code>required</code> on, the browser blocks submission and shows its native validity popup.</p>`,
  );

export const SelectNoNativeValidity = (a: { noNativeValidity: boolean }) =>
  renderFormStory(
    {
      required: true,
      noNativeValidity: a.noNativeValidity,
      slotError: 'Please pick one of the options.',
    },
    html`<p>The select is <code>required</code>. Click <strong>Submit</strong> without picking an option. With <code>noNativeValidity=true</code> the native popup is suppressed and the slotted error appears under the select; with <code>false</code> the browser shows its native popup instead.</p>`,
  );

// =============================================================================
// Event stories
// =============================================================================

export const SelectOpened = () => {
  const handle = writeEventResult('sOpResult', 'opened');
  return html`
    <div>
      <p>Click the trigger to open the dropdown &mdash; <code>opened</code> fires once per opening. Apple is preselected so the trigger isn't empty when the page loads.</p>
      <sy-select .defaultValue=${'apple'} @opened=${handle}>${defaultOptions}</sy-select>
      <p id="sOpResult">(idle)</p>
    </div>
  `;
};

// `removed` fires when a CHIP is removed from a multi-select — that's why
// the previous default-mode story never produced anything: there are no
// chips to remove. Render `mode="multiple"` with two preselected chips so
// the user can click the X on a chip and watch `removed` fire.
export const SelectRemoved = () => {
  const handle = writeEventResult('sRmResult', 'removed');
  const preselected = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ];
  return html`
    <div>
      <p>Click the X on either chip (Apple / Banana) to remove it &mdash; <code>removed</code> fires with the removed item plus the remaining selection.</p>
      <sy-select mode="multiple" .selectedOptions=${preselected} @removed=${handle}>${defaultOptions}</sy-select>
      <p id="sRmResult">(idle)</p>
    </div>
  `;
};

export const SelectSelected = () => {
  const handle = writeEventResult('sSelResult', 'selected');
  return html`
    <div>
      <p>Open the dropdown and pick an option &mdash; <code>selected</code> fires with the picked entry.</p>
      <sy-select @selected=${handle}>${defaultOptions}</sy-select>
      <p id="sSelResult">(idle)</p>
    </div>
  `;
};

// `mode="searchable"` for focus / blur / input — the default mode trigger
// is read-only, so there's no native input there to focus or type into.
export const SelectFocused = () => {
  const handle = writeEventResult('sFocResult', 'focused');
  return html`
    <div>
      <p>Tab into or click the input &mdash; <code>focused</code> fires.</p>
      <sy-select mode="searchable" @focused=${handle}>${defaultOptions}</sy-select>
      <p id="sFocResult">(idle)</p>
    </div>
  `;
};

export const SelectBlured = () => {
  const handle = writeEventResult('sBlurResult', 'blured');
  return html`
    <div>
      <p>Focus the input then click outside &mdash; <code>blured</code> fires on focusout.</p>
      <sy-select mode="searchable" @blured=${handle}>${defaultOptions}</sy-select>
      <p id="sBlurResult">(idle)</p>
    </div>
  `;
};

export const SelectInputChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('sICResult');
    if (out) out.textContent = `input: ${(e as CustomEvent).detail}`;
  };
  return html`
    <div>
      <p>Type in the input &mdash; <code>inputChanged</code> fires per keystroke.</p>
      <sy-select mode="searchable" @inputChanged=${handle}>${defaultOptions}</sy-select>
      <p id="sICResult">(idle)</p>
    </div>
  `;
};

export const SelectCleared = () => {
  const handle = () => {
    const out = document.getElementById('sClResult');
    if (out) out.textContent = 'cleared';
  };
  return html`
    <div>
      <p>Click the clear (×) icon &mdash; <code>cleared</code> fires.</p>
      <sy-select mode="searchable" clearable .defaultValue=${'apple'} @cleared=${handle}>${defaultOptions}</sy-select>
      <p id="sClResult">(idle)</p>
    </div>
  `;
};

// =============================================================================
// Method stories
// =============================================================================

const renderSelectMethod = (label: string, action: (el: HTMLSySelectElement, out: HTMLElement | null) => Promise<void> | void) => {
  const sRef: Ref<HTMLSySelectElement> = createRef();
  const outId = `sm-${Math.random().toString(36).slice(2, 8)}`;
  return html`
    <div>
      <sy-select ${ref(sRef)}>${defaultOptions}</sy-select>
      <br/>
      <sy-button @click=${async () => { if (sRef.value) await action(sRef.value, document.getElementById(outId)); }}>${label}</sy-button>
      <p id=${outId}>(idle)</p>
    </div>
  `;
};

export const SelectSetValue   = () => renderSelectMethod('setValue("banana")', async (el, out) => { await el.setValue('banana'); if (out) out.textContent = 'set'; });
export const SelectClearValue = () => renderSelectMethod('clearValue()',       async (el, out) => { await el.clearValue(); if (out) out.textContent = 'cleared'; });

// `hide` flips the host's display. Two buttons so the user can toggle
// between visible and hidden states and observe the transition.
export const SelectHideMethod = () => {
  const sRef: Ref<HTMLSySelectElement> = createRef();
  return html`
    <div>
      <p>Click <strong>hide=true</strong> to remove the select from view, then <strong>hide=false</strong> to bring it back.</p>
      <sy-select ${ref(sRef)}>${defaultOptions}</sy-select>
      <br/>
      <sy-button variant="primary" @click=${() => { if (sRef.value) sRef.value.hide = true; }}>hide = true</sy-button>
      <sy-button @click=${() => { if (sRef.value) sRef.value.hide = false; }}>hide = false</sy-button>
    </div>
  `;
};

export const SelectCheckValidity = () => {
  const description = html`<p>The select is <code>required</code>. Click <strong>checkValidity()</strong> with nothing selected to see <code>false</code>; pick an option and click again for <code>true</code>. <strong>Submit</strong> also exercises the validity check.</p>`;
  return renderFormStory({ required: true }, description, (sRef) => {
    const check = async () => {
      const ok = await sRef.value?.checkValidity();
      const out = document.getElementById('sCheckValidityResult');
      if (out) out.textContent = String(ok);
    };
    return html`
      <sy-button @click=${check}>checkValidity()</sy-button>
      <p>Result: <span id="sCheckValidityResult">(idle)</span></p>
    `;
  });
};

export const SelectReportValidity = () => {
  const description = html`<p>The select is <code>required</code>. Click <strong>reportValidity()</strong> (or <strong>Submit</strong>) without picking an option &mdash; the browser shows its native validity popup. Pick one first and both succeed silently.</p>`;
  return renderFormStory({ required: true }, description, (sRef) => html`
    <sy-button @click=${() => sRef.value?.reportValidity()}>reportValidity()</sy-button>
  `);
};

// setCustomError + clearCustomError combined in one story (clearCustomError
// has no menu of its own anymore — it shares this fixture).
export const SelectSetCustomError = () => {
  const description = html`<p>Click <strong>setCustomError()</strong> then <strong>Submit</strong> &mdash; submit is blocked. Click <strong>clearCustomError()</strong> then <strong>Submit</strong> &mdash; submit succeeds.</p>`;
  return renderFormStory(
    { noNativeValidity: true, slotError: 'Pre-filled custom error message' },
    description,
    (sRef) => html`
      <sy-button @click=${() => sRef.value?.setCustomError()}>setCustomError()</sy-button>
      <sy-button @click=${() => sRef.value?.clearCustomError()}>clearCustomError()</sy-button>
    `,
  );
};

// =============================================================================
// Option attribute / event stories — REMOVED.
// The user asked these be dropped from the menu. We keep no exports here so
// any orphan story-file imports will surface as a build error and force
// removal of the matching folder, rather than silently rendering a broken
// story.
// =============================================================================
