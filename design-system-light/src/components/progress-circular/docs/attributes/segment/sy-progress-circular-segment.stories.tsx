import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ProgressCircularSegment } from '../../sy-progress-circular.main';
import progressCircularMeta from '../../sy-progress-circular.stories';

const meta: Meta = {
  title: 'ProgressCircular/Attributes/Segment',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => ProgressCircularSegment(args as { segment: string }),
  argTypes: { segment: progressCircularMeta?.argTypes?.segment },
  args: {
    // Sample segment string so users see immediately what the prop draws.
    // Format mirrors the bar variant: a JSON array of { percent, status }
    // where percent is the cumulative end position of the band and status
    // is 'default' | 'error' | 'complete'.
    segment: '[{"percent":40,"status":"complete"},{"percent":80,"status":"error"},{"percent":100,"status":"default"}]',
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};