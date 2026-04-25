import type { Components, JSX } from "../dist/types/components";

interface SySelect extends Components.SySelect, HTMLElement {}
export const SySelect: {
    prototype: SySelect;
    new (): SySelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
