import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DropdownPosition } from '../../sy-dropdown.main';
import dropdownMeta from '../../sy-dropdown.stories';

const meta: Meta = {
  title: 'Dropdown/Attributes/Position',
  component: 'sy-dropdown',
  tags: [],
  render: (args) => DropdownPosition(args as { position: 'topLeft'|'topRight'|'bottomLeft'|'bottomRight' }),
  argTypes: { position: dropdownMeta?.argTypes?.position },
  args: { position: 'bottomLeft' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
