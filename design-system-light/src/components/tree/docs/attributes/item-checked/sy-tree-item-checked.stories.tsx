import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemChecked } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Checked',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemChecked(args as { checked: boolean }),
  argTypes: { checked: treeItemMeta?.argTypes?.checked },
  args: { checked: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};