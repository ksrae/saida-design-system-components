import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarGroupMaxCount, AvatarGroupProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarGroupMeta from '../../avatar-group.stories';

const meta: Meta<AvatarGroupProps> = {
  title: 'Avatar/Attributes/Group-MaxCount',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarGroupMaxCount(args);
  },
  argTypes: {
    maxCount: avatarGroupMeta?.argTypes?.maxCount
  },
  args: {
    maxCount: 3
  }
};

export default meta;
type Story = StoryObj<AvatarGroupProps>;

export const Param: Story = {}