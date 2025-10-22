import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TooltipHideArrow, TooltipProps } from '../../tooltip';
import tooltipMeta from '../../tooltip.stories';

const meta: Meta<TooltipProps> = {
  title: 'Tooltip/Attributes/HideArrow',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TooltipHideArrow(args);
  },
  argTypes: {
    hideArrow: tooltipMeta?.argTypes?.hideArrow
  },
  args: {
    hideArrow: true
  }
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Param: Story = {}