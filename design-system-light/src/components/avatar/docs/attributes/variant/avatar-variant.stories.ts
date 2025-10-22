import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarVariant, AvatarProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarVariant(args);
  },
  argTypes: {
    variant: avatarMeta?.argTypes?.variant
  },
  args: {
    variant: 'purple'
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}