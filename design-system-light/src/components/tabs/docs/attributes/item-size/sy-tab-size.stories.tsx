import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabSize } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Size',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: tabMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};