import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopconfirmCancelText } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Cancel Text',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmCancelText(args as { cancelText: string }),
  argTypes: { cancelText: popconfirmMeta?.argTypes?.cancelText },
  args: { cancelText: 'Cancel' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};