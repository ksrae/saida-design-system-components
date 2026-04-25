import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TagDisabled } from '../../sy-tag.main';
import tagMeta from '../../sy-tag.stories';

const meta: Meta = {
  title: 'Tag/Attributes/Disabled',
  component: 'sy-tag',
  tags: [],
  render: (args) => TagDisabled(args as { disabled: boolean }),
  argTypes: { disabled: tagMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};