import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DropdownSize } from '../../sy-dropdown.main';
import dropdownMeta from '../../sy-dropdown.stories';

const meta: Meta = {
  title: 'Dropdown/Attributes/Size',
  component: 'sy-dropdown',
  tags: [],
  render: (args) => DropdownSize(args as { size: 'small'|'medium'|'large' }),
  argTypes: { size: dropdownMeta?.argTypes?.size },
  args: { size: 'medium' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
