import type { Components, JSX } from "../dist/types/components";

interface SyAvatar extends Components.SyAvatar, HTMLElement {}
export const SyAvatar: {
    prototype: SyAvatar;
    new (): SyAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
