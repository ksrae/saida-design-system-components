import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressBarProps, ProgressBarSegment } from '../../progress-bar';
import progressBarMeta from '../../progress-bar.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressBarProps> = {
  title: 'ProgressBar/Attributes/Segment',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressBarSegment(args);
  },
  argTypes: {
    segment: progressBarMeta?.argTypes?.segment
  },
  args: {
    segment: `[
  {"percent": 50, "status": "default"}, 
  {"percent": 75, "status": "error"}, 
  {"percent": 100, "status": "complete"}, 
  
]`,
    percent: 100
  }
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Param: Story = {}