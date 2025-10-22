import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeEditable, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/Editable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeEditable(args);
  },
  argTypes: {
    editable: treeMeta?.argTypes?.editable
  },
  args: {
    editable: true
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
