import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastItemClosable } from '../../sy-toast-item.main';
import toastItemMeta from '../../sy-toast-item.stories';

const meta: Meta = {
  title: 'Toast/Item Attributes/Closable',
  component: 'sy-toast-item',
  tags: [],
  render: (args) => ToastItemClosable(args as { closable: boolean }),
  argTypes: { closable: toastItemMeta?.argTypes?.closable },
  args: { closable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};