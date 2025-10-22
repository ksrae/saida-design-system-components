import type { Meta, StoryObj } from '@storybook/web-components';
import { BadgeProps, BadgeSize } from '../../badge';
import { clearElements } from '../../../../clear-element';
import badgeMeta from '../../badge.stories';

const meta: Meta<BadgeProps> = {
  title: 'Badge/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BadgeSize(args);
  },
  argTypes: {
    size: badgeMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Param: Story = {}