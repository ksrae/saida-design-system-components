import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CardBackdrop } from '../../sy-card.main';
import cardMeta from '../../sy-card.stories';

const meta: Meta = {
  title: 'Card/Attributes/Backdrop',
  component: 'sy-card',
  tags: [],
  render: (args) => CardBackdrop(args as { backdrop: boolean }),
  argTypes: { backdrop: cardMeta?.argTypes?.backdrop },
  args: { backdrop: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
