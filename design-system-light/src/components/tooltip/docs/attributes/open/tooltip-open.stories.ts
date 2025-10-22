import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TooltipOpen, TooltipProps } from '../../tooltip';
import tooltipMeta from '../../tooltip.stories';

const meta: Meta<TooltipProps> = {
  title: 'Tooltip/Attributes/Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TooltipOpen(args);
  },
  argTypes: {
    open: tooltipMeta?.argTypes?.open
  },
  args: {
    open: false
  }
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Param: Story = {}