import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ProgressCircularIndeterminate } from '../../sy-progress-circular.main';
import progressCircularMeta from '../../sy-progress-circular.stories';

const meta: Meta = {
  title: 'ProgressCircular/Attributes/Indeterminate',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => ProgressCircularIndeterminate(args as { indeterminate: boolean }),
  argTypes: { indeterminate: progressCircularMeta?.argTypes?.indeterminate },
  args: { indeterminate: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};