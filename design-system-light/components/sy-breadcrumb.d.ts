import type { Components, JSX } from "../dist/types/components";

interface SyBreadcrumb extends Components.SyBreadcrumb, HTMLElement {}
export const SyBreadcrumb: {
    prototype: SyBreadcrumb;
    new (): SyBreadcrumb;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
