import type { Components, JSX } from "../dist/types/components";

interface SyCheckbox extends Components.SyCheckbox, HTMLElement {}
export const SyCheckbox: {
    prototype: SyCheckbox;
    new (): SyCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
