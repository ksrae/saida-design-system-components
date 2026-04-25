import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectMaxTagCount } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Max Tag Count',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectMaxTagCount(args as { maxTagCount: number }),
  argTypes: { maxTagCount: selectMeta?.argTypes?.maxTagCount },
  args: { maxTagCount: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};