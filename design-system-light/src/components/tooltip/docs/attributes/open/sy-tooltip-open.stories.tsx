import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TooltipOpen } from '../../sy-tooltip.main';
import tooltipMeta from '../../sy-tooltip.stories';

const meta: Meta = {
  title: 'Tooltip/Attributes/Open',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => TooltipOpen(args as { open: boolean }),
  argTypes: { open: tooltipMeta?.argTypes?.open },
  args: { open: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};