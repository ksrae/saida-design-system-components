import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$d } from './p-DeTd2AfI.js';
import { d as defineCustomElement$c } from './p-BTJnmsnM.js';
import { d as defineCustomElement$b } from './p-Dzzv4fG9.js';
import { d as defineCustomElement$a } from './p-DA_POXvZ.js';
import { d as defineCustomElement$9 } from './p-BYla455P.js';
import { d as defineCustomElement$8 } from './p-Dt2pN6ep.js';
import { d as defineCustomElement$7 } from './p-D9IyzZp_.js';
import { d as defineCustomElement$6 } from './p-Dx2eAEw1.js';
import { d as defineCustomElement$5 } from './p-Bd6oegtc.js';
import { d as defineCustomElement$4 } from './p-C0DM0GPD.js';
import { d as defineCustomElement$3 } from './p-DK4iihGf.js';
import { d as defineCustomElement$2 } from './p-Ddz-dwnl.js';

const syTreeSelectCss = ".sc-sy-tree-select:root .loading-container.sc-sy-tree-select,.sc-sy-tree-select:root .empty-container.sc-sy-tree-select,.sc-sy-tree-select-h .loading-container.sc-sy-tree-select,.sc-sy-tree-select-h .empty-container.sc-sy-tree-select{display:none}.sc-sy-tree-select:root .sy-tree-select-inner.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-inner.sc-sy-tree-select{display:flex}.sc-sy-tree-select:root .search-container.sc-sy-tree-select,.sc-sy-tree-select-h .search-container.sc-sy-tree-select{display:flex;flex-direction:column;gap:var(--spacing-4xsmall)}.sc-sy-tree-select:root .sy-tree-select-option-container.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.sc-sy-tree-select{display:none}.sc-sy-tree-select:root .sy-tree-select-option-container.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.sc-sy-tree-select{padding:var(--spacing-3xsmall) var(--spacing-xsmall)}.sc-sy-tree-select:root .sy-tree-select-option-container.visible.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.visible.sc-sy-tree-select{display:block;position:relative}.sc-sy-tree-select:root .sy-tree-select-option-container.visible.sc-sy-tree-select .loading-container.sc-sy-tree-select,.sc-sy-tree-select:root .sy-tree-select-option-container.visible.sc-sy-tree-select .empty-container.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.visible.sc-sy-tree-select .loading-container.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.visible.sc-sy-tree-select .empty-container.sc-sy-tree-select{display:none}.sc-sy-tree-select:root .sy-tree-select-option-container.loading.sc-sy-tree-select sy-tree.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.loading.sc-sy-tree-select sy-tree.sc-sy-tree-select{display:none}.sc-sy-tree-select:root .sy-tree-select-option-container.loading.sc-sy-tree-select .loading-container.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.loading.sc-sy-tree-select .loading-container.sc-sy-tree-select{width:100%;display:flex;min-height:60px;align-items:center;justify-content:center;background-color:var(--treeselect-background-enabled)}.sc-sy-tree-select:root .sy-tree-select-option-container.empty.sc-sy-tree-select sy-tree.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.empty.sc-sy-tree-select sy-tree.sc-sy-tree-select{display:none}.sc-sy-tree-select:root .sy-tree-select-option-container.empty.sc-sy-tree-select .empty-container.sc-sy-tree-select,.sc-sy-tree-select-h .sy-tree-select-option-container.empty.sc-sy-tree-select .empty-container.sc-sy-tree-select{width:100%;display:flex;min-height:60px;align-items:center;justify-content:center;background-color:var(--treeselect-background-enabled)}.sc-sy-tree-select:root .empty-container.sc-sy-tree-select,.sc-sy-tree-select-h .empty-container.sc-sy-tree-select{display:none}.sc-sy-tree-select:root .empty-container.visible.sc-sy-tree-select,.sc-sy-tree-select-h .empty-container.visible.sc-sy-tree-select{display:block}.error-container.sc-sy-tree-select{color:var(--required)}";

const SyTreeSelect$1 = /*@__PURE__*/ proxyCustomElement(class SyTreeSelect extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    // --- Props ---
    nodes = [];
    checkable = false;
    clearable = false;
    defaultValue = '';
    disabled = false;
    status = 'default';
    expandable = false;
    expandAll = false;
    line = false;
    loading = false;
    maxTagCount = 0;
    nodeWidth = null;
    placeholder = '';
    appendParent = false;
    readonly = false;
    required = false;
    name = '';
    noNativeValidity = false;
    // --- State ---
    searchTerm = '';
    isOpen = false;
    selectedItem = [];
    treePlaceHolder = '';
    hasSearchResults = true;
    mode = 'searchable';
    touched = false;
    formSubmitted = false;
    isValid = true;
    validStatus = '';
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    treeElement;
    selectElement;
    selfObserver = null;
    popupContainer = null;
    justOpened = false;
    openTimestamp = 0;
    filteredNodes = [];
    // --- Events ---
    changed;
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
        }
        else if (this.checkable && this.nodes?.length > 0) {
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
            this.selectElement.selectedOptions = [...this.selectedItem];
            // checkable이 아닐 때만 setValue 호출
            if (!this.checkable) {
                const selectLabels = this.selectedItem.map(item => item.label).join(',');
                this.selectElement.setValue(selectLabels);
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
    handleDefaultValueOrNodesChange() {
        if (this.defaultValue) {
            this.initializeDefaultValue();
        }
        else if (this.checkable && this.nodes?.length) {
            this.updateSelectedFromChecked(this.nodes);
            // select 컴포넌트 업데이트
            if (this.selectElement) {
                this.selectElement.selectedOptions = [...this.selectedItem];
                // checkable 모드에서는 setValue 호출하지 않음
                if (!this.checkable) {
                    const selectLabels = this.selectedItem.map(item => item.label).join(',');
                    this.selectElement.setValue(selectLabels);
                }
            }
        }
        // Update tree element if popup is open
        if (this.popupContainer) {
            const treeElement = this.popupContainer.querySelector('sy-tree');
            if (treeElement) {
                treeElement.nodes = this.nodes;
            }
        }
    }
    handleCheckableOrExpandableChange() {
        this.searchTerm = '';
        if (this.checkable !== undefined) {
            const selectElement = this.host.querySelector('sy-select');
            // Use 'tag' mode for checkable (multiple selection with tags)
            this.mode = this.checkable ? 'tag' : 'searchable';
            if (this.defaultValue) {
                this.initializeDefaultValue();
            }
            else {
                this.selectedItem = [];
            }
            if (selectElement) {
                selectElement.selectedOptions = this.selectedItem;
            }
        }
        this.filterAndExpandNodes();
    }
    handlePlaceholderChange() {
        this.treePlaceHolder = this.placeholder;
    }
    handleIsOpenChange(newValue, oldValue) {
        // const stack = new Error().stack;
        if (!this.appendParent) {
            if (newValue && !oldValue) {
                this.closeAllOtherTreeSelects();
                // Open immediately without setTimeout
                // Don't set justOpened here - already set in handleContainerClick
                this.openTreeSelectOption();
                // justOpened flag is now reset immediately in handleOutsideClick
            }
            else if (!newValue && oldValue) {
                // Closing: remove popup but don't trigger watcher again
                if (this.popupContainer) {
                    this.popupContainer.remove();
                    this.popupContainer = null;
                }
                window.removeEventListener('beforeunload', this.closeTreeSelectOption);
            }
        }
    }
    handleLoadingChange() {
        this.updateTreeSelectPopup();
    }
    handleHasSearchResultsChange() {
        this.updateTreeSelectPopup();
    }
    handleSearchTermChange() {
        // Update popup tree element with searchTerm for highlighting
        if (!this.appendParent && this.popupContainer) {
            const treeElement = this.popupContainer.querySelector('sy-tree');
            if (treeElement) {
                treeElement.searchTerm = this.searchTerm;
            }
            else {
                console.log('[TreeSelect] Tree element not found in popup!');
            }
        }
        // Update inline tree element if appendParent is true
        if (this.appendParent && this.treeElement) {
            this.treeElement.searchTerm = this.searchTerm;
        }
    }
    // --- Public Methods ---
    async setCustomValidity(message) {
        this.internals.setValidity({ customError: true }, message);
        this.isValid = false;
    }
    // --- Render ---
    render() {
        return (h("div", { key: 'd3a14ebec55d012bbf14bcdf1a62dbd828126e14', class: {
                "sy-tree-select-container": true,
                "sy-tree-select-disabled": this.disabled,
                "sy-tree-select-error": !this.isValid
            } }, h("div", { key: 'f12a1d947623ea759ae16de1004e16e4b99a78e5', class: "sy-tree-select-inner", onClick: (e) => this.handleContainerClick(e) }, h("sy-select", { key: '03bc6a633633db3c6f440fa46d41b1349d68f264', isTreeSelect: true, mode: this.mode, placeholder: this.treePlaceHolder, clearable: this.clearable, disabled: this.disabled, readonly: this.readonly, error: this.status === 'error' || ((this.touched || this.formSubmitted) && !this.isValid), required: this.required, maxTagCount: this.maxTagCount, selectedOptions: this.selectedItem, onInputChanged: (e) => this.handleSearchInputChanged(e), onFocused: () => { this.isOpen = true; this.touched = true; }, onBlured: (e) => this.handleSearchBlur(e), onOpened: () => { this.isOpen = true; this.touched = true; }, onRemoved: (e) => this.handleRemovedItem(e), onCleared: (e) => this.handleCleared(e) }), this.appendParent && (h("div", { key: 'a441b0032a18e3f263c92cbbdfd329d8e47d682c', class: {
                'sy-tree-select-option-container': true,
                'visible': this.isOpen,
                'loading': this.loading,
                'empty': !this.hasSearchResults,
            } }, h("sy-tree", { key: '75f12e81ed41d65a3433cc995863eaf18df767df', clickable: true, nodes: this.searchTerm ? this.filteredNodes : this.nodes, checkable: this.checkable, expandable: this.expandable, line: this.line, selectedValue: this.selectedItem?.length ? this.selectedItem.map(item => item.value).join(',') : this.defaultValue, nodeWidth: this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null, searchTerm: this.searchTerm, expandAll: this.expandAll, isTreeSelect: true, onNodesChanged: this.handleNodesChanged.bind(this), onItemSelected: (e) => { this.handleTreeItemClick(e); } }), h("div", { key: 'ae1434a93ac3438ac88fb01c0dd989779b9eb686', class: "loading-container" }, h("sy-spinner", { key: 'b3c4855272cadc586d8475e625b72eb9cb10b601' })), h("div", { key: 'c8791527ce4c2f358165ca9e1da05b51417056c6', class: "empty-container" }, h("sy-empty", { key: 'ef7e6eaec083e4818b1b1d6d50f20f28b629acd6' }))))), h("div", { key: '16054dd62f2d3fbada2342db07dddff3ce7b1142', class: {
                'error-container': true,
                'popup-error-container': this.hasPopupErrorComponent,
                'text-error-container': !this.hasPopupErrorComponent,
                'visible-error': (this.touched || this.formSubmitted) && !this.isValid
            } }, h("slot", { key: '12e2ebcd04e7fa631c40b9db75e146437672dabb', name: "error", onSlotchange: this.handleCustomErrorSlot.bind(this) }))));
    }
    expandNodesForDefaultValue() {
        if (!this.defaultValue || !this.nodes?.length)
            return;
        const values = this.defaultValue.split(',').map(v => v.trim());
        values.forEach(value => {
            this.expandPathToNode(this.nodes, value);
        });
    }
    expandPathToNode(nodes, targetValue) {
        for (const node of nodes) {
            if (node.value === targetValue) {
                return true;
            }
            if (node.children && node.children.length > 0) {
                const foundInChildren = this.expandPathToNode(node.children, targetValue);
                if (foundInChildren) {
                    node.expanded = true; // 경로상의 부모 노드를 펼침
                    return true;
                }
            }
        }
        return false;
    }
    // --- Private Methods ---
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.formSubmitted = true;
        this.updateValidityState();
    };
    openTreeSelectOption() {
        this.renderTreeSelectPopup();
        this.initializeTreeSelect();
        this.updateTreeSelectPosition();
        window.addEventListener('beforeunload', this.closeTreeSelectOption);
    }
    renderTreeSelectPopup() {
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
    renderPopupContent() {
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
        this.treeElement = document.createElement("sy-tree");
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
        this.treeElement.addEventListener('itemSelected', (e) => {
            this.handleTreeItemClick(e);
        });
        this.treeElement.addEventListener('nodesChanged', (e) => {
            this.handleNodesChanged(e);
        });
        this.popupContainer.appendChild(this.treeElement);
    }
    updateTreeSelectPopup() {
        if (this.popupContainer) {
            this.renderPopupContent();
        }
    }
    initializeTreeSelect() {
        if (this.popupContainer) {
            const treeElement = this.popupContainer.querySelector('sy-tree');
            if (treeElement) {
                treeElement.nodes = this.nodes;
                treeElement.searchTerm = this.searchTerm;
            }
        }
    }
    updateTreeSelectPosition() {
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
    closeTreeSelectOption = () => {
        // Just set isOpen to false - watcher will handle popup removal
        this.isOpen = false;
        this.openTimestamp = 0; // Reset timestamp when closing
    };
    handleOutsideClick = (event) => {
        // Ignore clicks within 150ms of opening to prevent immediate close
        const timeSinceOpen = Date.now() - this.openTimestamp;
        if (this.justOpened || (this.openTimestamp > 0 && timeSinceOpen < 150)) {
            this.justOpened = false; // reset immediately so only the first click is ignored
            return;
        }
        const target = event.target;
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
    handleSearchInputChanged(event) {
        const value = typeof event.detail === 'string' ? event.detail : (event.detail?.value || '');
        this.searchTerm = value;
        this.filterAndExpandNodes();
    }
    handleContainerClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        const target = event.target;
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
    }
    closeAllOtherTreeSelects() {
        // Close other tree-select instances
        const allTreeSelects = document.querySelectorAll('sy-tree-select');
        allTreeSelects.forEach((treeSelect) => {
            if (treeSelect !== this.host) {
                treeSelect.isOpen = false;
            }
        });
    }
    handleSearchBlur(_event) {
        // Blur 처리는 outside click에서 처리
    }
    handleRemovedItem(event) {
        const removedItem = event.detail.item;
        if (this.checkable && this.treeElement) {
            this.treeElement.setCheckState(removedItem.value, false);
        }
        if (this.checkable && !this.appendParent && this.popupContainer) {
            const popupTreeElement = this.popupContainer.querySelector('sy-tree');
            if (popupTreeElement) {
                popupTreeElement.setCheckState(removedItem.value, false);
            }
        }
    }
    handleCleared(event) {
        event.preventDefault();
        if (this.treeElement) {
            this.treeElement.clearAllSelectedItem();
        }
        if (!this.appendParent && this.popupContainer) {
            const popupTreeElement = this.popupContainer.querySelector('sy-tree');
            if (popupTreeElement) {
                popupTreeElement.clearAllSelectedItem();
            }
        }
        this.selectedItem = [];
    }
    handleTreeItemClick(event) {
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
            this.selectElement.selectedOptions = [...this.selectedItem];
            const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
            this.selectElement.defaultValue = selectDefaultValue;
            this.selectElement.setValue(selectDefaultValue);
            this.selectElement.isOpen = false;
        }
        this.searchTerm = '';
        this.updateValidityState();
        this.updateFormValue();
        this.emitChangeEvent();
        // Close popup after selecting item (non-checkable mode)
        this.isOpen = false;
    }
    handleNodesChanged(event) {
        this.nodes = event.detail.nodes;
        if (this.checkable) {
            this.updateSelectedFromChecked(this.nodes);
            if (this.selectElement) {
                this.selectElement.selectedOptions = [...this.selectedItem];
                // checkable 모드에서는 setValue 호출하지 않음
                if (!this.checkable) {
                    const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
                    this.selectElement.setValue(selectDefaultValue);
                }
            }
            this.searchTerm = '';
            this.filterAndExpandNodes();
        }
    }
    filterAndExpandNodes() {
        if (!this.searchTerm) {
            this.filteredNodes = this.nodes;
        }
        else {
            // tree의 filterNodes 로직을 여기서 직접 구현
            this.filteredNodes = this.filterNodesRecursive(this.nodes, this.searchTerm.toLowerCase());
        }
        this.hasSearchResults = this.filteredNodes.length > 0;
    }
    filterNodesRecursive(nodes, searchTerm) {
        return nodes.reduce((acc, node) => {
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
    updateSelectedFromChecked(nodes) {
        const selected = [];
        // Lit 코드의 알고리즘 그대로 적용
        const collectCheckedValues = (node) => {
            // 부모가 체크된 경우 - 자식 확인하지 않고 바로 리턴
            if (node.checked) {
                return [{ value: node.value, label: node.label ?? node.value }];
            }
            // 부모가 체크되지 않은 경우에만 자식들 확인
            const values = [];
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
    initializeDefaultValue() {
        if (!this.defaultValue)
            return;
        const values = this.defaultValue.split(',').map(v => v.trim());
        const selected = [];
        const findNodes = (nodeList) => {
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
    updateFormValue() {
        const value = this.selectedItem.map(item => item.value).join(',');
        this.internals.setFormValue(value);
        this.updateValidityState();
    }
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    updateValidityState() {
        // (1) Programmatic custom error takes priority — use the slot text as
        // the validity message so reportValidity surfaces the same copy shown
        // on screen. Mirrors autocomplete's setCustomError flow.
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
            this.internals?.setValidity({ customError: true }, msg);
            return;
        }
        // (2) Native constraint validation (required).
        if (this.required && this.selectedItem.length === 0) {
            this.isValid = false;
            this.validStatus = 'valueMissing';
            if (this.hasSlotErrorMessage) {
                const slotText = this.getSlotErrorText() || this.getErrorMessage('valueMissing') || ' ';
                this.internals.setValidity({ customError: true }, slotText);
            }
            else {
                this.internals.setValidity({ valueMissing: true }, this.getErrorMessage('valueMissing'));
            }
        }
        else {
            this.isValid = true;
            this.validStatus = '';
            this.internals.setValidity({});
        }
    }
    async checkValidity() {
        this.updateValidityState();
        return this.internals?.checkValidity() ?? true;
    }
    async reportValidity() {
        this.updateValidityState();
        return this.internals?.reportValidity() ?? true;
    }
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
    async clearCustomError() {
        if (!this.isValid && this.validStatus === 'custom') {
            this.validStatus = '';
            this.isValid = true;
        }
        this.updateValidityState();
    }
    async getStatus() {
        return this.isValid ? '' : this.validStatus;
    }
    handleInvalidEvent(e) {
        this.formSubmitted = true;
        this.isValid = false;
        const errorSlotElement = this.host.querySelector('[slot="error"]');
        const slotHasContent = !!errorSlotElement &&
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
                this.internals.setValidity({ customError: true }, ' ');
            }
        }
        else {
            this.hasSlotErrorMessage = false;
        }
        this.updateValidityState();
    }
    emitChangeEvent() {
        this.changed.emit({
            selectedItem: this.selectedItem,
            isValid: this.isValid
        });
    }
    setupSelfObserver() {
        this.selfObserver = new MutationObserver(() => {
            this.handleCustomErrorSlot();
        });
        this.selfObserver.observe(this.host, {
            childList: true,
            subtree: true,
        });
    }
    cleanupSelfObserver() {
        if (this.selfObserver) {
            this.selfObserver.disconnect();
            this.selfObserver = null;
        }
    }
    formSubmitListener() {
        const form = this.host.closest('form');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit);
        }
    }
    handleCustomErrorSlot() {
        const errorSlot = this.host.querySelector('slot[name="error"]');
        if (!errorSlot)
            return;
        const errorNodes = errorSlot.assignedNodes();
        this.hasPopupErrorComponent = errorNodes.some(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                const tagName = element.tagName?.toLowerCase() || '';
                if (tagName === 'sy-tooltip' ||
                    tagName === 'sy-popover' ||
                    tagName === 'sy-popconfirm' ||
                    tagName === 'sy-inline-message') {
                    return true;
                }
                return !!element.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
            }
            return false;
        });
        // Track whether the slot has any user-supplied error content. The
        // `updateValidityState()` / `handleInvalidEvent()` flows use this to
        // decide whether to drive customError with slot text or fall back to
        // the default valueMissing message.
        this.hasSlotErrorMessage = errorNodes.some(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                return true;
            }
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                return !!(element.textContent?.trim() || element.children.length > 0);
            }
            return false;
        });
    }
    getErrorMessage(type) {
        const validityMessage = {
            valueMissing: "Please select an option",
            custom: 'Invalid by custom'
        };
        return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "defaultValue": ["handleDefaultValueOrNodesChange"],
        "nodes": ["handleDefaultValueOrNodesChange"],
        "checkable": ["handleCheckableOrExpandableChange"],
        "expandable": ["handleCheckableOrExpandableChange"],
        "placeholder": ["handlePlaceholderChange"],
        "isOpen": ["handleIsOpenChange"],
        "loading": ["handleLoadingChange"],
        "hasSearchResults": ["handleHasSearchResultsChange"],
        "searchTerm": ["handleSearchTermChange"]
    }; }
    static get style() { return syTreeSelectCss; }
}, [326, "sy-tree-select", {
        "nodes": [1040],
        "checkable": [4],
        "clearable": [4],
        "defaultValue": [1025, "defaultvalue"],
        "disabled": [4],
        "status": [1],
        "expandable": [4],
        "expandAll": [1028, "expandall"],
        "line": [4],
        "loading": [4],
        "maxTagCount": [1026, "maxtagcount"],
        "nodeWidth": [1026, "nodewidth"],
        "placeholder": [1],
        "appendParent": [1028, "appendparent"],
        "readonly": [4],
        "required": [4],
        "name": [1],
        "noNativeValidity": [1028, "nonativevalidity"],
        "searchTerm": [32],
        "isOpen": [32],
        "selectedItem": [32],
        "treePlaceHolder": [32],
        "hasSearchResults": [32],
        "mode": [32],
        "touched": [32],
        "formSubmitted": [32],
        "isValid": [32],
        "validStatus": [32],
        "hasSlotErrorMessage": [32],
        "hasPopupErrorComponent": [32],
        "filteredNodes": [32],
        "setCustomValidity": [64],
        "checkValidity": [64],
        "reportValidity": [64],
        "setCustomError": [64],
        "clearCustomError": [64],
        "getStatus": [64]
    }, [[2, "invalid", "handleInvalidEvent"]], {
        "defaultValue": ["handleDefaultValueOrNodesChange"],
        "nodes": ["handleDefaultValueOrNodesChange"],
        "checkable": ["handleCheckableOrExpandableChange"],
        "expandable": ["handleCheckableOrExpandableChange"],
        "placeholder": ["handlePlaceholderChange"],
        "isOpen": ["handleIsOpenChange"],
        "loading": ["handleLoadingChange"],
        "hasSearchResults": ["handleHasSearchResultsChange"],
        "searchTerm": ["handleSearchTermChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-tree-select", "sy-button", "sy-checkbox", "sy-empty", "sy-icon", "sy-input", "sy-option", "sy-select", "sy-spinner", "sy-tag", "sy-tooltip", "sy-tree", "sy-tree-item"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-tree-select":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTreeSelect$1);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "sy-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "sy-empty":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "sy-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "sy-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "sy-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-tag":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-tree":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-tree-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyTreeSelect = SyTreeSelect$1;
const defineCustomElement = defineCustomElement$1;

export { SyTreeSelect, defineCustomElement };
