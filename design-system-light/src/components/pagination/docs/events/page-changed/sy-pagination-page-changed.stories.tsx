import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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