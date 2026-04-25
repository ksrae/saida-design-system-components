import type { Components, JSX } from "../dist/types/components";

interface SyTreeItem extends Components.SyTreeItem, HTMLElement {}
export const SyTreeItem: {
    prototype: SyTreeItem;
    new (): SyTreeItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
