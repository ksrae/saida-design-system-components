import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessTop } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Top',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessTop(args as { top: number }),
  argTypes: { top: modelessMeta?.argTypes?.top },
  args: { top: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};