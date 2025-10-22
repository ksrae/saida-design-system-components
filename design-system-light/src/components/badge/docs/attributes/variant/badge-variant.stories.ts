import type { Meta, StoryObj } from '@storybook/web-components';
import { BadgeVariant, BadgeProps } from '../../badge';
import { clearElements } from '../../../../clear-element';
import badgeMeta from '../../badge.stories';

const meta: Meta<BadgeProps> = {
  title: 'Badge/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BadgeVariant(args);
  },
  argTypes: {
    variant: badgeMeta?.argTypes?.variant
  },
  args: {
    variant: 'red'
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Param: Story = {}