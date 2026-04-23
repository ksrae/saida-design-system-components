import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
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

/** Generic autocomplete render reused by Overview + Attributes stories. */
const renderAutocomplete = (args: Partial<SyAutocompleteProps>) => {
  const source = (args.source as any) ?? DEFAULT_SOURCE;
  return html`
    <sy-autocomplete
      ${ref(sourceRef(source))}
      .caseSensitive=${!!args.caseSensitive}
      ?loading=${!!args.loading}
      ?required=${!!args.required}
      debounceTime=${ifDefined(args.debounceTime)}
      min=${ifDefined(args.min)}
      placeholder=${ifDefined(args.placeholder)}
      size=${ifDefined(args.size)}
      trigger=${ifDefined(args.trigger)}
    ></sy-autocomplete>
  `;
};

export const Autocomplete = (args: SyAutocompleteProps) => renderAutocomplete(args);

export const AutocompleteCaseSensitive = (args: { caseSensitive: boolean }) =>
  renderAutocomplete({ ...args, source: ['ABC', 'DEF', 'GHI', 'abc', 'def'] as any });
export const AutocompleteDebounce      = (args: { debounceTime: number })           => renderAutocomplete(args);
export const AutocompleteLoading       = (args: { loading: boolean })               => renderAutocomplete(args);
export const AutocompleteMin           = (args: { min: number })                    => renderAutocomplete(args);
export const AutocompletePlaceholder   = (args: { placeholder: string })            => renderAutocomplete(args);
export const AutocompleteSize          = (args: { size: 'small'|'medium'|'large' }) => renderAutocomplete(args);
export const AutocompleteSource        = (args: { source: string[] })               => renderAutocomplete(args as any);
export const AutocompleteTrigger       = (args: { trigger: 'focus'|'input' })       => renderAutocomplete(args);

/* -------------------- Methods -------------------- */

export const AutocompleteFocusBlur = () => {
  const elRef: Ref<HTMLSyAutocompleteElement> = createRef();
  const update = (text: string) => {
    const out = document.getElementById('autoFocusResult');
    if (out) out.textContent = text;
  };
  const bindSource = (el?: Element) => {
    if (el) (el as any).source = DEFAULT_SOURCE;
  };
  const setRefs = (el?: Element) => {
    bindSource(el);
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
        placeholder="Select a fruit..."
      ></sy-autocomplete>
      <sy-button type="submit" variant="primary">Submit</sy-button>
    </form>
    <p>Result: <span id="autocompleteRequiredResult">(idle)</span></p>
  `;
};
