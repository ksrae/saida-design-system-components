import type { Components, JSX } from "../dist/types/components";

interface SyPagination extends Components.SyPagination, HTMLElement {}
export const SyPagination: {
    prototype: SyPagination;
    new (): SyPagination;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
