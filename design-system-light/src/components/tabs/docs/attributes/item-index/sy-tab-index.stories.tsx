import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabIndex } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Index',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabIndex(args as { index: number }),
  argTypes: { index: tabMeta?.argTypes?.index },
  args: { index: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};