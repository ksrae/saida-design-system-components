import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BreadCrumbItemSelected } from '../../sy-breadcrumb.main';

const meta: Meta = {
  title: 'Breadcrumb/Events/Item Selected',
  component: 'sy-breadcrumb-item',
  tags: [],
  render: () => BreadCrumbItemSelected(),
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
