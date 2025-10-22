import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TooltipMaxwidth, TooltipProps } from '../../tooltip';
import tooltipMeta from '../../tooltip.stories';

const meta: Meta<TooltipProps> = {
  title: 'Tooltip/Attributes/MaxWidth',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TooltipMaxwidth(args);
  },
  argTypes: {
    maxWidth: tooltipMeta?.argTypes?.maxWidth,
    content: tooltipMeta?.argTypes?.content
  },
  args: {
    maxWidth: 100,
    content: 'This is a tooltip content'
  }
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Param: Story = {}