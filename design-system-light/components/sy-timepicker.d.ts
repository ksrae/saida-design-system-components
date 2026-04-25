import type { Components, JSX } from "../dist/types/components";

interface SyTimepicker extends Components.SyTimepicker, HTMLElement {}
export const SyTimepicker: {
    prototype: SyTimepicker;
    new (): SyTimepicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
