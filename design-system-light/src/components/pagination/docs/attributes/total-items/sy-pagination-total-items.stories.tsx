import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PaginationTotalItems } from '../../sy-pagination.main';
import paginationMeta from '../../sy-pagination.stories';

const meta: Meta = {
  title: 'Pagination/Attributes/Total Items',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationTotalItems(args as { totalItems: number }),
  argTypes: { totalItems: paginationMeta?.argTypes?.totalItems },
  args: { totalItems: 200 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};