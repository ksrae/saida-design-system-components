import type { Components, JSX } from "../dist/types/components";

interface SyInlineMessage extends Components.SyInlineMessage, HTMLElement {}
export const SyInlineMessage: {
    prototype: SyInlineMessage;
    new (): SyInlineMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
