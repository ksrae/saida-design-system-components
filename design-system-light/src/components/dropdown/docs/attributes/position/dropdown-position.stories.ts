import type { Meta, StoryObj } from '@storybook/web-components';
import { DropdownProps, DropdownPosition } from '../../dropdown';
import dropdownMeta from '../../dropdown.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<DropdownProps> = {
  title: 'Dropdown/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DropdownPosition(args);
  },
  argTypes: {
    position: dropdownMeta?.argTypes?.position
  },
  args: {
    position: 'topLeft'
  }
};

export default meta;
type Story = StoryObj<DropdownProps>;

export const Param: Story = {}
