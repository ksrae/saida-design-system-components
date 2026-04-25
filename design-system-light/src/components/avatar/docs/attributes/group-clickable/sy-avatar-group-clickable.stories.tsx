import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AvatarGroupClickable } from '../../sy-avatar.main';
import avatarGroupMeta from '../../sy-avatar-group.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Group Clickable',
  component: 'sy-avatar-group',
  tags: [],
  render: (args) => AvatarGroupClickable(args as { clickable: boolean }),
  argTypes: {
    clickable: avatarGroupMeta?.argTypes?.clickable,
  },
  args: {
    clickable: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
