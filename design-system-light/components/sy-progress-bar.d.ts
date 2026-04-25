import type { Components, JSX } from "../dist/types/components";

interface SyProgressBar extends Components.SyProgressBar, HTMLElement {}
export const SyProgressBar: {
    prototype: SyProgressBar;
    new (): SyProgressBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
