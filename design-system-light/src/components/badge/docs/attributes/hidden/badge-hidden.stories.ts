import type { Meta, StoryObj } from '@storybook/web-components';
import { BadgeHidden, BadgeProps } from '../../badge';
import { clearElements } from '../../../../clear-element';
import badgeMeta from '../../badge.stories';

const meta: Meta<BadgeProps> = {
  title: 'Badge/Attributes/Hidden',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BadgeHidden(args);
  },
  argTypes: {
    hidden: badgeMeta?.argTypes?.hidden
  },
  args: {
    hidden: true
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Param: Story = {}