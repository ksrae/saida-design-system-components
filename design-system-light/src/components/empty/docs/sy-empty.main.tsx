import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SyEmptyProps extends Components.SyEmpty {}

export const Empty = ({ description }: SyEmptyProps) => html`
  <sy-empty description=${ifDefined(description)}></sy-empty>
`;

export const EmptyDesc = (args: { description: string }) => html`
  <sy-empty description=${ifDefined(args.description)}></sy-empty>
`;

export const EmptyCustomDesc = () => html`
  <sy-empty></sy-empty>
  <div style="width:100%;text-align:center;color:#00000094;font-size:14px;">
    <div>This description is written <br/> at the bottom of the sy-empty</div>
  </div>
`;
