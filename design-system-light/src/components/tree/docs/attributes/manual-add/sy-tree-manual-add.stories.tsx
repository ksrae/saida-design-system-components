import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeManualAdd } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Manual Add',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeManualAdd(args as { manualAdd: boolean }),
  argTypes: { manualAdd: treeMeta?.argTypes?.manualAdd },
  args: { manualAdd: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};