import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepStatus } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Status',
  component: 'sy-step',
  tags: [],
  render: (args) => StepStatus(args as { status: string }),
  argTypes: { status: stepMeta?.argTypes?.status },
  args: { status: 'current' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};