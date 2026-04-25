import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessDraggable } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Draggable',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessDraggable(args as { draggable: boolean }),
  argTypes: { draggable: modelessMeta?.argTypes?.draggable },
  args: { draggable: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};