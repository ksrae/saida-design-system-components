import type { Components, JSX } from "../dist/types/components";

interface SyNavItem extends Components.SyNavItem, HTMLElement {}
export const SyNavItem: {
    prototype: SyNavItem;
    new (): SyNavItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
