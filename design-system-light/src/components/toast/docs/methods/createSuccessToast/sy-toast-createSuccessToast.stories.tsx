import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ToastCreateSuccessToast } from '../../sy-toast.main';

const meta: Meta = {
  title: 'Toast/Methods/CreateSuccessToast',
  component: 'sy-toast',
  tags: [],
  render: () => ToastCreateSuccessToast(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};