import type { Meta, StoryObj } from '@storybook/web-components';
import { DropdownProps, DropdownSelected } from '../../dropdown';
import dropdownMeta from '../../dropdown.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<DropdownProps> = {
  title: 'Dropdown/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return DropdownSelected();
  },
  argTypes: {
    selected: dropdownMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<DropdownProps>;

export const Param: Story = {}
