import type { Meta, StoryObj } from '@storybook/web-components';
import { PopoverManualControl, PopoverProps } from '../../popover';
import popoverMeta from '../../popover.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopoverProps> = {
  title: 'Popover/Events/Manual Control',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PopoverManualControl();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;


export const Param: Story = {};