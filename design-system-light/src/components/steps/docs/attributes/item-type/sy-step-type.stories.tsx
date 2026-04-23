import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepType } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Type',
  component: 'sy-step',
  tags: [],
  render: (args) => StepType(args as { type: 'horizontal' | 'vertical' }),
  argTypes: { type: stepMeta?.argTypes?.type },
  args: { type: 'horizontal' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};