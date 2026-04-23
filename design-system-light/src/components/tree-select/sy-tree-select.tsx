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
@State() private filteredNodes: TreeNode[] = [];

  // --- Events ---
  @Event() changed: EventEmitter<{ selectedItem: { value: string; label: string }[]; isValid: boolean }>;

  // --- Lifecycle Methods ---
  connectedCallback() {
    document.addEventListener("click", this.handleOutsideClick, true);
    this.setupSelfObserver();
    this.formSubmitListener();
  }

  componentWillLoad() {
    this.defaultValue = fnAssignPropFromAlias(this.host, 'default-value') ?? this.defaultValue;
    this.expandAll = fnAssignPropFromAlias(this.host, 'expand-all') ?? this.expandAll;
    this.maxTagCount = fnAssignPropFromAlias(this.host, 'max-tag-count') ?? this.maxTagCount;
    this.nodeWidth = fnAssignPropFromAlias(this.host, 'node-width') ?? this.nodeWidth;
    this.appendParent = fnAssignPropFromAlias(this.host, 'append-parent') ?? this.appendParent;
    this.noNativeValidity = fnAssignPropFromAlias(this.host, 'no-native-validity') ?? this.noNativeValidity;

    // Set mode based on checkable
    this.mode = this.checkable ? 'tag' : 'searchable';

    // 모든 초기화 로직을 여기로 이동
    if (this.defaultValue) {
      this.initializeDefaultValue();
      if (!this.expandAll) {
        this.expandNodesForDefaultValue();
      }
    } else if (this.checkable && this.nodes?.length > 0) {
      this.updateSelectedFromChecked(this.nodes);
    }

    // Form value 초기화
    this.updateFormValue();
  }


  componentDidLoad() {
    if (this.appendParent) {
      this.treeElement = this.host.querySelector('sy-tree');
    }

    this.selectElement = this.host.querySelector('sy-select');

    // selectedItem이 이미 설정되어 있으면 select 컴포넌트만 업데이트
    if (this.selectedItem.length > 0 && this.selectElement) {
      (this.selectElement as any).selectedOptions = [...this.selectedItem];

      // checkable이 아닐 때만 setValue 호출
      if (!this.checkable) {
        const selectLabels = this.selectedItem.map(item => item.label).join(',');
        (this.selectElement as any).setValue(selectLabels);
      }
    }
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
    if (this.defaultValue) {
      this.initializeDefaultValue();
    }
    else if (this.checkable && this.nodes?.length) {
      this.updateSelectedFromChecked(this.nodes);

      // select 컴포넌트 업데이트
      if (this.selectElement) {
        (this.selectElement as any).selectedOptions = [...this.selectedItem];
        // checkable 모드에서는 setValue 호출하지 않음
        if (!this.checkable) {
          const selectLabels = this.selectedItem.map(item => item.label).join(',');
          (this.selectElement as any).setValue(selectLabels);
        }
      }
    }

    // Update tree element if popup is open
    if (this.popupContainer) {
      const treeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (treeElement) {
        treeElement.nodes = this.nodes;
      }
    }
  }

  @Watch('checkable')
  @Watch('expandable')
  handleCheckableOrExpandableChange() {
    this.searchTerm = '';

    if (this.checkable !== undefined) {
      const selectElement = this.host.querySelector('sy-select');
      // Use 'tag' mode for checkable (multiple selection with tags)
      this.mode = this.checkable ? 'tag' : 'searchable';

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
    // const stack = new Error().stack;

    if (!this.appendParent) {
      if (newValue && !oldValue) {
        this.closeAllOtherTreeSelects();
        // Open immediately without setTimeout
        // Don't set justOpened here - already set in handleContainerClick
        this.openTreeSelectOption();
        // justOpened flag is now reset immediately in handleOutsideClick
      } else if (!newValue && oldValue) {
        // Closing: remove popup but don't trigger watcher again
        if (this.popupContainer) {
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
    // Update popup tree element with searchTerm for highlighting
    if (!this.appendParent && this.popupContainer) {
      const treeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (treeElement) {
        treeElement.searchTerm = this.searchTerm;
      } else {
        console.log('[TreeSelect] Tree element not found in popup!');
      }
    }

    // Update inline tree element if appendParent is true
    if (this.appendParent && this.treeElement) {
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
            selectedOptions={this.selectedItem}
            onInputChanged={(e: Event) => this.handleSearchInputChanged(e)}
            onFocused={() => { this.isOpen = true; this.touched = true; }}
            onBlured={(e: Event) => this.handleSearchBlur(e)}
            onOpened={() => { this.isOpen = true; this.touched = true; }}
            onRemoved={(e: Event) => this.handleRemovedItem(e)}
            onCleared={(e: Event) => this.handleCleared(e)}
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
                nodes={this.searchTerm ? this.filteredNodes : this.nodes}
                checkable={this.checkable}
                expandable={this.expandable}
                line={this.line}
                selectedValue={this.selectedItem?.length ? this.selectedItem.map(item => item.value).join(',') : this.defaultValue}
                nodeWidth={this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null}
                searchTerm={this.searchTerm}
                expandAll={this.expandAll}
                isTreeSelect={true}
                onNodesChanged={this.handleNodesChanged.bind(this)}
                onItemSelected={(e: Event) => {this.handleTreeItemClick(e);}}
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

private expandNodesForDefaultValue() {
  if (!this.defaultValue || !this.nodes?.length) return;

  const values = this.defaultValue.split(',').map(v => v.trim());

  values.forEach(value => {
    this.expandPathToNode(this.nodes, value);
  });
}

private expandPathToNode(nodes: TreeNode[], targetValue: string): boolean {
  for (const node of nodes) {
    if (node.value === targetValue) {
      return true;
    }

    if (node.children && node.children.length > 0) {
      const foundInChildren = this.expandPathToNode(node.children, targetValue);
      if (foundInChildren) {
        node.expanded = true;  // 경로상의 부모 노드를 펼침
        return true;
      }
    }
  }

  return false;
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
    if (!this.popupContainer) {
      this.popupContainer = document.createElement("div");
      this.popupContainer.classList.add("sy-tree-select-option-container");
      this.popupContainer.classList.add("visible");
      this.popupContainer.style.position = 'absolute';
      this.popupContainer.style.zIndex = 'var(--z-index-select, 800)';
      this.popupContainer.style.backgroundColor = 'var(--treeselect-background-enabled, #fff)';
      this.popupContainer.style.border = '1px solid var(--border-color, #d9d9d9)';
      this.popupContainer.style.borderRadius = '4px';
      this.popupContainer.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
      this.popupContainer.style.maxHeight = '300px';
      this.popupContainer.style.overflowY = 'auto';
      document.body.appendChild(this.popupContainer);
    }

    this.renderPopupContent();
  }

  private renderPopupContent() {
    if (!this.popupContainer) {
      return;
    }

    this.popupContainer.classList.remove("loading", "empty");
    this.popupContainer.innerHTML = '';
    this.treeElement = undefined;

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
      return;
    }

    if (!this.hasSearchResults) {
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
      return;
    }

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

    this.treeElement.addEventListener('itemSelected', (e: any) => {
      this.handleTreeItemClick(e);
    });
    this.treeElement.addEventListener('nodesChanged', (e: any) => {
      this.handleNodesChanged(e);
    });

    this.popupContainer.appendChild(this.treeElement);
  }

  private updateTreeSelectPopup() {
    if (this.popupContainer) {
      this.renderPopupContent();
    }
  }

  private initializeTreeSelect() {
    if (this.popupContainer) {
      const treeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (treeElement) {
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
      this.popupContainer.style.zIndex = 'var(--z-index-select, 800)';
    }
  }

  private closeTreeSelectOption = () => {
    // Just set isOpen to false - watcher will handle popup removal
    this.isOpen = false;
    this.openTimestamp = 0; // Reset timestamp when closing
  };

  private handleOutsideClick = (event: Event) => {
    // Ignore clicks within 150ms of opening to prevent immediate close
    const timeSinceOpen = Date.now() - this.openTimestamp;
    if (this.justOpened || (this.openTimestamp > 0 && timeSinceOpen < 150)) {
      this.justOpened = false; // reset immediately so only the first click is ignored
      return;
    }

    const target = event.target as HTMLElement;
    const path = event.composedPath();
    const isClickInsideTreeSelect = path.includes(this.host);
    const isClickInsidePopup = this.popupContainer && path.includes(this.popupContainer);

    // Check if click is inside sy-select component
    const isInsideSelect = target.closest('sy-select') !== null || target.tagName === 'INPUT';

    // If clicking inside sy-select, only ignore if popup is not open (to allow opening)
    // If popup is already open, clicking sy-select should close it
    if (isInsideSelect && !this.isOpen) {
      return;
    }

    // Also check if click target is inside any popup container by class
    const isInsideAnyPopup = target.closest('.sy-tree-select-option-container') !== null;

    if (!isClickInsideTreeSelect && !isClickInsidePopup && !isInsideAnyPopup && this.isOpen) {
      this.closeTreeSelectOption();

      // checkable이 아닐 때만 setValue 실행
      // checkable 모드에서는 태그로 표시되므로 input에 값을 설정하지 않음
      if (this.selectElement && !this.checkable) {
        const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
        this.selectElement.setValue(selectDefaultValue);
      }

      // 검색어를 초기화
      this.searchTerm = '';
      this.filterAndExpandNodes();
    }
  };

  private handleSearchInputChanged(event: any) {
    const value = typeof event.detail === 'string' ? event.detail : (event.detail?.value || '');
    this.searchTerm = value;
    this.filterAndExpandNodes();
  }

  private handleContainerClick(event: MouseEvent) {
    if (this.disabled || this.readonly) {
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
      this.openTimestamp = Date.now(); // Record when we opened
      this.justOpened = true; // Set BEFORE isOpen to prevent immediate outside click
      this.isOpen = true;
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
    }
    else {
      // console.log('[TreeSelect] Already open, ignoring click');
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

  private handleSearchBlur(_event: Event) {
    // Blur 처리는 outside click에서 처리
  }

  private handleRemovedItem(event: any) {
    const removedItem = event.detail.item;

    if (this.checkable && this.treeElement) {
      (this.treeElement as any).setCheckState(removedItem.value, false);
    }

    if (this.checkable && !this.appendParent && this.popupContainer) {
      const popupTreeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (popupTreeElement) {
        (popupTreeElement as any).setCheckState(removedItem.value, false);
      }
    }
  }

  private handleCleared(event: any) {
    event.preventDefault();

    if (this.treeElement) {
      (this.treeElement as any).clearAllSelectedItem();
    }

    if (!this.appendParent && this.popupContainer) {
      const popupTreeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (popupTreeElement) {
        (popupTreeElement as any).clearAllSelectedItem();
      }
    }

    this.selectedItem = [];
  }

  private handleTreeItemClick(event: any) {
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

  private handleNodesChanged(event: any) {
    this.nodes = event.detail.nodes;

    if (this.checkable) {
      this.updateSelectedFromChecked(this.nodes);

      if (this.selectElement) {
        (this.selectElement as any).selectedOptions = [...this.selectedItem];
        // checkable 모드에서는 setValue 호출하지 않음
        if (!this.checkable) {
          const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
          (this.selectElement as any).setValue(selectDefaultValue);
        }
      }

      this.searchTerm = '';
      this.filterAndExpandNodes();
    }
  }


  private filterAndExpandNodes() {
    if (!this.searchTerm) {
      this.filteredNodes = this.nodes;
    } else {
      // tree의 filterNodes 로직을 여기서 직접 구현
      this.filteredNodes = this.filterNodesRecursive(this.nodes, this.searchTerm.toLowerCase());
    }
    this.hasSearchResults = this.filteredNodes.length > 0;
  }

  private filterNodesRecursive(nodes: TreeNode[], searchTerm: string): TreeNode[] {
    return nodes.reduce((acc: TreeNode[], node) => {
      const isMatch = node.label.toLowerCase().includes(searchTerm);
      const filteredChildren = node.children ? this.filterNodesRecursive(node.children, searchTerm) : [];

      if (isMatch || filteredChildren.length > 0) {
        acc.push({
          ...node,
          expanded: filteredChildren.length > 0,
          children: filteredChildren
        });
      }

      return acc;
    }, []);
  }

  private updateSelectedFromChecked(nodes: TreeNode[]) {
    const selected: { value: string; label: string }[] = [];

    // Lit 코드의 알고리즘 그대로 적용
    const collectCheckedValues = (node: TreeNode): { value: string, label: string }[] => {
      // 부모가 체크된 경우 - 자식 확인하지 않고 바로 리턴
      if (node.checked) {
        return [{ value: node.value, label: node.label ?? node.value }];
      }

      // 부모가 체크되지 않은 경우에만 자식들 확인
      const values: { value: string, label: string }[] = [];
      if (node.children) {
        for (const child of node.children) {
          const childCheckedValues = collectCheckedValues(child);
          values.push(...childCheckedValues);
        }
      }
      return values;
    };

    // 모든 노드에 대해 수집
    for (const node of nodes) {
      selected.push(...collectCheckedValues(node));
    }

    this.selectedItem = selected;
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
