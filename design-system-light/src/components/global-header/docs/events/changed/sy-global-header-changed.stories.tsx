import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { GlobalHeaderChanged } from '../../sy-global-header.main';

const meta: Meta = {
  title: 'GlobalHeader/Events/Changed',
  component: 'sy-global-header',
  tags: [],
  render: () => GlobalHeaderChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};