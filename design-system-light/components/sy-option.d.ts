import type { Components, JSX } from "../dist/types/components";

interface SyOption extends Components.SyOption, HTMLElement {}
export const SyOption: {
    prototype: SyOption;
    new (): SyOption;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
