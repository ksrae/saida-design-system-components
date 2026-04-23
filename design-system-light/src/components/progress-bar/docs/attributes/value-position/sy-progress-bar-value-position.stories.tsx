import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressBarValuePosition } from '../../sy-progress-bar.main';
import progressBarMeta from '../../sy-progress-bar.stories';

const meta: Meta = {
  title: 'ProgressBar/Attributes/Value Position',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => ProgressBarValuePosition(args as { valuePosition: 'progress-left' | 'progress-center' | 'progress-right' | 'center' | 'left' | 'right' }),
  argTypes: { valuePosition: progressBarMeta?.argTypes?.valuePosition },
  args: { valuePosition: 'center' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};