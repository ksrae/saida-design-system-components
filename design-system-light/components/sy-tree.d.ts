import type { Components, JSX } from "../dist/types/components";

interface SyTree extends Components.SyTree, HTMLElement {}
export const SyTree: {
    prototype: SyTree;
    new (): SyTree;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
