import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastCreateNeutralToast } from '../../sy-toast.main';

const meta: Meta = {
  title: 'Toast/Methods/CreateNeutralToast',
  component: 'sy-toast',
  tags: [],
  render: () => ToastCreateNeutralToast(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};