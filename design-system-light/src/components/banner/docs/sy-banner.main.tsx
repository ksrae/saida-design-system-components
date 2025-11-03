/* import { h } from '@stencil/core'; */
import { Components } from '../../../components';
import { html } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface SyBannerProps extends Components.SyBannerMesssage {
  slotFooter?: any;
}

export const Banner = ({closable, neutralIcon, showIcon, message, header, variant, slotFooter} : SyBannerProps) => {
  return html`<sy-banner-messsage
      closable=${closable}
      neutralIcon=${neutralIcon}
      showIcon=${showIcon}
      message=${message}
      header=${header}
      variant=${variant}
    >
      ${unsafeHTML(slotFooter)}
    </sy-banner-messsage>`;
};
