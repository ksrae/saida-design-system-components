import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputPrefix } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Slots/Prefix',
  component: 'sy-input',
  tags: [],
  render: () => InputPrefix(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
