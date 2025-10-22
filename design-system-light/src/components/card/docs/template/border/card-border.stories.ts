import type { Meta, StoryObj } from '@storybook/web-components';
import { CardProps, CardBorder } from '../../card';
import cardMeta from '../../card.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<CardProps> = {
  title: 'Card/Template/Border',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CardBorder();
  },
  argTypes: {
    
  },
  args: {
    
  }
};

export default meta;
type Story = StoryObj<CardProps>;

export const Param: Story = {}
