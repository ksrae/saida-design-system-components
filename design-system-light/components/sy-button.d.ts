import type { Components, JSX } from "../dist/types/components";

interface SyButton extends Components.SyButton, HTMLElement {}
export const SyButton: {
    prototype: SyButton;
    new (): SyButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
