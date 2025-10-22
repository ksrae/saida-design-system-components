import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarProps, AvatarSize } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarSize(args);
  },
  argTypes: {
    size: avatarMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}