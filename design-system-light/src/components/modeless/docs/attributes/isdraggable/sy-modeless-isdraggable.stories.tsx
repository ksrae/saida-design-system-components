import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessIsdraggable } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Isdraggable',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessIsdraggable(args as { isdraggable: boolean }),
  argTypes: { isdraggable: modelessMeta?.argTypes?.isdraggable },
  args: { isdraggable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};