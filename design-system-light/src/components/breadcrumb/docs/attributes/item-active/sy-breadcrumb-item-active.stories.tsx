import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BreadCrumbItem, SyBreadcrumbItemprops } from '../../sy-breadcrumb.main';

const meta: Meta = {
  title: 'Breadcrumb/Attributes/Item Active',
  component: 'sy-breadcrumb-item',
  tags: [],
  render: (args) => BreadCrumbItem(args as SyBreadcrumbItemprops),
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Sets active style.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    active: true,
    slot: 'item 1',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
