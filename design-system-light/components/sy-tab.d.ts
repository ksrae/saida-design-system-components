import type { Components, JSX } from "../dist/types/components";

interface SyTab extends Components.SyTab, HTMLElement {}
export const SyTab: {
    prototype: SyTab;
    new (): SyTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
