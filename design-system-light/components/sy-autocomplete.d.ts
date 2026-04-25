import type { Components, JSX } from "../dist/types/components";

interface SyAutocomplete extends Components.SyAutocomplete, HTMLElement {}
export const SyAutocomplete: {
    prototype: SyAutocomplete;
    new (): SyAutocomplete;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
