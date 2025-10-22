import type { Meta, StoryObj } from '@storybook/web-components';
import { ToastProps, ToastPosition } from '../../toast';
import toastMeta from '../../toast.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ToastProps> = {
  title: 'ToastMessage/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ToastPosition(args);
  },
  argTypes: {
    position: toastMeta?.argTypes?.position
  },
  args: {
    position: 'bottomRight'
  }
};

export default meta;
type Story = StoryObj<ToastProps>;

export const Param: Story = {}
