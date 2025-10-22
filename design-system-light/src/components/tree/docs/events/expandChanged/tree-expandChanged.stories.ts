import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeExpandChanged, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Events/ExpandChange',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TreeExpandChanged();
  },
  argTypes: {
    expandChanged: treeMeta?.argTypes?.expandChanged
  },
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
