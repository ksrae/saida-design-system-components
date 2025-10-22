import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarText, AvatarProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Attributes/Text',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarText(args);
  },
  argTypes: {
    text: avatarMeta?.argTypes?.text
  },
  args: {
    text: 'John Doe'
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}