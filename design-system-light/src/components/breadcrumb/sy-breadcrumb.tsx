// src/components/breadcrumb/sy-breadcrumb.tsx

import { Component, h, Prop, Element, Watch, JSX } from '@stencil/core';

@Component({
  tag: 'sy-breadcrumb',
  styleUrl: 'sy-breadcrumb.scss',
  shadow: false,
  scoped: false,
})
export class BreadcrumbElement {

  @Element() hostElement: HTMLElement;

  @Prop() separator: 'slash' | 'arrow' = 'slash';

  // === 수정된 핵심: @Event와 @Listen을 모두 삭제 ===
  // 부모는 더 이상 이벤트 중계 역할을 하지 않습니다.
  // 자식의 이벤트가 자연스럽게 버블링되도록 내버려 둡니다.

  private slotEl: HTMLSlotElement;

  componentDidLoad() {
    this.updateChildren();
    if (this.slotEl) {
      this.slotEl.addEventListener('slotchange', this.updateChildren);
    }
  }

  disconnectedCallback() {
    if (this.slotEl) {
      this.slotEl.removeEventListener('slotchange', this.updateChildren);
    }
  }

  @Watch('separator')
  handleSeparatorChange() {
    this.updateChildren();
  }

  private getBreadcrumbItems(): HTMLSyBreadcrumbItemElement[] {
    if (!this.slotEl) return [];
    return this.slotEl.assignedElements().filter(
      (el): el is HTMLSyBreadcrumbItemElement => el.tagName.toLowerCase() === 'sy-breadcrumb-item'
    );
  }

  private updateChildren = () => {
    const items = this.getBreadcrumbItems();
    if (items.length > 0) {
      items.forEach((item, index) => {
        item.parentSeparator = this.separator;
        item.isLast = index === items.length - 1;
        if (typeof item.forceUpdate === 'function') {
          item.forceUpdate();
        }
      });
    }
  }

  render(): JSX.Element {
    return (
      <nav class="breadcrumb">
        <slot ref={el => this.slotEl = el as HTMLSlotElement}></slot>
      </nav>
    );
  }
}

interface HTMLSyBreadcrumbItemElement extends HTMLElement {
  parentSeparator: 'slash' | 'arrow';
  isLast: boolean;
  forceUpdate: () => void;
}
