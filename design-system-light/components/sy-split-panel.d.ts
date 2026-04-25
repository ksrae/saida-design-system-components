import type { Components, JSX } from "../dist/types/components";

interface SySplitPanel extends Components.SySplitPanel, HTMLElement {}
export const SySplitPanel: {
    prototype: SySplitPanel;
    new (): SySplitPanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
