import type { Meta, StoryObj } from '@storybook/web-components';
import { DropdownProps, DropdownSize } from '../../dropdown';
import dropdownMeta from '../../dropdown.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<DropdownProps> = {
  title: 'Dropdown/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DropdownSize(args);
  },
  argTypes: {
    size: dropdownMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<DropdownProps>;

export const Param: Story = {}
