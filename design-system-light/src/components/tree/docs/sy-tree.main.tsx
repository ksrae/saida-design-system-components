import { html, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyTreeProps extends Components.SyTree {
  slot?: any;
  nodesChanged?: (e: CustomEvent<any>) => void;
  itemChecked?: (e: CustomEvent<any>) => void;
  itemSelected?: (e: CustomEvent<any>) => void;
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

// Long-label sample for the nodeWidth/overflow demo — labels need to be
// wider than nodeWidth for ellipsis + hover-tooltip to actually trigger.
const overflowNodes = [
  { label: 'Project Alpha — long descriptive name that overflows', value: 'p-alpha', children: [
    { label: 'Project Alpha sub-task with another lengthy title', value: 'p-alpha-1' },
    { label: 'Project Alpha review meeting scheduled for next week', value: 'p-alpha-2' },
  ]},
  { label: 'Project Beta — equally long title for ellipsis demo', value: 'p-beta', children: [
    { label: 'Project Beta milestone tracking spreadsheet', value: 'p-beta-1' },
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
    .searchTerm=${a.searchTerm}>
  </sy-tree>
`;

// Tree attr demos
export const TreeNodes          = (args: { nodes: any[] })           => html`<sy-tree expandAll .nodes=${(args.nodes && args.nodes.length > 0) ? args.nodes : sampleNodes}></sy-tree>`;
export const TreeCheckable      = (args: { checkable: boolean })     => html`<sy-tree expandAll ?checkable=${!!args.checkable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeClickable      = (args: { clickable: boolean })     => html`<sy-tree expandAll ?clickable=${!!args.clickable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeTreeDraggable  = (args: { treeDraggable: boolean }) => html`<sy-tree expandAll .treeDraggable=${args.treeDraggable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeEditable       = (args: { editable: boolean })      => html`<sy-tree expandAll ?editable=${!!args.editable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeExpandable     = (args: { expandable: boolean })    => html`<sy-tree ?expandable=${!!args.expandable} .nodes=${sampleNodes}></sy-tree>`;
export const TreeExpandAll      = (args: { expandAll: boolean })     => html`<sy-tree .expandAll=${args.expandAll} .nodes=${sampleNodes}></sy-tree>`;
export const TreeLine           = (args: { line: boolean })          => html`<sy-tree expandAll ?line=${!!args.line} .nodes=${sampleNodes}></sy-tree>`;
export const TreeNodeWidth      = (args: { nodeWidth: number })      => html`<sy-tree expandAll .nodeWidth=${args.nodeWidth} .nodes=${overflowNodes}></sy-tree>`;
export const TreeSelectedValue  = (args: { selectedValue: string })  => html`<sy-tree expandAll clickable .selectedValue=${args.selectedValue} .nodes=${sampleNodes}></sy-tree>`;
export const TreeSearchTerm     = (args: { searchTerm: string })     => html`<sy-tree expandAll .searchTerm=${args.searchTerm} .nodes=${sampleNodes}></sy-tree>`;

// ManualAdd / ManualRemove — demonstrate the workflow where the tree does not
// commit add/remove on its own. The story listens for itemAdded / itemRemoved
// from sy-tree-item, opens a sy-modal to confirm, and only then calls the
// matching manual* method on sy-tree.
export const TreeManualAdd = (args: { manualAdd: boolean }) => {
  const treeRef: Ref<HTMLSyTreeElement> = createRef();
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  let pending: { parentValue: string; childLabel: string; childValue: string } | null = null;
  return html`
    <sy-tree
      ${ref(treeRef)}
      editable expandAll
      .manualAdd=${args.manualAdd}
      .nodes=${sampleNodes}
      @itemAdded=${(e: CustomEvent<any>) => {
        if (!args.manualAdd) return; // tree auto-adds on its own
        pending = e.detail;
        modalRef.value?.setOpen();
      }}>
    </sy-tree>
    <sy-modal
      ${ref(modalRef)}
      okText="Add"
      cancelText="Cancel"
      @closed=${async (e: CustomEvent<any>) => {
        if (e.detail.event === 'ok' && pending && treeRef.value) {
          await treeRef.value.manualAddChildNode(pending.parentValue, pending.childLabel, pending.childValue);
        }
        pending = null;
      }}>
      <div slot="header">Add child?</div>
      <div slot="body">Add this child to the tree? Cancel to discard.</div>
    </sy-modal>
  `;
};

export const TreeManualRemove = (args: { manualRemove: boolean }) => {
  const treeRef: Ref<HTMLSyTreeElement> = createRef();
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  let pending: { value: string; label: string } | null = null;
  return html`
    <sy-tree
      ${ref(treeRef)}
      editable expandAll
      .manualRemove=${args.manualRemove}
      .nodes=${sampleNodes}
      @itemRemoved=${(e: CustomEvent<any>) => {
        if (!args.manualRemove) return;
        pending = e.detail;
        modalRef.value?.setOpen();
      }}>
    </sy-tree>
    <sy-modal
      ${ref(modalRef)}
      okText="Remove"
      cancelText="Cancel"
      @closed=${async (e: CustomEvent<any>) => {
        if (e.detail.event === 'ok' && pending && treeRef.value) {
          await treeRef.value.manualRemoveNode(pending.value);
        }
        pending = null;
      }}>
      <div slot="header">Remove item?</div>
      <div slot="body">Remove this item from the tree? Cancel to keep it.</div>
    </sy-modal>
  `;
};

// Tree events
export const TreeNodesChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('tNCResult');
    if (out) out.textContent = `nodesChanged: ${JSON.stringify((e as CustomEvent).detail)}`;
  };
  // editable so the user can trigger nodesChanged via add/remove/edit.
  return html`<sy-tree editable expandAll .nodes=${sampleNodes} @nodesChanged=${handle}></sy-tree><p id="tNCResult">(idle)</p>`;
};

export const TreeItemCheckedEvent = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('tICResult');
    if (out) out.textContent = `itemChecked: ${JSON.stringify((e as CustomEvent).detail)}`;
  };
  return html`<sy-tree checkable expandAll .nodes=${sampleNodes} @itemChecked=${handle}></sy-tree><p id="tICResult">(idle)</p>`;
};

export const TreeItemSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('tISResult');
    if (out) out.textContent = `itemSelected: ${JSON.stringify((e as CustomEvent).detail)}`;
  };
  // clickable (selection requires it) but not checkable — itemSelected is the
  // click-selection signal, separate from checkbox toggling.
  return html`<sy-tree clickable expandAll .nodes=${sampleNodes} @itemSelected=${handle}></sy-tree><p id="tISResult">(idle)</p>`;
};

// Tree methods — each story instantiates its own sy-tree, leveraging
// expandAll so children (and the methods' effects on them) are visible.

// setCheckState — listen to nodesChanged so the user can see the actual emit
// payload (a fresh updatedNodes array). Previously the test just hardcoded
// "set" which told the user nothing about what came out of the event.
export const TreeSetCheckState = () => {
  const tRef: Ref<HTMLSyTreeElement> = createRef();
  const outId = `tSCSResult`;
  const onNodesChanged = (e: Event) => {
    const out = document.getElementById(outId);
    if (out) out.textContent = `nodesChanged: ${JSON.stringify((e as CustomEvent).detail)}`;
  };
  return html`
    <sy-tree ${ref(tRef)} checkable editable expandAll
      .manualAdd=${true} .manualRemove=${true}
      .nodes=${sampleNodes}
      @nodesChanged=${onNodesChanged}>
    </sy-tree><br/>
    <sy-button @click=${async () => { await tRef.value?.setCheckState('apple', true); }}>setCheckState("apple", true)</sy-button>
    <p id=${outId}>(idle)</p>
  `;
};

export const TreeClearAllSelectedItem = () => {
  const tRef: Ref<HTMLSyTreeElement> = createRef();
  return html`
    <sy-tree ${ref(tRef)} checkable editable expandAll .nodes=${sampleNodes}></sy-tree><br/>
    <sy-button @click=${async () => { await tRef.value?.clearAllSelectedItem(); const out = document.getElementById('tCASResult'); if (out) out.textContent = 'cleared'; }}>clearAllSelectedItem()</sy-button>
    <p id="tCASResult">(idle)</p>
  `;
};

export const TreeManualAddChildNode = () => {
  const tRef: Ref<HTMLSyTreeElement> = createRef();
  return html`
    <sy-tree ${ref(tRef)} editable expandAll .manualAdd=${true} .nodes=${sampleNodes}></sy-tree><br/>
    <sy-button @click=${async () => { await tRef.value?.manualAddChildNode('fruits', 'Mango', 'mango'); const out = document.getElementById('tMACResult'); if (out) out.textContent = 'added'; }}>manualAddChildNode("fruits","Mango")</sy-button>
    <p id="tMACResult">(idle)</p>
  `;
};

export const TreeManualRemoveNode = () => {
  const tRef: Ref<HTMLSyTreeElement> = createRef();
  return html`
    <sy-tree ${ref(tRef)} editable expandAll .manualRemove=${true} .nodes=${sampleNodes}></sy-tree><br/>
    <sy-button @click=${async () => { await tRef.value?.manualRemoveNode('apple'); const out = document.getElementById('tMRNResult'); if (out) out.textContent = 'removed'; }}>manualRemoveNode("apple")</sy-button>
    <p id="tMRNResult">(idle)</p>
  `;
};

export const TreeFindNode = () => {
  const tRef: Ref<HTMLSyTreeElement> = createRef();
  return html`
    <sy-tree ${ref(tRef)} expandAll .nodes=${sampleNodes}></sy-tree><br/>
    <sy-button @click=${async () => { const r = await tRef.value?.findNode((tRef.value as any).nodes, 'apple'); const out = document.getElementById('tFNResult'); if (out) out.textContent = JSON.stringify(r); }}>findNode(nodes,"apple")</sy-button>
    <p id="tFNResult">(idle)</p>
  `;
};
