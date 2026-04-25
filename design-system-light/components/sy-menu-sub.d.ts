import type { Components, JSX } from "../dist/types/components";

interface SyMenuSub extends Components.SyMenuSub, HTMLElement {}
export const SyMenuSub: {
    prototype: SyMenuSub;
    new (): SyMenuSub;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
