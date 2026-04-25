import type { Components, JSX } from "../dist/types/components";

interface SyInputNumber extends Components.SyInputNumber, HTMLElement {}
export const SyInputNumber: {
    prototype: SyInputNumber;
    new (): SyInputNumber;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
