import { CSSResultGroup, LitElement, html, nothing, css, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import globalCSS from './styles/spinner.scss?inline';

@customElement('sy-spinner')
export class SpinnerElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Number }) delay = 0;
  @property({ type: String }) description: string  = '';
  @property({ type: Boolean, reflect: true }) hidden: boolean  = false;
/*   @property({ type: Boolean }) overlay: boolean = false; */
  @property({ type: Boolean, reflect: true }) inline: boolean = false;
  @property({ type: String }) size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
   

  @query('.spinner--wrapper') spinnerWrapper !: any;
  @query('.spinner') spinner !: any;
  @query('slot') slot !: any;
  @state() private hasContent = true;
  delayTime: any;

  async firstUpdated() {
    await this.updateComplete;

    this.spinnerDelay();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('delay')) {
      this.spinnerDelay();
    } 
  }

  render() {
    return html`
    <div class="${classMap({
      "spinner--wrapper": true,
      "spinner--hidden": this.hidden,
      "spinner--inline": this.inline,
      "spinner--small": this.size === 'small',
      "spinner--medium": this.size === 'medium',
      "spinner--large": this.size === 'large',
      "spinner--xlarge": this.size === 'xlarge',
    })}"

    >
       <div class="spinner">
        <svg viewBox="0 0 66 66">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
      </div>
      ${this.description ? 
      html`<span class="spinner--text">${this.description}</span>`
        : nothing
      } 
    </div>
    
    ${this.hasContent ? html `
    <slot @slotchange="${this.handleSlotChange}"></slot>`
    : nothing}
    `;
  }

  private handleSlotChange() {   
    const nodes = this.slot?.assignedNodes({flatten: true});
    const hasContent = nodes?.some((node: any) => node.nodeType === Node.TEXT_NODE ? node.textContent.trim() !== '' : true);
    this.hasContent = hasContent;
  }

  private spinnerDelay() {
    this.spinnerWrapper.style.display = 'none';
    clearTimeout(this.delayTime);

    this.delayTime = setTimeout(() => {
      this.spinnerWrapper.style.display = 'inline-flex';
    }, this.delay);
  }
}
  

