import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarLetter, AvatarProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Attributes/Letter',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarLetter(args);
  },
  argTypes: {
    letter: avatarMeta?.argTypes?.letter
  },
  args: {
    letter: 'AB'
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}