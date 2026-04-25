import type { Components, JSX } from "../dist/types/components";

interface SyTreeSelect extends Components.SyTreeSelect, HTMLElement {}
export const SyTreeSelect: {
    prototype: SyTreeSelect;
    new (): SyTreeSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
