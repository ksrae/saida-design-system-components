import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeEditable } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Editable',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeEditable(args as { editable: boolean }),
  argTypes: { editable: treeMeta?.argTypes?.editable },
  args: { editable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};