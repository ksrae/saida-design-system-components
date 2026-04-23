import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopoverOpendelay } from '../../sy-popover.main';
import popoverMeta from '../../sy-popover.stories';

const meta: Meta = {
  title: 'Popover/Attributes/Opendelay',
  component: 'sy-popover',
  tags: [],
  render: (args) => PopoverOpendelay(args as { opendelay: number }),
  argTypes: { opendelay: popoverMeta?.argTypes?.opendelay },
  args: { opendelay: 100 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};