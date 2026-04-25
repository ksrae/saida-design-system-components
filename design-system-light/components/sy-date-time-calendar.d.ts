import type { Components, JSX } from "../dist/types/components";

interface SyDateTimeCalendar extends Components.SyDateTimeCalendar, HTMLElement {}
export const SyDateTimeCalendar: {
    prototype: SyDateTimeCalendar;
    new (): SyDateTimeCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
