import type { Meta, StoryObj } from '@storybook/web-components';
import { DropdownBorderless } from '../../sy-dropdown.main';
import dropdownMeta from '../../sy-dropdown.stories';

const meta: Meta = {
  title: 'Dropdown/Attributes/Borderless',
  component: 'sy-dropdown',
  tags: [],
  render: (args) => DropdownBorderless(args as { borderless: boolean }),
  argTypes: { borderless: dropdownMeta?.argTypes?.borderless },
  args: { borderless: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
