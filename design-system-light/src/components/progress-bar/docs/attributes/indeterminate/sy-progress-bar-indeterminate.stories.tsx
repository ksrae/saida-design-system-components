import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressBarIndeterminate } from '../../sy-progress-bar.main';
import progressBarMeta from '../../sy-progress-bar.stories';

const meta: Meta = {
  title: 'ProgressBar/Attributes/Indeterminate',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => ProgressBarIndeterminate(args as { indeterminate: boolean }),
  argTypes: { indeterminate: progressBarMeta?.argTypes?.indeterminate },
  args: { indeterminate: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};