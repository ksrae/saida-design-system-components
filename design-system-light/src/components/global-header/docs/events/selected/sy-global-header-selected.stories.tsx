import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { GlobalHeaderSelected } from '../../sy-global-header.main';

const meta: Meta = {
  title: 'GlobalHeader/Events/Selected',
  component: 'sy-global-header',
  tags: [],
  render: () => GlobalHeaderSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};