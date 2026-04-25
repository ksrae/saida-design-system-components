import type { Components, JSX } from "../dist/types/components";

interface SyMenu extends Components.SyMenu, HTMLElement {}
export const SyMenu: {
    prototype: SyMenu;
    new (): SyMenu;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
