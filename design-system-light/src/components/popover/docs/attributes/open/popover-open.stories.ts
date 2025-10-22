import type { Meta, StoryObj } from '@storybook/web-components';
import { PopoverOpen, PopoverProps } from '../../popover';
import { clearElements } from '../../../../clear-element';
import popoverMeta from '../../popover.stories';

const meta: Meta<PopoverProps> = {
  title: 'Popover/Attributes/Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopoverOpen(args);
  },
  argTypes: {
    open: popoverMeta?.argTypes?.open,
  },
  args: {
    open: true,
  }
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Param: Story = {}