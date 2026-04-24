import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyGlobalHeaderProps extends Components.SyGlobalHeader {
  changed?: (event: CustomEvent<any>) => void;
  actionClick?: (event: CustomEvent<any>) => void;
  selected?: (event: CustomEvent<any>) => void;
}

export const GlobalHeader = (a: SyGlobalHeaderProps) => html`
  <sy-global-header
    title=${ifDefined(a.appTitle)}
    ?sticky=${!!a.sticky}
    ?search=${!!a.search}
    ?information=${!!a.information}
    ?notification=${!!a.notification}
  ></sy-global-header>
`;

export const GlobalHeaderAppTitle     = (args: { appTitle: string })     => html`<sy-global-header title=${ifDefined(args.appTitle)}></sy-global-header>`;
export const GlobalHeaderSticky       = (args: { sticky: boolean })      => html`<sy-global-header title="App" ?sticky=${!!args.sticky}></sy-global-header>`;
export const GlobalHeaderSearch       = (args: { search: boolean })      => html`<sy-global-header title="App" ?search=${!!args.search}></sy-global-header>`;
export const GlobalHeaderInformation  = (args: { information: boolean }) => html`<sy-global-header title="App" ?information=${!!args.information}></sy-global-header>`;
export const GlobalHeaderNotification = (args: { notification: boolean })=> html`<sy-global-header title="App" ?notification=${!!args.notification}></sy-global-header>`;

const eventLogger = (id: string) => (e: Event) => {
  const out = document.getElementById(id);
  if (out) out.textContent = JSON.stringify((e as CustomEvent).detail);
};

export const GlobalHeaderChanged = () => html`
  <sy-global-header title="App" search @changed=${eventLogger('ghChResult')}></sy-global-header>
  <p>Status: <span id="ghChResult">(idle)</span></p>
`;

export const GlobalHeaderActionClick = () => html`
  <sy-global-header title="App" search information notification @actionClick=${eventLogger('ghAcResult')}></sy-global-header>
  <p>Status: <span id="ghAcResult">(idle)</span></p>
`;

/**
 * Populate a header with enough tabs to force overflow inside a narrow
 * container, so the 3-dot menu appears and clicking a menu item fires `selected`.
 * Each tab has a matching sy-tab-content so selection swaps the body below.
 */
export const GlobalHeaderSelected = () => html`
  <div style="max-width: 420px; border: 1px dashed #bbb;">
    <sy-tab-group active="0" position="top">
      <sy-global-header title="App" @selected=${eventLogger('ghSelResult')}>
        <div slot="tabs">
          <sy-tab tabkey="t1">Tab 1</sy-tab>
          <sy-tab tabkey="t2">Tab 2</sy-tab>
          <sy-tab tabkey="t3">Tab 3</sy-tab>
          <sy-tab tabkey="t4">Tab 4</sy-tab>
          <sy-tab tabkey="t5">Tab 5</sy-tab>
          <sy-tab tabkey="t6">Tab 6</sy-tab>
          <sy-tab tabkey="t7">Tab 7</sy-tab>
          <sy-tab tabkey="t8">Tab 8</sy-tab>
        </div>
      </sy-global-header>
      <sy-tab-content name="t1">Content for Tab 1</sy-tab-content>
      <sy-tab-content name="t2">Content for Tab 2</sy-tab-content>
      <sy-tab-content name="t3">Content for Tab 3</sy-tab-content>
      <sy-tab-content name="t4">Content for Tab 4</sy-tab-content>
      <sy-tab-content name="t5">Content for Tab 5</sy-tab-content>
      <sy-tab-content name="t6">Content for Tab 6</sy-tab-content>
      <sy-tab-content name="t7">Content for Tab 7</sy-tab-content>
      <sy-tab-content name="t8">Content for Tab 8</sy-tab-content>
    </sy-tab-group>
  </div>
  <p style="margin-top:12px;">
    Click a tab or pick one from the <b>⋯</b> overflow menu — the body below updates.
  </p>
  <p>Status: <span id="ghSelResult">(idle)</span></p>
`;

/**
 * Showcase the updateOverflowTabs() method with a resizable container and
 * a live count of tabs currently in the overflow menu.
 */
export const GlobalHeaderUpdateOverflowTabs = () => {
  const elRef: Ref<HTMLSyGlobalHeaderElement> = createRef();
  const containerRef: Ref<HTMLDivElement> = createRef();

  const reportResult = () => {
    const out = document.getElementById('ghOverflowResult');
    if (!out || !elRef.value) return;
    const overflowing = Array.from(elRef.value.querySelectorAll<HTMLElement>('sy-tab'))
      .filter(tab => tab.style.display === 'none')
      .map(tab => tab.getAttribute('tabkey') || tab.textContent?.trim())
      .filter(Boolean);
    out.textContent = `overflow tabs (${overflowing.length}): ${overflowing.length ? overflowing.join(', ') : '(none)'}`;
  };

  const resize = (width: number) => {
    if (containerRef.value) containerRef.value.style.width = width + 'px';
  };

  return html`
    <p>
      Resize the container, then call <code>updateOverflowTabs()</code> to recompute
      which tabs fit. The status line shows which keys are currently hidden.
    </p>
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
      <sy-button size="small" @click=${() => resize(260)}>width = 260</sy-button>
      <sy-button size="small" @click=${() => resize(480)}>width = 480</sy-button>
      <sy-button size="small" @click=${() => resize(720)}>width = 720</sy-button>
      <sy-button
        size="small"
        variant="primary"
        @click=${async () => { await elRef.value?.updateOverflowTabs(); reportResult(); }}
      >updateOverflowTabs()</sy-button>
    </div>
    <div ${ref(containerRef)} style="width: 100%; min-width: 260px; box-sizing: border-box; border: 1px dashed #bbb;">
      <sy-tab-group active="0" position="top">
        <sy-global-header ${ref(elRef)} title="App" search information notification>
          <div slot="tabs">
            <sy-tab tabkey="t1">Tab 1</sy-tab>
            <sy-tab tabkey="t2">Tab 2</sy-tab>
            <sy-tab tabkey="t3">Tab 3</sy-tab>
            <sy-tab tabkey="t4">Tab 4</sy-tab>
            <sy-tab tabkey="t5">Tab 5</sy-tab>
            <sy-tab tabkey="t6">Tab 6</sy-tab>
            <sy-tab tabkey="t7">Tab 7</sy-tab>
            <sy-tab tabkey="t8">Tab 8</sy-tab>
            <sy-tab tabkey="t9">Tab 9</sy-tab>
          </div>
        </sy-global-header>
        <sy-tab-content name="t1">Content for Tab 1</sy-tab-content>
        <sy-tab-content name="t2">Content for Tab 2</sy-tab-content>
        <sy-tab-content name="t3">Content for Tab 3</sy-tab-content>
        <sy-tab-content name="t4">Content for Tab 4</sy-tab-content>
        <sy-tab-content name="t5">Content for Tab 5</sy-tab-content>
        <sy-tab-content name="t6">Content for Tab 6</sy-tab-content>
        <sy-tab-content name="t7">Content for Tab 7</sy-tab-content>
        <sy-tab-content name="t8">Content for Tab 8</sy-tab-content>
        <sy-tab-content name="t9">Content for Tab 9</sy-tab-content>
      </sy-tab-group>
    </div>
    <p style="margin-top:12px;">Status: <span id="ghOverflowResult">(call the method to measure)</span></p>
  `;
};
