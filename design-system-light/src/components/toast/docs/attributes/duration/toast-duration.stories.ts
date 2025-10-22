import type { Meta, StoryObj } from '@storybook/web-components';
import { ToastProps, ToastDuration } from '../../toast';
import toastMeta from '../../toast.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ToastProps> = {
  title: 'ToastMessage/Attributes/Duration',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ToastDuration(args);
  },
  argTypes: {
    duration: toastMeta?.argTypes?.duration
  },
  args: {
    duration: 3000
  }
};

export default meta;
type Story = StoryObj<ToastProps>;

export const Param: Story = {}
