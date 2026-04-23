import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BadgeHidden } from '../../sy-badge.main';
import badgeMeta from '../../sy-badge.stories';

const meta: Meta = {
  title: 'Badge/Attributes/Hidden',
  component: 'sy-badge',
  tags: [],
  render: (args) => BadgeHidden(args as { hidden: boolean }),
  argTypes: { hidden: badgeMeta?.argTypes?.hidden },
  args: { hidden: false },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
