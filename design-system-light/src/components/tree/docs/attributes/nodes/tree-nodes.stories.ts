import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeNodes, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/Nodes',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TreeNodes();
  },
  argTypes: {
    nodes: treeMeta?.argTypes?.nodes
  },
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
