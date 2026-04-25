import type { Components, JSX } from "../dist/types/components";

interface SyAvatarGroup extends Components.SyAvatarGroup, HTMLElement {}
export const SyAvatarGroup: {
    prototype: SyAvatarGroup;
    new (): SyAvatarGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
