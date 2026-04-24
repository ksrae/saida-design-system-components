import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Components } from '../../../components';

// Stencil generates `SyBannerMessage` from the fixed tag `sy-banner-message`.
export interface SyBannerProps extends Components.SyBannerMessage {
  slotFooter?: string;
}

const defaultMsg = 'Banners are used for global alerts (e.g., system outages, updates).';
const defaultHeader = 'Banner Header';

const renderBanner = (args: Partial<SyBannerProps>, slotFooter?: string) => html`
  <sy-banner-message
    ?closable=${!!args.closable}
    .showIcon=${!!args.showIcon}
    .neutralIcon=${args.neutralIcon ?? ''}
    header=${ifDefined(args.header)}
    message=${ifDefined(args.message)}
    variant=${ifDefined(args.variant)}
  >
    ${slotFooter ? unsafeHTML(slotFooter) : ''}
  </sy-banner-message>
`;

export const BannerClosable    = (args: { closable: boolean })   => renderBanner({ ...args, header: defaultHeader, message: defaultMsg, variant: 'info' });
export const BannerShowIcon    = (args: { showIcon: boolean })   => renderBanner({ ...args, header: defaultHeader, message: defaultMsg, variant: 'info' });
export const BannerNeutralIcon = (args: { neutralIcon: string }) => renderBanner({ ...args, showIcon: true, header: defaultHeader, message: defaultMsg, variant: 'neutral' });
export const BannerMessage     = (args: { message: string })     => renderBanner({ ...args, header: defaultHeader, variant: 'info' });
export const BannerHeader      = (args: { header: string })      => renderBanner({ ...args, message: defaultMsg, variant: 'info' });
export const BannerVariant     = (args: { variant: 'info'|'success'|'warning'|'error'|'neutral' }) =>
  renderBanner({ ...args, showIcon: true, header: defaultHeader, message: defaultMsg });

export const Banner = (args: SyBannerProps) => renderBanner(args, args.slotFooter);
