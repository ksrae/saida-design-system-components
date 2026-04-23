import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BadgeValue } from '../../sy-badge.main';
import badgeMeta from '../../sy-badge.stories';

const meta: Meta = {
  title: 'Badge/Attributes/Value',
  component: 'sy-badge',
  tags: [],
  render: (args) => BadgeValue(args as { value: number }),
  argTypes: { value: badgeMeta?.argTypes?.value },
  args: { value: 5 },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
