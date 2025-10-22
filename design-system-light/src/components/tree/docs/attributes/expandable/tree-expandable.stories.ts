import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeExpandable, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/Expandable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeExpandable(args);
  },
  argTypes: {
    expandable: treeMeta?.argTypes?.expandable
  },
  args: {
    expandable: true
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
