import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressCircularStatus } from '../../sy-progress-circular.main';
import progressCircularMeta from '../../sy-progress-circular.stories';

const meta: Meta = {
  title: 'ProgressCircular/Attributes/Status',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => ProgressCircularStatus(args as { status: 'default' | 'error' | 'complete' }),
  argTypes: { status: progressCircularMeta?.argTypes?.status },
  args: { status: 'default' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};