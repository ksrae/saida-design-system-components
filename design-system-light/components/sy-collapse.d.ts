import type { Components, JSX } from "../dist/types/components";

interface SyCollapse extends Components.SyCollapse, HTMLElement {}
export const SyCollapse: {
    prototype: SyCollapse;
    new (): SyCollapse;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
