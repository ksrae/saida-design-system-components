import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TagRounded } from '../../sy-tag.main';
import tagMeta from '../../sy-tag.stories';

const meta: Meta = {
  title: 'Tag/Attributes/Rounded',
  component: 'sy-tag',
  tags: [],
  render: (args) => TagRounded(args as { rounded: boolean }),
  argTypes: { rounded: tagMeta?.argTypes?.rounded },
  args: { rounded: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};