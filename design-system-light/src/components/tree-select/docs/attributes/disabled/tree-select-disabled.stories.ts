import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectDisabled, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectDisabled(args);
  },
  argTypes: {
    disabled: treeSelectMeta?.argTypes?.disabled
  },
  args: {
    disabled: false
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
