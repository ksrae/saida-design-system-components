import { html, ifDefined, unsafeHTML, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyDrawerProps extends Components.SyDrawer {
  slotHeader?: string;
  slotBody?: string;
  slotFooter?: string;
  opened?: (event: CustomEvent<any>) => void;
  closed?: (event: CustomEvent<any>) => void;
}

const slotOrEmpty = (s?: string) => (s ? unsafeHTML(s) : '');

const renderDrawerWithTrigger = (args: Partial<SyDrawerProps>, body = html`<span slot="body">Body</span>`) => {
  const drawerRef: Ref<HTMLSyDrawerElement> = createRef();
  return html`
    <sy-drawer
      ${ref(drawerRef)}
      ?closable=${!!args.closable}
      ?maskless=${!!args.maskless}
      ?preventClose=${!!args.preventClose}
      ?open=${!!args.open}
      customSize=${ifDefined(args.customSize as any)}
      position=${ifDefined(args.position)}
      size=${ifDefined(args.size)}
    >
      <span slot="header">Header</span>
      ${body}
      <span slot="footer">Footer</span>
    </sy-drawer>
    <sy-button @click=${() => { if (drawerRef.value) drawerRef.value.open = true; }}>Click to Open</sy-button>
  `;
};

export const Drawer = (args: SyDrawerProps) => {
  const drawerRef: Ref<HTMLSyDrawerElement> = createRef();
  return html`
    <sy-drawer
      ${ref(drawerRef)}
      ?closable=${!!args.closable}
      ?maskless=${!!args.maskless}
      ?preventClose=${!!args.preventClose}
      ?open=${!!args.open}
      customSize=${ifDefined(args.customSize as any)}
      position=${ifDefined(args.position)}
      size=${ifDefined(args.size)}
    >
      ${slotOrEmpty(args.slotHeader)}
      ${slotOrEmpty(args.slotBody)}
      ${slotOrEmpty(args.slotFooter)}
    </sy-drawer>
    <sy-button @click=${() => { if (drawerRef.value) drawerRef.value.open = true; }}>Click to Open</sy-button>
  `;
};

export const DrawerClosable     = (args: { closable: boolean })                  => renderDrawerWithTrigger(args);
export const DrawerCustomSize   = (args: { customSize: number })                 => renderDrawerWithTrigger({ ...args, size: 'custom', closable: true });
export const DrawerMaskless     = (args: { maskless: boolean })                  => renderDrawerWithTrigger({ ...args, closable: true });
export const DrawerPreventClose = (args: { preventClose: boolean }) => {
  // With `preventClose`, clicking the mask no longer closes the drawer.
  // Give the user an explicit close button on the drawer itself so the only
  // way to dismiss it is to invoke close() programmatically.
  const drawerRef: Ref<HTMLSyDrawerElement> = createRef();
  return html`
    <sy-drawer
      ${ref(drawerRef)}
      ?preventClose=${!!args.preventClose}
    >
      <span slot="header">Header</span>
      <span slot="body">
        <p>With <code>preventClose=true</code>, clicking the backdrop won't close the drawer.</p>
        <sy-button
          variant="primary"
          @click=${() => { if (drawerRef.value) drawerRef.value.open = false; }}
        >Close drawer</sy-button>
      </span>
      <span slot="footer">Footer</span>
    </sy-drawer>
    <sy-button @click=${() => { if (drawerRef.value) drawerRef.value.open = true; }}>Click to Open</sy-button>
  `;
};
export const DrawerPosition     = (args: { position: 'top'|'left'|'right'|'bottom' }) => renderDrawerWithTrigger({ ...args, closable: true });
export const DrawerSize         = (args: { size: 'small'|'medium'|'large'|'custom'; customSize: number }) =>
  renderDrawerWithTrigger({ ...args, closable: true });

export const DrawerOpen = (args: { open: boolean }) => html`
  <sy-drawer ?open=${!!args.open} closable>
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>
`;

/* Scoped drawer — mounts into the element whose id matches `parentid` instead of
 * document.body. Position is absolute within that parent, not fixed to the viewport. */
export const DrawerParentId = () => {
  const drawerRef: Ref<HTMLSyDrawerElement> = createRef();
  return html`
    <div
      id="drawer-scope-box"
      style="position: relative; width: 600px; height: 400px; border: 2px dashed #888; padding: 16px; background: #fafafa; overflow: hidden;"
    >
      <p style="margin:0 0 12px;">
        This box has id=<b>drawer-scope-box</b>. The drawer below uses
        <code>parentid="drawer-scope-box"</code> and opens scoped inside it,
        not over the whole viewport.
      </p>
      <sy-button
        @click=${() => { if (drawerRef.value) drawerRef.value.open = true; }}
      >Click to Open (scoped)</sy-button>
    </div>
    <sy-drawer
      ${ref(drawerRef)}
      parentid="drawer-scope-box"
      position="right"
      size="medium"
      closable
    >
      <span slot="header">Scoped Drawer</span>
      <span slot="body">
        This drawer is constrained to <code>#drawer-scope-box</code>.
        <br/>It uses <code>position: absolute</code> against that box, so the
        backdrop and panel never cover content outside of it.
      </span>
      <span slot="footer">Footer</span>
    </sy-drawer>
  `;
};

export const DrawerOpened = () => {
  const drawerRef: Ref<HTMLSyDrawerElement> = createRef();
  const handleOpened = () => {
    const out = document.getElementById('drawerOpenedResult');
    if (out) out.innerText = 'Drawer opened';
  };
  return html`
    <sy-drawer ${ref(drawerRef)} @opened=${handleOpened}>
      <span slot="header">Header</span>
      <span slot="body">Body</span>
      <span slot="footer">Footer</span>
    </sy-drawer>
    <sy-button @click=${() => { if (drawerRef.value) drawerRef.value.open = true; }}>Click to Open</sy-button>
    <p id="drawerOpenedResult">(idle)</p>
  `;
};

export const DrawerClosed = () => {
  const drawerRef: Ref<HTMLSyDrawerElement> = createRef();
  const setResult = (text: string) => {
    const out = document.getElementById('drawerClosedResult');
    if (out) out.innerText = text;
  };
  return html`
    <sy-drawer
      ${ref(drawerRef)}
      @opened=${() => setResult('Drawer opened')}
      @closed=${() => setResult('Drawer closed')}
    >
      <span slot="header">Header</span>
      <span slot="body">
        Body
        <sy-button @click=${() => { if (drawerRef.value) drawerRef.value.open = false; }}>Close this drawer</sy-button>
      </span>
      <span slot="footer">Footer</span>
    </sy-drawer>
    <sy-button @click=${() => { if (drawerRef.value) drawerRef.value.open = true; }}>Click to Open</sy-button>
    <p id="drawerClosedResult">(idle)</p>
  `;
};
