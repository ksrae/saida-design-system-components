import { Components } from '../../../components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface SyDividerProps extends Components.SyDivider {}

export const Divider = ({ type }: SyDividerProps) => html`
  <div style="width:400px; height:100px">
    <sy-divider type=${ifDefined(type)}></sy-divider>
  </div>
`;

export const DividerType = (args: { type: 'horizontal' | 'vertical' }) => html`
  <div style="
    width: ${args.type === 'horizontal' ? '300px' : '50px'};
    height: ${args.type === 'horizontal' ? '50px' : '200px'};
  ">
    <sy-divider type=${ifDefined(args.type)}></sy-divider>
  </div>
`;
