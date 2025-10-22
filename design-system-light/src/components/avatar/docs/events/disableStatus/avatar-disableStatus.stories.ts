import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatarProps, AvatarDisableStatus } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Events/DisableStatus',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatarDisableStatus(args);
  },
  argTypes: {
    disabled: avatarMeta?.argTypes?.disabled,
    disableStatus: avatarMeta?.argTypes?.disableStatus
  },
  args: {
    disabled: false
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}