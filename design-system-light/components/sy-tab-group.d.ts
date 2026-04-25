import type { Components, JSX } from "../dist/types/components";

interface SyTabGroup extends Components.SyTabGroup, HTMLElement {}
export const SyTabGroup: {
    prototype: SyTabGroup;
    new (): SyTabGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
