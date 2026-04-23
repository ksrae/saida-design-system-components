import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatarSize } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Size',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: {
    size: avatarMeta?.argTypes?.size,
  },
  args: {
    size: 'medium',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
