import type { Components, JSX } from "../dist/types/components";

interface SyCard extends Components.SyCard, HTMLElement {}
export const SyCard: {
    prototype: SyCard;
    new (): SyCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
