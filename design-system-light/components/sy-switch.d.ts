import type { Components, JSX } from "../dist/types/components";

interface SySwitch extends Components.SySwitch, HTMLElement {}
export const SySwitch: {
    prototype: SySwitch;
    new (): SySwitch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
