import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopoverTrigger } from '../../sy-popover.main';
import popoverMeta from '../../sy-popover.stories';

const meta: Meta = {
  title: 'Popover/Attributes/Trigger',
  component: 'sy-popover',
  tags: [],
  render: (args) => PopoverTrigger(args as { trigger: 'hover' | 'click' | 'focus' | 'none' }),
  argTypes: { trigger: popoverMeta?.argTypes?.trigger },
  args: { trigger: 'click' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};