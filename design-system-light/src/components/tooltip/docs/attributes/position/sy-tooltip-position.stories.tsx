import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TooltipPosition } from '../../sy-tooltip.main';
import tooltipMeta from '../../sy-tooltip.stories';

const meta: Meta = {
  title: 'Tooltip/Attributes/Position',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => TooltipPosition(args as { position: 'top' | 'topLeft' | 'topRight' | 'right' | 'rightTop' | 'rightBottom' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' }),
  argTypes: { position: tooltipMeta?.argTypes?.position },
  args: { position: 'top' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};