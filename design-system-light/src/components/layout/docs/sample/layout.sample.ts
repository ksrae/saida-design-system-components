import { html } from "lit";
import '../layout.js';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface LayoutProps {
  slot: any;
  headerHeight: 'small' | 'medium' | 'large' | string;
  siderWidth: 'small' | 'medium' | 'large' | string;
  footerHeight: 'small' | 'medium' | 'large' | string;
}

export const BasicLayout = ({ slot }: LayoutProps) => {
  return html`

  <style>
    sy-header{
        background:#dfd0ec;
        }
    sy-content {
      min-height: 150px;
      background:#9e72c4;
    }
    sy-footer{
          background:#dfd0ec;
    }
    sy-sider{
      background:#c9afde;
    }
  </style>

  <sy-layout>
    ${unsafeHTML(slot)}
  </sy-layout>
  `;
};

export const ControlLayout = ({ headerHeight, siderWidth, footerHeight }: LayoutProps) => {
  return html`
  <sy-layout>
    <sy-header size="${headerHeight}">Header</sy-header>
        <sy-content>Content</sy-content>
        <sy-sider size="${siderWidth}">Sider</sy-sider>
    <sy-footer size=${footerHeight}>Footer</sy-footer>
  </sy-layout>
  `;
};