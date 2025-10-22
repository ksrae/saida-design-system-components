import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectClearable, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Clearable',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectClearable(args);
  },
  argTypes: {
    clearable: treeSelectMeta?.argTypes?.clearable
  },
  args: {
    clearable: true
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
