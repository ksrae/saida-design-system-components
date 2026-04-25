import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PaginationDisabled } from '../../sy-pagination.main';
import paginationMeta from '../../sy-pagination.stories';

const meta: Meta = {
  title: 'Pagination/Attributes/Disabled',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationDisabled(args as { disabled: boolean }),
  argTypes: { disabled: paginationMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};