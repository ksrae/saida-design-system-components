import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepsSize } from '../../sy-steps.main';
import stepsMeta from '../../sy-steps.stories';

const meta: Meta = {
  title: 'Steps/Attributes/Size',
  component: 'sy-steps',
  tags: [],
  render: (args) => StepsSize(args as { size: 'small' | 'medium' }),
  argTypes: { size: stepsMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};