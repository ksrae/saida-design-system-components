import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectNodeChanged, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Events/NodeChanged',
  tags: ['false'],
  render: () => {
    clearElements(treeSelectMeta.title);
    return TreeSelectNodeChanged();
  },
  argTypes: {
    nodesChanged: treeSelectMeta?.argTypes?.nodesChanged
  },
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
