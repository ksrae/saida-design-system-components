import type { Meta, StoryObj } from '@storybook/web-components';
import { PopoverKeyControl, PopoverProps } from '../../popover';
import popoverMeta from '../../popover.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopoverProps> = {
  title: 'Popover/Events/KeyControl',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PopoverKeyControl();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;


export const Param: Story = {};