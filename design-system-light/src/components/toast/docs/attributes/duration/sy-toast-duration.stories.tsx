import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastDuration } from '../../sy-toast.main';
import toastMeta from '../../sy-toast.stories';

const meta: Meta = {
  title: 'Toast/Attributes/Duration',
  component: 'sy-toast',
  tags: [],
  render: (args) => ToastDuration(args as { duration: number }),
  argTypes: { duration: toastMeta?.argTypes?.duration },
  args: { duration: 3000 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};