import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupSize } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/Size',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: radioGroupMeta?.argTypes?.size },
  args: { size: 'large' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};