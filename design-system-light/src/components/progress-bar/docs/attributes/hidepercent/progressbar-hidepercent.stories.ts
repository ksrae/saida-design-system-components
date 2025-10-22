import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressBarHidepercent, ProgressBarProps } from '../../progress-bar';
import progressBarMeta from '../../progress-bar.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressBarProps> = {
  title: 'ProgressBar/Attributes/Hide Percent',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressBarHidepercent(args);
  },
  argTypes: {
    hidePercent: progressBarMeta?.argTypes?.hidePercent
  },
  args: {
    hidePercent: true
  }
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Param: Story = {}