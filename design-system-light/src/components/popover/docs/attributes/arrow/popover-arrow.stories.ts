import type { Meta, StoryObj } from '@storybook/web-components';
import { PopoverArrow, PopoverProps } from '../../popover';
import popoverMeta from '../../popover.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopoverProps> = {
  title: 'Popover/Attributes/Arrow',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopoverArrow(args);
  },
  argTypes: {
    arrow: popoverMeta?.argTypes?.arrow
  },
  args: {
    arrow: true
  }
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Param: Story = {}