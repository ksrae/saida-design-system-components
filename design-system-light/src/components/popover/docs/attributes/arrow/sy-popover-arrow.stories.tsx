import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopoverArrow } from '../../sy-popover.main';
import popoverMeta from '../../sy-popover.stories';

const meta: Meta = {
  title: 'Popover/Attributes/Arrow',
  component: 'sy-popover',
  tags: [],
  render: (args) => PopoverArrow(args as { arrow: boolean }),
  argTypes: { arrow: popoverMeta?.argTypes?.arrow },
  args: { arrow: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};