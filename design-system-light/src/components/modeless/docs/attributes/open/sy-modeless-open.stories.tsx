import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessOpen } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Open',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessOpen(args as { open: boolean }),
  argTypes: { open: modelessMeta?.argTypes?.open },
  args: { open: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};