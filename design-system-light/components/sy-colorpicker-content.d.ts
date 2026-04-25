import type { Components, JSX } from "../dist/types/components";

interface SyColorpickerContent extends Components.SyColorpickerContent, HTMLElement {}
export const SyColorpickerContent: {
    prototype: SyColorpickerContent;
    new (): SyColorpickerContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
