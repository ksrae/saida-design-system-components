import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatarLetter } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Letter',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarLetter(args as { letter: string }),
  argTypes: {
    letter: avatarMeta?.argTypes?.letter,
  },
  args: {
    letter: 'AB',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
