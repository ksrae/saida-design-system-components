import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SySpinnerProps extends Components.SySpinner {}

export const Spinner = ({ delay, description, hidden, inline, size }: SySpinnerProps) => html`
  <sy-spinner
    delay=${ifDefined(delay as any)}
    description=${ifDefined(description)}
    ?hidden=${!!hidden}
    ?inline=${!!inline}
    size=${ifDefined(size)}>
  </sy-spinner>
`;

export const SpinnerDelay       = (args: { delay: number })   => html`<sy-spinner delay=${ifDefined(args.delay as any)} description="Loading..."></sy-spinner>`;
export const SpinnerDescription = (args: { description: string }) => html`<sy-spinner description=${ifDefined(args.description)}></sy-spinner>`;
export const SpinnerHidden      = (args: { hidden: boolean }) => html`<sy-spinner ?hidden=${!!args.hidden} description="Hidden when true"></sy-spinner>`;
export const SpinnerInline      = (args: { inline: boolean }) => html`<sy-spinner ?inline=${!!args.inline} description="Inline"></sy-spinner>`;
export const SpinnerSize        = (args: { size: 'small' | 'medium' | 'large' | 'xlarge' }) => html`<sy-spinner size=${ifDefined(args.size)} description="Size"></sy-spinner>`;
