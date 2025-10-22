import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeProps, TreeSelectedValue } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/SelectedValue',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeSelectedValue(args);
  },
  argTypes: {
    selectedValue: treeMeta?.argTypes?.selectedValue,
  },
  args: {
    selectedValue: '1001',
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
