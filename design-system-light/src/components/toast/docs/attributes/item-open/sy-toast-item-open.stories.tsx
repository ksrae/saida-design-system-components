import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ToastItemOpen } from '../../sy-toast-item.main';
import toastItemMeta from '../../sy-toast-item.stories';

const meta: Meta = {
  title: 'Toast/Item Attributes/Open',
  component: 'sy-toast-item',
  tags: [],
  render: (args) => ToastItemOpen(args as { open: boolean }),
  argTypes: { open: toastItemMeta?.argTypes?.open },
  args: { open: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};