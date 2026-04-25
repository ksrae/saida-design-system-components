import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TagReadonly } from '../../sy-tag.main';
import tagMeta from '../../sy-tag.stories';

const meta: Meta = {
  title: 'Tag/Attributes/Readonly',
  component: 'sy-tag',
  tags: [],
  render: (args) => TagReadonly(args as { readonly: boolean }),
  argTypes: { readonly: tagMeta?.argTypes?.readonly },
  args: { readonly: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};