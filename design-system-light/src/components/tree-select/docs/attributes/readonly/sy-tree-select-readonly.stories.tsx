import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSelectReadonly } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Readonly',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectReadonly(args as { readonly: boolean }),
  argTypes: { readonly: treeSelectMeta?.argTypes?.readonly },
  args: { readonly: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};