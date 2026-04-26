import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeManualRemove } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Manual Remove',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeManualRemove(args as { manualRemove: boolean }),
  argTypes: { manualRemove: treeMeta?.argTypes?.manualRemove },
  args: { manualRemove: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};