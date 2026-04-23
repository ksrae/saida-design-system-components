import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessMinWidth } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Min Width',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessMinWidth(args as { minWidth: number }),
  argTypes: { minWidth: modelessMeta?.argTypes?.minWidth },
  args: { minWidth: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};