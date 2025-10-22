import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarClickable, AvatarProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Attributes/Clickable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarClickable(args);
  },
  argTypes: {
    clickable: avatarMeta?.argTypes?.clickable
  },
  args: {
    clickable: true
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}