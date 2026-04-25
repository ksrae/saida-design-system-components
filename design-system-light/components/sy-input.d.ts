import type { Components, JSX } from "../dist/types/components";

interface SyInput extends Components.SyInput, HTMLElement {}
export const SyInput: {
    prototype: SyInput;
    new (): SyInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
