import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeSelectStatus, TreeSelectProps } from '../../tree-select';
import treeSelectMeta from '../../tree-select.stories';


const meta: Meta<TreeSelectProps> = {
  title: 'TreeSelect/Attributes/Status',
  tags: ['false'],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelectStatus(args);
  },
  argTypes: {
    status: treeSelectMeta?.argTypes?.status
  },
  args: {
    status: 'error',
  }
};

export default meta;
type Story = StoryObj<TreeSelectProps>;

export const Param: Story = {}
