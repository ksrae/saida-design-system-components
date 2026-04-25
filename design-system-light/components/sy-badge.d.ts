import type { Components, JSX } from "../dist/types/components";

interface SyBadge extends Components.SyBadge, HTMLElement {}
export const SyBadge: {
    prototype: SyBadge;
    new (): SyBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
