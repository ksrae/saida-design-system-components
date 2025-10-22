import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarProps, AvatarSelected } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return AvatarSelected();
  },
  argTypes: {
    selected: avatarMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}