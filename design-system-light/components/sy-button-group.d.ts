import type { Components, JSX } from "../dist/types/components";

interface SyButtonGroup extends Components.SyButtonGroup, HTMLElement {}
export const SyButtonGroup: {
    prototype: SyButtonGroup;
    new (): SyButtonGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
