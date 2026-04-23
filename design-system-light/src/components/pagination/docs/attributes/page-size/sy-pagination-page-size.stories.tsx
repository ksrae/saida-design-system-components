import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PaginationPageSize } from '../../sy-pagination.main';
import paginationMeta from '../../sy-pagination.stories';

const meta: Meta = {
  title: 'Pagination/Attributes/Page Size',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationPageSize(args as { pageSize: number }),
  argTypes: { pageSize: paginationMeta?.argTypes?.pageSize },
  args: { pageSize: 20 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};