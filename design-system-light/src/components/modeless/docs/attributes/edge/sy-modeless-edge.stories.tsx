import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessEdge } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Edge',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessEdge(args as { edge: boolean }),
  argTypes: { edge: modelessMeta?.argTypes?.edge },
  args: { edge: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};