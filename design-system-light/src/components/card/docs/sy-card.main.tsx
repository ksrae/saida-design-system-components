import { html } from 'lit';
import { Components } from '../../../components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface SyCardProps extends Components.SyCard {
  slot?: string;
  slotCover?: string;
  slotHeader?: string;
  slotFooter?: string;
}

const slotOrEmpty = (s?: string) => (s ? unsafeHTML(s) : '');

export const Card = ({ collapsible, backdrop, openDelay, closeDelay, slot, slotCover, slotHeader, slotFooter }: SyCardProps) => html`
  <sy-card
    ?collapsible=${!!collapsible}
    ?backdrop=${!!backdrop}
    .openDelay=${openDelay ?? 0}
    .closeDelay=${closeDelay ?? 0}
  >
    ${slotOrEmpty(slotCover)}
    ${slotOrEmpty(slotHeader)}
    ${slotOrEmpty(slot)}
    ${slotOrEmpty(slotFooter)}
  </sy-card>
`;

export const CardCollapsible = (args: { collapsible: boolean }) => html`
  <sy-card ?collapsible=${!!args.collapsible}>
    <div slot="header">Card header</div>
    <p>Card body content.</p>
  </sy-card>
`;

export const CardBackdrop = (args: { backdrop: boolean }) => html`
  <sy-card ?backdrop=${!!args.backdrop}>
    <div slot="header">Card header</div>
    <p>Card body content.</p>
  </sy-card>
`;
