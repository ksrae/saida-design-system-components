import type { Components, JSX } from "../dist/types/components";

interface SyGlobalHeader extends Components.SyGlobalHeader, HTMLElement {}
export const SyGlobalHeader: {
    prototype: SyGlobalHeader;
    new (): SyGlobalHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
