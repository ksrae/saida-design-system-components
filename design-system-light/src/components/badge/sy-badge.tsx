import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-badge — small visual indicator for status, counts, or labels.
 *
 * Spec: design-system-specs/components/badge.yaml
 * Anatomy:
 *   .container              ← wrapper (position: relative)
 *     ├─ .badge-content (slot) ← parent element (icon/button/avatar), hidden when standalone
 *     └─ .badge              ← the badge itself (dot or number)
 *
 * Not a form-associated element. No events / methods.
 */
@Component({
  tag: 'sy-badge',
  styleUrl: 'sy-badge.scss',
  shadow: false,
  scoped: true,
})
export class SyBadge {
  @Element() host!: HTMLSyBadgeElement;

  // --- Public Properties (spec: props) ---
  @Prop({ reflect: true }) dot: boolean = false;
  @Prop({ reflect: true }) hidden: boolean = false;
  @Prop({ reflect: true }) standalone: boolean = false;
  @Prop({ reflect: true, attribute: 'overflowCount', mutable: true }) overflowCount: number = Infinity;
  @Prop({ reflect: true }) value: number = 0;
  @Prop({ reflect: true }) position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topRight';
  @Prop({ reflect: true }) size: 'small' | 'medium' = 'medium';
  @Prop({ reflect: true }) variant: 'red' | 'yellow' | 'green' | 'blue' | 'gray' = 'red';

  @State() private displayValue: string = '';

  // --- Lifecycle ---
  componentWillLoad() {
    this.overflowCount =
      fnAssignPropFromAlias<number>(this.host, 'overflow-count') ?? this.overflowCount;
    this.computeDisplayValue();
  }

  @Watch('dot')
  @Watch('value')
  @Watch('overflowCount')
  handleValueChange() {
    this.computeDisplayValue();
  }

  // --- Helpers ---
  private computeDisplayValue() {
    if (this.dot) { this.displayValue = ''; return; }
    const numValue = Math.floor(Number(this.value) || 0);
    if (this.overflowCount !== Infinity && numValue > this.overflowCount) {
      this.displayValue = `${this.overflowCount}+`;
    } else {
      this.displayValue = `${numValue}`;
    }
  }

  // --- Render ---
  render() {
    const classNames: Record<string, boolean> = {
      badge: true,
      dot: this.dot,
      visible: !this.hidden,
      standalone: this.standalone,
      'badge-over': this.displayValue.length >= 2,
      [`badge-${this.variant}`]: true,
      [this.size]: true,
      [this.position]: !this.standalone,
    };

    const badgeClass = Object.keys(classNames).filter(k => classNames[k]).join(' ');

    // Screen-reader label: "3 unread" is more useful than just "3".
    // Dot badges announce the presence of an indicator via role="status".
    const ariaLabel = this.dot
      ? 'Indicator'
      : (this.hidden ? undefined : this.displayValue);

    return (
      <div class="container">
        <span class="badge-content"><slot></slot></span>
        <div
          class={badgeClass}
          role="status"
          aria-label={ariaLabel}
          aria-hidden={this.hidden ? 'true' : 'false'}
        >
          {this.displayValue}
        </div>
      </div>
    );
  }
}
