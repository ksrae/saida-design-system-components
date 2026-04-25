import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopoverClosedelay } from '../../sy-popover.main';
import popoverMeta from '../../sy-popover.stories';

const meta: Meta = {
  title: 'Popover/Attributes/Closedelay',
  component: 'sy-popover',
  tags: [],
  render: (args) => PopoverClosedelay(args as { closedelay: number }),
  argTypes: { closedelay: popoverMeta?.argTypes?.closedelay },
  args: { closedelay: 1000 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};