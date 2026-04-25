import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyAutocompleteProps extends Components.SyAutocomplete {
  slot?: string;
  changed?: (event: CustomEvent<any>) => void;
  selected?: (event: CustomEvent<any>) => void;
}

const DEFAULT_SOURCE = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

/** Bind a `source` array to a sy-autocomplete element via a lit ref. */
const sourceRef = (source: any): ((el: Element | undefined) => void) => {
  return (el?: Element) => {
    if (el && Array.isArray(source)) {
      (el as any).source = source;
    }
  };
};

/** Generic autocomplete render reused by Overview + Attributes stories.
 *  camelCase Stencil props are bound via the `.prop=${...}` (property) syntax so that
 *  lit-html bypasses the case-insensitive HTML-attribute layer and sets the element
 *  property directly — essential for props whose attribute name is kebab-cased
 *  (highlightMatches → highlight-matches etc.). */
const renderAutocomplete = (args: Partial<SyAutocompleteProps>) => {
  const source = (args.source as any) ?? DEFAULT_SOURCE;
  return html`
    <sy-autocomplete
      ${ref(sourceRef(source))}
      .caseSensitive=${!!args.caseSensitive}
      .highlightMatches=${!!(args as any).highlightMatches}
      .noNativeValidity=${!!(args as any).noNativeValidity}
      ?loading=${!!args.loading}
      ?required=${!!args.required}
      ?disabled=${!!args.disabled}
      ?readonly=${!!(args as any).readonly}
      .debounceTime=${(args.debounceTime as any) ?? 0}
      .min=${(args.min as any) ?? 0}
      placeholder=${ifDefined(args.placeholder)}
      size=${ifDefined(args.size)}
      status=${ifDefined((args as any).status)}
      trigger=${ifDefined(args.trigger)}
      .value=${(args.value as any) ?? ''}
    ></sy-autocomplete>
  `;
};

export const Autocomplete = (args: SyAutocompleteProps) => renderAutocomplete(args);

export const AutocompleteCaseSensitive = (args: { caseSensitive: boolean }) =>
  renderAutocomplete({ ...args, source: ['ABC', 'DEF', 'GHI', 'abc', 'def'] as any });
export const AutocompleteDebounce      = (args: { debounceTime: number })           => renderAutocomplete(args);
export const AutocompleteDisabled      = (args: { disabled: boolean })              => renderAutocomplete(args as any);
export const AutocompleteHighlight     = (args: { highlightMatches: boolean })      => renderAutocomplete(args as any);
export const AutocompleteLoading       = (args: { loading: boolean })               => renderAutocomplete(args);
export const AutocompleteMin           = (args: { min: number })                    => renderAutocomplete(args);
export const AutocompletePlaceholder   = (args: { placeholder: string })            => renderAutocomplete(args);
export const AutocompleteReadonly      = (args: { readonly: boolean })              => renderAutocomplete(args as any);
export const AutocompleteSize          = (args: { size: 'small'|'medium'|'large' }) => renderAutocomplete(args);
export const AutocompleteSource        = (args: { source: string[] })               => renderAutocomplete(args as any);
export const AutocompleteStatus        = (args: { status: 'default'|'warning'|'error'|'success' }) => renderAutocomplete(args as any);
export const AutocompleteTrigger       = (args: { trigger: 'focus'|'input' })       => renderAutocomplete(args);
export const AutocompleteValue         = (args: { value: string })                  => renderAutocomplete(args as any);

/* -------------------- Methods -------------------- */

export const AutocompleteFocusBlur = () => {
  const elRef: Ref<HTMLSyAutocompleteElement> = createRef();
  const update = (text: string) => {
    const out = document.getElementById('autoFocusResult');
    if (out) out.textContent = text;
  };
  const setRefs = (el?: Element) => {
    if (el) (el as any).source = DEFAULT_SOURCE;
    (elRef as any).value = el;
  };

  return html`
    <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
      <sy-autocomplete
        ${ref(setRefs)}
        @focus=${() => update('focus')}
        @blur=${() => update('blur')}
      ></sy-autocomplete>
      <sy-button variant="primary" @click=${() => elRef.value?.setFocus()}>Call setFocus()</sy-button>
      <sy-button variant="secondary" @click=${() => elRef.value?.setBlur()}>Call setBlur()</sy-button>
    </div>
    <p>Status: <span id="autoFocusResult">(idle)</span></p>
  `;
};

export const AutocompleteCheckValidity = () => {
  const elRef: Ref<HTMLSyAutocompleteElement> = createRef();
  const setRefs = (el?: Element) => {
    if (el) (el as any).source = DEFAULT_SOURCE;
    (elRef as any).value = el;
  };
  const run = async () => {
    const out = document.getElementById('autocompleteValidityResult');
    if (elRef.value && out) {
      const valid = await elRef.value.checkValidity();
      const status = await (elRef.value as any).getValidStatus();
      out.textContent = `valid=${valid}, status=${status || 'ok'}`;
    }
  };
  return html`
    <sy-autocomplete ${ref(setRefs)} required placeholder="Required field"></sy-autocomplete>
    <sy-button variant="primary" @click=${run}>checkValidity()</sy-button>
    <p>Result: <span id="autocompleteValidityResult">(idle)</span></p>
  `;
};

/* setCustomError demo — **slot-driven** custom error.
 *
 * Pattern (applies to every SAIDA form-associated component):
 *   1. Author writes the error UI once inside [slot="error"].
 *   2. Either a native constraint fails (required, …) or app code calls
 *      el.setCustomError(): the same slot surfaces as the error.
 *   3. el.clearCustomError() restores native-only validation.
 *
 * This demo covers both triggers:
 *   - "Submit without value" → required fails → slot error shown automatically.
 *   - "Force setCustomError()" → app-driven invalid → slot error shown.
 *   - "Clear" → clears the programmatic error.
 */
export const AutocompleteSetCustomError = () => {
  const elRef: Ref<HTMLSyAutocompleteElement> = createRef();
  const source = ['Apple', 'Banana', 'Cherry', 'Date'];

  const setRefs = (el?: Element) => {
    if (el) (el as any).source = source;
    (elRef as any).value = el;
  };

  const submitResultId = `acSubmitResult_${Math.random().toString(36).slice(2, 8)}`;
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
    <form @submit=${handleSubmit} style="display:flex; flex-direction:column; gap:12px; width:360px;">
      <p>Click <strong>Force setCustomError()</strong> then <strong>Submit</strong> &mdash; submit is blocked because the field is in a custom-error state. Click <strong>clearCustomError()</strong> then <strong>Submit</strong> &mdash; submit succeeds.</p>
      <sy-autocomplete
        ${ref(setRefs)}
        .noNativeValidity=${true}
        placeholder="Click 'Force setCustomError()' below"
      >
        <div slot="error">
          <p style="color:#c0392b; margin:4px 0 0;">🚫 Custom error: please pick a valid fruit.</p>
        </div>
      </sy-autocomplete>
      <div style="display:flex; gap:8px;">
        <sy-button variant="primary" @click=${() => elRef.value?.setCustomError()}>Force setCustomError()</sy-button>
        <sy-button variant="secondary" @click=${() => elRef.value?.clearCustomError()}>clearCustomError()</sy-button>
        <sy-button type="submit" variant="primary" @mouseDown=${handleSubmitClick}>Submit</sy-button>
      </div>
      <p id=${submitResultId}>(idle)</p>
    </form>
  `;
};

/* Required + declarative slot error — matches the canonical HTML consumer pattern.
 * When the form is submitted without a value, the slot's message is shown automatically
 * without any JS wiring required. */
export const AutocompleteRequiredSlotError = () => {
  const elRef: Ref<HTMLSyAutocompleteElement> = createRef();
  const source = ['Apple', 'Banana', 'Cherry', 'Date'];

  const setRefs = (el?: Element) => {
    if (el) (el as any).source = source;
    (elRef as any).value = el;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const out = document.getElementById('autocompleteSlotErrorFormOut');
    const el = elRef.value;
    if (out && el) out.textContent = `Submitted: value="${(el as any).value}"`;
  };

  const justValidate = async () => {
    const out = document.getElementById('autocompleteSlotErrorFormOut');
    const el = elRef.value;
    if (!el) return;
    const valid = await el.reportValidity();
    if (out) out.textContent = `reportValidity() → ${valid}`;
  };

  return html`
    <form novalidate style="display:flex; flex-direction:column; gap:12px; width:360px;" @submit=${handleSubmit}>
      <sy-autocomplete
        ${ref(setRefs)}
        placeholder="Type something and submit without selecting"
        required
        trigger="input"
        name="fruit"
      >
        <div slot="error">
          <p style="color:#c0392b; margin:4px 0 0;">🚫 Custom error: You must select a valid fruit!</p>
        </div>
      </sy-autocomplete>
      <div style="display:flex; gap:8px;">
        <sy-button type="submit" variant="primary">Submit (Test Custom Error)</sy-button>
        <sy-button type="button" variant="secondary" @click=${justValidate}>Just Validate</sy-button>
      </div>
      <p>Result: <span id="autocompleteSlotErrorFormOut">(idle)</span></p>
    </form>
  `;
};

/* -------------------- Events -------------------- */

export const AutocompleteSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('autocompleteSelectedResult');
    if (out) out.textContent = 'value ' + (e as CustomEvent).detail.value + ' is selected';
  };
  return html`
    <sy-autocomplete ${ref(sourceRef(DEFAULT_SOURCE))} @selected=${handle}></sy-autocomplete>
    <p>Result: <span id="autocompleteSelectedResult">(idle)</span></p>
  `;
};

export const AutocompleteChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('autocompleteChangedResult');
    if (out) out.textContent = 'value ' + (e as CustomEvent).detail.value + ' is changed';
  };
  return html`
    <sy-autocomplete ${ref(sourceRef(DEFAULT_SOURCE))} @changed=${handle}></sy-autocomplete>
    <p>Result: <span id="autocompleteChangedResult">(idle)</span></p>
  `;
};

export const AutocompleteRequired = (args: { required: boolean }) => {
  const handleSubmit = (e: Event, elGetter: () => HTMLSyAutocompleteElement | undefined) => {
    e.preventDefault();
    const out = document.getElementById('autocompleteRequiredResult');
    const el = elGetter();
    if (out && el) out.textContent = 'Submitted: ' + (el as any).value;
  };
  const elRef: Ref<HTMLSyAutocompleteElement> = createRef();
  const setRefs = (el?: Element) => {
    if (el) (el as any).source = DEFAULT_SOURCE;
    (elRef as any).value = el;
  };

  return html`
    <form
      style="display:flex;flex-direction:column;gap:12px;width:300px;"
      @submit=${(e: Event) => handleSubmit(e, () => elRef.value)}
    >
      <sy-autocomplete
        ${ref(setRefs)}
        ?required=${!!args.required}
        name="country"
        placeholder="Select a fruit..."
      ></sy-autocomplete>
      <sy-button type="submit" variant="primary">Submit</sy-button>
    </form>
    <p>Result: <span id="autocompleteRequiredResult">(idle)</span></p>
  `;
};

/* -------------------- Form integration demo (FormData) -------------------- */

export const AutocompleteFormData = () => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const out = document.getElementById('autocompleteFormDataResult');
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const pairs: string[] = [];
    data.forEach((v, k) => pairs.push(`${k}=${v}`));
    if (out) out.textContent = pairs.join(', ') || '(empty)';
  };
  const bind = (el?: Element) => {
    if (el) (el as any).source = DEFAULT_SOURCE;
  };

  return html`
    <form style="display:flex;flex-direction:column;gap:12px;width:320px;" @submit=${handleSubmit}>
      <sy-autocomplete ${ref(bind)} name="fruit" placeholder="Pick a fruit…" required></sy-autocomplete>
      <sy-button type="submit" variant="primary">Submit</sy-button>
      <sy-button type="reset" variant="secondary">Reset</sy-button>
    </form>
    <p>FormData: <span id="autocompleteFormDataResult">(idle)</span></p>
  `;
};
