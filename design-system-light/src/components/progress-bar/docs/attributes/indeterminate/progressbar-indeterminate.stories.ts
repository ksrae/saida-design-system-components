import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressBarProps, ProgressBarIndeterminate } from '../../progress-bar';
import progressBarMeta from '../../progress-bar.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressBarProps> = {
  title: 'ProgressBar/Attributes/Indeterminate',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressBarIndeterminate(args);
  },
  argTypes: {
    indeterminate: progressBarMeta?.argTypes?.indeterminate
  },
  args: {
    indeterminate: true
  }
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Param: Story = {}