import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemItemUpdatingReset } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/ItemUpdatingReset',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemItemUpdatingReset(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};