import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BreadCrumbItemSeparator } from '../../sy-breadcrumb.main';

const meta: Meta = {
  title: 'Breadcrumb/Attributes/Item Separator',
  component: 'sy-breadcrumb-item',
  tags: [],
  render: (args) => BreadCrumbItemSeparator(args as { separator: 'slash' | 'arrow' }),
  argTypes: {
    separator: {
      control: 'radio',
      options: ['slash', 'arrow'],
      description:
        "Overrides the separator rendered AFTER this item. Try changing it on item 2 — only the separator between item 2 and item 3 changes, while the rest stay as the parent's `slash`.",
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'slash' },
        type: { summary: 'slash | arrow' },
      },
    },
  },
  args: {
    separator: 'arrow',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
