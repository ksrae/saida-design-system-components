import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeCheckable, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/Checkable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeCheckable(args);
  },
  argTypes: {
    checkable: treeMeta?.argTypes?.checkable,
    clickable: treeMeta?.argTypes?.clickable,
  },
  args: {
    checkable: true,
    clickable: false
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
