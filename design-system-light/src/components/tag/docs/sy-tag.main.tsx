import { html, ifDefined, unsafeHTML } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyTagProps extends Components.SyTag {
  slot?: any;
  selected?: (event: CustomEvent<any>) => void;
  removed?: (event: CustomEvent<any>) => void;
}

export const Tag = ({ disabled, readonly, removable, rounded, selectable, size, variant, slot }: SyTagProps) => html`
  <sy-tag
    ?disabled=${!!disabled}
    ?readonly=${!!readonly}
    ?removable=${!!removable}
    ?rounded=${!!rounded}
    ?selectable=${!!selectable}
    size=${ifDefined(size)}
    variant=${ifDefined(variant)}>
    ${slot ? unsafeHTML(slot) : ''}
  </sy-tag>
`;

export const TagDisabled   = (args: { disabled: boolean })   => html`<sy-tag ?disabled=${!!args.disabled}>Disabled tag</sy-tag>`;
export const TagReadonly   = (args: { readonly: boolean })   => html`<sy-tag ?readonly=${!!args.readonly} selectable>Readonly tag</sy-tag>`;
export const TagRemovable  = (args: { removable: boolean })  => html`<sy-tag ?removable=${!!args.removable}>Removable tag</sy-tag>`;
export const TagRounded    = (args: { rounded: boolean })    => html`<sy-tag ?rounded=${!!args.rounded}>Rounded tag</sy-tag>`;
export const TagSelectable = (args: { selectable: boolean }) => html`<sy-tag ?selectable=${!!args.selectable}>Selectable tag</sy-tag>`;
export const TagSize       = (args: { size: 'small' | 'medium' | 'large' }) => html`<sy-tag size=${ifDefined(args.size)}>Sized tag</sy-tag>`;
export const TagVariant    = (args: { variant: 'gray' | 'purple' | 'blue' | 'green' | 'cyan' | 'yellow' | 'orange' | 'red' }) => html`<sy-tag variant=${ifDefined(args.variant)}>Variant tag</sy-tag>`;

export const TagSelected = () => {
  const handle = () => {
    const out = document.getElementById('tagSelectedResult');
    if (out) out.textContent = 'tag selected';
  };
  return html`
    <sy-tag selectable @selected=${handle}>Click me</sy-tag>
    <p id="tagSelectedResult">(idle)</p>
  `;
};

export const TagRemoved = () => {
  const handle = () => {
    const out = document.getElementById('tagRemovedResult');
    if (out) out.textContent = 'tag removed';
  };
  return html`
    <sy-tag removable @removed=${handle}>Remove me</sy-tag>
    <p id="tagRemovedResult">(idle)</p>
  `;
};
