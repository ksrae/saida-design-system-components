import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarDisabled, AvatarProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarDisabled(args);
  },
  argTypes: {
    disabled: avatarMeta?.argTypes?.disabled
  },
  args: {
    disabled: true,
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}