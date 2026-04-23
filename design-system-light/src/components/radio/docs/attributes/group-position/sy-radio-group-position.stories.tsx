import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupPosition } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/Position',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupPosition(args as { position: 'horizontal' | 'vertical' }),
  argTypes: { position: radioGroupMeta?.argTypes?.position },
  args: { position: 'vertical' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};