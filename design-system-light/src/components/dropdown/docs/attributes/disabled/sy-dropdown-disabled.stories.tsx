import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DropdownDisabled } from '../../sy-dropdown.main';
import dropdownMeta from '../../sy-dropdown.stories';

const meta: Meta = {
  title: 'Dropdown/Attributes/Disabled',
  component: 'sy-dropdown',
  tags: [],
  render: (args) => DropdownDisabled(args as { disabled: boolean }),
  argTypes: { disabled: dropdownMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
