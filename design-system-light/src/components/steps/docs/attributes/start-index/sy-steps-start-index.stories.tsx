import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StepsStartIndex } from '../../sy-steps.main';
import stepsMeta from '../../sy-steps.stories';

const meta: Meta = {
  title: 'Steps/Attributes/Start Index',
  component: 'sy-steps',
  tags: [],
  render: (args) => StepsStartIndex(args as { startIndex: number; current: number }),
  argTypes: {
    startIndex: stepsMeta?.argTypes?.startIndex,
    current: stepsMeta?.argTypes?.current,
  },
  args: { startIndex: 0, current: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};