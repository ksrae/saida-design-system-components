import type { Components, JSX } from "../dist/types/components";

interface SyCollapsePanel extends Components.SyCollapsePanel, HTMLElement {}
export const SyCollapsePanel: {
    prototype: SyCollapsePanel;
    new (): SyCollapsePanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
