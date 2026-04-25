import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ToastCloseToast } from '../../sy-toast.main';

const meta: Meta = {
  title: 'Toast/Methods/CloseToast',
  component: 'sy-toast',
  tags: [],
  render: () => ToastCloseToast(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};