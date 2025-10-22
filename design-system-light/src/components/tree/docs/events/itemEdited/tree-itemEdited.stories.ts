import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeItemEdited, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Events/ItemEdited',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TreeItemEdited();
  },
  argTypes: {
    itemAdded: treeMeta?.argTypes?.itemAdded,
    itemEdited: treeMeta?.argTypes?.itemEdited,
    itemRemoved: treeMeta?.argTypes?.itemRemoved,
  },
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
