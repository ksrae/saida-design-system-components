import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TooltipHideArrow } from '../../sy-tooltip.main';
import tooltipMeta from '../../sy-tooltip.stories';

const meta: Meta = {
  title: 'Tooltip/Attributes/Hide Arrow',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => TooltipHideArrow(args as { hideArrow: boolean }),
  argTypes: { hideArrow: tooltipMeta?.argTypes?.hideArrow },
  args: { hideArrow: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};