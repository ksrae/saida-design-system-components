import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TooltipContent } from '../../sy-tooltip.main';
import tooltipMeta from '../../sy-tooltip.stories';

const meta: Meta = {
  title: 'Tooltip/Attributes/Content',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => TooltipContent(args as { content: string }),
  argTypes: { content: tooltipMeta?.argTypes?.content },
  args: { content: 'Tooltip content' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};