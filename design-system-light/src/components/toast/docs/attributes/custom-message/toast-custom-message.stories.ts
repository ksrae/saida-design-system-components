import type { Meta, StoryObj } from '@storybook/web-components';
import { ToastCustomMessage, ToastProps } from '../../toast';
import toastMeta from '../../toast.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ToastProps> = {
  title: 'ToastMessage/Attributes/CustomMessage',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ToastCustomMessage();
  },
  argTypes: {
    // variant: toastMeta?.argTypes?.variant
  },
};

export default meta;
type Story = StoryObj<ToastProps>;

export const Param: Story = {}
