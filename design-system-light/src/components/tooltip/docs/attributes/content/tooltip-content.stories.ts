import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TooltipContent, TooltipDelay, TooltipProps } from '../../tooltip';
import tooltipMeta from '../../tooltip.stories';

const meta: Meta<TooltipProps> = {
  title: 'Tooltip/Attributes/Content',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TooltipContent(args);
  },
  argTypes: {
    content: tooltipMeta?.argTypes?.content,
  },
  args: {
    content: 'tooltip content\ntpp;o',
  }
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Param: Story = {}