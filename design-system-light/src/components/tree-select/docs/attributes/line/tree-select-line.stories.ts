import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectLine, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Line',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectLine(args);
  },
  argTypes: {
    line: treeSelectMeta?.argTypes?.line
  },
  args: {
    line: true
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
