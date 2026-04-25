import type { Components, JSX } from "../dist/types/components";

interface SyTooltip extends Components.SyTooltip, HTMLElement {}
export const SyTooltip: {
    prototype: SyTooltip;
    new (): SyTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
