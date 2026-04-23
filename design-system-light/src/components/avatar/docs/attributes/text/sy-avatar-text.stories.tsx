import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatarText } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Text',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarText(args as { text: string }),
  argTypes: {
    text: avatarMeta?.argTypes?.text,
  },
  args: {
    text: 'Firstname Lastname',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
