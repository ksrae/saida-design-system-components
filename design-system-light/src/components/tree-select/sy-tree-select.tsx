import { Component, Prop, State, Event, EventEmitter, h, Element, Watch, Method, AttachInternals } from '@stencil/core';
import { TreeNode } from '../tree/sy-tree';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-tree-select',
  styleUrl: 'sy-tree-select.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SyTreeSelect {
  @Element() host: HTMLSyTreeSelectElement;
  @AttachInternals() internals: ElementInternals;
  // --- Props ---
  @Prop({ mutable: true }) nodes: TreeNode[] = [];
  @Prop() checkable = false;
  @Prop() clearable = false;
  @Prop({ attribute: 'defaultValue', mutable: true }) defaultValue = '';
  @Prop() disabled = false;
  @Prop() status: 'error' | 'default' = 'default';
  @Prop() expandable = false;
  @Prop({ attribute: 'expandAll', mutable: true }) expandAll = false;
  @Prop() line = false;
  @Prop() loading = false;
  @Prop({ attribute: 'maxTagCount', mutable: true }) maxTagCount = 0;
  @Prop({ attribute: 'nodeWidth', mutable: true }) nodeWidth: number | null = null;
  @Prop() placeholder = '';
  @Prop({ attribute: 'appendParent', mutable: true }) appendParent = false;
  @Prop() readonly = false;
  @Prop() required = false;
  @Prop() name = '';
  @Prop({ attribute: 'noNativeValidity', mutable: true }) noNativeValidity = false;

  // --- State ---
  @State() private searchTerm = '';
  @State() private isOpen = false;
  @State() private selectedItem: { value: string; label: string }[] = [];
  @State() private treePlaceHolder = '';
  @State() private hasSearchResults = true;
  @State() private mode: "default" | "searchable" | "multiple" | "tag" = 'searchable';
  @State() private touched = false;
  @State() private formSubmitted = false;
  @State() private isValid = true;
  @State() private hasPopupErrorComponent = false;

  private treeElement: HTMLSyTreeElement | undefined;
  private selectElement: HTMLSySelectElement | undefined;
  private selfObserver: MutationObserver | null = null;
  private popupContainer: HTMLElement | null = null;
  private justOpened: boolean = false;
  private openTimestamp: number = 0;
  

  // --- Events ---
  @Event() changed: EventEmitter<{ selectedItem: { value: string; label: string }[]; isValid: boolean }>;

  // --- Lifecycle Methods ---
  connectedCallback() {
    console.log('[TreeSelect] connectedCallback, isOpen:', this.isOpen);
    
    document.addEventListener("click", this.handleOutsideClick, true);
    this.setupSelfObserver();
    this.formSubmitListener();
  }

  componentWillLoad() {
    console.log('[TreeSelect] componentWillLoad, checkable:', this.checkable);
    
    this.defaultValue = fnAssignPropFromAlias(this.host, 'default-value') ?? this.defaultValue;
    this.expandAll = fnAssignPropFromAlias(this.host, 'expand-all') ?? this.expandAll;
    this.maxTagCount = fnAssignPropFromAlias(this.host, 'max-tag-count') ?? this.maxTagCount;
    this.nodeWidth = fnAssignPropFromAlias(this.host, 'node-width') ?? this.nodeWidth;
    this.appendParent = fnAssignPropFromAlias(this.host, 'append-parent') ?? this.appendParent;
    this.noNativeValidity = fnAssignPropFromAlias(this.host, 'no-native-validity') ?? this.noNativeValidity;

    // Set mode based on checkable - do it here before watcher
    this.mode = this.checkable ? 'tag' : 'searchable';
    
    console.log('[TreeSelect] componentWillLoad done, mode:', this.mode, 'isOpen:', this.isOpen);

    // Initialize default value here to avoid re-renders in componentDidLoad
    if (this.defaultValue) {
      this.initializeDefaultValue();
    }
  }
  
  componentDidLoad() {
    console.log('[TreeSelect] componentDidLoad, isOpen:', this.isOpen, 'checkable:', this.checkable);
    
    if (this.appendParent) {
      this.treeElement = this.host.querySelector('sy-tree');
    }

    this.selectElement = this.host.querySelector('sy-select');

    this.updateCheckStatus(this.nodes);
    this.updateFormValue();
    
    console.log('[TreeSelect] componentDidLoad done, isOpen:', this.isOpen);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick, true);
    this.cleanupSelfObserver();
    window.removeEventListener('beforeunload', this.closeTreeSelectOption);
    const form = this.host.closest('form');
    if (form) {
      form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  // --- Watchers ---
  @Watch('defaultValue')
  @Watch('nodes')
  handleDefaultValueOrNodesChange() {
    console.log('[TreeSelect] nodes or defaultValue changed:', {
      nodesLength: this.nodes?.length,
      defaultValue: this.defaultValue
    });
    
    if (this.defaultValue) {
      this.initializeDefaultValue();
    }
    
    // Update tree element if popup is open
    if (this.popupContainer) {
      const treeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (treeElement) {
        console.log('[TreeSelect] Updating popup tree nodes');
        treeElement.nodes = this.nodes;
      }
    }
  }

  @Watch('checkable')
  @Watch('expandable')
  handleCheckableOrExpandableChange() {
    console.log('[TreeSelect] checkable/expandable changed, checkable:', this.checkable);
    
    this.searchTerm = '';
    
    if (this.checkable !== undefined) {
      const selectElement = this.host.querySelector('sy-select');
      // Use 'tag' mode for checkable (multiple selection with tags)
      this.mode = this.checkable ? 'tag' : 'searchable';
      
      console.log('[TreeSelect] Mode set to:', this.mode);

      if (this.defaultValue) {
        this.initializeDefaultValue();
      } else {
        this.selectedItem = [];
      }

      if (selectElement) {
        (selectElement as any).selectedOptions = this.selectedItem;
      }
    }
    
    this.filterAndExpandNodes();
  }

  @Watch('placeholder')
  handlePlaceholderChange() {
    this.treePlaceHolder = this.placeholder;
  }

  @Watch('isOpen')
  handleIsOpenChange(newValue: boolean, oldValue: boolean) {
    const stack = new Error().stack;
    console.log(`[TreeSelect] isOpen changed: ${oldValue} -> ${newValue}`, this.host);
    console.log('[TreeSelect] Call stack:', stack);
    if (!this.appendParent) {
      if (newValue && !oldValue) {
        console.log('[TreeSelect] Opening - closing others first');
        this.closeAllOtherTreeSelects();
        // Open immediately without setTimeout
        console.log('[TreeSelect] Opening popup now');
        // Don't set justOpened here - already set in handleContainerClick
        this.openTreeSelectOption();
        // justOpened flag is now reset immediately in handleOutsideClick
      } else if (!newValue && oldValue) {
        // Closing: remove popup but don't trigger watcher again
        console.log('[TreeSelect] Closing popup');
        if (this.popupContainer) {
          console.log('[TreeSelect] Removing THIS instance popup container');
          this.popupContainer.remove();
          this.popupContainer = null;
        }
        window.removeEventListener('beforeunload', this.closeTreeSelectOption);
      }
    }
  }

  @Watch('loading')
  handleLoadingChange() {
    this.updateTreeSelectPopup();
  }

  @Watch('hasSearchResults')
  handleHasSearchResultsChange() {
    this.updateTreeSelectPopup();
  }

  @Watch('searchTerm')
  handleSearchTermChange() {
    console.log('[TreeSelect] searchTerm changed:', this.searchTerm);
    
    // Update popup tree element with searchTerm for highlighting
    if (!this.appendParent && this.popupContainer) {
      const treeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (treeElement) {
        console.log('[TreeSelect] Setting popup tree searchTerm:', this.searchTerm);
        treeElement.searchTerm = this.searchTerm;
      } else {
        console.log('[TreeSelect] Tree element not found in popup!');
      }
    }
    
    // Update inline tree element if appendParent is true
    if (this.appendParent && this.treeElement) {
      console.log('[TreeSelect] Setting inline tree searchTerm:', this.searchTerm);
      this.treeElement.searchTerm = this.searchTerm;
    }
  }

  // --- Public Methods ---
  @Method()
  async setCustomValidity(message: string) {
    this.internals.setValidity({ customError: true }, message);
    this.isValid = false;
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    return this.internals.checkValidity();
  }

  @Method()
  async reportValidity(): Promise<boolean> {
    return this.internals.reportValidity();
  }

  // --- Render ---
  render() {
    return (
      <div class={{
        "sy-tree-select-container": true,
        "sy-tree-select-disabled": this.disabled,
        "sy-tree-select-error": !this.isValid
      }}>
        <div class="sy-tree-select-inner" onClick={(e) => this.handleContainerClick(e)}>
          <sy-select
            isTreeSelect={true}
            mode={this.mode}
            placeholder={this.treePlaceHolder}
            clearable={this.clearable}
            disabled={this.disabled}
            readonly={this.readonly}
            error={this.status === 'error' || ((this.touched || this.formSubmitted) && !this.isValid)}
            required={this.required}
            maxTagCount={this.maxTagCount}
            onInputChanged={this.handleSearchInputChanged.bind(this)}
            onFocused={this.handleSearchFocus.bind(this)}
            onBlured={this.handleSearchBlur.bind(this)}
            onOpened={this.handleSearchFocus.bind(this)}
            onRemoved={this.handleRemovedItem.bind(this)}
            onCleared={this.handleCleared.bind(this)}
          ></sy-select>
          {this.appendParent && (
            <div class={{
              'sy-tree-select-option-container': true,
              'visible': this.isOpen,
              'loading': this.loading,
              'empty': !this.hasSearchResults,
            }}>
              <sy-tree
                clickable
                nodes={this.nodes}
                checkable={this.checkable}
                expandable={this.expandable}
                line={this.line}
                selectedValue={this.selectedItem?.length ? this.selectedItem.map(item => item.value).join(',') : this.defaultValue}
                nodeWidth={this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null}
                searchTerm={this.searchTerm}
                expandAll={this.expandAll}
                isTreeSelect={true}
                onNodesChanged={this.handleNodesChanged.bind(this)}
                onItemSelected={this.handleTreeItemClick.bind(this)}
              ></sy-tree>
              <div class="loading-container">
                <sy-spinner></sy-spinner>
              </div>
              <div class="empty-container">
                <sy-empty></sy-empty>
              </div>
            </div>
          )}
        </div>
        <div class={{
          'error-container': true,
          'popup-error-container': this.hasPopupErrorComponent,
          'text-error-container': !this.hasPopupErrorComponent,
          'visible-error': (this.touched || this.formSubmitted) && !this.isValid
        }}>
          <slot name="error" onSlotchange={this.handleCustomErrorSlot.bind(this)}></slot>
        </div>
      </div>
    );
  }

  // --- Private Methods ---
  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    this.updateValidityState();
  };

  private openTreeSelectOption() {
    this.renderTreeSelectPopup();
    this.initializeTreeSelect();
    this.updateTreeSelectPosition();
    window.addEventListener('beforeunload', this.closeTreeSelectOption);
  }

  private renderTreeSelectPopup() {
    // Store popup reference in instance property instead of querySelector
    if (!this.popupContainer) {
      console.log('[TreeSelect] Creating new popup container');
      this.popupContainer = document.createElement("div");
      this.popupContainer.classList.add("sy-tree-select-option-container");
      this.popupContainer.classList.add("visible");
      this.popupContainer.style.position = 'absolute';
      this.popupContainer.style.zIndex = '1000';
      this.popupContainer.style.backgroundColor = 'var(--treeselect-background-enabled, #fff)';
      this.popupContainer.style.border = '1px solid var(--border-color, #d9d9d9)';
      this.popupContainer.style.borderRadius = '4px';
      this.popupContainer.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
      this.popupContainer.style.maxHeight = '300px';
      this.popupContainer.style.overflowY = 'auto';
      document.body.appendChild(this.popupContainer);

      if (this.loading) {
        this.popupContainer.classList.add("loading");
        const loadingContainer = document.createElement("div");
        loadingContainer.classList.add("loading-container");
        loadingContainer.style.width = '100%';
        loadingContainer.style.display = 'flex';
        loadingContainer.style.minHeight = '60px';
        loadingContainer.style.alignItems = 'center';
        loadingContainer.style.justifyContent = 'center';
        const spinnerElement = document.createElement("sy-spinner");
        loadingContainer.appendChild(spinnerElement);
        this.popupContainer.appendChild(loadingContainer);
      } else if (!this.hasSearchResults) {
        this.popupContainer.classList.add("empty");
        const emptyContainer = document.createElement("div");
        emptyContainer.classList.add("empty-container");
        emptyContainer.style.width = '100%';
        emptyContainer.style.display = 'flex';
        emptyContainer.style.minHeight = '60px';
        emptyContainer.style.alignItems = 'center';
        emptyContainer.style.justifyContent = 'center';
        const emptyElement = document.createElement("sy-empty");
        emptyContainer.appendChild(emptyElement);
        this.popupContainer.appendChild(emptyContainer);
      } else {
        this.treeElement = document.createElement("sy-tree") as HTMLSyTreeElement;
        this.treeElement.clickable = true;
        this.treeElement.nodes = this.nodes;
        this.treeElement.checkable = this.checkable;
        this.treeElement.expandable = this.expandable;
        this.treeElement.line = this.line;
        this.treeElement.selectedValue = this.selectedItem?.length ? this.selectedItem.map(item => item.value).join(',') : this.defaultValue;
        this.treeElement.nodeWidth = this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null;
        this.treeElement.searchTerm = this.searchTerm;
        this.treeElement.expandAll = this.expandAll;
        this.treeElement.isTreeSelect = true;
        
        console.log('[TreeSelect] Initial popup tree searchTerm:', this.searchTerm);
        
        this.treeElement.addEventListener('itemSelected', (e: any) => {
          this.handleTreeItemClick(e);
        });
        this.treeElement.addEventListener('nodesChanged', (e: any) => {
          this.handleNodesChanged(e);
        });

        this.popupContainer.appendChild(this.treeElement);
      }
    }
  }

  private updateTreeSelectPopup() {
    if (this.popupContainer) {
      if (this.loading) {
        const exist = this.popupContainer.querySelector('sy-spinner');
        if (!exist) {
          this.popupContainer.innerHTML = '';
          const loadingContainer = document.createElement("div");
          loadingContainer.classList.add("loading-container");
          const spinnerElement = document.createElement("sy-spinner");
          loadingContainer.appendChild(spinnerElement);
          this.popupContainer.appendChild(loadingContainer);
        }
      } else if (!this.hasSearchResults) {
        const exist = this.popupContainer.querySelector('sy-empty');
        if (!exist) {
          this.popupContainer.innerHTML = '';
          const emptyContainer = document.createElement("div");
          emptyContainer.classList.add("empty-container");
          const emptyElement = document.createElement("sy-empty");
          emptyContainer.appendChild(emptyElement);
          this.popupContainer.appendChild(emptyContainer);
        }
      } else {
        const exist = this.popupContainer.querySelector('sy-tree');
        if (!exist) {
          this.popupContainer.innerHTML = '';
          this.renderTreeSelectPopup();
        }
      }
    }
  }

  private initializeTreeSelect() {
    if (this.popupContainer) {
      const treeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (treeElement) {
        console.log('[TreeSelect] Initializing popup tree');
        treeElement.nodes = this.nodes;
        treeElement.searchTerm = this.searchTerm;
      }
    }
  }

  private updateTreeSelectPosition() {
    const selectElement = this.host.querySelector('sy-select');
    
    if (selectElement && this.popupContainer) {
      const rect = selectElement.getBoundingClientRect();
      this.popupContainer.style.position = 'absolute';
      this.popupContainer.style.top = `${rect.bottom + window.scrollY}px`;
      this.popupContainer.style.left = `${rect.left + window.scrollX}px`;
      this.popupContainer.style.width = `${rect.width}px`;
      this.popupContainer.style.zIndex = '1000';
    }
  }

  private closeTreeSelectOption = () => {
    console.log('[TreeSelect] closeTreeSelectOption called (from outside click or beforeunload)');
    // Just set isOpen to false - watcher will handle popup removal
    this.isOpen = false;
    this.openTimestamp = 0; // Reset timestamp when closing
  };

  private handleOutsideClick = (event: Event) => {
    // Ignore clicks within 150ms of opening to prevent immediate close
    const timeSinceOpen = Date.now() - this.openTimestamp;
    if (this.justOpened || (this.openTimestamp > 0 && timeSinceOpen < 150)) {
      console.log('[TreeSelect] Ignoring outside click - just opened, isOpen:', this.isOpen, 'timeSinceOpen:', timeSinceOpen);
      this.justOpened = false; // reset immediately so only the first click is ignored
      return;
    }
    
    console.log('[TreeSelect] Outside click handler start, isOpen:', this.isOpen, 'justOpened:', this.justOpened);
    
    const target = event.target as HTMLElement;
    const path = event.composedPath();
    const isClickInsideTreeSelect = path.includes(this.host);
    const isClickInsidePopup = this.popupContainer && path.includes(this.popupContainer);
    
    // Check if click is inside sy-select component
    const isInsideSelect = target.closest('sy-select') !== null || target.tagName === 'INPUT';
    
    // If clicking inside sy-select, only ignore if popup is not open (to allow opening)
    // If popup is already open, clicking sy-select should close it
    if (isInsideSelect && !this.isOpen) {
      console.log('[TreeSelect] Ignoring click on sy-select when closed - will trigger opening');
      return;
    }
    
    // Also check if click target is inside any popup container by class
    const isInsideAnyPopup = target.closest('.sy-tree-select-option-container') !== null;

    console.log('[TreeSelect] Outside click:', {
      isClickInsideTreeSelect,
      isClickInsidePopup,
      isInsideAnyPopup,
      isOpen: this.isOpen,
      target: target?.tagName,
      targetClass: target?.className,
      closestCheckbox: target.closest('sy-checkbox') !== null,
      closestTreeItem: target.closest('sy-tree-item') !== null
    });

    if (!isClickInsideTreeSelect && !isClickInsidePopup && !isInsideAnyPopup && this.isOpen) {
      console.log('[TreeSelect] Closing due to outside click');
      this.closeTreeSelectOption();
    }
  };

  private handleSearchInputChanged(event: CustomEvent) {
    // sy-select emits string directly, not event.detail.value
    const value = typeof event.detail === 'string' ? event.detail : (event.detail?.value || '');
    console.log('[TreeSelect] handleSearchInputChanged:', value);
    this.searchTerm = value;
    this.filterAndExpandNodes();
  }

  private handleContainerClick(event: MouseEvent) {
    console.log('[TreeSelect] handleContainerClick', {
      disabled: this.disabled,
      readonly: this.readonly,
      status: this.status,
      isValid: this.isValid,
      isOpen: this.isOpen,
      checkable: this.checkable,
      mode: this.mode,
      elementId: this.host.id
    });
    
    if (this.disabled || this.readonly) {
      console.log('[TreeSelect] Blocked: disabled or readonly');
      return;
    }

    // error 상태에서는 열지 않음
    if (this.status === 'error') {
      console.log('[TreeSelect] Blocked: error status');
      return;
    }

    const target = event.target as HTMLElement;
    
    // sy-icon의 remove 아이콘을 클릭한 경우 (clear button)
    const syIcon = target.closest('sy-icon');
    if (syIcon && syIcon.classList.contains('remove')) {
      return;
    }

    // sy-tag를 클릭한 경우 (태그 자체는 클릭해도 dropdown 열림, 단 remove 버튼 제외)
    const syTag = target.closest('sy-tag');
    if (syTag) {
      // sy-tag 내부의 remove 관련 요소를 클릭한 경우
      if (target.tagName === 'SY-ICON' || target.closest('sy-icon')) {
        return;
      }
    }

    // 드롭다운 토글
    if (!this.isOpen) {
      console.log('[TreeSelect] Opening dropdown');
      this.openTimestamp = Date.now(); // Record when we opened
      this.justOpened = true; // Set BEFORE isOpen to prevent immediate outside click
      this.isOpen = true;
      console.log('[TreeSelect] isOpen set to true, current value:', this.isOpen);
      // Focus input after popup is fully rendered
      setTimeout(() => {
        const selectElement = this.host.querySelector('sy-select');
        if (selectElement) {
          const input = selectElement.querySelector('input');
          if (input && !this.readonly) {
            input.focus();
          }
        }
      }, 100);
    } else {
      console.log('[TreeSelect] Already open, ignoring click');
    }
  }

  private closeAllOtherTreeSelects() {
    // Close other tree-select instances
    const allTreeSelects = document.querySelectorAll('sy-tree-select');
    allTreeSelects.forEach((treeSelect) => {
      if (treeSelect !== this.host) {
        (treeSelect as any).isOpen = false;
      }
    });
  }

  private handleSearchFocus(_event: CustomEvent) {
    console.log('[TreeSelect] handleSearchFocus, current isOpen:', this.isOpen);
    // Don't automatically open on focus - let handleContainerClick control opening
    // this.isOpen = true;
    this.touched = true;
  }

  private handleSearchBlur(_event: CustomEvent) {
    // Blur 처리는 outside click에서 처리
  }

  private handleRemovedItem(event: CustomEvent) {
    const removedItem = event.detail.item;

    if (this.checkable && this.treeElement) {
      (this.treeElement as any).setCheckState(removedItem.value, false);
    }

    if (this.checkable && !this.appendParent) {
      const popupContainer = document.querySelector('.sy-tree-select-option-container');
      const popupTreeElement = popupContainer?.querySelector('sy-tree') as HTMLSyTreeElement;
      if (popupTreeElement) {
        (popupTreeElement as any).setCheckState(removedItem.value, false);
      }
    }
  }

  private handleCleared(_event: CustomEvent) {
    if (this.treeElement) {
      (this.treeElement as any).clearAllSelectedItem();
    }

    if (!this.appendParent) {
      const popupContainer = document.querySelector('.sy-tree-select-option-container');
      const popupTreeElement = popupContainer?.querySelector('sy-tree') as HTMLSyTreeElement;
      if (popupTreeElement) {
        (popupTreeElement as any).clearAllSelectedItem();
      }
    }

    this.selectedItem = [];
  }

  private handleTreeItemClick(event: CustomEvent) {
    event.preventDefault();

    if (this.checkable) {
      return;
    }

    this.touched = true;

    this.selectedItem = [{
      value: event.detail.value,
      label: event.detail.label
    }];

    if (this.selectElement) {
      (this.selectElement as any).selectedOptions = [...this.selectedItem];
      const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
      (this.selectElement as any).defaultValue = selectDefaultValue;
      (this.selectElement as any).setValue(selectDefaultValue);
      (this.selectElement as any).isOpen = false;
    }

    this.searchTerm = '';
    this.updateValidityState();
    this.updateFormValue();
    this.emitChangeEvent();
    
    // Close popup after selecting item (non-checkable mode)
    this.isOpen = false;
  }

  private handleNodesChanged(event: CustomEvent) {
    this.nodes = event.detail.nodes;

    if (this.checkable) {
      this.updateSelectedFromChecked(this.nodes);
      
      if (this.selectElement) {
        (this.selectElement as any).selectedOptions = [...this.selectedItem];
        const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
        (this.selectElement as any).setValue(selectDefaultValue);
      }

      this.searchTerm = '';
      this.hasSearchResults = false;
      this.filterAndExpandNodes();
      // Don't close popup in checkable mode - user may want to check multiple items
    }
  }

  private filterAndExpandNodes() {
    console.log('[TreeSelect] filterAndExpandNodes, searchTerm:', this.searchTerm);
    
    if (!this.searchTerm) {
      this.hasSearchResults = true;
      return;
    }

    const hasMatch = this.searchNodesRecursive(this.nodes, this.searchTerm.toLowerCase());
    this.hasSearchResults = hasMatch;
    console.log('[TreeSelect] Search results:', { hasMatch, searchTerm: this.searchTerm });
    
    // Expand nodes that match or have matching children
    if (hasMatch) {
      this.expandMatchingNodes(this.nodes, this.searchTerm.toLowerCase());
      console.log('[TreeSelect] Nodes expanded for search term');
      
      // Force tree update by reassigning nodes
      this.nodes = [...this.nodes];
      
      // Update popup tree if exists
      if (this.popupContainer) {
        const treeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
        if (treeElement) {
          treeElement.nodes = this.nodes;
        }
      }
    }
  }

  private expandMatchingNodes(nodes: TreeNode[], term: string): boolean {
    let hasMatchInSubtree = false;
    
    for (const node of nodes) {
      let nodeMatches = node.label.toLowerCase().includes(term);
      let childrenMatch = false;
      
      if (node.children && node.children.length > 0) {
        childrenMatch = this.expandMatchingNodes(node.children, term);
      }
      
      // Expand if this node or any descendant matches
      if (nodeMatches || childrenMatch) {
        node.expanded = true;
        hasMatchInSubtree = true;
      }
    }
    
    return hasMatchInSubtree;
  }

  private searchNodesRecursive(nodes: TreeNode[], term: string): boolean {
    let hasMatch = false;
    
    for (const node of nodes) {
      if (node.label.toLowerCase().includes(term)) {
        hasMatch = true;
      }
      
      if (node.children && node.children.length > 0) {
        if (this.searchNodesRecursive(node.children, term)) {
          hasMatch = true;
        }
      }
    }
    
    return hasMatch;
  }

  private updateSelectedFromChecked(nodes: TreeNode[]) {
    const selected: { value: string; label: string }[] = [];
    
    const collectChecked = (nodeList: TreeNode[]) => {
      for (const node of nodeList) {
        if (node.checked) {
          selected.push({ value: node.value, label: node.label });
        }
        if (node.children) {
          collectChecked(node.children);
        }
      }
    };
    
    collectChecked(nodes);
    this.selectedItem = selected;
  }

  private updateCheckStatus(nodes: TreeNode[]) {
    if (!this.checkable) return;

    const updateNode = (node: TreeNode) => {
      if (this.selectedItem.some(item => item.value === node.value)) {
        node.checked = true;
      }
      if (node.children) {
        node.children.forEach(child => updateNode(child));
      }
    };

    nodes.forEach(node => updateNode(node));
  }

  private initializeDefaultValue() {
    if (!this.defaultValue) return;

    const values = this.defaultValue.split(',').map(v => v.trim());
    const selected: { value: string; label: string }[] = [];

    const findNodes = (nodeList: TreeNode[]) => {
      for (const node of nodeList) {
        if (values.includes(node.value)) {
          selected.push({ value: node.value, label: node.label });
          if (this.checkable) {
            node.checked = true;
          }
        }
        if (node.children) {
          findNodes(node.children);
        }
      }
    };

    findNodes(this.nodes);
    this.selectedItem = selected;

    if (this.selectElement) {
      (this.selectElement as any).selectedOptions = [...this.selectedItem];
    }

    this.updateFormValue();
  }

  private updateFormValue() {
    const value = this.selectedItem.map(item => item.value).join(',');
    this.internals.setFormValue(value);
    this.updateValidityState();
  }

  private updateValidityState() {
    if (this.required && this.selectedItem.length === 0) {
      this.internals.setValidity(
        { valueMissing: true },
        this.getErrorMessage('valueMissing')
      );
      this.isValid = false;
    } else {
      this.internals.setValidity({});
      this.isValid = true;
    }
  }

  private emitChangeEvent() {
    this.changed.emit({
      selectedItem: this.selectedItem,
      isValid: this.isValid
    });
  }

  private setupSelfObserver() {
    this.selfObserver = new MutationObserver(() => {
      this.handleCustomErrorSlot();
    });

    this.selfObserver.observe(this.host, {
      childList: true,
      subtree: true,
    });
  }

  private cleanupSelfObserver() {
    if (this.selfObserver) {
      this.selfObserver.disconnect();
      this.selfObserver = null;
    }
  }

  private formSubmitListener() {
    const form = this.host.closest('form');
    if (form) {
      form.addEventListener('submit', this.handleFormSubmit);
    }
  }

  private handleCustomErrorSlot() {
    const errorSlot = this.host.querySelector('slot[name="error"]') as HTMLSlotElement;
    if (!errorSlot) return;

    const errorNodes = errorSlot.assignedNodes();

    this.hasPopupErrorComponent = errorNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName?.toLowerCase() || '';

        if (tagName === 'sy-tooltip' ||
          tagName === 'sy-popover' ||
          tagName === 'sy-popconfirm' ||
          tagName === 'sy-inline-message') {
          return true;
        }

        return !!element.querySelector(
          'sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message'
        );
      }
      return false;
    });

    // Unused but kept for potential future use
    const hasSlotErrorMessage = errorNodes.some(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        return !!(element.textContent?.trim() || element.children.length > 0);
      }
      return false;
    });

    if (hasSlotErrorMessage) {
      // Future use
    }
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "Please select an option",
      custom: 'Invalid by custom'
    };

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }
}
