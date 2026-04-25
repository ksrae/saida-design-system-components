import type { Components, JSX } from "../dist/types/components";

interface SyModelessGroup extends Components.SyModelessGroup, HTMLElement {}
export const SyModelessGroup: {
    prototype: SyModelessGroup;
    new (): SyModelessGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
