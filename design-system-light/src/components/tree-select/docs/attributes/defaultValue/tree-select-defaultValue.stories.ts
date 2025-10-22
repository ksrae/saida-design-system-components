import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectDefaultValue, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/DefaultValue',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectDefaultValue(args);
  },
  argTypes: {
    defaultValue: treeSelectMeta?.argTypes?.defaultValue
  },
  args: {
    defaultValue: '1001'
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
