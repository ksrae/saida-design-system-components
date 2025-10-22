import type { Meta, StoryObj } from '@storybook/web-components';
import { BadgePosition, BadgeProps } from '../../badge';
import { clearElements } from '../../../../clear-element';
import badgeMeta from '../../badge.stories';

const meta: Meta<BadgeProps> = {
  title: 'Badge/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BadgePosition(args);
  },
  argTypes: {
    position: badgeMeta?.argTypes?.position
  },
  args: {
    position: 'topRight'
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Param: Story = {}