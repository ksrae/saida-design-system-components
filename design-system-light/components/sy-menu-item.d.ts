import type { Components, JSX } from "../dist/types/components";

interface SyMenuItem extends Components.SyMenuItem, HTMLElement {}
export const SyMenuItem: {
    prototype: SyMenuItem;
    new (): SyMenuItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
