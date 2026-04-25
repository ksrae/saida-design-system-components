import type { Components, JSX } from "../dist/types/components";

interface SyRangeCalendar extends Components.SyRangeCalendar, HTMLElement {}
export const SyRangeCalendar: {
    prototype: SyRangeCalendar;
    new (): SyRangeCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
