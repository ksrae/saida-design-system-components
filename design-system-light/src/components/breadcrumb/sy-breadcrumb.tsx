import { Component, h, Prop, Element, Watch } from '@stencil/core';
import { fnGetChildrenByTagName } from '../../utils/utils';

/**
 * sy-breadcrumb — navigational trail indicating current page's location in a hierarchy.
 *
 * Spec: design-system-specs/components/breadcrumb.yaml
 * Anatomy:
 *   <nav aria-label="Breadcrumb">
 *     └─ <span> (container ref for MutationObserver)
 *          └─ <slot> → sy-breadcrumb-item × N
 *
 * Behaviour:
 *   - Propagates the `separator` prop to every child item via `parentSeparator`.
 *   - Auto-marks the last child with `isLast=true` so it renders no trailing separator.
 *   - MutationObserver keeps child props in sync when items are added/removed dynamically.
 *
 * Not a form-associated element.
 */
@Component({
  tag: 'sy-breadcrumb',
  styleUrl: 'sy-breadcrumb.scss',
  shadow: false,
  scoped: true,
})
export class SyBreadcrumb {
  @Element() host!: HTMLSyBreadcrumbElement;

  // --- Public Properties (spec: props) ---
  @Prop({ reflect: true }) separator: 'slash' | 'arrow' = 'slash';

  // --- Private ---
  private containerEl!: HTMLSpanElement;
  private mutationObserver: MutationObserver | null = null;

  componentDidLoad() {
    this.updateChildren();
  }

  componentDidRender() {
    if (!this.mutationObserver && this.containerEl) {
      this.mutationObserver = new MutationObserver(() => this.updateChildren());
      this.mutationObserver.observe(this.containerEl, { childList: true });
    }
    this.updateChildren();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  @Watch('separator')
  handleSeparatorChange() {
    this.updateChildren();
  }

  private updateChildren = () => {
    const children = fnGetChildrenByTagName(
      this.containerEl,
      'sy-breadcrumb-item'
    ) as HTMLSyBreadcrumbItemElement[];

    if (children.length === 0) return;

    children.forEach((item, index) => {
      item.parentSeparator = this.separator;
      item.isLast = index === children.length - 1;
      if (typeof item.forceUpdate === 'function') {
        item.forceUpdate();
      }
    });
  };

  render() {
    return (
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <span ref={(el) => (this.containerEl = el as HTMLSpanElement)}>
          <slot />
        </span>
      </nav>
    );
  }
}
