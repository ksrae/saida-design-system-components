import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputCheckValidity } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Methods/checkValidity',
  component: 'sy-input',
  tags: [],
  render: () => InputCheckValidity(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
