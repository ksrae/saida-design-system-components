import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessWidth } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Width',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessWidth(args as { width: number }),
  argTypes: { width: modelessMeta?.argTypes?.width },
  args: { width: 200 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};