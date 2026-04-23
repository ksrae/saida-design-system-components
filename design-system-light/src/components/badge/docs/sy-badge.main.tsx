import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';
import './sy-badge.story.scss';

export interface SyBadgeProps extends Components.SyBadge {}

const HOUSE_ICON = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
    <path
      fill="currentColor"
      d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"
    />
  </svg>
`;

const defaultSlot = html`<sy-avatar image="avatar_default.png"></sy-avatar>`;

const renderBadge = (args: Partial<SyBadgeProps>, slot = defaultSlot) => html`
  <sy-badge
    ?dot=${!!args.dot}
    ?hidden=${!!args.hidden}
    ?standalone=${!!args.standalone}
    overflowCount=${ifDefined(args.overflowCount as any)}
    position=${ifDefined(args.position)}
    size=${ifDefined(args.size)}
    value=${ifDefined(args.value as any)}
    variant=${ifDefined(args.variant)}
  >${slot}</sy-badge>
`;

export const BadgeDot           = (args: { dot: boolean })           => renderBadge({ ...args, value: 5 });
export const BadgeHidden        = (args: { hidden: boolean })        => renderBadge({ ...args, value: 5 });
export const BadgeOverflowCount = (args: { overflowCount: number; value: number }) => renderBadge(args);
export const BadgePosition      = (args: { position: 'topLeft'|'topRight'|'bottomLeft'|'bottomRight' }) =>
  renderBadge({ ...args, value: 5 });
export const BadgeSize          = (args: { size: 'small'|'medium' }) => renderBadge({ ...args, value: 5 });
export const BadgeStandalone    = (args: { standalone: boolean })    => renderBadge({ ...args, value: 5 });
export const BadgeValue         = (args: { value: number })          => renderBadge(args);
export const BadgeVariant       = (args: { variant: 'red'|'yellow'|'green'|'blue'|'gray' }) =>
  renderBadge({ ...args, value: 5 });

export const Badge = (args: SyBadgeProps) => html`
  <div class="badgeContainer">
    ${renderBadge(args, html`<sy-avatar image="avatar_default.png"></sy-avatar>`)}
    ${renderBadge(args, html`<sy-avatar letter="JK"></sy-avatar>`)}
    ${renderBadge(args, html`<sy-icon size="xxxlarge">${HOUSE_ICON}</sy-icon>`)}
  </div>
`;
