import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { PaginationPageSizeOptions, PaginationProps } from '../../pagination';
import paginationMeta from '../../pagination.stories';

const meta: Meta<PaginationProps> = {
  title: 'Pagination/Attributes/PageSize Options',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PaginationPageSizeOptions(args);
  },
  argTypes: {
    pageSizeOptions: paginationMeta?.argTypes?.pageSizeOptions
  },
  args: {
    pageSizeOptions: '10,20,30,40'
  }
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Param: Story = {}