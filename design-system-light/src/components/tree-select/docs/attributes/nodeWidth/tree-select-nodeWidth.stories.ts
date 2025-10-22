import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectNodeWidth, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';

const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/NodeWidth',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectNodeWidth(args);
  },
  argTypes: {
    nodeWidth: treeSelectMeta?.argTypes?.nodeWidth
  },
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
