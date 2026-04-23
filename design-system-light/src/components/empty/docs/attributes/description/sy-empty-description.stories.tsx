import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { EmptyDesc } from '../../sy-empty.main';
import emptyMeta from '../../sy-empty.stories';

const meta: Meta = {
  title: 'Empty/Attributes/Description',
  component: 'sy-empty',
  tags: [],
  render: (args) => EmptyDesc(args as { description: string }),
  argTypes: { description: emptyMeta?.argTypes?.description },
  args: { description: 'No data available' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
