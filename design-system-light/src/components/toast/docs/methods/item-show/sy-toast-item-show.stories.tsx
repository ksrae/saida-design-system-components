import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastItemShow } from '../../sy-toast-item.main';

const meta: Meta = {
  title: 'Toast/Item Methods/Show',
  component: 'sy-toast-item',
  tags: [],
  render: () => ToastItemShow(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};