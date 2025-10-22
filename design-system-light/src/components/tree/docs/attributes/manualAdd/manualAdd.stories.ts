import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeManualAdd, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/ManualAdd',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeManualAdd(args);
  },
  argTypes: {
    manualAdd: treeMeta?.argTypes?.manualAdd,
  },
  args: {
    manualAdd: false,
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
