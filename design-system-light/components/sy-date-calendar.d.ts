import type { Components, JSX } from "../dist/types/components";

interface SyDateCalendar extends Components.SyDateCalendar, HTMLElement {}
export const SyDateCalendar: {
    prototype: SyDateCalendar;
    new (): SyDateCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
