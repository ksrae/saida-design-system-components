import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SkeletonStopResetAnimation } from '../../sy-skeleton.main';

const meta: Meta = {
  title: 'Skeleton/Methods/Stop & Reset Animation',
  component: 'sy-skeleton',
  tags: [],
  render: () => SkeletonStopResetAnimation(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};