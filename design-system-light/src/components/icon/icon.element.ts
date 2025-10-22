import { LitElement, CSSResultGroup, css, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import globalCSS from './styles/icon.scss?inline';
import { classMap } from 'lit/directives/class-map.js';


@customElement('sy-icon')
export class IconElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: String }) size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'  | 'xxlarge' | 'xxxlarge' = 'medium';

  @property({ type: String }) path?: string; // 외부 svg 파일 경로
  @property({ type: Boolean }) selectable: boolean = false;

  private svgContent: string = '';
  private hasSlotContent: boolean = false;

  async firstUpdated() {
    await this.updateComplete;
    this.addEventListener('slotchange', this.handleSlotChange);
    this.handleSlotChange(); // 초기 슬롯 콘텐츠 확인
    if (!this.hasSlotContent) {
      if (this.path) {
        await this.loadExternalSvg(this.path);
      }
    }
  }

  async updated(changedProps: Map<string, any>) {
    // slot이 있으면 아무것도 하지 않음
    if (this.hasSlotContent) {
      // 슬롯이 생겼을 경우, 기존 svgContent를 지워야 할 수 있습니다.
      if (this.svgContent) {
        this.svgContent = '';
      }
      return;
    }
    
    // path가 있으면 path만
    if (changedProps.has('path') && this.path) {
      await this.loadExternalSvg(this.path);
    }
  }

  render() {
    return html`
      <span class="${classMap({
        'icon': true,
        'xxsmall': this.size === 'xxsmall',        
        'xsmall': this.size === 'xsmall',
        'small': this.size === 'small',
        'medium': this.size === 'medium',
        'large': this.size === 'large',
        'xlarge': this.size === 'xlarge',
        'xxlarge': this.size === 'xxlarge',
        'xxxlarge': this.size === 'xxxlarge',
        'selectable': this.selectable,
      })}" @click=${this.handleClick}>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${!this.hasSlotContent && this.svgContent
          ? html`<span class="svg-container" .innerHTML=${this.svgContent}></span>`
          : ''}
      </span>
    `;
  }

  private handleSlotChange = () => {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const assignedNodes = (slot as HTMLSlotElement).assignedNodes({flatten: true});
      const newHasSlotContent = assignedNodes.length > 0 && assignedNodes.some(node => {
        if (node.nodeType === Node.ELEMENT_NODE) return true;
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) return true;
        return false;
      });
      
      // 상태가 변경되었을 때만 업데이트 요청
      if (this.hasSlotContent !== newHasSlotContent) {
        this.hasSlotContent = newHasSlotContent;
        this.requestUpdate();
      }
    }
  }

  private async loadExternalSvg(path: string) {
    if (this.hasSlotContent) return;
    try {
      const res = await fetch(path);
      if (res.ok) {
        this.svgContent = await res.text();
      } else {
        this.svgContent = '';
        console.warn(`[sy-icon] Could not load external SVG from: ${path}`);
      }
    } catch (e) {
      this.svgContent = '';
      console.error(`[sy-icon] Error fetching external SVG from: ${path}`, e);
    }
    this.requestUpdate();
  }

  private handleClick(e: Event) {
    if (this.selectable) {
      const slotContent = this.getSlotContentAsString();
      // path가 있으면 path를, 없으면 slotContent를 값으로 사용합니다.
      const value = this.path || slotContent;

      // 값이 있을 경우에만 이벤트를 발생시킵니다.
      if (value) {
        this.dispatchEvent(new CustomEvent('selected', {
          detail: { value },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  private getSlotContentAsString(): string {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return '';

    // flatten: true 옵션으로 중첩된 슬롯의 노드까지 모두 가져옵니다.
    const nodes = slot.assignedNodes({ flatten: true });

    return nodes.map(node => {
      // 요소 노드(Element)인 경우, outerHTML을 사용해 태그 전체를 가져옵니다.
      if (node.nodeType === Node.ELEMENT_NODE) {
        return (node as HTMLElement).outerHTML;
      }
      // 텍스트 노드인 경우, textContent를 사용합니다.
      return node.textContent || '';
    }).join('').trim();
  }
}