import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessResizable } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Resizable',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessResizable(args as { resizable: boolean }),
  argTypes: { resizable: modelessMeta?.argTypes?.resizable },
  args: { resizable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};