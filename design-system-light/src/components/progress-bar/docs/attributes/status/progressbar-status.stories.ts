import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressBarProps, ProgressBarStatus } from '../../progress-bar';
import progressBarMeta from '../../progress-bar.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressBarProps> = {
  title: 'ProgressBar/Attributes/Status',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressBarStatus(args);
  },
  argTypes: {
    status: progressBarMeta?.argTypes?.status
  },
  args: {
    status: 'default'
  }
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Param: Story = {}