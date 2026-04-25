import type { Components, JSX } from "../dist/types/components";

interface SySkeleton extends Components.SySkeleton, HTMLElement {}
export const SySkeleton: {
    prototype: SySkeleton;
    new (): SySkeleton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
