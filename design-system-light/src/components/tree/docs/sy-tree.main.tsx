import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyTreeProps extends Components.SyTree {
  slot?: any;
  nodesChanged?: (e: CustomEvent<any>) => void;
  itemChecked?: (e: CustomEvent<any>) => void;
  itemSelected?: (e: CustomEvent<any>) => void;
}
export interface SyTreeItemProps extends Components.SyTreeItem {
  slot?: any;
  expandChanged?: (e: CustomEvent<any>) => void;
  checkChanged?: (e: CustomEvent<any>) => void;
  itemAdded?: (e: CustomEvent<any>) => void;
  itemRemoved?: (e: CustomEvent<any>) => void;
  itemEdited?: (e: CustomEvent<any>) => void;
  itemUpdating?: (e: CustomEvent<any>) => void;
  itemUpdatingReset?: (e: CustomEvent<any>) => void;
  itemDrop?: (e: CustomEvent<any>) => void;
  itemSelected?: (e: CustomEvent<any>) => void;
  draggingEvent?: (e: CustomEvent<any>) => void;
}

const sampleNodes = [
  { label: 'Fruits', value: 'fruits', children: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]},
  { label: 'Vegetables', value: 'vegetables', children: [
    { label: 'Carrot', value: 'carrot' },
  ]},
];

export const Tree = (a: SyTreeProps) => html`
  <sy-tree
    .nodes=${a.nodes ?? sampleNodes}
    ?checkable=${!!a.checkable}
    ?clickable=${!!a.clickable}
    ?editable=${!!a.editable}
    ?expandable=${!!a.expandable}
    ?line=${!!a.line}
    .treeDraggable=${(a as any).treeDraggable}
    .expandAll=${a.expandAll}
    .manualAdd=${a.manualAdd}
    .manualRemove=${a.manualRemove}
    .nodeWidth=${a.nodeWidth}
    .selectedValue=${a.selectedValue}
    .searchTerm=${a.searchTerm}
    .isTreeSelect=${a.isTreeSelect}>
  </sy-tree>
`;

export const TreeItem = (a: SyTreeItemProps) => html`
  <sy-tree line>
    <sy-tree-item
      ?appendable=${!!a.appendable} ?checkable=${!!a.checkable} ?checked=${!!a.checked}
      ?clickable=${!!a.clickable} ?disabled=${!!a.disabled}
      ?dragging=${!!a.dragging} ?editable=${!!a.editable} ?expandable=${!!a.expandable}
      ?expanded=${!!a.expanded} ?fixed=${!!a.fixed} ?indeterminate=${!!a.indeterminate}
      ?removable=${!!a.removable} ?line=${!!a.line}
      .treeitemDraggable=${(a as any).treeitemDraggable}
      .hasChild=${a.hasChild}
      .appendPlaceholder=${a.appendPlaceholder}
      icon=${ifDefined(a.icon)}
      .isDescendant=${a.isDescendant} .isEditable=${a.isEditable}
      label=${ifDefined(a.label)}
      .level=${a.level}
      .treeChildren=${a.treeChildren}
      .tagMessage=${a.tagMessage} .tagVariant=${a.tagVariant}
      value=${ifDefined(a.value)}
      .searchTerm=${a.searchTerm} .selectedValue=${a.selectedValue} .nodeWidth=${a.nodeWidth}>
    </sy-tree-item>
  </sy-tree>
`;

// Tree attr demos
export const TreeNodes          = (args: { nodes: any[] })           => html`<sy-tree .nodes=${args.nodes}></sy-tree>`;
export const TreeCheckable      = (args: { checkable: boolean })     => html`<sy-tree ?checkable=${!!args.checkable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeClickable      = (args: { clickable: boolean })     => html`<sy-tree ?clickable=${!!args.clickable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeTreeDraggable  = (args: { treeDraggable: boolean }) => html`<sy-tree .treeDraggable=${args.treeDraggable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeEditable       = (args: { editable: boolean })      => html`<sy-tree ?editable=${!!args.editable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeExpandable     = (args: { expandable: boolean })    => html`<sy-tree ?expandable=${!!args.expandable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeExpandAll      = (args: { expandAll: boolean })     => html`<sy-tree .expandAll=${args.expandAll} .nodes=${sampleNodes}></sy-tree>`;
export const TreeManualAdd      = (args: { manualAdd: boolean })     => html`<sy-tree editable .manualAdd=${args.manualAdd} .nodes=${sampleNodes}></sy-tree>`;
export const TreeManualRemove   = (args: { manualRemove: boolean })  => html`<sy-tree editable .manualRemove=${args.manualRemove} .nodes=${sampleNodes}></sy-tree>`;
export const TreeLine           = (args: { line: boolean })          => html`<sy-tree ?line=${!!args.line} .nodes=${sampleNodes}></sy-tree>`;
export const TreeNodeWidth      = (args: { nodeWidth: number })      => html`<sy-tree .nodeWidth=${args.nodeWidth} .nodes=${sampleNodes}></sy-tree>`;
export const TreeSelectedValue  = (args: { selectedValue: string })  => html`<sy-tree .selectedValue=${args.selectedValue} .nodes=${sampleNodes}></sy-tree>`;
export const TreeSearchTerm     = (args: { searchTerm: string })     => html`<sy-tree .searchTerm=${args.searchTerm} .nodes=${sampleNodes}></sy-tree>`;
export const TreeIsTreeSelect   = (args: { isTreeSelect: boolean })  => html`<sy-tree .isTreeSelect=${args.isTreeSelect} .nodes=${sampleNodes}></sy-tree>`;

// Tree events
const renderTreeEvent = (resultId: string, eventName: 'nodesChanged' | 'itemChecked' | 'itemSelected') => {
  const handle = (e: Event) => {
    const out = document.getElementById(resultId);
    if (out) out.textContent = `${eventName}: ${JSON.stringify((e as CustomEvent).detail)}`;
  };
  switch (eventName) {
    case 'nodesChanged':
      return html`<sy-tree checkable clickable .nodes=${sampleNodes} @nodesChanged=${handle}></sy-tree><p id=${resultId}>(idle)</p>`;
    case 'itemChecked':
      return html`<sy-tree checkable clickable .nodes=${sampleNodes} @itemChecked=${handle}></sy-tree><p id=${resultId}>(idle)</p>`;
    case 'itemSelected':
      return html`<sy-tree checkable clickable .nodes=${sampleNodes} @itemSelected=${handle}></sy-tree><p id=${resultId}>(idle)</p>`;
  }
};
export const TreeNodesChanged     = () => renderTreeEvent('tNCResult', 'nodesChanged');
export const TreeItemCheckedEvent = () => renderTreeEvent('tICResult', 'itemChecked');
export const TreeItemSelected     = () => renderTreeEvent('tISResult', 'itemSelected');

// Tree methods
const renderTreeMethod = (label: string, action: (el: HTMLSyTreeElement, out: HTMLElement | null) => void | Promise<void>) => {
  const tRef: Ref<HTMLSyTreeElement> = createRef();
  const outId = `tOut_${Math.random().toString(36).slice(2, 8)}`;
  return html`
    <sy-tree ${ref(tRef)} checkable editable .manualAdd=${true} .manualRemove=${true} .nodes=${sampleNodes}></sy-tree><br/>
    <sy-button @click=${async () => { if (tRef.value) await action(tRef.value, document.getElementById(outId)); }}>${label}</sy-button>
    <p id=${outId}>(idle)</p>
  `;
};

export const TreeSetCheckState        = () => renderTreeMethod('setCheckState("apple", true)', async (el, out) => { await el.setCheckState('apple', true); if (out) out.textContent = 'set'; });
export const TreeClearAllSelectedItem = () => renderTreeMethod('clearAllSelectedItem()', async (el, out) => { await el.clearAllSelectedItem(); if (out) out.textContent = 'cleared'; });
export const TreeManualAddChildNode   = () => renderTreeMethod('manualAddChildNode("fruits","Mango")', async (el, out) => { await el.manualAddChildNode('fruits', 'Mango', 'mango'); if (out) out.textContent = 'added'; });
export const TreeManualRemoveNode     = () => renderTreeMethod('manualRemoveNode("apple")', async (el, out) => { await el.manualRemoveNode('apple'); if (out) out.textContent = 'removed'; });
export const TreeFindNode             = () => renderTreeMethod('findNode(nodes,"apple")', async (el, out) => { const r = await el.findNode((el as any).nodes, 'apple'); if (out) out.textContent = JSON.stringify(r); });

// tree-item attrs
export const TreeItemAppendable        = (a: { appendable: boolean })        => html`<sy-tree line><sy-tree-item ?appendable=${!!a.appendable} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemCheckable         = (a: { checkable: boolean })         => html`<sy-tree line><sy-tree-item ?checkable=${!!a.checkable} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemChecked           = (a: { checked: boolean })           => html`<sy-tree line><sy-tree-item checkable ?checked=${!!a.checked} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemClickable         = (a: { clickable: boolean })         => html`<sy-tree line><sy-tree-item ?clickable=${!!a.clickable} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemDisabled          = (a: { disabled: boolean })          => html`<sy-tree line><sy-tree-item ?disabled=${!!a.disabled} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemTreeitemDraggable = (a: { treeitemDraggable: boolean }) => html`<sy-tree line><sy-tree-item .treeitemDraggable=${a.treeitemDraggable} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemDragging          = (a: { dragging: boolean })          => html`<sy-tree line><sy-tree-item ?dragging=${!!a.dragging} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemEditable          = (a: { editable: boolean })          => html`<sy-tree line><sy-tree-item ?editable=${!!a.editable} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemExpandable        = (a: { expandable: boolean })        => html`<sy-tree line><sy-tree-item ?expandable=${!!a.expandable} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemExpanded          = (a: { expanded: boolean })          => html`<sy-tree line><sy-tree-item expandable ?expanded=${!!a.expanded} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemFixed             = (a: { fixed: boolean })             => html`<sy-tree line><sy-tree-item ?fixed=${!!a.fixed} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemHasChild          = (a: { hasChild: boolean })          => html`<sy-tree line><sy-tree-item .hasChild=${a.hasChild} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemAppendPlaceholder = (a: { appendPlaceholder: string })  => html`<sy-tree line><sy-tree-item appendable .appendPlaceholder=${a.appendPlaceholder} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemIcon              = (a: { icon: string })               => html`<sy-tree line><sy-tree-item icon=${ifDefined(a.icon)} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemIndeterminate     = (a: { indeterminate: boolean })     => html`<sy-tree line><sy-tree-item checkable ?indeterminate=${!!a.indeterminate} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemIsDescendant      = (a: { isDescendant: boolean })      => html`<sy-tree line><sy-tree-item .isDescendant=${a.isDescendant} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemIsEditable        = (a: { isEditable: boolean })        => html`<sy-tree line><sy-tree-item .isEditable=${a.isEditable} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemLabel             = (a: { label: string })              => html`<sy-tree line><sy-tree-item label=${ifDefined(a.label)} value="x"></sy-tree-item></sy-tree>`;
export const TreeItemLevel             = (a: { level: number })              => html`<sy-tree line><sy-tree-item .level=${a.level} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemRemovable         = (a: { removable: boolean })         => html`<sy-tree line><sy-tree-item ?removable=${!!a.removable} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemTreeChildren      = (a: { treeChildren: any[] })        => html`<sy-tree line><sy-tree-item .treeChildren=${a.treeChildren} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemTagMessage        = (a: { tagMessage: string })         => html`<sy-tree line><sy-tree-item .tagMessage=${a.tagMessage} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemTagVariant        = (a: { tagVariant: string })         => html`<sy-tree line><sy-tree-item .tagMessage=${'Tag'} .tagVariant=${a.tagVariant} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemValue             = (a: { value: string })              => html`<sy-tree line><sy-tree-item label="Item" value=${ifDefined(a.value)}></sy-tree-item></sy-tree>`;
export const TreeItemSearchTerm        = (a: { searchTerm: string })         => html`<sy-tree line><sy-tree-item .searchTerm=${a.searchTerm} label="Search me please" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemSelectedValue     = (a: { selectedValue: string })      => html`<sy-tree line><sy-tree-item .selectedValue=${a.selectedValue} label="Item" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemNodeWidth         = (a: { nodeWidth: number })          => html`<sy-tree line><sy-tree-item .nodeWidth=${a.nodeWidth} label="A long item label that might overflow its width" value="x"></sy-tree-item></sy-tree>`;
export const TreeItemLine              = (a: { line: boolean })              => html`<sy-tree line><sy-tree-item ?line=${!!a.line} label="Item" value="x"></sy-tree-item></sy-tree>`;

// tree-item events
const renderItemEvent = (resultId: string, eventName: string) => {
  const handle = (e: Event) => {
    const out = document.getElementById(resultId);
    if (out) out.textContent = `${eventName}: ${JSON.stringify((e as CustomEvent).detail)}`;
  };
  return html`
    <sy-tree line>
      <sy-tree-item editable checkable expandable label="Item" value="x"
        @expandChanged=${eventName === 'expandChanged' ? handle : undefined}
        @checkChanged=${eventName === 'checkChanged' ? handle : undefined}
        @itemAdded=${eventName === 'itemAdded' ? handle : undefined}
        @itemRemoved=${eventName === 'itemRemoved' ? handle : undefined}
        @itemEdited=${eventName === 'itemEdited' ? handle : undefined}
        @itemUpdating=${eventName === 'itemUpdating' ? handle : undefined}
        @itemUpdatingReset=${eventName === 'itemUpdatingReset' ? handle : undefined}
        @itemDrop=${eventName === 'itemDrop' ? handle : undefined}
        @itemSelected=${eventName === 'itemSelected' ? handle : undefined}
        @draggingEvent=${eventName === 'draggingEvent' ? handle : undefined}>
      </sy-tree-item>
    </sy-tree>
    <p id=${resultId}>(idle)</p>
  `;
};

export const TreeItemExpandChanged     = () => renderItemEvent('iECResult', 'expandChanged');
export const TreeItemCheckChanged      = () => renderItemEvent('iCCResult', 'checkChanged');
export const TreeItemItemAdded         = () => renderItemEvent('iIAResult', 'itemAdded');
export const TreeItemItemRemoved       = () => renderItemEvent('iIRResult', 'itemRemoved');
export const TreeItemItemEdited        = () => renderItemEvent('iIEResult', 'itemEdited');
export const TreeItemItemUpdating      = () => renderItemEvent('iIUResult', 'itemUpdating');
export const TreeItemItemUpdatingReset = () => renderItemEvent('iIURResult', 'itemUpdatingReset');
export const TreeItemItemDrop          = () => renderItemEvent('iIDResult', 'itemDrop');
export const TreeItemItemSelected      = () => renderItemEvent('iISeResult', 'itemSelected');
export const TreeItemDraggingEvent     = () => renderItemEvent('iDEResult', 'draggingEvent');

// tree-item methods
export const TreeItemSetOverflow = () => {
  const iRef: Ref<HTMLSyTreeItemElement> = createRef();
  return html`
    <sy-tree line>
      <sy-tree-item ${ref(iRef)} label="A very long item label that overflows in constrained width" value="x" .nodeWidth=${100}></sy-tree-item>
    </sy-tree><br/>
    <sy-button @click=${async () => {
      if (!iRef.value) return;
      await iRef.value.setOverflow();
      const out = document.getElementById('iSOResult');
      if (out) out.textContent = 'triggered';
    }}>setOverflow()</sy-button>
    <p id="iSOResult">(idle)</p>
  `;
};
