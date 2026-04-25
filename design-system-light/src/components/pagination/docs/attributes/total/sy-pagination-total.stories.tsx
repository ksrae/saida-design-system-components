import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PaginationTotal } from '../../sy-pagination.main';
import paginationMeta from '../../sy-pagination.stories';

const meta: Meta = {
  title: 'Pagination/Attributes/Total',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationTotal(args as { total: boolean }),
  argTypes: { total: paginationMeta?.argTypes?.total },
  args: { total: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};