import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyBreadcrumbProps, BreadCrumb } from './sy-breadcrumb.main';
import { h } from '@stencil/core';
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
      description: 'Changes the separator type.',
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
      description: 'Triggered when the breadcrumb is selected.',
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

