import type { Meta, StoryObj } from '@storybook/web-components';
import { DropdownProps, DropdownTrigger } from '../../dropdown';
import dropdownMeta from '../../dropdown.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<DropdownProps> = {
  title: 'Dropdown/Attributes/Trigger',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DropdownTrigger(args);
  },
  argTypes: {
    trigger: dropdownMeta?.argTypes?.trigger
  },
  args: {
    trigger: 'click'
  }
};

export default meta;
type Story = StoryObj<DropdownProps>;

export const Param: Story = {}
