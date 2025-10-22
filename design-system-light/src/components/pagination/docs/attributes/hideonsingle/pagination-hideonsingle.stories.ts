import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { PaginationHideonSingle, PaginationProps } from '../../pagination';
import paginationMeta from '../../pagination.stories';

const meta: Meta<PaginationProps> = {
  title: 'Pagination/Attributes/HideonSingle',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PaginationHideonSingle(args);
  },
  argTypes: {
    hideonSingle: paginationMeta?.argTypes?.hideonSingle
  },
  args: {
    hideonSingle: false
  }
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Param: Story = {}