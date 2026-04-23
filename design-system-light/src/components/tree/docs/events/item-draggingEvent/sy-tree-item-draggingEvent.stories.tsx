import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemDraggingEvent } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/DraggingEvent',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemDraggingEvent(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};