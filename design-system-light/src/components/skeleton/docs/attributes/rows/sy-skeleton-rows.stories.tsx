import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SkeletonRows } from '../../sy-skeleton.main';
import skeletonMeta from '../../sy-skeleton.stories';

const meta: Meta = {
  title: 'Skeleton/Attributes/Rows',
  component: 'sy-skeleton',
  tags: [],
  render: (args) => SkeletonRows(args as { rows: number }),
  argTypes: { rows: skeletonMeta?.argTypes?.rows },
  args: { rows: 3 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};