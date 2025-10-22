import {LitElement,CSSResultGroup,css,unsafeCSS,html} from "lit";
import { customElement, state } from 'lit/decorators.js';
import globalCSS from "./styles/layout.scss?inline";

@customElement('sy-layout')
export class LayoutElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;

  @state() private hasHeader = false;
  @state() private hasFooter = false;
  @state() private hasSider = false;
  @state() private siderPosition: 'left' | 'right' = 'right';

  async firstUpdated() {
    await this.updateComplete;
    this.updateSlots();
  }

  private updateSlots() {
    const children = Array.from(this.children);
    children.forEach(child => {
      const tag = child.tagName.toLowerCase();
      if (tag === 'sy-header') {
        child.slot = 'header';
        this.hasHeader = true;
      } else if (tag === 'sy-footer') {
        child.slot = 'footer';
        this.hasFooter = true;
      } else if (tag === 'sy-sider') {
        child.slot = 'sider';
        this.hasSider = true;
      } else if (tag === 'sy-content' || tag === 'sy-layout') {
        child.slot = 'content';
      } else {
        child.slot = 'content';
      }
    });

    if (this.hasSider) {
      const mainElements = Array.from(this.children).filter(child => {
        const tag = child.tagName.toLowerCase();
        return tag === 'sy-sider' || tag === 'sy-content' || tag === 'sy-layout';
      });
      if (mainElements.length >= 2) {
        const firstMain = mainElements[0];
        this.siderPosition = firstMain.tagName.toLowerCase() === 'sy-sider' ? 'left' : 'right';
      }
    }
  }

  render() {
    return html`
      <div class="layout">
        ${this.hasHeader
          ? html`<div class="header"><slot name="header"></slot></div>`
          : ''}
        <div class="main ${this.hasSider ? 'horizontal' : 'vertical'}">
          ${this.hasSider
            ? this.siderPosition === 'right'
              ? html`
                  <div class="content">
                    <slot name="content"></slot>
                  </div>
                  <div class="sider">
                    <slot name="sider"></slot>
                  </div>
                `
              : html`
                  <div class="sider">
                    <slot name="sider"></slot>
                  </div>
                  <div class="content">
                    <slot name="content"></slot>
                  </div>
                `
            : html`
                <div class="content">
                  <slot name="content"></slot>
                </div>
              `}
        </div>
        ${this.hasFooter
          ? html`<div class="footer"><slot name="footer"></slot></div>`
          : ''}
      </div>
    `;
  }
}