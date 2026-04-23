import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PaginationPageSizeChanged } from '../../sy-pagination.main';

const meta: Meta = {
  title: 'Pagination/Events/Page Size Changed',
  component: 'sy-pagination',
  tags: [],
  render: () => PaginationPageSizeChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};