import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StepsType } from '../../sy-steps.main';
import stepsMeta from '../../sy-steps.stories';

const meta: Meta = {
  title: 'Steps/Attributes/Type',
  component: 'sy-steps',
  tags: [],
  render: (args) => StepsType(args as { type: 'horizontal' | 'vertical' }),
  argTypes: { type: stepsMeta?.argTypes?.type },
  args: { type: 'horizontal' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};