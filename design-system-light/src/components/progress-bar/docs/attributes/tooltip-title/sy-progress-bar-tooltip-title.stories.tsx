import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressBarTooltipTitle } from '../../sy-progress-bar.main';
import progressBarMeta from '../../sy-progress-bar.stories';

const meta: Meta = {
  title: 'ProgressBar/Attributes/Tooltip Title',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => ProgressBarTooltipTitle(args as { tooltipTitle: string }),
  argTypes: { tooltipTitle: progressBarMeta?.argTypes?.tooltipTitle },
  args: { tooltipTitle: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};