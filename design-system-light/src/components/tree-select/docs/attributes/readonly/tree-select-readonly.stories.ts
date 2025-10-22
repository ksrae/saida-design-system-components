import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectReadonly, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectReadonly(args);
  },
  argTypes: {
    readonly: treeSelectMeta?.argTypes?.readonly
  },
  args: {
    readonly: false
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
