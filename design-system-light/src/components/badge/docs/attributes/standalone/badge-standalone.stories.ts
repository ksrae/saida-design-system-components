import type { Meta, StoryObj } from '@storybook/web-components';
import { BadgeProps, BadgeStandalone } from '../../badge';
import { clearElements } from '../../../../clear-element';
import badgeMeta from '../../badge.stories';

const meta: Meta<BadgeProps> = {
  title: 'Badge/Attributes/Standalone',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BadgeStandalone(args);
  },
  argTypes: {
    standalone: badgeMeta?.argTypes?.standalone
  },
  args: {
    standalone: true
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Param: Story = {}