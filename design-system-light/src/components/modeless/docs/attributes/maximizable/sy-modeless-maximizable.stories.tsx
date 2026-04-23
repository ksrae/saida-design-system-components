import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessMaximizable } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Maximizable',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessMaximizable(args as { maximizable: boolean }),
  argTypes: { maximizable: modelessMeta?.argTypes?.maximizable },
  args: { maximizable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};