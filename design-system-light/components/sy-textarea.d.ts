import type { Components, JSX } from "../dist/types/components";

interface SyTextarea extends Components.SyTextarea, HTMLElement {}
export const SyTextarea: {
    prototype: SyTextarea;
    new (): SyTextarea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
