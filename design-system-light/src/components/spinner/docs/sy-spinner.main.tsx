import { html, ifDefined } from '../../../utils/story-template';
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
// Wraps the spinner in a div that has its own text content so the inline
// behaviour is observable. The component always positions the spinner as an
// absolute overlay filling the parent; `inline` only controls whether the
// translucent mask is drawn. With inline=true the mask covers the text below;
// with inline=false the overlay is transparent and the text remains visible.
export const SpinnerInline      = (args: { inline: boolean }) => html`
  <div .style=${{ height: '140px', padding: '16px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px' }}>
    <p .style=${{ margin: '0 0 8px 0' }}>Container content — toggle the <code>inline</code> control.</p>
    <p .style=${{ margin: '0' }}>When <strong>inline=true</strong> a translucent mask covers this text. When <strong>inline=false</strong> the overlay is transparent so the text remains readable behind the spinner.</p>
    <sy-spinner ?inline=${!!args.inline} description="Loading..."></sy-spinner>
  </div>
`;
export const SpinnerSize        = (args: { size: 'small' | 'medium' | 'large' | 'xlarge' }) => html`<sy-spinner size=${ifDefined(args.size)} description="Size"></sy-spinner>`;
