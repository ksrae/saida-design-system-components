import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
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

// `value` is only consumed by the 'selected' event, not by visual rendering.
// To make the value control observable we attach a click listener and surface
// the emitted value in a small result line so the user can verify the prop
// is actually being applied.
export const NavItemValue = (a: { value: string }) => {
  const handler = (e: Event) => {
    const out = document.getElementById('navItemValueResult');
    if (out) out.textContent = `selected.detail: ${(e as CustomEvent).detail}`;
  };
  return html`
    <p>
      <code>value</code> is the payload of the <code>selected</code> event &mdash;
      it does not change the visible label.
      Edit <code>value</code> in the Controls panel, then click the item below;
      the emitted detail will appear in the result line.
    </p>
    <sy-nav><sy-nav-item .value=${a.value} @selected=${handler}>Click me</sy-nav-item></sy-nav>
    <p id="navItemValueResult">selected.detail: (click the item)</p>
  `;
};

export const NavItemDisabled = (a: { disabled: boolean }) => html`
  <p>
    Toggle <code>disabled</code> in the Controls panel.
    The item should turn grey and stop reacting to hover/click when disabled is true.
  </p>
  <sy-nav><sy-nav-item value="x" ?disabled=${!!a.disabled}>Item</sy-nav-item></sy-nav>
`;

export const NavSubTitle       = (a: { title: string })      => html`
  <sy-nav>
    <sy-nav-sub title=${ifDefined(a.title)}>
      <sy-nav-item value="a">Item A</sy-nav-item>
      <sy-nav-item value="b">Item B</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
`;

// Same idea as NavItemValue: value is only emitted, never rendered, so we
// surface the event payload to make the control observable.
export const NavSubValue = (a: { value: string }) => {
  const handler = (e: Event) => {
    const out = document.getElementById('navSubValueResult');
    if (out) out.textContent = `selected.detail: ${(e as CustomEvent).detail}`;
  };
  return html`
    <p>
      <code>value</code> is the payload of the <code>selected</code> event the submenu
      fires on open/close &mdash; it does not change the visible header.
      Edit <code>value</code> in the Controls panel and click the submenu header to
      toggle it; the emitted detail will appear below.
    </p>
    <sy-nav>
      <sy-nav-sub title="Sub" .value=${a.value} @selected=${handler}>
        <sy-nav-item value="a">Item A</sy-nav-item>
        <sy-nav-item value="b">Item B</sy-nav-item>
      </sy-nav-sub>
    </sy-nav>
    <p id="navSubValueResult">selected.detail: (click the submenu header)</p>
  `;
};

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

// =============================================================================
// Method demos — items
// =============================================================================

// parentDisabled isn't really called from user code — sy-nav-sub fires it on
// each child whenever its own `disabled` prop changes, so the parent state
// cascades down. The test reflects that real flow: render a parent sub with
// child items inside, then toggle the parent's `disabled` and observe the
// child items go grey alongside it. Calling parentDisabled directly out of
// context would have looked identical to a no-op.
export const NavItemParentDisabled = () => {
  const parentRef: Ref<HTMLSyNavSubElement> = createRef();
  const setParentDisabled = (value: boolean) => {
    if (parentRef.value) parentRef.value.disabled = value;
  };
  return html`
    <h4>How to test</h4>
    <p>
      <code>parentDisabled(value)</code> is how a parent <code>sy-nav-sub</code> propagates
      its disabled state down to its <code>sy-nav-item</code> children. You don't normally
      call it yourself &mdash; the parent calls it on each child whenever its own
      <code>disabled</code> prop changes.
    </p>
    <ol>
      <li>Click <strong>Disable parent</strong> &mdash; the parent submenu header AND every child item below it turn grey/disabled.</li>
      <li>Click <strong>Enable parent</strong> &mdash; everything becomes interactive again.</li>
    </ol>
    <p>
      <em>Note:</em> the propagation only happens for children that were <em>not</em>
      initialized as disabled themselves &mdash; an explicitly-disabled child is left
      alone so an enabled parent can't "un-disable" it.
    </p>
    <sy-nav>
      <sy-nav-sub ${ref(parentRef)} title="Parent submenu" open>
        <sy-nav-item value="a">Child item A</sy-nav-item>
        <sy-nav-item value="b">Child item B</sy-nav-item>
        <sy-nav-item value="c">Child item C</sy-nav-item>
      </sy-nav-sub>
    </sy-nav>
    <sy-button @click=${() => setParentDisabled(true)}>Disable parent</sy-button>
    <sy-button @click=${() => setParentDisabled(false)}>Enable parent</sy-button>
  `;
};

export const NavItemSetActive = () => {
  const itemRef: Ref<HTMLSyNavItemElement> = createRef();
  return html`
    <h4>How to test</h4>
    <p>
      <code>setActive(value)</code> programmatically toggles the <code>active</code>
      class on the item, the same visual you get when the user clicks it.
    </p>
    <ol>
      <li>Click <strong>setActive(true)</strong> &mdash; the item gains the active highlight.</li>
      <li>Click <strong>setActive(false)</strong> &mdash; the highlight is removed.</li>
    </ol>
    <sy-nav><sy-nav-item ${ref(itemRef)} value="x">Item</sy-nav-item></sy-nav>
    <sy-button @click=${async () => { if (itemRef.value) await itemRef.value.setActive(true); }}>setActive(true)</sy-button>
    <sy-button @click=${async () => { if (itemRef.value) await itemRef.value.setActive(false); }}>setActive(false)</sy-button>
  `;
};

// =============================================================================
// Method demos — sub
// =============================================================================

// Mirrors the item parentDisabled story but with a deeper tree so the cascade
// through a nested sub is visible: outer sub → inner sub → grandchild items.
// Toggling the outermost sub's `disabled` should grey out everything below it.
export const NavSubParentDisabled = () => {
  const parentRef: Ref<HTMLSyNavSubElement> = createRef();
  const setParentDisabled = (value: boolean) => {
    if (parentRef.value) parentRef.value.disabled = value;
  };
  return html`
    <h4>How to test</h4>
    <p>
      <code>parentDisabled(value)</code> is how a nested <code>sy-nav-sub</code> propagates
      its disabled state through descendants. When the outer submenu is disabled it
      calls <code>parentDisabled(true)</code> on each direct child &mdash; the inner
      submenu in turn cascades the call down to its own item children.
    </p>
    <ol>
      <li>
        Click <strong>Disable outer parent</strong> &mdash; the outer submenu, the
        nested inner submenu, and every grandchild item all turn grey/disabled.
      </li>
      <li>Click <strong>Enable outer parent</strong> &mdash; the entire tree becomes interactive again.</li>
    </ol>
    <p>
      <em>Note:</em> as with items, the propagation only affects descendants that
      were <em>not</em> initialized as disabled themselves.
    </p>
    <sy-nav>
      <sy-nav-sub ${ref(parentRef)} title="Outer submenu" open>
        <sy-nav-sub title="Inner submenu" open>
          <sy-nav-item value="a">Grandchild item A</sy-nav-item>
          <sy-nav-item value="b">Grandchild item B</sy-nav-item>
        </sy-nav-sub>
        <sy-nav-item value="x">Direct child item</sy-nav-item>
      </sy-nav-sub>
    </sy-nav>
    <sy-button @click=${() => setParentDisabled(true)}>Disable outer parent</sy-button>
    <sy-button @click=${() => setParentDisabled(false)}>Enable outer parent</sy-button>
  `;
};

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

export const NavSubSetTrigger = () => html`
  <h4>How to test</h4>
  <p>
    <code>setTrigger()</code> toggles the open/close state. Each click flips the
    submenu between expanded and collapsed, just like clicking the header.
  </p>
  ${renderSubMethod('setTrigger()', (el) => el.setTrigger())}
`;

export const NavSubSetOpen = () => html`
  <h4>How to test</h4>
  <p>
    <code>setOpen()</code> opens the submenu programmatically. Calling it on an
    already-open submenu is a no-op.
  </p>
  ${renderSubMethod('setOpen()', (el) => el.setOpen())}
`;

export const NavSubSetClose = () => {
  const subRef: Ref<HTMLSyNavSubElement> = createRef();
  return html`
    <h4>How to test</h4>
    <ol>
      <li>Click <strong>setOpen()</strong> first to expand the submenu.</li>
      <li>Click <strong>setClose()</strong> &mdash; the submenu collapses.</li>
    </ol>
    <p>
      <em>Note:</em> calling <code>setClose()</code> on an already-collapsed submenu
      does nothing visible; you must open it first to observe the close behaviour.
    </p>
    <sy-nav>
      <sy-nav-sub ${ref(subRef)} title="Submenu">
        <sy-nav-item value="a">A</sy-nav-item>
        <sy-nav-item value="b">B</sy-nav-item>
      </sy-nav-sub>
    </sy-nav>
    <sy-button @click=${async () => { if (subRef.value) await subRef.value.setOpen(); }}>setOpen()</sy-button>
    <sy-button @click=${async () => { if (subRef.value) await subRef.value.setClose(); }}>setClose()</sy-button>
  `;
};
