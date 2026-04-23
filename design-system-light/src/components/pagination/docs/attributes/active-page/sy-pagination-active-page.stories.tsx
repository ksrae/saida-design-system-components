import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PaginationActivePage } from '../../sy-pagination.main';
import paginationMeta from '../../sy-pagination.stories';

const meta: Meta = {
  title: 'Pagination/Attributes/Active Page',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationActivePage(args as { activePage: number }),
  argTypes: { activePage: paginationMeta?.argTypes?.activePage },
  args: { activePage: 3 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};