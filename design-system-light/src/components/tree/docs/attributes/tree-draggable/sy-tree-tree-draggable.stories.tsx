import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeTreeDraggable } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Tree Draggable',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeTreeDraggable(args as { treeDraggable: boolean }),
  argTypes: { treeDraggable: treeMeta?.argTypes?.treeDraggable },
  args: { treeDraggable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};