import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectExpandAll, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/ExpandAll',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectExpandAll(args);
  },
  argTypes: {
    expandAll: treeSelectMeta?.argTypes?.expandAll,
    expandable: treeSelectMeta?.argTypes?.expandable,
  },
  args: {
    expandAll: true,
    expandable: true
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
