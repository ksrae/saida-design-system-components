import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeProps, TreeNodeWidth } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/NodeWidth',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeNodeWidth(args);
  },
  argTypes: {
    nodeWidth: treeMeta?.argTypes?.nodeWidth,
  },
  args: {
    nodeWidth: 50
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
