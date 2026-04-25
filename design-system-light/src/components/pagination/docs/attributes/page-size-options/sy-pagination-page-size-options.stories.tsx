import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PaginationPageSizeOptions } from '../../sy-pagination.main';
import paginationMeta from '../../sy-pagination.stories';

const meta: Meta = {
  title: 'Pagination/Attributes/Page Size Options',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationPageSizeOptions(args as { pageSizeOptions: string }),
  argTypes: { pageSizeOptions: paginationMeta?.argTypes?.pageSizeOptions },
  args: { pageSizeOptions: '10,20,50' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};