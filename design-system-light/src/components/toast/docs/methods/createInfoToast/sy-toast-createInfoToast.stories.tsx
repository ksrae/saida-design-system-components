import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastCreateInfoToast } from '../../sy-toast.main';

const meta: Meta = {
  title: 'Toast/Methods/CreateInfoToast',
  component: 'sy-toast',
  tags: [],
  render: () => ToastCreateInfoToast(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};