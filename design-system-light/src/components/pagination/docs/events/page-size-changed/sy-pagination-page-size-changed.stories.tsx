import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PaginationPageSizeChanged } from '../../sy-pagination.main';

const meta: Meta = {
  title: 'Pagination/Events/Page Size Changed',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationPageSizeChanged(args as {
    pageSizeOptions: string;
    pageSize: number;
    totalItems: number;
  }),
  argTypes: {
    pageSizeOptions: {
      control: 'text',
      description: 'Comma-separated list of page sizes shown in the dropdown',
      table: { category: 'Parameter', type: { summary: 'string' } },
    },
    pageSize: {
      control: 'number',
      description: 'Initial page size (must match an entry in pageSizeOptions to be pre-selected)',
      table: { category: 'Parameter', type: { summary: 'number' } },
    },
    totalItems: {
      control: 'number',
      description: 'Total item count used to compute the page count',
      table: { category: 'Parameter', type: { summary: 'number' } },
    },
  },
  args: {
    pageSizeOptions: '10,20,50,100',
    pageSize: 10,
    totalItems: 100,
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
