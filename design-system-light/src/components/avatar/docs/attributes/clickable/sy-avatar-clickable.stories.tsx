import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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
