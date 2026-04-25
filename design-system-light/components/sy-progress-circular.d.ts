import type { Components, JSX } from "../dist/types/components";

interface SyProgressCircular extends Components.SyProgressCircular, HTMLElement {}
export const SyProgressCircular: {
    prototype: SyProgressCircular;
    new (): SyProgressCircular;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
