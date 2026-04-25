import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BadgeOverflowCount } from '../../sy-badge.main';
import badgeMeta from '../../sy-badge.stories';

const meta: Meta = {
  title: 'Badge/Attributes/Overflow Count',
  component: 'sy-badge',
  tags: [],
  render: (args) => BadgeOverflowCount(args as { overflowCount: number; value: number }),
  argTypes: {
    overflowCount: badgeMeta?.argTypes?.overflowCount,
    value: badgeMeta?.argTypes?.value,
  },
  args: {
    overflowCount: 99,
    value: 120,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
