import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemItemEdited } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/ItemEdited',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemItemEdited(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};