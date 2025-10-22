import { html } from 'lit';
import '../tag.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface TagProps {
  disabled: boolean;
  readonly: boolean;
  removable: boolean;
  rounded: boolean;
  selectable: boolean;
  size: "small" | "medium" | "large";
  variant: 'gray' | 'purple' | 'blue' | 'green' | 'cyan' | 'yellow' | 'orange' | 'red';
  slotContent: any;
  selected?: () => any;
  removed?: () => any;
}

export const Tag = ({ disabled, readonly, removable, rounded, selectable, size, variant, slotContent }: TagProps) => {
  return html`
	<sy-tag
    ?disabled=${disabled}
    ?readonly=${readonly}
    ?removable=${removable}
    ?rounded=${rounded}
    ?selectable=${selectable}
    size=${size}
    variant=${variant}> 
    Tag
  </sy-tag>
  `;
};

export const TagSlot = ({slotContent}: TagProps) => {
  return html`
	<sy-tag>
    ${unsafeHTML(slotContent)}
  </sy-tag>
  `;
};

export const TagDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-tag ?disabled=${args.disabled}>Tag</sy-tag>
`;
};

export const TagReadonly = (args: {readonly: boolean}) => {
  return html`
<sy-tag ?readonly=${args.readonly}>Tag</sy-tag>
`;
};


export const TagRemovable = (args: {removable: boolean}) => {
  return html`
<sy-tag ?removable=${args.removable}>Removable</sy-tag>
`;
};

export const TagRounded = (args: {rounded: boolean}) => {
  return html`
<sy-tag ?rounded=${args.rounded}>Rounded</sy-tag>
`;
};

export const TagSelectable = (args: {selectable: boolean}) => {
  return html`
<sy-tag ?selectable=${args.selectable}>Selectable</sy-tag>
`;
};

export const TagVariant = (args: {variant: 'gray' | 'purple' | 'blue' | 'green' | 'cyan' | 'yellow' | 'orange' | 'red'}) => {
  return html`
<sy-tag variant=${args.variant}>${args.variant}</sy-tag>
`;
};

export const TagSize = (args: {size: "small" | "medium" | "large"}) => {
  return html`
<sy-tag size=${args.size}>Size</sy-tag>
`;
};

export const TagSelected = () => {
  return html`
<sy-tag id="tagSelected" selectable>Tag</sy-tag>

<p id="tagSelectedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#tagSelected');  
    const result = document.querySelector('#tagSelectedResult');

    const handleSelected = (e) => {
      result.textContent = "Tag id: '" + e.detail.tag.id + "' is selected";
    };

    elem.addEventListener('selected', handleSelected);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSelected);
    });
  })();
</script>
`;
}
export const TagRemoved = () => {
  return html`
<sy-tag id="tagRemoved" removable>Tag</sy-tag>

<p id="tagRemovedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#tagRemoved');  
    const result = document.querySelector('#tagRemovedResult');

    const handleRemoved = (e) => {
      result.textContent = "Tag id: '" + e.detail.tag.id + "' is removed";
    };

    elem.addEventListener('removed', handleRemoved);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('removed', handleRemoved);
    });
  })();
</script>
`;
}
