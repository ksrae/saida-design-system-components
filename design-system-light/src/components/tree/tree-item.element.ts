import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import globalCSS from "./styles/tree-item.scss?inline";
import '../checkbox/checkbox.element';
import '../input/input.element';
import '../button/button.element';
import '../icon/icon.element';
import '../badge/badge.element';
import '../tag/tag.element';
import '../tooltip/tooltip.element';
import { TooltipElement } from '../tooltip/tooltip.element';
import { CheckboxElement } from '../checkbox/checkbox.element';

@customElement('sy-tree-item')
export class TreeItemElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;      
  @property({ type: Boolean }) appendable = false; // 자식 추가 가능 여부
  @property({ type: Boolean }) checkable = false;
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) clickable = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) draggable = false;
  @property({ type: Boolean }) dragging = false;
  @property({ type: Boolean }) editable = false; // 편집 가능 여부
  @property({ type: Boolean }) expandable = false;
  @property({ type: Boolean }) expanded = false;
  @property({ type: Boolean }) fixed = false;
  @property({ type: Boolean }) hasChild = false;
  @property({ type: String }) appendPlaceholder = 'New item';
  @property({ type: String }) icon: string = '';
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) isDescendant = false;
  @property({ type: Boolean }) isEditable = false; // 편집 가능 모드
  @property({ type: String }) label = '';
  @property({ type: Number }) level = 0;
  @property({ type: Boolean }) removable = false; // 자식 제거 가능 여부
  @property({ type: String }) tagMessage = '';
  @property({ type: String }) tagVariant: "gray"| "purple" | "blue" | "green" | "cyan" | "yellow" | "orange" | "red" | undefined = undefined;
  @property({ type: String }) value = '';
  @property({ type: String }) searchTerm = '';
  
  // @property({ type: String }) selectedValue = '';
  @state() hovered = false;
  @state() line = false;
  @state() selectedValue = '';
  @state() nodeWidth: number | null = null;
  @state() private isEditing = false; // 편집 상태 관리
  @state() private isAdding = false; // 추가 상태 관리
  @state() private newChildLabel = ''; // 새로운 자식의 레이블
  @state() private hasDropTarget = false;
  @state() private editingLabel = this.label;
  @state() private highlightTerm = '';
  @state() private textTerm = '';
  @state() private active = false;
  @state() private tooltipOpen = false;
  @state() private overflow = false;
  @state() private originalHtmlParts: { 
    tag: string; 
    position: 'start' | 'end' | 'middle'; 
    textIndex: number; // 순수 텍스트에서의 위치
    beforeText: string; // HTML 앞의 텍스트
    afterText: string; // HTML 뒤의 텍스트
  }[] = [];
  @state() private editingTextOnly = ''; // HTML 태그가 제거된 편집용 텍스트
  // @state() private isDragging = false;
  
  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick, true);
  }

  async firstUpdated() {
    await this.updateComplete;
    // this.active = (this.value?.toLowerCase() === this.selectedValue);  
    
    this.setTreetoCheckbox();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('searchTerm') || changedProperties.has('label')) {
      this.renderLabelWithHighlight(this.label, this.searchTerm);
    }
    if(changedProperties.has('selectedValue')) {
      this.active = (this.value?.toString()?.toLowerCase() === this.selectedValue?.toString());

      if(this.active) {
        // this.emitItemSelectedEvent();
      }
    }
    if(changedProperties.has('nodeWidth')) {
      this.renderLabelWithHighlight(this.label, this.searchTerm);
    }
    if(changedProperties.has('selectedValue')) {
      this.active = (this.value?.toString()?.toLowerCase() === this.selectedValue?.toString());

      if(this.active) {
        // this.emitItemSelectedEvent();
      }
    }
    if(changedProperties.has('checkable')) {
      this.setTreetoCheckbox();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick, true);
  }

  public setOverflow() {
    // Get nodeWidth from parent tree element if not set locally
    let effectiveNodeWidth = this.nodeWidth;
    if (!effectiveNodeWidth) {
      const parentTree = this.closest('sy-tree') as any;
      if (parentTree && parentTree.nodeWidth) {
        effectiveNodeWidth = parentTree.nodeWidth;
      }
    }
    
    if (!effectiveNodeWidth) return;
    
    requestAnimationFrame(() => {
      this.renderLabelWithHighlight(this.label, this.searchTerm);

      const treeItem = this.renderRoot.querySelector('.tree-item');
      if (treeItem) {
        const actualWidth = treeItem.getBoundingClientRect().width;
        if(actualWidth >= effectiveNodeWidth) {
          this.overflow = true;
        } else {
          this.overflow = false;
        }
      }
    });
  }

  render() {
    // for hover
    const isEditableActive = this.isEditable && !this.disabled && this.hovered;
    // for click
    // const isEditableActive = this.isEditable && !this.disabled && this.active;

    return html`
      <div
        class="${classMap({
          'tree-item-list': true,
          line: this.line ?? false,
          dragging: this.dragging && !this.disabled,
          'drop-target': this.hasDropTarget && !this.isDescendant,
          'tree-item-selected': this.active,
          ['level-' + this.level]: true,
          isLeaf: !this.hasChild ? true : false,
          disabled: this.disabled,
          fixed: this.fixed
        })}"
        style="${styleMap({
          '--level': this.level,
          maxWidth: this.nodeWidth ? `${this.nodeWidth}px` : undefined,
        })}"
        draggable=${ifDefined((this.draggable && !this.isEditing) ? true : undefined)} 
        @dragstart="${this.handleDragStart}"
        @dragend="${this.handleDragEnd}"
        @dragover="${this.handleDragOver}"
        @drop="${this.handleDrop}"
        @dragleave="${this.handleDragLeave}"
        @click="${this.handleItemClick}"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
      >
        ${this.expandable && this.hasChild ? html`
          <span class="expand-icon" @click="${this.handleExpandClick}">
            ${this.expanded ? 
            html`<sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M480 224C492.9 224 504.6 231.8 509.6 243.8C514.6 255.8 511.8 269.5 502.7 278.7L342.7 438.7C330.2 451.2 309.9 451.2 297.4 438.7L137.4 278.7C128.2 269.5 125.5 255.8 130.5 243.8C135.5 231.8 147.1 224 160 224L480 224z"/></svg></sy-icon>` : 
            html`<sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M224.5 160C224.5 147.1 232.3 135.4 244.3 130.4C256.3 125.4 270 128.2 279.1 137.4L439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C269.9 511.9 256.2 514.6 244.2 509.6C232.2 504.6 224.5 492.9 224.5 480L224.5 160z"/></svg></sy-icon>`}
          </span>
        ` : nothing}
  
        ${this.checkable ? html`
          <div class="tree-check">
            <sy-checkbox
              ?readonly=${this.fixed || this.disabled}
              ?checked="${this.checked}"
              ?indeterminate="${this.indeterminate}"
              @changed="${this.handleCheckChange}"
            >
              ${this.renderNode()}
            </sy-checkbox>
          </div>
        ` : this.renderNode()}

        <span class="${classMap({
          "tree-editable": true,
          "edit-on": isEditableActive
        })}">
          ${isEditableActive && this.editable ? html`
            <sy-button size="small" variant="borderless" @click="${this.startEditing}">
              <sy-icon size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg></sy-icon>
              <sy-tooltip position="top" content="Edit" id="editTooltip"></sy-tooltip>
            </sy-button>
          ` : nothing}
          ${isEditableActive && this.appendable ? html`
            <sy-button size="small" variant="borderless" @click="${this.startAdding}">
              <sy-icon size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M344 120C344 106.7 333.3 96 320 96C306.7 96 296 106.7 296 120L296 296L120 296C106.7 296 96 306.7 96 320C96 333.3 106.7 344 120 344L296 344L296 520C296 533.3 306.7 544 320 544C333.3 544 344 533.3 344 520L344 344L520 344C533.3 344 544 333.3 544 320C544 306.7 533.3 296 520 296L344 296L344 120z"/></svg></sy-icon>
              <sy-tooltip position="top" content="Add" id="addTooltip"></sy-tooltip>
            </sy-button>
          ` : nothing}
          ${isEditableActive && this.removable ? html`
            <sy-button size="small" variant="borderless" @click="${this.removeItem}">
              <sy-icon size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M96 320C96 306.7 106.7 296 120 296L520 296C533.3 296 544 306.7 544 320C544 333.3 533.3 344 520 344L120 344C106.7 344 96 333.3 96 320z"/></svg></sy-icon>
              <sy-tooltip position="top" content="Remove" id="removeTooltip"></sy-tooltip>
            </sy-button>
          ` : nothing}         
        </span>
      </div>
      ${this.expanded && this.hasChild ? html`
        <div class="children">
          <slot></slot>
          ${this.renderAddingChild()}
        </div>
      ` : 
      html`
      <div class="children">
        ${this.renderAddingChild()}
      </div>
      `}
    `;
  }
  
  private renderNode() {
    return html`
    <div class="tree-item-group">
    ${this.isEditing ? html`
      <sy-input 
        class="editable-label"
        value="${this.editingLabel}" 
        size="small"
        @changed="${this.handleEditChange}" 
        @keydown="${this.handleEditKeydown}" labe
        @click="${this.handleEditClick}"
        @mousedown="${this.handleEditMousedown}"
        autofocus></sy-input>
      <div class="add-item">
        <sy-button size="small" @click="${this.handleEditNode}">Save</sy-button>
        <sy-button size="small" @click="${this.handleCancelEditNode}">Cancel</sy-button>          
      </div>
    ` : html`

      <span 
        class="${classMap({
          "tree-item": true,
          'overflow': this.overflow
        })}" 
        style="${styleMap({
          maxWidth: this.nodeWidth ? `${this.nodeWidth}px` : undefined,
        })}"
        @mouseenter="${this.handleTreeItemMouseEnter}"
        @mouseleave="${this.handleTreeItemMouseLeave}"
        @click="${this.handleItemClick}"
        >
      <sy-tooltip position="top" content="${this.label}" trigger="none" ?open="${this.tooltipOpen}"></sy-tooltip>
         ${this.icon?.length ? html`
          <sy-icon size="medium">
            ${unsafeHTML(this.icon)}
         </sy-icon>` : nothing}
        <span class="item-content">${unsafeHTML(this.textTerm)}</span>
        ${this.tagMessage?.length ? html`<sy-tag variant=${this.tagVariant ?? 'gray'} ?disabled=${this.disabled} rounded size="medium">${this.tagMessage}</sy-tag>` : nothing}
      </span>
    `}
  </div>
  `
  }
  private renderAddingChild() {
    return html`
      ${this.isAdding ? html`
        <div class="input-container">
          <sy-input 
            size="small" 
            value="${this.newChildLabel}" 
            @keydown="${this.handleNewChildKeydown}"  
            @changed="${this.handleNewChildInputChange}" 
            placeholder="${this.appendPlaceholder}" 
            autofocus>
          </sy-input>
          <div class="add-item">
            <sy-button size="small" @click="${this.addNewChild}">Add</sy-button>
            <sy-button size="small" @click="${this.cancelAdding}">Cancel</sy-button>          
          </div>
        </div>
      ` : nothing}
    `

  }

  private setTreetoCheckbox() {
    if (this.checkable) {
      const checkbox = this.shadowRoot?.querySelector('sy-checkbox') as CheckboxElement | null;
      if (checkbox) {
        (checkbox as any).isTree = true;
        checkbox.requestUpdate();
      }
    }
  }
  private handleOutsideClick = (event: any) => {
    // if(this.isDragging) { return; }

    const eventPath = event.composedPath();
    // Get the tree-item-group that contains the editable inpu  t
    // const treeItemGroup = this.shadowRoot?.querySelector('.tree-item-group');
    // const isClickInEditArea = treeItemGroup && eventPath.includes(treeItemGroup);
    
    // Editing: cancel if clicked outside the edit area
    // if (this.isEditing && !isClickInEditArea) {
    //   this.cancelEditing();
    // }
     
    // Adding: only cancel if clicked completely outside the component
    // if (this.isAdding && !eventPath.includes(this)) {
    //   this.cancelAdding(event);
    // }
  };

   private renderLabelWithHighlight(label: string, searchTerm: string) {
    if (!searchTerm) {
      this.highlightTerm = '';
      this.textTerm = label;
      return;
    }
  
    // 검색어의 공백을 이스케이프하여 정규식에서 정확히 매칭되도록 함
    const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
    
    let result = '';
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(label)) !== null) {
      // 매칭 이전의 텍스트 (공백 포함)
      const beforeMatch = label.substring(lastIndex, match.index);
      // 공백을 HTML 엔티티로 변환
      const preservedSpace = beforeMatch.replace(/ /g, '&nbsp;');
      
      // 매칭된 부분의 공백도 보존
      const matchedText = match[0].replace(/ /g, '&nbsp;');
      const highlightedText = `<mark class="highlight">${matchedText}</mark>`;
      
      result += preservedSpace + highlightedText;
      lastIndex = regex.lastIndex;
    }
    
    // 마지막 매칭 이후의 텍스트 처리
    if (lastIndex < label.length) {
      const remainingText = label.substring(lastIndex);
      const preservedSpace = remainingText.replace(/ /g, '&nbsp;');
      result += preservedSpace;
    }
    
    this.textTerm = result;
  }

  // HTML 태그와 텍스트를 분리하는 메서드
  private extractHtmlAndText(htmlString: string) {
    const htmlParts: { 
      tag: string; 
      position: 'start' | 'end' | 'middle'; 
      textIndex: number; // 순수 텍스트에서의 위치
      beforeText: string; // HTML 앞의 텍스트
      afterText: string; // HTML 뒤의 텍스트
    }[] = [];
    
    // 임시 DOM 요소를 만들어서 HTML을 파싱
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    let pureText = '';
    let currentTextIndex = 0;
    
    // 모든 자식 노드를 순회하면서 HTML과 텍스트 위치 정보를 수집
    const walkNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        // 텍스트 노드인 경우
        const textContent = node.textContent || '';
        pureText += textContent;
        currentTextIndex += textContent.length;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 요소 노드인 경우 (HTML 태그)
        const element = node as Element;
        const tag = element.outerHTML;
        
        // 현재까지의 텍스트가 beforeText
        const beforeText = pureText;
        
        // 나머지 형제 노드들에서 afterText 찾기
        let afterText = '';
        let nextSibling = node.nextSibling;
        while (nextSibling) {
          if (nextSibling.nodeType === Node.TEXT_NODE) {
            afterText += nextSibling.textContent || '';
          }
          nextSibling = nextSibling.nextSibling;
        }
        
        // position 결정
        let position: 'start' | 'end' | 'middle';
        if (beforeText.length === 0) {
          position = 'start';
        } else if (afterText.trim().length === 0) {
          position = 'end';
        } else {
          position = 'middle';
        }
        
        htmlParts.push({
          tag,
          position,
          textIndex: currentTextIndex,
          beforeText,
          afterText: afterText.trim()
        });
        
        // 이 요소는 이미 처리했으므로 자식 노드는 건너뜀
        return;
      }
      
      // 자식 노드들 처리
      for (const child of Array.from(node.childNodes)) {
        walkNodes(child);
      }
    };
    
    // 루트 노드의 자식들 처리
    for (const child of Array.from(tempDiv.childNodes)) {
      walkNodes(child);
    }
    
    return { htmlParts, pureText: pureText.trim() };
  }

  // 편집 완료 후 HTML 태그를 다시 삽입하는 메서드
  private reconstructHtmlLabel(editedText: string, htmlParts: { 
    tag: string; 
    position: 'start' | 'end' | 'middle'; 
    textIndex: number;
    beforeText: string;
    afterText: string;
  }[]) {
    if (htmlParts.length === 0) {
      return editedText;
    }
    
    let result = editedText;
    
    // 위치별로 그룹화
    const startTags = htmlParts.filter(p => p.position === 'start');
    const endTags = htmlParts.filter(p => p.position === 'end');
    const middleTags = htmlParts.filter(p => p.position === 'middle');
    
    // 시작 위치 태그들 삽입 (앞에서부터)
    startTags.forEach(part => {
      result = part.tag + result;
    });
    
    // 끝 위치 태그들 삽입 (뒤에)
    endTags.forEach(part => {
      result = result + part.tag;
    });
    
    // 중간 위치 태그들 처리 - beforeText와 afterText를 기준으로 정확한 위치 찾기
    // 뒤에서부터 삽입해야 앞쪽 삽입이 뒤쪽 인덱스에 영향을 주지 않음
    middleTags
      .sort((a, b) => b.textIndex - a.textIndex)
      .forEach(part => {
        let insertIndex = -1;
        
        // 1. beforeText + afterText 패턴을 편집된 텍스트에서 찾기
        if (part.beforeText && part.afterText) {
          const pattern = part.beforeText + part.afterText;
          const patternIndex = result.indexOf(pattern);
          if (patternIndex !== -1) {
            insertIndex = patternIndex + part.beforeText.length;
          }
        }
        
        // 2. beforeText만으로 찾기 (afterText가 없거나 패턴이 없는 경우)
        if (insertIndex === -1 && part.beforeText) {
          const beforeIndex = result.lastIndexOf(part.beforeText);
          if (beforeIndex !== -1) {
            insertIndex = beforeIndex + part.beforeText.length;
          }
        }
        
        // 3. afterText만으로 찾기 (beforeText로 찾지 못한 경우)
        if (insertIndex === -1 && part.afterText) {
          const afterIndex = result.indexOf(part.afterText);
          if (afterIndex !== -1) {
            insertIndex = afterIndex;
          }
        }
        
        // 4. 모두 실패한 경우 원래 인덱스 사용 (하지만 편집된 텍스트 길이 제한)
        if (insertIndex === -1) {
          insertIndex = Math.min(part.textIndex, result.length);
        }
        
        // HTML 태그 삽입
        result = result.slice(0, insertIndex) + part.tag + result.slice(insertIndex);
      });
    
    return result;
  }


  private startEditing(e: any) {
    e.preventDefault();
    e.stopPropagation();
    
    // HTML과 텍스트 분리
    const { htmlParts, pureText } = this.extractHtmlAndText(this.label);
    this.originalHtmlParts = htmlParts;
    this.editingTextOnly = pureText;
    this.editingLabel = pureText; // 편집 시에는 순수 텍스트만 보여줌
    
    this.isEditing = true;
    this.addingDocumentKeydownEvent();
    this.updatingEmit();
  }

  private handleEditMousedown(e: Event) {
    e.stopPropagation();
  }

  private handleEditChange(e: CustomEvent) {
    e.stopPropagation();
    this.editingLabel = e.detail.value;
    this.editingTextOnly = e.detail.value; // 순수 텍스트 업데이트
  }
  private handleEditClick(e: Event) {
    e.stopPropagation();
  }

  // private handleEditBlur() {
  //   if (!this.isBlurEnabled || this.isEditing) {
  //     this.isBlurEnabled = true;
  //     return;
  //   }
    
  //   this.active = false;
  //   console.log('blur');
  //   this.handleEditInputLabel();
  // }cance

  private handleEditInputLabel() {
    // setTimeout(() => {
      if (this.editingLabel && this.editingLabel.trim() !== '') {
        // 편집된 텍스트에 HTML 태그를 다시 결합
        const reconstructedLabel = this.reconstructHtmlLabel(this.editingLabel, this.originalHtmlParts);
        this.label = reconstructedLabel;
        
        this.dispatchEvent(new CustomEvent('itemEdited', {
          detail: { value: this.value, label: this.label },
          bubbles: true,
          composed: true
        }));
      }
    // }, 0);
  }

  private handleEditKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      this.handleEditInputLabel();
      this.isEditing = false;
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      this.isEditing = false;
      this.editingLabel = this.label; // 원래 라벨로 복원
      this.originalHtmlParts = []; // HTML 파트 초기화
      this.editingTextOnly = ''; // 편집 텍스트 초기화
      this.updatingResetEmit();
    }
    
  }

  private handleEditNode(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.handleEditInputLabel();
    this.isEditing = false;
  }

  private handleCancelEditNode(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.isEditing = false;
    this.editingLabel = this.label; // 원래 라벨로 복원
    this.originalHtmlParts = []; // HTML 파트 초기화
    this.editingTextOnly = ''; // 편집 텍스트 초기화
    this.updatingResetEmit();
  }

  private handleTreeItemClick(e: any) {
    // if(this.fixed) {
    //   e.preventDefault();
    // }
  }
  private startAdding(e: Event) {
    e.stopPropagation();
    this.isAdding = true;
    this.newChildLabel = '';
    this.updatingEmit();
    this.addingDocumentKeydownEvent();
  }

  private handleNewChildDocumentKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();

      if(this.isAdding) {
        this.cancelAdding(e);
      } else if (this.isEditing) {
        this.cancelEditing();
      }
    }
  }

  private handleNewChildKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addNewChild(e);
    } 
    // else if (e.key === 'Escape') {
    //   e.preventDefault();
    //   this.cancelAdding();
    // }
  }

  private handleNewChildInputChange(e: CustomEvent) {
    this.newChildLabel = e.detail.value;
  }

  private addNewChild(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    
    if (this.newChildLabel.trim()) {
      
      this.isAdding = false;
      const childLabel = this.newChildLabel;
      const childValue = `${this.value?.toString()}-${Date.now()}`; //
      const childLevel = this.level + 1;

      // const newChild = document.createElement('sy-tree-item') as TreeItemElement;
      // // newChild.addEventListener('')
      // newChild.label = this.newChildLabel;
      // newChild.value = `${this.value}-${Date.now()}`;
      // newChild.level = this.level + 1;

      // // Append the new child at the end of the list of children
      // const childrenContainer = this.shadowRoot?.querySelector('.children');
      // if (childrenContainer) {
      //   childrenContainer.appendChild(newChild);
      // }

      this.dispatchEvent(new CustomEvent('itemAdded', {
        detail: { parentValue: this.value, childLabel, childValue, childLevel},
        bubbles: true,
        composed: true
      }));
      document.removeEventListener("keydown", this.handleNewChildDocumentKeydown);
    } else {
      this.cancelAdding(e);
    }
  }

  private cancelAdding(e: Event) {
    e.stopPropagation();
    this.isAdding = false;
    this.newChildLabel = '';
    this.updatingResetEmit();
    this.removeDocumentKeydownEvent();
  }

  private cancelEditing() {
    this.isEditing = false;
    this.editingLabel = this.label; // 원래 라벨로 복원
    this.originalHtmlParts = []; // HTML 파트 초기화
    this.editingTextOnly = ''; // 편집 텍스트 초기화
    this.updatingResetEmit();
  }

  private addingDocumentKeydownEvent() {
    document.addEventListener("keydown", this.handleNewChildDocumentKeydown.bind(this));
  }
  private removeDocumentKeydownEvent() {
    document.removeEventListener("keydown", this.handleNewChildDocumentKeydown);
  }

  private removeItem(e: Event) {
    e.stopPropagation();
    // if (confirm('Are you sure you want to remove this item and its children?')) {
      // this.remove();
      this.dispatchEvent(new CustomEvent('itemRemoved', {
        detail: { value: this.value, label: this.label },
        bubbles: true,
        composed: true
      }));
    // }
  }

  private handleItemClick(e: Event) {  
    e.preventDefault();
    if(this.overflow) {
      this.tooltipOpen = !this.tooltipOpen;
    }
    
    if(!this.clickable) {
      e.stopPropagation();
    } else {
      if(this.isAdding || this.isEditing) {
        return;
      }
      this.emitItemSelectedEvent();
    }

    if(this.expandable) {
      this.handleExpandClick(e);
    }
  }

  // for editable hover
  private handleMouseEnter(e: Event) {
    e.preventDefault();
    this.hovered = true;
  }
  // for editable hover
  private handleMouseLeave(e: Event) {
    e.preventDefault();
    this.hovered = false;
  }

  private emitItemSelectedEvent() {
    
    if (!this.disabled && !this.active && (this.clickable || this.isEditable)) {
      // console.log('active', this.active);
      // e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되는 것을 방지합니다.
      this.dispatchEvent(new CustomEvent('itemSelected', {
        detail: { value: this.value, label: this.label, checked: this.checked ?? false },
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleExpandClick(e: Event) {
    e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되는 것을 방지합니다.
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent('expandChanged', {
      detail: { value: this.value, label: this.label, expanded: this.expanded },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  private handleCheckChange(e: CustomEvent) {
    // e.stopImmediatePropagation();
    // e.stopPropagation();
    // e.preventDefault();
    
    if(this.checkable && !this.fixed && !this.disabled && this.checked !== e.detail.checked) {
      this.checked = e.detail.checked;
      this.dispatchEvent(new CustomEvent('checkChanged', {
        detail: { value: this.value, label: this.label, checked: this.checked },
        bubbles: true,
        composed: true
      }));
      this.requestUpdate();
    }

    // this.emitItemSelectedEvent();
  }

  private handleDragStart(e: DragEvent) {
    // Prevent drag if disabled
    if (this.disabled || !this.draggable || this.isEditing || this.isAdding) {
      e.preventDefault();
      return;
    }
    const dragData = JSON.stringify({ value: this.value, subtree: this.getSubtree() });
    e.dataTransfer?.setData('application/json', dragData);
    e.dataTransfer!.effectAllowed = 'move';
    this.isDescendant = true;
  
    this.dispatchEvent(
      new CustomEvent('dragging', {
        detail: this.value,
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
    this.setDraggingState(true);
  }

  private handleDragEnd() {
    if(this.dragging) {
      this.setDraggingState(false);
    }    
  }
  private handleDragOver(e: DragEvent) {
    e.preventDefault();
  
    // Prevent drop if disabled
    if (this.disabled || !this.dragging) {
      e.dataTransfer!.dropEffect = 'none';
      return;
    }
  
    e.dataTransfer!.dropEffect = 'move';
    this.hasDropTarget = true;
  }
  
  private handleDrop(e: DragEvent) {
    e.preventDefault();
  
    // Prevent drop if disabled
    if (this.disabled || !this.dragging) {
      return;
    }
  
    this.hasDropTarget = false;
  
    const dragData = e.dataTransfer?.getData('application/json');
    if (dragData) {
      const { value: draggedKey } = JSON.parse(dragData);
      if (draggedKey && draggedKey?.toString() !== this.value?.toString()) {
        this.dispatchEvent(new CustomEvent('itemDrop', {
          detail: { targetKey: this.value, draggedKey, dropPosition: 'on', targetLevel: this.level },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  private handleDragLeave() {
    this.hasDropTarget = false;
  }

  private getSubtree() {
    const getNodeSubtree = (node: HTMLElement): any => {
      const children = Array.from(node.querySelectorAll(':scope > sy-tree-item'));
      return {
        value: node.getAttribute('value'),
        children: children.map((child: any) => getNodeSubtree(child))
      };
    };
    return getNodeSubtree(this);
  }

  private setDraggingState(isDragging: boolean) {
    this.dragging = isDragging;
    // this.updateComplete.then(() => {
      const children = this.shadowRoot?.querySelectorAll('sy-tree-item');
      children?.forEach(child => {
        (child as any).dragging = isDragging;
      });
    // });
  }
  private updatingEmit() {
    this.dispatchEvent(new CustomEvent('itemUpdating', {
      detail: this,
      bubbles: true,
      composed: true
    }));
  }  
  private updatingResetEmit() {
    this.dispatchEvent(new CustomEvent('itemUpdatingReset', {
      detail: this,
      bubbles: true,
      composed: true
    }));
  }

  private handleTreeItemMouseEnter(e: Event) {
    if (this.overflow) {
      this.tooltipOpen = true;
      // e.stopImmediatePropagation();
    }
  }
  private handleTreeItemMouseLeave(e: Event) {
    if (this.overflow) {
      this.tooltipOpen = false;
    }
  }
  // private setAllItemInActive() {
  //   // 현재 요소의 shadowRoot를 가져옴

  //   // setTimeout(() => {
  //     const currentShadowRoot = this.getRootNode() as ShadowRoot;

  //     const tree = currentShadowRoot.host;

      
      
      
  //     if (tree?.tagName !== 'SY-TREE') {
  //       // remove 상황이므로 무시해도 됨.
  //       // console.error('sy-tree not found');
  //       return;
  //     }
    
  //     // sy-tree의 shadowRoot에서 sy-tree-item을 검색
  //     const children = tree.shadowRoot?.querySelectorAll('sy-tree-item');
    
  //     children?.forEach(child => {
  //       (child as any).active = false; // 모든 active를 false로 설정
  //     });
    
  //     this.active = true; // 현재 선택한 item의 active를 true로 설정
  //     this.requestUpdate();      
  //   // }, 1000);

  // }
  
  // private observeDOMChanges() {
  //   const observer = new MutationObserver(() => {
  //       const currentShadowRoot = this.getRootNode() as ShadowRoot;
  //       const tree = currentShadowRoot.host;

  //       if (tree && tree.tagName === 'SY-TREE') {
  //         console.log('찾았나?');
  //           // this.setAllItemInActive();
  //           observer.disconnect(); // 감지 중지
  //       }
  //   });

  //   observer.observe(this, {
  //       childList: true,
  //       subtree: true,
  //   });
  // }
}
  //       }
  //       }
  //   });

  //   observer.observe(this, {
  //       childList: true,
  //       subtree: true,
  //   });
  // }

  //   });

  //   observer.observe(this, {
  //       childList: true,
  //       subtree: true,
  //   });
  // }
