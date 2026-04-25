import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyBreadcrumbProps, BreadCrumb } from './sy-breadcrumb.main';
import { clearElements } from '../../clear-element';

const breadcrumbMeta: Meta<SyBreadcrumbProps> = {
  title: 'Breadcrumb/Overview',
  component: 'sy-breadcrumb',
  tags: [],
  render: (args) => {
    clearElements(breadcrumbMeta.title);
    return BreadCrumb(args);
  },
  argTypes: {
    separator: {
      control: 'radio',
      options : ['slash', 'arrow'],
      description: 'Changes the separator type of the breadcrumb.',
      table: {
        category: 'Parameter',
        defaultValue : {summary: 'slash'},
        type: { summary: 'slash | arrow' }
      }
    },
    slot: {
      control: 'text',
      description: 'Breadcrumb items as slot elements.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    selected: {
      type: 'function',
      description: 'Triggered when a breadcrumb item is selected. Bubbles from `<sy-breadcrumb-item>`.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      }
    },
  },
};

export default breadcrumbMeta;

type Story = StoryObj<SyBreadcrumbProps>;

export const Default: Story = {
  args: {
    separator: 'slash',
    slot: `
      <sy-breadcrumb-item>Home</sy-breadcrumb-item>
      <sy-breadcrumb-item>Products</sy-breadcrumb-item>
      <sy-breadcrumb-item active>Current Page</sy-breadcrumb-item>
    `,
  },
};

