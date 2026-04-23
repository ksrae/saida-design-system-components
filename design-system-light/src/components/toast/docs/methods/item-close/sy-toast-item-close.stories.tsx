import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastItemClose } from '../../sy-toast-item.main';

const meta: Meta = {
  title: 'Toast/Item Methods/Close',
  component: 'sy-toast-item',
  tags: [],
  render: () => ToastItemClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};