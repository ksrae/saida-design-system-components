import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TooltipPosition, TooltipProps } from '../../tooltip';
import tooltipMeta from '../../tooltip.stories';

const meta: Meta<TooltipProps> = {
  title: 'Tooltip/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TooltipPosition(args);
  },
  argTypes: {
    position: tooltipMeta?.argTypes?.position
  },
  args: {
    position: 'top'
  }
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Param: Story = {}