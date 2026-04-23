import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepDescription } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Description',
  component: 'sy-step',
  tags: [],
  render: (args) => StepDescription(args as { description: string }),
  argTypes: { description: stepMeta?.argTypes?.description },
  args: { description: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};