import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SkeletonType } from '../../sy-skeleton.main';
import skeletonMeta from '../../sy-skeleton.stories';

const meta: Meta = {
  title: 'Skeleton/Attributes/Type',
  component: 'sy-skeleton',
  tags: [],
  render: (args) => SkeletonType(args as {
    type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree';
    rows: number;
  }),
  argTypes: {
    type: skeletonMeta?.argTypes?.type,
    rows: skeletonMeta?.argTypes?.rows,
  },
  args: { type: 'text', rows: 3 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};