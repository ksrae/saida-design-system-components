import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SwitchCheckValidity } from '../../sy-switch.main';

const meta: Meta = {
  title: 'Switch/Methods/Check Validity',
  component: 'sy-switch',
  tags: [],
  render: () => SwitchCheckValidity(),
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
