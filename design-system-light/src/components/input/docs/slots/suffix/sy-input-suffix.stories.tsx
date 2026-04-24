import type { Meta, StoryObj } from '@storybook/web-components-vite';
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
