import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SwitchSize } from '../../sy-switch.main';
import switchMeta from '../../sy-switch.stories';

const meta: Meta = {
  title: 'Switch/Attributes/Size',
  component: 'sy-switch',
  tags: [],
  render: (args) => SwitchSize(args as { size: 'small' | 'medium' }),
  argTypes: { size: switchMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};