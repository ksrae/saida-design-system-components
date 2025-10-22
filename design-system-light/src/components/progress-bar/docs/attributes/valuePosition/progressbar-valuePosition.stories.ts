import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressBarProps, ProgressBarValuePosition } from '../../progress-bar';
import progressBarMeta from '../../progress-bar.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressBarProps> = {
  title: 'ProgressBar/Attributes/Value Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressBarValuePosition(args);
  },
  argTypes: {
    valuePosition: progressBarMeta?.argTypes?.valuePosition,
    percent: progressBarMeta?.argTypes?.percent
  },
  args: {
    valuePosition: 'center',
    percent: 50
  }
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Param: Story = {}