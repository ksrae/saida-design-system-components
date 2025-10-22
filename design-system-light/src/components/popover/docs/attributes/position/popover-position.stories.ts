import type { Meta, StoryObj } from '@storybook/web-components';
import { PopoverPosition, PopoverProps } from '../../popover';
import popoverMeta from '../../popover.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopoverProps> = {
  title: 'Popover/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopoverPosition(args);
  },
  argTypes: {
    position: popoverMeta?.argTypes?.position
  },
  args: {
    position: 'bottom',
  }
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Param: Story = {}