import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessMaximum } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Maximum',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessMaximum(args as { maximum: boolean }),
  argTypes: { maximum: modelessMeta?.argTypes?.maximum },
  args: { maximum: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};