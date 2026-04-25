import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AvatarImage } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Image',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarImage(args as { image: string }),
  argTypes: {
    image: avatarMeta?.argTypes?.image,
  },
  args: {
    image: 'avatar_default.png',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
