import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupVariant } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/Variant',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupVariant(args as { variant: 'outlined' | 'solid' }),
  argTypes: { variant: radioGroupMeta?.argTypes?.variant },
  args: { variant: 'solid' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};