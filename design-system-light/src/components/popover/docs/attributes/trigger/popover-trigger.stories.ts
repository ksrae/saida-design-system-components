import type { Meta, StoryObj } from '@storybook/web-components';
import { PopoverTrigger, PopoverProps } from '../../popover';
import popoverMeta from '../../popover.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopoverProps> = {
  title: 'Popover/Attributes/Trigger',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopoverTrigger(args);
  },
  argTypes: {
    trigger: popoverMeta?.argTypes?.trigger
  },
  args: {
    trigger: 'hover'
  }
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Param: Story = {}