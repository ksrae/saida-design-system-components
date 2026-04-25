import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TooltipMaxWidth } from '../../sy-tooltip.main';
import tooltipMeta from '../../sy-tooltip.stories';

const meta: Meta = {
  title: 'Tooltip/Attributes/Max Width',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => TooltipMaxWidth(args as { maxWidth: number | null }),
  argTypes: { maxWidth: tooltipMeta?.argTypes?.maxWidth },
  args: { maxWidth: 200 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};