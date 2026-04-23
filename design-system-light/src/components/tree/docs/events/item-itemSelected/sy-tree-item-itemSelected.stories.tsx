import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemItemSelected } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/ItemSelected',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemItemSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};