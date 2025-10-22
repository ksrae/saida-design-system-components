import type { Meta, StoryObj } from '@storybook/web-components';
import { SkeletonProps, SkeletonDisabled } from '../../skeleton';
import skeletonMeta from '../../skeleton.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SkeletonProps> = {
  title: 'Skeleton/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SkeletonDisabled(args);
  },
  argTypes: {
    disabled: skeletonMeta?.argTypes?.disabled,
  },
  args: {
    disabled: false,
  }
};

export default meta;
type Story = StoryObj<SkeletonProps>;

export const Param: Story = {}
