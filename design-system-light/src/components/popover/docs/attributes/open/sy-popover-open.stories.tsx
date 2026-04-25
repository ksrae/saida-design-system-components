import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopoverOpen } from '../../sy-popover.main';
import popoverMeta from '../../sy-popover.stories';

const meta: Meta = {
  title: 'Popover/Attributes/Open',
  component: 'sy-popover',
  tags: [],
  render: (args) => PopoverOpen(args as { open: boolean }),
  argTypes: { open: popoverMeta?.argTypes?.open },
  args: { open: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};