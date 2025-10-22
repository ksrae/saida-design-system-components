import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarGroupProps, AvatarGroupSize } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../avatar-group.stories';
import avatarGroupMeta from '../../avatar-group.stories';

const meta: Meta<AvatarGroupProps> = {
  title: 'Avatar/Attributes/Group-Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarGroupSize(args);
  },
  argTypes: {
    size: avatarGroupMeta?.argTypes?.size
  },
  args: {
    size: 'medium',
  }
};

export default meta;
type Story = StoryObj<AvatarGroupProps>;

export const Param: Story = {}