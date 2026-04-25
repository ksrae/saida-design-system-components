import type { Components, JSX } from "../dist/types/components";

interface SyDivider extends Components.SyDivider, HTMLElement {}
export const SyDivider: {
    prototype: SyDivider;
    new (): SyDivider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
