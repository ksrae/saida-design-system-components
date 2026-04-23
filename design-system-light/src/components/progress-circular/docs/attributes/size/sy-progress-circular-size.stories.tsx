import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressCircularSize } from '../../sy-progress-circular.main';
import progressCircularMeta from '../../sy-progress-circular.stories';

const meta: Meta = {
  title: 'ProgressCircular/Attributes/Size',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => ProgressCircularSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: progressCircularMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};