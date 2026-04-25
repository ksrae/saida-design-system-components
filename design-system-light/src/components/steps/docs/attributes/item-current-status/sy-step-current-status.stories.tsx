import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StepCurrentStatus } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Current Status',
  component: 'sy-step',
  tags: [],
  render: (args) => StepCurrentStatus(args as { currentStatus: string }),
  argTypes: { currentStatus: stepMeta?.argTypes?.currentStatus },
  args: { currentStatus: 'none' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};