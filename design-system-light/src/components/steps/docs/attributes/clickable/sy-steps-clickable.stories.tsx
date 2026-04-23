import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { StepsClickable } from '../../sy-steps.main';
import stepsMeta from '../../sy-steps.stories';

const meta: Meta = {
  title: 'Steps/Attributes/Clickable',
  component: 'sy-steps',
  tags: [],
  render: (args) => StepsClickable(args as { clickable: boolean }),
  argTypes: { clickable: stepsMeta?.argTypes?.clickable },
  args: { clickable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};