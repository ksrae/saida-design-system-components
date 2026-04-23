import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PaginationJumper } from '../../sy-pagination.main';
import paginationMeta from '../../sy-pagination.stories';

const meta: Meta = {
  title: 'Pagination/Attributes/Jumper',
  component: 'sy-pagination',
  tags: [],
  render: (args) => PaginationJumper(args as { jumper: boolean }),
  argTypes: { jumper: paginationMeta?.argTypes?.jumper },
  args: { jumper: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};