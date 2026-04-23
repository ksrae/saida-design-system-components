import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabContentName } from '../../sy-tab-content.main';
import tabContentMeta from '../../sy-tab-content.stories';

const meta: Meta = {
  title: 'Tab/Content Attributes/Name',
  component: 'sy-tab-content',
  tags: [],
  render: (args) => TabContentName(args as { name: string }),
  argTypes: { name: tabContentMeta?.argTypes?.name },
  args: { name: 'x' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};