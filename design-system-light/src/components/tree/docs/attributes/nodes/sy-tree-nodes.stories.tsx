import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeNodes } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Nodes',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeNodes(args as { nodes: any[] }),
  argTypes: { nodes: treeMeta?.argTypes?.nodes },
  args: {
    nodes: [
      { label: 'Fruits', value: 'fruits', children: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ]},
      { label: 'Vegetables', value: 'vegetables', children: [
        { label: 'Carrot', value: 'carrot' },
      ]},
    ],
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};