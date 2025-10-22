import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TooltipTrigger, TooltipProps } from '../../tooltip';
import tooltipMeta from '../../tooltip.stories';

const meta: Meta<TooltipProps> = {
  title: 'Tooltip/Attributes/Trigger',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TooltipTrigger(args);
  },
  argTypes: {
    trigger: tooltipMeta?.argTypes?.trigger
  },
  args: {
    trigger: 'hover'
  }
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Param: Story = {}