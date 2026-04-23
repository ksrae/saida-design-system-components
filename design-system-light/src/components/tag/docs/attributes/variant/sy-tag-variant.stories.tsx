import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TagVariant } from '../../sy-tag.main';
import tagMeta from '../../sy-tag.stories';

const meta: Meta = {
  title: 'Tag/Attributes/Variant',
  component: 'sy-tag',
  tags: [],
  render: (args) => TagVariant(args as { variant: 'gray' | 'purple' | 'blue' | 'green' | 'cyan' | 'yellow' | 'orange' | 'red' }),
  argTypes: { variant: tagMeta?.argTypes?.variant },
  args: { variant: 'blue' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};