import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { LabelValue } from '../../sy-label.main';
import labelMeta from '../../sy-label.stories';

const meta: Meta = {
  title: 'Label/Attributes/Value',
  component: 'sy-label',
  tags: [],
  render: (args) => LabelValue(args as { value: string; valuePosition: 'left' | 'right' }),
  argTypes: {
    value: labelMeta?.argTypes?.value,
    valuePosition: labelMeta?.argTypes?.valuePosition,
  },
  args: { value: 'Label', valuePosition: 'left' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
