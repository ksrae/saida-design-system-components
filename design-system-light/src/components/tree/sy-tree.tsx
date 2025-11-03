import { Component, Prop, State, Event, EventEmitter, h, Element, Watch, Method } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

export interface TreeNode {
  appendable?: boolean;
  appendPlaceholder?: string;
  checked?: boolean;
  children?: TreeNode[];
  clickable?: boolean;
  disabled?: boolean;
  editable?: boolean;
  expanded?: boolean;
  fixed?: boolean;
  icon?: string;
  indeterminate?: boolean;
  label: string;
  removable?: boolean;
  tagMessage?: string;
  tagVariant?: "gray" | "purple" | "blue" | "green" | "cyan" | "yellow" | "orange" | "red";
  value: string;
}

@Component({
  tag: 'sy-tree',
  styleUrl: 'sy-tree.scss',
  shadow: false,
  scoped: true,
})
export class SyTree {
  @Element() host: HTMLSyTreeElement;

  // --- Props ---
  @Prop({ mutable: true }) nodes: TreeNode[] = [];
  @Prop() checkable = false;
  @Prop() clickable = false;
  @Prop({ attribute: 'draggable' }) treeDraggable = false;
  @Prop() editable = false;
  @Prop() expandable = false;
  @Prop({ attribute: 'expandAll', mutable: true }) expandAll = false;
  @Prop({ attribute: 'manualAdd', mutable: true }) manualAdd = false;
  @Prop({ attribute: 'manualRemove', mutable: true }) manualRemove = false;
  @Prop() line = false;
  @Prop({ attribute: 'nodeWidth', mutable: true }) nodeWidth: number | null = null;
  @Prop({ attribute: 'selectedValue', mutable: true }) selectedValue = '';
  @Prop({ attribute: 'searchTerm', mutable: true }) searchTerm: string = '';
  @Prop({ attribute: 'isTreeSelect', mutable: true }) isTreeSelect: boolean = false;

  // --- State ---
  @State() private updatedNodes: TreeNode[] = [];
  @State() private isUpdating = false;

  private debounceTimeout: any;
  private draggNode!: TreeNode;

  // --- Events ---
  @Event() nodesChanged: EventEmitter<{ nodes: TreeNode[] }>;
  @Event() itemChecked: EventEmitter<{ value: string; label: string; checked: boolean }>;
  @Event() itemSelected: EventEmitter<{ value: string; label: string; checked: boolean }>;

  // --- Public Methods ---
  @Method()
  async setCheckState(value: string, checked: boolean) {
    if (!this.checkable) {
      return;
    }

    const stateChanged = this.updateTree(this.updatedNodes, value, checked);

    if (stateChanged) {
      this.emitNodesChanged();
    }
  }

  @Method()
  async clearAllSelectedItem() {
    this.selectedValue = '';

    const children = this.host.querySelectorAll('sy-tree-item');
    children?.forEach(child => {
      (child as any).active = false;
    });

    if (this.checkable) {
      this.clearAllChecked(this.nodes);
      this.clearAllChecked(this.updatedNodes);
      this.emitNodesChanged();
    }
  }

  @Method()
  async manualAddChildNode(parentValue: string, childLabel: string, childValue?: string) {
    const child: TreeNode = {
      label: childLabel ?? '',
      value: childValue ?? Date.now().toString(),
      children: [],
      checked: false,
      indeterminate: false,
      appendable: this.editable,
      removable: this.editable,
      editable: this.editable,
      clickable: this.clickable,
    };

    const { node: parentNode } = this.findNodeAndParent(this.updatedNodes, parentValue);
    if (parentNode?.checked) {
      child.checked = true;
    }

    this.addChildNode(this.updatedNodes, parentValue, child);
    this.updateParentCheckState(this.updatedNodes, parentValue);

    this.updatedNodes = [...this.updatedNodes];
    this.updateNodes();
    this.isUpdating = false;

    this.emitNodesChanged();
  }

  @Method()
  async manualRemoveNode(value: string) {
    this.removeNode(value);
  }

  @Method()
  async findNode(nodes: TreeNode[], value: string): Promise<TreeNode | null> {
    for (const node of nodes) {
      if (node.value?.toString() === value?.toString()) {
        return node;
      }
      if (node.children) {
        const result = await this.findNode(node.children, value);
        if (result) return result;
      }
    }
    return null;
  }

  // --- Lifecycle Methods ---
  componentWillLoad() {
    this.expandAll = fnAssignPropFromAlias(this.host, 'expand-all') ?? this.expandAll;
    this.manualAdd = fnAssignPropFromAlias(this.host, 'manual-add') ?? this.manualAdd;
    this.manualRemove = fnAssignPropFromAlias(this.host, 'manual-remove') ?? this.manualRemove;
    this.nodeWidth = fnAssignPropFromAlias(this.host, 'node-width') ?? this.nodeWidth;
    this.selectedValue = fnAssignPropFromAlias(this.host, 'selected-value') ?? this.selectedValue;
    this.searchTerm = fnAssignPropFromAlias(this.host, 'searchTerm') ?? this.searchTerm;
    this.isTreeSelect = fnAssignPropFromAlias(this.host, 'is-tree-select') ?? this.isTreeSelect;

    let nodes = this.updateTreeCheckState(this.nodes);
    if (this.expandAll) {
      nodes = nodes.map(node => this.expandNode(node));
    }
    this.updatedNodes = nodes;
  }

  componentDidLoad() {
    this.emitNodesChanged();
  }

  // --- Watchers ---
  @Watch('expandable')
  @Watch('expandAll')
  @Watch('nodes')
  handleNodesChange() {
    // 항상 nodes/expandAll이 바뀌면 updatedNodes를 재생성
    if (this.nodes && this.nodes.length > 0) {
      let nodes = this.updateTreeCheckState(this.nodes);
      if (this.expandAll) {
        nodes = nodes.map(node => this.expandNode(node));
      } else if (this.selectedValue) {
        // expandAll이 아니고 selectedValue가 있으면 부모만 펼침
        this.updatedNodes = nodes;
        this.expandParentNodesForSelectedValue(this.selectedValue);
        return;
      }
      this.updatedNodes = nodes;
    }
  }

  @Watch('searchTerm')
  handleSearchTermChange() {
    console.log('[Tree] searchTerm changed:', this.searchTerm, 'isTreeSelect:', this.isTreeSelect);
    if (this.isTreeSelect) {
      this.updatedNodes = this.filterNodes(this.nodes, this.searchTerm);
      console.log('[Tree] updatedNodes after filter:', this.updatedNodes);
    }
  }

  @Watch('checkable')
  handleCheckableChange() {
    if (this.checkable) {
      this.selectedValue = '';
    }
  }

  @Watch('selectedValue')
  handleSelectedValueChange() {
    if (!this.expandAll && this.selectedValue) {
      this.expandParentNodesForSelectedValue(this.selectedValue);
    }

    const allItems = this.host.querySelectorAll('sy-tree-item');
    if (allItems) {
      allItems.forEach(item => {
        (item as any).selectedValue = this.selectedValue;
      });
    }
  }

  @Watch('nodeWidth')
  handleNodeWidthChange() {
    if (this.nodeWidth) {
      setTimeout(() => {
        this.triggerOverflowCheckForAllItems();
      }, 0);
    }
  }

  // --- Render Methods ---
  private renderTree(nodes: TreeNode[], level = 0) {
    return nodes?.map((node, index) => {
      const shouldAddDropZoneAbove = this.checkCondition(node, index, nodes);

      return [
        shouldAddDropZoneAbove ? (
          <div
            class="drop-zone"
            onDragOver={(e) => this.handleDragOver(e, 'above', node.value, level)}
            onDragLeave={this.treeDraggable ? this.handleDragLeave.bind(this) : undefined}
            onDrop={(e) => this.treeDraggable ? this.handleDrop(e, 'above', node.value, level) : undefined}
            data-position="above"
          ></div>
        ) : null,
        <sy-tree-item
          line={this.line}
          label={node.label}
          value={node.value}
          icon={node.icon ?? ''}
          appendPlaceholder={node.appendPlaceholder ?? ''}
          tagMessage={node.tagMessage ?? ''}
          tagVariant={node.tagVariant ?? undefined}
          expanded={node.expanded ?? false}
          checked={node.checked ?? false}
          indeterminate={node.indeterminate ?? false}
          hasChild={node.children && node.children.length > 0}
          checkable={this.checkable}
          expandable={this.expandable}
          level={level}
          searchTerm={this.searchTerm}
          isEditable={this.editable && !this.isUpdating}
          appendable={node.appendable ?? this.editable}
          removable={node.removable ?? this.editable}
          editable={node.editable ?? this.editable}
          fixed={node.fixed ?? false}
          disabled={node.disabled ?? false}
          draggable={this.treeDraggable}
          clickable={this.clickable ? (node.clickable ?? true) : false}
          selectedValue={this.selectedValue?.toString().toLowerCase()}
          nodeWidth={this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null}
          treeChildren={node.children ? this.renderTree(node.children, level + 1) : []}
          onDragStart={(e) => this.handleDragStart(e, node)}
          onDragOver={(e) => this.handleItemDragOver(e, node)}
          onDrop={(e) => this.handleDirectDrop(e, node)}
          onExpandChanged={this.handleExpandChanged.bind(this)}
          onCheckChanged={this.handleCheckChanged.bind(this)}
          onItemAdded={this.handleAddItem.bind(this)}
          onItemRemoved={this.handleRemoveItem.bind(this)}
          onItemEdited={this.handleEditItem.bind(this)}
          onItemUpdating={this.handleUpdatingItem.bind(this)}
          onItemUpdatingReset={this.handleUpdatingResetItem.bind(this)}
          onItemDrop={this.treeDraggable && !node.disabled ? this.handleItemDrop.bind(this) : undefined}
          onItemSelected={this.handleItemSelected.bind(this)}
        ></sy-tree-item>,
        <div
          class="drop-zone"
          onDragOver={(e) => this.handleDragOver(e, 'below', node.value, level)}
          onDragLeave={this.treeDraggable ? this.handleDragLeave.bind(this) : undefined}
          onDrop={(e) => this.treeDraggable ? this.handleDrop(e, 'below', node.value, level) : undefined}
          data-position="below"
        ></div>,
      ];
    });
  }

  render() {
    return this.renderTree(this.updatedNodes, 1);
  }

  // --- Private Methods ---
  private updateTreeCheckState(nodes: TreeNode[]): TreeNode[] {
    const clonedNodes = JSON.parse(JSON.stringify(nodes));

    const applyParentChecked = (node: TreeNode) => {
      if (node.checked) {
        if (node.children) {
          node.children = node.children.map(child => {
            const updatedChild = {
              ...child,
              checked: true,
              indeterminate: false
            };
            if (child.children) {
              applyParentChecked(updatedChild);
            }
            return updatedChild;
          });
        }
      } else if (node.children) {
        node.children.forEach(child => applyParentChecked(child));
      }
    };

    const updateParentState = (node: TreeNode): { checked: boolean, indeterminate: boolean } => {
      if (!node.children || node.children.length === 0) {
        return { checked: node.checked || false, indeterminate: false };
      }

      const childStates = node.children.map(child => updateParentState(child));

      if (node.checked) {
        return { checked: true, indeterminate: false };
      }

      const allChecked = childStates.every(state => state.checked);
      const someChecked = childStates.some(state => state.checked);
      const someIndeterminate = childStates.some(state => state.indeterminate);

      if (allChecked) {
        node.checked = true;
        node.indeterminate = false;
      } else if (someChecked || someIndeterminate) {
        node.checked = false;
        node.indeterminate = true;
      } else {
        node.checked = false;
        node.indeterminate = false;
      }

      return { checked: node.checked, indeterminate: node.indeterminate };
    };

    clonedNodes.forEach((node: TreeNode) => {
      applyParentChecked(node);
      updateParentState(node);
    });

    return clonedNodes;
  }

  private handleAddItem(e: CustomEvent) {
    e.preventDefault();
    const { parentValue, childLabel, childValue } = e.detail;

    if (!this.manualAdd) {
      const child: TreeNode = {
        label: childLabel ?? '',
        value: childValue ?? Date.now().toString(),
        children: [],
        checked: false,
        indeterminate: false,
        appendable: this.editable,
        removable: this.editable,
        editable: this.editable,
        clickable: this.clickable,
      };

      const { node: parentNode } = this.findNodeAndParent(this.updatedNodes, parentValue);
      if (parentNode?.checked) {
        child.checked = true;
      }

      this.addChildNode(this.updatedNodes, parentValue, child);
      this.updateParentCheckState(this.updatedNodes, parentValue);

      this.updatedNodes = [...this.updatedNodes];
      this.updateNodes();
      this.isUpdating = false;

      this.emitNodesChanged();
    }
  }

  private handleEditItem(e: CustomEvent) {
    const { value, label } = e.detail;

    const { node: targetNode } = this.findNodeAndParent(this.updatedNodes, value);
    if (targetNode) {
      const prevChecked = targetNode.checked;
      const prevIndeterminate = targetNode.indeterminate;
      const prevExpanded = targetNode.expanded;

      targetNode.label = label;

      targetNode.checked = prevChecked;
      targetNode.indeterminate = prevIndeterminate;
      targetNode.expanded = prevExpanded;
    }

    this.isUpdating = false;
    this.emitNodesChanged();
  }

  private handleUpdatingItem(e: CustomEvent) {
    e.stopPropagation();
    this.isUpdating = true;
  }

  private handleUpdatingResetItem(e: CustomEvent) {
    e.stopPropagation();
    this.isUpdating = false;
  }

  private updateParentCheckState(nodes: TreeNode[], value: string) {
    const { parent } = this.findNodeAndParent(nodes, value);
    if (parent) {
      this.updateParentState([parent]);
      this.updateParentCheckState(nodes, parent.value);
    }
  }

  private handleItemSelected(e: CustomEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (e.target) {
      this.selectedValue = e.detail.value;

      if (this.clickable) {
        this.itemSelected.emit(e.detail);
      }
    }
  }

  private handleRemoveItem(e: CustomEvent) {
    const { value } = e.detail;

    if (!this.manualRemove) {
      this.removeNode(value);
      this.emitNodesChanged();
    }
  }

  private removeNode(value: string) {
    const { parent: parentNode } = this.findNodeAndParent(this.updatedNodes, value);

    this.removeNodeByValue(this.updatedNodes, value);

    if (parentNode) {
      this.updateParentState([parentNode]);
      this.updateTree(this.updatedNodes, parentNode.value, parentNode.checked ?? false);
    }
  }

  private addChildNode(nodes: TreeNode[], parentValue: string, child: TreeNode): TreeNode | null {
    for (const node of nodes) {
      if (node.value?.toString() === parentValue?.toString()) {
        if (!node.children) {
          node.children = [];
        }

        if (!node.children.some(c => c.value?.toString() === child.value?.toString())) {
          child.appendable = child.appendable ?? true;
          child.editable = child.editable ?? true;
          child.removable = child.removable ?? true;

          node.children.push(child);

          if (node.checked) {
            child.checked = true;
            this.updateChildren(child, true);
          }
        }
        return node;
      }

      if (node.children) {
        const result = this.addChildNode(node.children, parentValue, child);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  private removeNodeByValue(nodes: TreeNode[], value: string) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].value?.toString() === value?.toString()) {
        nodes.splice(i, 1);
        return;
      }
      if (nodes[i].children !== undefined) {
        this.removeNodeByValue(nodes[i].children as TreeNode[], value);
      }
    }
  }

  private updateNodes() {
    if (typeof this.nodes === 'string') {
      this.nodes = JSON.parse(this.nodes as any);
    }

    const nodes = this.nodes?.map(node => this.expandNode(node));

    const expandedStateMap = new Map();
    this.collectExpandedState(this.updatedNodes, expandedStateMap);

    this.updatedNodes = this.updatedNodes.map(updatedNode => {
      const exist = nodes?.find(node => node.value?.toString() === updatedNode.value?.toString());

      const savedExpandedState = expandedStateMap.get(updatedNode.value?.toString());
      if (exist && savedExpandedState !== undefined) {
        updatedNode.expanded = savedExpandedState;
      } else if (exist) {
        updatedNode.expanded = exist.expanded;
      }

      if (updatedNode.children) {
        updatedNode.children = updatedNode.children.map(child => {
          const childExist = nodes?.find(node => node.value?.toString() === child.value?.toString());
          const childSavedState = expandedStateMap.get(child.value?.toString());

          if (childSavedState !== undefined) {
            child.expanded = childSavedState;
          } else if (childExist) {
            child.expanded = childExist.expanded;
          }

          return child;
        });
      }

      return updatedNode;
    });
  }

  private collectExpandedState(nodes: TreeNode[], stateMap: Map<string, boolean>) {
    if (!nodes) return;

    for (const node of nodes) {
      if (node.value) {
        stateMap.set(node.value.toString(), !!node.expanded);
      }
      if (node.children) {
        this.collectExpandedState(node.children, stateMap);
      }
    }
  }

  private expandNode(node: TreeNode): TreeNode {
    let shouldExpand: boolean;

    if (this.expandAll) {
      shouldExpand = true;
    } else if (this.expandable) {
      shouldExpand = node.expanded ?? false;
    } else {
      shouldExpand = false;
    }

    const newNode = {
      ...node,
      expanded: shouldExpand
    };

    if (Array.isArray(node.children)) {
      newNode.children = node.children.map((child: TreeNode) => this.expandNode(child));
    }

    return newNode;
  }

  private handleCheckChanged(e: CustomEvent) {
    e.stopPropagation();

    const { value, label, checked } = e.detail;

    this.itemChecked.emit({ value, label, checked });

    const stateChanged = this.updateTree(this.updatedNodes, value, checked);

    if (stateChanged) {
      this.emitNodesChanged();
    }
  }

  private handleExpandChanged(e: CustomEvent) {
    const { value, expanded } = e.detail;
    this.updateNodeProperty(value, 'expanded', expanded);

    if (expanded && this.nodeWidth) {
      setTimeout(() => {
        this.triggerOverflowCheckForAllItems();
      }, 0);
    }
  }

  private triggerOverflowCheckForAllItems() {
    if (!this.nodeWidth) return;

    const treeItems = this.host.querySelectorAll('sy-tree-item');
    if (treeItems) {
      treeItems.forEach((item: any) => {
        if (item.setOverflow) {
          item.setOverflow();
        }
      });
    }
  }

  private handleDragStart(e: DragEvent, node: TreeNode) {
    e.stopPropagation();

    if (node.disabled || !this.treeDraggable) {
      e.preventDefault();
      return;
    }

    this.draggNode = node;
  }

  private handleDragOver(e: DragEvent, position: 'above' | 'on' | 'below', nodeKey: string, _level: number) {
    if (!this.treeDraggable) return;

    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer!.dropEffect = 'move';

    const { node: draggedNode } = this.findNodeAndParent(this.updatedNodes, this.draggNode.value);
    const { node: targetNode } = this.findNodeAndParent(this.updatedNodes, nodeKey);
    const isDescendant = this.isDescendant(draggedNode, targetNode);

    if (draggedNode && targetNode && isDescendant) {
      (e.target as any).dataset.dragging = 'not-allowed';
      return;
    }

    const dropZone = e.target as HTMLElement;
    dropZone.dataset.dragging = position;
  }

  private handleItemDragOver(e: DragEvent, node: TreeNode) {
    if (!this.treeDraggable) return;

    e.preventDefault();
    e.stopPropagation();

    if (node.disabled) {
      e.dataTransfer!.dropEffect = 'none';
      (e.target as any).dataset.dragging = 'not-allowed';
      return;
    }

    const isDescendant = this.isDescendant(this.draggNode, node);

    if (isDescendant) {
      e.dataTransfer!.dropEffect = 'none';
      (e.target as any).dataset.dragging = 'not-allowed';
      const treeItems = this.host.querySelectorAll('sy-tree-item');

      treeItems?.forEach(item => {
        const currentNode = (item as unknown as TreeNode);
        if (currentNode.value && (currentNode.value?.toString() === this.draggNode.value?.toString() || currentNode.value?.toString() === node?.value?.toString())) {
          (item as any).isDescendant = true;
        } else {
          (item as any).isDescendant = false;
        }
      });
    } else {
      e.dataTransfer!.dropEffect = 'move';
      const treeItems = this.host.querySelectorAll('sy-tree-item');

      treeItems?.forEach(item => {
        (item as any).isDescendant = false;
      });
    }
  }

  private handleDrop(e: DragEvent, position: 'above' | 'below', targetKey: string, level: number) {
    if (!this.treeDraggable) return;

    e.preventDefault();
    const dropZone = e.target as HTMLElement;
    dropZone.dataset.dragging = '';
    dropZone.style.marginLeft = '0';

    const dragData = e.dataTransfer?.getData('application/json');
    if (dragData) {
      const { value: draggedKey } = JSON.parse(dragData);
      if (draggedKey && draggedKey !== targetKey) {
        this.moveNode(draggedKey, targetKey, position, level);
      }
    }
  }

  private handleItemDrop(e: CustomEvent) {
    const { targetKey, draggedKey, dropPosition, targetLevel } = e.detail;
    this.moveNode(draggedKey, targetKey, dropPosition, targetLevel);
  }

  private handleDirectDrop(e: DragEvent, targetNode: TreeNode) {
    if (!this.treeDraggable || !this.draggNode || targetNode.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    if (this.draggNode.value === targetNode.value || this.isDescendant(targetNode, this.draggNode)) {
      return;
    }

    const { parent: draggedParent } = this.findNodeAndParent(this.updatedNodes, this.draggNode.value);
    if (draggedParent) {
      draggedParent.children = draggedParent.children!.filter(child => child.value !== this.draggNode.value);
    } else {
      this.updatedNodes = this.updatedNodes.filter(node => node.value !== this.draggNode.value);
    }

    if (!targetNode.children) {
      targetNode.children = [];
    }
    targetNode.children.push(this.draggNode);

    targetNode.expanded = true;

    this.emitNodesChanged();
  }

  private handleDragLeave(e: DragEvent) {
    const dropZone = e.target as HTMLElement;
    dropZone.dataset.dragging = '';
    dropZone.style.marginLeft = '0';
  }

  private moveNode(draggedKey: string, targetKey: string, dropPosition: 'above' | 'on' | 'below', _targetLevel: number) {
    const { node: draggedNode, parent: draggedParent } = this.findNodeAndParent(this.updatedNodes, draggedKey);
    const { node: targetNode, parent: targetParent } = this.findNodeAndParent(this.updatedNodes, targetKey);

    const isDescendant = this.isDescendant(draggedNode, targetNode);
    if (!draggedNode || !targetNode || isDescendant) return;

    if (draggedParent) {
      draggedParent.children = draggedParent.children!.filter(child => child.value?.toString() !== draggedKey?.toString());
    } else {
      this.updatedNodes = this.updatedNodes.filter(node => node.value?.toString() !== draggedKey?.toString());
    }

    if (dropPosition === 'above' || dropPosition === 'below') {
      const targetChildren = targetParent ? targetParent.children : this.updatedNodes;
      const targetIndex = targetChildren!.findIndex(child => child.value?.toString() === targetKey?.toString());
      targetChildren!.splice(dropPosition === 'above' ? targetIndex : targetIndex + 1, 0, draggedNode);
    } else if (dropPosition === 'on') {
      targetNode.children = targetNode.children || [];
      targetNode.children.push(draggedNode);
    }

    this.updateTree(this.updatedNodes, draggedKey, draggedNode?.checked ? true : false);
    this.emitNodesChanged();
  }

  private updateTree(nodes: TreeNode[], value: string, checked: boolean): boolean {
    return this.findAndUpdate(nodes, value, checked);
  }

  private clearAllChecked(nodes: TreeNode[]) {
    for (const node of nodes) {
      node.checked = false;
      node.indeterminate = false;

      if (node.children) {
        this.clearAllChecked(node.children);
      }
    }
  }

  private updateNodeProperty(value: string, property: string, expended: any) {
    const updateProperty = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.value?.toString() === value?.toString() && (node as any)[property] !== expended) {
          (node as any)[property] = expended;
          return;
        }
        if (node.children) {
          updateProperty(node.children);
        }
      }
    };
    updateProperty(this.updatedNodes);
  }

  private findNodeAndParent(nodes: TreeNode[], value: string, parent: TreeNode | null = null): { node: TreeNode | null, parent: TreeNode | null } {
    for (const node of nodes) {
      if (node.value?.toString() === value?.toString()) {
        return { node, parent };
      }
      if (node.children) {
        const result = this.findNodeAndParent(node.children, value, node);
        if (result.node) return result;
      }
    }
    return { node: null, parent: null };
  }

  private isDescendant(parent: TreeNode | null, child: TreeNode | null): boolean {
    if (!parent || !child) return false;

    if (parent.children?.some(c => c.value?.toString() === child.value?.toString())) {
      return true;
    }

    return parent.children?.some(c => this.isDescendant(c, child)) ?? false;
  }

  private emitNodesChanged() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.nodes = [...this.updatedNodes];

      this.nodesChanged.emit({ nodes: this.updatedNodes });
    }, 0);
  }

  private updateChildren(node: TreeNode, checked: boolean) {
    node.checked = checked;
    node.indeterminate = false;

    if (node.children) {
      node.children.forEach(child => {
        this.updateChildren(child, checked);
      });
    }
  }

  private checkCondition(node: TreeNode, index: number, nodes: TreeNode[]): boolean {
    const previousNode = nodes[index - 1];
    if (!previousNode || this.getNodeDepth(previousNode) !== this.getNodeDepth(node)) {
      return true;
    }
    return false;
  }

  private getNodeDepth(node: TreeNode): number {
    let depth = 0;
    let currentNode = node;
    while (currentNode && currentNode.value?.toString() !== this.updatedNodes[0].value?.toString()) {
      depth++;
      currentNode = this.findParent(this.updatedNodes, currentNode) as any;
    }
    return depth;
  }

  private findParent(nodes: TreeNode[], childNode: TreeNode, parentNode: TreeNode | null = null): TreeNode | null {
    for (const node of nodes) {
      if (node === childNode) {
        return parentNode;
      }
      if (node.children) {
        const result = this.findParent(node.children, childNode, node);
        if (result) return result;
      }
    }
    return null;
  }

  private findAndUpdate(nodes: TreeNode[], value: string, checked: boolean): boolean {
    let hasChanged = false;
    for (const node of nodes) {
      if (node.value?.toString() === value?.toString()) {
        if (node.checked !== checked) {
          this.updateNodeState(node, checked);
          hasChanged = true;
        }
        return true;
      }
      if (node.children && this.findAndUpdate(node.children, value, checked)) {
        this.updateParentState(nodes);
        hasChanged = true;
        return true;
      }
    }
    return hasChanged;
  }

  private updateNodeState(node: TreeNode, checked: boolean) {
    node.checked = checked;
    node.indeterminate = false;
    if (node.children) {
      node.children.forEach(child => this.updateNodeState(child, checked));
    }
  }

  private updateParentState(nodes: TreeNode[]) {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        const checkedCount = node.children.filter(child => child.checked).length;
        const indeterminateCount = node.children.filter(child => child.indeterminate).length;
        const totalChildren = node.children.length;

        if (checkedCount === totalChildren) {
          node.checked = true;
          node.indeterminate = false;
        } else if (checkedCount === 0 && indeterminateCount === 0) {
          node.checked = false;
          node.indeterminate = false;
        } else {
          node.checked = false;
          node.indeterminate = true;
        }
      }
    }
  }


  private filterNodes(nodes: TreeNode[], searchTerm: string): TreeNode[] {
    if (!this.isTreeSelect) {
      return nodes;
    }

    if (!searchTerm) {
      return nodes.map(node => ({
        ...node,
        expanded: this.expandable ? this.expandAll : true,
        children: node.children ? this.filterNodes(node.children, searchTerm) : []
      }));
    }

    return nodes.map(node => {
      const isMatch = node.label.toLowerCase().includes(searchTerm.toLowerCase());
      const children = node.children ? this.filterNodes(node.children, searchTerm) : [];
      const hasMatchingChildren = this.hasMatchInChildren(children, searchTerm);

      // Expand nodes that match or have matching descendants
      if (isMatch || hasMatchingChildren) {
        return {
          ...node,
          expanded: true, // Always expand on match or when children match
          children
        };
      }

      return {
        ...node,
        expanded: false,
        children
      };
    });
  }

  private hasMatchInChildren(children: TreeNode[], searchTerm: string): boolean {
    if (!children || children.length === 0) return false;

    return children.some(child => {
      const matchInCurrentChild = child.label.toLowerCase().includes(searchTerm.toLowerCase());
      const matchInGrandchildren = this.hasMatchInChildren(child.children || [], searchTerm);
      return matchInCurrentChild || matchInGrandchildren;
    });
  }

  private expandParentNodesForSelectedValue(selectedValue: string) {
    if (!selectedValue) return;

    const selectedValues = selectedValue.split(',').map(val => val.trim());

    selectedValues.forEach(value => {
      if (value) {
        this.expandParentNodesForValue(this.updatedNodes, value);
      }
    });
  }

  private expandParentNodesForValue(nodes: TreeNode[], targetValue: string): boolean {
    if (!nodes) return false;

    for (const node of nodes) {
      if (node.value === targetValue) {
        return true;
      }

      if (node.children && node.children.length > 0) {
        const foundInChildren = this.expandParentNodesForValue(node.children, targetValue);
        if (foundInChildren) {
          node.expanded = true;
          return true;
        }
      }
    }

    return false;
  }
}
