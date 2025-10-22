import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { PaginationPageSizeChanged, PaginationProps } from '../../pagination';
import paginationMeta from '../../pagination.stories';

const meta: Meta<PaginationProps> = {
  title: 'Pagination/Events/PageSize Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PaginationPageSizeChanged();
  },
  argTypes: {
    pageSizeChanged: paginationMeta?.argTypes?.pageSizeChanged
  },
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Param: Story = {}