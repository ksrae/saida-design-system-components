import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectCheckable, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Checkable',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectCheckable(args);
  },
  argTypes: {
    checkable: treeSelectMeta?.argTypes?.checkable
  },
  args: {
    checkable: true
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
