import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TooltipTrigger } from '../../sy-tooltip.main';
import tooltipMeta from '../../sy-tooltip.stories';

const meta: Meta = {
  title: 'Tooltip/Attributes/Trigger',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => TooltipTrigger(args as { trigger: 'hover' | 'click' | 'focus' | 'none' }),
  argTypes: { trigger: tooltipMeta?.argTypes?.trigger },
  args: { trigger: 'hover' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};