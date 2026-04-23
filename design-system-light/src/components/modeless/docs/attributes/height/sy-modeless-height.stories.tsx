import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessHeight } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Height',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessHeight(args as { height: number }),
  argTypes: { height: modelessMeta?.argTypes?.height },
  args: { height: 150 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};