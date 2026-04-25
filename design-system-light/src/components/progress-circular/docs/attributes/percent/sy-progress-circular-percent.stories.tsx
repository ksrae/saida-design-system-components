import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ProgressCircularPercent } from '../../sy-progress-circular.main';
import progressCircularMeta from '../../sy-progress-circular.stories';

const meta: Meta = {
  title: 'ProgressCircular/Attributes/Percent',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => ProgressCircularPercent(args as { percent: number }),
  argTypes: { percent: progressCircularMeta?.argTypes?.percent },
  args: { percent: 60 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};