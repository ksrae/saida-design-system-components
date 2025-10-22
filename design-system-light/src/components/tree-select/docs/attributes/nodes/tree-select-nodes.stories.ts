import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectNodes, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Nodes',
  tags: ['false'],
  render: () => {
    clearElements(treeSelectMeta.title);
    return TreeSelectNodes();
  },
  argTypes: {
    nodes: treeSelectMeta?.argTypes?.nodes
  },
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
