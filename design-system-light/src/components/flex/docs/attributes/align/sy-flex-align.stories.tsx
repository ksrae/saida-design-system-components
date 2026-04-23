import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { FlexAlign } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Align',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexAlign(args as { align: 'start' | 'end' | 'center' | 'stretch' | 'baseline' }),
  argTypes: { align: flexMeta?.argTypes?.align },
  args: { align: 'start' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};