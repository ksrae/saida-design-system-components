import { Component, h, Prop, Element, Watch } from '@stencil/core';
import { fnGetChildrenByTagName } from '../../utils/utils';

/** State payload sent to each child `sy-button` so it can render the group-appropriate
 *  borders/radius (first/middle/last). Exported for the button component. */
export interface ButtonGroupState {
  buttonGroup: boolean;
  vertical: boolean;
  first: boolean;
  last: boolean;
}

/**
 * sy-button-group — visually unified set of related buttons.
 *
 * Spec: design-system-specs/components/button-group.yaml
 * Anatomy:
 *   .button-group[.button-group--vertical]
 *     └─ <slot> → sy-button × N
 *
 * Uses a MutationObserver to detect added/removed buttons and pushes their
 * first/middle/last position to each via `setButtonGroupState()`.
 * Not a form-associated element.
 */
@Component({
  tag: 'sy-button-group',
  styleUrl: 'sy-button-group.scss',
  shadow: false,
  scoped: true,
})
export class SyButtonGroup {
  @Element() host!: HTMLSyButtonGroupElement;

  // --- Public Properties (spec: props) ---
  @Prop({ reflect: true }) vertical: boolean = false;

  // --- Private ---
  private containerEl!: HTMLDivElement;
  private mutationObserver: MutationObserver | null = null;
  private buttons: HTMLElement[] = [];

  componentDidRender() {
    if (!this.mutationObserver && this.containerEl) {
      this.mutationObserver = new MutationObserver(() => this.updateButtons());
      this.mutationObserver.observe(this.containerEl, { childList: true });
    }
    this.updateButtons();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  @Watch('vertical')
  handleVerticalChange() {
    // Child list hasn't changed when orientation flips, so haveButtonsChanged would
    // return false. Bust the cache so updateButtons pushes new state to every child.
    this.buttons = [];
    this.updateButtons();
  }

  private updateButtons() {
    const children = fnGetChildrenByTagName(this.containerEl, 'sy-button') as HTMLElement[];
    if (!this.haveButtonsChanged(children)) return;

    this.buttons = children;
    if (this.buttons.length === 0) return;

    this.buttons.forEach((button, index) => {
      if (typeof (button as any).setButtonGroupState === 'function') {
        const state: ButtonGroupState = {
          buttonGroup: true,
          vertical: this.vertical,
          first: index === 0,
          last: index === this.buttons.length - 1,
        };
        (button as any).setButtonGroupState(state);
      }
    });
  }

  private haveButtonsChanged(newButtons: HTMLElement[]): boolean {
    if (this.buttons.length !== newButtons.length) return true;
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i] !== newButtons[i]) return true;
    }
    return false;
  }

  render() {
    return (
      <div
        class={{
          'button-group': true,
          'button-group--vertical': this.vertical,
        }}
        role="group"
        aria-orientation={this.vertical ? 'vertical' : 'horizontal'}
        ref={(el) => (this.containerEl = el as HTMLDivElement)}
      >
        <slot />
      </div>
    );
  }
}
