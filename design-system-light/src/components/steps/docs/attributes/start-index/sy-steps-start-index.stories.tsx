import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepsStartIndex } from '../../sy-steps.main';
import stepsMeta from '../../sy-steps.stories';

const meta: Meta = {
  title: 'Steps/Attributes/Start Index',
  component: 'sy-steps',
  tags: [],
  render: (args) => StepsStartIndex(args as { startIndex: number }),
  argTypes: { startIndex: stepsMeta?.argTypes?.startIndex },
  args: { startIndex: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};