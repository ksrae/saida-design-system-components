import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatarGroupMaxCount } from '../../sy-avatar.main';
import avatarGroupMeta from '../../sy-avatar-group.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Group Max Count',
  component: 'sy-avatar-group',
  tags: [],
  render: (args) => AvatarGroupMaxCount(args as { maxCount: number }),
  argTypes: {
    maxCount: avatarGroupMeta?.argTypes?.maxCount,
  },
  args: {
    maxCount: 3,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
