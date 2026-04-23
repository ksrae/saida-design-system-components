import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PaginationPageChanged } from '../../sy-pagination.main';

const meta: Meta = {
  title: 'Pagination/Events/Page Changed',
  component: 'sy-pagination',
  tags: [],
  render: () => PaginationPageChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};