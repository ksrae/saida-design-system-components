import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ToastItemPosition } from '../../sy-toast-item.main';
import toastItemMeta from '../../sy-toast-item.stories';

const meta: Meta = {
  title: 'Toast/Item Attributes/Position',
  component: 'sy-toast-item',
  tags: [],
  render: (args) => ToastItemPosition(args as { position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' }),
  argTypes: { position: toastItemMeta?.argTypes?.position },
  args: { position: 'bottomRight' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};