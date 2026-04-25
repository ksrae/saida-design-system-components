import type { Components, JSX } from "../dist/types/components";

interface SyStep extends Components.SyStep, HTMLElement {}
export const SyStep: {
    prototype: SyStep;
    new (): SyStep;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
