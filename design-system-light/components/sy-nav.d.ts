import type { Components, JSX } from "../dist/types/components";

interface SyNav extends Components.SyNav, HTMLElement {}
export const SyNav: {
    prototype: SyNav;
    new (): SyNav;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
