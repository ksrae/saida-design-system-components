import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AvatarDisabled } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Disabled',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarDisabled(args as { disabled: boolean }),
  argTypes: {
    disabled: avatarMeta?.argTypes?.disabled,
  },
  args: {
    disabled: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
