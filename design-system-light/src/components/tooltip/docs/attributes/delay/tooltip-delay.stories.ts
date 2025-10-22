import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TooltipDelay, TooltipProps } from '../../tooltip';
import tooltipMeta from '../../tooltip.stories';

const meta: Meta<TooltipProps> = {
  title: 'Tooltip/Attributes/Delay',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TooltipDelay(args);
  },
  argTypes: {
    opendelay: tooltipMeta?.argTypes?.opendelay,
    closedelay: tooltipMeta?.argTypes?.closedelay,
  },
  args: {
    opendelay: 1000,
    closedelay: 1000
  }
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Param: Story = {}