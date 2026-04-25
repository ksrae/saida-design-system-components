import type { Components, JSX } from "../dist/types/components";

interface SyPopconfirm extends Components.SyPopconfirm, HTMLElement {}
export const SyPopconfirm: {
    prototype: SyPopconfirm;
    new (): SyPopconfirm;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
