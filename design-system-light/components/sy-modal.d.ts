import type { Components, JSX } from "../dist/types/components";

interface SyModal extends Components.SyModal, HTMLElement {}
export const SyModal: {
    prototype: SyModal;
    new (): SyModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
