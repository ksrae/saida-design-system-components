import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopoverSticky } from '../../sy-popover.main';
import popoverMeta from '../../sy-popover.stories';

const meta: Meta = {
  title: 'Popover/Attributes/Sticky',
  component: 'sy-popover',
  tags: [],
  render: (args) => PopoverSticky(args as { sticky: boolean }),
  argTypes: { sticky: popoverMeta?.argTypes?.sticky },
  args: { sticky: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};