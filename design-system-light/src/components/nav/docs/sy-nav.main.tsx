import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyNavProps extends Components.SyNav { slot?: any; }
export interface SyNavGroupProps extends Components.SyNavGroup { slot?: any; }
export interface SyNavItemProps extends Components.SyNavItem { slot?: any; }
export interface SyNavSubProps extends Components.SyNavSub {
  slot?: any;
  title?: string;
}

const sampleTree = html`
  <sy-nav-item value="home">Home</sy-nav-item>
  <sy-nav-sub title="Products" value="products">
    <sy-nav-item value="p1">Item 1</sy-nav-item>
    <sy-nav-item value="p2">Item 2</sy-nav-item>
  </sy-nav-sub>
  <sy-nav-group title="Settings">
    <sy-nav-item value="s1">General</sy-nav-item>
    <sy-nav-item value="s2">Advanced</sy-nav-item>
  </sy-nav-group>
`;

export const Nav = (a: SyNavProps) => html`<sy-nav ?disabled=${!!a.disabled}>${sampleTree}</sy-nav>`;

// NOTE: `depth` on sy-nav-item / sy-nav-group / sy-nav-sub is computed
// internally (see each component's componentWillLoad) from the parent
// element chain. Do not pass it explicitly from stories — it must reflect
// actual DOM nesting.

export const NavGroup = (a: SyNavGroupProps) => html`
  <sy-nav>
    <sy-nav-group title=${ifDefined((a as any).title ?? 'Group')}>
      <sy-nav-item value="a">Item A</sy-nav-item>
      <sy-nav-item value="b">Item B</sy-nav-item>
      <sy-nav-item value="c">Item C</sy-nav-item>
    </sy-nav-group>
  </sy-nav>
`;

export const NavItem = (a: SyNavItemProps) => html`
  <sy-nav>
    <sy-nav-item .value=${a.value} ?disabled=${!!a.disabled}>Label</sy-nav-item>
  </sy-nav>
`;

export const NavSub = (a: SyNavSubProps) => html`
  <sy-nav>
    <sy-nav-sub title=${ifDefined((a as any).title ?? 'Submenu')} .value=${a.value} ?open=${!!a.open} ?disabled=${!!a.disabled}>
      <sy-nav-item value="a">Item A</sy-nav-item>
      <sy-nav-item value="b">Item B</sy-nav-item>
      <sy-nav-item value="c">Item C</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
`;

export const NavDisabled       = (a: { disabled: boolean })  => html`<sy-nav ?disabled=${!!a.disabled}>${sampleTree}</sy-nav>`;
export const NavGroupTitle     = (a: { title: string })      => html`
  <sy-nav>
    <sy-nav-group title=${ifDefined(a.title)}>
      <sy-nav-item value="a">Item A</sy-nav-item>
      <sy-nav-item value="b">Item B</sy-nav-item>
    </sy-nav-group>
  </sy-nav>
`;
export const NavItemValue      = (a: { value: string })      => html`<sy-nav><sy-nav-item .value=${a.value}>Labeled Item</sy-nav-item></sy-nav>`;
export const NavItemDisabled   = (a: { disabled: boolean })  => html`<sy-nav><sy-nav-item value="x" ?disabled=${!!a.disabled}>Item</sy-nav-item></sy-nav>`;
export const NavSubTitle       = (a: { title: string })      => html`
  <sy-nav>
    <sy-nav-sub title=${ifDefined(a.title)}>
      <sy-nav-item value="a">Item A</sy-nav-item>
      <sy-nav-item value="b">Item B</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
`;
export const NavSubValue       = (a: { value: string })      => html`
  <sy-nav>
    <sy-nav-sub title="Sub" .value=${a.value}>
      <sy-nav-item value="a">Item A</sy-nav-item>
      <sy-nav-item value="b">Item B</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
`;
export const NavSubOpen        = (a: { open: boolean })      => html`
  <sy-nav>
    <sy-nav-sub title="Sub" ?open=${!!a.open}>
      <sy-nav-item value="a">Item A</sy-nav-item>
      <sy-nav-item value="b">Item B</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
`;
export const NavSubDisabled    = (a: { disabled: boolean })  => html`
  <sy-nav>
    <sy-nav-sub title="Sub" ?disabled=${!!a.disabled}>
      <sy-nav-item value="a">Item A</sy-nav-item>
      <sy-nav-item value="b">Item B</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
`;

const renderItemMethod = (label: string, action: (el: HTMLSyNavItemElement) => Promise<void> | void) => {
  const itemRef: Ref<HTMLSyNavItemElement> = createRef();
  return html`
    <sy-nav><sy-nav-item ${ref(itemRef)} value="x">Item</sy-nav-item></sy-nav>
    <sy-button @click=${async () => { if (itemRef.value) await action(itemRef.value); }}>${label}</sy-button>
  `;
};

export const NavItemParentDisabled = () => renderItemMethod('parentDisabled(true)', (el) => el.parentDisabled(true));
export const NavItemGroupItem      = () => renderItemMethod('groupItem(true)',      (el) => el.groupItem(true));
export const NavItemSetActive      = () => renderItemMethod('setActive(true)',      (el) => el.setActive(true));

const renderSubMethod = (label: string, action: (el: HTMLSyNavSubElement) => Promise<void> | void) => {
  const subRef: Ref<HTMLSyNavSubElement> = createRef();
  return html`
    <sy-nav>
      <sy-nav-sub ${ref(subRef)} title="Submenu">
        <sy-nav-item value="a">A</sy-nav-item>
        <sy-nav-item value="b">B</sy-nav-item>
      </sy-nav-sub>
    </sy-nav>
    <sy-button @click=${async () => { if (subRef.value) await action(subRef.value); }}>${label}</sy-button>
  `;
};

export const NavSubParentDisabled = () => renderSubMethod('parentDisabled(true)', (el) => el.parentDisabled(true));
export const NavSubGroupItem      = () => renderSubMethod('groupItem(true)',      (el) => el.groupItem(true));
export const NavSubSetTrigger     = () => renderSubMethod('setTrigger()',         (el) => el.setTrigger());
export const NavSubSetOpen        = () => renderSubMethod('setOpen()',            (el) => el.setOpen());
export const NavSubSetClose       = () => renderSubMethod('setClose()',           async (el) => { await el.setOpen(); await el.setClose(); });
export const NavSubSetActive      = () => renderSubMethod('setActive(true)',      (el) => el.setActive(true));
