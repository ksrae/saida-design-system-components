import type { Meta, StoryObj } from '@storybook/web-components';
import { AvatartooltipContent, AvatarProps } from '../../avatar';
import { clearElements } from '../../../../clear-element';
import avatarMeta from '../../avatar.stories';

const meta: Meta<AvatarProps> = {
  title: 'Avatar/Attributes/TooltipContent',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AvatartooltipContent(args);
  },
  argTypes: {
    tooltipContent: avatarMeta?.argTypes?.tooltipContent
  },
  args: {
    tooltipContent: 'Tooltip content'
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Param: Story = {}