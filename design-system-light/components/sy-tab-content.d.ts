import type { Components, JSX } from "../dist/types/components";

interface SyTabContent extends Components.SyTabContent, HTMLElement {}
export const SyTabContent: {
    prototype: SyTabContent;
    new (): SyTabContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
