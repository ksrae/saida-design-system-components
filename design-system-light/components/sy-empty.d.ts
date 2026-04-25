import type { Components, JSX } from "../dist/types/components";

interface SyEmpty extends Components.SyEmpty, HTMLElement {}
export const SyEmpty: {
    prototype: SyEmpty;
    new (): SyEmpty;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
