import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SwitchSetCustomError } from '../../sy-switch.main';

const meta: Meta = {
  title: 'Switch/Methods/Set Custom Error',
  component: 'sy-switch',
  tags: [],
  render: () => SwitchSetCustomError(),
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
