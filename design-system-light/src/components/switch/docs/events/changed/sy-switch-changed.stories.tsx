import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SwitchChanged } from '../../sy-switch.main';

const meta: Meta = {
  title: 'Switch/Events/Changed',
  component: 'sy-switch',
  tags: [],
  render: () => SwitchChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};