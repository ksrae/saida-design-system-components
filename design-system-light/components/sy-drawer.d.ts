import type { Components, JSX } from "../dist/types/components";

interface SyDrawer extends Components.SyDrawer, HTMLElement {}
export const SyDrawer: {
    prototype: SyDrawer;
    new (): SyDrawer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
