import type { Meta, StoryObj } from '@storybook/web-components';
import { BadgeProps, BadgeValue } from '../../badge';
import { clearElements } from '../../../../clear-element';
import badgeMeta from '../../badge.stories';

const meta: Meta<BadgeProps> = {
  title: 'Badge/Attributes/Value',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BadgeValue(args);
  },
  argTypes: {
    value: badgeMeta?.argTypes?.value
  },
  args: {
    value: 10
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Param: Story = {}