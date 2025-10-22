import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectCheckable, TreeSelectItemChecked, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Events/ItemChecked',
  tags: ['false'],
  render: () => {
    clearElements(treeSelectMeta.title);
    return TreeSelectItemChecked();
  },
  argTypes: {
    itemChecked: treeSelectMeta?.argTypes?.itemChecked
  },
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
