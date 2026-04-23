import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SkeletonType } from '../../sy-skeleton.main';
import skeletonMeta from '../../sy-skeleton.stories';

const meta: Meta = {
  title: 'Skeleton/Attributes/Type',
  component: 'sy-skeleton',
  tags: [],
  render: (args) => SkeletonType(args as { type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree' }),
  argTypes: { type: skeletonMeta?.argTypes?.type },
  args: { type: 'text' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};