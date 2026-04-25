import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StepSize } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Size',
  component: 'sy-step',
  tags: [],
  render: (args) => StepSize(args as { size: 'small' | 'medium' }),
  argTypes: { size: stepMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};