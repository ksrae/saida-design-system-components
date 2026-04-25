import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TooltipOpendelay } from '../../sy-tooltip.main';
import tooltipMeta from '../../sy-tooltip.stories';

const meta: Meta = {
  title: 'Tooltip/Attributes/Opendelay',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => TooltipOpendelay(args as { opendelay: number }),
  argTypes: { opendelay: tooltipMeta?.argTypes?.opendelay },
  args: { opendelay: 500 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};