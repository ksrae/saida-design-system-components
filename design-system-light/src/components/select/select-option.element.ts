import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from './styles/select-option.scss?inline';
import '../empty/empty.element';
import '../spinner/spinner.element';
import '../tooltip/tooltip.element';

@customElement('sy-option')
export class OptionElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`
  
  @property({ type: Boolean }) disabled = false; // 비활성화 상태
  @property({ type: String, reflect: true }) label = ''; // 옵션의 라벨
  @property({ type: Boolean }) readonly = false; // 읽기 전용 상태
  @property({ type: String, reflect: true }) value = ''; // 옵션의 값
  @property({ type: Boolean }) showTooltip = false; // 툴팁

  @state() hide = false; // 숨김 상태
  @state() selected = false; // 선택된 상태
  @state() empty = false; // 빈 상태
  @state() loading = false; // 로딩 상태
  @state() isCustomTag: boolean = false;
  @state() active = false; // 활성화 상태
  @state() private hasSlotContents = false; // slot에 내용이 있는지 여부

  // 렌더링 메서드
  render() {
    return html`
      ${!this.hide ? html`
        <div class="${classMap({
          'select-item': true,
          'option-active': this.active,
          'option-selected': this.selected && !this.disabled
        })}" 
        ?disabled=${this.disabled} 
        ?readonly=${this.readonly}
        @click=${this.handleOptionClick}>
          ${
            !this.empty && !this.loading && !this.hasSlotContents ? html`
              ${this.showTooltip ? html`<sy-tooltip maxWidth=${this.clientWidth} content=${this.label}></sy-tooltip>` : nothing}
              <span>${this.label}</span>
            ` : 
            this.empty ? html`<sy-empty></sy-empty>` : 
            this.loading ? html`<sy-spinner></sy-spinner>` : nothing
          }
          <slot></slot>
        </div>
      ` : nothing}
    `;
  }

  // `slot`에 컨텐츠가 있는지 확인하는 메서드
  private checkSlotContents() {
    const slot = this.renderRoot.querySelector('slot') as HTMLSlotElement;
    const assignedNodes = slot?.assignedNodes() || [];
    this.hasSlotContents = assignedNodes.some(node => node.nodeType === Node.ELEMENT_NODE);
  }

  // 초기 렌더링 후 `slot`의 컨텐츠 확인
  async firstUpdated() {
    await this.updateComplete;
    this.checkSlotContents();
  }

  // 업데이트 시마다 `slot`의 컨텐츠 확인
  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("label") || changedProperties.has("value")) {
      if (!this.label) {
        const slot = this.renderRoot.querySelector('slot') as HTMLSlotElement;
        const assignedNodes = slot?.assignedNodes() || [];
        // slot 내 텍스트 노드 확인
        const textFromSlot = assignedNodes
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.nodeValue?.trim())
          .join('');
        this.label = textFromSlot?.length ? textFromSlot : this.value;
      }
    }
    this.checkSlotContents();
  }

  // 옵션 클릭 이벤트 핸들러
  private handleOptionClick() {
    if (this.disabled || this.readonly || this.empty || this.loading) return;

    this.dispatchEvent(
      new CustomEvent('selected', { 
        detail: { value: this.value, label: this.label },
        bubbles: true,
        composed: true,
      })
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }
  
}
