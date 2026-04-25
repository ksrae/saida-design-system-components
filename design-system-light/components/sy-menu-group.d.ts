import type { Components, JSX } from "../dist/types/components";

interface SyMenuGroup extends Components.SyMenuGroup, HTMLElement {}
export const SyMenuGroup: {
    prototype: SyMenuGroup;
    new (): SyMenuGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
