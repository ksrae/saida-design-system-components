import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PaginationHideonSingle } from '../../sy-pagination.main';
import paginationMeta from '../../sy-pagination.stories';

const meta: Meta = {
  title: 'Pagination/Attributes/Hideon Single',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationHideonSingle(args as { hideonSingle: boolean; totalItems: number; pageSize: number }),
  // Expose `totalItems` and `pageSize` so the user can drive the page count
  // above or below 1 and confirm `hideonSingle` hides the bar exactly on a
  // single-page result.
  argTypes: {
    hideonSingle: paginationMeta?.argTypes?.hideonSingle,
    totalItems: {
      control: 'number',
      description: 'Total number of items. Combined with `pageSize` drives the computed page count.',
      table: { category: 'Parameter', defaultValue: { summary: 5 as any }, type: { summary: 'number' } },
    },
    pageSize: {
      control: 'number',
      description: 'Items per page. `pageCount = ceil(totalItems / pageSize)`.',
      table: { category: 'Parameter', defaultValue: { summary: 10 as any }, type: { summary: 'number' } },
    },
  },
  args: { hideonSingle: true, totalItems: 5, pageSize: 10 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};