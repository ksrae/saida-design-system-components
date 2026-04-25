import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemTagMessage } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Tag Message',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemTagMessage(args as { tagMessage: string }),
  argTypes: { tagMessage: treeItemMeta?.argTypes?.tagMessage },
  args: { tagMessage: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};