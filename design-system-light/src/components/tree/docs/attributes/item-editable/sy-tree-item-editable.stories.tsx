import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemEditable } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Editable',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemEditable(args as { editable: boolean }),
  argTypes: { editable: treeItemMeta?.argTypes?.editable },
  args: { editable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};