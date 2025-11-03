import { Components } from '../../../components';
import { html } from 'lit';

export interface SyDividerProps extends Components.SyDivider {}

export const Divider = ({type}: SyDividerProps) => {
  return html`
  <div style="width:400px; height:100px">
    <sy-divider
      type=${type}>
    </sy-divider>
  </div>
  `;
};

export const DividerType = (args: { type: 'horizontal' | 'vertical' }) => {
  return html`
    <div style="
      width: ${args.type === 'horizontal' ? '300px' : '50px'};
      height: ${args.type === 'horizontal' ? '50px' : '200px'};
    ">
      <sy-divider type="${args.type}"></sy-divider>
    </div>
  `;
};
