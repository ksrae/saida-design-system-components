import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabGroupClosed } from '../../sy-tab-group.main';

const meta: Meta = {
  title: 'Tab/Events/Closed',
  component: 'sy-tab-group',
  tags: [],
  render: () => TabGroupClosed(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};