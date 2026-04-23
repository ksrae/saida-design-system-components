import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TagSize } from '../../sy-tag.main';
import tagMeta from '../../sy-tag.stories';

const meta: Meta = {
  title: 'Tag/Attributes/Size',
  component: 'sy-tag',
  tags: [],
  render: (args) => TagSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: tagMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};