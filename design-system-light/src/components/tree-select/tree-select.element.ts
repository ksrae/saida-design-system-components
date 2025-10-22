import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { TreeElement, TreeNode } from '../tree/tree.element';
import { SelectElement } from '../select/select.element';
import globalCSS from "./styles/tree-select.scss?inline";
import '../tree/tree.element';
import '../tree/tree-item.element';
import '../select/select.element';
import '../empty/empty.element';
import '../spinner/spinner.element';
import { SpinnerElement } from '../spinner/spinner.element';
import { EmptyElement } from '../empty/empty.element';
import '../../style/global.scss';
import '../../style/theme/theme/_tree-select.scss';


@customElement('sy-tree-select')
export class TreeSelectElement extends LitElement {
  // 폼 연동을 위한 속성 추가
  static formAssociated = true;

  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};

    :host {
      position: relative;
    }

    .sy-tree-select-container {
      position: relative;
    }
    
    /* 에러 컨테이너 스타일 추가 */
    .error-container {
      display: none;
      width: 100%;
      font-size: 0.85rem;
      margin-top: 4px;
      box-sizing: border-box;
    }
    
    /* 에러가 popup형태인 경우 오버레이 스타일 - 위치 조정 */
    .popup-error-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: 0;
      z-index: 1;
      pointer-events: none;
    }
    
    .error-message {
      display: block;
      width: 100%;
      height: 100%;
    }

    .error-message::slotted(*) {
        display: block;
        width: 100%;
        height: 100%;
    }
    
    /* 숨김 에러 스타일 */
    .visible-error {
      display: block;
    }
  `;      
  @property({
    type: String,
    reflect: true,
    converter: {
      fromAttribute: (value) => {
        return value ? JSON.parse(value) : [];
      },
      toAttribute: (value) => {
        return value ? JSON.stringify(value) : '';
      }
    },
  })
  nodes: TreeNode[] = [];
  @property({ type: Boolean }) checkable: boolean = false;
  @property({ type: Boolean }) clearable: boolean = false;
  @property({ type: String }) defaultValue: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) status: 'error' | 'default' = 'default';
  @property({ type: Boolean }) expandable: boolean = false;
  @property({ type: Boolean }) expandAll: boolean = false;
  @property({ type: Boolean }) line: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: Number }) maxTagCount: number = 0;
  @property({ type: Number }) nodeWidth: number | null = null;
  @property({ type: String }) placeholder: string = '';
  @property({ type: Boolean }) appendParent: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) required: boolean = false; // required 속성 추가
  @property({ type: String }) name: string = ''; // name 속성 추가
  @property({ type: Boolean }) noNativeValidity = false;
    
  @state() private searchTerm: string = '';
  @state() private isOpen: boolean = false;
  @state() private selectedItem: {value: string, label: string}[] = [];
  @state() private treePlaceHolder: string = '';
  @state() private hasSearchResults: boolean = true;
  @state() private externalTreeContainer: HTMLElement | null = null;
  @state() private mode: "default" | "searchable" | "multiple" | "tag" = 'searchable';
  @state() private wasClosedByPopover: boolean = false;
  @state() private touched = false;
  @state() private formSubmitted = false;

  @state() private isValid: boolean = true;
  @state() private validStatus: 'valueMissing' | 'custom' | '' = "";
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;

  private treeElement: TreeElement | undefined;
  private selectElement: SelectElement | undefined;
  private optionContainer: HTMLElement | null = null;
  private selfObserver: MutationObserver | null = null;
  private internals: ElementInternals;
  private initialSelectedOptions: { value: string; label: string }[] = [];

  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.internals = this.attachInternals();
    this.addEventListener('invalid', this.handleInvalid);
    // 초기 선택 옵션 저장
    this.initialSelectedOptions = [...this.selectedItem];
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick, true);
    this.setupSelfObserver();
    this.formSubmitListener();
  }
  
  async firstUpdated() {
    await this.updateComplete;

    if(this.appendParent) {
      this.treeElement = this.shadowRoot?.querySelector('sy-tree') as TreeElement;
      this.treeElement.isTreeSelect = true;
    }

    this.selectElement = this.shadowRoot?.querySelector('sy-select') as SelectElement;
    this.selectElement.isTreeSelect = true;

    // 먼저 체크 상태를 업데이트하고
    this.updateCheckStatus(this.nodes);

    // 그 다음 defaultValue가 있는 경우 초기 선택 상태 설정
    if (this.defaultValue) {
      this.initializeDefaultValue();
    }
    
    // Form 값 초기화
    this.updateFormValue();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    // defaultValue와 nodes가 변경되었을 때 먼저 처리
    if (changedProperties.has('defaultValue') || changedProperties.has('nodes')) {
      if (this.defaultValue) {
        this.initializeDefaultValue();
      }
    }

    if (changedProperties.has("checkable") || changedProperties.has("expandable")) {
      this.searchTerm = '';
      if (changedProperties.has("checkable")) {
        const selectElement = this.shadowRoot?.querySelector('sy-select') as SelectElement;
        
        this.mode = this.checkable ? 'multiple' : 'searchable';
        
        // checkable이 변경될 때는 defaultValue가 있으면 다시 초기화
        if (this.defaultValue) {
          this.initializeDefaultValue();
        } else {
          this.selectedItem = [];
        }

        if(selectElement) {
          selectElement.selectedOptions = this.selectedItem;
        }
      }
      this.filterAndExpandNodes();
      this.requestUpdate();
    }
    if (changedProperties.has('placeholder')) {
      this.treePlaceHolder = this.placeholder;
    }
    if( changedProperties.has('isOpen')) {
      // 부모 컴포넌트 안이라면 isOpen에 의한 css로 처리
      if(!this.appendParent) {
        if(this.isOpen) {
          this.openTreeSelectOption();
        } else {
          this.closeTreeSelectOption();
        }
      }
    }
    if(changedProperties.has('searchTerm')) {
      if (this.appendParent && this.treeElement) {
        this.treeElement.searchTerm = this.searchTerm; // 입력된 검색어를 sy-tree에 전달
      } else {
        const popupContainer = document.querySelector('.sy-tree-select-option-container');
        const exist: TreeElement | null | undefined = popupContainer?.querySelector('sy-tree');
        if(exist) {
          exist.searchTerm = this.searchTerm;
        }
      }
    }
    // required 속성이 변경되었을 때 유효성 상태 업데이트
    if (changedProperties.has('required')) {
      this.updateValidityState();
    }

    // 선택된 값이 변경되었을 때 폼 값 업데이트
    if (changedProperties.has('selectedItem')) {
      this.updateFormValue();
    }

  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.formSubmitListenerRemover();
    document.removeEventListener("click", this.handleOutsideClick, true);
    this.closeTreeSelectOption();
    this.removeEventListener('invalid', this.handleInvalid);
    if (this.selfObserver) {
      this.selfObserver.disconnect();
      this.selfObserver = null;
    }
  }

  private formSubmitListener() {
    if(this.internals.form) {
      this.internals.form.addEventListener('submit', this.handleFormSubmit);
    }
  }
  private formSubmitListenerRemover() {
    if(this.internals.form) {
      this.internals.form.removeEventListener('submit', this.handleFormSubmit);
    }
  }
  
  // 전체 노드를 가져오는 메서드 예시
  getAllNodes() {
    // 필요한 로직에 따라 전체 노드를 반환
    return this.nodes; // 또는 전체 노드를 찾는 다른 로직
  }

  // defaultValue를 기반으로 초기 선택 상태 설정
  private initializeDefaultValue() {
    if (!this.defaultValue || !this.nodes?.length) return;

    // checkable 모드인 경우 쉼표로 구분된 값들을 처리
    const values = this.checkable ? this.defaultValue.split(',') : [this.defaultValue];
    
    const selectedItems: { value: string, label: string }[] = [];
    
    values.forEach(value => {
      const trimmedValue = value.trim();
      if (trimmedValue) {
        const node = this.findNodeByValue(this.nodes, trimmedValue);
        if (node) {
          selectedItems.push({
            value: node.value,
            label: node.label || node.value
          });

          // checkable 모드에서 해당 노드의 체크 상태 설정
          if (this.checkable && this.treeElement) {
            this.treeElement.setCheckState(node.value, true);
          }
        }
      }
    });

    if (selectedItems.length > 0) {
      this.selectedItem = selectedItems;
      // select 요소가 준비될 때까지 기다린 후 업데이트
      this.updateComplete.then(() => {
        this.updateSelectModel();
      });
    } else {
      // defaultValue에 해당하는 노드를 찾지 못한 경우
      this.selectedItem = [];
      this.updateComplete.then(() => {
        this.updateSelectModel();
      });
    }
  }
  
  render() {
    return html`
        <div class=${classMap({
        "sy-tree-select-container": true, 
         "sy-tree-select-disabled": this.disabled,
         "sy-tree-select-error": !this.isValid
        })}>
        <div class="sy-tree-select-inner">
          <sy-select
            mode="${this.mode}"
            placeholder=${this.treePlaceHolder}
            ?clearable=${this.clearable}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?error=${this.status === 'error' || ((this.touched || this.formSubmitted) && !this.isValid)}
            ?required=${this.required}
            maxTagCount="${this.maxTagCount}"
            @inputChanged="${this.handleSearchInputChanged}"
            @focused="${this.handleSearchFocus}"
            @blured="${this.handleSearchBlur}"
            @opened="${this.handleSearchFocus}"
            @removed="${this.handleRemovedItem}"
            @cleared="${this.handleCleared}">
          </sy-select>
          <div class=${classMap({
            'sy-tree-select-option-container': true,
            visible: this.isOpen,
            loading: this.loading,
            empty: !this.hasSearchResults,
          })}>
            <sy-tree 
              clickable 
              .nodes=${this.nodes} 
              ?checkable=${this.checkable}
              ?expandable=${this.expandable}
              ?line="${this.line}"
              selectedValue= ${this.selectedItem?.length ? this.selectedItem.map(item => item.value).join(',') : this.defaultValue}
              .nodeWidth="${this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null}"
              .searchTerm="${this.searchTerm}"
              ?expandAll="${this.expandAll}"
              @nodesChanged="${this.handleNodesChanged}"
              @itemSelected="${this.handleTreeItemClick}">
            </sy-tree>
            <div class=${classMap({
              'loading-container': true,
            })}>
              <sy-spinner></sy-spinner>
            </div>        
            <div class=${classMap({
              'empty-container': true,
            })}>
              <sy-empty></sy-empty>
            </div>          
          </div>
        </div>
        <div class="${classMap({
          'error-container': true,
          'popup-error-container': this.hasPopupErrorComponent,
          'text-error-container': !this.hasPopupErrorComponent,
          'visible-error': (this.touched || this.formSubmitted) && !this.isValid // 유효한 상태일 때는 숨김
        })}">
          <slot name="error" class="error-message" @slotchange=${this.handleCustomErrorSlot}></slot>
        </div>
      </div>
    `;
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    
    this.updateValidityState();
    this.requestUpdate();
  }

  private openTreeSelectOption() {
    this.renderTreeSelectPopup();
    this.initializeTreeSelect();
    this.updateTreeSelectPosition();
    this.optionContainer = document.querySelector('.sy-tree-select-option-container');
    window.addEventListener('beforeunload', this.closeTreeSelectOption);
  }

  private renderTreeSelectPopup() {
    const container = document.querySelector('.sy-tree-select-option-container');
    if (!container) {
      const popupContainer = document.createElement("div");
      popupContainer.classList.add("sy-tree-select-option-container");
      document.body.appendChild(popupContainer);
      
      if (this.loading) {
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("loading-container");
        const spinnerElement = document.createElement("sy-spinner") as SpinnerElement;
        popupContainer.appendChild(spinnerElement);
      } 
      else if(!this.hasSearchResults) {
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("empty-container");
        const emptyElement = document.createElement("sy-empty") as EmptyElement;
        popupContainer.appendChild(emptyElement);
      } 
      else {
        // this.treeElement = this.shadowRoot?.querySelector('sy-tree')?.cloneNode(true) as TreeElement;
        this.treeElement = document.createElement("sy-tree") as TreeElement;
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

        popupContainer.appendChild(this.treeElement);
      }   
    };

  }

  private updateTreeSelectPopup() {
    const popupContainer = document.querySelector('.sy-tree-select-inner');
    if (popupContainer) {      
      if (this.loading) {
        const exist = popupContainer.querySelector('sy-spinner');
        if(!exist) {
          // clear all children nodes
          popupContainer.innerHTML = '';
          const optionContainer = document.createElement("div");
          optionContainer.classList.add("loading-container");
          const spinnerElement = document.createElement("sy-spinner") as SpinnerElement;
          popupContainer.appendChild(spinnerElement);
        }
      } 
      else if(!this.hasSearchResults) {
        const exist = popupContainer.querySelector('sy-empty');
        if(!exist) {
          popupContainer.innerHTML = '';
          const optionContainer = document.createElement("div");
          optionContainer.classList.add("empty-container");
          const emptyElement = document.createElement("sy-empty") as EmptyElement;
          popupContainer.appendChild(emptyElement);
        }
      } 
      else {
        const exist = popupContainer.querySelector('sy-tree');

        if(!exist) {
          popupContainer.innerHTML = '';
          const optionContainer = document.createElement("div");
          optionContainer.classList.add("tree-container");
          const treeElement = document.createElement("sy-tree") as TreeElement;
          treeElement.clickable = true;
          treeElement.nodes = this.nodes;
          treeElement.checkable = this.checkable;
          treeElement.expandable = this.expandable;
          treeElement.line = this.line;
          treeElement.selectedValue = this.defaultValue;
          treeElement.nodeWidth = this.nodeWidth !== null && this.nodeWidth > 0 ? this.nodeWidth : null;
          treeElement.searchTerm = this.searchTerm;
          treeElement.expandAll = this.expandAll;
          treeElement.isTreeSelect = true;
          treeElement.addEventListener('itemSelected', (e: any) => {
            this.handleTreeItemClick(e);
          });
          treeElement.addEventListener('nodesChanged', (e: any) => {
            this.handleNodesChanged(e);
          });
          popupContainer.appendChild(treeElement);
        }
      }
    };

  }

  private initializeTreeSelect() {
    const container = document.querySelector('.sy-tree-select-option-container') as HTMLElement;
    if (container) {
      container.style.display = "none";
      container.style.backgroundColor = "var(--treeselect-background-enabled)";
      container.style.position = "absolute";
      container.style.overflow = "hidden";
      container.style.boxShadow = "0px 4px 8px rgba(0 0 0 / 0.24)";
      container.style.borderRadius = "3px";
      container.style.zIndex = "500";
      container.style.marginTop = "4px";
    }
  }

  private updateTreeSelectPosition() {   
    const container = document.querySelector('.sy-tree-select-option-container') as HTMLElement;
    if (container) {
      const selectContainer = this.shadowRoot?.querySelector(".sy-tree-select-inner");

      if (selectContainer) {
        const selectContainerRect = selectContainer?.getBoundingClientRect();
        const viewportHeight = window.innerHeight; 

        container.style.display = "block";
        container.style.position = "absolute";
        container.style.boxSizing = "border-box";
        container.style.marginTop = "14x";
        container.style.maxHeight = "300px";
        container.style.width = `${selectContainerRect.width}px`;
        container.style.overflowY = "hidden";
        container.style.padding = "4px 8px";

        this.repositionByscrollY(selectContainerRect, viewportHeight);
        container.style.left = `${selectContainerRect.left + scrollX}px`;          
      }
    }
  }

  private repositionByscrollY(selectContainerRect: DOMRect, viewportHeight: number) {
    const container = document.querySelector('.sy-tree-select-option-container') as HTMLElement;
    const scrollY = window.scrollY || document.documentElement.scrollTop; 
    const spaceBelow = viewportHeight - selectContainerRect.bottom;
    const spaceAbove = selectContainerRect.top - scrollY;
    const popupHeight = container.scrollHeight; 

    let newTop = 0;

    if (spaceBelow >= popupHeight) {
      newTop = selectContainerRect.bottom + scrollY;
    } else if (spaceAbove >= popupHeight) {
      newTop = selectContainerRect.top - popupHeight + scrollY; 
    } else {
      if (spaceBelow > spaceAbove) {
        newTop = selectContainerRect.bottom + scrollY;
      } else {
        newTop = selectContainerRect.top - popupHeight + scrollY; 
      }
    }

    container.style.top = `${newTop}px`;
    container.style.bottom = "auto";
    container.style.overflowY = "auto";
  }

  private closeTreeSelectOption() {
    const containers = document.querySelectorAll('.sy-tree-select-option-container');
    
    containers.forEach(container => {
      if (container.parentElement === document.body) {
        container.remove();
      }
    });
    this.optionContainer = null;
    window.removeEventListener('beforeunload', this.closeTreeSelectOption);
  }

  private handleSearchFocus(e: Event) {
    if (this.wasClosedByPopover) {
      this.wasClosedByPopover = false; // 플래그 초기화
    }
    
    // e.stopPropagation();
    e.preventDefault();
    this.isOpen = true; // 상태 업데이트가 제대로 되도록 함
    
    // 부모 컴포넌트 안에 있을 때만 popover 호출
    if (!this.appendParent) {
      this.openTreeSelectOption();
    }
    
    this.expandAllNodes();
    this.requestUpdate();
    // Ensure nodes are updated with the selectedItem state when the tree opens
    // this.nodes = this.updateTreeItemCheckState(this.nodes, null, true);
  }

  private handleSearchBlur(e: Event) {

  }

  private handleOutsideClick(e: any) {
    // e.stopImmediatePropagation();
    // e.stopPropagation();
    
    // 클릭된 요소가 컴포넌트 내부에 있는지 확인
    let container = this.shadowRoot?.querySelector('.sy-tree-select-option-container') as HTMLElement;
    if(!this.appendParent) {
      container = document.querySelector('.sy-tree-select-option-container') as HTMLElement;
    }
    
    // 드롭다운이 열려 있을 때만 외부 클릭을 감지
    if (this.isOpen && !container?.contains(e.target) && !this?.contains(e.target)) {
      this.isOpen = false;  

      // setTimeout(() => {
      //   const selectElement = this.shadowRoot?.querySelector('sy-select') as SelectElement;

      //   if(selectElement) {
      //     const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
      //     selectElement.defaultValue = selectDefaultValue;
      //     // selectElement.isOpen = false;
  

          
      //   }

      // }, 100);

      if(this.selectElement) {
        const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
        this.selectElement.setValue(selectDefaultValue);
      }
      // 검색어를 초기화하고 노드를 다시 필터링
      this.searchTerm = '';
      this.hasSearchResults = false;
      this.filterAndExpandNodes(); // 전체 트리 목록으로 업데이트
      
      this.closeTreeSelectOption();
    }

    // to block event
    container?.addEventListener('click', (e: any) => {
      e.stopPropagation();
    });

  }

  private handleRemovedItem(event: CustomEvent) {
    const removedItem = event.detail.item; // 제거된 아이템의 값과 레이블

    // checkable 모드일 때만 sy-tree의 setCheckState 메서드를 호출하여 체크 상태 업데이트
    if (this.checkable && this.treeElement) {
      this.treeElement.setCheckState(removedItem.value, false); // 체크 상태를 false로 설정
    }

    // 팝업에 있는 tree 요소도 업데이트 (appendParent가 false인 경우)
    if (this.checkable && !this.appendParent) {
      const popupContainer = document.querySelector('.sy-tree-select-option-container');
      const popupTreeElement = popupContainer?.querySelector('sy-tree') as TreeElement;
      if (popupTreeElement) {
        popupTreeElement.setCheckState(removedItem.value, false);
      }
    }

  }
  
  private handleCleared(event: CustomEvent) {
    if (this.treeElement) {
      this.treeElement.clearAllSelectedItem(); // 체크 상태도 완전 초기화
    }
    
    // 팝업에 있는 tree 요소도 초기화 (appendParent가 false인 경우)
    if (!this.appendParent) {
      const popupContainer = document.querySelector('.sy-tree-select-option-container');
      const popupTreeElement = popupContainer?.querySelector('sy-tree') as TreeElement;
      if (popupTreeElement) {
        popupTreeElement.clearAllSelectedItem(); // 체크 상태도 완전 초기화
      }
    }
    
    this.selectedItem = [];
  }

  private handleTreeItemClick(event: CustomEvent) {
    event.preventDefault();

    if(this.checkable) { return; }

    // 항상 touched 상태를 true로 설정 (submit 후에도 정상 동작하도록)
    this.touched = true;

    this.selectedItem = [{
      value: event.detail.value,
      label: event.detail.label
    }];

    // select 요소에 선택 결과 반영
    if(this.selectElement) {
      this.selectElement.selectedOptions = [...this.selectedItem];
      const selectDefaultValue = this.selectedItem?.map(item => item.label).join(',');
      this.selectElement.defaultValue = selectDefaultValue;
      this.selectElement.setValue(selectDefaultValue);
      this.selectElement.isOpen = false;
    }

    this.searchTerm = '';
    
    // 유효성 상태 업데이트 - 선택 후 즉시 유효한 상태로 변경
    this.updateValidityState();

    if (!this.checkable) {
        // checkable이 아닐 경우, 선택 후 드롭다운 닫기
        // this.isOpen = false;
        // this.closeTreeSelectOption(); // 명시적으로 닫기 실행
    }
    
    // 외부로 이벤트 발생 - 선택된 항목과 유효성 상태를 함께 전달
    this.dispatchEvent(new CustomEvent('itemSelected', {
      detail: {
        value: event.detail.value, 
        label: event.detail.label,
        isValid: this.isValid,
        status: this.validStatus
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleSearchInputChanged(event: CustomEvent) {
    this.searchTerm = event.detail;
    this.filterAndExpandNodes();

    if(!this.appendParent) {
      this.updateTreeSelectPopup();
    }
  }

  private filterAndExpandNodes() {
    const searchTermLower = this.searchTerm ? this.searchTerm.toLowerCase() : '';
    this.hasSearchResults = searchTermLower !== '' 
      ? this.nodes.some(node => this.checkNodeMatches(node, searchTermLower)) 
      : true;
    
    this.requestUpdate();
  }


  private expandAllNodes() {
    this.nodes = this.nodes.map(node => this.setAllNodesExpand(node, true));
  }
  
  private collapseAllNodes() {
    this.nodes = this.nodes.map(node => this.setAllNodesExpand(node, false));
  }

  private setAllNodesExpand(node: TreeNode, isExpand: boolean = false): TreeNode {
    node = { ...node, expanded: isExpand };
    
    if (node.children) {
      node.children = node.children.map(child => this.setAllNodesExpand(child, isExpand));
    }
    
    return node;
  }


  private checkNodeMatches = (node: TreeNode, searchTermLower: string): boolean => {
    let nodeMatches = node.label.toLowerCase().includes(searchTermLower);
    let childMatches = false;

    if (node.children && node.children.length > 0) {
      childMatches = node.children.some(child => this.checkNodeMatches(child, searchTermLower));
    }

    return nodeMatches || childMatches;
  };

  private handleNodesChanged(event: CustomEvent) {
    event.preventDefault();
    
    this.nodes = event.detail.nodes;
    
    const treeNodes = event.detail.nodes as TreeNode[];

    if(this.checkable) {
      this.updateCheckStatus(treeNodes);
    }

    this.selectElement?.clearValue();

    this.searchTerm = '';
    this.expandAllNodes();
    
    // 외부로 이벤트 발생 - 선택된 항목과 유효성 상태를 함께 전달
    this.dispatchEvent(new CustomEvent('nodeChanged', {
      detail: {
        nodes: this.nodes,
        isValid: this.isValid,
        status: this.validStatus
      },
      bubbles: true,
      composed: true
    }));

    // 유효성 상태 업데이트
    this.updateValidityState();
  }

  private updateCheckStatus(treeNodes: TreeNode[]) {
    const checkedValues = this.getCheckedValuesFromNodes(treeNodes); // nodesChanged에서 전달된 노드로 체크된 값 가져오기
      
    // 체크된 값이 있는 경우만 처리
    if (checkedValues.length > 0) {
      // 체크된 값이 부모 노드인지 확인
      const parentCheckedValues = checkedValues.filter(value => {
        const node = this.findNodeByValue(this.nodes, value.value);
        return node && node.checked;
      });

      // 부모가 체크된 경우
      if (parentCheckedValues.length > 0) {
        // 부모 노드의 값만 사용
        this.selectedItem = parentCheckedValues; // 부모 값만 선택
      } else {
        // 자식 노드에서 체크된 값들
        this.selectedItem = checkedValues.filter(value => {
            const node = this.findNodeByValue(this.nodes, value.value);
            return node && !node.checked; // 부모가 아닌 자식 체크된 값만
        });
      }
    } else {
      this.selectedItem = [];
    }

    this.updateSelectModel();
    
    // 외부로 이벤트 발생 - 선택된 항목과 유효성 상태를 함께 전달
    this.dispatchEvent(new CustomEvent('itemChecked', {
      detail: {
        items: this.selectedItem,              // 선택된 모든 아이템 배열
        isValid: this.isValid,                 // 유효성 상태
        status: this.validStatus,              // 유효성 상태 코드
      },
      bubbles: true,
      composed: true
    }));

    // 유효성 상태 업데이트
    this.updateValidityState();
  }

  // 노드에서 체크된 값을 가져오는 메서드
  private getCheckedValuesFromNodes(nodes: TreeNode[]): { value: string, label: string }[] {
    const checkedValues: { value: string, label: string }[] = [];

    const collectCheckedValues = (node: TreeNode): { value: string, label: string }[] => {
        // 부모가 체크된 경우
        if (node.checked) {
            return [{ value: node.value, label: node.label ?? node.value }];
        }

        const values: { value: string, label: string }[] = [];
        if (node.children) {
            for (const child of node.children) {
                const childCheckedValues = collectCheckedValues(child);
                values.push(...childCheckedValues);
            }
        }
        return values;
    };

    for (const node of nodes) {
        checkedValues.push(...collectCheckedValues(node));
    }

    return checkedValues;
  }

  private updateSelectModel() {
    const selectElement = this.shadowRoot?.querySelector('sy-select') as SelectElement;
    
    if (!selectElement) {
      // select 요소가 아직 준비되지 않은 경우, 다음 업데이트 사이클에서 재시도
      requestAnimationFrame(() => {
        this.updateSelectModel();
      });
      return;
    }
    
    if(this.selectedItem?.length) {
      selectElement.selectedOptions = this.selectedItem;
      // 선택된 아이템이 있을 때는 placeholder 대신 선택된 값들의 label을 표시
      const selectedLabels = this.selectedItem.map(item => item.label).join(', ');
      selectElement.setValue(selectedLabels);
      this.treePlaceHolder = '';
    } else {
      selectElement.selectedOptions = [];
      selectElement.clearValue();
      this.treePlaceHolder = this.placeholder;
    }
  }

  // 특정 값으로 노드를 찾는 함수
  private findNodeByValue(nodes: TreeNode[], value: string): TreeNode | null {
    for (const node of nodes) {
        if (node.value === value) {
            return node; // 노드 반환
        }
        if (node.children) {
            const foundNode = this.findNodeByValue(node.children, value);
            if (foundNode) return foundNode; // 재귀적으로 찾기
        }
    }
    return null; // 노드를 찾지 못한 경우
  }

  private setupSelfObserver() {
    if (this.selfObserver) {
      this.selfObserver.disconnect();
      this.selfObserver = null;
    }
    
    this.selfObserver = new MutationObserver((mutations) => {
      if (!document.body.contains(this)) {
        this.closeTreeSelectOption();
      }
    });
    
    if (this.parentNode) {
      this.selfObserver.observe(this.parentNode, { 
        childList: true,
        subtree: false
      });
    }
  }

  public forceOpenOptions() {
    if (!this.isOpen) {
      this.isOpen = true;
      if (!this.appendParent) {
        this.openTreeSelectOption();
      }
    }
  }

  public openOptions() {
    this.isOpen = true;
    if (!this.appendParent) {
      this.openTreeSelectOption();
    }
  }

  public closeOptions() {
    this.isOpen = false;
    this.closeTreeSelectOption();
  }

  // Form 값 업데이트 메서드
  private updateFormValue() {
    // 선택된 항목이 없으면 null 값 설정
    if (!this.selectedItem.length) {
      this.internals.setFormValue(null);
      this.updateValidityState(); // 유효성 상태 업데이트
      return;
    }

    // 다중 선택 모드일 때 FormData 처리
    if (this.checkable) {
      // FormData에서 같은 이름으로 여러 값을 지원하기 위한 FormData 객체 생성
      const formData = new FormData();
      
      this.selectedItem.forEach(option => {
        formData.append(this.name, option.value);
      });
      
      // FormData를 사용하여 폼 값 설정
      this.internals.setFormValue(formData);
    } else {
      // 단일 선택 모드일 때는 첫 번째 선택된 값만 폼에 설정
      this.internals.setFormValue(this.selectedItem[0]?.value || null);
    }

    // 유효성 상태 업데이트
    this.updateValidityState();
  }

  // 폼 연결 콜백
  formAssociatedCallback() {
    this.updateFormValue();
  }

  // 폼 비활성화 콜백
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  // 폼 리셋 콜백
  formResetCallback() {
    // 선택된 항목 초기화
    this.selectedItem = [];
    this.touched = false;
    this.formSubmitted = false;

    // select 요소 완전 초기화
    if (this.selectElement) {
      this.selectElement.selectedOptions = [];
      this.selectElement.clearValue();
      // select의 formResetCallback도 호출하여 완전 초기화
      this.selectElement.formResetCallback();
    }

    // tree 요소 초기화 - 기존 선택 상태 완전 제거
    if (this.treeElement) {
      this.treeElement.clearAllSelectedItem(); // 체크 상태도 완전 초기화
    }

    // 팝업에 있는 tree 요소도 초기화 (appendParent가 false인 경우)
    if (!this.appendParent) {
      const popupContainer = document.querySelector('.sy-tree-select-option-container');
      const popupTreeElement = popupContainer?.querySelector('sy-tree') as TreeElement;
      if (popupTreeElement) {
        popupTreeElement.clearAllSelectedItem(); // 체크 상태도 완전 초기화
      }
    }

    // placeholder 복원
    this.treePlaceHolder = this.placeholder;
    
    // 유효성 상태 초기화
    this.isValid = true;
    this.validStatus = "";
    
    this.updateFormValue();
    this.requestUpdate();
  }

  // 폼 상태 복원 콜백
  formStateRestoreCallback(state: any) {
    if (!state) {
      this.selectedItem = [];
    } else if (state instanceof FormData) {
      // 다중 선택 모드일 때 FormData에서 값을 추출
      const formValues = state.getAll(this.name);
      
      // FormDataEntryValue[]를 string[]로 변환
      const values = formValues.map(value => value.toString());
      
      // 값에 해당하는 옵션을 찾아서 선택된 아이템으로 설정
      // 이 부분은 tree-select의 데이터 구조에 맞게 구현해야 함
      this.expandAllNodes(); // 모든 노드 펼치기
      
      // 저장된 값들을 찾아서 선택 상태로 설정
      const selectedItems = values.map(value => {
        const node = this.findNodeByValue(this.nodes, value);
        return node ? { value: node.value, label: node.label || node.value } : null;
      }).filter(Boolean) as {value: string, label: string}[];
      
      this.selectedItem = selectedItems;
      
      // 선택된 값들을 트리에 반영
      if (this.treeElement) {
        this.treeElement.selectedValue = values.join(',');
      }
    } else if (typeof state === 'string') {
      // 단일 선택 모드일 때 문자열 값 처리
      const node = this.findNodeByValue(this.nodes, state);
      if (node) {
        this.selectedItem = [{ value: node.value, label: node.label || node.value }];
        
        if (this.treeElement) {
          this.treeElement.selectedValue = state;
        }
      }
    }
    
    this.updateValidityState();
  }

  // 새로운 메서드 추가: custom error 설정
  public setCustomError() {
    this.customSettingError();
  }

  // 새로운 메서드 추가: custom error 제거
  public clearCustomError() {
    if(!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }

  /*******************************************************
   * Form validation with custom error handling
   *******************************************************/

  // validity 상태를 반환 - 커스텀 에러 상태 고려
  get validity() { 
    // 커스텀 에러나 슬롯 에러가 설정된 경우 가상의 ValidationState 반환
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      // 브라우저의 ValidityState와 유사한 객체 반환
      return {
        badInput: false,
        customError: this.validStatus === 'custom',
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valid: false,
        valueMissing: this.validStatus === 'valueMissing'
      };
    }
    return this.internals.validity; 
  }

  // validation 메시지 반환 - 커스텀 에러 상태 고려
  get validationMessage() { 
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      // 커스텀 메시지를 반환하거나 기본 메시지 사용
      return this.getErrorMessage(this.validStatus);
    }
    
    return this.internals.validationMessage; 
  }

  // 폼 내 유효성 상태 확인
  get willValidate() { 
    return this.internals.willValidate; 
  }

  // 사용자 정의 유효성 검사를 실행하고 폼에 보고
  public checkValidity(): boolean {
    this.updateValidityState();
    return this.internals.checkValidity();
  }

  public reportValidity(): boolean {
    this.updateValidityState();
    return this.internals.reportValidity();
  }

  private updateValidityState() {
    // 이미 사용자가 직접 에러 설정한 경우, 기본 유효성 검사 건너뛰기
    if (this.validStatus === 'custom' && !this.isValid) {
      return;
    }

    this.isValid = true;
    this.validStatus = "";

    // 필수 입력 검증
    if (this.required && (!this.selectedItem || this.selectedItem.length === 0)) {
      this.isValid = false;
      this.validStatus = "valueMissing";
    }

    const validityMessage = this.getErrorMessage(this.validStatus);

    // ElementInternals에 유효성 상태 보고
    if (!this.isValid) {
      if (this.hasSlotErrorMessage) {
        // 슬롯 에러가 있으면 customError만 설정
        this.internals.setValidity({ customError: true }, " ");
      } else {
        // 슬롯 에러가 없으면 기본 유효성 검사 에러를 사용
        this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
      }
    } else {
      this.internals.setValidity({});
    }
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    
    // 사용자 정의 오류 설정
    this.internals.setValidity({ customError: true }, "Custom validation error");
    
    this.requestUpdate();
  }

  private handleInvalid = (e: Event) => {
    // 최신 슬롯 상태 확인 (Light DOM에서 직접)
    const hasErrorSlot = !!this.querySelector('[slot="error"]');
    
    // 슬롯 상태 확인
    if (this.noNativeValidity || hasErrorSlot) {
      // 슬롯에 있는 내용 확인
      const errorSlotElement = this.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim();
                        
      if (hasContent) {
        // 슬롯에 내용이 있을 때만 커스텀 에러 처리
        this.hasSlotErrorMessage = true;
        this.setAttribute('has-custom-error', '');
        
        // 브라우저 기본 UI 방지
        e.preventDefault();
        e.stopPropagation();
        
        // 커스텀 에러 설정
        this.internals.setValidity({ customError: true }, " ");
      } else {
        // 슬롯이 비어 있으면 기본 브라우저 에러 사용
        this.hasSlotErrorMessage = false;
        this.removeAttribute('has-custom-error');
      }
    } else {
      // 슬롯이 없으면 브라우저 기본 에러 사용
      this.hasSlotErrorMessage = false;
      this.removeAttribute('has-custom-error');
    }
    
    // 이벤트와 관계없이 무효 상태 설정
    this.isValid = false;
  };

  private handleCustomErrorSlot() {
    const errorSlot = this.renderRoot?.querySelector('slot[name="error"]') as HTMLSlotElement;
    if (!errorSlot) return;
    
    // 슬롯에 할당된 노드들을 가져옴
    const errorNodes = errorSlot.assignedNodes();
    
    // 특수 컴포넌트(tooltip, popover 등) 존재 여부 확인
    this.hasPopupErrorComponent = errorNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName?.toLowerCase() || '';
        
        // 직접 특수 컴포넌트인지 확인
        if (tagName === 'sy-tooltip' || 
            tagName === 'sy-popover' || 
            tagName === 'sy-popconfirm' || 
            tagName === 'sy-inline-message') {
          return true;
        }
        
        // 자식 요소로 특수 컴포넌트를 포함하는지 확인
        return !!element.querySelector(
          'sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message'
        );
      }
      return false;
    });
    
    // 슬롯에 실제 콘텐츠가 있는지 확인
    this.hasSlotErrorMessage = errorNodes.some(node => {
      // 텍스트 노드이고 내용이 있는 경우
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
      // 엘리먼트 노드이고 내부에 실제 콘텐츠가 있는 경우
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        
        // 내부 텍스트가 있거나 자식 요소가 있는 경우만 콘텐츠로 간주
        return !!(element.textContent?.trim() || element.children.length > 0);
      }
      return false;
    });
    
    // 요소가 업데이트되도록 상태 변경을 알림
    this.requestUpdate();
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "Please select an option",
      custom: 'Invalid by custom'
    }

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }

}
