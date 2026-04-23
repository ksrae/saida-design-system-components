import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeExpandAll } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Expand All',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeExpandAll(args as { expandAll: boolean }),
  argTypes: { expandAll: treeMeta?.argTypes?.expandAll },
  args: { expandAll: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};