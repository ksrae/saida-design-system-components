import type { Meta, StoryObj } from '@storybook/web-components';
import { DropdownBorderless, DropdownProps } from '../../dropdown';
import dropdownMeta from '../../dropdown.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<DropdownProps> = {
  title: 'Dropdown/Attributes/Borderless',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DropdownBorderless(args);
  },
  argTypes: {
    borderless: dropdownMeta?.argTypes?.borderless
  },
  args: {
    borderless: true
  }
};

export default meta;
type Story = StoryObj<DropdownProps>;

export const Param: Story = {}
