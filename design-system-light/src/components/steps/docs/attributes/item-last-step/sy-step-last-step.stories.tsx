import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepLastStep } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Last Step',
  component: 'sy-step',
  tags: [],
  render: (args) => StepLastStep(args as { lastStep: boolean }),
  argTypes: { lastStep: stepMeta?.argTypes?.lastStep },
  args: { lastStep: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};