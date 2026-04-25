import { html, unsafeHTML } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyButtonGroupProps extends Components.SyButtonGroup {
  slot?: any;
  click?: (event: MouseEvent) => void;
}

export const ButtonGroup = ({vertical, slot}: SyButtonGroupProps) => {
  return html`
	<sy-button-group
    ?vertical=${vertical}>
    ${unsafeHTML(slot)}
</sy-button-group>
  `;
};

export const ButtonGroupVertical = (args: {vertical: boolean}) => {
  return html`
<sy-button-group ?vertical=${args.vertical}>
  <sy-button>Button 1</sy-button>
  <sy-button>Button 2</sy-button>
  <sy-button>Button 3</sy-button>
</sy-button-group>
`;
}

export const ButtonGroupCustom = () => {
  return html`
  <h3>Custom</h3>

<sy-button-group>
  <sy-button variant="secondary">Button</sy-button>
  <sy-button>
    <sy-icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M497.5 177L337.5 337C328.1 346.4 312.9 346.4 303.6 337L143.5 177C134.1 167.6 134.1 152.4 143.5 143.1C152.9 133.8 168.1 133.7 177.4 143.1L320.4 286.1L463.4 143.1C472.8 133.7 488 133.7 497.3 143.1C506.6 152.5 506.7 167.7 497.3 177zM497.5 369L337.5 529C328.1 538.4 312.9 538.4 303.6 529L143.5 369C134.1 359.6 134.1 344.4 143.5 335.1C152.9 325.8 168.1 325.7 177.4 335.1L320.4 478.1L463.4 335.1C472.8 325.7 488 325.7 497.3 335.1C506.6 344.5 506.7 359.7 497.3 369z"/></svg>
    </sy-icon>
    <sy-menu position="bottomRight">
      <sy-menu-item>Item 1</sy-menu-item>
      <sy-menu-item>Item 2</sy-menu-item>
      <sy-menu-item>Item 3</sy-menu-item>
    </sy-menu>
  </sy-button>
</sy-button-group>
  `
}
