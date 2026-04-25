import type { Components, JSX } from "../dist/types/components";

interface SyTag extends Components.SyTag, HTMLElement {}
export const SyTag: {
    prototype: SyTag;
    new (): SyTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
