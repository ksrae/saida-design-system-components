import type { Components, JSX } from "../dist/types/components";

interface SyAutocompleteOption extends Components.SyAutocompleteOption, HTMLElement {}
export const SyAutocompleteOption: {
    prototype: SyAutocompleteOption;
    new (): SyAutocompleteOption;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
