import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DropdownTrigger } from '../../sy-dropdown.main';
import dropdownMeta from '../../sy-dropdown.stories';

const meta: Meta = {
  title: 'Dropdown/Attributes/Trigger',
  component: 'sy-dropdown',
  tags: [],
  render: (args) => DropdownTrigger(args as { trigger: 'hover'|'click' }),
  argTypes: { trigger: dropdownMeta?.argTypes?.trigger },
  args: { trigger: 'click' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
