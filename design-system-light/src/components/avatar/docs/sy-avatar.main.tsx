import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SyAvatarProps extends Components.SyAvatar {
  selected?: (event: CustomEvent<any>) => void;
  disableStatus?: (event: CustomEvent<any>) => void;
}
export interface SyAvatarGroupProps extends Components.SyAvatarGroup {
  slot?: string;
}

const HOUSE_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>';

/* -------------------- Single Avatar -------------------- */

const renderAvatar = (args: Partial<SyAvatarProps>) => html`
  <sy-avatar-group>
    <sy-avatar
      ?clickable=${!!args.clickable}
      ?disabled=${!!args.disabled}
      icon=${ifDefined(args.icon)}
      image=${ifDefined(args.image)}
      letter=${ifDefined(args.letter)}
      size=${ifDefined(args.size)}
      text=${ifDefined(args.text)}
      tooltipContent=${ifDefined(args.tooltipContent)}
      variant=${ifDefined(args.variant)}
    ></sy-avatar>
  </sy-avatar-group>
`;

export const Avatar = (args: SyAvatarProps) => renderAvatar(args);

/* -------------------- Avatar Group -------------------- */

export const AvatarGroup = (args: SyAvatarGroupProps) => html`
  <sy-avatar-group
    ?clickable=${!!args.clickable}
    maxCount=${ifDefined(args.maxCount as any)}
    size=${ifDefined(args.size)}
    variant=${ifDefined(args.variant)}
  >
    <sy-avatar variant="red" letter="JD" size="medium"></sy-avatar>
    <sy-avatar variant="purple" letter="JK" size="medium"></sy-avatar>
    <sy-avatar text="Juwon Kim" size="medium"></sy-avatar>
    <sy-avatar variant="green" text="The Q" size="medium"></sy-avatar>
  </sy-avatar-group>
`;

export const AvatarGroupClickable = (args: { clickable: boolean }) => {
  const handle = (e: Event) => {
    const out = document.getElementById('clicked-avatar-group');
    if (!out) return;
    const detail = (e as CustomEvent).detail ?? {};
    out.innerHTML =
      '<b>Selected avatar information</b><br/>' +
      '- letter:' + detail.letter + '<br/>' +
      '- text  :' + detail.text + '<br/>' +
      '- icon  :' + (detail.icon ? '[svg]' : detail.icon) + '<br/>' +
      '- image :' + detail.image + '<br/>' +
      (detail.index !== undefined ? '- index :' + detail.index : '');
  };

  return html`
    <div>
      <sy-avatar-group ?clickable=${!!args.clickable} maxCount="2" @selected=${handle}>
        <sy-avatar image="avatar_default.png"></sy-avatar>
        <sy-avatar icon=${HOUSE_ICON}></sy-avatar>
        <sy-avatar text="star" color="red"></sy-avatar>
        <sy-avatar letter="AB" color="purple"></sy-avatar>
      </sy-avatar-group>
      <p id="clicked-avatar-group" style="margin-top:10px; display:${args.clickable ? 'block' : 'none'};"></p>
    </div>
  `;
};

export const AvatarGroupMaxCount = (args: { maxCount: number }) => html`
  <sy-avatar-group maxCount=${ifDefined(args.maxCount as any)}>
    ${[1, 2, 3, 4, 5].map(() => html`<sy-avatar icon=${HOUSE_ICON}></sy-avatar>`)}
  </sy-avatar-group>
`;

export const AvatarGroupSize = (args: { size: 'small' | 'medium' | 'large' }) => html`
  <sy-avatar-group size=${ifDefined(args.size)}>
    <sy-avatar icon=${HOUSE_ICON}></sy-avatar>
    <sy-avatar icon=${HOUSE_ICON}></sy-avatar>
  </sy-avatar-group>
`;

export const AvatarGroupVariant = (args: { variant: 'stack' | 'grid' }) => html`
  <sy-avatar-group variant=${ifDefined(args.variant)} maxCount="5">
    ${Array.from({ length: 10 }).map(
      () => html`<sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>`,
    )}
  </sy-avatar-group>
`;

/* -------------------- Avatar Attributes -------------------- */

export const AvatarClickable = (args: { clickable: boolean }) => {
  const handle = (e: Event) => {
    const out = document.getElementById('clickedStandaloneAvatar');
    if (!out) return;
    const detail = (e as CustomEvent).detail ?? {};
    out.innerHTML =
      '<b>Selected avatar information</b><br/>' +
      '- letter:' + detail.letter + '<br/>' +
      '- text  :' + detail.text + '<br/>' +
      '- icon  :' + (detail.icon ? '[svg]' : detail.icon) + '<br/>' +
      '- image :' + detail.image;
  };

  return html`
    <div>
      <sy-avatar
        ?clickable=${!!args.clickable}
        letter="AB"
        color="purple"
        @selected=${handle}
      ></sy-avatar>
      <p id="clickedStandaloneAvatar" style="margin-top:10px; display:${args.clickable ? 'block' : 'none'};"></p>
    </div>
  `;
};

export const AvatarDisabled = (args: { disabled: boolean }) => html`
  <span>A menu item contains disabled avatar sets disabled.</span>
  <sy-avatar-group maxCount="1">
    <sy-avatar letter="AB" color="#eeaa11" ?disabled=${!!args.disabled}></sy-avatar>
    <sy-avatar letter="CD" color="#00aa11" ?disabled=${!!args.disabled}></sy-avatar>
    <sy-avatar letter="EF" color="#ee0011" ?disabled=${!!args.disabled}></sy-avatar>
  </sy-avatar-group>
`;

export const AvatarImage  = (args: { image: string })  => html`<sy-avatar image=${ifDefined(args.image)}></sy-avatar>`;
export const AvatarIcon   = (args: { icon: string })   => html`<sy-avatar icon=${ifDefined(args.icon)}></sy-avatar>`;
export const AvatarLetter = (args: { letter: string }) => html`<sy-avatar letter=${ifDefined(args.letter)}></sy-avatar>`;
export const AvatarSize   = (args: { size: 'small'|'medium'|'large' }) =>
  html`<sy-avatar size=${ifDefined(args.size)} letter="AB"></sy-avatar>`;
export const AvatarText   = (args: { text: string })   => html`<sy-avatar text=${ifDefined(args.text)}></sy-avatar>`;

export const AvatartooltipContent = (args: { tooltipContent: string }) => html`
  <sy-avatar tooltipContent=${ifDefined(args.tooltipContent)} image="avatar_default.png"></sy-avatar>
`;

export const AvatarVariant = (args: {
  variant: 'lightgray' | 'red' | 'orange' | 'yellow' | 'lime' | 'green' | 'teal' | 'blue' | 'purple' | 'magenta' | 'darkgray';
}) => html`<sy-avatar variant=${ifDefined(args.variant)} letter="AB"></sy-avatar>`;

/* -------------------- Avatar Events -------------------- */

export const AvatarDisableStatus = (args: { disabled: boolean }) => {
  const handle = (e: Event) => {
    const out = document.getElementById('clicked-avatar');
    const detail = (e as CustomEvent).detail ?? {};
    if (out) out.innerHTML = 'disable status: ' + detail.disabled;
  };
  return html`
    <sy-avatar
      ?disabled=${!!args.disabled}
      image="avatar_default.png"
      clickable
      @disableStatus=${handle}
    ></sy-avatar>
    <p id="clicked-avatar" style="margin-top:20px;">(idle)</p>
  `;
};

export const AvatarSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('clicked-avatar');
    if (!out) return;
    const detail = (e as CustomEvent).detail ?? {};
    out.innerHTML =
      '<b>Selected avatar information</b><br/>' +
      '- letter:' + detail.letter + '<br/>' +
      '- text  :' + detail.text + '<br/>' +
      '- icon  :' + (detail.icon ? '[svg]' : detail.icon) + '<br/>' +
      '- image :' + detail.image;
  };
  return html`
    <sy-avatar image="avatar_default.png" clickable @selected=${handle}></sy-avatar>
    <sy-avatar icon=${HOUSE_ICON} clickable @selected=${handle}></sy-avatar>
    <sy-avatar letter="AB" clickable @selected=${handle}></sy-avatar>
    <sy-avatar text="First last" clickable @selected=${handle}></sy-avatar>
    <p id="clicked-avatar" style="margin-top:20px;">(idle)</p>
  `;
};
