import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeItemChecked, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Events/ItemChecked',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TreeItemChecked();
  },
  argTypes: {
    itemChecked: treeMeta?.argTypes?.itemChecked
  },
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
