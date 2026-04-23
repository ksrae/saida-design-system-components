import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepParentStatus } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Parent Status',
  component: 'sy-step',
  tags: [],
  render: (args) => StepParentStatus(args as { parentStatus: string }),
  argTypes: { parentStatus: stepMeta?.argTypes?.parentStatus },
  args: { parentStatus: 'none' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};