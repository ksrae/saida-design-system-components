import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressCircularProps, ProgressCircularSegment } from '../../progress-circular';
import progressCircularMeta from '../../progress-circular.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressCircularProps> = {
  title: 'ProgressCircular/Attributes/Segment',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressCircularSegment(args);
  },
  argTypes: {
    segment: progressCircularMeta?.argTypes?.segment,
    percent: progressCircularMeta?.argTypes?.percent,
  },
  args: {
    segment: `[
      {"percent": 33, "status": "default"}, 
      {"percent": 67, "status": "error"}, 
      {"percent": 100, "status": "complete"}
    ]`,
    percent: 100
  }
};

export default meta;
type Story = StoryObj<ProgressCircularProps>;

export const Param: Story = {}