import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopoverPosition } from '../../sy-popover.main';
import popoverMeta from '../../sy-popover.stories';

const meta: Meta = {
  title: 'Popover/Attributes/Position',
  component: 'sy-popover',
  tags: [],
  render: (args) => PopoverPosition(args as { position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' }),
  argTypes: { position: popoverMeta?.argTypes?.position },
  args: { position: 'bottom' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};