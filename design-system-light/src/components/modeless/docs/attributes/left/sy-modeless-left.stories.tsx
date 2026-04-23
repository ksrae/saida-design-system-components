import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessLeft } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Left',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessLeft(args as { left: number }),
  argTypes: { left: modelessMeta?.argTypes?.left },
  args: { left: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};