import type { Components, JSX } from "../dist/types/components";

interface SyLabel extends Components.SyLabel, HTMLElement {}
export const SyLabel: {
    prototype: SyLabel;
    new (): SyLabel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
