import type { Components, JSX } from "../dist/types/components";

interface SyPopover extends Components.SyPopover, HTMLElement {}
export const SyPopover: {
    prototype: SyPopover;
    new (): SyPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
