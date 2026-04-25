import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputSuffix } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Slots/Suffix',
  component: 'sy-input',
  tags: [],
  render: () => InputSuffix(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
