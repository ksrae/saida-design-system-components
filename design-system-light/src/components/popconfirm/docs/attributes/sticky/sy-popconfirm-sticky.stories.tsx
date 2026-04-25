import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopconfirmSticky } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Sticky',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmSticky(args as { sticky: boolean }),
  argTypes: { sticky: popconfirmMeta?.argTypes?.sticky },
  args: { sticky: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};