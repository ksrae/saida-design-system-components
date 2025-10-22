import type { Meta, StoryObj } from '@storybook/web-components';
import { Pagination, PaginationProps } from './pagination';
import { clearElements } from '../../clear-element';

const paginationMeta: Meta<PaginationProps> = {
  title: 'Pagination/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(paginationMeta.title);
    return Pagination(args);
  },
  argTypes: {
    activePage: {
      control: 'number',
      name: 'activePage (active-page)',
      description: 'The current page. Pagination starts from 1.', 
      table: {
        category: 'Parameter',
        type: {summary :'number'},
        defaultValue: {summary: 1 as any},
      }      
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the pagination is disabled.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    hideonSingle: {
      control: 'boolean',
      name: 'hideonSingle (hideon-single)',
      description: 'Hide pagination when there is only one page.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    jumper: {
      control: 'boolean',
      description: 'If true, the option to jump to a page directly is displayed.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    pageSize: {
      control: 'number',
      name: 'pageSize (page-size)',
      description: 'The number of data items per page.', 
      table: {
        category: 'Parameter',
        type: {summary :'number'},
        defaultValue: {summary: 10 as any},
      }      
    },
    pageSizeOptions: {
      control: 'text',
      name: 'pageSizeOptions (page-size-options)',
      description: 'Set the page size options', // 이 인자의 설명
      table: {
        category: 'Parameter',
        defaultValue: {summary: '[' + ' ' + ']'},
        type: { summary: 'number[]' },
      },
    },
    total: {
      control: 'boolean',
      description: 'Determines whether the current page per total page count are visible',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    totalItems: {
      control: 'number',
      name: 'totalItems (total-items)',
      description: 'The total number of data items.', 
      table: {
        category: 'Parameter',
        type: {summary :'number'},
        defaultValue: {summary: 0 as any},
      }         
    },
    pageChanged: {
      type: 'function',
      description: 'Triggered when the current page changes.', 
      table: {
        category: 'callback',
        type: {
          summary: `.addEventListener('pageChanged', (e) => {})`,
        },
      }
    },
    pageSizeChanged: {
      type: 'function',
      description: 'Triggered when page size options change.', 
      table: {
        category: 'callback',
        type: {
          summary: `.addEventListener('pageSizeChanged', (e) => {})`,
        },
      }
    },
  },
};

export default paginationMeta;
type Story = StoryObj<PaginationProps>;


export const Default: Story = {
  args: {
    activePage: 1,
    disabled: false,
    hideonSingle: false,
    jumper: false,
    pageSize: 10,
    pageSizeOptions: '10, 20, 30, 40',
    total: false,
    totalItems: 300,
  },
  
  
}
