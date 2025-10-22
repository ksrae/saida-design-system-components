import { LitElement, html, css, CSSResultGroup, unsafeCSS} from "lit";
import { customElement, property } from 'lit/decorators.js';
import { NavSubElement } from './nav-sub.element';
import { NavItemElement } from './nav-item.element';
import globalCSS from "./styles/nav.scss?inline";

const SUBNAV = 'SY-NAV-SUB';
const GROUPNAV = 'SY-NAV-GROUP';
const NAVITEM = 'SY-NAV-ITEM';

@customElement('sy-nav')
export class NavElement extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  // @property({type: String }) trigger: 'click' | 'hover' = 'click';
  static styles: CSSResultGroup = css`
  ${unsafeCSS(globalCSS)};
  `;

  async firstUpdated() {
    await this.updateComplete;
    // this.sendTrigger();
    this.sendDisabled();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    // if (changedProperties.has('trigger')) {
    //   this.sendTrigger();
    // } 
    if(changedProperties.has('disabled')) {
      this.sendDisabled();
    }
  }

  // private sendTrigger() {
  //   const subNavList = Array.from(this.children);
  //   subNavList.forEach((subNav: Element) => {
  //     if (subNav.tagName === SUBNAV) {
  //       const subNavElement = subNav as NavSubElement;
  //       subNavElement.trigger = this.trigger;
  //     }
  //   });
  // }
  
  private sendDisabled() {
    this.querySelectorAll('sy-nav-sub, sy-nav-item').forEach(element => {
      if (element instanceof NavSubElement) {
        element.parentDisabled = this.disabled;
      } else if(element instanceof NavItemElement) {
        element.parentDisabled = this.disabled;
      }
    });
  }

  render() {
    return html`
      <ul>
        <slot @selected=${this.handleSelected}></slot>
      </ul>
    `;
  }

  private handleSelected(e: any) {
    this.findReleaseActiveToAllItem(this.children, e.detail);
  }

  private findReleaseActiveToAllItem(children: any, value: string) {
    Array.from(children).forEach((child: any) => {
      if (child.tagName === NAVITEM) {
        const navItem = child as NavItemElement;
        if(navItem.value !== value && navItem.active) {
          navItem.active = false;
        }
      } else if (child.tagName === SUBNAV) {
        const navSub = child as NavSubElement;
        if(navSub?.value && navSub?.value !== value && navSub.active) {
          navSub.active = false;
        }
        this.findReleaseActiveToAllItem(child.children, value);
      } else if(child.tagName === GROUPNAV) {
        this.findReleaseActiveToAllItem(child.children, value);
      }
    });
  }
}
