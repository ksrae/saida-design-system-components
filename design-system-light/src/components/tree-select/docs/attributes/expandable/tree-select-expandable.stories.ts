import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectExpandable, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Expandable',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectExpandable(args);
  },
  argTypes: {
    expandable: treeSelectMeta?.argTypes?.expandable
  },
  args: {
    expandable: true
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
