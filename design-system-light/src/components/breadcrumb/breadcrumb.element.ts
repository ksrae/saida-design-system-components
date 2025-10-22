import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('sy-breadcrumb')
export class BreadcrumbElement extends LitElement {
  @property({ type: String }) separator: 'slash' | 'arrow'  = 'slash';
  @query('slot') itemGroup!: HTMLSlotElement;
  
  private breadcrumbList: any[] = [];

  async firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
    await this.updateComplete;
    this.itemGroup.assignedNodes()?.forEach((element: any) => {
      if(element.tagName && element.tagName.toLowerCase() === 'sy-breadcrumb-item') {
        this.breadcrumbList.push(element);
      }
    })
    this.updateSeparator();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('separator')) {
      this.updateSeparator();
    }
  }

  render() {
    return html`
      <nav class="breadcrumb">
        <slot @selected=${this.handleClick}></slot> 
      </nav>
    `;
  }

  private updateSeparator() {
    if(this.breadcrumbList.length) {
      this.breadcrumbList.forEach((item: any, index: number) => {
        item.parentSeparator = this.separator;
        item.isLast = (this.breadcrumbList.length - 1) === index ? true : false;
      });
    }
  }

  private handleClick(e:any) {
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('selected', {
      detail: e,
      bubbles: true,
      composed: true
    }));
  }
}
