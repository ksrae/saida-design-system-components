import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastItemDuration } from '../../sy-toast-item.main';
import toastItemMeta from '../../sy-toast-item.stories';

const meta: Meta = {
  title: 'Toast/Item Attributes/Duration',
  component: 'sy-toast-item',
  tags: [],
  render: (args) => ToastItemDuration(args as { duration: number }),
  argTypes: { duration: toastItemMeta?.argTypes?.duration },
  args: { duration: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};