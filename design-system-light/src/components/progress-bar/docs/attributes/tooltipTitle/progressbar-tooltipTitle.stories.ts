import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressBarProps, ProgressBarTooltipTitle } from '../../progress-bar';
import progressBarMeta from '../../progress-bar.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressBarProps> = {
  title: 'ProgressBar/Attributes/TooltipTitle',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressBarTooltipTitle(args);
  },
  argTypes: {
    tooltipTitle: progressBarMeta?.argTypes?.tooltipTitle
  },
  args: {
    tooltipTitle: `This is a tooltip`,
  }
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Param: Story = {}