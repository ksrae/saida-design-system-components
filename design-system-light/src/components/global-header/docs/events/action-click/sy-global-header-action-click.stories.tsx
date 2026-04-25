import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { GlobalHeaderActionClick } from '../../sy-global-header.main';

const meta: Meta = {
  title: 'GlobalHeader/Events/Action Click',
  component: 'sy-global-header',
  tags: [],
  render: () => GlobalHeaderActionClick(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};