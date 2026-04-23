import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabActive } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Active',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabActive(args as { active: boolean }),
  argTypes: { active: tabMeta?.argTypes?.active },
  args: { active: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};