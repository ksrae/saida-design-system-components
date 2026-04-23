import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopconfirmConfirmText } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Confirm Text',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmConfirmText(args as { confirmText: string }),
  argTypes: { confirmText: popconfirmMeta?.argTypes?.confirmText },
  args: { confirmText: 'Confirm' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};