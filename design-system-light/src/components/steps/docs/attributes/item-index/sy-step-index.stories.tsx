import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepIndex } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Index',
  component: 'sy-step',
  tags: [],
  render: (args) => StepIndex(args as { index: number }),
  argTypes: { index: stepMeta?.argTypes?.index },
  args: { index: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};