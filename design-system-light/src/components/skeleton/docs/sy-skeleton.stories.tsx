import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SySkeletonProps, Skeleton } from './sy-skeleton.main';
import { clearElements } from '../../clear-element';

const skeletonMeta: Meta<SySkeletonProps> = {
  title: 'Skeleton/Overview',
  component: 'sy-skeleton',
  tags: [],
  render: (args) => {
    clearElements(skeletonMeta.title);
    return Skeleton(args);
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'avatar', 'image', 'gallary', 'button', 'table', 'tree'],
      description: 'Skeleton placeholder shape.',
      table: { category: 'Parameter', defaultValue: { summary: 'text' }, type: { summary: 'text | avatar | image | gallary | button | table | tree' } },
    },
    rows: {
      control: 'number',
      description: 'Number of placeholder rows (for text type).',
      table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } },
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton (CSS value).',
      table: { category: 'Parameter', defaultValue: { summary: '100%' }, type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the shimmer animation.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    stopAnimation: {
      type: 'function',
      description: 'Stops the shimmer animation.',
      table: { category: 'Function', type: { summary: 'stopAnimation()' } },
    },
    resetAnimation: {
      type: 'function',
      description: 'Restarts the shimmer animation.',
      table: { category: 'Function', type: { summary: 'resetAnimation()' } },
    },
  },
};

export default skeletonMeta;
type Story = StoryObj<SySkeletonProps>;

export const Default: Story = {
  args: { type: 'text', rows: 3, width: '100%', disabled: false },
};
