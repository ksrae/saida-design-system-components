import { Component, Prop, State, Element, Event, EventEmitter, Watch, h } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-split-panel — two-pane container with a drag handle to resize the split.
 *
 * Spec: design-system-specs/components/split-panel.yaml
 *
 * Props (spec-aligned + legacy aliases):
 *   - ratio (left/top pane share, 0-100)
 *   - minRatio ↔ `min-ratio` (floor for both panes)
 *   - type (horizontal | vertical)
 *   - disabled, hideDivider ↔ `hide-divider`
 *
 * Events: horizontalChanged / verticalChanged (emitted while the divider moves).
 */
@Component({
  tag: 'sy-split-panel',
  styleUrl: 'sy-split-panel.scss',
  shadow: false,
  scoped: true,
})
export class SySplitPanel {
  @Element() host: HTMLSySplitPanelElement;

  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true, attribute: 'hideDivider', mutable: true }) hideDivider: boolean = false;
  @Prop({ reflect: true, attribute: 'minRatio', mutable: true }) minRatio: number = 0; // Ensure default value
  @Prop({ reflect: true }) ratio: number = 50;
  @Prop({ reflect: true }) type: 'horizontal' | 'vertical' = 'horizontal';

  @State() private leftRatio = 50;
  @State() private rightRatio = 50;

  @Event() horizontalChanged: EventEmitter<{
    leftRatio: number;
    rightRatio: number;
  }>;

  @Event() verticalChanged: EventEmitter<{
    topRatio: number;
    bottomRatio: number;
  }>;

  private isDragging = false;
  private initialX = 0;
  private initialY = 0;
  private startLeftWidth = 0;
  private startLeftHeight = 0;

  @Watch('ratio')
  watchRatio() {
    this.updateRatio();
  }

  componentDidLoad() {
    this.updateSlotElements();
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.stopDrag);
  }

  disconnectedCallback() {
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.stopDrag);
  }

  componentWillLoad() {
    this.hideDivider = fnAssignPropFromAlias(this.host, 'hide-divider') ?? this.hideDivider;
    this.minRatio = fnAssignPropFromAlias(this.host, 'min-ratio') ?? this.minRatio;

    // Validate minRatio to ensure it is not null or undefined
    if (this.minRatio == null) {
      this.minRatio = 0;
    }
    this.updateRatio();
  }

  render() {
    const panelStyle = this.type === 'vertical'
      ? { height: `${this.leftRatio}%` }
      : { width: `${this.leftRatio}%` };

    const oppositePanelStyle = this.type === 'vertical'
      ? { height: `${this.rightRatio}%` }
      : { width: `${this.rightRatio}%` };

    const dividerClasses = {
      'divider': true,
      'disabled': this.disabled,
      'divider-hide': this.hideDivider
    };

    return [
      <div class="panel" style={panelStyle}>
        <slot name="left"></slot>
      </div>,
      <div class={dividerClasses} onMouseDown={this.startDrag}>
      </div>,
      <div class="panel" style={oppositePanelStyle}>
        <slot name="right"></slot>
      </div> 
    ];
  }

  private startDrag = (event: MouseEvent) => {
    if(this.disabled) return;

    this.isDragging = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;
    this.startLeftWidth = this.leftRatio;
    this.startLeftHeight = this.leftRatio;
    event.preventDefault();
  };

  private drag = (event: MouseEvent) => {
    if (!this.disabled && this.isDragging) {
      if (this.type === 'vertical') {
        const movementY = event.clientY - this.initialY;
        this.leftRatio = Math.max(this.minRatio, Math.min(100 - this.minRatio, this.startLeftWidth + (movementY / this.host.offsetHeight) * 100));
      } else {
        const movementX = event.clientX - this.initialX;
        this.leftRatio = Math.max(this.minRatio, Math.min(100 - this.minRatio, this.startLeftWidth + (movementX / this.host.offsetWidth) * 100));
      }
      this.rightRatio = 100 - this.leftRatio;
    }
  };

  private stopDrag = () => {
    if (!this.disabled && this.isDragging) {
      this.isDragging = false;

      // Emit the event only if the leftRate dimension (width or height) has changed
      if (this.type === 'horizontal' && this.leftRatio !== this.startLeftWidth) {
        this.horizontalChanged.emit({
          leftRatio: this.leftRatio,
          rightRatio: this.rightRatio
        });
      } else if (this.type === 'vertical' && this.leftRatio !== this.startLeftHeight) {
        this.verticalChanged.emit({
          topRatio: this.leftRatio,
          bottomRatio: this.rightRatio
        });
      }
    }
  };

  private updateRatio() {
    this.leftRatio = this.ratio;
    this.rightRatio = 100 - this.ratio;
  }

  private updateSlotElements() {
    const slotNames = ['left', 'right'];
    const slots = slotNames.map(name => this.host.querySelector(`slot[name='${name}']`)) as HTMLSlotElement[];

    slots.forEach(slot => {
      if (slot) {
        const assignedElements = slot.assignedElements();
        assignedElements.forEach(element => {
          (element as HTMLElement).style.height = `100%`;
        });
      }
    });
  }
}
