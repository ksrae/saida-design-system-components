import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabSetClose } from '../../sy-tab.main';

const meta: Meta = {
  title: 'Tab/Item Methods/SetClose',
  component: 'sy-tab',
  tags: [],
  render: () => TabSetClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};