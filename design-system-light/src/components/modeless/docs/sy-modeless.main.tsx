import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Components } from '../../../components';

export interface SyModelessProps extends Components.SyModeless {
  slot?: any;
  closed?: (e: CustomEvent<any>) => void;
  statusChanged?: (e: CustomEvent<any>) => void;
  positionChanged?: (e: CustomEvent<any>) => void;
}
export interface SyModelessGroupProps extends Components.SyModelessGroup {
  slot?: any;
}

const titleSlot = html`<span slot="title">Title</span>`;

export const Modeless = (a: SyModelessProps) => html`
  <sy-modeless
    ?open=${!!a.open}
    ?resizable=${!!a.resizable}
    ?closable=${!!a.closable}
    ?minimizable=${!!a.minimizable}
    ?maximizable=${!!a.maximizable}
    ?edge=${!!(a as any).edge}
    ?maximum=${!!(a as any).maximum}
    ?minimum=${!!(a as any).minimum}
    .isdraggable=${(a as any).isdraggable}
    .top=${a.top as any}
    .left=${a.left as any}
    .width=${a.width as any}
    .height=${a.height as any}
    .minWidth=${a.minWidth as any}
    .minHeight=${a.minHeight as any}
  >
    <span slot="title">Modeless</span>
    <div slot="content">Modeless body content</div>
  </sy-modeless>
`;

export const ModelessGroup = (_a: SyModelessGroupProps) => {
  const groupRef: Ref<HTMLSyModelessGroupElement> = createRef();
  return html`
    <sy-modeless-group ${ref(groupRef)}></sy-modeless-group>
    <sy-button
      @click=${async () => {
        await groupRef.value?.create('demo1', 'Demo Modeless', '<div>Content</div>', {
          closable: true,
          draggable: true,
          resizable: true,
          top: 40,
          left: 40,
          width: 240,
          height: 160,
        } as any);
      }}
    >Create</sy-button>
  `;
};

export const ModelessOpen = (a: { open: boolean }) => html`
  <div style="position:relative;height:220px">
    <sy-modeless ?open=${!!a.open}>${titleSlot}<div slot="content">Content</div></sy-modeless>
  </div>
`;

export const ModelessIsdraggable = (a: { isdraggable: boolean }) => html`<sy-modeless open .isdraggable=${a.isdraggable}>${titleSlot}<div slot="content">Drag me</div></sy-modeless>`;
export const ModelessResizable    = (a: { resizable: boolean })    => html`<sy-modeless open ?resizable=${!!a.resizable}>${titleSlot}<div slot="content">Resize me</div></sy-modeless>`;
export const ModelessClosable     = (a: { closable: boolean })     => html`<sy-modeless open ?closable=${!!a.closable}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessMinimizable  = (a: { minimizable: boolean })  => html`<sy-modeless open ?minimizable=${!!a.minimizable}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessMaximizable  = (a: { maximizable: boolean })  => html`<sy-modeless open ?maximizable=${!!a.maximizable}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessEdge         = (a: { edge: boolean })         => html`<sy-modeless open ?edge=${!!a.edge}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessMaximum      = (a: { maximum: boolean })      => html`<sy-modeless open ?maximum=${!!a.maximum}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessMinimum      = (a: { minimum: boolean })      => html`<sy-modeless open ?minimum=${!!a.minimum}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessTop          = (a: { top: number })           => html`<sy-modeless open .top=${a.top}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessLeft         = (a: { left: number })          => html`<sy-modeless open .left=${a.left}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessWidth        = (a: { width: number })         => html`<sy-modeless open .width=${a.width}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessHeight       = (a: { height: number })        => html`<sy-modeless open .height=${a.height}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessMinWidth     = (a: { minWidth: number })      => html`<sy-modeless open resizable .minWidth=${a.minWidth}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;
export const ModelessMinHeight    = (a: { minHeight: number })     => html`<sy-modeless open resizable .minHeight=${a.minHeight}>${titleSlot}<div slot="content">Content</div></sy-modeless>`;

const eventLogger = (resultId: string, name: string) => (e: Event) => {
  const out = document.getElementById(resultId);
  if (out) out.textContent = `${name}: ${JSON.stringify((e as CustomEvent).detail)}`;
};

const renderEventDemo = (resultId: string, name: string, handlerProp: string) => html`
  <sy-modeless open closable minimizable maximizable .${unsafeHTML('')}=${''} @${unsafeHTML(name)}=${eventLogger(resultId, name)}>
    ${titleSlot}
    <div slot="content">Trigger ${name}</div>
  </sy-modeless>
  <p id=${resultId}>(idle)</p>
`;

// inline event demos (avoid dynamic event-name templating to keep lit happy)
export const ModelessClosed = () => {
  const handle = eventLogger('mClResult', 'closed');
  return html`
    <sy-modeless open closable minimizable maximizable @closed=${handle}>
      ${titleSlot}<div slot="content">Trigger closed</div>
    </sy-modeless>
    <p id="mClResult">(idle)</p>
  `;
};

export const ModelessStatusChanged = () => {
  const handle = eventLogger('mSCResult', 'statusChanged');
  return html`
    <sy-modeless open closable minimizable maximizable @statusChanged=${handle}>
      ${titleSlot}<div slot="content">Trigger statusChanged</div>
    </sy-modeless>
    <p id="mSCResult">(idle)</p>
  `;
};

export const ModelessPositionChanged = () => {
  const handle = eventLogger('mPCResult', 'positionChanged');
  return html`
    <sy-modeless open closable minimizable maximizable @positionChanged=${handle}>
      ${titleSlot}<div slot="content">Trigger positionChanged</div>
    </sy-modeless>
    <p id="mPCResult">(idle)</p>
  `;
};

const renderModelessMethod = (label: string, action: (el: HTMLSyModelessElement) => Promise<void> | void) => {
  const mRef: Ref<HTMLSyModelessElement> = createRef();
  return html`
    <sy-modeless ${ref(mRef)} closable minimizable maximizable>
      ${titleSlot}
      <div slot="content">Content</div>
    </sy-modeless>
    <sy-button
      @click=${async () => {
        if (mRef.value) await action(mRef.value);
      }}
    >${label}</sy-button>
  `;
};

export const ModelessSetOpen     = () => renderModelessMethod('setOpen()',    (el) => el.setOpen());
export const ModelessSetClose    = () => renderModelessMethod('setClose()',   async (el) => { await el.setOpen(); await el.setClose(); });
export const ModelessSetMaximum  = () => renderModelessMethod('setMaximum()', async (el) => { await el.setOpen(); await el.setMaximum(); });
export const ModelessSetRestore  = () => renderModelessMethod('setRestore()', async (el) => { await el.setOpen(); await el.setMaximum(); await el.setRestore(); });
export const ModelessSetMinimum  = () => renderModelessMethod('setMinimum()', async (el) => { await el.setOpen(); await el.setMinimum(); });

const renderGroupMethod = (label: string, action: (g: HTMLSyModelessGroupElement) => Promise<void> | void) => {
  const gRef: Ref<HTMLSyModelessGroupElement> = createRef();
  return html`
    <sy-modeless-group ${ref(gRef)}></sy-modeless-group>
    <sy-button
      @click=${async () => {
        if (gRef.value) await action(gRef.value);
      }}
    >${label}</sy-button>
  `;
};

export const ModelessGroupCreate = () =>
  renderGroupMethod('create(id,...)', (g) =>
    g.create('w1', 'Window', '<p>Hello</p>', { closable: true, draggable: true } as any),
  );

export const ModelessGroupUpdateContent = () =>
  renderGroupMethod('updateContent', async (g) => {
    await g.create('wuc', 'W', '<p>Old</p>', { closable: true } as any);
    await g.updateContent('wuc', '<strong>New content</strong>');
  });

export const ModelessGroupUpdateTitle = () =>
  renderGroupMethod('updateTitle', async (g) => {
    await g.create('wut', 'Old', '<p>Content</p>', { closable: true } as any);
    await g.updateTitle('wut', 'New Title');
  });

export const ModelessGroupUpdateOption = () =>
  renderGroupMethod('updateOption', async (g) => {
    await g.create('wuo', 'W', '<p>Content</p>', { closable: true } as any);
    await g.updateOption('wuo', { resizable: true, draggable: true } as any);
  });

export const ModelessGroupClose = () =>
  renderGroupMethod('close(id)', async (g) => {
    await g.create('wc', 'W', '<p>Content</p>', { closable: true } as any);
    await g.close('wc');
  });

export const ModelessGroupCloseAll = () =>
  renderGroupMethod('closeAll()', async (g) => {
    await g.create('w1', 'W1', '<p>1</p>');
    await g.create('w2', 'W2', '<p>2</p>');
    await g.closeAll();
  });

// keep helper exports unused-safe
void ifDefined;
void renderEventDemo;
