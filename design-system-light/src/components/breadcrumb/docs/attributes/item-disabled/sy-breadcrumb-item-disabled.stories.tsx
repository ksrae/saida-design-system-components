import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BreadCrumbItem, SyBreadcrumbItemprops } from '../../sy-breadcrumb.main';

const meta: Meta = {
  title: 'Breadcrumb/Attributes/Item Disabled',
  component: 'sy-breadcrumb-item',
  tags: [],
  render: (args) => BreadCrumbItem(args as SyBreadcrumbItemprops),
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the breadcrumb.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    disabled: true,
    slot: 'item 1',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
