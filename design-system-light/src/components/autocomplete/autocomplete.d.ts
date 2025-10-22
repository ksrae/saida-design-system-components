import { AutocompleteOptionElement } from "./autocomplete-option.element";
import { AutocompleteElement } from "./autocomplete.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-autocomplete': AutocompleteElement;
    'sy-autocomplete-option': AutocompleteOptionElement;
  }
}