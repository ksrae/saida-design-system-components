import type { Components, JSX } from "../dist/types/components";

interface SySpinner extends Components.SySpinner, HTMLElement {}
export const SySpinner: {
    prototype: SySpinner;
    new (): SySpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
