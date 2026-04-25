import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AvatarVariant } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Variant',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarVariant(args as { variant: 'lightgray' | 'red' | 'orange' | 'yellow' | 'lime' | 'green' | 'teal' | 'blue' | 'purple' | 'magenta' | 'darkgray' }),
  argTypes: {
    variant: avatarMeta?.argTypes?.variant,
  },
  args: {
    variant: 'lightgray',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
