import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemItemUpdating } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/ItemUpdating',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemItemUpdating(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};