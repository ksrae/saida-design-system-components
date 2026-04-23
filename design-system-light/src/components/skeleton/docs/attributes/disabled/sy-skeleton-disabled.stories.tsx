import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SkeletonDisabled } from '../../sy-skeleton.main';
import skeletonMeta from '../../sy-skeleton.stories';

const meta: Meta = {
  title: 'Skeleton/Attributes/Disabled',
  component: 'sy-skeleton',
  tags: [],
  render: (args) => SkeletonDisabled(args as { disabled: boolean }),
  argTypes: { disabled: skeletonMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};