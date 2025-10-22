import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { PaginationProps, PaginationTotal } from '../../pagination';
import paginationMeta from '../../pagination.stories';

const meta: Meta<PaginationProps> = {
  title: 'Pagination/Attributes/Total',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PaginationTotal(args);
  },
  argTypes: {
    total: paginationMeta?.argTypes?.total
  },
  args: {
    total: true
  }
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Param: Story = {}