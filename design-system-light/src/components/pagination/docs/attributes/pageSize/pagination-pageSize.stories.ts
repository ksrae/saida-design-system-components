import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { PaginationPageSize, PaginationProps } from '../../pagination';
import paginationMeta from '../../pagination.stories';

const meta: Meta<PaginationProps> = {
  title: 'Pagination/Attributes/PageSize',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PaginationPageSize(args);
  },
  argTypes: {
    pageSize: paginationMeta?.argTypes?.pageSize
  },
  args: {
    pageSize: 10
  }
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Param: Story = {}