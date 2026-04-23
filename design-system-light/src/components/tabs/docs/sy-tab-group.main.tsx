import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyTabGroupProps extends Components.SyTabGroup {
  slot?: any;
  selected?: (e: CustomEvent<any>) => void;
  closed?: (e: CustomEvent<any>) => void;
  ordered?: (e: CustomEvent<any>) => void;
}
export interface SyTabProps extends Components.SyTab {
  slot?: any;
  selected?: (e: CustomEvent<any>) => void;
  closed?: (e: CustomEvent<any>) => void;
}
export interface SyTabContentProps extends Components.SyTabContent { slot?: any; }

const tabsContent = html`
  <sy-tab tabkey="one">One</sy-tab>
  <sy-tab tabkey="two">Two</sy-tab>
  <sy-tab tabkey="three">Three</sy-tab>
  <sy-tab-content name="one">Content 1</sy-tab-content>
  <sy-tab-content name="two">Content 2</sy-tab-content>
  <sy-tab-content name="three">Content 3</sy-tab-content>
`;

const closableTabs = html`
  <sy-tab tabkey="one" closable>One</sy-tab>
  <sy-tab tabkey="two" closable>Two</sy-tab>
  <sy-tab tabkey="three" closable>Three</sy-tab>
  <sy-tab-content name="one">Content 1</sy-tab-content>
  <sy-tab-content name="two">Content 2</sy-tab-content>
  <sy-tab-content name="three">Content 3</sy-tab-content>
`;

export const TabGroup = (a: SyTabGroupProps) => html`
  <sy-tab-group
    .active=${a.active}
    .isdraggable=${(a as any).isdraggable}
    ?disabled=${!!a.disabled}
    align=${ifDefined(a.align)}
    position=${ifDefined(a.position)}
    type=${ifDefined(a.type)}
    size=${ifDefined(a.size)}
    padding=${ifDefined(a.padding)}
  >${tabsContent}</sy-tab-group>
`;

export const Tab = (a: SyTabProps) => html`
  <sy-tab-group>
    <sy-tab
      ?closable=${!!a.closable}
      ?disabled=${!!a.disabled}
      ?active=${!!a.active}
      tabkey=${ifDefined(a.tabkey)}
      .manualClose=${a.manualClose}
      .parentDisabled=${a.parentDisabled}
      .currentDisabledStatus=${a.currentDisabledStatus}
      .index=${a.index}
      .inHeader=${a.inHeader}
      type=${ifDefined(a.type)}
      size=${ifDefined(a.size)}
      position=${ifDefined(a.position)}
    >Tab</sy-tab>
    <sy-tab-content name=${ifDefined(a.tabkey)}>Tab content</sy-tab-content>
  </sy-tab-group>
`;

export const TabContent = (a: SyTabContentProps) => html`
  <sy-tab-group>
    <sy-tab tabkey=${ifDefined(a.name)}>Tab</sy-tab>
    <sy-tab-content ?active=${!!a.active} ?disabled=${!!a.disabled} name=${ifDefined(a.name)}>Content</sy-tab-content>
  </sy-tab-group>
`;

// group attrs
export const TabGroupActive       = (a: { active: number })       => html`<sy-tab-group .active=${a.active}>${tabsContent}</sy-tab-group>`;
export const TabGroupAlign        = (a: { align: any })           => html`<sy-tab-group align=${ifDefined(a.align)}>${tabsContent}</sy-tab-group>`;
export const TabGroupDisabled     = (a: { disabled: boolean })    => html`<sy-tab-group ?disabled=${!!a.disabled}>${tabsContent}</sy-tab-group>`;
export const TabGroupIsdraggable  = (a: { isdraggable: boolean }) => html`<sy-tab-group .isdraggable=${a.isdraggable}>${tabsContent}</sy-tab-group>`;
export const TabGroupPosition     = (a: { position: any })        => html`<sy-tab-group position=${ifDefined(a.position)}>${tabsContent}</sy-tab-group>`;
export const TabGroupType         = (a: { type: any })            => html`<sy-tab-group type=${ifDefined(a.type)}>${tabsContent}</sy-tab-group>`;
export const TabGroupSize         = (a: { size: any })            => html`<sy-tab-group size=${ifDefined(a.size)}>${tabsContent}</sy-tab-group>`;
export const TabGroupPadding      = (a: { padding: any })         => html`<sy-tab-group padding=${ifDefined(a.padding)}>${tabsContent}</sy-tab-group>`;

const renderGroupEvent = (resultId: string, name: string, handler: (e: CustomEvent) => string) => {
  const handle = (e: Event) => {
    const out = document.getElementById(resultId);
    if (out) out.textContent = `${name}: ${handler(e as CustomEvent)}`;
  };
  return handle;
};

export const TabGroupSelected = () => {
  const handle = renderGroupEvent('tgSResult', 'selected', (e) => JSON.stringify(e.detail?.tabkey ?? e.detail));
  return html`
    <sy-tab-group .isdraggable=${true} @selected=${handle}>${closableTabs}</sy-tab-group>
    <p id="tgSResult">(idle)</p>
  `;
};
export const TabGroupClosed = () => {
  const handle = renderGroupEvent('tgCResult', 'closed', (e) => JSON.stringify(e.detail?.tabkey ?? e.detail));
  return html`
    <sy-tab-group .isdraggable=${true} @closed=${handle}>${closableTabs}</sy-tab-group>
    <p id="tgCResult">(idle)</p>
  `;
};
export const TabGroupOrdered = () => {
  const handle = renderGroupEvent('tgOResult', 'ordered', (e) => JSON.stringify(e.detail));
  return html`
    <sy-tab-group .isdraggable=${true} @ordered=${handle}>${closableTabs}</sy-tab-group>
    <p id="tgOResult">(idle)</p>
  `;
};

export const TabGroupCloseTab = () => {
  const gRef: Ref<HTMLSyTabGroupElement> = createRef();
  return html`
    <sy-tab-group ${ref(gRef)}>${closableTabs}</sy-tab-group><br/>
    <sy-button @click=${async () => {
      if (!gRef.value) return;
      await gRef.value.closeTab('two');
      const out = document.getElementById('tgCTResult');
      if (out) out.textContent = 'closed';
    }}>closeTab("two")</sy-button>
    <p id="tgCTResult">(idle)</p>
  `;
};

// tab attrs
export const TabClosable             = (a: { closable: boolean })             => html`<sy-tab-group><sy-tab tabkey="x" ?closable=${!!a.closable}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabDisabled             = (a: { disabled: boolean })             => html`<sy-tab-group><sy-tab tabkey="x" ?disabled=${!!a.disabled}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabTabkey               = (a: { tabkey: string })                => html`<sy-tab-group><sy-tab tabkey=${ifDefined(a.tabkey)}>Tab</sy-tab><sy-tab-content name=${ifDefined(a.tabkey)}>C</sy-tab-content></sy-tab-group>`;
export const TabManualClose          = (a: { manualClose: boolean })          => html`<sy-tab-group><sy-tab tabkey="x" closable .manualClose=${a.manualClose}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabActive               = (a: { active: boolean })               => html`<sy-tab-group><sy-tab tabkey="x" ?active=${!!a.active}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabParentDisabled       = (a: { parentDisabled: boolean })       => html`<sy-tab-group><sy-tab tabkey="x" .parentDisabled=${a.parentDisabled}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabCurrentDisabledStatus = (a: { currentDisabledStatus: boolean }) => html`<sy-tab-group><sy-tab tabkey="x" .currentDisabledStatus=${a.currentDisabledStatus}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabIndex                = (a: { index: number })                 => html`<sy-tab-group><sy-tab tabkey="x" .index=${a.index}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabType                 = (a: { type: any })                     => html`<sy-tab-group><sy-tab tabkey="x" type=${ifDefined(a.type)}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabSize                 = (a: { size: any })                     => html`<sy-tab-group><sy-tab tabkey="x" size=${ifDefined(a.size)}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabPosition             = (a: { position: any })                 => html`<sy-tab-group><sy-tab tabkey="x" position=${ifDefined(a.position)}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;
export const TabInHeader             = (a: { inHeader: boolean })             => html`<sy-tab-group><sy-tab tabkey="x" .inHeader=${a.inHeader}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>`;

export const TabSelected = () => {
  const handle = () => {
    const out = document.getElementById('tSResult');
    if (out) out.textContent = 'selected';
  };
  return html`
    <sy-tab-group><sy-tab tabkey="x" closable @selected=${handle}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>
    <p id="tSResult">(idle)</p>
  `;
};
export const TabClosed = () => {
  const handle = () => {
    const out = document.getElementById('tCResult');
    if (out) out.textContent = 'closed';
  };
  return html`
    <sy-tab-group><sy-tab tabkey="x" closable @closed=${handle}>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group>
    <p id="tCResult">(idle)</p>
  `;
};

export const TabSetClose = () => {
  const tRef: Ref<HTMLSyTabElement> = createRef();
  return html`
    <sy-tab-group><sy-tab ${ref(tRef)} tabkey="x" closable>Tab</sy-tab><sy-tab-content name="x">C</sy-tab-content></sy-tab-group><br/>
    <sy-button @click=${async () => {
      if (!tRef.value) return;
      await tRef.value.setClose();
      const out = document.getElementById('tSCResult');
      if (out) out.textContent = 'closed';
    }}>setClose()</sy-button>
    <p id="tSCResult">(idle)</p>
  `;
};

// tab-content attrs
export const TabContentActive   = (a: { active: boolean })   => html`<sy-tab-group><sy-tab tabkey="x">Tab</sy-tab><sy-tab-content ?active=${!!a.active} name="x">C</sy-tab-content></sy-tab-group>`;
export const TabContentDisabled = (a: { disabled: boolean }) => html`<sy-tab-group><sy-tab tabkey="x">Tab</sy-tab><sy-tab-content ?disabled=${!!a.disabled} name="x">C</sy-tab-content></sy-tab-group>`;
export const TabContentName     = (a: { name: string })      => html`<sy-tab-group><sy-tab tabkey=${ifDefined(a.name)}>Tab</sy-tab><sy-tab-content name=${ifDefined(a.name)}>C</sy-tab-content></sy-tab-group>`;
