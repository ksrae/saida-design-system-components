import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeClickable, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/Clickable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeClickable(args);
  },
  argTypes: {
    clickable: treeMeta?.argTypes?.clickable
  },
  args: {
    clickable: true
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
