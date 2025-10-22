import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectMaxTagCount, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/MaxTagCount',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectMaxTagCount(args);
  },
  argTypes: {
    maxTagCount: treeSelectMeta?.argTypes?.maxTagCount
  },
  args: {
    maxTagCount: 1
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
