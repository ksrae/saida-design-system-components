import { Component, Prop, State, Event, EventEmitter, h, Element, Watch, Method } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-tree-item — leaf renderer used internally by sy-tree.
 *
 * Spec: design-system-specs/components/tree.yaml (tree-item anatomy).
 *
 * Not meant to be authored directly — sy-tree materializes items from its
 * `nodes` data. Extensive props exist so the parent can push per-node state
 * (expanded, checked, editing, dragging, tag labels, etc.) down.
 *
 * Legacy attribute aliases resolved via fnAssignPropFromAlias:
 *   has-child, append-placeholder, is-descendant, is-editable, tag-message,
 *   tag-variant, search-term, selected-value, node-width.
 *
 * `treeitemDraggable` maps to the `draggable` attribute (TS reserved name).
 *
 * Note: the attribute `isDesendant` (typo) is preserved for legacy markup
 * compatibility but the canonical property is `isDescendant`.
 */
@Component({
  tag: 'sy-tree-item',
  styleUrl: 'sy-tree-item.scss',
  shadow: false,
  scoped: true,
})
export class SyTreeItem {
  @Element() host: HTMLSyTreeItemElement;

  // --- Props ---
  @Prop() appendable = false;
  @Prop() checkable = false;
  @Prop() checked = false;
  @Prop({ reflect: true }) clickable = false;
  @Prop() disabled = false;
  @Prop({ attribute: 'draggable' }) treeitemDraggable = false;
  @Prop() dragging = false;
  @Prop() editable = false;
  @Prop({ reflect: true }) expandable = false;
  @Prop() expanded = false;
  @Prop() fixed = false;
  @Prop({ attribute: 'hasChild', mutable: true }) hasChild = false;
  @Prop({ attribute: 'appendPlaceholder', mutable: true }) appendPlaceholder = 'New item';
  @Prop() icon: string = '';
  @Prop() indeterminate = false;
  @Prop({ attribute: 'isDesendant', mutable: true, reflect: true }) isDescendant = false;
  @Prop({ attribute: 'isEditable', mutable: true }) isEditable = false;
  @Prop() label = '';
  @Prop() level = 0;
  @Prop() removable = false;
  @Prop() treeChildren: any[] = [];
  @Prop({ attribute: 'tagMessage', mutable: true }) tagMessage = '';
  @Prop({ attribute: 'tagVariant', mutable: true }) tagVariant: "gray" | "purple" | "blue" | "green" | "cyan" | "yellow" | "orange" | "red" | undefined = undefined;
  @Prop() value = '';
  @Prop({ attribute: 'searchTerm', mutable: true }) searchTerm = '';
  @Prop({ attribute: 'selectedValue', mutable: true }) selectedValue = '';
  @Prop({ attribute: 'nodeWidth', mutable: true }) nodeWidth: number | null = null;
  @Prop({ reflect: true }) line = false;

  // --- State ---
  @State() hovered = false;
  @State() private isEditing = false;
  @State() private isAdding = false;
  @State() private newChildLabel = '';
  @State() private hasDropTarget = false;
  @State() private editingLabel = this.label;
  @State() private textTerm = '';
  @State() private active = false;
  @State() private tooltipOpen = false;
  @State() private overflow = false;
  @State() private originalHtmlParts: {
    tag: string;
    position: 'start' | 'end' | 'middle';
    textIndex: number;
    beforeText: string;
    afterText: string;
  }[] = [];

  // --- Events ---
  @Event() expandChanged: EventEmitter<{ value: string; label: string; expanded: boolean }>;
  @Event() checkChanged: EventEmitter<{ value: string; label: string; checked: boolean }>;
  @Event() itemAdded: EventEmitter<{ parentValue: string; childLabel: string; childValue: string; childLevel: number }>;
  @Event() itemRemoved: EventEmitter<{ value: string; label: string }>;
  @Event() itemEdited: EventEmitter<{ value: string; label: string }>;
  @Event() itemUpdating: EventEmitter<any>;
  @Event() itemUpdatingReset: EventEmitter<any>;
  @Event() itemDrop: EventEmitter<{ targetKey: string; draggedKey: string; dropPosition: string; targetLevel: number }>;
  @Event() itemSelected: EventEmitter<{ value: string; label: string; checked: boolean }>;
  @Event() draggingEvent: EventEmitter<string>;

  // --- Lifecycle Methods ---
  componentWillLoad() {
    this.hasChild = fnAssignPropFromAlias(this.host, 'has-child') ?? this.hasChild;
    this.appendPlaceholder = fnAssignPropFromAlias(this.host, 'append-placeholder') ?? this.appendPlaceholder;
    this.isDescendant = fnAssignPropFromAlias(this.host, 'is-descendant') ?? this.isDescendant;
    this.isEditable = fnAssignPropFromAlias(this.host, 'is-editable') ?? this.isEditable;
    this.tagMessage = fnAssignPropFromAlias(this.host, 'tag-message') ?? this.tagMessage;
    this.tagVariant = fnAssignPropFromAlias(this.host, 'tag-variant') ?? this.tagVariant;
    this.searchTerm = fnAssignPropFromAlias(this.host, 'searchTerm') ?? this.searchTerm;
    this.selectedValue = fnAssignPropFromAlias(this.host, 'selected-value') ?? this.selectedValue;
    this.nodeWidth = fnAssignPropFromAlias(this.host, 'node-width') ?? this.nodeWidth;
    this.active = (this.value?.toString() === this.selectedValue?.toString());
    this.updateLevelClass();

    // Initialize textTerm with label so it displays on first render
    this.renderLabelWithHighlight(this.label, this.searchTerm);
  }

  componentDidLoad() {
    this.setTreetoCheckbox();
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.handleNewChildDocumentKeydown);
  }

  // --- Watchers ---
  @Watch('level')
  handleLevelChange() {
    this.updateLevelClass();
  }

  @Watch('searchTerm')
  @Watch('label')
  handleLabelOrSearchChange() {
    this.renderLabelWithHighlight(this.label, this.searchTerm);
  }

  @Watch('selectedValue')
  handleSelectedValueChange() {
    this.active = (this.value?.toString() === this.selectedValue?.toString());
  }

  @Watch('nodeWidth')
  handleNodeWidthChange() {
    this.renderLabelWithHighlight(this.label, this.searchTerm);
  }

  @Watch('checkable')
  handleCheckableChange() {
    this.setTreetoCheckbox();
  }

  // --- Public Methods ---
  @Method()
  async setOverflow() {
    let effectiveNodeWidth = this.nodeWidth;
    if (!effectiveNodeWidth) {
      const parentTree = this.host.closest('sy-tree') as any;
      if (parentTree && parentTree.nodeWidth) {
        effectiveNodeWidth = parentTree.nodeWidth;
      }
    }

    if (!effectiveNodeWidth) return;

    requestAnimationFrame(() => {
      this.renderLabelWithHighlight(this.label, this.searchTerm);

      const treeItem = this.host.querySelector('.tree-item');
      if (treeItem) {
        const actualWidth = treeItem.getBoundingClientRect().width;
        if (actualWidth >= effectiveNodeWidth) {
          this.overflow = true;
        } else {
          this.overflow = false;
        }
      }
    });
  }

  // --- Render ---
  render() {
    const isEditableActive = this.isEditable && !this.disabled && this.hovered;

    const treeItemListClasses = {
      'tree-item-list': true,
      'line': this.line,
      'dragging': this.dragging && !this.disabled,
      'drop-target': this.hasDropTarget && !this.isDescendant,
      'tree-item-selected': this.active,
      [`level-${this.level}`]: true,
      'isLeaf': !this.hasChild,
      'disabled': this.disabled,
      'fixed': this.fixed
    };

    const treeItemListStyle = {
      '--level': this.level.toString(),
      ...(this.nodeWidth ? { maxWidth: `${this.nodeWidth}px` } : {})
    };

    return (
      <div class="tree-item-wrapper">
        <div
          class={treeItemListClasses}
          style={treeItemListStyle}
          draggable={this.treeitemDraggable && !this.isEditing}
          onDragStart={this.handleDragStart.bind(this)}
          onDragEnd={this.handleDragEnd.bind(this)}
          onDragOver={this.handleDragOver.bind(this)}
          onDrop={this.handleDrop.bind(this)}
          onDragLeave={this.handleDragLeave.bind(this)}
          onClick={this.handleItemClick.bind(this)}
          onMouseEnter={this.handleMouseEnter.bind(this)}
          onMouseLeave={this.handleMouseLeave.bind(this)}
        >
        {this.expandable && this.hasChild ? (
          <span class="expand-icon" onClick={this.handleExpandClick.bind(this)}>
            {this.expanded ? (
              <sy-icon size="medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M480 224C492.9 224 504.6 231.8 509.6 243.8C514.6 255.8 511.8 269.5 502.7 278.7L342.7 438.7C330.2 451.2 309.9 451.2 297.4 438.7L137.4 278.7C128.2 269.5 125.5 255.8 130.5 243.8C135.5 231.8 147.1 224 160 224L480 224z" />
                </svg>
              </sy-icon>
            ) : (
              <sy-icon size="medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M224.5 160C224.5 147.1 232.3 135.4 244.3 130.4C256.3 125.4 270 128.2 279.1 137.4L439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C269.9 511.9 256.2 514.6 244.2 509.6C232.2 504.6 224.5 492.9 224.5 480L224.5 160z" />
                </svg>
              </sy-icon>
            )}
          </span>
        ) : null}

        {this.checkable ? (
          <div class="tree-check">
            <sy-checkbox
              readonly={this.fixed || this.disabled}
              checked={this.checked}
              indeterminate={this.indeterminate}
              onChanged={this.handleCheckChange.bind(this)}
            >
              {this.renderNode()}
            </sy-checkbox>
          </div>
        ) : this.renderNode()}

        <span class={{
          "tree-editable": true,
          "edit-on": isEditableActive
        }}>
          {isEditableActive && this.editable ? (
            <sy-button size="small" variant="borderless" onClick={this.startEditing.bind(this)}>
              <sy-icon size="small">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z" />
                </svg>
              </sy-icon>
              <sy-tooltip position="top" content="Edit" id="editTooltip"></sy-tooltip>
            </sy-button>
          ) : null}
          {isEditableActive && this.appendable ? (
            <sy-button size="small" variant="borderless" onClick={this.startAdding.bind(this)}>
              <sy-icon size="small">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M344 120C344 106.7 333.3 96 320 96C306.7 96 296 106.7 296 120L296 296L120 296C106.7 296 96 306.7 96 320C96 333.3 106.7 344 120 344L296 344L296 520C296 533.3 306.7 544 320 544C333.3 544 344 533.3 344 520L344 344L520 344C533.3 344 544 333.3 544 320C544 306.7 533.3 296 520 296L344 296L344 120z" />
                </svg>
              </sy-icon>
              <sy-tooltip position="top" content="Add" id="addTooltip"></sy-tooltip>
            </sy-button>
          ) : null}
          {isEditableActive && this.removable ? (
            <sy-button size="small" variant="borderless" onClick={this.removeItem.bind(this)}>
              <sy-icon size="small">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M96 320C96 306.7 106.7 296 120 296L520 296C533.3 296 544 306.7 544 320C544 333.3 533.3 344 520 344L120 344C106.7 344 96 333.3 96 320z" />
                </svg>
              </sy-icon>
              <sy-tooltip position="top" content="Remove" id="removeTooltip"></sy-tooltip>
            </sy-button>
          ) : null}
        </span>
        </div>
        {this.expanded && this.hasChild ? (
          <div class="children">
            {this.treeChildren}
            {this.renderAddingChild()}
          </div>
        ) : (
          <div class="children">
            {this.renderAddingChild()}
          </div>
        )}
      </div>
    );
  }

  private renderNode() {
    return (
      <div class="tree-item-group">
        {this.isEditing ? (
          [
            <sy-input
              class="editable-label"
              value={this.editingLabel}
              size="small"
              onChanged={this.handleEditChange.bind(this)}
              onKeyDown={this.handleEditKeydown.bind(this)}
              onClick={this.handleEditClick.bind(this)}
              onMouseDown={this.handleEditMousedown.bind(this)}
              autofocus
            ></sy-input>,
            <div class="add-item">
              <sy-button size="small" onClick={this.handleEditNode.bind(this)}>Save</sy-button>
              <sy-button size="small" onClick={this.handleCancelEditNode.bind(this)}>Cancel</sy-button>
            </div>
          ]
        ) : (
          <span
            class={{
              "tree-item": true,
              'overflow': this.overflow
            }}
            style={this.nodeWidth ? { maxWidth: `${this.nodeWidth}px` } : {}}
            onMouseEnter={this.handleTreeItemMouseEnter.bind(this)}
            onMouseLeave={this.handleTreeItemMouseLeave.bind(this)}
            onClick={this.handleItemClick.bind(this)}
          >
            <sy-tooltip position="top" content={this.label} trigger="none" open={this.tooltipOpen}></sy-tooltip>
            {this.icon?.length ? (
              <sy-icon size="medium" svgMarkup={this.icon}></sy-icon>
            ) : null}
            <span class="item-content" innerHTML={this.textTerm}></span>
            {this.tagMessage?.length ? (
              <sy-tag variant={this.tagVariant ?? 'gray'} disabled={this.disabled} rounded size="medium">
                {this.tagMessage}
              </sy-tag>
            ) : null}
          </span>
        )}
      </div>
    );
  }

  private renderAddingChild() {
    return this.isAdding ? (
      <div class="input-container">
        <sy-input
          size="small"
          value={this.newChildLabel}
          onKeyDown={this.handleNewChildKeydown.bind(this)}
          onChanged={this.handleNewChildInputChange.bind(this)}
          placeholder={this.appendPlaceholder}
          autofocus
        ></sy-input>
        <div class="add-item">
          <sy-button size="small" onClick={this.addNewChild.bind(this)}>Add</sy-button>
          <sy-button size="small" onClick={this.cancelAdding.bind(this)}>Cancel</sy-button>
        </div>
      </div>
    ) : null;
  }

  // --- Private Methods ---
  private setTreetoCheckbox() {
    if (this.checkable) {
      const checkbox = this.host.querySelector('sy-checkbox') as any;
      if (checkbox) {
        checkbox.isTree = true;
      }
    }
  }

  private updateLevelClass() {
    Array.from(this.host.classList)
      .filter(className => /^level-\d+$/.test(className))
      .forEach(className => this.host.classList.remove(className));
    this.host.classList.add(`level-${this.level}`);
  }

  private escapeHtml(value: string) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private renderLabelWithHighlight(label: string, searchTerm: string) {
    if (!searchTerm) {
      this.textTerm = this.escapeHtml(label).replace(/ /g, '&nbsp;');
      return;
    }

    const safeLabel = this.escapeHtml(label);
    const escapedSearchTerm = this.escapeHtml(searchTerm).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

    let result = '';
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(safeLabel)) !== null) {
      const beforeMatch = safeLabel.substring(lastIndex, match.index);
      const preservedSpace = beforeMatch.replace(/ /g, '&nbsp;');

      const matchedText = match[0].replace(/ /g, '&nbsp;');
      const highlightedText = `<mark class="highlight">${matchedText}</mark>`;

      result += preservedSpace + highlightedText;
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < safeLabel.length) {
      const remainingText = safeLabel.substring(lastIndex);
      const preservedSpace = remainingText.replace(/ /g, '&nbsp;');
      result += preservedSpace;
    }

    this.textTerm = result;
  }

  private extractHtmlAndText(htmlString: string) {
    const htmlParts: {
      tag: string;
      position: 'start' | 'end' | 'middle';
      textIndex: number;
      beforeText: string;
      afterText: string;
    }[] = [];

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    let pureText = '';
    let currentTextIndex = 0;

    const walkNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent || '';
        pureText += textContent;
        currentTextIndex += textContent.length;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tag = element.outerHTML;

        const beforeText = pureText;

        let afterText = '';
        let nextSibling = node.nextSibling;
        while (nextSibling) {
          if (nextSibling.nodeType === Node.TEXT_NODE) {
            afterText += nextSibling.textContent || '';
          }
          nextSibling = nextSibling.nextSibling;
        }

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

        return;
      }

      for (const child of Array.from(node.childNodes)) {
        walkNodes(child);
      }
    };

    for (const child of Array.from(tempDiv.childNodes)) {
      walkNodes(child);
    }

    return { htmlParts, pureText: pureText.trim() };
  }

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

    const startTags = htmlParts.filter(p => p.position === 'start');
    const endTags = htmlParts.filter(p => p.position === 'end');
    const middleTags = htmlParts.filter(p => p.position === 'middle');

    startTags.forEach(part => {
      result = part.tag + result;
    });

    endTags.forEach(part => {
      result = result + part.tag;
    });

    middleTags
      .sort((a, b) => b.textIndex - a.textIndex)
      .forEach(part => {
        let insertIndex = -1;

        if (part.beforeText && part.afterText) {
          const pattern = part.beforeText + part.afterText;
          const patternIndex = result.indexOf(pattern);
          if (patternIndex !== -1) {
            insertIndex = patternIndex + part.beforeText.length;
          }
        }

        if (insertIndex === -1 && part.beforeText) {
          const beforeIndex = result.lastIndexOf(part.beforeText);
          if (beforeIndex !== -1) {
            insertIndex = beforeIndex + part.beforeText.length;
          }
        }

        if (insertIndex === -1 && part.afterText) {
          const afterIndex = result.indexOf(part.afterText);
          if (afterIndex !== -1) {
            insertIndex = afterIndex;
          }
        }

        if (insertIndex === -1) {
          insertIndex = Math.min(part.textIndex, result.length);
        }

        result = result.slice(0, insertIndex) + part.tag + result.slice(insertIndex);
      });

    return result;
  }

  private startEditing(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const { htmlParts, pureText } = this.extractHtmlAndText(this.label);
    this.originalHtmlParts = htmlParts;
    this.editingLabel = pureText;

    this.isEditing = true;
    this.addingDocumentKeydownEvent();
    this.updatingEmit();
  }

  private handleEditMousedown(e: Event) {
    e.stopPropagation();
  }

  private handleEditChange(e: any) {
    e.stopPropagation();
    this.editingLabel = e.detail.value;
  }

  private handleEditClick(e: Event) {
    e.stopPropagation();
  }

  private handleEditInputLabel() {
    if (this.editingLabel && this.editingLabel.trim() !== '') {
      const reconstructedLabel = this.reconstructHtmlLabel(this.editingLabel, this.originalHtmlParts);
      this.label = reconstructedLabel;

      this.itemEdited.emit({ value: this.value, label: this.label });
    }
  }

  private handleEditKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      this.handleEditInputLabel();
      this.isEditing = false;
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      this.isEditing = false;
      this.editingLabel = this.label;
      this.originalHtmlParts = [];
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
    this.editingLabel = this.label;
    this.originalHtmlParts = [];
    this.updatingResetEmit();
  }

  private startAdding(e: Event) {
    e.stopPropagation();
    this.isAdding = true;
    this.newChildLabel = '';
    this.updatingEmit();
    this.addingDocumentKeydownEvent();
  }

  private handleNewChildDocumentKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();

      if (this.isAdding) {
        this.cancelAdding(e);
      } else if (this.isEditing) {
        this.cancelEditing();
      }
    }
  };

  private handleNewChildKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addNewChild(e);
    }
  }

  private handleNewChildInputChange(e: any) {
    this.newChildLabel = e.detail.value;
  }

  private addNewChild(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    if (this.newChildLabel.trim()) {
      this.isAdding = false;
      const childLabel = this.newChildLabel;
      const childValue = `${this.value?.toString()}-${Date.now()}`;
      const childLevel = this.level + 1;

      this.itemAdded.emit({ parentValue: this.value, childLabel, childValue, childLevel });
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
    this.editingLabel = this.label;
    this.originalHtmlParts = [];
    this.updatingResetEmit();
  }

  private addingDocumentKeydownEvent() {
    document.addEventListener("keydown", this.handleNewChildDocumentKeydown);
  }

  private removeDocumentKeydownEvent() {
    document.removeEventListener("keydown", this.handleNewChildDocumentKeydown);
  }

  private removeItem(e: Event) {
    e.stopPropagation();
    this.itemRemoved.emit({ value: this.value, label: this.label });
  }

  private handleItemClick(e: MouseEvent) {
    e.preventDefault();

    if (!this.clickable) {
      e.stopPropagation();
    } else {
      if (this.isAdding || this.isEditing) {
        return;
      }
      this.emitItemSelectedEvent();
    }

    if (this.expandable) {
      this.handleExpandClick(e);
    }
  }

  private handleMouseEnter(e: Event) {
    e.preventDefault();
    this.hovered = true;
  }

  private handleMouseLeave(e: Event) {
    e.preventDefault();
    this.hovered = false;
  }

  private emitItemSelectedEvent() {
    if (!this.disabled && !this.active && (this.clickable || this.isEditable)) {
      this.itemSelected.emit({ value: this.value, label: this.label, checked: this.checked ?? false });
    }
  }

  private handleExpandClick(e: Event) {
    e.stopPropagation();
    this.expanded = !this.expanded;
    this.expandChanged.emit({ value: this.value, label: this.label, expanded: this.expanded });
  }

  private handleCheckChange(e: any) {
    if (this.checkable && !this.fixed && !this.disabled && this.checked !== e.detail.checked) {
      this.checked = e.detail.checked;
      this.checkChanged.emit({ value: this.value, label: this.label, checked: this.checked });
    }
  }

  private handleDragStart(e: DragEvent) {
    if (this.disabled || !this.treeitemDraggable || this.isEditing || this.isAdding) {
      e.preventDefault();
      return;
    }
    const dragData = JSON.stringify({ value: this.value, subtree: this.getSubtree() });
    e.dataTransfer?.setData('application/json', dragData);
    e.dataTransfer!.effectAllowed = 'move';
    this.isDescendant = true;

    this.draggingEvent.emit(this.value);
    this.setDraggingState(true);
  }

  private handleDragEnd() {
    if (this.dragging) {
      this.setDraggingState(false);
    }
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();

    if (this.disabled || !this.dragging) {
      e.dataTransfer!.dropEffect = 'none';
      return;
    }

    e.dataTransfer!.dropEffect = 'move';
    this.hasDropTarget = true;
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();

    if (this.disabled || !this.dragging) {
      return;
    }

    this.hasDropTarget = false;

    const dragData = e.dataTransfer?.getData('application/json');
    if (dragData) {
      const { value: draggedKey } = JSON.parse(dragData);
      if (draggedKey && draggedKey?.toString() !== this.value?.toString()) {
        this.itemDrop.emit({ targetKey: this.value, draggedKey, dropPosition: 'on', targetLevel: this.level });
      }
    }
  }

  private handleDragLeave() {
    this.hasDropTarget = false;
  }

  private getSubtree() {
    const getNodeSubtree = (node: HTMLSyTreeItemElement): any => {
      const children = Array.from(node.querySelectorAll(':scope > sy-tree-item'));
      return {
        value: node.getAttribute('value'),
        children: children.map((child: any) => getNodeSubtree(child))
      };
    };
    return getNodeSubtree(this.host);
  }

  private setDraggingState(isDragging: boolean) {
    this.dragging = isDragging;
    const children = this.host.querySelectorAll('sy-tree-item');
    children?.forEach(child => {
      (child as any).dragging = isDragging;
    });
  }

  private updatingEmit() {
    this.itemUpdating.emit(this);
  }

  private updatingResetEmit() {
    this.itemUpdatingReset.emit(this);
  }

  private handleTreeItemMouseEnter(_e: Event) {
    if (this.overflow) {
      this.tooltipOpen = true;
    }
  }

  private handleTreeItemMouseLeave(_e: Event) {
    if (this.overflow) {
      this.tooltipOpen = false;
    }
  }
}
