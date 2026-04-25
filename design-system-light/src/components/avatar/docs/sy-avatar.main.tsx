import { html, ifDefined } from '../../../utils/story-template';
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

/* ---------------------------------------------------------------
 * Single-avatar render helper
 *
 * Binding rules (applied uniformly across SAIDA components):
 *   - camelCase props use `.prop=${...}` (property) syntax so lit-html
 *     bypasses HTML attribute-name lowercasing — `tooltipContent`
 *     would otherwise arrive as a dead `tooltipcontent` attribute.
 *   - Boolean props are bound as `?attr=${...}` for single-word attrs.
 *   - Enum / string props bind as plain attributes with `ifDefined`.
 * --------------------------------------------------------------- */
const renderAvatar = (args: Partial<SyAvatarProps>) => html`
  <sy-avatar
    ?clickable=${!!args.clickable}
    ?disabled=${!!args.disabled}
    .tooltipContent=${(args.tooltipContent as any) ?? ''}
    icon=${ifDefined(args.icon)}
    image=${ifDefined(args.image)}
    letter=${ifDefined(args.letter)}
    text=${ifDefined(args.text)}
    size=${ifDefined(args.size)}
    variant=${ifDefined(args.variant)}
  ></sy-avatar>
`;

export const Avatar = (args: SyAvatarProps) => renderAvatar(args);

/* -------------------- Per-attribute renderers --------------------
 * Literal enum values are cast through the component-interface type so TypeScript
 * keeps the literal type instead of widening to `string`, which would break
 * assignment to `Partial<SyAvatarProps>`. */

type VariantT = SyAvatarProps['variant'];
type SizeT = SyAvatarProps['size'];

export const AvatarImage = (args: { image: string }) =>
  renderAvatar({ ...args, variant: 'lightgray' as VariantT });

export const AvatarIcon = (args: { icon: string }) =>
  renderAvatar({ ...args, variant: 'lightgray' as VariantT });

export const AvatarLetter = (args: { letter: string }) =>
  renderAvatar({ ...args, variant: 'blue' as VariantT });

export const AvatarText = (args: { text: string }) =>
  renderAvatar({ ...args, variant: 'green' as VariantT });

export const AvatarSize = (args: { size: SizeT }) =>
  renderAvatar({ ...args, letter: 'AB', variant: 'lightgray' as VariantT });

export const AvatarVariant = (args: { variant: VariantT }) =>
  renderAvatar({ ...args, letter: 'AB' });

export const AvatarTooltipContent = (args: { tooltipContent: string }) =>
  renderAvatar({ ...args, letter: 'AB', variant: 'lightgray' as VariantT });

/** Legacy alias kept for backward-compatible story imports. */
export const AvatartooltipContent = AvatarTooltipContent;

/* -------------------- Interaction stories -------------------- */

export const AvatarClickable = (args: { clickable: boolean }) => {
  const handle = (e: Event) => {
    const out = document.getElementById('clickedStandaloneAvatar');
    if (!out) return;
    const detail = (e as CustomEvent).detail ?? {};
    out.innerHTML =
      '<b>Selected avatar information</b><br/>' +
      '- letter: ' + detail.letter + '<br/>' +
      '- text  : ' + detail.text + '<br/>' +
      '- icon  : ' + (detail.icon ? '[svg]' : detail.icon) + '<br/>' +
      '- image : ' + detail.image;
  };

  return html`
    <div>
      <sy-avatar
        ?clickable=${!!args.clickable}
        letter="AB"
        variant="purple"
        @selected=${handle}
      ></sy-avatar>
      <p id="clickedStandaloneAvatar" style="margin-top:10px; display:${args.clickable ? 'block' : 'none'};">(idle)</p>
    </div>
  `;
};

export const AvatarDisabled = (args: { disabled: boolean }) => html`
  <div style="display:flex; gap:8px; align-items:center;">
    <sy-avatar letter="AB" variant="yellow" ?disabled=${!!args.disabled}></sy-avatar>
    <sy-avatar letter="CD" variant="green"  ?disabled=${!!args.disabled}></sy-avatar>
    <sy-avatar letter="EF" variant="red"    ?disabled=${!!args.disabled}></sy-avatar>
  </div>
`;

/* -------------------- Event stories -------------------- */

export const AvatarSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('selectedAvatarOutput');
    if (!out) return;
    const detail = (e as CustomEvent).detail ?? {};
    out.innerHTML =
      '<b>Selected avatar information</b><br/>' +
      '- letter: ' + detail.letter + '<br/>' +
      '- text  : ' + detail.text + '<br/>' +
      '- icon  : ' + (detail.icon ? '[svg]' : detail.icon) + '<br/>' +
      '- image : ' + detail.image;
  };
  return html`
    <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
      <sy-avatar image="avatar_default.png" clickable @selected=${handle}></sy-avatar>
      <sy-avatar icon=${HOUSE_ICON} clickable @selected=${handle}></sy-avatar>
      <sy-avatar letter="AB" variant="blue" clickable @selected=${handle}></sy-avatar>
      <sy-avatar text="First Last" variant="teal" clickable @selected=${handle}></sy-avatar>
    </div>
    <p id="selectedAvatarOutput" style="margin-top:20px;">(idle)</p>
  `;
};

export const AvatarDisableStatus = (args: { disabled: boolean }) => {
  const handle = (e: Event) => {
    const out = document.getElementById('disableStatusAvatarOutput');
    const detail = (e as CustomEvent).detail ?? {};
    if (out) out.innerHTML = 'disable status: ' + detail.disabled;
  };
  return html`
    <sy-avatar
      ?disabled=${!!args.disabled}
      letter="AB"
      variant="purple"
      clickable
      @disableStatus=${handle}
    ></sy-avatar>
    <p id="disableStatusAvatarOutput" style="margin-top:20px;">(idle)</p>
  `;
};

/* ===============================================================
 * Avatar-Group renderers — kept here for existing story imports.
 * The sy-avatar-group component will be migrated in its own spec
 * pass; until then these stay as-is (no `color=` leftovers).
 * =============================================================== */

export const AvatarGroup = (args: SyAvatarGroupProps) => html`
  <sy-avatar-group
    ?clickable=${!!args.clickable}
    maxCount=${ifDefined(args.maxCount as any)}
    size=${ifDefined(args.size)}
    variant=${ifDefined(args.variant)}
  >
    <sy-avatar variant="red"    letter="JD" size="medium"></sy-avatar>
    <sy-avatar variant="purple" letter="JK" size="medium"></sy-avatar>
    <sy-avatar text="Juwon Kim" size="medium"></sy-avatar>
    <sy-avatar variant="green"  text="The Q" size="medium"></sy-avatar>
  </sy-avatar-group>
`;

export const AvatarGroupClickable = (args: { clickable: boolean }) => {
  const handle = (e: Event) => {
    const out = document.getElementById('clicked-avatar-group');
    if (!out) return;
    const detail = (e as CustomEvent).detail ?? {};
    out.innerHTML =
      '<b>Selected avatar information</b><br/>' +
      '- letter: ' + detail.letter + '<br/>' +
      '- text  : ' + detail.text + '<br/>' +
      '- icon  : ' + (detail.icon ? '[svg]' : detail.icon) + '<br/>' +
      '- image : ' + detail.image + '<br/>' +
      (detail.index !== undefined ? '- index : ' + detail.index : '');
  };

  return html`
    <div>
      <sy-avatar-group ?clickable=${!!args.clickable} maxCount="2" @selected=${handle}>
        <sy-avatar image="avatar_default.png"></sy-avatar>
        <sy-avatar icon=${HOUSE_ICON}></sy-avatar>
        <sy-avatar text="star"  variant="red"></sy-avatar>
        <sy-avatar letter="AB" variant="purple"></sy-avatar>
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
