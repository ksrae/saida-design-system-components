import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeManualRemove, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/ManualRemove',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeManualRemove(args);
  },
  argTypes: {
    manualRemove: treeMeta?.argTypes?.manualRemove,
  },
  args: {
    manualRemove: false,
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
