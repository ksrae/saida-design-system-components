import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemIsEditable } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Is Editable',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemIsEditable(args as { isEditable: boolean }),
  argTypes: { isEditable: treeItemMeta?.argTypes?.isEditable },
  args: { isEditable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};