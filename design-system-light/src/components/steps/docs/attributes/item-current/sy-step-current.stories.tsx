import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StepCurrent } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Current',
  component: 'sy-step',
  tags: [],
  render: (args) => StepCurrent(args as { current: number }),
  argTypes: { current: stepMeta?.argTypes?.current },
  args: { current: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};