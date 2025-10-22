import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectLoading, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Loading',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectLoading(args);
  },
  argTypes: {
    loading: treeSelectMeta?.argTypes?.loading
  },
  args: {
    loading: true
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
