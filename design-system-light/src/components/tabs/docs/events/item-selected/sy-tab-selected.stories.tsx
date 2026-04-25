import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabSelected } from '../../sy-tab.main';

const meta: Meta = {
  title: 'Tab/Item Events/Selected',
  component: 'sy-tab',
  tags: [],
  render: () => TabSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};