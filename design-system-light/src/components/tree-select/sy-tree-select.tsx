import { Component, Prop, State, Event, EventEmitter, h, Element, Watch, Method, AttachInternals, Listen } from '@stencil/core';
import { TreeNode } from '../tree/sy-tree';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-tree-select — dropdown selector backed by a tree (single or multi-select).
 *
 * Spec: design-system-specs/components/tree-select.yaml
 *
 * Form-associated: submits `name` → selected value(s) via ElementInternals.
 * Validation follows the same pattern as sy-input / sy-select:
 *   - `noNativeValidity=false` (default) → native browser popup on submit.
 *     DO NOT preventDefault the invalid event.
 *   - `noNativeValidity=true` → native popup suppressed, `[slot="error"]`
 *     becomes the error UI.
 *   - `setCustomError()` → programmatic; forces slot UI visible.
 *
 * Props: nodes (TreeNode[]), checkable, clearable, defaultValue, disabled,
 * status, expandable, expandAll, line, loading, maxTagCount, nodeWidth,
 * placeholder, appendParent, readonly, required, name, noNativeValidity.
 */
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
  @State() private validStatus: 'valueMissing' | 'custom' | '' = '';
  @State() private hasSlotErrorMessage = false;
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

  get value(): string {
    return this.selectedItem.map(item => item.value).join(',');
  }

  get validity(): ValidityState {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return {
        badInput: false,
        customError: this.validStatus === 'custom' || this.hasSlotErrorMessage,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valid: false,
        valueMissing: this.validStatus === 'valueMissing',
      } as ValidityState;
    }
    return this.internals?.validity;
  }

  get validationMessage(): string {
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      return this.getSlotErrorText() || this.getErrorMessage(this.validStatus);
    }
    return this.internals?.validationMessage;
  }

  get willValidate(): boolean {
    return this.internals?.willValidate;
  }

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

    // Mirror placeholder to the @State copy on first load. The watcher only
    // syncs on subsequent prop changes, so a placeholder set declaratively
    // (e.g. in JSX or via attribute) was never propagated to the inner
    // sy-select on the first render.
    this.treePlaceHolder = this.placeholder;

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
    // Apply nodeWidth on first paint — otherwise the host stays at its
    // default block width and the watcher only kicks in on subsequent
    // changes, leaving initial render at the wrong size.
    this.applyNodeWidth();

    // Re-seed validity after sy-select has rendered so ElementInternals gets
    // a real focusable anchor for native reportValidity / submit popups.
    this.updateValidityState();
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
  // defaultValue and nodes used to share one watcher that always re-ran
  // initializeDefaultValue when EITHER changed. That broke checkable mode:
  // every checkbox toggle emits nodesChanged → tree-select reassigns
  // this.nodes → watcher fires → initializeDefaultValue forces nodes in
  // defaultValue back to checked=true → user's uncheck snaps back. Splitting
  // the two watchers means nodes change re-derives selection from the
  // tree's actual checked state without resetting to defaultValue.
  @Watch('defaultValue')
  handleDefaultValuePropChange() {
    if (this.defaultValue) {
      this.initializeDefaultValue();
    }
  }

  @Watch('nodes')
  handleNodesPropChange() {
    if (this.checkable && this.nodes?.length) {
      this.updateSelectedFromChecked(this.nodes);
      if (this.selectElement) {
        (this.selectElement as any).selectedOptions = [...this.selectedItem];
      }
    }
    // Push to popup tree if open.
    if (this.popupContainer) {
      const treeElement = this.popupContainer.querySelector('sy-tree') as HTMLSyTreeElement;
      if (treeElement) {
        treeElement.nodes = this.nodes;
      }
    }
  }

  @Watch('required')
  handleRequiredChange() {
    // No watcher previously meant Storybook toggles of `required` left
    // internals.setValidity stale until the next selection change.
    this.updateValidityState();
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

  @Watch('nodeWidth')
  handleNodeWidthChange() {
    // nodeWidth on tree-select is the WIDTH OF THE WHOLE COMPONENT (trigger
    // and popup) — not a per-item label cap. Capping individual items
    // produced the user-reported bug: labels were truncated arbitrarily
    // even when the popup itself had plenty of horizontal room left, so the
    // ellipsis looked random. Now nodeWidth resizes the host (and therefore
    // the popup, which inherits the trigger's rect width), and labels
    // truncate naturally because the container is narrow — matching the
    // user's mental model of "if I asked for 80px, give me an 80px box."
    this.applyNodeWidth();
    if (this.popupContainer) {
      this.updateTreeSelectPosition();
    }
  }

  private applyNodeWidth() {
    if (this.nodeWidth !== null && this.nodeWidth > 0) {
      this.host.style.width = `${this.nodeWidth}px`;
    } else {
      this.host.style.width = '';
    }
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
    if (message) {
      this.isValid = false;
      this.validStatus = 'custom';
      this.touched = true;
      this.internals.setValidity({ customError: true }, message, this.getValidationAnchor());
    } else {
      if (this.validStatus === 'custom') {
        this.validStatus = '';
        this.isValid = true;
      }
      this.updateValidityState();
    }
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
            // Intentionally NOT forwarding `required` to the inner sy-select.
            // Both sy-tree-select and sy-select are form-associated; if both
            // declare `required`, the form ends up with two invalid controls
            // and reportValidity() anchored its native popup at sy-select
            // (the inner one) — far from where the user expected. Tree-select
            // owns validation here; sy-select is just the visual surface.
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
      // Inline padding because Stencil's scoped CSS doesn't reach this popup
      // — it's created via document.createElement and appended to <body>, so
      // it never gets the `sc-sy-tree-select` scope class. Class-based
      // padding rules in the .scss file therefore don't match. Without this,
      // checkbox/label items rendered against the popup's left edge with no
      // breathing room.
      this.popupContainer.style.padding = 'var(--spacing-3xsmall, 8px) var(--spacing-xsmall, 12px)';
      // Intentionally NOT setting maxHeight/overflowY: the popup grows to fit
      // all nodes so users see the full tree without an inner scrollbar.
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
    // Intentionally NOT setting tree.nodeWidth — tree-select's nodeWidth is
    // a host-width concept (whole component), not a per-tree-item cap. The
    // popup width comes from the trigger's bounding rect, so labels
    // truncate naturally to the popup width.
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

    // Wipe the inner sy-select's displayed text. selectedItem clearing alone
    // doesn't drop the input value because sy-select stores it in its own
    // `inputValue` state — without setValue('')/clearValue() the user-visible
    // label stayed and clearable looked broken.
    if (this.selectElement) {
      (this.selectElement as any).selectedOptions = [];
      (this.selectElement as any).setValue?.('');
      (this.selectElement as any).clearValue?.();
    }

    this.updateValidityState();
    this.updateFormValue();
    this.emitChangeEvent();
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
    // Reassign nodes — fires @Watch('nodes') which re-derives selectedItem
    // from the new check states. (Previously the watcher ALSO re-applied
    // defaultValue, snapping unchecked items back to checked; that watcher
    // is now split so this path no longer fights the user's clicks.)
    this.nodes = event.detail.nodes;

    if (this.checkable) {
      this.updateSelectedFromChecked(this.nodes);
      if (this.selectElement) {
        (this.selectElement as any).selectedOptions = [...this.selectedItem];
      }
      this.searchTerm = '';
      this.filterAndExpandNodes();
      // Form integration was missing — without these the host's form value /
      // validity / `changed` event never moved when the user toggled a
      // checkbox, so nothing downstream knew the selection had changed.
      this.updateValidityState();
      this.updateFormValue();
      this.emitChangeEvent();
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
    // Parent-collapse: when a parent is checked (either explicitly or because
    // all its children are), return the parent as a single tag and stop
    // recursing. When the parent isn't checked but some children are,
    // return just those checked children. This mirrors typical tree-select
    // UX — "all under Fruits" reads as Fruits, not Apple+Banana+...
    const selected: { value: string; label: string }[] = [];

    const collect = (node: TreeNode) => {
      if (node.checked) {
        selected.push({ value: node.value, label: node.label ?? node.value });
        return;
      }
      if (node.children) {
        node.children.forEach(collect);
      }
    };

    nodes.forEach(collect);
    this.selectedItem = selected;
  }

  private initializeDefaultValue() {
    if (!this.defaultValue) return;

    const values = this.defaultValue.split(',').map(v => v.trim());

    // Mark matching nodes as checked. For checkable mode we also propagate
    // the auto-check state up to parents so the rendered tree's checkboxes
    // match what the user expects (parent gets checked when all children
    // are checked, indeterminate otherwise). Without this propagation the
    // initial UI would show every leaf as ticked but the parent looking
    // unchecked, then snap to the propagated state on first interaction
    // — bug #2's flicker.
    const markChecked = (nodeList: TreeNode[]) => {
      for (const node of nodeList) {
        if (values.includes(node.value) && this.checkable) {
          node.checked = true;
        }
        if (node.children) {
          markChecked(node.children);
        }
      }
    };
    markChecked(this.nodes);

    if (this.checkable) {
      // Down-propagate first so a defaultValue pointing at a branch (e.g.
      // 'fruits') auto-checks all of its descendants. Then up-propagate so
      // a parent reflects "all children checked" → checked, otherwise
      // indeterminate.
      this.propagateCheckedDown(this.nodes);
      this.propagateCheckedUp(this.nodes);
      // Collect leaves only — same algorithm as runtime selection so the
      // initial render's tag list and post-interaction tag list use one
      // source of truth. (Was previously "literal defaultValue values"
      // which mismatched the post-interaction collection and produced the
      // flicker reported in bug #2.)
      this.updateSelectedFromChecked(this.nodes);
    } else {
      // Single-select: defaultValue is a single value, find that node.
      const selected: { value: string; label: string }[] = [];
      const findNodes = (nodeList: TreeNode[]) => {
        for (const node of nodeList) {
          if (values.includes(node.value)) {
            selected.push({ value: node.value, label: node.label });
          }
          if (node.children) findNodes(node.children);
        }
      };
      findNodes(this.nodes);
      this.selectedItem = selected;
    }

    this.updateFormValue();
  }

  // Top-down propagation of `checked` so a defaultValue pointing at a
  // branch (e.g. 'fruits') auto-checks all of its descendants. Without
  // this, defaultValue='fruits' would mark Fruits.checked=true but its
  // children would stay unchecked, then propagateCheckedUp would even
  // *uncheck* Fruits because none of its children were checked.
  private propagateCheckedDown(nodes: TreeNode[]) {
    const process = (node: TreeNode) => {
      const children = node.children;
      if (!children || children.length === 0) return;
      if (node.checked) {
        children.forEach(child => {
          child.checked = true;
          child.indeterminate = false;
          process(child);
        });
      } else {
        children.forEach(process);
      }
    };
    nodes.forEach(process);
  }

  // Bottom-up propagation of `checked` / `indeterminate` so the visual tree
  // matches the user's mental model when defaultValue selects multiple
  // leaves under the same parent.
  private propagateCheckedUp(nodes: TreeNode[]) {
    const process = (node: TreeNode) => {
      const children = node.children;
      if (!children || children.length === 0) return;
      children.forEach(process);
      const allChecked = children.every(c => c.checked);
      const someChecked = children.some(c => c.checked || c.indeterminate);
      if (allChecked) {
        node.checked = true;
        node.indeterminate = false;
      } else if (someChecked) {
        node.checked = false;
        node.indeterminate = true;
      } else {
        node.checked = false;
        node.indeterminate = false;
      }
    };
    nodes.forEach(process);
  }

  private updateFormValue() {
    this.internals.setFormValue(this.value || null);
    this.updateValidityState();
  }

  private getValidationAnchor(): HTMLElement | undefined {
    // Stencil-generated host types (HTMLSySelectElement, HTMLSyTreeSelectElement)
    // don't carry every HTMLElement member (e.g. `autocorrect`), so TS
    // refuses the direct assignment. Route through `unknown` — these ARE
    // HTMLElements at runtime, the gap is only in the generated d.ts.
    const inputEl = this.selectElement?.querySelector('input');
    if (inputEl) return inputEl as HTMLElement;
    return (this.selectElement as unknown as HTMLElement | undefined) ?? (this.host as unknown as HTMLElement);
  }

  private getSlotErrorText(): string {
    const slotEl = this.host.querySelector('[slot="error"]');
    return (slotEl?.textContent ?? '').trim();
  }

  private updateValidityState() {
    const anchor = this.getValidationAnchor();

    // (1) Programmatic custom error takes priority — use the slot text as
    // the validity message so reportValidity surfaces the same copy shown
    // on screen.
    if (this.validStatus === 'custom' && !this.isValid) {
      const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
      this.internals?.setValidity({ customError: true }, msg, anchor);
      return;
    }

    // (2) Native constraint validation (required).
    if (this.required && this.selectedItem.length === 0) {
      this.isValid = false;
      this.validStatus = 'valueMissing';
      if (this.hasSlotErrorMessage) {
        const slotText = this.getSlotErrorText() || this.getErrorMessage('valueMissing') || ' ';
        this.internals.setValidity({ customError: true }, slotText, anchor);
      } else {
        this.internals.setValidity({ valueMissing: true }, this.getErrorMessage('valueMissing'), anchor);
      }
    } else {
      this.isValid = true;
      this.validStatus = '';
      this.internals.setValidity({});
    }
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals?.checkValidity() ?? true;
  }

  @Method()
  async reportValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals?.reportValidity() ?? true;
  }

  @Method()
  async setCustomError() {
    this.isValid = false;
    this.validStatus = 'custom';
    // Force visual invalid state immediately.
    this.touched = true;
    // Slot UI becomes the surface for programmatic errors regardless of the
    // noNativeValidity toggle.
    const errorSlot = this.host.querySelector('[slot="error"]');
    this.hasSlotErrorMessage =
      !!errorSlot && ((errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0);
    this.updateValidityState();
  }

  @Method()
  async clearCustomError() {
    if (!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
      this.isValid = true;
    }
    this.updateValidityState();
  }

  @Method()
  async getStatus() {
    return this.isValid ? '' : this.validStatus;
  }

  @Listen('invalid', { capture: true })
  handleInvalidEvent(e: Event) {
    this.formSubmitted = true;
    this.isValid = false;

    const errorSlotElement = this.host.querySelector('[slot="error"]');
    const slotHasContent =
      !!errorSlotElement &&
      ((errorSlotElement.textContent?.trim().length ?? 0) > 0 || errorSlotElement.children.length > 0);

    // Same toggle semantics as sy-input / sy-select:
    //   noNativeValidity=true  → native popup suppressed, slot = UI
    //   noNativeValidity=false → browser handles popup. DO NOT preventDefault
    //     (HTML spec: a single preventDefaulted invalid event kills popups on
    //     every form control).
    if (this.noNativeValidity) {
      e.preventDefault();
      e.stopPropagation();
      this.hasSlotErrorMessage = slotHasContent;
      if (slotHasContent) {
        this.internals.setValidity({ customError: true }, ' ', this.getValidationAnchor());
      }
    } else {
      this.hasSlotErrorMessage = false;
    }

    this.updateValidityState();
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
    const errorSlot = this.host.querySelector('[slot="error"]') as HTMLElement | null;
    if (!errorSlot) {
      this.hasPopupErrorComponent = false;
      this.hasSlotErrorMessage = false;
      return;
    }

    this.hasPopupErrorComponent = !!errorSlot.querySelector(
      'sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message'
    ) || ['sy-tooltip', 'sy-popover', 'sy-popconfirm', 'sy-inline-message'].includes(errorSlot.tagName.toLowerCase());

    this.hasSlotErrorMessage =
      (errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0;
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "Please select an option",
      custom: 'Invalid by custom'
    };

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }
}
