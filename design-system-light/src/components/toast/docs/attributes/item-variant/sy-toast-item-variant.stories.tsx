import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ToastItemVariant } from '../../sy-toast-item.main';
import toastItemMeta from '../../sy-toast-item.stories';

const meta: Meta = {
  title: 'Toast/Item Attributes/Variant',
  component: 'sy-toast-item',
  tags: [],
  render: (args) => ToastItemVariant(args as { variant: 'neutral' | 'success' | 'error' | 'info' | 'warning' }),
  argTypes: { variant: toastItemMeta?.argTypes?.variant },
  args: { variant: 'neutral' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};