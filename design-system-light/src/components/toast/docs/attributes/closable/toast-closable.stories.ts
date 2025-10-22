import type { Meta, StoryObj } from '@storybook/web-components';
import { ToastProps, ToastClosable } from '../../toast';
import toastMeta from '../../toast.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ToastProps> = {
  title: 'ToastMessage/Attributes/Closable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ToastClosable(args);
  },
  argTypes: {
    closable: toastMeta?.argTypes?.closable
  },
  args: {
    closable: true
  }
};

export default meta;
type Story = StoryObj<ToastProps>;

export const Param: Story = {}
