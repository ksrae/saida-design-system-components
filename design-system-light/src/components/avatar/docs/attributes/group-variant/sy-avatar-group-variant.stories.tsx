import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AvatarGroupVariant } from '../../sy-avatar.main';
import avatarGroupMeta from '../../sy-avatar-group.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Group Variant',
  component: 'sy-avatar-group',
  tags: [],
  render: (args) => AvatarGroupVariant(args as { variant: 'stack' | 'grid' }),
  argTypes: {
    variant: avatarGroupMeta?.argTypes?.variant,
  },
  args: {
    variant: 'stack',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
