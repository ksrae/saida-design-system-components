import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepsCurrent } from '../../sy-steps.main';
import stepsMeta from '../../sy-steps.stories';

const meta: Meta = {
  title: 'Steps/Attributes/Current',
  component: 'sy-steps',
  tags: [],
  render: (args) => StepsCurrent(args as { current: number }),
  argTypes: { current: stepsMeta?.argTypes?.current },
  args: { current: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};