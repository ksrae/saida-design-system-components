import type { Components, JSX } from "../dist/types/components";

interface SyRadio extends Components.SyRadio, HTMLElement {}
export const SyRadio: {
    prototype: SyRadio;
    new (): SyRadio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
