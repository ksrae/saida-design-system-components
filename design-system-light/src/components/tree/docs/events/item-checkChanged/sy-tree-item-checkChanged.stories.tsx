import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemCheckChanged } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/CheckChanged',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemCheckChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};