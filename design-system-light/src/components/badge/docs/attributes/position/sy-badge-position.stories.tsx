import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BadgePosition } from '../../sy-badge.main';
import badgeMeta from '../../sy-badge.stories';

const meta: Meta = {
  title: 'Badge/Attributes/Position',
  component: 'sy-badge',
  tags: [],
  render: (args) => BadgePosition(args as { position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' }),
  argTypes: { position: badgeMeta?.argTypes?.position },
  args: { position: 'topRight' },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
