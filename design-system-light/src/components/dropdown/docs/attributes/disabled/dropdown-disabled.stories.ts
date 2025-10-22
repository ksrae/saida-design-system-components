import type { Meta, StoryObj } from '@storybook/web-components';
import { DropdownProps, DropdownDisabled } from '../../dropdown';
import dropdownMeta from '../../dropdown.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<DropdownProps> = {
  title: 'Dropdown/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DropdownDisabled(args);
  },
  argTypes: {
    disabled: dropdownMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<DropdownProps>;

export const Param: Story = {}
