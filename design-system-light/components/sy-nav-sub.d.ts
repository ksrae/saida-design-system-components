import type { Components, JSX } from "../dist/types/components";

interface SyNavSub extends Components.SyNavSub, HTMLElement {}
export const SyNavSub: {
    prototype: SyNavSub;
    new (): SyNavSub;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
