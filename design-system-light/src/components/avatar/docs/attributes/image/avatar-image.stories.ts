import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarImage, AvatarProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Attributes/Image',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarImage(args);
  },
  argTypes: {
    image: avatarMeta?.argTypes?.image
  },
  args: {
    image: 'avatar_default.png'
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}