import type { Meta, StoryObj } from '@storybook/web-components';
import { BadgeDot, BadgeProps } from '../../badge';
import { clearElements } from '../../../../clear-element';
import badgeMeta from '../../badge.stories';

const meta: Meta<BadgeProps> = {
  title: 'Badge/Attributes/Dot',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BadgeDot(args);
  },
  argTypes: {
    dot: badgeMeta?.argTypes?.dot
  },
  args: {
    dot: true
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Param: Story = {}