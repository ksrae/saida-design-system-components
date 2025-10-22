import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TreeLine, TreeProps } from '../../tree';
import treeMeta from '../../tree.stories';

const meta: Meta<TreeProps> = {
  title: 'Tree/Attributes/Line',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TreeLine(args);
  },
  argTypes: {
    line: treeMeta?.argTypes?.line,
  },
  args: {
    line: true,
  }
};

export default meta;
type Story = StoryObj<TreeProps>;

export const Param: Story = {}
