import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabContentActive } from '../../sy-tab-content.main';
import tabContentMeta from '../../sy-tab-content.stories';

const meta: Meta = {
  title: 'Tab/Content Attributes/Active',
  component: 'sy-tab-content',
  tags: [],
  render: (args) => TabContentActive(args as { active: boolean }),
  argTypes: { active: tabContentMeta?.argTypes?.active },
  args: { active: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};