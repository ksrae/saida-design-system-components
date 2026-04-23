import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopconfirmPosition } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Position',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmPosition(args as { position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' }),
  argTypes: { position: popconfirmMeta?.argTypes?.position },
  args: { position: 'bottom' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};