import type { Components, JSX } from "../dist/types/components";

interface SyDropdown extends Components.SyDropdown, HTMLElement {}
export const SyDropdown: {
    prototype: SyDropdown;
    new (): SyDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
