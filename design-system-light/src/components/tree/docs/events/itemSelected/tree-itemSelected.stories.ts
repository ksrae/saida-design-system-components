import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeProps, TreeItemSelected } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Events/ItemSelected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TreeItemSelected();
  },
  argTypes: {
    itemSelected: treeMeta?.argTypes?.itemSelected
  },
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
