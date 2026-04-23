import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressBarSegment } from '../../sy-progress-bar.main';
import progressBarMeta from '../../sy-progress-bar.stories';

const meta: Meta = {
  title: 'ProgressBar/Attributes/Segment',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => ProgressBarSegment(args as { segment: string }),
  argTypes: { segment: progressBarMeta?.argTypes?.segment },
  args: { segment: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};