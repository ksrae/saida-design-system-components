import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyCardProps, Card } from './sy-card.main';
import { clearElements } from '../../clear-element';

const cardMeta: Meta<SyCardProps> = {
  title: 'Card/Overview',
  component: 'sy-card',
  tags: [],
  render: (args) => {
    clearElements(cardMeta.title);
    return Card(args);
  },
  argTypes: {
    collapsible: {
      control: 'boolean',
      description: 'Allows the card to be collapsed via a toggle icon in the header.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
    backdrop: {
      control: 'boolean',
      description: 'Applies a subtle backdrop/background styling to the card.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
    openDelay: {
      control: 'number',
      description: 'Delay in milliseconds before the card expands after the toggle is clicked.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' },
      },
    },
    closeDelay: {
      control: 'number',
      description: 'Delay in milliseconds before the card collapses after the toggle is clicked.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' },
      },
    },
    slotCover: {
      control: 'text',
      description: 'Slot="cover" content rendered at the top of the card.',
      table: { category: 'Parameter', defaultValue: { summary: '' } },
    },
    slotHeader: {
      control: 'text',
      description: 'Slot="header" content for the card header.',
      table: { category: 'Parameter', defaultValue: { summary: '' } },
    },
    slot: {
      control: 'text',
      description: 'Default slot content for card body.',
      table: { category: 'Parameter', defaultValue: { summary: '' } },
    },
    slotFooter: {
      control: 'text',
      description: 'Slot="footer" content for the card footer.',
      table: { category: 'Parameter', defaultValue: { summary: '' } },
    },
  },
};

export default cardMeta;
type Story = StoryObj<SyCardProps>;

export const Default: Story = {
  args: {
    collapsible: false,
    backdrop: false,
    slotHeader: `<div slot="header">Card title</div>`,
    slot: `<p>Card body content.</p>`,
    slotFooter: `<div slot="footer">Footer</div>`,
  },
};
