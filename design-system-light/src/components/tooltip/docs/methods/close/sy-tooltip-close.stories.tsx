import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TooltipClose } from '../../sy-tooltip.main';

const meta: Meta = {
  title: 'Tooltip/Methods/Close',
  component: 'sy-tooltip',
  tags: [],
  render: () => TooltipClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};