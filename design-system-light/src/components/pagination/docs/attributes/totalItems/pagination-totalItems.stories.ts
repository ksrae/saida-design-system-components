import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { PaginationTotalItems, PaginationProps } from '../../pagination';
import paginationMeta from '../../pagination.stories';

const meta: Meta<PaginationProps> = {
  title: 'Pagination/Attributes/Total Items',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PaginationTotalItems(args);
  },
  argTypes: {
    totalItems: paginationMeta?.argTypes?.totalItems
  },
  args: {
    totalItems: 100
  }
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Param: Story = {}