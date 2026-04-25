import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabGroupSize } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Size',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: tabGroupMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};