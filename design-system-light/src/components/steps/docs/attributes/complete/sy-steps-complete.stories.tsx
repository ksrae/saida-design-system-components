import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StepsComplete } from '../../sy-steps.main';
import stepsMeta from '../../sy-steps.stories';

const meta: Meta = {
  title: 'Steps/Attributes/Complete',
  component: 'sy-steps',
  tags: [],
  render: (args) => StepsComplete(args as { complete: boolean }),
  argTypes: { complete: stepsMeta?.argTypes?.complete },
  args: { complete: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};