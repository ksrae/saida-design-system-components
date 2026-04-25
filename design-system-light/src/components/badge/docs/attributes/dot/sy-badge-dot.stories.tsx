import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BadgeDot } from '../../sy-badge.main';
import badgeMeta from '../../sy-badge.stories';

const meta: Meta = {
  title: 'Badge/Attributes/Dot',
  component: 'sy-badge',
  tags: [],
  render: (args) => BadgeDot(args as { dot: boolean }),
  argTypes: { dot: badgeMeta?.argTypes?.dot },
  args: { dot: true },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
