import type { Meta, StoryObj } from '@storybook/web-components';
import { BadgeOverflowCount, BadgeProps } from '../../badge';
import { clearElements } from '../../../../clear-element';
import badgeMeta from '../../badge.stories';

const meta: Meta<BadgeProps> = {
  title: 'Badge/Attributes/OverflowCount',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BadgeOverflowCount(args);
  },
  argTypes: {
    overflowCount: badgeMeta?.argTypes?.overflowCount,
    value: badgeMeta?.argTypes?.value,
  },
  args: {
    value: 10,
    overflowCount: 9
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Param: Story = {}