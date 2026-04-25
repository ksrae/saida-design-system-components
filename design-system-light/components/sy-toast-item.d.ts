import type { Components, JSX } from "../dist/types/components";

interface SyToastItem extends Components.SyToastItem, HTMLElement {}
export const SyToastItem: {
    prototype: SyToastItem;
    new (): SyToastItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
