import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ProgressBarStatus } from '../../sy-progress-bar.main';
import progressBarMeta from '../../sy-progress-bar.stories';

const meta: Meta = {
  title: 'ProgressBar/Attributes/Status',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => ProgressBarStatus(args as { status: 'default' | 'error' | 'complete' }),
  argTypes: { status: progressBarMeta?.argTypes?.status },
  args: { status: 'default' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};