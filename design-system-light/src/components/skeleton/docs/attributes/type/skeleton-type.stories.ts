import type { Meta, StoryObj } from '@storybook/web-components';
import { SkeletonProps, SkeletonType } from '../../skeleton';
import skeletonMeta from '../../skeleton.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SkeletonProps> = {
  title: 'Skeleton/Attributes/Type',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SkeletonType(args);
  },
  argTypes: {
    type: skeletonMeta?.argTypes?.type,
  },
  args: {
    type: 'text'
  }
};

export default meta;
type Story = StoryObj<SkeletonProps>;

export const Param: Story = {}
