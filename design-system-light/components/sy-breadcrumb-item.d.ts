import type { Components, JSX } from "../dist/types/components";

interface SyBreadcrumbItem extends Components.SyBreadcrumbItem, HTMLElement {}
export const SyBreadcrumbItem: {
    prototype: SyBreadcrumbItem;
    new (): SyBreadcrumbItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
