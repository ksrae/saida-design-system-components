import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AvatarTooltipContent } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Tooltip Content',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarTooltipContent(args as { tooltipContent: string }),
  argTypes: {
    tooltipContent: avatarMeta?.argTypes?.tooltipContent,
  },
  args: {
    tooltipContent: 'Christina Davis',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
