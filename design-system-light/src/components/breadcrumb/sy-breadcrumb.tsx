// src/components/breadcrumb/sy-breadcrumb.tsx

import { Component, h, Prop, Element, Watch } from '@stencil/core';
import { fnGetChildrenByTagName } from '../../utils/utils';

@Component({
  tag: 'sy-breadcrumb',
  styleUrl: 'sy-breadcrumb.scss',
  shadow: false,
  scoped: true,
})
export class SyBreadcrumb {
  @Element() host!: HTMLSyBreadcrumbElement;

  @Prop() separator: 'slash' | 'arrow' = 'slash';

  private containerEl!: HTMLSpanElement;
  private mutationObserver!: MutationObserver;

  componentDidLoad() {
    this.updateChildren();
  }

  componentDidRender() {
    // MutationObserver가 아직 설정되지 않았고, containerEl이 Ref를 통해 할당되었다면
    if (!this.mutationObserver && this.containerEl) {
      this.mutationObserver = new MutationObserver(() => {
        // 자식 노드에 변화가 생기면 updateButtons를 다시 호출
        this.updateChildren();
      });
      // 감시 대상을 Ref로 직접 지정
      this.mutationObserver.observe(this.containerEl, { childList: true });
    }
    // 렌더링이 완료될 때마다 버튼 상태를 업데이트
    this.updateChildren();
  }



  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  @Watch('separator')
  handleSeparatorChange() {
    this.updateChildren();
  }

  private updateChildren = () => {
    const children = fnGetChildrenByTagName(this.containerEl, 'sy-breadcrumb-item') as HTMLSyBreadcrumbItemElement[];

    if (children.length > 0) {
      children.forEach((item, index) => {
        item.parentSeparator = this.separator;
        item.isLast = index === children.length - 1;
        if (typeof item.forceUpdate === 'function') {
          item.forceUpdate();
        }
      });
    }
  }

  render() {
    return (
      <nav class="breadcrumb">
        <span ref={(el) => this.containerEl = el as HTMLSpanElement}>
          <slot />
        </span>
      </nav>
    );
  }
}
