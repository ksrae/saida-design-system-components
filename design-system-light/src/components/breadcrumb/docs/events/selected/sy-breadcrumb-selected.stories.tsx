import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BreadCrumbSelected } from '../../sy-breadcrumb.main';

const meta: Meta = {
  title: 'Breadcrumb/Events/Selected',
  component: 'sy-breadcrumb',
  tags: [],
  render: () => BreadCrumbSelected(),
  argTypes: {},
  args: {},
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
