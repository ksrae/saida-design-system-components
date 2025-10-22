import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeExpandAll, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/ExpandAll',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeExpandAll(args);
  },
  argTypes: {
    expandAll: treeMeta?.argTypes?.expandAll,
    expandable: treeMeta?.argTypes?.expandable
  },
  args: {
    expandAll: true,
    expandable: true
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
