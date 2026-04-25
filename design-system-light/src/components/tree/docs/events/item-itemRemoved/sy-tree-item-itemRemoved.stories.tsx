import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemItemRemoved } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/ItemRemoved',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemItemRemoved(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};