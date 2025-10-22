import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarGroupProps, AvatarGroupVariant } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../avatar-group.stories';
import avatarGroupMeta from '../../avatar-group.stories';

const meta: Meta<AvatarGroupProps> = {
  title: 'Avatar/Attributes/Group-Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarGroupVariant(args);
  },
  argTypes: {
    variant: avatarGroupMeta?.argTypes?.variant
  },
  args: {
    variant: 'stack'
  }
};

export default meta;
type Story = StoryObj<AvatarGroupProps>;

export const Param: Story = {}