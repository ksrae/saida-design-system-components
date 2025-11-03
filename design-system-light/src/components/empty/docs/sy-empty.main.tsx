import { html } from "lit";
import { Components } from '../../../components';

export interface SyEmptyProps extends Components.SyEmpty {}

export const Empty = ({description}: SyEmptyProps) => {
  return html`
	<sy-empty
    description=${description}>
  </sy-empty>
  `;
};

export const EmptyDesc = (args: {description: string}) => {
  return html`
  <sy-empty description="${args.description}"></sy-empty>
`
  ;
};

export const EmptyCustomDesc = () => {
  return html`
  <sy-empty></sy-empty>
  <div style="width:100%;text-align:center;color:#00000094;font-size:14px;">
    <div>This description is written <br/> at the bottom of the sy-empty</div>
  </div>`
  ;
};
