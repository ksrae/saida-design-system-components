import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatarClickable } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Clickable',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarClickable(args as { clickable: boolean }),
  argTypes: {
    clickable: avatarMeta?.argTypes?.clickable,
  },
  args: {
    clickable: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
