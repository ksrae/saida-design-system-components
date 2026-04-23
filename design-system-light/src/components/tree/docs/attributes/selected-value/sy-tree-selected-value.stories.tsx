import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSelectedValue } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Selected Value',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeSelectedValue(args as { selectedValue: string }),
  argTypes: { selectedValue: treeMeta?.argTypes?.selectedValue },
  args: { selectedValue: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};