import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TooltipClosedelay } from '../../sy-tooltip.main';
import tooltipMeta from '../../sy-tooltip.stories';

const meta: Meta = {
  title: 'Tooltip/Attributes/Closedelay',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => TooltipClosedelay(args as { closedelay: number }),
  argTypes: { closedelay: tooltipMeta?.argTypes?.closedelay },
  args: { closedelay: 500 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};