import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { PaginationPageChanged, PaginationProps } from '../../pagination';
import paginationMeta from '../../pagination.stories';

const meta: Meta<PaginationProps> = {
  title: 'Pagination/Events/Page Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PaginationPageChanged();
  },
  argTypes: {
    pageChanged: paginationMeta?.argTypes?.pageChanged
  },
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Param: Story = {}