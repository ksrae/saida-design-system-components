import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ToastCreateToast } from '../../sy-toast.main';

const meta: Meta = {
  title: 'Toast/Methods/CreateToast',
  component: 'sy-toast',
  tags: [],
  render: () => ToastCreateToast(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};