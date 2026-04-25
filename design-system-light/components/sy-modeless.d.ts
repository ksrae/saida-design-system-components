import type { Components, JSX } from "../dist/types/components";

interface SyModeless extends Components.SyModeless, HTMLElement {}
export const SyModeless: {
    prototype: SyModeless;
    new (): SyModeless;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
