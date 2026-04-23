import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepDisabled } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Disabled',
  component: 'sy-step',
  tags: [],
  render: (args) => StepDisabled(args as { disabled: boolean }),
  argTypes: { disabled: stepMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};