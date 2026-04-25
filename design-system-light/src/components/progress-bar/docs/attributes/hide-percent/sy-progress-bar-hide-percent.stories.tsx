import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ProgressBarHidePercent } from '../../sy-progress-bar.main';
import progressBarMeta from '../../sy-progress-bar.stories';

const meta: Meta = {
  title: 'ProgressBar/Attributes/Hide Percent',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => ProgressBarHidePercent(args as { hidePercent: boolean }),
  argTypes: { hidePercent: progressBarMeta?.argTypes?.hidePercent },
  args: { hidePercent: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};