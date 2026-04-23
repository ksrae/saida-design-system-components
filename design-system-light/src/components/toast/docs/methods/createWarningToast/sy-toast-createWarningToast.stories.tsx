import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastCreateWarningToast } from '../../sy-toast.main';

const meta: Meta = {
  title: 'Toast/Methods/CreateWarningToast',
  component: 'sy-toast',
  tags: [],
  render: () => ToastCreateWarningToast(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};