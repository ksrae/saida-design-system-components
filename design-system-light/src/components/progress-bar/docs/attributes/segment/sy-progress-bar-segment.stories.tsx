import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ProgressBarSegment } from '../../sy-progress-bar.main';
import progressBarMeta from '../../sy-progress-bar.stories';

const meta: Meta = {
  title: 'ProgressBar/Attributes/Segment',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => ProgressBarSegment(args as { segment: string }),
  argTypes: { segment: progressBarMeta?.argTypes?.segment },
  args: {
    // Sample segment string so users can immediately see the rendered
    // bands. Edit in the Controls panel — the format is a JSON array of
    // { percent, status } where percent is the cumulative end position of
    // the band and status is 'default' | 'error' | 'complete'.
    segment: '[{"percent":30,"status":"complete"},{"percent":70,"status":"error"}]',
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};