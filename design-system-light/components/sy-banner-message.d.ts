import type { Components, JSX } from "../dist/types/components";

interface SyBannerMessage extends Components.SyBannerMessage, HTMLElement {}
export const SyBannerMessage: {
    prototype: SyBannerMessage;
    new (): SyBannerMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
