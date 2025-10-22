import { CSSResultGroup, LitElement, html, nothing, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from './styles/split-panel.scss?inline';

@customElement('sy-split-panel')
export class SplitPanelElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) hideDivider: boolean = false;
  @property({ type: Number }) minRatio: number = 0; // 최소 크기 속성 추가
  @property({ type: Number }) ratio: number = 50;
  @property({ type: String, reflect: true }) type: 'horizontal' | 'vertical' = 'horizontal';

  @state() private leftRatio = 50;
  @state() private rightRatio = 50;

  private isDragging = false;
  private initialX = 0;
  private initialY = 0;
  private startLeftWidth = 0;
  private startLeftHeight = 0;

  async firstUpdated() {
    await this.updateComplete;
    this.updateSlotElements();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if(changedProperties.has('ratio')) {
      this.updateRatio();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.stopDrag);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.stopDrag);
  }

  render() {
    const panelStyle = this.type === 'vertical'
      ? { height: `${this.leftRatio}%` }
      : { width: `${this.leftRatio}%` };

    const oppositePanelStyle = this.type === 'vertical'
      ? { height: `${this.rightRatio}%` }
      : { width: `${this.rightRatio}%` };

    return html`
      <div class="panel" style=${styleMap(panelStyle)}>
        <slot name="left"></slot>
      </div>
      <div class="${classMap({
          'divider': true,
          'disabled': this.disabled,
          'divider-hide': this.hideDivider
        })}"
       @mousedown=${this.startDrag}>
      </div>
      <div class="panel" style=${styleMap(oppositePanelStyle)}>
        <slot name="right"></slot>
      </div>
    `;
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
        this.leftRatio = Math.max(this.minRatio, Math.min(100 - this.minRatio, this.startLeftWidth + (movementY / this.offsetHeight) * 100));
      } else {
        const movementX = event.clientX - this.initialX;
        this.leftRatio = Math.max(this.minRatio, Math.min(100 - this.minRatio, this.startLeftWidth + (movementX / this.offsetWidth) * 100));
      }
      this.rightRatio = 100 - this.leftRatio;
      this.requestUpdate();
    }
  };

  private stopDrag = () => {
    if (!this.disabled && this.isDragging) {
      this.isDragging = false;

      // Emit the event only if the leftRate dimension (width or height) has changed
      if (this.type === 'horizontal' && this.leftRatio !== this.startLeftWidth) {
        this.dispatchEvent(
          new CustomEvent('horizontalChanged', {
            detail: {
              leftRatio: this.leftRatio,
              rightRatio: this.rightRatio
            },
            bubbles: true,
            composed: true,
            cancelable: false,
          })
        );
      } else if (this.type === 'vertical' && this.leftRatio !== this.startLeftHeight) {
        this.dispatchEvent(
          new CustomEvent('verticalChanged', {
            detail: {
              topRatio: this.leftRatio,
              bottomRatio: this.rightRatio
            },
            bubbles: true,
            composed: true,
            cancelable: false,
          })
        );
      }


    }
  };

  private updateRatio() {
    this.leftRatio = this.ratio;
    this.rightRatio = 100 - this.ratio;
  }

  private updateSlotElements() {
    const slotNames = ['left', 'right'];
    const slots = slotNames.map(name => this.shadowRoot!.querySelector(`slot[name='${name}']`)) as HTMLSlotElement[];

    slots.forEach(slot => {
      slot.assignedNodes().forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          (node as HTMLElement).style.height = `100%`;
        }
      });
    });
  }
}
