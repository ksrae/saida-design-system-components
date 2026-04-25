import type { Components, JSX } from "../dist/types/components";

interface SyCalendar extends Components.SyCalendar, HTMLElement {}
export const SyCalendar: {
    prototype: SyCalendar;
    new (): SyCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
