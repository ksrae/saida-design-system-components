import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { LabelRequired } from '../../sy-label.main';
import labelMeta from '../../sy-label.stories';

const meta: Meta = {
  title: 'Label/Attributes/Required',
  component: 'sy-label',
  tags: [],
  render: (args) => LabelRequired(args as { required: boolean; requiredPosition: 'left' | 'right' }),
  argTypes: {
    required: labelMeta?.argTypes?.required,
    requiredPosition: labelMeta?.argTypes?.requiredPosition,
  },
  args: { required: true, requiredPosition: 'right' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
