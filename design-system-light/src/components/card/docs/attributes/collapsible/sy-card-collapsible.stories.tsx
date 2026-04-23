import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CardCollapsible } from '../../sy-card.main';
import cardMeta from '../../sy-card.stories';

const meta: Meta = {
  title: 'Card/Attributes/Collapsible',
  component: 'sy-card',
  tags: [],
  render: (args) => CardCollapsible(args as { collapsible: boolean }),
  argTypes: { collapsible: cardMeta?.argTypes?.collapsible },
  args: { collapsible: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
