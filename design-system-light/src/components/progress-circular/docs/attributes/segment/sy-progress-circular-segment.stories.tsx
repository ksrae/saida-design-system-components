import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressCircularSegment } from '../../sy-progress-circular.main';
import progressCircularMeta from '../../sy-progress-circular.stories';

const meta: Meta = {
  title: 'ProgressCircular/Attributes/Segment',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => ProgressCircularSegment(args as { segment: string }),
  argTypes: { segment: progressCircularMeta?.argTypes?.segment },
  args: { segment: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};