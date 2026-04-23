import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressBarPercent } from '../../sy-progress-bar.main';
import progressBarMeta from '../../sy-progress-bar.stories';

const meta: Meta = {
  title: 'ProgressBar/Attributes/Percent',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => ProgressBarPercent(args as { percent: number }),
  argTypes: { percent: progressBarMeta?.argTypes?.percent },
  args: { percent: 50 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};