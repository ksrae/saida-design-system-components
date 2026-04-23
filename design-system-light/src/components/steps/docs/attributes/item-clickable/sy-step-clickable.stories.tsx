import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepClickable } from '../../sy-step.main';
import stepMeta from '../../sy-step.stories';

const meta: Meta = {
  title: 'Steps/Item Attributes/Clickable',
  component: 'sy-step',
  tags: [],
  render: (args) => StepClickable(args as { clickable: boolean }),
  argTypes: { clickable: stepMeta?.argTypes?.clickable },
  args: { clickable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};