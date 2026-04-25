import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabGroupDisabled } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Disabled',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupDisabled(args as { disabled: boolean }),
  argTypes: { disabled: tabGroupMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};