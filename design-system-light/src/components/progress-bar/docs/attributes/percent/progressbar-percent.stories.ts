import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressBarPercent, ProgressBarProps } from '../../progress-bar';
import progressBarMeta from '../../progress-bar.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressBarProps> = {
  title: 'ProgressBar/Attributes/Percent',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressBarPercent(args);
  },
  argTypes: {
    percent: progressBarMeta?.argTypes?.percent
  },
  args: {
    percent: 50
  }
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Param: Story = {}