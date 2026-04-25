import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ToastCreateErrorToast } from '../../sy-toast.main';

const meta: Meta = {
  title: 'Toast/Methods/CreateErrorToast',
  component: 'sy-toast',
  tags: [],
  render: () => ToastCreateErrorToast(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};