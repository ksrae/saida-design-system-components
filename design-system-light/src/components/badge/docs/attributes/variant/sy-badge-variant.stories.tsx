import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BadgeVariant } from '../../sy-badge.main';
import badgeMeta from '../../sy-badge.stories';

const meta: Meta = {
  title: 'Badge/Attributes/Variant',
  component: 'sy-badge',
  tags: [],
  render: (args) => BadgeVariant(args as { variant: 'red' | 'yellow' | 'green' | 'blue' | 'gray' }),
  argTypes: { variant: badgeMeta?.argTypes?.variant },
  args: { variant: 'red' },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
