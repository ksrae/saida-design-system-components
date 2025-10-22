import { LitElement, CSSResultGroup, css, unsafeCSS, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { MenuElement } from "../menu/menu.element";
import { classMap } from "lit/directives/class-map.js";
import globalCSS from "./styles/dropdown.scss?inline";
import { MenuItemElement } from "../menu/menu-item.element";
import "../icon/icon.element";

@customElement("sy-dropdown")
export class DropdownElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;

  @property({ type: Boolean, reflect: true }) borderless: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: String }) position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" = "bottomLeft";
  // @property({ type: String }) position: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight" = "bottomLeft";
  @property({ type: String }) size: "small" | "medium" | "large" = "medium";
  @property({ type: String }) trigger: "hover" | "click" = "click";
  // @property({ type: String }) variant: 'arrow' | 'hidden' = 'arrow';

  // @state() private isOpen: boolean = false; // this is for arrow. don't need to use by user.
  @query('[slot="title"]') private titleSlotElement: any;
  @query("slot:not([name])") private slotElement: any;
  private menu!: MenuElement;
  // 핸들러를 클래스 필드로 고정해서 같은 참조 사용
  private selectedEventHandler = (e: Event) => this.selectedEvent(e);
  private selectedMenuItem!: MenuItemElement;

  async firstUpdated() {
    await this.updateComplete;

    // this.selectedEventHandler = this.selectedEvent.bind(this);
    this.setMenu();
    
    this.addEvent();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("trigger")) {
      this.addEvent();
    } else if(changedProperties.has('position')) {
      this.menu.setAttribute('position', this.position);
    } else if(changedProperties.has('disabled')) {
      this.menu.disabled = this.disabled;      
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
  }
  
  disconnectedCallback(): void {
    super.disconnectedCallback();
    // modeless DOM 이동 등으로 인한 일시적 disconnect에서는 제거하지 않음
    // setMenu에서 처리하고 여기서는 하지 않음
  }

  render() {
    return html`
      <div
        class="${classMap({
          "dropdown--container": true,
          borderless: this.borderless,
          "dropdown--small": this.size === "small",
          "dropdown--medium": this.size === "medium",
          "dropdown--large": this.size === "large",
        })}"
        tabindex="0"
      >
        <slot
          class="${classMap({
            "dropdown--header": true,
          })}"
          name="title"
        >
        </slot>
        <sy-icon size="${this.size}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"/></svg></sy-icon> 
        <slot></slot>
      </div>
    `;
  }

private setMenu() {
  console.log('setMenu')
  const newMenu = this.slotElement.assignedElements().find((el: any) => el.tagName.toLowerCase() === 'sy-menu');
  
  // 메뉴가 실제로 바뀐 경우에만 기존 리스너 제거
  if (this.menu && this.menu !== newMenu) {
    this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
  }

  this.menu = newMenu;
  if(this.menu) {
    this.menu.setAttribute('position', this.position);
    // 중복 등록 방지: 기존에 등록된 게 없을 때만 등록
    this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
    this.menu.addEventListener('itemSelected', this.selectedEventHandler);
  }
}

  private addEvent() {
    this.menu?.setAttribute("trigger", this.trigger);
    // this.menu?.addEventListener('open', (e: any) => {      
    //   (e.target as MenuElement)?.setSelectableAllItems();
    // });
  }


  private selectedEvent(e: any) {
    e.stopPropagation();

    this.menu?.clearSelectedItem();
    const selectedMenuItem = e.target as MenuItemElement;
    if(selectedMenuItem) {
      selectedMenuItem.select = true;
    }
    
    this.dispatchEvent(
      new CustomEvent("selected", {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }
}
