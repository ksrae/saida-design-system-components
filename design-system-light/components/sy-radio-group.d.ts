import type { Components, JSX } from "../dist/types/components";

interface SyRadioGroup extends Components.SyRadioGroup, HTMLElement {}
export const SyRadioGroup: {
    prototype: SyRadioGroup;
    new (): SyRadioGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
