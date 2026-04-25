import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StepSmall } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Small',
  component: 'sy-step',
  tags: [],
  render: (args) => StepSmall(args as { small: boolean }),
  argTypes: { small: stepMeta?.argTypes?.small },
  args: { small: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};