import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemExpandChanged } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/ExpandChanged',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemExpandChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};