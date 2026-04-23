import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BadgeStandalone } from '../../sy-badge.main';
import badgeMeta from '../../sy-badge.stories';

const meta: Meta = {
  title: 'Badge/Attributes/Standalone',
  component: 'sy-badge',
  tags: [],
  render: (args) => BadgeStandalone(args as { standalone: boolean }),
  argTypes: { standalone: badgeMeta?.argTypes?.standalone },
  args: { standalone: false },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
