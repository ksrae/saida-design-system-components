import type { Components, JSX } from "../dist/types/components";

interface SyNavGroup extends Components.SyNavGroup, HTMLElement {}
export const SyNavGroup: {
    prototype: SyNavGroup;
    new (): SyNavGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
