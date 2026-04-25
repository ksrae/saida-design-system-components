import type { Components, JSX } from "../dist/types/components";

interface SyToast extends Components.SyToast, HTMLElement {}
export const SyToast: {
    prototype: SyToast;
    new (): SyToast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
