import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputGetStatus } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Methods/getStatus',
  component: 'sy-input',
  tags: [],
  render: () => InputGetStatus(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
