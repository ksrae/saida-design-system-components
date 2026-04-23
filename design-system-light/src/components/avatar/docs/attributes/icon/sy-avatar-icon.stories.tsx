import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AvatarIcon } from '../../sy-avatar.main';
import avatarMeta from '../../sy-avatar.stories';

const meta: Meta = {
  title: 'Avatar/Attributes/Icon',
  component: 'sy-avatar',
  tags: [],
  render: (args) => AvatarIcon(args as { icon: string }),
  argTypes: {
    icon: avatarMeta?.argTypes?.icon,
  },
  args: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1z"/></svg>`,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
