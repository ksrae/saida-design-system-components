import type { Meta, StoryObj } from '@storybook/web-components';
import { SkeletonProps, SkeletonWidth } from '../../skeleton';
import skeletonMeta from '../../skeleton.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SkeletonProps> = {
  title: 'Skeleton/Attributes/Width',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SkeletonWidth(args);
  },
  argTypes: {
    width: skeletonMeta?.argTypes?.width,
  },
  args: {
    type: 'text'
  }
};

export default meta;
type Story = StoryObj<SkeletonProps>;

export const Param: Story = {}
