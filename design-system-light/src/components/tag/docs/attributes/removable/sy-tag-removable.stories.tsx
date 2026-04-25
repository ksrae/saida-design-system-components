import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TagRemovable } from '../../sy-tag.main';
import tagMeta from '../../sy-tag.stories';

const meta: Meta = {
  title: 'Tag/Attributes/Removable',
  component: 'sy-tag',
  tags: [],
  render: (args) => TagRemovable(args as { removable: boolean }),
  argTypes: { removable: tagMeta?.argTypes?.removable },
  args: { removable: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};