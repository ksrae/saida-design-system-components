import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyPaginationProps, Pagination } from './sy-pagination.main';
import { clearElements } from '../../clear-element';

const paginationMeta: Meta<SyPaginationProps> = {
  title: 'Pagination/Overview',
  component: 'sy-pagination',
  tags: [],
  render: (args) => {
    clearElements(paginationMeta.title);
    return Pagination(args);
  },
  argTypes: {
    activePage: { control: 'number', name: 'activePage', description: 'Current active page.', table: { category: 'Parameter', defaultValue: { summary: 1 as any }, type: { summary: 'number' } } },
    disabled: { control: 'boolean', description: 'Disables controls.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    hideonSingle: { control: 'boolean', name: 'hideonSingle', description: 'Hides pagination when only one page.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    jumper: { control: 'boolean', description: 'Show go-to-page input.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    pageSize: { control: 'number', name: 'pageSize', description: 'Items per page.', table: { category: 'Parameter', defaultValue: { summary: 10 as any }, type: { summary: 'number' } } },
    pageSizeOptions: { control: 'text', name: 'pageSizeOptions', description: 'Comma-separated page size options.', table: { category: 'Parameter', type: { summary: 'string' } } },
    total: { control: 'boolean', description: 'Show total page display.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    totalItems: { control: 'number', name: 'totalItems', description: 'Total number of items.', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    pageChanged: { type: 'function', description: 'Emitted when the active page changes.', table: { category: 'Callback', type: { summary: `.addEventListener('pageChanged', (e) => {})` } } },
    pageSizeChanged: { type: 'function', description: 'Emitted when the page size changes.', table: { category: 'Callback', type: { summary: `.addEventListener('pageSizeChanged', (e) => {})` } } },
  },
};

export default paginationMeta;
type Story = StoryObj<SyPaginationProps>;

export const Default: Story = {
  args: { activePage: 1, disabled: false, hideonSingle: false, jumper: false, pageSize: 10, pageSizeOptions: '10,20,50', total: true, totalItems: 100 },
};
