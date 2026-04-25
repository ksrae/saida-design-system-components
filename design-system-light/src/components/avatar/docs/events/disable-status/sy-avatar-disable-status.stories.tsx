import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AvatarDisableStatus } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Events/Disable Status',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarDisableStatus(args as { disabled: boolean }),
  argTypes: {
    disabled: avatarMeta?.argTypes?.disabled,
  },
  args: {
    disabled: false,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
