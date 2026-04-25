import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopconfirmClosable } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Closable',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmClosable(args as { closable: boolean }),
  argTypes: { closable: popconfirmMeta?.argTypes?.closable },
  args: { closable: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};