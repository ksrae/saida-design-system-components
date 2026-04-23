import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabContentDisabled } from '../../sy-tab-content.main';
import tabContentMeta from '../../sy-tab-content.stories';

const meta: Meta = {
  title: 'Tab/Content Attributes/Disabled',
  component: 'sy-tab-content',
  tags: [],
  render: (args) => TabContentDisabled(args as { disabled: boolean }),
  argTypes: { disabled: tabContentMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};