import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemLine } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Line',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemLine(args as { line: boolean }),
  argTypes: { line: treeItemMeta?.argTypes?.line },
  args: { line: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};