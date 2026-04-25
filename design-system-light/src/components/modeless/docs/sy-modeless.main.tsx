import { html, ifDefined, unsafeHTML, ref, createRef, Ref } from '../../../utils/story-template';
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

/**
 * Shared renderer for every individual sy-modeless attribute story.
 *
 * Stories used to render `<sy-modeless open ...>` directly, which meant every
 * args change triggered a re-render that appended a fresh modeless to the
 * document body — leftovers piled up across renders and made testing
 * impossible. This helper instead defers opening to an explicit button click,
 * mirroring the modal pattern so the same instance is reused across renders.
 */
const renderModelessDemo = (
  args: Partial<SyModelessProps>,
  content = html`<div slot="content">Modeless body content</div>`,
) => {
  const modelessRef: Ref<HTMLSyModelessElement> = createRef();
  return html`
    <sy-modeless
      ${ref(modelessRef)}
      ?open=${!!args.open}
      ?closable=${!!args.closable}
      ?minimizable=${!!args.minimizable}
      ?maximizable=${!!args.maximizable}
      ?resizable=${!!args.resizable}
      ?draggable=${!!(args as any).draggable}
      ?edge=${!!(args as any).edge}
      ?maximum=${!!(args as any).maximum}
      ?minimum=${!!(args as any).minimum}
      .top=${args.top as any}
      .left=${args.left as any}
      .width=${args.width as any}
      .height=${args.height as any}
      .minWidth=${args.minWidth as any}
      .minHeight=${args.minHeight as any}
    >
      ${titleSlot}
      ${content}
    </sy-modeless>
    <sy-button @click=${() => modelessRef.value?.setOpen()}>Click to Open</sy-button>
  `;
};

export const Modeless = (a: SyModelessProps) => {
  const modelessRef: Ref<HTMLSyModelessElement> = createRef();
  return html`
    <sy-modeless
      ${ref(modelessRef)}
      ?open=${!!a.open}
      ?resizable=${!!a.resizable}
      ?closable=${!!a.closable}
      ?minimizable=${!!a.minimizable}
      ?maximizable=${!!a.maximizable}
      ?edge=${!!(a as any).edge}
      ?maximum=${!!(a as any).maximum}
      ?minimum=${!!(a as any).minimum}
      ?draggable=${!!(a as any).draggable}
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
    <sy-button @click=${() => modelessRef.value?.setOpen()}>Click to Open</sy-button>
  `;
};

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

// All attribute stories default to `closable: true` so the user can dismiss
// the open modeless during testing. The Edge story additionally defaults to
// `draggable: true` because edge-clamping is only observable while dragging.
export const ModelessOpen        = (a: { open: boolean })          => renderModelessDemo({ open: a.open, closable: true });
export const ModelessDraggable   = (a: { draggable: boolean })     => renderModelessDemo({ draggable: a.draggable, closable: true } as any, html`<div slot="content">Drag me by the header</div>`);
export const ModelessResizable   = (a: { resizable: boolean })     => renderModelessDemo({ resizable: a.resizable, closable: true }, html`<div slot="content">Resize from the edges</div>`);
export const ModelessClosable    = (a: { closable: boolean })      => renderModelessDemo({ closable: a.closable });
export const ModelessMinimizable = (a: { minimizable: boolean })   => renderModelessDemo({ minimizable: a.minimizable, closable: true });
export const ModelessMaximizable = (a: { maximizable: boolean })   => renderModelessDemo({ maximizable: a.maximizable, closable: true });
export const ModelessEdge        = (a: { edge: boolean })          => renderModelessDemo({ edge: a.edge, draggable: true, closable: true } as any, html`<div slot="content">Drag stays inside the viewport when edge=true</div>`);
export const ModelessMaximum     = (a: { maximum: boolean })       => renderModelessDemo({ maximum: a.maximum, maximizable: true, closable: true } as any);
export const ModelessMinimum     = (a: { minimum: boolean })       => renderModelessDemo({ minimum: a.minimum, minimizable: true, closable: true } as any);
export const ModelessTop         = (a: { top: number })            => renderModelessDemo({ top: a.top, closable: true } as any);
export const ModelessLeft        = (a: { left: number })           => renderModelessDemo({ left: a.left, closable: true } as any);
export const ModelessWidth       = (a: { width: number })          => renderModelessDemo({ width: a.width, closable: true } as any);
export const ModelessHeight      = (a: { height: number })         => renderModelessDemo({ height: a.height, closable: true } as any);
export const ModelessMinWidth    = (a: { minWidth: number })       => renderModelessDemo({ minWidth: a.minWidth, resizable: true, closable: true } as any);
export const ModelessMinHeight   = (a: { minHeight: number })      => renderModelessDemo({ minHeight: a.minHeight, resizable: true, closable: true } as any);

const eventLogger = (resultId: string, name: string) => (e: Event) => {
  const out = document.getElementById(resultId);
  if (out) out.textContent = `${name}: ${JSON.stringify((e as CustomEvent).detail)}`;
};

const renderEventDemo = (resultId: string, name: 'closed' | 'statusChanged' | 'positionChanged') => {
  const mRef: Ref<HTMLSyModelessElement> = createRef();
  const handler = eventLogger(resultId, name);
  return html`
    <sy-modeless
      ${ref(mRef)}
      closable
      minimizable
      maximizable
      draggable
      resizable
      @closed=${name === 'closed' ? handler : null}
      @statusChanged=${name === 'statusChanged' ? handler : null}
      @positionChanged=${name === 'positionChanged' ? handler : null}
    >
      ${titleSlot}
      <div slot="content">Trigger ${name}</div>
    </sy-modeless>
    <sy-button @click=${() => mRef.value?.setOpen()}>Click to Open</sy-button>
    <p id=${resultId}>(idle)</p>
  `;
};

export const ModelessClosed           = () => renderEventDemo('mClResult', 'closed');
export const ModelessStatusChanged    = () => renderEventDemo('mSCResult', 'statusChanged');
export const ModelessPositionChanged  = () => renderEventDemo('mPCResult', 'positionChanged');

// setOpen() is the one method whose entire purpose is opening, so it keeps a
// single button. The other set* methods need an already-open modeless to act
// on, so they expose two buttons: setOpen() to put the modeless on screen,
// and the method under test (setClose / setMaximum / setMinimum / setRestore).
// Tests previously chained `setOpen` and the method together inside a single
// click, which made it impossible to observe the method against an already-
// open modeless (e.g. you couldn't see setClose actually closing something).
const renderModelessMethod = (label: string, instructions: unknown, action: (el: HTMLSyModelessElement) => Promise<void> | void) => {
  const mRef: Ref<HTMLSyModelessElement> = createRef();
  return html`
    ${instructions}
    <sy-modeless ${ref(mRef)} closable minimizable maximizable draggable resizable>
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

const renderModelessMethodWithOpen = (label: string, instructions: unknown, action: (el: HTMLSyModelessElement) => Promise<void> | void) => {
  const mRef: Ref<HTMLSyModelessElement> = createRef();
  return html`
    ${instructions}
    <sy-modeless ${ref(mRef)} closable minimizable maximizable draggable resizable>
      ${titleSlot}
      <div slot="content">Content</div>
    </sy-modeless>
    <sy-button @click=${() => mRef.value?.setOpen()}>setOpen()</sy-button>
    <sy-button
      @click=${async () => {
        if (mRef.value) await action(mRef.value);
      }}
    >${label}</sy-button>
  `;
};

export const ModelessSetOpen = () =>
  renderModelessMethod(
    'setOpen()',
    html`
      <h4>How to test</h4>
      <p>Click <strong>setOpen()</strong> to open the modeless. Calling it again while it is already open is a no-op.</p>
    `,
    (el) => el.setOpen(),
  );

export const ModelessSetClose = () =>
  renderModelessMethodWithOpen(
    'setClose()',
    html`
      <h4>How to test</h4>
      <ol>
        <li>Click <strong>setOpen()</strong> first to put the modeless on screen.</li>
        <li>Click <strong>setClose()</strong> &mdash; the open modeless will close.</li>
      </ol>
      <p><em>Note:</em> calling <code>setClose()</code> while nothing is open does nothing because there is no target to close.</p>
    `,
    (el) => el.setClose(),
  );

export const ModelessSetMaximum = () =>
  renderModelessMethodWithOpen(
    'setMaximum()',
    html`
      <h4>How to test</h4>
      <ol>
        <li>Click <strong>setOpen()</strong> first to put the modeless on screen.</li>
        <li>Click <strong>setMaximum()</strong> &mdash; the modeless will fill the viewport.</li>
      </ol>
      <p><strong>Warning:</strong> calling <code>setMaximum()</code> before <code>setOpen()</code> has no effect &mdash; the modeless must already be open.</p>
    `,
    (el) => el.setMaximum(),
  );

export const ModelessSetMinimum = () =>
  renderModelessMethodWithOpen(
    'setMinimum()',
    html`
      <h4>How to test</h4>
      <ol>
        <li>Click <strong>setOpen()</strong> first to put the modeless on screen.</li>
        <li>Click <strong>setMinimum()</strong> &mdash; the modeless will collapse to the bottom of the viewport.</li>
      </ol>
      <p><strong>Warning:</strong> calling <code>setMinimum()</code> before <code>setOpen()</code> has no effect.</p>
    `,
    (el) => el.setMinimum(),
  );

export const ModelessSetRestore = () =>
  renderModelessMethodWithOpen(
    'setRestore()',
    html`
      <h4>How to test</h4>
      <ol>
        <li>Click <strong>setOpen()</strong> to open the modeless.</li>
        <li>Maximize or minimize it &mdash; either by clicking the header icon, or by calling <code>setMaximum()</code> / <code>setMinimum()</code>.</li>
        <li>Click <strong>setRestore()</strong> &mdash; the modeless returns to its previous size and position.</li>
      </ol>
      <p><em>Note:</em> calling <code>setRestore()</code> while already in the restore state is a no-op.</p>
    `,
    (el) => el.setRestore(),
  );

// Group method demos — the `id` (and title/content where relevant) come from
// Storybook controls so the user can target a specific window. Each story
// has a "Create modeless" button to seed an instance and a second button
// that calls the method under test against the same id, so close/update
// methods can be observed against an already-open modeless. CloseAll seeds
// multiple unique ids on each click so the user can visually verify several
// windows being closed at once.
const renderGroupCreate = (args: { id: string; title: string; content: string }) => {
  const gRef: Ref<HTMLSyModelessGroupElement> = createRef();
  return html`
    <h4>How to test</h4>
    <ol>
      <li>Edit <code>id</code>, <code>title</code>, and <code>content</code> in the Controls panel.</li>
      <li>
        Click <strong>create("${args.id}", ...)</strong>.
        A new modeless is created with that id and opens on screen.
      </li>
    </ol>
    <p>
      <em>Tip:</em> clicking again with the same id stacks another modeless on top.
      To open several at once, change the <code>id</code> between clicks.
    </p>

    <sy-modeless-group ${ref(gRef)}></sy-modeless-group>
    <sy-button
      @click=${async () => {
        await gRef.value?.create(args.id, args.title, args.content, { closable: true, draggable: true } as any);
      }}
    >create("${args.id}", ...)</sy-button>
  `;
};

const renderGroupUpdateContent = (args: { id: string; content: string }) => {
  const gRef: Ref<HTMLSyModelessGroupElement> = createRef();
  return html`
    <h4>How to test</h4>
    <ol>
      <li>
        Click <strong>Create modeless</strong> first to open a modeless with
        <code>id="${args.id}"</code> (its body shows "Old content").
      </li>
      <li>Edit <code>content</code> in the Controls panel to any HTML you like.</li>
      <li>
        Click <strong>updateContent("${args.id}", ...)</strong>.
        The body of the modeless with that id is replaced with the new value.
      </li>
    </ol>
    <p><strong>Warning:</strong> calling <code>updateContent</code> with an id that does not exist is a no-op &mdash; there is no target to update.</p>

    <sy-modeless-group ${ref(gRef)}></sy-modeless-group>
    <sy-button
      @click=${async () => {
        await gRef.value?.create(args.id, `Window ${args.id}`, '<p>Old content</p>', { closable: true, draggable: true } as any);
      }}
    >Create modeless</sy-button>
    <sy-button
      @click=${async () => {
        await gRef.value?.updateContent(args.id, args.content);
      }}
    >updateContent("${args.id}", ...)</sy-button>
  `;
};

const renderGroupUpdateTitle = (args: { id: string; title: string }) => {
  const gRef: Ref<HTMLSyModelessGroupElement> = createRef();
  return html`
    <h4>How to test</h4>
    <ol>
      <li>
        Click <strong>Create modeless</strong> first to open a modeless with
        <code>id="${args.id}"</code> (its header reads "Old title").
      </li>
      <li>Edit <code>title</code> in the Controls panel.</li>
      <li>
        Click <strong>updateTitle("${args.id}", ...)</strong>.
        The header of that modeless is replaced with the new title.
      </li>
    </ol>

    <sy-modeless-group ${ref(gRef)}></sy-modeless-group>
    <sy-button
      @click=${async () => {
        await gRef.value?.create(args.id, 'Old title', '<p>Content</p>', { closable: true, draggable: true } as any);
      }}
    >Create modeless</sy-button>
    <sy-button
      @click=${async () => {
        await gRef.value?.updateTitle(args.id, args.title);
      }}
    >updateTitle("${args.id}", ...)</sy-button>
  `;
};

const renderGroupUpdateOption = (args: { id: string }) => {
  const gRef: Ref<HTMLSyModelessGroupElement> = createRef();
  return html`
    <h4>How to test</h4>
    <ol>
      <li>
        Click <strong>Create modeless</strong> first to open a modeless with
        <code>id="${args.id}"</code> (it starts with resizable and draggable both off).
      </li>
      <li>
        Click <strong>updateOption("${args.id}", ...)</strong>.
        Its options are updated to <code>&#123; resizable: true, draggable: true &#125;</code>:
        you can now drag it by the header and resize it from any edge or corner.
      </li>
    </ol>

    <sy-modeless-group ${ref(gRef)}></sy-modeless-group>
    <sy-button
      @click=${async () => {
        await gRef.value?.create(args.id, `Window ${args.id}`, '<p>Content</p>', { closable: true } as any);
      }}
    >Create modeless</sy-button>
    <sy-button
      @click=${async () => {
        await gRef.value?.updateOption(args.id, { resizable: true, draggable: true } as any);
      }}
    >updateOption("${args.id}", &#123;resizable, draggable&#125;)</sy-button>
  `;
};

const renderGroupClose = (args: { id: string }) => {
  const gRef: Ref<HTMLSyModelessGroupElement> = createRef();
  return html`
    <h4>How to test</h4>
    <ol>
      <li>
        Click <strong>Create modeless</strong> first to open a modeless with
        <code>id="${args.id}"</code>.
      </li>
      <li>
        Click <strong>close("${args.id}")</strong>.
        Only the modeless with that id is closed.
      </li>
    </ol>
    <p>
      <em>Tip:</em> to verify that <code>close</code> targets a single id, change <code>id</code>
      in the Controls panel and alternate between Create and close to open several windows
      and dismiss them one by one.
    </p>

    <sy-modeless-group ${ref(gRef)}></sy-modeless-group>
    <sy-button
      @click=${async () => {
        await gRef.value?.create(args.id, `Window ${args.id}`, '<p>Content</p>', { closable: true, draggable: true } as any);
      }}
    >Create modeless</sy-button>
    <sy-button
      @click=${async () => {
        await gRef.value?.close(args.id);
      }}
    >close("${args.id}")</sy-button>
  `;
};

const renderGroupCloseAll = () => {
  const gRef: Ref<HTMLSyModelessGroupElement> = createRef();
  let counter = 0;
  return html`
    <h4>How to test</h4>
    <ol>
      <li>
        Click <strong>Create modeless</strong> several times to spawn
        multiple windows (<code>w1</code>, <code>w2</code>, <code>w3</code>, ...).
      </li>
      <li>
        Click <strong>closeAll()</strong>.
        Every modeless registered to the group is closed at once.
      </li>
    </ol>
    <p><em>Note:</em> the counter resets after closeAll, so the next Create starts again at <code>w1</code>.</p>

    <sy-modeless-group ${ref(gRef)}></sy-modeless-group>
    <sy-button
      @click=${async () => {
        counter += 1;
        const id = `w${counter}`;
        await gRef.value?.create(id, `Window ${id}`, `<p>Content ${id}</p>`, { closable: true, draggable: true } as any);
      }}
    >Create modeless</sy-button>
    <sy-button
      @click=${async () => {
        await gRef.value?.closeAll();
        counter = 0;
      }}
    >closeAll()</sy-button>
  `;
};

export const ModelessGroupCreate         = (a: { id: string; title: string; content: string }) => renderGroupCreate(a);
export const ModelessGroupUpdateContent  = (a: { id: string; content: string })                => renderGroupUpdateContent(a);
export const ModelessGroupUpdateTitle    = (a: { id: string; title: string })                  => renderGroupUpdateTitle(a);
export const ModelessGroupUpdateOption   = (a: { id: string })                                  => renderGroupUpdateOption(a);
export const ModelessGroupClose          = (a: { id: string })                                  => renderGroupClose(a);
export const ModelessGroupCloseAll       = ()                                                   => renderGroupCloseAll();

// keep helper exports unused-safe
void ifDefined;
void unsafeHTML;
