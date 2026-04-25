import type { Components, JSX } from "../dist/types/components";

interface SyIcon extends Components.SyIcon, HTMLElement {}
export const SyIcon: {
    prototype: SyIcon;
    new (): SyIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
