import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatarSelected } from '../../sy-avatar.main';

const meta: Meta = {
  title: 'Avatar/Events/Selected',
  component: 'sy-avatar',
  tags: [],
  render: () => AvatarSelected(),
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
