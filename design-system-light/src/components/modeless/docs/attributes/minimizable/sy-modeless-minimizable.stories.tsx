import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessMinimizable } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Minimizable',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessMinimizable(args as { minimizable: boolean }),
  argTypes: { minimizable: modelessMeta?.argTypes?.minimizable },
  args: { minimizable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};