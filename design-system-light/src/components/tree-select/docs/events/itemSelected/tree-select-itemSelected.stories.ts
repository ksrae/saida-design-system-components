import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectItemSelected, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Events/ItemSelected',
  tags: ['false'],
  render: () => {
    clearElements(treeSelectMeta.title);
    return TreeSelectItemSelected();
  },
  argTypes: {
    itemSelected: treeSelectMeta?.argTypes?.itemSelected
  },
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
