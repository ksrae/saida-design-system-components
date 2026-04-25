import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { GlobalHeaderUpdateOverflowTabs } from '../../sy-global-header.main';

const meta: Meta = {
  title: 'GlobalHeader/Methods/Update Overflow Tabs',
  component: 'sy-global-header',
  tags: [],
  render: () => GlobalHeaderUpdateOverflowTabs(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};