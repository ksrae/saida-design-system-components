import type { Components, JSX } from "../dist/types/components";

interface SyRadioButton extends Components.SyRadioButton, HTMLElement {}
export const SyRadioButton: {
    prototype: SyRadioButton;
    new (): SyRadioButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
