import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessMinHeight } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Min Height',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessMinHeight(args as { minHeight: number }),
  argTypes: { minHeight: modelessMeta?.argTypes?.minHeight },
  args: { minHeight: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};