import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatartooltipContent } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Tooltip Content',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatartooltipContent(args as { tooltipContent: string }),
  argTypes: {
    tooltipContent: avatarMeta?.argTypes?.tooltipContent,
  },
  args: {
    tooltipContent: 'tooltip',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
