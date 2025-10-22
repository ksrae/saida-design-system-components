import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeNodesChanged, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Events/NodesChanged',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TreeNodesChanged();
  },
  argTypes: {
    nodesChanged: treeMeta?.argTypes?.nodesChanged
  },
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
