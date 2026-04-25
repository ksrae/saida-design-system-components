import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StepLoading } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Loading',
  component: 'sy-step',
  tags: [],
  render: (args) => StepLoading(args as { loading: boolean }),
  argTypes: { loading: stepMeta?.argTypes?.loading },
  args: { loading: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};