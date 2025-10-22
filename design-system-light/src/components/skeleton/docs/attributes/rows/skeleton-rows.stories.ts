import type { Meta, StoryObj } from '@storybook/web-components';
import { SkeletonProps, SkeletonRows } from '../../skeleton';
import skeletonMeta from '../../skeleton.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SkeletonProps> = {
  title: 'Skeleton/Attributes/Rows',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SkeletonRows(args);
  },
  argTypes: {
    rows: skeletonMeta?.argTypes?.rows,
    type: skeletonMeta?.argTypes?.type,
  },
  args: {
    rows: 3,
    type: 'text'
  }
};

export default meta;
type Story = StoryObj<SkeletonProps>;

export const Param: Story = {}
