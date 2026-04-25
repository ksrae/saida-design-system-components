import type { Components, JSX } from "../dist/types/components";

interface SyDatepicker extends Components.SyDatepicker, HTMLElement {}
export const SyDatepicker: {
    prototype: SyDatepicker;
    new (): SyDatepicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
