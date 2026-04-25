import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BadgeSize } from '../../sy-badge.main';
import badgeMeta from '../../sy-badge.stories';

const meta: Meta = {
  title: 'Badge/Attributes/Size',
  component: 'sy-badge',
  tags: [],
  render: (args) => BadgeSize(args as { size: 'small' | 'medium' }),
  argTypes: { size: badgeMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
