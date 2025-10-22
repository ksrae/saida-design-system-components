import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeDraggable, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/Draggable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeDraggable(args);
  },
  argTypes: {
    draggable: treeMeta?.argTypes?.draggable
  },
  args: {
    draggable: true
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
