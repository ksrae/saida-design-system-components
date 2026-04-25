import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopconfirmArrow } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Arrow',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmArrow(args as { arrow: boolean }),
  argTypes: { arrow: popconfirmMeta?.argTypes?.arrow },
  args: { arrow: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};