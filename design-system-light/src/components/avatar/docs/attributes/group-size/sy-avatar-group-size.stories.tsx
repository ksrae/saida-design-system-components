import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatarGroupSize } from '../../sy-avatar.main';
import avatarGroupMeta from '../../sy-avatar-group.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Group Size',
  component: 'sy-avatar-group',
  tags: [],
  render: (args) => AvatarGroupSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: {
    size: avatarGroupMeta?.argTypes?.size,
  },
  args: {
    size: 'medium',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
