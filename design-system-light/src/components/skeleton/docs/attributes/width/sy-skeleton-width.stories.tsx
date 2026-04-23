import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SkeletonWidth } from '../../sy-skeleton.main';
import skeletonMeta from '../../sy-skeleton.stories';

const meta: Meta = {
  title: 'Skeleton/Attributes/Width',
  component: 'sy-skeleton',
  tags: [],
  render: (args) => SkeletonWidth(args as { width: string }),
  argTypes: { width: skeletonMeta?.argTypes?.width },
  args: { width: '100%' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};