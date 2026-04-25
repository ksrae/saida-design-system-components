import type { Components, JSX } from "../dist/types/components";

interface SySlider extends Components.SySlider, HTMLElement {}
export const SySlider: {
    prototype: SySlider;
    new (): SySlider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
