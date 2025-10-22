import type { Meta, StoryObj } from '@storybook/web-components';
import { ToastProps, ToastClosable, ToastLatestTop } from '../../toast';
import toastMeta from '../../toast.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ToastProps> = {
  title: 'ToastMessage/Attributes/LatestTop',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ToastLatestTop(args);
  },
  argTypes: {
    latestTop: toastMeta?.argTypes?.latestTop
  },
  args: {
    latestTop: true
  }
};

export default meta;
type Story = StoryObj<ToastProps>;

export const Param: Story = {}
