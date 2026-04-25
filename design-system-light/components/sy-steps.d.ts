import type { Components, JSX } from "../dist/types/components";

interface SySteps extends Components.SySteps, HTMLElement {}
export const SySteps: {
    prototype: SySteps;
    new (): SySteps;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
