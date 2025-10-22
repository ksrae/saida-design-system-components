import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarGroupClickable, AvatarGroupProps, AvatarProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarGroupMeta from '../../avatar-group.stories';

const meta: Meta<AvatarGroupProps> = {
  title: 'Avatar/Attributes/Group-Clickable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarGroupClickable(args);
  },
  argTypes: {
    clickable: avatarGroupMeta?.argTypes?.clickable
  },
  args: {
    clickable: true
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}