import type { Components, JSX } from "../dist/types/components";

interface SyFlex extends Components.SyFlex, HTMLElement {}
export const SyFlex: {
    prototype: SyFlex;
    new (): SyFlex;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
