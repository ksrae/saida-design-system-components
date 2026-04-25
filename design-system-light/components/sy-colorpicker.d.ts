import type { Components, JSX } from "../dist/types/components";

interface SyColorpicker extends Components.SyColorpicker, HTMLElement {}
export const SyColorpicker: {
    prototype: SyColorpicker;
    new (): SyColorpicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
