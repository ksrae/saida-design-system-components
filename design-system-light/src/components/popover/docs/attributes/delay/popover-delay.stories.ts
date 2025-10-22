import type { Meta, StoryObj } from '@storybook/web-components';
import { PopoverDelay, PopoverProps } from '../../popover';
import { clearElements } from '../../../../clear-element';
import popoverMeta from '../../popover.stories';

const meta: Meta<PopoverProps> = {
  title: 'Popover/Attributes/Delay',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopoverDelay(args);
  },
  argTypes: {
    opendelay: popoverMeta?.argTypes?.opendelay,
    closedelay: popoverMeta?.argTypes?.closedelay,
  },
  args: {
    opendelay: 1000,
    closedelay: 1000
  }
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Param: Story = {}