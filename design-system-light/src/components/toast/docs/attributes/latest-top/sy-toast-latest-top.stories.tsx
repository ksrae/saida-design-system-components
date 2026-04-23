import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ToastLatestTop } from '../../sy-toast.main';
import toastMeta from '../../sy-toast.stories';

const meta: Meta = {
  title: 'Toast/Attributes/Latest Top',
  component: 'sy-toast',
  tags: [],
  render: (args) => ToastLatestTop(args as { latestTop: boolean }),
  argTypes: { latestTop: toastMeta?.argTypes?.latestTop },
  args: { latestTop: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};