import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabDisabled } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Disabled',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabDisabled(args as { disabled: boolean }),
  argTypes: { disabled: tabMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};