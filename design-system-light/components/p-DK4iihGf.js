import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$7 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$6 } from './p-BTJnmsnM.js';
import { d as defineCustomElement$5 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$4 } from './p-BYla455P.js';
import { d as defineCustomElement$3 } from './p-Bd6oegtc.js';
import { d as defineCustomElement$2 } from './p-C0DM0GPD.js';
import { d as defineCustomElement$1 } from './p-Ddz-dwnl.js';

const syTreeCss = ".sc-sy-tree:root,.sc-sy-tree-h{display:block;overflow:auto}.sc-sy-tree:root .drop-zone.sc-sy-tree,.sc-sy-tree-h .drop-zone.sc-sy-tree{height:3px;position:relative}.sc-sy-tree:root .drop-zone.sc-sy-tree:after,.sc-sy-tree-h .drop-zone.sc-sy-tree:after{content:\"\";position:absolute;top:2px;left:0;right:0;height:1px;background:transparent}.sc-sy-tree:root .drop-zone[data-dragging=above].sc-sy-tree:after,.sc-sy-tree-h .drop-zone[data-dragging=above].sc-sy-tree:after{top:0;left:0px;width:100%;height:1px;background:var(--tree-line-border-enabled)}.sc-sy-tree:root .drop-zone[data-dragging=below].sc-sy-tree:after,.sc-sy-tree-h .drop-zone[data-dragging=below].sc-sy-tree:after{bottom:0;left:0px;width:100%;height:1px;background:var(--tree-line-border-enabled)}";

const SyTree = /*@__PURE__*/ proxyCustomElement(class SyTree extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.nodesChanged = createEvent(this, "nodesChanged");
        this.itemChecked = createEvent(this, "itemChecked");
        this.itemSelected = createEvent(this, "itemSelected");
    }
    get host() { return this; }
    // --- Props ---
    nodes = [];
    checkable = false;
    clickable = false;
    treeDraggable = false;
    editable = false;
    expandable = false;
    expandAll = false;
    manualAdd = false;
    manualRemove = false;
    line = false;
    nodeWidth = null;
    selectedValue = '';
    searchTerm = '';
    isTreeSelect = false;
    // --- State ---
    updatedNodes = [];
    isUpdating = false;
    debounceTimeout;
    draggNode;
    // --- Events ---
    nodesChanged;
    itemChecked;
    itemSelected;
    // --- Public Methods ---
    async setCheckState(value, checked) {
        if (!this.checkable) {
            return;
        }
        const stateChanged = this.updateTree(this.updatedNodes, value, checked);
        if (stateChanged) {
            this.emitNodesChanged();
        }
    }
    async clearAllSelectedItem() {
        this.selectedValue = '';
        const children = this.host.querySelectorAll('sy-tree-item');
        children?.forEach(child => {
            child.active = false;
        });
        if (this.checkable) {
            this.clearAllChecked(this.nodes);
            this.clearAllChecked(this.updatedNodes);
            this.emitNodesChanged();
        }
    }
    async manualAddChildNode(parentValue, childLabel, childValue) {
        const child = {
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
    async manualRemoveNode(value) {
        this.removeNode(value);
    }
    async findNode(nodes, value) {
        for (const node of nodes) {
            if (node.value?.toString() === value?.toString()) {
                return node;
            }
            if (node.children) {
                const result = await this.findNode(node.children, value);
                if (result)
                    return result;
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
    handleNodesChange() {
        // 항상 nodes/expandAll이 바뀌면 updatedNodes를 재생성
        if (this.nodes && this.nodes.length > 0) {
            let nodes = this.updateTreeCheckState(this.nodes);
            if (this.expandAll) {
                nodes = nodes.map(node => this.expandNode(node));
            }
            else if (this.selectedValue) {
                // expandAll이 아니고 selectedValue가 있으면 부모만 펼침
                this.updatedNodes = nodes;
                this.expandParentNodesForSelectedValue(this.selectedValue);
                return;
            }
            this.updatedNodes = nodes;
        }
    }
    handleSearchTermChange() {
        if (this.isTreeSelect) {
            this.updatedNodes = this.filterNodes(this.nodes, this.searchTerm);
        }
    }
    handleCheckableChange() {
        if (this.checkable) {
            this.selectedValue = '';
        }
    }
    handleSelectedValueChange() {
        if (!this.expandAll && this.selectedValue) {
            this.expandParentNodesForSelectedValue(this.selectedValue);
        }
        // DOM이 준비될 때까지 대기
        requestAnimationFrame(() => {
            const allItems = this.host.querySelectorAll('sy-tree-item');
            allItems.forEach((item) => {
                item.selectedValue = this.selectedValue;
                // 직접 active 상태도 설정
                item.active = (item.value?.toString() === this.selectedValue?.toString());
            });
        });
    }
    handleNodeWidthChange() {
        if (this.nodeWidth) {
            setTimeout(() => {
                this.triggerOverflowCheckForAllItems();
            }, 0);
        }
    }
    // --- Render Methods ---
    renderTree(nodes, level = 0) {
        return nodes?.map((node, index) => {
            const shouldAddDropZoneAbove = this.checkCondition(node, index, nodes);
            return [
                shouldAddDropZoneAbove ? (h("div", { class: "drop-zone", onDragOver: (e) => this.handleDragOver(e, 'above', node.value, level), onDragLeave: this.treeDraggable ? this.handleDragLeave.bind(this) : undefined, onDrop: (e) => this.treeDraggable ? this.handleDrop(e, 'above', node.value, level) : undefined, "data-position": "above" })) : null,
                h("sy-tree-item", { line: this.line, label: node.label, value: node.value, icon: node.icon ?? '', appendPlaceholder: node.appendPlaceholder ?? '', tagMessage: node.tagMessage ?? '', tagVariant: node.tagVariant ?? undefined, expanded: node.expanded ?? false, checked: node.checked ?? false, indeterminate: node.indeterminate ?? false, hasChild: node.children && node.children.length > 0, checkable: this.checkable, expandable: this.expandable, level: level, searchTerm: this.searchTerm, isEditable: this.editable && !this.isUpdating, appendable: node.appendable ?? this.editable, removable: node.removable ?? this.editable, editable: node.editable ?? this.editable, fixed: node.fixed ?? false, disabled: node.disabled ?? false, draggable: this.treeDraggable, clickable: this.clickable ? (node.clickable ?? true) : false, selectedValue: this.selectedValue?.toString(), nodeWidth: this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null, treeChildren: node.children ? this.renderTree(node.children, level + 1) : [], onDragStart: (e) => this.handleDragStart(e, node), onDragOver: (e) => this.handleItemDragOver(e, node), onDrop: (e) => this.handleDirectDrop(e, node), onExpandChanged: this.handleExpandChanged.bind(this), onCheckChanged: this.handleCheckChanged.bind(this), onItemAdded: this.handleAddItem.bind(this), onItemRemoved: this.handleRemoveItem.bind(this), onItemEdited: this.handleEditItem.bind(this), onItemUpdating: this.handleUpdatingItem.bind(this), onItemUpdatingReset: this.handleUpdatingResetItem.bind(this), onItemDrop: this.treeDraggable && !node.disabled ? this.handleItemDrop.bind(this) : undefined, onItemSelected: (e) => { this.handleItemSelected(e); } }),
                h("div", { class: "drop-zone", onDragOver: (e) => this.handleDragOver(e, 'below', node.value, level), onDragLeave: this.treeDraggable ? this.handleDragLeave.bind(this) : undefined, onDrop: (e) => this.treeDraggable ? this.handleDrop(e, 'below', node.value, level) : undefined, "data-position": "below" }),
            ];
        });
    }
    render() {
        return this.renderTree(this.updatedNodes, 0);
    }
    // --- Private Methods ---
    updateTreeCheckState(nodes) {
        const clonedNodes = JSON.parse(JSON.stringify(nodes));
        const applyParentChecked = (node) => {
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
            }
            else if (node.children) {
                node.children.forEach(child => applyParentChecked(child));
            }
        };
        const updateParentState = (node) => {
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
            }
            else if (someChecked || someIndeterminate) {
                node.checked = false;
                node.indeterminate = true;
            }
            else {
                node.checked = false;
                node.indeterminate = false;
            }
            return { checked: node.checked, indeterminate: node.indeterminate };
        };
        clonedNodes.forEach((node) => {
            applyParentChecked(node);
            updateParentState(node);
        });
        return clonedNodes;
    }
    handleAddItem(e) {
        e.preventDefault();
        const { parentValue, childLabel, childValue } = e.detail;
        if (!this.manualAdd) {
            const child = {
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
    handleEditItem(e) {
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
    handleUpdatingItem(e) {
        const customEvent = e;
        customEvent.stopPropagation();
        this.isUpdating = true;
    }
    handleUpdatingResetItem(e) {
        e.stopPropagation();
        this.isUpdating = false;
    }
    updateParentCheckState(nodes, value) {
        const { parent } = this.findNodeAndParent(nodes, value);
        if (parent) {
            this.updateParentState([parent]);
            this.updateParentCheckState(nodes, parent.value);
        }
    }
    handleItemSelected(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.target) {
            this.selectedValue = e.detail.value;
            if (this.clickable) {
                this.itemSelected.emit(e.detail);
            }
        }
    }
    handleRemoveItem(e) {
        const { value } = e.detail;
        if (!this.manualRemove) {
            this.removeNode(value);
            this.emitNodesChanged();
        }
    }
    removeNode(value) {
        const { parent: parentNode } = this.findNodeAndParent(this.updatedNodes, value);
        this.removeNodeByValue(this.updatedNodes, value);
        if (parentNode) {
            this.updateParentState([parentNode]);
            this.updateTree(this.updatedNodes, parentNode.value, parentNode.checked ?? false);
        }
    }
    addChildNode(nodes, parentValue, child) {
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
    removeNodeByValue(nodes, value) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].value?.toString() === value?.toString()) {
                nodes.splice(i, 1);
                return;
            }
            if (nodes[i].children !== undefined) {
                this.removeNodeByValue(nodes[i].children, value);
            }
        }
    }
    updateNodes() {
        if (typeof this.nodes === 'string') {
            this.nodes = JSON.parse(this.nodes);
        }
        const nodes = this.nodes?.map(node => this.expandNode(node));
        const expandedStateMap = new Map();
        this.collectExpandedState(this.updatedNodes, expandedStateMap);
        this.updatedNodes = this.updatedNodes.map(updatedNode => {
            const exist = nodes?.find(node => node.value?.toString() === updatedNode.value?.toString());
            const savedExpandedState = expandedStateMap.get(updatedNode.value?.toString());
            if (exist && savedExpandedState !== undefined) {
                updatedNode.expanded = savedExpandedState;
            }
            else if (exist) {
                updatedNode.expanded = exist.expanded;
            }
            if (updatedNode.children) {
                updatedNode.children = updatedNode.children.map(child => {
                    const childExist = nodes?.find(node => node.value?.toString() === child.value?.toString());
                    const childSavedState = expandedStateMap.get(child.value?.toString());
                    if (childSavedState !== undefined) {
                        child.expanded = childSavedState;
                    }
                    else if (childExist) {
                        child.expanded = childExist.expanded;
                    }
                    return child;
                });
            }
            return updatedNode;
        });
    }
    collectExpandedState(nodes, stateMap) {
        if (!nodes)
            return;
        for (const node of nodes) {
            if (node.value) {
                stateMap.set(node.value.toString(), !!node.expanded);
            }
            if (node.children) {
                this.collectExpandedState(node.children, stateMap);
            }
        }
    }
    expandNode(node) {
        let shouldExpand;
        if (this.expandAll) {
            shouldExpand = true;
        }
        else if (this.expandable) {
            shouldExpand = node.expanded ?? false;
        }
        else {
            shouldExpand = false;
        }
        const newNode = {
            ...node,
            expanded: shouldExpand
        };
        if (Array.isArray(node.children)) {
            newNode.children = node.children.map((child) => this.expandNode(child));
        }
        return newNode;
    }
    handleCheckChanged(e) {
        e.stopPropagation();
        const { value, label, checked } = e.detail;
        this.itemChecked.emit({ value, label, checked });
        const stateChanged = this.updateTree(this.updatedNodes, value, checked);
        if (stateChanged) {
            this.emitNodesChanged();
        }
    }
    handleExpandChanged(e) {
        const { value, expanded } = e.detail;
        this.updateNodeProperty(value, 'expanded', expanded);
        if (expanded && this.nodeWidth) {
            setTimeout(() => {
                this.triggerOverflowCheckForAllItems();
            }, 0);
        }
    }
    triggerOverflowCheckForAllItems() {
        if (!this.nodeWidth)
            return;
        const treeItems = this.host.querySelectorAll('sy-tree-item');
        if (treeItems) {
            treeItems.forEach((item) => {
                if (item.setOverflow) {
                    item.setOverflow();
                }
            });
        }
    }
    handleDragStart(e, node) {
        e.stopPropagation();
        if (node.disabled || !this.treeDraggable) {
            e.preventDefault();
            return;
        }
        this.draggNode = node;
    }
    handleDragOver(e, position, nodeKey, _level) {
        if (!this.treeDraggable)
            return;
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        const { node: draggedNode } = this.findNodeAndParent(this.updatedNodes, this.draggNode.value);
        const { node: targetNode } = this.findNodeAndParent(this.updatedNodes, nodeKey);
        const isDescendant = this.isDescendant(draggedNode, targetNode);
        if (draggedNode && targetNode && isDescendant) {
            e.target.dataset.dragging = 'not-allowed';
            return;
        }
        const dropZone = e.target;
        dropZone.dataset.dragging = position;
    }
    handleItemDragOver(e, node) {
        if (!this.treeDraggable)
            return;
        e.preventDefault();
        e.stopPropagation();
        if (node.disabled) {
            e.dataTransfer.dropEffect = 'none';
            e.target.dataset.dragging = 'not-allowed';
            return;
        }
        const isDescendant = this.isDescendant(this.draggNode, node);
        if (isDescendant) {
            e.dataTransfer.dropEffect = 'none';
            e.target.dataset.dragging = 'not-allowed';
            const treeItems = this.host.querySelectorAll('sy-tree-item');
            treeItems?.forEach(item => {
                const currentNode = item;
                if (currentNode.value && (currentNode.value?.toString() === this.draggNode.value?.toString() || currentNode.value?.toString() === node?.value?.toString())) {
                    item.isDescendant = true;
                }
                else {
                    item.isDescendant = false;
                }
            });
        }
        else {
            e.dataTransfer.dropEffect = 'move';
            const treeItems = this.host.querySelectorAll('sy-tree-item');
            treeItems?.forEach(item => {
                item.isDescendant = false;
            });
        }
    }
    handleDrop(e, position, targetKey, level) {
        if (!this.treeDraggable)
            return;
        e.preventDefault();
        const dropZone = e.target;
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
    handleItemDrop(e) {
        const { targetKey, draggedKey, dropPosition, targetLevel } = e.detail;
        this.moveNode(draggedKey, targetKey, dropPosition, targetLevel);
    }
    handleDirectDrop(e, targetNode) {
        if (!this.treeDraggable || !this.draggNode || targetNode.disabled)
            return;
        e.preventDefault();
        e.stopPropagation();
        if (this.draggNode.value === targetNode.value || this.isDescendant(targetNode, this.draggNode)) {
            return;
        }
        const { parent: draggedParent } = this.findNodeAndParent(this.updatedNodes, this.draggNode.value);
        if (draggedParent) {
            draggedParent.children = draggedParent.children.filter(child => child.value !== this.draggNode.value);
        }
        else {
            this.updatedNodes = this.updatedNodes.filter(node => node.value !== this.draggNode.value);
        }
        if (!targetNode.children) {
            targetNode.children = [];
        }
        targetNode.children.push(this.draggNode);
        targetNode.expanded = true;
        this.emitNodesChanged();
    }
    handleDragLeave(e) {
        const dropZone = e.target;
        dropZone.dataset.dragging = '';
        dropZone.style.marginLeft = '0';
    }
    moveNode(draggedKey, targetKey, dropPosition, _targetLevel) {
        const { node: draggedNode, parent: draggedParent } = this.findNodeAndParent(this.updatedNodes, draggedKey);
        const { node: targetNode, parent: targetParent } = this.findNodeAndParent(this.updatedNodes, targetKey);
        const isDescendant = this.isDescendant(draggedNode, targetNode);
        if (!draggedNode || !targetNode || isDescendant)
            return;
        if (draggedParent) {
            draggedParent.children = draggedParent.children.filter(child => child.value?.toString() !== draggedKey?.toString());
        }
        else {
            this.updatedNodes = this.updatedNodes.filter(node => node.value?.toString() !== draggedKey?.toString());
        }
        if (dropPosition === 'above' || dropPosition === 'below') {
            const targetChildren = targetParent ? targetParent.children : this.updatedNodes;
            const targetIndex = targetChildren.findIndex(child => child.value?.toString() === targetKey?.toString());
            targetChildren.splice(dropPosition === 'above' ? targetIndex : targetIndex + 1, 0, draggedNode);
        }
        else if (dropPosition === 'on') {
            targetNode.children = targetNode.children || [];
            targetNode.children.push(draggedNode);
        }
        this.updateTree(this.updatedNodes, draggedKey, draggedNode?.checked ? true : false);
        this.emitNodesChanged();
    }
    updateTree(nodes, value, checked) {
        return this.findAndUpdate(nodes, value, checked);
    }
    clearAllChecked(nodes) {
        for (const node of nodes) {
            node.checked = false;
            node.indeterminate = false;
            if (node.children) {
                this.clearAllChecked(node.children);
            }
        }
    }
    updateNodeProperty(value, property, expended) {
        const updateProperty = (nodes) => {
            for (const node of nodes) {
                if (node.value?.toString() === value?.toString() && node[property] !== expended) {
                    node[property] = expended;
                    return;
                }
                if (node.children) {
                    updateProperty(node.children);
                }
            }
        };
        updateProperty(this.updatedNodes);
    }
    findNodeAndParent(nodes, value, parent = null) {
        for (const node of nodes) {
            if (node.value?.toString() === value?.toString()) {
                return { node, parent };
            }
            if (node.children) {
                const result = this.findNodeAndParent(node.children, value, node);
                if (result.node)
                    return result;
            }
        }
        return { node: null, parent: null };
    }
    isDescendant(parent, child) {
        if (!parent || !child)
            return false;
        if (parent.children?.some(c => c.value?.toString() === child.value?.toString())) {
            return true;
        }
        return parent.children?.some(c => this.isDescendant(c, child)) ?? false;
    }
    emitNodesChanged() {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            this.nodes = [...this.updatedNodes];
            this.nodesChanged.emit({ nodes: this.updatedNodes });
        }, 0);
    }
    updateChildren(node, checked) {
        node.checked = checked;
        node.indeterminate = false;
        if (node.children) {
            node.children.forEach(child => {
                this.updateChildren(child, checked);
            });
        }
    }
    checkCondition(node, index, nodes) {
        const previousNode = nodes[index - 1];
        if (!previousNode || this.getNodeDepth(previousNode) !== this.getNodeDepth(node)) {
            return true;
        }
        return false;
    }
    getNodeDepth(node) {
        let depth = 0;
        let currentNode = node;
        while (currentNode && currentNode.value?.toString() !== this.updatedNodes[0].value?.toString()) {
            depth++;
            currentNode = this.findParent(this.updatedNodes, currentNode);
        }
        return depth;
    }
    findParent(nodes, childNode, parentNode = null) {
        for (const node of nodes) {
            if (node === childNode) {
                return parentNode;
            }
            if (node.children) {
                const result = this.findParent(node.children, childNode, node);
                if (result)
                    return result;
            }
        }
        return null;
    }
    findAndUpdate(nodes, value, checked) {
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
    updateNodeState(node, checked) {
        node.checked = checked;
        node.indeterminate = false;
        if (node.children) {
            node.children.forEach(child => this.updateNodeState(child, checked));
        }
    }
    updateParentState(nodes) {
        for (const node of nodes) {
            if (node.children && node.children.length > 0) {
                const checkedCount = node.children.filter(child => child.checked).length;
                const indeterminateCount = node.children.filter(child => child.indeterminate).length;
                const totalChildren = node.children.length;
                if (checkedCount === totalChildren) {
                    node.checked = true;
                    node.indeterminate = false;
                }
                else if (checkedCount === 0 && indeterminateCount === 0) {
                    node.checked = false;
                    node.indeterminate = false;
                }
                else {
                    node.checked = false;
                    node.indeterminate = true;
                }
            }
        }
    }
    filterNodes(nodes, searchTerm) {
        if (!this.isTreeSelect) {
            return nodes;
        }
        if (!searchTerm) {
            // searchTerm이 없으면 원본 노드의 expanded 상태를 유지
            return nodes.map(node => ({
                ...node,
                expanded: node.expanded ?? false, // 원본 상태 유지, 없으면 false
                children: node.children ? this.filterNodes(node.children, searchTerm) : []
            }));
        }
        // 검색 시 필터링
        return nodes.reduce((acc, node) => {
            const isMatch = node.label.toLowerCase().includes(searchTerm.toLowerCase());
            const filteredChildren = node.children ? this.filterNodes(node.children, searchTerm) : [];
            const hasMatchingChildren = filteredChildren.length > 0;
            if (isMatch || hasMatchingChildren) {
                acc.push({
                    ...node,
                    expanded: hasMatchingChildren,
                    children: filteredChildren
                });
            }
            return acc;
        }, []);
    }
    hasMatchInChildren(children, searchTerm) {
        if (!children || children.length === 0)
            return false;
        return children.some(child => {
            const matchInCurrentChild = child.label.toLowerCase().includes(searchTerm.toLowerCase());
            const matchInGrandchildren = this.hasMatchInChildren(child.children || [], searchTerm);
            return matchInCurrentChild || matchInGrandchildren;
        });
    }
    expandParentNodesForSelectedValue(selectedValue) {
        if (!selectedValue)
            return;
        const selectedValues = selectedValue.split(',').map(val => val.trim());
        selectedValues.forEach(value => {
            if (value) {
                this.expandParentNodesForValue(this.updatedNodes, value);
            }
        });
    }
    expandParentNodesForValue(nodes, targetValue) {
        if (!nodes)
            return false;
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
    static get watchers() { return {
        "expandable": ["handleNodesChange"],
        "expandAll": ["handleNodesChange"],
        "nodes": ["handleNodesChange"],
        "searchTerm": ["handleSearchTermChange"],
        "checkable": ["handleCheckableChange"],
        "selectedValue": ["handleSelectedValueChange"],
        "nodeWidth": ["handleNodeWidthChange"]
    }; }
    static get style() { return syTreeCss; }
}, [258, "sy-tree", {
        "nodes": [1040],
        "checkable": [516],
        "clickable": [516],
        "treeDraggable": [4, "draggable"],
        "editable": [4],
        "expandable": [4],
        "expandAll": [1028, "expandall"],
        "manualAdd": [1028, "manualadd"],
        "manualRemove": [1028, "manualremove"],
        "line": [516],
        "nodeWidth": [1026, "nodewidth"],
        "selectedValue": [1025, "selectedvalue"],
        "searchTerm": [1025, "searchterm"],
        "isTreeSelect": [1028, "istreeselect"],
        "updatedNodes": [32],
        "isUpdating": [32],
        "setCheckState": [64],
        "clearAllSelectedItem": [64],
        "manualAddChildNode": [64],
        "manualRemoveNode": [64],
        "findNode": [64]
    }, undefined, {
        "expandable": ["handleNodesChange"],
        "expandAll": ["handleNodesChange"],
        "nodes": ["handleNodesChange"],
        "searchTerm": ["handleSearchTermChange"],
        "checkable": ["handleCheckableChange"],
        "selectedValue": ["handleSelectedValueChange"],
        "nodeWidth": ["handleNodeWidthChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-tree", "sy-button", "sy-checkbox", "sy-icon", "sy-input", "sy-tag", "sy-tooltip", "sy-tree-item"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-tree":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTree);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "sy-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-tag":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "sy-tree-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyTree as S, defineCustomElement as d };
