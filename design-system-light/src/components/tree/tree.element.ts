import { LitElement, html, CSSResultGroup, css, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import globalCSS from "./styles/tree.scss?inline";
import { classMap } from 'lit/directives/class-map.js';
import './tree-item.element';
import { TreeItemElement } from './tree-item.element';

export interface TreeNode {
  appendable?: boolean; // Add appendable button, editable attribute of sy-tree must be true
  appendPlaceholder?: string; // placeholder text for appendable button
  // badge?: number;         // badge number
  // badgeOverflow?: number; // badge overflow number
  checked?: boolean;      // checked as default
  children?: TreeNode[];  // add child nodes
  clickable?: boolean;    // allow clickable event,
  disabled?: boolean;   // disabled all features: checkable, clickable, editable
  editable?: boolean;   // Add editable button, editable attribute of sy-tree must be true
  expanded?: boolean;     // expanded as default  
  fixed?: boolean;      // fix check status, user cannot check manually.
  icon?: string;          // icon type
  indeterminate?: boolean;  // it is for check status, do not set this value manually.
  label: string;
  removable?: boolean;  // Add removable button, editable attribute of sy-tree must be true
  tagMessage?: string;           // text on the tag
  tagVariant?: "gray"| "purple" | "blue" | "green" | "cyan" | "yellow" | "orange" | "red";  // tag background color
  value: string;
}

@customElement('sy-tree')
export class TreeElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;    
  @property({
    type: String,
    reflect: true,
    converter: {
      fromAttribute: (value) => {
        return value ? JSON.parse(value) : []; // 문자열을 TreeNode[]로 변환
      },
      toAttribute: (value) => {
        return value ? JSON.stringify(value) : ''; // TreeNode[]를 문자열로 변환
      }
    },
  })
  nodes: TreeNode[] = [];
  @property({ type: Boolean }) checkable = false;
  @property({ type: Boolean }) clickable = false;  
  @property({ type: Boolean }) draggable = false;  
  @property({ type: Boolean }) editable = false; 
  @property({ type: Boolean }) expandable = false;
  @property({ type: Boolean }) expandAll = false;
  @property({ type: Boolean }) manualAdd = false;
  @property({ type: Boolean }) manualRemove = false;
  @property({ type: Boolean }) line = false; 
  @property({ type: Number }) nodeWidth: number | null = null;
  @property({ type: String }) selectedValue = '';

  @state() searchTerm: string = '';
  @state() isTreeSelect: boolean = false;
  @state() private updatedNodes: TreeNode[] = [];
  private isUpdating = false;
  private debounceTimeout: any;
  private draggNode!: TreeNode;

  public setCheckState(value: string, checked: boolean) {
    if (!this.checkable) {
      return; // checkable이 아닐 경우 무시
    }

    const stateChanged = this.updateTree(this.updatedNodes, value, checked); // 체크 상태 업데이트

    if (stateChanged) {
      this.requestUpdate();
      this.emitNodesChanged(); // 상태 변경 이벤트 발생
    }
  }

  public clearAllSelectedItem() {
    this.selectedValue = '';

    // sy-tree의 shadowRoot에서 sy-tree-item을 검색
    const children = this.shadowRoot?.querySelectorAll('sy-tree-item');

    children?.forEach(child => {
      (child as any).active = false;
    });

    // checkable 모드일 때만 체크 상태도 초기화
    if (this.checkable) {
      this.clearAllChecked(this.nodes);
      this.clearAllChecked(this.updatedNodes);
      
      // 항상 업데이트 및 이벤트 발생
      this.requestUpdate();
      this.emitNodesChanged();
    }
  }

  public manualAddChildNode(parentValue: string, childLabel: string, childValue?: string) {
    // Create new node with proper checkbox initialization
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
    
    // Find parent node and determine its check state
    const { node: parentNode } = this.findNodeAndParent(this.updatedNodes, parentValue);
    if (parentNode?.checked) {
      child.checked = true; // If parent is checked, new child should be checked
    }

    // Add child node
    this.addChildNode(this.updatedNodes, parentValue, child);
    
    // Update parent's check state
    this.updateParentCheckState(this.updatedNodes, parentValue);
    
    // Force a complete refresh of the tree
    this.updatedNodes = [...this.updatedNodes]; 
    this.updateNodes();
    this.isUpdating = false;
    
    this.emitNodesChanged();
    this.requestUpdate();
  }

  public manualRemoveNode(value: string) {
    this.removeNode(value);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.updatedNodes = this.updateTreeCheckState(this.nodes);
    this.emitNodesChanged();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('expandable') || changedProperties.has('expandAll') || changedProperties.has('nodes') ) {
      // 상태를 변경하기 전에 상태가 실제로 변경되었는지 확인
      if (!this.isEqual(this.nodes, this.updatedNodes) || changedProperties.has('expandable') || changedProperties.has('expandAll')) {
        // expandAll이 변경되었을 때는 완전히 새로운 노드 상태를 생성
        if (changedProperties.has('expandAll')) {
          this.updatedNodes = this.nodes?.map(node => this.expandNode(node)) ?? [];
          this.updatedNodes = this.updateTreeCheckState(this.updatedNodes);
          this.requestUpdate();
        } else {
          this.updateNodes();
        }
      }

    }
    // 검색어가 변경될 때마다 노드 필터링
    if (changedProperties.has('searchTerm')) {
      if(this.isTreeSelect) {
        this.updatedNodes = this.filterNodes(this.nodes, this.searchTerm);
      }
    }

    if(changedProperties.has('checkable')) {
      if(this.checkable) {
        this.selectedValue = '';
        // this.clearAllSelectedItem();
      }
    }

    if(changedProperties.has('nodes')) {
      this.setNodes();      
    }

    if(changedProperties.has('selectedValue')) {
      // expandAll이 false이고 selectedValue가 설정되면 해당 노드까지의 모든 부모 노드들을 expand
      if(!this.expandAll && this.selectedValue) {
        this.expandParentNodesForSelectedValue(this.selectedValue);
      }
      
      const allItems = this.shadowRoot?.querySelectorAll('sy-tree-item') as TreeItemElement[] | undefined;

      if(allItems) {
        allItems.forEach(item => {
          item.selectedValue = this.selectedValue;
        });
      }
    }
    if(changedProperties.has('nodeWidth')) {
      // nodeWidth가 변경되면 모든 sy-tree-item의 overflow 상태를 다시 확인
      if (this.nodeWidth) {
      // Use setTimeout to ensure DOM is updated before checking overflow
      setTimeout(() => {
        this.triggerOverflowCheckForAllItems();
      }, 0);
    }
    }
  }
    
  private renderTree(nodes: TreeNode[], level = 0): TemplateResult[] {  
    return nodes?.map((node, index) => {
      const shouldAddDropZoneAbove = this.checkCondition(node, index, nodes);

      return html`
        ${shouldAddDropZoneAbove ? html`
          <div
            class="drop-zone"
            @dragover="${(e: DragEvent) => this.handleDragOver(e, 'above', node.value, level)}"
            @dragleave="${this.draggable ? this.handleDragLeave : null}"
            @drop="${(e: DragEvent) => this.draggable ? this.handleDrop(e, 'above', node.value, level) : null}"
            data-position="above"
          ></div>
        ` : ''}
        <sy-tree-item
          class="${classMap({
            ['level-' + level]: true,
          })}"
          ?line=${this.line}
          .label="${node.label}"
          .value="${node.value}"
          icon=${node.icon ?? ''}
          appendPlaceholder="${node.appendPlaceholder ?? ''}"
          .tagMessage=${node.tagMessage ?? ''}
          .tagVariant=${node.tagVariant ?? undefined}
          ?expanded="${node.expanded ?? false}"
          ?checked="${node.checked ?? false}"
          ?indeterminate="${node.indeterminate ?? false}"
          ?hasChild="${node.children && node.children.length > 0 ? true : false}"
          ?checkable="${this.checkable}"
          ?expandable="${this.expandable}"
          .level="${level}"
          .searchTerm="${this.searchTerm}"
          ?isEditable="${this.editable && !this.isUpdating}" 
          ?appendable="${node.appendable ?? this.editable}" 
          ?removable="${node.removable ?? this.editable}" 
          ?editable="${node.editable ?? this.editable}"
          ?fixed="${node.fixed ?? false}"
          ?disabled="${node.disabled ?? false}"
          ?draggable="${this.draggable}" 
          ?clickable="${this.clickable ? (node.clickable ?? true) : false}"
          .selectedValue="${this.selectedValue?.toString().toLowerCase()}"
          .nodeWidth="${this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null}"
          @dragstart="${(e: DragEvent) => this.handleDragStart(e, node)}"
          @dragover="${(e: DragEvent) => this.handleItemDragOver(e, node)}"
          @drop="${(e: DragEvent) => this.handleDirectDrop(e, node)}"
          @expandChanged="${this.handleExpandChanged}"
          @checkChanged="${this.handleCheckChanged}"
          @itemAdded="${this.handleAddItem}" 
          @itemRemoved="${this.handleRemoveItem}" 
          @itemEdited="${this.handleEditItem}"
          @itemUpdating="${this.handleUpdatingItem}"
          @itemUpdatingReset="${this.handleUpdatingResetItem}"
          @itemDrop="${this.draggable && !node.disabled ? this.handleItemDrop : null}"
          @itemSelected="${this.handleItemSelected}"
        >
          ${node.children ? this.renderTree(node.children, level + 1) : ''}
        </sy-tree-item>
        <div
          class="drop-zone"
          @dragover="${(e: DragEvent) => this.handleDragOver(e, 'below', node.value, level)}"
          @dragleave="${this.draggable ? this.handleDragLeave : null}"
          @drop="${(e: DragEvent) => this.draggable ? this.handleDrop(e, 'below', node.value, level) : null}"
          data-position="below"
        ></div>
      `;
    });
  }

  render() {
    return html`
      ${this.renderTree(this.updatedNodes, 0)}
    `;
  }

    
  private updateTreeCheckState(nodes: TreeNode[]): TreeNode[] {
    // 깊은 복사로 트리 복사
    const clonedNodes = JSON.parse(JSON.stringify(nodes));
    
    // 1단계: 부모 노드가 checked인 경우 모든 자식 노드들을 checked 상태로 설정
    const applyParentChecked = (node: TreeNode) => {
      if (node.checked) {
        // 현재 노드가 checked면 모든 하위 노드도 checked로 설정
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
        // 현재 노드가 checked가 아니면 자식 노드들 재귀적으로 처리
        node.children.forEach(child => applyParentChecked(child));
      }
    };

    // 2단계: 자식 노드들의 상태를 기반으로 부모 노드 상태 업데이트
    const updateParentState = (node: TreeNode): { checked: boolean, indeterminate: boolean } => {
      if (!node.children || node.children.length === 0) {
        return { checked: node.checked || false, indeterminate: false };
      }

      const childStates = node.children.map(child => updateParentState(child));
      
      // 이미 노드가 checked면 하위 상태 무시
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

    // 전체 트리 상태 업데이트 실행
    clonedNodes.forEach((node: TreeNode) => {
      applyParentChecked(node);
      updateParentState(node);
    });

    return clonedNodes;
  }

  // private getCheckedValues(nodes: TreeNode[]): string[] {
  //   const checkedValues: string[] = [];
    
  //   const collectCheckedValues = (node: TreeNode) => {
  //     if (node.checked) {
  //       checkedValues.push(node.value);
  //       // 부모가 checked면 모든 자식 노드의 값도 포함
  //       if (node.children) {
  //         node.children.forEach(child => {
  //           checkedValues.push(child.value);
  //           if (child.children) {
  //             child.children.forEach(grandChild => collectCheckedValues(grandChild));
  //           }
  //         });
  //       }
  //     }
  //   };

  //   nodes.forEach(node => collectCheckedValues(node));
  //   return [...new Set(checkedValues)]; // 중복 제거
  // }






  // Handle adding new item with proper checkbox state
  private handleAddItem(e: CustomEvent) {
    e.preventDefault();
    const { parentValue, childLabel, childValue, childLevel } = e.detail;
    
    if(!this.manualAdd) {
      // Create new node with proper checkbox initialization
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
    
      // Find parent node and determine its check state
      const { node: parentNode } = this.findNodeAndParent(this.updatedNodes, parentValue);
      if (parentNode?.checked) {
        child.checked = true; // If parent is checked, new child should be checked
      }

      // Add child node
      this.addChildNode(this.updatedNodes, parentValue, child);
      
      // Update parent's check state
      this.updateParentCheckState(this.updatedNodes, parentValue);
      
      // Force a complete refresh of the tree
      this.updatedNodes = [...this.updatedNodes]; 
      this.updateNodes();
      this.isUpdating = false;
      
      this.emitNodesChanged();
      this.requestUpdate();
    }
  }
  // Handle editing item with checkbox state preservation
  private handleEditItem(e: CustomEvent) {
    const { value, label } = e.detail;
    
    // Find node and preserve its check state
    const { node: targetNode } = this.findNodeAndParent(this.updatedNodes, value);
    if (targetNode) {
      const prevChecked = targetNode.checked;
      const prevIndeterminate = targetNode.indeterminate;
      const prevExpanded = targetNode.expanded; // 펼침 상태 저장
      
      // Update the label
      targetNode.label = label;
      
      // Restore states
      targetNode.checked = prevChecked;
      targetNode.indeterminate = prevIndeterminate;
      targetNode.expanded = prevExpanded; // 펼침 상태 복원
    }
    
    this.isUpdating = false;
    this.emitNodesChanged(); // 원래 상태 그대로 이벤트 발생
    this.requestUpdate(); // 직접 업데이트 요청
  }

  private handleUpdatingItem(e: CustomEvent) {
    e.stopPropagation();
    this.isUpdating = true;
    this.requestUpdate();
  }

  private handleUpdatingResetItem(e: CustomEvent) {
    e.stopPropagation();
    this.isUpdating = false;
    this.requestUpdate();
  }

  // Update parent's check state after modifications
  private updateParentCheckState(nodes: TreeNode[], value: string) {
    const { parent } = this.findNodeAndParent(nodes, value);
    if (parent) {
      this.updateParentState([parent]);
      // Recursively update ancestors
      this.updateParentCheckState(nodes, parent.value);
    }
  }
  


  private handleItemSelected(e: CustomEvent) {
    e.preventDefault();
    e.stopPropagation();
    
    if(e.target) {
      //this.handleCheckChanged(e);
      // this.clearAllSelectedItem();
      // this.clearEdited();
      this.selectedValue = e.detail.value;

      
      // (e.target as TreeItemElement).active = true;

      if(this.clickable) {
        this.dispatchEvent(new CustomEvent('itemSelected', {
          detail: e.detail,
          bubbles: true,
          composed: true
        }));  
      }

      this.requestUpdate();   
    }
  }
  
  // Handle removing item with checkbox state update
  private handleRemoveItem(e: CustomEvent) {
    // e.stopPropagation();

    const { value } = e.detail;
    
    if(!this.manualRemove) {
      this.removeNode(value);
    
      // this.updateNodes();
      this.emitNodesChanged();
    }

  }

  public removeNode(value: string) {
    // Find parent before removal to update its state later
    const { parent: parentNode } = this.findNodeAndParent(this.updatedNodes, value);
    
    // Remove the node
    this.removeNodeByValue(this.updatedNodes, value);
    
    // Update parent's check state if it exists
    if (parentNode) {
      this.updateParentState([parentNode]);
      this.updateTree(this.updatedNodes, parentNode.value, parentNode.checked ?? false);
      this.requestUpdate();
    }
  }

  // Updated addChildNode with check state handling
  private addChildNode(nodes: TreeNode[], parentValue: string, child: TreeNode): TreeNode | null {
    for (const node of nodes) {
      if (node.value?.toString() === parentValue?.toString()) {
        if (!node.children) {
          node.children = [];
        }
  
        // Prevent duplicate nodes
        if (!node.children.some(c => c.value?.toString() === child.value?.toString())) {
          // Ensure the child node has the necessary properties
          child.appendable = child.appendable ?? true;
          child.editable = child.editable ?? true;
          child.removable = child.removable ?? true;
          
          node.children.push(child);
          
          // If parent is checked, ensure child is checked
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
      // children이 undefined가 아닌지 확인
      if (nodes[i].children !== undefined) {
        this.removeNodeByValue(nodes[i].children as TreeNode[], value);
      }
    }
  }
  

  private setNodes() {
    if(typeof this.nodes === 'string') {
      this.nodes = JSON.parse(this.nodes);
    }
    // expandNode가 새 객체를 반환하므로, updatedNodes는 완전히 새로운 객체들로 구성됨
    this.updatedNodes = this.nodes?.map(node => this.expandNode(node)) ?? [];
    // 이후 필요한 check state 업데이트 등 수행
    this.updatedNodes = this.updateTreeCheckState(this.updatedNodes); // 예시
    
    // expandAll이 false이고 selectedValue가 설정되어 있으면 해당 노드까지의 모든 부모 노드들을 expand
    if(!this.expandAll && this.selectedValue) {
      this.expandParentNodesForSelectedValue(this.selectedValue);
    }
    
    this.requestUpdate(); // LitElement에 변경 알림
  }
  
  // 노드의 상태 업데이트 함수
  private updateNodes() { 
    if(typeof this.nodes === 'string') { 
      this.nodes = JSON.parse(this.nodes); 
    }
    
    const nodes = this.nodes?.map(node => this.expandNode(node));
    
    // 업데이트된 노드 상태 맵 생성 (expanded 상태 보존용)
    const expandedStateMap = new Map();
    this.collectExpandedState(this.updatedNodes, expandedStateMap);
    
    this.updatedNodes = this.updatedNodes.map(updatedNode => {
      // 원본 노드 찾기
      const exist = nodes?.find(node => node.value?.toString() === updatedNode.value?.toString());
      
      // 저장된 expanded 상태 가져오기 (없으면 원본 상태 사용)
      const savedExpandedState = expandedStateMap.get(updatedNode.value?.toString());
      if (exist && savedExpandedState !== undefined) {
        updatedNode.expanded = savedExpandedState; // 저장된 상태로 복원
      } else if (exist) {
        updatedNode.expanded = exist.expanded; // 원본 상태 사용
      }

      // 재귀적으로 자식 노드 처리
      if (updatedNode.children) {
        updatedNode.children = updatedNode.children.map(child => {
          const childExist = nodes?.find(node => node.value?.toString() === child.value?.toString());
          const childSavedState = expandedStateMap.get(child.value?.toString());
          
          if (childSavedState !== undefined) {
            child.expanded = childSavedState; // 저장된 상태 우선
          } else if (childExist) {
            child.expanded = childExist.expanded;
          }
          
          return child;
        });
      }

      return updatedNode;
    });
  }
  
  // 현재 expanded 상태를 맵에 수집
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

  // 노드 확장 상태 갱신
  private expandNode(node: TreeNode): TreeNode {
    let shouldExpand: boolean; // 결정될 확장 상태
  
    if (this.expandAll) {
      // expandAll이 true이면 expandable 값에 상관없이 모든 노드 확장
      shouldExpand = true;
    } else if (this.expandable) {
      // expandable이 true이면 초기값 존중, 없으면 false
      shouldExpand = node.expanded ?? false;
    } else {
      // expandable이 false일 때는 축소 상태 유지
      shouldExpand = false;
    }
  
    // 새로운 노드 객체 생성 (불변성)
    const newNode = {
      ...node, // 다른 속성 복사
      expanded: shouldExpand // 계산된 확장 상태 적용
    };
  
    // 자식 노드도 재귀적으로 처리 (새로운 객체 반환 받음)
    if (Array.isArray(node.children)) { // node.children이 배열인지 확인
      newNode.children = node.children.map((child: TreeNode) => this.expandNode(child));
    }
  
    return newNode; // 변경된 복사본 반환
  }

  // 노드의 체크 상태 변경 처리
  private handleCheckChanged(e: CustomEvent) {
    e.stopPropagation();
    // e.preventDefault();

    const { value, label, checked } = e.detail;

    // Emit the `itemChecked` event
    this.dispatchEvent(new CustomEvent('itemChecked', {
      detail: { value, label, checked },
      bubbles: true,
      composed: true
    }));
  
    // Update the node state in the tree
    const stateChanged = this.updateTree(this.updatedNodes, value, checked);
  
    // If the state was changed, emit the `nodesChanged` event
    if (stateChanged) {
      this.emitNodesChanged();
    }
    this.requestUpdate();
  }

  // 노드의 확장 상태 변경 처리
  private handleExpandChanged(e: CustomEvent) {
    const { value, expanded } = e.detail;
    this.updateNodeProperty(value, 'expanded', expanded);
    this.requestUpdate();
    
    // If expanding and nodeWidth is set, trigger overflow check for all tree items
    if (expanded && this.nodeWidth) {
      // Use setTimeout to ensure DOM is updated before checking overflow
      setTimeout(() => {
        this.triggerOverflowCheckForAllItems();
      }, 0);
    }
  }

  // Trigger overflow check for all tree-item elements
  private triggerOverflowCheckForAllItems() {
    if (!this.nodeWidth) return;
    
    const treeItems = this.shadowRoot?.querySelectorAll('sy-tree-item') as NodeListOf<TreeItemElement> | undefined;
    if (treeItems) {
      treeItems.forEach((item: TreeItemElement) => {
        
          item.setOverflow();
        
      });
    }
  }

  // 드래그 시작 처리
  private handleDragStart(e: any, node: TreeNode) {
    e.stopPropagation();
  
    // Prevent drag if node is disabled
    if (node.disabled || !this.draggable) {
      e.preventDefault();
      return;
    }
    
    this.draggNode = node;
  }

  // 드래그 오버 이벤트 처리
  private handleDragOver(e: DragEvent, position: 'above' | 'on' | 'below', nodeKey: string, level: number) {
    if (!this.draggable) return;
  
    e.preventDefault();
    e.stopPropagation();
  
    // Get target node
    const { node: targetNode } = this.findNodeAndParent(this.updatedNodes, nodeKey);
    
    // Prevent drop if target node is disabled
    // if (targetNode?.disabled) {
    //   e.dataTransfer!.dropEffect = 'none';
    //   (e.target as any).dataset.dragging = 'not-allowed';
    //   return;
    // }
  
    e.dataTransfer!.dropEffect = 'move';
  
    // Check for descendant relationship
    const { node: draggedNode } = this.findNodeAndParent(this.updatedNodes, this.draggNode.value);
    const isDescendant = this.isDescendant(draggedNode, targetNode);
  
    if (draggedNode && targetNode && isDescendant) {
      (e.target as any).dataset.dragging = 'not-allowed';
      return;
    }
  
    const dropZone = e.target as HTMLElement;
    dropZone.dataset.dragging = position;
    // dropZone.style.marginLeft = `${level * 16}px`;
  }

  private handleItemDragOver(e: any, node: TreeNode) {
    if (!this.draggable) return;
  
    e.preventDefault();
    e.stopPropagation();
  
    // Prevent drop if target node is disabled
    if (node.disabled) {
      e.dataTransfer!.dropEffect = 'none';
      (e.target as any).dataset.dragging = 'not-allowed';
      return;
    }
  
    const isDescendant = this.isDescendant(this.draggNode, node);

    if (isDescendant) {
      e.dataTransfer!.dropEffect = 'none';
      (e.target as any).dataset.dragging = 'not-allowed';
      const treeItems = this.shadowRoot?.querySelectorAll('sy-tree-item');
  
      treeItems?.forEach(item => {
        const currentNode = (item as unknown as TreeNode);
        if (currentNode.value && (currentNode.value?.toString() === this.draggNode.value?.toString() || currentNode.value?.toString() === node?.value?.toString())) {
          (item as any).isDescendant = true;
        } else {
          (item as any).isDescendant = false;
        }
      });
    } else {
      // 유효한 drop 대상인 경우 drop을 허용
      e.dataTransfer!.dropEffect = 'move';
      const treeItems = this.shadowRoot?.querySelectorAll('sy-tree-item');
      
      treeItems?.forEach(item => {
        (item as any).isDescendant = false;
      });
    }
  }

  // 드랍 이벤트 처리
  private handleDrop(e: DragEvent, position: 'above' | 'below', targetKey: string, level: number) {
    if (!this.draggable) return;
    
    e.preventDefault();
    const dropZone = e.target as HTMLElement;
    dropZone.dataset.dragging = '';
    dropZone.style.marginLeft = '0';

    const dragData = e.dataTransfer?.getData('application/json');
    if (dragData) {
      const { value: draggedKey, children } = JSON.parse(dragData);
      if (draggedKey && draggedKey !== targetKey) {
        this.moveNode(draggedKey, targetKey, position, level);
        // const dropEvent = new CustomEvent('itemDrop', {
        //   detail: { targetKey, draggedKey, dropPosition: position, targetLevel: level }
        // });
        // this.handleItemDrop(dropEvent);
      }
    }
  }

  // 드래그된 아이템을 새로운 위치로 이동
  private handleItemDrop(e: CustomEvent) {
    const { targetKey, draggedKey, dropPosition, targetLevel } = e.detail;
    this.moveNode(draggedKey, targetKey, dropPosition, targetLevel);
  }

  // tree-item 위에 직접 drop했을 때 하위로 등록
  private handleDirectDrop(e: DragEvent, targetNode: TreeNode) {
    if (!this.draggable || !this.draggNode || targetNode.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    // 자기 자신이나 하위 노드에는 드롭할 수 없음
    if (this.draggNode.value === targetNode.value || this.isDescendant(targetNode, this.draggNode)) {
      return;
    }

    // 기존 위치에서 dragged 노드 제거
    const { parent: draggedParent } = this.findNodeAndParent(this.updatedNodes, this.draggNode.value);
    if (draggedParent) {
      draggedParent.children = draggedParent.children!.filter(child => child.value !== this.draggNode.value);
    } else {
      this.updatedNodes = this.updatedNodes.filter(node => node.value !== this.draggNode.value);
    }

    // target 노드의 하위로 추가
    if (!targetNode.children) {
      targetNode.children = [];
    }
    targetNode.children.push(this.draggNode);

    // target 노드를 확장 상태로 변경 (하위가 추가되었으므로)
    targetNode.expanded = true;

    this.requestUpdate();
    this.emitNodesChanged();
  }


  private handleDragLeave(e: DragEvent) {
    const dropZone = e.target as HTMLElement;
    dropZone.dataset.dragging = '';
    dropZone.style.marginLeft = '0';
  }

  // 노드 이동 처리
  private moveNode(draggedKey: string, targetKey: string, dropPosition: 'above' | 'on' | 'below', targetLevel: number) {
    const { node: draggedNode, parent: draggedParent } = this.findNodeAndParent(this.updatedNodes, draggedKey);
    const { node: targetNode, parent: targetParent } = this.findNodeAndParent(this.updatedNodes, targetKey);

    const isDescendant = this.isDescendant(draggedNode, targetNode);
    if (!draggedNode || !targetNode || isDescendant) return;

    // Remove the dragged node from its parent
    if (draggedParent) {
      draggedParent.children = draggedParent.children!.filter(child => child.value?.toString() !== draggedKey?.toString());
    } else {
      this.updatedNodes = this.updatedNodes.filter(node => node.value?.toString() !== draggedKey?.toString());
    }

    // Add the dragged node to the target position
    if (dropPosition === 'above' || dropPosition === 'below') {
      const targetChildren = targetParent ? targetParent.children : this.updatedNodes;
      const targetIndex = targetChildren!.findIndex(child => child.value?.toString() === targetKey?.toString());
      targetChildren!.splice(dropPosition === 'above' ? targetIndex : targetIndex + 1, 0, draggedNode);
    } else if (dropPosition === 'on') {
      targetNode.children = targetNode.children || [];
      targetNode.children.push(draggedNode);
    }

    this.updateTree(this.updatedNodes, draggedKey, draggedNode?.checked ? true : false);
    this.requestUpdate();
    this.emitNodesChanged();
  }

  // 노드 상태 업데이트
  private updateTree(nodes: TreeNode[], value: string, checked: boolean): boolean {
    // This method will return `true` if any node's state was changed
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

  // 노드의 특정 속성 업데이트
  private updateNodeProperty(value: string, property: string, expended: any) {
    const updateProperty = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.value?.toString() === value?.toString() && (node as any)[property] !== expended) {
          (node as any)[property] = expended;
          this.requestUpdate(); // 상태가 실제로 변경된 경우에만 업데이트 요청
          return;
        }
        if (node.children) {
          updateProperty(node.children);
        }
      }
    };
    updateProperty(this.updatedNodes);
  }

  findNode(nodes: TreeNode[], value: string): TreeNode | null {
    for (const node of nodes) {
      if (node.value?.toString() === value?.toString()) {
        return node;
      }
      if (node.children) {
        const result = this.findNode(node.children, value);
        if (result) return result;
      }
    }
    return null;
  }

// 트리에서 노드와 부모 노드 찾기
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

  // 자손인지 확인
  private isDescendant(parent: TreeNode | null, child: TreeNode | null): boolean {
    if (!parent || !child) return false;
  
    // Check if the child is one of the parent's direct children
    if (parent.children?.some(c => c.value?.toString() === child.value?.toString())) {
      return true;
    }
  
    // Recursively check if the child is a descendant of any of the parent's children
    return parent.children?.some(c => this.isDescendant(c, child)) ?? false;
  }
  

  // 트리 상태 변경 이벤트 발생
  private emitNodesChanged() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      // Make sure the updatedNodes are properly referenced in nodes
      this.nodes = [...this.updatedNodes];
      
      this.dispatchEvent(new CustomEvent('nodesChanged', {
        detail: { nodes: this.updatedNodes },
        bubbles: true,
        composed: true
      }));
      
      // Force a complete re-render after emitting changes
      this.requestUpdate();
    }, 0);
  }

  // Update children check state recursively
  private updateChildren(node: TreeNode, checked: boolean) {
    node.checked = checked;
    node.indeterminate = false;
    
    if (node.children) {
      node.children.forEach(child => {
        this.updateChildren(child, checked);
      });
    }
  }

  private updateParent(nodes: TreeNode[], node: TreeNode) {
    const parent = this.findParent(nodes, node);
    if (parent) {
      const allChecked = parent.children?.every(child => child.checked) ?? false;
      const noneChecked = parent.children?.every(child => !child.checked && !child.indeterminate) ?? false;
      parent.checked = allChecked;
      parent.indeterminate = !allChecked && !noneChecked;
      this.updateParent(nodes, parent);
    }
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

  // Enhanced updateParentState to handle edge cases
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


  private isEqual(array1: TreeNode[], array2: TreeNode[]): boolean {
    if(array1.length && array2.length) {
      return JSON.stringify(array1) === JSON.stringify(array2);
    }
    return false;
    
  }


  private filterNodes(nodes: TreeNode[], searchTerm: string): TreeNode[] {
    if (!this.isTreeSelect) {
      return nodes;
    }

    if (!searchTerm) {
      // When no search term and isTreeSelect is true, 
      // if expandable is true and expandAll is true, expand all nodes
      // if expandable is true but expandAll is false, collapse all nodes
      // if expandable is false, expand all nodes
      return nodes.map(node => ({
        ...node,
        expanded: this.expandable ? this.expandAll : true,
        children: node.children ? this.filterNodes(node.children, searchTerm) : []
      }));
    }

    // For first level nodes only
    return nodes.map(node => {
      const isMatch = node.label.toLowerCase().includes(searchTerm.toLowerCase());
      const children = node.children ? this.filterNodes(node.children, searchTerm) : [];
      const hasMatchingChildren = this.hasMatchInChildren(children, searchTerm);

      // First level matching logic
      if (isMatch && !hasMatchingChildren) {
        return {
          ...node,
          expanded: false, // Keep first level matched nodes collapsed
          children
        };
      }
      
      // For non-matching first level nodes, check children
      return {
        ...node,
        expanded: hasMatchingChildren, // Expand only if children have matches
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

  /**
   * selectedValue가 설정되면 해당 노드까지의 모든 부모 노드들을 expand
   */
  private expandParentNodesForSelectedValue(selectedValue: string) {
    if (!selectedValue) return;
    
    // 선택된 값들 (쉼표로 구분된 경우 처리)
    const selectedValues = selectedValue.split(',').map(val => val.trim());
    
    // 각 선택된 값에 대해 부모 노드들을 expand
    selectedValues.forEach(value => {
      if (value) {
        this.expandParentNodesForValue(this.updatedNodes, value);
      }
    });
    
    this.requestUpdate();
  }

  /**
   * 특정 value를 가진 노드까지의 모든 부모 노드들을 expand
   */
  private expandParentNodesForValue(nodes: TreeNode[], targetValue: string): boolean {
    if (!nodes) return false;
    
    for (const node of nodes) {
      // 현재 노드가 타겟인지 확인
      if (node.value === targetValue) {
        return true; // 타겟을 찾았음
      }
      
      // 자식 노드들에서 타겟을 찾기
      if (node.children && node.children.length > 0) {
        const foundInChildren = this.expandParentNodesForValue(node.children, targetValue);
        if (foundInChildren) {
          // 자식에서 타겟을 찾았으므로 현재 노드를 expand
          node.expanded = true;
          return true;
        }
      }
    }
    
    return false; // 타겟을 찾지 못했음
  }
}
